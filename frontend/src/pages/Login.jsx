import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login attempt with:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     
      {/* Login Form Container */}
      <div className="flex-1 flex items-start justify-center pt-12 px-4">
        <div className="w-full max-w-md">
          {/* Login Title */}
          <h2 className="text-4xl font-normal text-center mb-12 text-gray-900">
            Login
          </h2>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <a
                href="/forgot-password"
                className="text-sm text-gray-900 underline hover:text-gray-600 transition-colors"
              >
                Forgot your password?
              </a>
            </div>

            {/* Sign In Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-12 py-3 hover:bg-gray-800 transition-colors font-medium"
              >
                Sign in
              </button>
            </div>

            {/* Create Account Link */}
            <div className="text-center pt-2">
              <a
                href="/create-account"
                className="text-sm text-gray-900 underline hover:text-gray-600 transition-colors"
              >
                Create account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;