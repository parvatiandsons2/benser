from django.contrib import admin
from .models import ItemCategory, Item
from django.template.defaultfilters import slugify
# Register your models here.

class ItemCategoryAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['name',]
    search_fields = ['name',]
    date_hierarchy = 'created_on'

    def save_model(self, request, obj, form, change):
        obj.url = slugify(obj.name)
        super().save_model(request, obj, form, change)


class ItemAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['name','is_active']
    date_hierarchy = 'created_on'

    def save_model(self, request, obj, form, change):
        obj.url = slugify(obj.name)
        super().save_model(request, obj, form, change)


admin.site.register(ItemCategory, ItemCategoryAdmin)
admin.site.register(Item, ItemAdmin)
