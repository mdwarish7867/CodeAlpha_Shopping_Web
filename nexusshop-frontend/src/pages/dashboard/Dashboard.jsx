// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, updatePassword } = useAuth();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (user && user.userType === 'seller') {
      fetchSellerProducts();
      fetchCategories();
    }
  }, [user]);

  const fetchSellerProducts = async () => {
    try {
      const response = await fetch('/api/products/seller');
      const data = await response.json();
      setSellerProducts(data);
    } catch (error) {
      console.error('Error fetching seller products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    
    const result = await updatePassword(
      passwordData.currentPassword, 
      passwordData.newPassword
    );
    
    if (result.success) {
      setMessage({ text: 'Password updated successfully!', type: 'success' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      setMessage({ text: result.message || 'Failed to update password', type: 'error' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const filteredProducts = selectedCategory
  ? sellerProducts.filter(product =>
      product.categories.some(cat => cat._id === selectedCategory)
    )
  : sellerProducts;

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (response.ok) {
          setSellerProducts(sellerProducts.filter(p => p._id !== productId));
          setMessage({ text: 'Product deleted successfully!', type: 'success' });
        } else {
          const errorData = await response.json();
          setMessage({ text: errorData.message || 'Failed to delete product', type: 'error' });
        }
      } catch (error) {
        setMessage({ text: 'Network error', type: 'error' });
      }
    }
  };

  return (
    <div className="container max-w-6xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">User Dashboard</h1>
      
      {/* Password Change Section */}
      <section className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handlePasswordChange}>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-gray-700">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-dark"
          >
            Update Password
          </button>
        </form>
      </section>

      {/* Seller Products Section */}
      {user?.userType === 'seller' && (
        <section className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Products</h2>
            <Link
              to="/products/new"
              className="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-dark"
            >
              Add New Product
            </Link>
          </div>
          
          {/* Category Filter */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md md:w-64"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Products List */}
          {loading ? (
            <p>Loading your products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>No products found. Create your first product!</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map(product => (
                <div key={product._id} className="overflow-hidden border rounded-lg shadow-sm">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
                    <p className="mb-3 text-gray-600">${product.price}</p>
                    <p className="mb-4 text-sm text-gray-500">
                      Stock: {product.stock}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="flex-1 py-1 text-center text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="flex-1 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Dashboard;