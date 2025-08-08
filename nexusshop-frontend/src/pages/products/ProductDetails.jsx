import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_BASE]);

  const handleAddToCart = () => {
    addToCart(product._id, quantity);
  };

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-gray-200 rounded-full border-t-primary animate-spin"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <div className="max-w-md p-8 text-center border border-red-200 rounded-lg bg-red-50">
          <h3 className="mb-4 text-xl font-bold text-red-700">Error</h3>
          <p className="mb-6 text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-dark"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="bg-gray-100 border-2 border-dashed rounded-lg aspect-square" />
        
        {/* Product Details */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">({product.numReviews} reviews)</span>
          </div>
          
          <p className="mb-6 text-2xl font-bold text-primary">${product.price}</p>
          
          <p className="mb-6 text-gray-700">{product.description}</p>
          
          <div className="mb-6">
            <p className="mb-2 font-medium">Categories:</p>
            <div className="flex flex-wrap gap-2">
              {product.categories.map(category => (
                <span 
                  key={category._id} 
                  className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="mb-2 font-medium">Seller: 
              <span className="font-normal"> {product.seller.username}</span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 bg-gray-100 border rounded-l"
              >
                -
              </button>
              <input
  type="number"
  value={quantity}
  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
  className="w-16 py-2 text-center border-y"
/>

              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 text-gray-600 bg-gray-100 border rounded-r"
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!user}
              className={`px-6 py-2 text-white rounded-md ${
                user ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {user ? 'Add to Cart' : 'Login to Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;