import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-screen" 
        style={{ backgroundImage: `url('https://i.postimg.cc/rw6WxLQ7/Flux-Dev-Create-a-modern-and-clean-hero-section-banner-image-f-2.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to NexusShop
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl">
            Your one-stop destination for all your shopping needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </Link>
            <a 
              href="#categories" 
              className="bg-white text-primary font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Explore Categories
            </a>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                <h3 className="font-medium">Category {i+1}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NexusShop?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fast Delivery", desc: "Get your orders delivered in record time" },
              { title: "Secure Payments", desc: "Your transactions are 100% secure" },
              { title: "24/7 Support", desc: "Our team is always ready to help" }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-center hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white text-xl font-bold">{i+1}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this default export
export default LandingPage;