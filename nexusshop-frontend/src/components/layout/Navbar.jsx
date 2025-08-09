import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/nexusshop-nav.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');  // Redirect to home page after logout
  };

  const handleLogoClick = (e) => {
    if (user) {
      e.preventDefault();
      if (user.userType === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/products');
      }
    }
  };

  return (
    <nav className="text-white shadow-md bg-gradient-to-r from-black to-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <Link 
                to="/" 
                onClick={handleLogoClick}
                className="flex items-center h-full"
              >
                <img 
                  src={logo} 
                  alt="NexusShop Logo" 
                  className="object-contain w-auto h-full" 
                />
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Show Seller Dashboard only for sellers */}
                {user.userType === 'seller' && (
                  <Link to="/seller-dashboard" className="transition-colors hover:text-primary">
                    Seller Dashboard
                  </Link>
                )}
                
                {/* Show Dashboard only for regular users */}
                {user.userType === 'user' && (
                  <Link to="/dashboard" className="transition-colors hover:text-primary">
                    Dashboard
                  </Link>
                )}

                {user.userType === 'user' && (
                  <Link to="/cart" className="relative transition-colors hover:text-primary">
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
                  className="transition-colors hover:text-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="transition-colors hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="transition-colors hover:text-primary">
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
