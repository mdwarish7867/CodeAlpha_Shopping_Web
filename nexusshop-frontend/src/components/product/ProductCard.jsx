import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
      <Link to={`/products/${product._id}`}>
        <div className="w-full h-48 bg-gray-200 border-2 border-dashed rounded-t-lg" />
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="mb-1 text-lg font-semibold transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        
        <p className="mb-3 text-gray-600 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          <button 
            onClick={() => addToCart(product._id, 1)}
            className="px-3 py-1 text-white transition-colors rounded-md bg-primary hover:bg-secondary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;