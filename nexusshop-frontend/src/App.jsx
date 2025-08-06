import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/home/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import ProductList from "./pages/products/ProductList";
import ProductDetails from "./pages/products/ProductDetails";
import CartPage from "./pages/cart/CartPage";
import WishlistPage from "./pages/wishlist/WishlistPage";
import About from "./pages/static/About";
import Contact from "./pages/static/Contact";
import FAQ from "./pages/static/FAQ";
import NotFound from "./pages/NotFound";
import AddEditProduct from "./pages/products/AddEditProduct";


function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products/new" element={<AddEditProduct />} />
                  <Route path="/products/edit/:id" element={<AddEditProduct />} />
                  <Route path="/seller-dashboard" element={<SellerDashboard />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
