import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 text-white bg-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">NexusShop</h3>
            <p className="text-gray-300">
              Your one-stop destination for all your shopping needs.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/products" className="hover:text-white">Products</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="/returns" className="hover:text-white">Return Policy</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p>123 Shopping Street</p>
              <p>Retail City, RC 12345</p>
              <p>Email: info@nexusshop.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} NexusShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;