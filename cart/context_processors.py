def cart_count(request):
    cart = request.session.get('cart', {})
    count = sum(item['quantity'] for item in cart.values()) if cart else 0
    return {'cart_count': count}