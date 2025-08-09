import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
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
import About from "./pages/static/About";
import Contact from "./pages/static/Contact";
import FAQ from "./pages/static/FAQ";
import NotFound from "./pages/NotFound";
import AddEditProduct from "./pages/products/AddEditProduct";

// Moved outside App for clarity
function HomeRedirect() {
  const { user } = useAuth();

  if (user) {
    return user.userType === "seller"
      ? <Navigate to="/seller-dashboard" replace />
      : <Navigate to="/products" replace />;
  }

  return <LandingPage />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomeRedirect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products/new" element={<AddEditProduct />} />
                <Route path="/products/edit/:id" element={<AddEditProduct />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
