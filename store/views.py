# store/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Product, Category, Subscriber
from django.contrib.auth.decorators import login_required
from . forms import ProductForm

def home(request):
    featured_products = Product.objects.filter(stock__gt=0)[:8]
    return render(request, 'store/home.html', {'products': featured_products})

def products(request):
    products = Product.objects.all()
    return render(request, 'store/products.html', {'products': products})

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'store/product_detail.html', {'product': product})
    
def categories(request):
    categories = Category.objects.all()
    return render(request, 'store/categories.html', {'categories': categories})

def category_products(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)
    return render(request, 'store/category_products.html', {
        'category': category,
        'products': products
    })
    
    

def about(request):
    return render(request, 'store/about.html')

from django.core.mail import send_mail
from django.conf import settings

from django.core.mail import send_mail, BadHeaderError

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        subject = f"Contact Form Submission from {name}"
        
        try:
            send_mail(
                subject,
                message,
                email,
                [settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
            )
            messages.success(request, 'Thank you for your message! We will contact you soon.')
        except BadHeaderError:
            messages.error(request, 'Invalid header found.')
        except Exception as e:
            messages.error(request, f'Could not send email. Error: {str(e)}')
        
        return redirect('contact')
    return render(request, 'store/contact.html')

def faq(request):
    faqs = [
        {'question': 'How do I place an order?', 'answer': 'Select products, add to cart, and checkout.'},
        {'question': 'What payment methods do you accept?', 'answer': 'We accept credit cards, PayPal, and bank transfers.'},
        {'question': 'How long does shipping take?', 'answer': 'Typically 3-5 business days.'},
    ]
    return render(request, 'store/faq.html', {'faqs': faqs})

def return_policy(request):
    return render(request, 'store/return_policy.html')

def shipping_info(request):
    return render(request, 'store/shipping_info.html')

def subscribe(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        if email:
            # Save subscriber to database
            Subscriber.objects.get_or_create(email=email)
            messages.success(request, 'Thank you for subscribing to our newsletter!')
            return redirect('home')
    return redirect('home')



@login_required
def seller_dashboard(request):
    if not request.user.user_type == 'seller':
        return redirect('home')
    
    products = Product.objects.filter(seller=request.user)
    return render(request, 'store/seller_dashboard.html', {'products': products})


@login_required
def seller_dashboard(request):
    if not request.user.user_type == 'seller':
        return redirect('home')
    
    products = Product.objects.filter(seller=request.user)
    return render(request, 'store/seller_dashboard.html', {'products': products})

@login_required
def add_product(request):
    if not request.user.user_type == 'seller':
        return redirect('home')
    
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save(commit=False)
            product.seller = request.user
            product.save()
            messages.success(request, 'Product added successfully!')
            return redirect('seller_dashboard')
    else:
        form = ProductForm()
    return render(request, 'store/add_product.html', {'form': form})