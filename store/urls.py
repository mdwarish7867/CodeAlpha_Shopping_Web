# store/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.products, name='products'),
    path('products/<int:pk>/', views.product_detail, name='product_detail'),
    path('categories/', views.categories, name='categories'),
    path('category/<slug:category_slug>/', views.category_products, name='category'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('faq/', views.faq, name='faq'),
    path('return-policy/', views.return_policy, name='return_policy'),
    path('shipping-info/', views.shipping_info, name='shipping_info'),
    path('subscribe/', views.subscribe, name='subscribe'),
    path('seller/dashboard/', views.seller_dashboard, name='seller_dashboard'),
    path('seller/add-product/', views.add_product, name='add_product'),
]