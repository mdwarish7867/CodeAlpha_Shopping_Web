# NexusShop - Full Stack E-commerce Platform (MERN Stack)

**🌐 Live Demo:**
https://codealpha-shopping-web.onrender.com

---

## 📦 Project Structure

```
CODEALPHA_SHOPPING_WEB/
├── NexusShop-backend/      # Express.js Backend
├── nexusshop-frontend/     # React.js Frontend
└── README.md                # This File
```

---

## ✨ Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router DOM, Context API
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Cloud Storage:** Cloudinary (for product images)
- **Deployment:** Render (Frontend & Backend)
- **Others:** Axios, dotenv, bcryptjs, cookie-parser

---

## 🛠️ Features

### 👤 User Features:

- User Registration & Login (JWT Auth)
- Browse Products by Categories
- Product Details View
- Add to Cart & Wishlist (with persistence)
- User Dashboard (Orders, Wishlist)
- Responsive UI (Mobile-friendly)

### 🛒 Seller Features:

- Seller Dashboard
- Add / Edit / Delete Products
- View Seller’s Products

### 🛡️ Admin Features (via MongoDB/Render Dashboard):

- Manage Users, Sellers, Products via MongoDB Atlas and Render Admin Panel

---

## 📁 Folder Breakdown

### Backend (NexusShop-backend/)

- config/ → Cloudinary & MongoDB Setup
- controllers/ → Auth, Product, Cart logic
- middleware/ → JWT Auth Middleware & Error Handling
- models/ → Mongoose Models (User, Product, Cart)
- routes/ → Express API Routes
- utils/ → Helper Utilities (Token Generation, Seed Categories)
- server.js → Express Server Entry Point

### Frontend (nexusshop-frontend/)

- context/ → AuthContext, CartContext, WishlistContext
- components/layout/ → Navbar, Footer
- pages/auth/ → Login, Register Pages
- pages/dashboard/ → User Dashboard & Seller Dashboard
- pages/products/ → Product List & Product Details
- pages/cart/ → Cart Page
- pages/wishlist/ → Wishlist Page
- pages/static/ → About, Contact, FAQ
- App.jsx → Frontend Route Setup
- index.js → React App Entry Point

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

git clone [https://github.com/yourusername/CODEALPHA_SHOPPING_WEB.git](https://github.com/yourusername/CODEALPHA_SHOPPING_WEB.git)
cd CODEALPHA_SHOPPING_WEB

### 2. Backend Setup

cd NexusShop-backend
npm install

Create a .env file in NexusShop-backend/:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Run Backend Locally:
npm run dev

### 3. Frontend Setup

cd ../nexusshop-frontend
npm install
npm run dev

---

## 🌐 Deployment on Render

### Backend (Express.js):

1. Go to Render → New Web Service → Connect your GitHub → Select NexusShop-backend.
2. Build Command: npm install
3. Start Command: node server.js
4. Add Environment Variables from .env in Render dashboard.

### Frontend (React.js):

1. Go to Render → New Static Site → Connect your GitHub → Select nexusshop-frontend.
2. Build Command: npm run build
3. Publish Directory: dist (if using Vite) or build (if using Create React App)
4. Add Environment Variable:

   - Key: VITE_BACKEND_URL → Value: <Your Backend Render URL>

---

## 📄 Future Improvements

- Integrate Payment Gateway (Stripe/Razorpay)
- Full Order Placement & History
- Admin Panel UI
- Product Ratings & Reviews
- Search & Advanced Filtering

---

## 📝 License

This project is part of the CodeAlpha Internship Program and is open-source for educational purposes.

---

## 🤝 Acknowledgements

- CodeAlpha for Internship Guidance
- Render for Free Hosting Services
- MongoDB Atlas & Cloudinary for Developer Tools
