import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP, 3: Reset password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const API_BASE_URL =  'http://localhost:5000/api';

  // Timer countdown
  React.useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, step]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1: Request password reset
  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
        email
      });

      setMessage(response.data.message);
      setStep(2); // Move to OTP step
      setTimer(900); // Reset timer to 15 minutes
      setCanResend(false);

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send reset OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    const fullOtp = otp.join('');
    
    if (fullOtp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-reset-otp`, {
        email,
        otp: fullOtp
      });

      setResetToken(response.data.resetToken);
      setMessage(response.data.message);
      setStep(3); // Move to password reset step

    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token: resetToken,
        email,
        newPassword,
        confirmPassword
      });

      setMessage(response.data.message);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Password reset successful! Please login with your new password.' }
        });
      }, 3000);

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/resend-reset-otp`, {
        email
      });

      setMessage(response.data.message);
      setTimer(900);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    
    // Auto-verify when last digit is entered
    if (value && index === 5) {
      const fullOtp = newOtp.join('');
      if (fullOtp.length === 6) {
        handleVerifyOTP();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Verify OTP'}
            {step === 3 && 'Reset Password'}
          </h1>
          <p className="text-gray-600">
            {step === 1 && 'Enter your email to reset your password'}
            {step === 2 && 'Enter the OTP sent to your email'}
            {step === 3 && 'Enter your new password'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNum 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {stepNum}
                </div>
                <span className="text-xs mt-2 text-gray-600">
                  {stepNum === 1 && 'Email'}
                  {stepNum === 2 && 'OTP'}
                  {stepNum === 3 && 'Reset'}
                </span>
              </div>
              {stepNum < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-700 font-medium">{message}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <button
              onClick={handleForgotPassword}
              disabled={loading || !email}
              className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-colors ${
                loading || !email
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Sending OTP...' : 'Send Reset OTP'}
            </button>

            <div className="text-center">
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter 6-digit OTP
              </label>
              <div className="flex justify-between space-x-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={loading}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Enter the code sent to {email}
              </p>
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-700 font-semibold">
                  {formatTime(timer)}
                </span>
                <span className="text-gray-600 ml-2">remaining</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.join('').length !== 6}
                className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-colors ${
                  loading || otp.join('').length !== 6
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                onClick={handleResendOTP}
                disabled={loading || !canResend}
                className={`w-full py-3 px-4 rounded-xl font-medium border transition-colors ${
                  loading || !canResend
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                {canResend ? 'Resend OTP' : `Resend available in ${formatTime(timer)}`}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full py-3 px-4 rounded-xl font-medium border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters long
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div className="space-y-4">
              <button
                onClick={handleResetPassword}
                disabled={loading || !newPassword || !confirmPassword}
                className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-colors ${
                  loading || !newPassword || !confirmPassword
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 px-4 rounded-xl font-medium border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
            </div>

            <div className="text-center">
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>Need help? Contact support@anayabloom.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;