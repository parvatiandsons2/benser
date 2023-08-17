from django.db import models
from django.utils.timezone import datetime

# Create your models here.

class Contacts(models.Model):
    '''doc string here'''
    objects = models.Manager()

    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=250)
    mobile = models.CharField(max_length=15)
    subject = models.CharField(max_length=250)
    message = models.TextField(null=True, blank=True)

    is_sean = models.BooleanField(default=False, editable=False)
    is_active = models.BooleanField(default=True, editable=False)
    created_on = models.DateField(
        default=datetime.now, editable=False, null=True, blank=True)
    
    def __str__(self):
        return str(self.name)

    class Meta:
        '''doc string here'''
        verbose_name_plural = "Contact Us"


class Sliders(models.Model):
    '''doc string here'''
    objects = models.Manager()

    title = models.CharField(max_length=200, default='NA')
    sub_title = models.EmailField(max_length=250, default='NA')
    image = models.ImageField(upload_to='sliders/')
    button_text = models.CharField(max_length=250, default='NA')
    button_url = models.CharField(max_length=250, default='#')

    is_active = models.BooleanField(default=True, editable=False)
    created_on = models.DateField(
        default=datetime.now, editable=False, null=True, blank=True)
    
    def __str__(self):
        return str(self.title)

    class Meta:
        '''doc string here'''
        verbose_name_plural = "Sliders"


class Testimonial(models.Model):
    '''doc string here'''
    objects = models.Manager()

    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="testimonials/",null=True, blank=True)
    description = models.TextField()

    is_active = models.BooleanField(default=True, editable=False)
    created_on = models.DateField(
        default=datetime.now, editable=False, null=True, blank=True)
    
    def __str__(self):
        return str(self.name)

    class Meta:
        '''doc string here'''
        verbose_name_plural = "Testimonials"
