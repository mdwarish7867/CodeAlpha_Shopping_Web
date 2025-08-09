// src/pages/static/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container max-w-5xl px-4 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Contact <span className="text-indigo-600">Us</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Have questions? We're here to help! Reach out to our team and we'll respond promptly.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 bg-indigo-500"></div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="lg:w-1/2">
            <div className="h-full p-8 bg-white shadow-xl rounded-2xl">
              <h2 className="mb-8 text-2xl font-bold text-gray-800">Send us a message</h2>
              
              {submitSuccess ? (
                <div className="p-6 mb-6 text-green-800 bg-green-100 rounded-lg">
                  <div className="mb-2 font-bold">Message Sent Successfully!</div>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block mb-2 text-gray-700" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 text-gray-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 text-gray-700" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block mb-2 text-gray-700" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="h-full p-8 bg-indigo-50 rounded-2xl">
              <h2 className="mb-8 text-2xl font-bold text-gray-800">Contact Information</h2>
              
              <div className="mb-10 space-y-6">
                <div className="flex items-start">
                  <div className="p-3 mr-4 bg-indigo-100 rounded-full">
                    <span className="text-xl text-indigo-600">📍</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-800">Our Location</h3>
                    <p className="text-gray-600">123 Shopping Street, Retail City, RC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 mr-4 bg-indigo-100 rounded-full">
                    <span className="text-xl text-indigo-600">✉️</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-800">Email Us</h3>
                    <p className="text-gray-600">support@nexusshop.com</p>
                    <p className="text-gray-600">info@nexusshop.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 mr-4 bg-indigo-100 rounded-full">
                    <span className="text-xl text-indigo-600">📞</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">(123) 456-7890</p>
                    <p className="text-gray-600">(098) 765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 mr-4 bg-indigo-100 rounded-full">
                    <span className="text-xl text-indigo-600">⏰</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-800">Working Hours</h3>
                    <p className="text-gray-600">Monday-Friday: 9AM - 8PM</p>
                    <p className="text-gray-600">Saturday-Sunday: 10AM - 6PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-bold text-gray-800">Find Us On</h3>
                <div className="flex space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      className="flex items-center justify-center w-12 h-12 transition-colors bg-white rounded-full shadow-md hover:bg-indigo-100"
                    >
                      <span className="text-gray-700">S</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="w-full h-64 bg-gray-200 border-2 border-dashed rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;