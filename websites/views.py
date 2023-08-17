from django.shortcuts import render

# Create your views here.


def index(request):
    try:
        __context = {}
        return render(request, "index.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def about(request):
    try:
        __context = {}
        return render(request, "about.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def items(request):
    try:
        __context = {}
        return render(request, "items.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def item_details(request, url):
    try:
        __context = {}
        return render(request, "item_details.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def gallery(request):
    try:
        __context = {}
        return render(request, "gallery.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})


def blogs(request):
    try:
        __context = {}
        return render(request, "blogs.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def blog_details(request, url):
    try:
        __context = {}
        return render(request, "blog_details.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})

def contact(request):
    try:
        __context = {}
        return render(request, "contact.html", __context)
    except Exception as error:
        return render(request, "error.html", {"error": error})
