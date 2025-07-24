from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, SellerProfile
from store.models import Product  # Correct import for Product
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, SellerProfile

class UserRegisterForm(UserCreationForm):
    # Remove the explicit user_type field
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        
class SellerProfileForm(forms.ModelForm):
    class Meta:
        model = SellerProfile
        fields = ['store_name', 'bio']
        
class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image', 'category', 'stock']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
        }