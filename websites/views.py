from django.shortcuts import render
from blogs.models import Blog
from items.models import Item, ItemCategory
from websites.models import Gallery, Sliders, Testimonial

# Create your views here.


def default_context():
    '''doc string here'''
    __context = {}
    __context["category"] = ItemCategory.objects.filter(is_active=True)
    return __context


def index(request):
    '''doc string here'''
    try:
        # __context = default_context()
        # __context['sliders'] = Sliders.objects.filter(is_active=True)
        # __context['testimonials'] = Testimonial.objects.filter(is_active=True)
        # __context['items'] = Item.objects.filter(is_active=True)
        # __context['sliders'] = Sliders.objects.filter(is_active=True)
        # __context['galleries'] = Gallery.objects.filter(is_active=True)
        # __context['blogs'] = Blog.objects.filter(is_active=True)

        return render(request, "index.html")
    except Exception as error:
        return render(request, "error.html", {"error": error})


def about(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['testimonials'] = Testimonial.objects.filter(is_active=True)
        return render(request, "about.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def items(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['items'] = Item.objects.filter(is_active=True)
        return render(request, "items.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def items_by_category(request, url):
    '''doc string here'''
    try:
        __context = default_context()
        __context['blogs'] = Item.objects.filter(category__url=url)
        return render(request, "blogs.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def item_details(request, url):
    '''doc string here'''
    try:
        __context = default_context()
        __context['item'] = Item.objects.filter(url=url)
        return render(request, "item_details.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def gallery(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['galleries'] = Gallery.objects.filter(is_active=True)
        return render(request, "gallery.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def blogs(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['blogs'] = Blog.objects.filter(is_active=True)
        return render(request, "blogs.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def blogs_by_category(request, url):
    '''doc string here'''
    try:
        __context = default_context()
        __context['blogs'] = Blog.objects.filter(category__url=url)
        return render(request, "blogs.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def blog_details(request, url):
    '''doc string here'''
    try:
        __context = default_context()
        __context['blog'] = Blog.objects.filter(url=url)
        return render(request, "blog_details.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def contact(request):
    '''doc string here'''
    try:
        __context = default_context()

        return render(request, "contact.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})
