from django.contrib import admin
from .models import ItemCategory, Item

# Register your models here.

class ItemCategoryAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['name',]
    search_fields = ['name',]
    date_hierarchy = 'created_on'

class ItemAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['name','is_active']
    date_hierarchy = 'created_on'

admin.site.register(ItemCategory, ItemCategoryAdmin)
admin.site.register(Item, ItemAdmin)
