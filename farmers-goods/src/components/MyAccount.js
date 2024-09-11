import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for version 3.x

const MyAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT from localStorage

    if (token) {
      try {
        // Decode the JWT to get the user info
        const decodedToken = jwtDecode(token); // Correct function call
        const role = decodedToken.role; // Assuming the JWT contains the role

        if (role === 'farmer') {
          navigate('/FarmerDashboard');
        } else if (role === 'customer') {
          navigate('/CustomerDashboard');
        } else {
          // If no valid role, redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/login'); // Redirect to login if there's an error with the token
      }
    } else {
      // No token, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Loading your account...</h2>
    </div>
  );
};

export default MyAccount;
