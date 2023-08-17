from django.db import models
from django.utils.timezone import datetime

# Create your models here.

class BlogCategory(models.Model):
    '''doc string here'''
    objects = models.Manager()

    name = models.CharField(max_length=200)

    is_active = models.BooleanField(default=True, editable=False)
    created_on = models.DateField(
        default=datetime.now, editable=False, null=True, blank=True)
    
    def __str__(self):
        return str(self.name)

    class Meta:
        '''doc string here'''
        verbose_name_plural = "Categories"

class Blog(models.Model):
    '''doc string here'''
    objects = models.Manager()

    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    image = models.ImageField(upload_to='item/')
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE)
    
    short_description = models.TextField()
    long_description = models.TextField()

    is_active = models.BooleanField(default=True, editable=False)
    created_on = models.DateField(
        default=datetime.now, editable=False, null=True, blank=True)
    
    def __str__(self):
        return str(self.name)

    class Meta:
        '''doc string here'''
        verbose_name_plural = "Blogs"
