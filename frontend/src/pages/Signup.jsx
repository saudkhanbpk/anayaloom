import React, { useState } from 'react';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    console.log('Creating account with:', { firstName, lastName, email, password });
    // Add your account creation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-normal text-center mb-12 text-gray-900">
          Create account
        </h1>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* First Name Input */}
          <div>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          {/* Last Name Input */}
          <div>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

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

          {/* Create Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleCreate}
              className="bg-black text-white px-12 py-3 hover:bg-gray-800 transition-colors font-medium"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;