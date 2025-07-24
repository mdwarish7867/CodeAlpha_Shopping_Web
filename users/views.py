from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserRegisterForm, SellerProfileForm
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import logout

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                
                # Custom redirect based on user type
                if user.user_type == 'seller':
                    return redirect('seller_dashboard')
                return redirect('home')
    # ...
    else:
        form = AuthenticationForm()
    return render(request, 'users/login.html', {'form': form})

def custom_logout(request):
    logout(request)
    messages.success(request, "You have been logged out successfully.")
    return redirect('home')

def user_register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            # Get account type from form data
            user.user_type = request.POST.get('user_type', 'buyer')
            user.save()
            
            if user.user_type == 'seller':
                login(request, user)
                return redirect('seller_profile')
                
            login(request, user)
            return redirect('home')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})

def seller_profile(request):
    if not request.user.is_authenticated or request.user.user_type != 'seller':
        return redirect('home')
    
    if request.method == 'POST':
        form = SellerProfileForm(request.POST)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            # Redirect to seller dashboard after profile creation
            return redirect('seller_dashboard')
    else:
        form = SellerProfileForm()
    
    return render(request, 'users/seller_profile.html', {'form': form})
@login_required
def user_dashboard(request):
    """
    Dashboard view for regular users (buyers)
    """
    # Add any buyer-specific data you want to display
    context = {
        'user': request.user,
        'orders': []  # You can add order history here later
    }
    return render(request, 'users/dashboard.html', context)