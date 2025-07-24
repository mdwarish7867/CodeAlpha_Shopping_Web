from django.contrib import admin
from .models import Category, Product, Subscriber

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'seller')
    list_filter = ('category', 'seller')
    search_fields = ('name', 'description')

admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(Subscriber)  