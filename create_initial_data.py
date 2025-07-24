import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from store.models import Category, Product
from users.models import User
from django.contrib.auth.hashers import make_password

def create_data():
    # Create categories
    electronics = Category.objects.create(name="Electronics", slug="electronics")
    fashion = Category.objects.create(name="Fashion", slug="fashion")
    home = Category.objects.create(name="Home & Kitchen", slug="home-kitchen")
    
    # Create admin user
    admin = User.objects.create(
        username="admin",
        email="admin@example.com",
        password=make_password("adminpass"),
        user_type="seller",
        is_staff=True,
        is_superuser=True
    )
    
    # Create seller
    seller = User.objects.create(
        username="seller1",
        email="seller@example.com",
        password=make_password("sellerpass"),
        user_type="seller"
    )
    
    # Create products
    Product.objects.create(
        name="Wireless Headphones",
        slug="wireless-headphones",
        description="Premium noise-cancelling headphones",
        price=199.99,
        image="products/headphones.jpg",  # You need to add this image
        category=electronics,
        seller=seller,
        stock=50
    )
    
    Product.objects.create(
        name="Smart Watch",
        slug="smart-watch",
        description="Latest smart watch with health monitoring",
        price=249.99,
        image="products/smartwatch.jpg",
        category=electronics,
        seller=admin,
        stock=30
    )
    
    # Add more products as needed...

if __name__ == "__main__":
    create_data()
    print("Initial data created successfully!")