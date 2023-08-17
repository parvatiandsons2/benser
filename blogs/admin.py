from django.contrib import admin
from .models import Blog, BlogCategory

# Register your models here.

class BlogCategoryAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['name',]
    search_fields = ['name',]
    date_hierarchy = 'created_on'

class BlogAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['name','is_active']
    date_hierarchy = 'created_on'

admin.site.register(BlogCategory, BlogCategoryAdmin)
admin.site.register(Blog, BlogAdmin)
