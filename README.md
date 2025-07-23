# 🛒 CODEALPHA SHOPPING WEB

A modern and responsive **Django E-Commerce** web application built with PostgreSQL and deployed on Render.  
Developed as part of my internship project at **CodeAlpha**.

---

## 🖥️ Live Demo

👉 Visit here: [https://codealpha-shopping-web.onrender.com](https://codealpha-shopping-web.onrender.com)

---

## 🚀 Tech Stack

- **Backend:** Django 5, PostgreSQL
- **Frontend:** HTML, CSS, Bootstrap (Django Templates)
- **Hosting:** Render (Free Tier)
- **Static Files:** WhiteNoise
- **Authentication:** Django's built-in auth system

---

## 📦 Features

- 🏬 Product listing and detail view
- 🔐 User registration and login
- 🛒 Add-to-cart functionality
- ⚙️ Admin panel for managing products
- 💾 PostgreSQL database with environment configuration
- 📦 Static files handled via WhiteNoise
- 🌐 Live deployment with Render

---

## 📁 Project Structure

```
CODEALPHA_SHOPPING_WEB/
├── ecommerce/            # Project settings
├── store/                # Product views/templates/static
├── users/                # Login/Register system
├── cart/                 # Cart functionality
├── staticfiles/          # Static root (for production)
├── templates/            # Shared templates
├── .env                  # Secrets & DB config
├── manage.py
├── requirements.txt
├── Procfile
└── README.md
```

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the Repository

```
git clone https://github.com/mdwarish7867/CodeAlpha_Shopping_Web.git
cd CodeAlpha_Shopping_Web
```

### 2. Set Up Virtual Environment

```
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 3. Install Dependencies

```
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_HOST=your_db_host
DB_PORT=5432
DEBUG=True
```

---

### 5. Run the Development Server

```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` in your browser.

---

## ☁️ Deployment on Render

> This project is deployed on [Render](https://render.com) using `runserver` (for testing/demo purposes).

### Render Setup Steps:

- Connect your GitHub repo to Render
- Set the **build command**:
  ```
  pip install -r requirements.txt
  ```
- Set the **start command**:
  ```
  python manage.py runserver 0.0.0.0:10000
  ```
- Add these environment variables in Render Dashboard:
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_HOST`
  - `DB_PORT`
  - `DEBUG`
- Run:
  ```
  python manage.py collectstatic --noinput
  ```

---

## 📌 To-Do List

- [x] Product CRUD via Django Admin
- [x] User login & register pages
- [x] Shopping cart system
- [ ] Order tracking and checkout
- [ ] Product search and filtering
- [ ] Payment gateway integration (Razorpay/Stripe)

---

## 👨‍💻 Author

**Mohammad Warish Ansari**  
B.Tech CSE | MERN & Django Developer  
[LinkedIn Profile](https://www.linkedin.com/in/md-warish-ansari-46b1ab258/)

---

## 📜 License

This project is intended for learning and educational purposes under internship tasks.  
Not licensed for commercial use.

---

## 🙏 Special Thanks

- **CodeAlpha** – Internship Provider
- **Render** – Hosting Platform
- Django & Open Source Community ❤️
