// src/pages/static/About.jsx
import React from 'react';

const About = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div className="container max-w-6xl px-4 py-16 mx-auto">
      <div className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
          About <span className="text-indigo-600">NexusShop</span>
        </h1>
        <div className="w-24 h-1 mx-auto bg-indigo-500"></div>
      </div>

      <div className="flex flex-col items-center gap-12 mb-20 md:flex-row">
        <div className="md:w-1/2">
          <div className="w-full bg-gray-200 border-2 border-dashed rounded-xl h-96" />
        </div>
        <div className="md:w-1/2">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">Our Story</h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            Founded in 2015, NexusShop started as a small passion project with a simple mission: 
            to bring exceptional products to discerning customers without the retail markup. 
            Today, we've grown into a premier shopping destination serving over 500,000 satisfied customers worldwide.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            Our carefully curated collections blend timeless quality with contemporary design, 
            ensuring every purchase becomes a lasting favorite. We partner directly with artisans 
            and ethical manufacturers to bring you products you can feel good about owning.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-6 py-3 font-medium text-indigo-800 bg-indigo-100 rounded-lg">
              ✓ 100% Satisfaction
            </div>
            <div className="px-6 py-3 font-medium text-indigo-800 bg-indigo-100 rounded-lg">
              ✓ Ethical Sourcing
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 mb-20 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">Our Values</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { title: 'Quality Craftsmanship', desc: 'Every product undergoes rigorous quality checks to ensure longevity and performance.' },
            { title: 'Customer First', desc: 'We prioritize your shopping experience with dedicated support and easy returns.' },
            { title: 'Sustainable Future', desc: 'Eco-friendly packaging and carbon-neutral shipping for all orders.' }
          ].map((item, index) => (
            <div key={index} className="p-6 text-center transition-all hover:bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-indigo-100 rounded-full">
                <span className="text-2xl text-indigo-600">✓</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Meet Our Team</h2>
        <p className="max-w-3xl mx-auto mb-12 text-lg text-gray-600">
          Passionate individuals dedicated to transforming your shopping experience
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="overflow-hidden bg-white shadow-md rounded-xl">
              <div className="w-full h-64 bg-gray-200 border-2 border-dashed" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800">Team Member {i+1}</h3>
                <p className="text-indigo-600">Position Title</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default About;