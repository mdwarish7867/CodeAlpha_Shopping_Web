import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    if (user) {
      // Redirect based on user type
      navigate(
        user.userType === 'seller'
          ? '/seller-dashboard'
          : '/products'
      );
    }
  }, [user, navigate]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Category fetch error:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [API_BASE_URL]);

  // Generate vibrant color based on category name
  const getCategoryColor = (name) => {
    const colors = [
  'bg-gradient-to-r from-blue-800 to-blue-600',
  'bg-gradient-to-r from-purple-800 to-purple-600',
  'bg-gradient-to-r from-pink-800 to-pink-600',
  'bg-gradient-to-r from-green-800 to-green-600',
  'bg-gradient-to-r from-yellow-700 to-yellow-500',
  'bg-gradient-to-r from-indigo-900 to-indigo-700',
  'bg-gradient-to-r from-red-800 to-red-600',
  'bg-gradient-to-r from-teal-800 to-teal-600',
];

    
    // Create a simple hash from category name to pick a consistent color
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Generate an icon based on category name
  const getCategoryIcon = (name) => {
    const iconMap = {
      electronics: "🔌",
      clothing: "👕",
      books: "📚",
      furniture: "🛋️",
      beauty: "💄",
      sports: "⚽",
      toys: "🧸",
      food: "🍎",
      jewelry: "💍",
      automotive: "🚗",
      health: "💊",
      garden: "🌿",
      music: "🎵",
      movies: "🎬",
      pets: "🐶",
    };
    
    // Try to find matching icon
    const lowerName = name.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    
    // Default icon for unknown categories
    return "🛒";
  };

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-center bg-cover" 
        style={{ backgroundImage: `url('https://i.postimg.cc/rw6WxLQ7/Flux-Dev-Create-a-modern-and-clean-hero-section-banner-image-f-2.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Welcome to NexusShop
          </h1>
          <p className="max-w-3xl mb-8 text-xl text-white md:text-2xl">
            Your one-stop destination for all your shopping needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/register" 
              className="px-6 py-3 font-bold text-white transition-all duration-300 transform rounded-lg bg-primary hover:bg-secondary hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </Link>
            <a 
              href="#categories" 
              className="px-6 py-3 font-bold transition-all duration-300 transform bg-white rounded-lg text-primary hover:scale-105 hover:shadow-lg"
            >
              Explore Categories
            </a>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-center">Shop by Category</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
              {error}
            </div>
          ) : categories.length === 0 ? (
            <div className="p-4 text-center text-gray-600 bg-gray-100 rounded-lg">
              No categories available yet
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {categories.map((category) => (
                <Link 
                  key={category._id} 
                  to="/login"
                  className="block overflow-hidden transition-all duration-300 rounded-lg shadow-md group hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`p-6 text-center ${getCategoryColor(category.name)}`}>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-4xl bg-white rounded-full bg-opacity-30 backdrop-blur-sm">
                      {getCategoryIcon(category.name)}
                    </div>
                    <h3 className="text-lg font-bold text-white">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-center">Why Choose NexusShop?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Fast Delivery", desc: "Get your orders delivered in record time" },
              { title: "Secure Payments", desc: "Your transactions are 100% secure" },
              { title: "24/7 Support", desc: "Our team is always ready to help" }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="p-6 text-center transition-colors border border-gray-100 rounded-lg bg-gray-50 hover:border-primary"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary">
                  <div className="text-xl font-bold text-white">{i+1}</div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;