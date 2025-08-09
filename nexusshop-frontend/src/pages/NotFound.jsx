// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
    <div className="max-w-3xl p-8 text-center">
      <div className="mb-4 font-bold text-indigo-500 text-9xl">404</div>
      <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">Page Not Found</h1>
      <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-300">
        Oops! The page you're looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          to="/"
          className="px-8 py-4 text-lg font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Return to Homepage
        </Link>
        <Link
          to="/contact"
          className="px-8 py-4 text-lg font-medium text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          Contact Support
        </Link>
      </div>
      
      <div className="mt-16">
        <div className="w-full h-64 max-w-md mx-auto bg-gray-200 border-2 border-dashed rounded-xl" />
      </div>
    </div>
  </div>
);

export default NotFound;