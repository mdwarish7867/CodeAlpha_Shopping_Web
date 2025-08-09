import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE}/api/cart`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      
      const data = await response.json();
      setCart(data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
  if (!user) {
    console.error('User must be logged in');
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // Crucial for cookies
      body: JSON.stringify({ 
        productId, 
        quantity,
        userId: user.userId || user._id  // Explicitly send user ID
      })
    });
      
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      
      const data = await response.json();
      setCart(data.items);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${API_BASE}/api/cart/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }
      
      const data = await response.json();
      setCart(data.items);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  // FIXED: Proper implementation for quantity update
  const updateCartItemQuantity = async (productId, newQuantity) => {
    try {
      const response = await fetch(`${API_BASE}/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update cart item quantity');
      }
      
      const data = await response.json();
      setCart(data.items);
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    cartCount,
    cartTotal,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};