import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const API_BASE_URL =  import.meta.env.VITE_API_URL;;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else setCanResend(true);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
    if (value && index === 5 && newOtp.join('').length === 6) handleVerifyOTP();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1].focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) return setError('Please enter a valid 6-digit OTP');
    if (!email) return setError('Email not found. Please register again.');

    setLoading(true); setError(''); setMessage('');
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp: fullOtp });
      setMessage(response.data.message || 'Account verified successfully!');
      setTimeout(() => navigate('/login', { state: { message: 'Account verified successfully! You can now login.' } }), 2000);
    } catch (error) {
      setError(error.response?.data?.message || error.response?.data?.error || 'OTP verification failed.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } finally { setLoading(false); }
  };

  const handleResendOTP = async () => {
    if (!email) return setError('Email not found. Please register again.');
    setLoading(true); setError(''); setMessage('');
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/resend-otp`, { email });
      setMessage(response.data.message || 'New OTP sent to your email!');
      setTimer(300); setCanResend(false); setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP.');
    } finally { setLoading(false); }
  };

  const handleGoBack = () => navigate('/create-account');

  return (
    <div className=" flex flex-col justify-center items-center bg-linear-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 m-4 sm:p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600 text-sm sm:text-base">Enter the 6-digit code sent to</p>
          <p className="text-gray-800 font-semibold mt-1 text-sm sm:text-base">{email || 'your email'}</p>
        </div>

        {/* Messages */}
        {message && <div className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-sm sm:text-base">{message}</div>}
        {error && <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-sm sm:text-base">{error}</div>}

        {/* OTP Inputs */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP Code</label>
          <div className="flex justify-between space-x-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={e => handleOtpChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                disabled={loading}
                className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 text-center text-lg sm:text-2xl md:text-3xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">Click on each box or paste the entire code</p>
        </div>

        {/* Timer */}
        <div className="mb-6 text-center">
          <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-blue-50 rounded-full text-sm sm:text-base text-blue-700 font-semibold">
            {formatTime(timer)} remaining
          </span>
        </div>

        {/* Buttons */}
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={handleVerifyOTP}
            disabled={loading || otp.join('').length !== 6}
            className={`w-full py-3 rounded-xl font-medium text-white transition-colors ${loading || otp.join('').length !== 6 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <button
              onClick={handleResendOTP}
              disabled={loading || !canResend}
              className={`flex-1 py-3 rounded-xl font-medium border transition-colors ${loading || !canResend ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
            >
              Resend OTP
            </button>

            <button
              onClick={handleGoBack}
              disabled={loading}
              className={`flex-1 py-3 rounded-xl font-medium border transition-colors ${loading ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-gray-600 text-gray-600 hover:bg-gray-50'}`}
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-600 space-y-1">
          <p>Didn't receive the code?</p>
          <p>• Check your spam folder</p>
          <p>• Make sure you entered the correct email</p>
          <p>• Wait for the timer to expire to resend</p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
