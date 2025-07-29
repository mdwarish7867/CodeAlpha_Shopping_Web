import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchCart = async () => {
    if (!currentUser) return;
    
    try {
      const { data } = await axios.get('/api/cart');
      setCart(data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await axios.post('/api/cart', { productId, quantity });
      setCart(data.items);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`);
      setCart(data.items);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  useEffect(() => {
    if (currentUser) fetchCart();
    else setCart([]);
  }, [currentUser]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};