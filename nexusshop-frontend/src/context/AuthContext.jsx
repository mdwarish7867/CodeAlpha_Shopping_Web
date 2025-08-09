import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
  credentials: 'include'  // Ensure this exists in all auth requests
});

        if (response.ok) {
          const data = await response.json();
          setUser({
            _id: data._id,          // Standard MongoDB ID
            userId: data._id,        // Alias for compatibility
            ...data
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [API_BASE_URL]);

  // Login function
 // AuthContext.js
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      const userData = {
        _id: data._id,
        userId: data._id,
        ...data
      };
      setUser(userData);
      return { success: true, user: userData }; // Return user data here
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: 'Network error' };
  }
};

  // Register function
  const register = async (username, email, password, userType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, userType }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          _id: data._id,          // Standard MongoDB ID
          userId: data._id,        // Alias for compatibility
          ...data
        });
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/update-password`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Password update failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updatePassword
  };

  

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};