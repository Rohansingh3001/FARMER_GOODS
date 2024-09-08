import React, { useState, useEffect, useRef } from 'react';

const initialCustomer = {
<<<<<<< HEAD
  name: 'Shri Ram',
  number: '1234567890',
  email: 'ram@example.com',
=======
  name: 'Rajesh Kumar',
  number: '9876543210',
  email: 'rajesh@example.com',
>>>>>>> 7b2c651 (new)
  address: {
    home: '789 Park Avenue, Delhi',
    office: '101 Business Hub, Mumbai'
  },
  orders: [
<<<<<<< HEAD
    { name: 'Apples', price: 79.99, date: '2023-01-01' },
    { name: 'Bananas', price: 29.99, date: '2023-01-15' },
    { name: 'Oranges', price: 49.99, date: '2023-02-01' }
=======
    { name: 'Apples', price: 799.99, date: '2023-01-01' },
    { name: 'Bananas', price: 299.99, date: '2023-01-15' },
    { name: 'Oranges', price: 499.99, date: '2023-02-01' }
>>>>>>> 7b2c651 (new)
  ],
  profilePhoto: null
};

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(initialCustomer);
  const [showProfilePhotoPopup, setShowProfilePhotoPopup] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [homeAddress, setHomeAddress] = useState(customer.address.home);
  const [officeAddress, setOfficeAddress] = useState(customer.address.office);
  const [isEditingHomeAddress, setIsEditingHomeAddress] = useState(false);
  const [isEditingOfficeAddress, setIsEditingOfficeAddress] = useState(false);
  
  const popupRef = useRef(null);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowProfilePhotoPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      setProfilePhoto(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleRemoveProfilePhoto = () => {
    setProfilePhoto(null);
    setCustomer({ ...customer, profilePhoto: null });
    setShowProfilePhotoPopup(false);
  };

  const handleSaveProfilePhoto = () => {
    if (profilePhoto) {
      setCustomer({ ...customer, profilePhoto: URL.createObjectURL(profilePhoto) });
      setProfilePhoto(null);
      setShowProfilePhotoPopup(false);
    }
  };

  const handleEditHomeAddress = () => {
    setIsEditingHomeAddress(true);
  };

  const handleSaveHomeAddress = () => {
    setCustomer({ ...customer, address: { ...customer.address, home: homeAddress } });
    setIsEditingHomeAddress(false);
  };

  const handleEditOfficeAddress = () => {
    setIsEditingOfficeAddress(true);
  };

  const handleSaveOfficeAddress = () => {
    setCustomer({ ...customer, address: { ...customer.address, office: officeAddress } });
    setIsEditingOfficeAddress(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-green-600">Customer Dashboard</h1>
        <div className="relative">
          <button
            className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-2 rounded-full"
            onClick={() => setShowProfilePhotoPopup(true)}
          >
            {customer.profilePhoto ? (
              <img
                src={customer.profilePhoto}
                alt="Profile Photo"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </button>
          {showProfilePhotoPopup && (
            <div
              ref={popupRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 border border-gray-300"
            >
              {!customer.profilePhoto && (
                <label className="block cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-800 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
              {profilePhoto && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(profilePhoto)}
                    alt="Uploaded Preview"
                    className="w-full h-auto rounded-lg"
                  />
                  <button
                    className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full mt-2"
                    onClick={handleSaveProfilePhoto}
                  >
                    Save
                  </button>
                </div>
              )}
              {customer.profilePhoto && (
                <button
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full mt-2"
                  onClick={handleRemoveProfilePhoto}
                >
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
          <h2 className="text-xl font-bold text-green-600">Customer Details</h2>
          <ul>
            <li className="py-2">
              <span className="font-bold">Name:</span> {customer.name}
            </li>
            <li className="py-2">
              <span className="font-bold">Number:</span> {customer.number}
            </li>
            <li className="py-2">
              <span className="font-bold">Email:</span> {customer.email}
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
          <h2 className="text-xl font-bold text-green-600">Order History</h2>
          <table className="w-full text-sm text-gray-500">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Price (INR)</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {customer.orders.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{order.name}</td>
                  <td className="py-2 px-4">&#8377;{order.price.toFixed(2)}</td>
                  <td className="py-2 px-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
          <h2 className="text-xl font-bold text-green-600">Addresses</h2>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Home Address</h3>
            {isEditingHomeAddress ? (
              <input
                type="text"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p>{customer.address.home}</p>
            )}
            {isEditingHomeAddress ? (
              <button
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full mt-2"
                onClick={handleSaveHomeAddress}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mt-2"
                onClick={handleEditHomeAddress}
              >
                Edit
              </button>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold">Office Address</h3>
            {isEditingOfficeAddress ? (
              <input
                type="text"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p>{customer.address.office}</p>
            )}
            {isEditingOfficeAddress ? (
              <button
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full mt-2"
                onClick={handleSaveOfficeAddress}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mt-2"
                onClick={handleEditOfficeAddress}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
