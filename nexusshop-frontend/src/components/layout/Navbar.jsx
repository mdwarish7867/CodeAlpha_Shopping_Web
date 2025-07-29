import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">NexusShop</Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-900 border-b-2 border-primary px-1 pt-1">Home</Link>
              <Link to="/categories" className="text-gray-500 hover:text-gray-900">Categories</Link>
              <Link to="/about" className="text-gray-500 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-gray-500 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {currentUser.userType === 'user' && (
                  <>
                    <Link to="/cart" className="text-gray-500 hover:text-primary transition-all hover:scale-110">
                      <FaShoppingCart className="h-6 w-6" />
                    </Link>
                    <Link to="/wishlist" className="text-gray-500 hover:text-primary transition-all hover:scale-110">
                      <FaHeart className="h-6 w-6" />
                    </Link>
                  </>
                )}
                <Link 
                  to={currentUser.userType === 'seller' ? '/seller-dashboard' : '/dashboard'} 
                  className="text-gray-500 hover:text-primary transition-all hover:scale-110"
                >
                  <FaUser className="h-6 w-6" />
                </Link>
                <button 
                  onClick={logout}
                  className="ml-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-500 hover:text-primary">Login</Link>
                <Link to="/register" className="ml-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;