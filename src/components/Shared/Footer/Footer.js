// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p>Your ecommerce store's description goes here.</p>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Quirky</h3>
          <p>Subscribe to our Quirky for updates.</p>
          <div className="flex items-center mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-600 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
