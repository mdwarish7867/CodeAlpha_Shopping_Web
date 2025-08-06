import { useState, useEffect } from 'react';
import ProductCard from '../../components/product/ProductCard';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }
        
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading products...</p>
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
                className={`w-full text-left px-4 py-2 rounded ${!selectedCategory ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                All Categories
              </button>
            </li>
            {categories.map(category => (
              <li key={category._id}>
                <button 
                  onClick={() => setSelectedCategory(category._id)}
                  className={`w-full text-left px-4 py-2 rounded ${selectedCategory === category._id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-bold">All Products</h1>
          
          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;