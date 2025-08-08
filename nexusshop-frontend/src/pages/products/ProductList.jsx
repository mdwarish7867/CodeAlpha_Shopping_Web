import { useState, useEffect } from 'react';
import ProductCard from '../../components/product/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [error, setError] = useState(null);

  // Get API base URL from environment
  const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/api/products`),
          fetch(`${API_BASE}/api/categories`)
        ]);
        
        // Check if responses are JSON
        const productsContentType = productsRes.headers.get('content-type');
        const categoriesContentType = categoriesRes.headers.get('content-type');
        
        if (!productsContentType || !productsContentType.includes('application/json')) {
          const text = await productsRes.text();
          throw new Error(`Invalid response: ${text.substring(0, 100)}`);
        }
        
        if (!categoriesContentType || !categoriesContentType.includes('application/json')) {
          const text = await categoriesRes.text();
          throw new Error(`Invalid response: ${text.substring(0, 100)}`);
        }
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [API_BASE]);

  // Handle different category data structures
  const getCategoryId = (category) => {
    return category._id || category.id || category;
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => 
        product.categories.some(cat => 
          getCategoryId(cat) === selectedCategory
        )
      )
    : products;

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-gray-200 rounded-full border-t-primary animate-spin"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-8 text-center border border-red-200 rounded-lg bg-red-50">
          <h3 className="mb-4 text-xl font-bold text-red-700">Error Loading Products</h3>
          <p className="mb-6 text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-dark"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Categories Sidebar */}
        <div className="w-full md:w-64">
          <h2 className="mb-4 text-xl font-bold">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  !selectedCategory 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
            </li>
            {categories.map(category => (
              <li key={category._id || category.id}>
                <button 
                  onClick={() => setSelectedCategory(category._id || category.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === (category._id || category.id) 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Sorting Options */}
          <div className="p-4 mt-6 rounded-lg bg-gray-50">
            <h2 className="mb-3 text-lg font-semibold">Sort By</h2>
            <div className="space-y-2">
              <button 
                onClick={() => setSortOption('')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  !sortOption ? 'bg-primary text-white' : 'hover:bg-gray-200'
                }`}
              >
                Default
              </button>
              <button 
                onClick={() => setSortOption('price-low')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  sortOption === 'price-low' ? 'bg-primary text-white' : 'hover:bg-gray-200'
                }`}
              >
                Price: Low to High
              </button>
              <button 
                onClick={() => setSortOption('price-high')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  sortOption === 'price-high' ? 'bg-primary text-white' : 'hover:bg-gray-200'
                }`}
              >
                Price: High to Low
              </button>
              <button 
                onClick={() => setSortOption('rating')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  sortOption === 'rating' ? 'bg-primary text-white' : 'hover:bg-gray-200'
                }`}
              >
                Top Rated
              </button>
              <button 
                onClick={() => setSortOption('newest')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  sortOption === 'newest' ? 'bg-primary text-white' : 'hover:bg-gray-200'
                }`}
              >
                Newest First
              </button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-bold">All Products</h1>
            
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
              
              {/* Mobile category filter */}
              <div className="block md:hidden">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-sm border rounded-md"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category._id || category.id} value={category._id || category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {sortedProducts.length === 0 ? (
            <div className="py-12 text-center rounded-lg bg-gray-50">
              <div className="mb-4 text-5xl">📦</div>
              <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
              <p className="mb-4 text-gray-600">
                {selectedCategory 
                  ? `No products in this category yet.` 
                  : `No products available at the moment.`}
              </p>
              <button 
                onClick={() => setSelectedCategory('')}
                className="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-dark"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;