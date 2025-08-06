import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/seller/products', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.userType === 'seller') {
      fetchProducts();
    }
  }, [user]);

  if (!user || user.userType !== 'seller') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">You don't have permission to access this page</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Seller Dashboard</h1>
      
      <div className="mb-6">
        <Link 
          to="/products/new" 
          className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-secondary"
        >
          Add New Product
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
              <p className="mb-4 text-gray-600">${product.price}</p>
              <div className="flex space-x-2">
                <Link 
                  to={`/products/edit/${product._id}`}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found. Add your first product!</p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;