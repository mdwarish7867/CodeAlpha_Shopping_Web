import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchWishlist = async () => {
    if (!currentUser) return;
    
    try {
      const { data } = await axios.get('/api/wishlist');
      setWishlist(data.items || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const { data } = await axios.post('/api/wishlist', { productId });
      setWishlist(data.items);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/wishlist/${productId}`);
      setWishlist(data.items);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  useEffect(() => {
    if (currentUser) fetchWishlist();
    else setWishlist([]);
  }, [currentUser]);

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    wishlistCount: wishlist.length,
    loading
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};