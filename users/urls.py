from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name='register'),
    path('logout/', views.custom_logout, name='logout'),
    path('dashboard/', views.user_dashboard, name='user_dashboard'),
    path('seller/profile/', views.seller_profile, name='seller_profile'),
]