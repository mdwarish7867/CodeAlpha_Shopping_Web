import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Add API base URL
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/api/products/seller`, {
        credentials: 'include'
      });
      
      if (response.status === 401) {
        navigate('/login');
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch products');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Only fetch if user is seller
  if (user && user.userType === 'seller') {
    fetchProducts();
  } else {
    setLoading(false);
  }
}, [user, navigate, API_BASE_URL]);

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Network error. Please try again.');
    }
  };

  if (!user || user.userType !== 'seller') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-xl">You don't have permission to access this page</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-secondary"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading your products...</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link 
          to="/products/new" 
          className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-secondary"
        >
          Add New Product
        </Link>
      </div>
      
      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="p-6 bg-white rounded-lg shadow-md">
              {product.images && product.images.length > 0 && (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="object-cover w-full h-48 mb-4 rounded"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/300?text=Image+Not+Available";
                  }}
                />
              )}
              <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
              <p className="mb-1 text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
              
              <div className="mb-2">
                <p className="text-sm font-medium">Categories:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.categories && product.categories.map(category => (
                    <span 
                      key={category._id || category} 
                      className="px-2 py-1 text-xs bg-gray-100 rounded"
                    >
                      {typeof category === 'object' ? category.name : category}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="mb-4 text-gray-600">Stock: {product.stock}</p>
              <div className="flex space-x-2">
                <Link 
                  to={`/products/edit/${product._id}`}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center bg-gray-100 rounded-lg">
            <p className="mb-4">No products found.</p>
            <Link 
              to="/products/new" 
              className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-secondary"
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