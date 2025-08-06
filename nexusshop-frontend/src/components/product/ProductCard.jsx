import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
      <div className="w-full h-48 bg-gray-200 border-2 border-dashed rounded-t-lg" />
      
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="mb-1 text-lg font-semibold transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-sm text-gray-600">({product.numReviews})</span>
        </div>
        <p className="mb-3 text-gray-600 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          <button className="px-3 py-1 text-white transition-colors rounded-md bg-primary hover:bg-secondary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;