// import React, { useState } from 'react';

// const CreateAccount = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleCreate = () => {
//     console.log('Creating account with:', { firstName, lastName, email, password });
//     // Add your account creation logic here
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
//       <div className="w-full max-w-md">
//         {/* Title */}
//         <h1 className="text-4xl font-normal text-center mb-12 text-gray-900">
//           Create account
//         </h1>

//         {/* Form Fields */}
//         <div className="space-y-6">
//           {/* First Name Input */}
//           <div>
//             <input
//               type="text"
//               placeholder="First name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
//             />
//           </div>

//           {/* Last Name Input */}
//           <div>
//             <input
//               type="text"
//               placeholder="Last name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
//             />
//           </div>

//           {/* Email Input */}
//           <div>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
//             />
//           </div>

//           {/* Create Button */}
//           <div className="flex justify-center pt-6">
//             <button
//               onClick={handleCreate}
//               className="bg-black text-white px-12 py-3 hover:bg-gray-800 transition-colors font-medium"
//             >
//               Create
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;




import React, { useState } from 'react';
import axios from 'axios'; 
import { useLocation, useNavigate } from 'react-router-dom';


const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Configure axios base URL
  const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL

  const handleCreate = async () => {
    // Validation
    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Make POST request to your backend API
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password
      });

      // Handle successful response
      setMessage(response.data.message || 'Account created successfully! Check your email for OTP.');
      console.log('Registration successful:', response.data);

      // Clear form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');


      // Redirect to OTP verification page or show OTP input
      // You can add navigation logic here
      navigate('/verify-otp', { state: { email } });

    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with error status
        setError(error.response.data.message || 'Registration failed');
        console.error('Registration error:', error.response.data);
      } else if (error.request) {
        // Request made but no response
        setError('No response from server. Check if backend is running.');
        console.error('No response:', error.request);
      } else {
        // Other errors
        setError('An error occurred: ' + error.message);
        console.error('Error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-normal text-center mb-8 text-gray-900">
          Create account
        </h1>

        {/* Display messages */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          {/* Create Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleCreate}
              disabled={loading}
              className={`bg-black text-white px-12 py-3 hover:bg-gray-800 transition-colors font-medium ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;