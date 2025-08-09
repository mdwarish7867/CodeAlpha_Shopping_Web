// src/pages/static/FAQ.jsx
import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery in most metropolitan areas. International shipping typically takes 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee on all products. Items must be in original condition with tags attached. Return shipping is free for domestic returns. Refunds are processed within 3-5 business days after we receive your return."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 100 countries worldwide. International shipping costs are calculated at checkout based on destination and package weight. Please note that customers are responsible for any customs duties or import taxes that may apply."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number and link. You can also track your order through your account dashboard. If you're having trouble tracking your package, contact our support team for assistance."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. We also offer installment payment options through select providers."
    },
    {
      question: "How do I change or cancel my order?",
      answer: "You can change or cancel your order within 1 hour of placement through your account dashboard. After this window, please contact our support team immediately. Once your order has shipped, we cannot cancel it but you can return it for a full refund."
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Find answers to common questions about orders, shipping, returns and more.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 bg-indigo-500"></div>
        </div>

        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-200 last:border-b-0 ${
                activeIndex === index ? 'bg-indigo-50' : ''
              }`}
            >
              <button
                className="flex items-center justify-between w-full p-6 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                <span className="ml-4 text-indigo-600">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`px-6 pb-6 pt-2 transition-all duration-300 ${
                  activeIndex === index ? 'block' : 'hidden'
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 mt-16 text-center bg-indigo-50 rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Still have questions?</h2>
          <p className="max-w-2xl mx-auto mb-6 text-gray-600">
            Our support team is ready to help you with any additional questions you might have.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="px-8 py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Contact Support
            </button>
            <button className="px-8 py-3 font-medium text-indigo-600 transition-colors bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;