from django.contrib import admin
from .models import Contacts, Testimonial, Sliders

# Register your models here.


class ContactsAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['name','email','mobile','subject']
    search_fields = ['name','email','mobile']
    date_hierarchy = 'created_on'

class SliderAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['title','is_active']
    date_hierarchy = 'created_on'

class TestimonialAdmin(admin.ModelAdmin):
    '''doc string here'''
    list_display = ['name','is_active']
    date_hierarchy = 'created_on'


admin.site.register(Contacts, ContactsAdmin)
admin.site.register(Sliders, SliderAdmin)
admin.site.register(Testimonial, TestimonialAdmin)
