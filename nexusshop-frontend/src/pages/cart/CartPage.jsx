import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState({});
  const navigate = useNavigate();

  // FIXED: Handle quantity change with validation
  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    
    setUpdatingItems(prev => ({ ...prev, [productId]: true }));
    
    try {
      await updateCartItemQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setUpdatingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/checkout');
    }, 1500);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="py-12 text-center rounded-lg bg-gray-50">
          <div className="mb-4 text-5xl">🛒</div>
          <h3 className="mb-2 text-xl font-semibold">Your cart is empty</h3>
          <p className="mb-4 text-gray-600">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="px-4 py-2 text-white rounded-md bg-primary hover:bg-primary-dark"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="overflow-hidden bg-white border rounded-lg">
              <div className="hidden grid-cols-12 p-4 font-medium bg-gray-50 md:grid">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {cart.map(item => (
                <div key={item.product._id} className="grid grid-cols-1 p-4 border-b md:grid-cols-12">
                  <div className="flex items-center col-span-6 mb-4 md:mb-0">
                    <img 
                      src={item.product.images?.[0] || 'https://via.placeholder.com/80'} 
                      alt={item.product.name} 
                      className="w-16 h-16 mr-4 rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.product.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.product._id)}
                        className="mt-1 text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center col-span-2 mb-4 md:mb-0">
                    <span className="mr-2 font-medium md:hidden">Price:</span>
                    <span>${item.product.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center col-span-2 mb-4 md:mb-0">
                    <span className="mr-2 font-medium md:hidden">Quantity:</span>
                    <div className="flex items-center mx-auto">
                      <button 
                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        disabled={updatingItems[item.product._id]}
                        className="px-3 py-1 text-gray-600 bg-gray-100 border rounded-l disabled:opacity-50"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => {
                          const value = parseInt(e.target.value) || 1;
                          handleQuantityChange(item.product._id, value);
                        }}
                        className="w-12 py-1 text-center border-y"
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        disabled={updatingItems[item.product._id]}
                        className="px-3 py-1 text-gray-600 bg-gray-100 border rounded-r disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    {updatingItems[item.product._id] && (
                      <div className="w-4 h-4 ml-2 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center col-span-2">
                    <span className="mr-2 font-medium md:hidden">Total:</span>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="p-6 bg-white border rounded-lg">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="pt-3 mt-3 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`w-full py-3 mt-6 text-white rounded-md ${
                  loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              
              <button
                onClick={() => navigate('/products')}
                className="w-full py-3 mt-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;