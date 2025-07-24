# ecommerce/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('store.urls')),  
    path('users/', include('users.urls')),
    path('cart/', include('cart.urls')),
    path("__reload__/", include("django_browser_reload.urls")),
]