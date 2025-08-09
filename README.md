

# 🛍️ NexusShop - Full Stack E-commerce Platform (MERN Stack)

**🌐 Live Demo:**
[https://codealpha-shopping-web-frontend.onrender.com/](https://codealpha-shopping-web-frontend.onrender.com/)

---

## 📦 Project Structure

```
CODEALPHA_SHOPPING_WEB/
├── NexusShop-backend/      # Express.js Backend
├── nexusshop-frontend/     # React.js Frontend
└── README.md               # Project Documentation
```

---

## ✨ Tech Stack

**Frontend:**

* React.js
* Tailwind CSS
* React Router DOM
* Context API

**Backend:**

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

**Other Tools:**

* JWT Authentication
* Cloudinary (Image Storage)
* Axios
* dotenv
* bcryptjs
* cookie-parser

**Deployment:**

* Render (Frontend & Backend)

---

## 🛠️ Features

### 👤 User

* Registration & Login (JWT Auth)
* Browse Products by Category
* Product Details Page
* Add to Cart & Wishlist (with persistence)
* User Dashboard (Orders, Wishlist)
* Mobile-Friendly Responsive UI

### 🛒 Seller

* Seller Dashboard
* Add / Edit / Delete Products
* View Seller's Products

### 🛡️ Admin

* Manage Users, Sellers, and Products (via MongoDB Atlas or Render Admin Panel)

---

## 📂 Folder Breakdown

### **Backend (`NexusShop-backend/`)**

* **config/** → Cloudinary & MongoDB setup files
* **controllers/** → Auth, Product, Cart logic
* **middleware/** → JWT authentication & error handling
* **models/** → Mongoose Models (User, Product, Cart, Category)
* **routes/** → Express API route definitions
* **utils/** → Helper utilities (Token generation, category seeding)
* **server.js** → Express server entry point

### **Frontend (`nexusshop-frontend/`)**

* **context/** → AuthContext, CartContext
* **components/layout/** → Navbar, Footer
* **pages/auth/** → Login, Register
* **pages/dashboard/** → User Dashboard, Seller Dashboard
* **pages/products/** → Product List, Product Details, Add/Edit Product
* **pages/cart/** → Cart Page
* **pages/wishlist/** → Wishlist Page
* **pages/static/** → About, Contact, FAQ
* **App.jsx** → Route setup
* **index.js** → React app entry point

---

## 🚀 Getting Started Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/CODEALPHA_SHOPPING_WEB.git
cd CODEALPHA_SHOPPING_WEB
```

---

### 2️⃣ Backend Setup

```bash
cd NexusShop-backend
npm install
```

Create `.env` in `NexusShop-backend/`:

```env
MONGO_URI=mongodb+srv://warishansari018:bL2PSz34GKCx500z@trackruit.3ri2lhd.mongodb.net/NexusShop?retryWrites=true&w=majority
JWT_SECRET=bL2PSz34GKCx500z
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
```

> ⚠️ **Security Note:** Never commit your `.env` file to GitHub. Use `.gitignore` to keep it private.

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../nexusshop-frontend
npm install
```

Create `.env` in `nexusshop-frontend/`:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

Run frontend:

```bash
npm start
```

---

## 🌐 Deployment (Render)

### Backend (Express.js)

1. Go to **Render** → **New Web Service** → Connect GitHub → Select `NexusShop-backend`.
2. **Build Command:**

   ```
   npm install
   ```
3. **Start Command:**

   ```
   node server.js
   ```
4. Add environment variables from your `.env` file to Render’s **Environment Variables** section.

---

### Frontend (React.js)

1. Go to **Render** → **New Static Site** → Connect GitHub → Select `nexusshop-frontend`.
2. **Build Command:**

   ```
   npm run build
   ```
3. **Publish Directory:**

   * `dist` (if using Vite)
   * `build` (if using Create React App)
4. Add environment variable:

   ```env
   REACT_APP_BACKEND_URL=<Your Backend Render URL>
   ```

---

## 🔮 Future Improvements

* Payment Gateway Integration (Stripe/Razorpay)
* Order Placement & History
* Admin Panel UI
* Product Ratings & Reviews
* Search & Advanced Filtering

---

## 📝 License

This project is developed as part of the **CodeAlpha Internship Program** and is open-source for educational purposes.

---

## 🤝 Acknowledgements

* **CodeAlpha** — Internship Guidance
* **Render** — Free Hosting Services
* **MongoDB Atlas & Cloudinary** — Developer Tools