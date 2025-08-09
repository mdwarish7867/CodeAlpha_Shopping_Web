// src/components/layout/Footer.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ✅ fixed import path

const Footer = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleProductsClick = (e) => {
    e.preventDefault();
    if (user && user.userType === 'user') {
      navigate('/products');
    } else {
    logout(); 
    navigate('/login');
  }
  };

  const socialLinks = [
    { name: 'Facebook', icon: <span>📘</span> },
    { name: 'Twitter', icon: <span>🐦</span> },
    { name: 'Instagram', icon: <span>📸</span> },
    { name: 'LinkedIn', icon: <span>💼</span> }
  ];

  return (
    <footer className="py-12 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold text-indigo-400">NexusShop</h3>
            <p className="text-gray-400">
              Your premium shopping destination with curated collections and exceptional service.
            </p>
            <div className="flex mt-6 space-x-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.name}
                  className="p-2 text-gray-400 transition-colors rounded-full bg-gray-800/50 hover:bg-indigo-600 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="transition-colors hover:text-white hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/products"
                  onClick={handleProductsClick}
                  className="transition-colors cursor-pointer hover:text-white hover:underline"
                >
                  Products
                </a>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-white hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Customer Service</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/faq" className="transition-colors hover:text-white hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="transition-colors hover:text-white hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="transition-colors hover:text-white hover:underline">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="transition-colors hover:text-white hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <address className="space-y-3 not-italic text-gray-400">
              <p className="flex items-start">
                <span className="mt-1 mr-3">📍</span>
                <span>123 Shopping Street, Retail City, RC 12345</span>
              </p>
              <p className="flex items-center">
                <span className="mr-3">✉️</span>
                <span>info@nexusshop.com</span>
              </p>
              <p className="flex items-center">
                <span className="mr-3">📞</span>
                <span>(123) 456-7890</span>
              </p>
              <p className="flex items-center">
                <span className="mr-3">⏰</span>
                <span>Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM</span>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-10 mt-10 text-center text-gray-500 border-t border-gray-800">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} NexusShop. All rights reserved. |{' '}
            <a href="/terms" className="mx-2 hover:text-gray-300">
              Terms of Service
            </a>{' '}
            |{' '}
            <a href="/privacy" className="mx-2 hover:text-gray-300">
              Privacy Policy
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Prices and availability are subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
