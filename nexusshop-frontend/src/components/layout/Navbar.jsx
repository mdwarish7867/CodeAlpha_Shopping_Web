import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');  // Redirect to home page after logout
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-primary">
                NexusShop
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Show Seller Dashboard only for sellers */}
                {user.userType === 'seller' && (
                  <Link to="/seller-dashboard" className="text-gray-700 hover:text-primary">
                    Seller Dashboard
                  </Link>
                )}
                
                {/* Show Dashboard only for regular users */}
                {user.userType === 'user' && (
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                    Dashboard
                  </Link>
                )}

                {user.userType === 'user' && (
                  <Link to="/cart" className="relative text-gray-700 hover:text-primary">
                    Cart
                    {cartCount > 0 && (
                      <span className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-3">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;