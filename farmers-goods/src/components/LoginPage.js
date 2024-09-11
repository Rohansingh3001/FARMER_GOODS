import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Import axios for API calls

const LoginPage = () => {
  const [role, setRole] = useState('customer'); // Default role is customer
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle role change (customer/farmer)
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Make a POST request to the backend login API
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
        role,
      });

      // Extract token from the response
      const { token, user } = response.data;

      // Store the JWT token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Store user data

      // Redirect user based on their role
      if (user.role === 'customer') {
        navigate('/CustomerDashboard');
      } else if (user.role === 'farmer') {
        navigate('/FarmerDashboard');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Display error from the backend
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Login as:</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-green-600 hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
