import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    categories: [],
    images: [''],
    stock: 0
  });
  const [submitting, setSubmitting] = useState(false);
  
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";  
  const isEditMode = Boolean(id);

useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const categoriesResponse = await fetch(`${API_BASE_URL}/api/categories`);
      if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
      const categoriesData = await categoriesResponse.json();
      
      if (isMounted) setCategories(categoriesData);
      
      // Only fetch product in edit mode
      if (isEditMode) {
        const productResponse = await fetch(`${API_BASE_URL}/api/products/${id}`, {
          credentials: 'include'
        });
        
        if (productResponse.status === 401) {
          logout();
          navigate('/login');
          return;
        }
        
        if (!productResponse.ok) {
          throw new Error(`Failed to fetch product: ${productResponse.status}`);
        }
        
        const product = await productResponse.json();
        
        // Debugging logs
        console.log("Product data:", product);
        console.log("User object:", user); // Log entire user object
        
        // Use user._id instead of user.userId
        if (product.seller._id !== user?._id) {
          console.log(`Redirecting: ${product.seller._id} !== ${user?._id}`);
          navigate('/seller-dashboard');
          return;
        }
        
        // Extract category IDs
        const categoryIds = product.categories.map(cat => 
          typeof cat === 'object' ? cat._id : cat
        );
        
        if (isMounted) {
          setProductData({
            name: product.name,
            description: product.description,
            price: product.price,
            categories: categoryIds,
            images: product.images,
            stock: product.stock
          });
        }
      }
    } catch (error) {
      if (isMounted) setError(error.message || 'Failed to load data');
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  // Only fetch if user is available
  if (user) {
    fetchData();
  }
  
  return () => {
    isMounted = false;
  };
}, [id, isEditMode, user, navigate, API_BASE_URL, logout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setProductData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...productData.images];
    newImages[index] = value;
    setProductData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    if (productData.images.length <= 1) return;
    const newImages = productData.images.filter((_, i) => i !== index);
    setProductData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setSubmitting(true);
    
    // Basic validation
    if (!productData.name || !productData.description) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }
    
    if (productData.categories.length === 0) {
      setError('Please select at least one category');
      setSubmitting(false);
      return;
    }
    
    if (productData.price <= 0) {
      setError('Price must be greater than 0');
      setSubmitting(false);
      return;
    }
    
    if (productData.stock < 0) {
      setError('Stock cannot be negative');
      setSubmitting(false);
      return;
    }
    
    // Filter out empty images
    const filteredImages = productData.images.filter(img => img.trim() !== '');
    if (filteredImages.length === 0) {
      setError('Please add at least one image');
      setSubmitting(false);
      return;
    }
    
    try {
      const url = isEditMode 
        ? `${API_BASE_URL}/api/products/${id}`
        : `${API_BASE_URL}/api/products`;
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const requestBody = {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        categories: productData.categories,
        images: filteredImages
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include' // Ensures cookies are sent
      });
      
      if (response.status === 401) {
        logout();
        navigate('/login');
        return;
      }
      
      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
        setTimeout(() => navigate('/seller-dashboard'), 2000);
      } else {
        let errorMessage = 'Operation failed';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        
        setError(errorMessage);
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">
        {isEditMode ? 'Edit Product' : 'Add New Product'}
      </h1>
      
      {successMessage && (
        <div className="p-4 mb-6 text-green-700 bg-green-100 border border-green-400 rounded">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border rounded"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block mb-2 font-medium">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0.01"
              step="0.01"
              className="w-full px-3 py-2 border rounded"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="stock" className="block mb-2 font-medium">
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              required
              min="0"
              className="w-full px-3 py-2 border rounded"
              value={productData.stock}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">
            Categories *
          </label>
          {categories.length === 0 ? (
            <div className="p-2 text-yellow-700 bg-yellow-100 rounded">
              {loading ? "Loading categories..." : "No categories available"}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {categories.map(category => (
                <div key={category._id} className="flex items-start">
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    checked={productData.categories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                    className="w-4 h-4 mt-1 text-primary rounded focus:ring-primary"
                  />
                  <label 
                    htmlFor={`category-${category._id}`} 
                    className="ml-2 text-sm"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows="5"
            className="w-full px-3 py-2 border rounded"
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block font-medium">
              Images (URLs) *
            </label>
            <button 
              type="button"
              onClick={addImageField}
              className="px-3 py-1 text-sm text-white rounded bg-primary"
            >
              Add Image
            </button>
          </div>
          
          {productData.images.map((image, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
                placeholder={`Image URL ${index + 1}`}
                required={index === 0}
              />
              {productData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="p-2 ml-2 text-red-500"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/seller-dashboard')}
            className="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 font-bold text-white rounded ${
              submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary'
            }`}
          >
            {submitting 
              ? (isEditMode ? 'Updating...' : 'Adding...') 
              : (isEditMode ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProduct;