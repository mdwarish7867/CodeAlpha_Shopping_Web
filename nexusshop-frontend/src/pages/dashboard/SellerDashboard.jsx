import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        setSuccess('');
        
        const response = await fetch(`${API_BASE_URL}/api/products/seller`, {
          credentials: 'include'
        });
        
        // Handle responses
        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
            return;
          }
          
          if (response.status === 403) {
            setError('You do not have permission to view seller products');
            return;
          }
          
          const errorData = await response.json();
          setError(errorData.message || `Server error: ${response.status}`);
          return;
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Network error. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.userType === 'seller') {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [user, navigate, API_BASE_URL]);

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        setProducts(products.filter(p => p._id !== productId));
        setSuccess('Product deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete product');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  // Handle non-seller access
  if (user && user.userType !== 'seller') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold">Access Restricted</h2>
          <p className="mb-4">
            You need seller privileges to access this page.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 text-white transition rounded bg-primary hover:bg-primary-dark"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link 
          to="/products/new" 
          className="flex items-center justify-center px-4 py-2 text-white transition rounded bg-primary hover:bg-primary-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Product
        </Link>
      </div>
      
      {/* Status Messages */}
      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-4 mb-6 text-green-700 bg-green-100 border border-green-400 rounded">
          {success}
        </div>
      )}
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
              {/* Product Image */}
              {product.images?.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="object-cover w-full h-48"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/300?text=Image+Not+Available";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-48 bg-gray-200 border-2 border-dashed">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              
              {/* Product Info */}
              <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold truncate">{product.name}</h2>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
                
                {/* Categories - Simplified display */}
                {product.categories && product.categories.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-600">Categories:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.categories.map((categoryName, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs bg-gray-100 rounded"
                      >
                        {categoryName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
                
                {/* Actions */}
                <div className="flex mt-4 space-x-2">
                  <Link 
                    to={`/products/edit/${product._id}`}
                    className="flex items-center justify-center flex-1 py-2 text-center text-white transition bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center justify-center flex-1 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : !error && (
          <div className="py-12 text-center border border-gray-200 rounded-lg col-span-full bg-gray-50">
            <div className="mb-4 text-5xl">📭</div>
            <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
            <p className="mb-4 text-gray-600">
              You haven't added any products yet. Start by adding your first product!
            </p>
            <Link 
              to="/products/new" 
              className="inline-block px-4 py-2 text-white transition rounded bg-primary hover:bg-primary-dark"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;