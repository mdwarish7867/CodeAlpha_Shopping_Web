// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-2xl font-medium text-gray-600 mt-4">Page not found</p>
      <p className="mt-2 text-gray-500">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  </div>
);

export default NotFound;