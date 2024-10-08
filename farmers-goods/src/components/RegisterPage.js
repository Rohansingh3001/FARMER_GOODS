import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';  // Using Axios to interact with backend
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const [role, setRole] = useState('customer'); // Default role is customer
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [productType, setProductType] = useState(''); // State for farmer product selection
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!captchaVerified) {
      setError('Please verify that you are not a robot.');
      return;
    }
    console.log({
      name,
      email,
      mobile,
      password,
      confirmPassword,
      role,
      productType: role === 'farmer' ? productType : 'N/A', // Only show product type for farmers
      captchaVerified,
    });
  
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
  

    try {
      // Send data to the backend for registration
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        mobile,
        password,
        role,
        productType: role === 'farmer' ? productType : null, // Store productType only if the role is farmer
      });

      console.log('User registered:', response.data);
      // Navigate based on the role
      if (role === 'customer') {
        navigate('/MyAccount');
      } else if (role === 'farmer') {
        navigate('/MyAccount');
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data || error.message);
    }
  };

  const handleCaptchaVerify = (token) => {
    if (token) {
      setCaptchaVerified(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister}>
          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Register as:</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your mobile number"
            />
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

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded pr-10"
                placeholder="Confirm your password"
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

          {/* Farmer Product Type Selection - Conditional Rendering */}
          {role === 'farmer' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What do you want to sell?</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select an option</option>
                <option value="Fresh Vegetables">Fresh Vegetables</option>
                <option value="Organic Fruits">Organic Fruits</option>
                <option value="Dairy Products">Dairy Products</option>
              </select>
            </div>
          )}

          {/* hCaptcha */}
          <div className="mb-4">
            <HCaptcha
              sitekey="b9a4f464-94dc-4090-bffc-d8e8b472e282"
              onVerify={handleCaptchaVerify}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;