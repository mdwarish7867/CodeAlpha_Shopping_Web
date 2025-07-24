from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, SellerProfile

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'user_type', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('user_type', 'phone', 'address')}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(SellerProfile)