from django.shortcuts import render
from blogs.models import Blog, BlogCategory
from items.models import Item, ItemCategory
from websites.models import Gallery, Sliders, Testimonial, Contacts

def default_context():
    '''doc string here'''
    __context = {}
    # __context["category"] = ItemCategory.objects.filter(is_active=True)
    return __context

def index(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['sliders'] = Sliders.objects.filter(is_active=True).first()
       
        __context['testimonials'] = Testimonial.objects.filter(is_active=True).order_by("-id")[:4]
        __context['items'] = Item.objects.filter(is_active=True)
        # __context['sliders'] = Sliders.objects.filter(is_active=True)
        __context['galleries'] = Gallery.objects.filter(is_active=True)
        __context['blogs'] = Blog.objects.filter(is_active=True).order_by("-id")[:3]

        return render(request, "index.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def about(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['testimonials'] = Testimonial.objects.filter(is_active=True).order_by("-id")[:4]
        __context['blogs'] = Blog.objects.filter(is_active=True).order_by("-id")[:3]
        return render(request, "about.html",__context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def items(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['items'] = Item.objects.filter(is_active=True)
        return render(request, "items.html",__context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def items_by_category(request, url):
    '''doc string here'''
    try:
        __context = default_context()
        __context['categories'] = ItemCategory.objects.filter(is_active=True)
        __context['items'] = Item.objects.filter(category__url=url)
        return render(request, "items.html",__context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def item_details(request, url):
    '''doc string here'''
    try:
        __context = default_context()
        __context['categories'] = ItemCategory.objects.filter(is_active=True)
        __context['item'] = Item.objects.get(url=url)
        return render(request, "item_details.html",__context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def gallery(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['galleries'] = Gallery.objects.filter(is_active=True)
        return render(request, "gallery.html",__context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def blogs(request):
    '''doc string here'''
    try:
        __context = default_context()
        __context['blogs'] = Blog.objects.filter(is_active=True)
        __context["category"] = BlogCategory.objects.filter(is_active=True)
        return render(request, "blogs.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def blogs_by_category(request, url):
    '''doc string here'''
    try:
        __context = default_context()
        __context['blogs'] = Blog.objects.filter(category__url=url)
        return render(request, "blogs.html",__context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def blog_details(request, url):
    '''doc string here'''
    try:
        __context = default_context()
        blog = Blog.objects.all()
        __context['categories'] = BlogCategory.objects.filter(is_active=True)
        __context['blog'] = blog.get(url=url)
        __context['recent'] = blog.exclude(url=url).order_by('-created_on')[:3]
        print(__context['blog'])
        return render(request, "blog_detail.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def contact(request):
    '''doc string here'''
    try:
        __context = default_context()
        if request.method == 'POST':
            Contacts.objects.create(
                name=request.POST['name'],
                email=request.POST['email'],
                mobile=request.POST['phone'],
                subject=request.POST['subject'],
                message=request.POST['message'],
            )
        return render(request, "contact.html",__context)
    except Exception as error:
        return render(request, "error.html", {"error": error})
