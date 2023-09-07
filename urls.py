from django.contrib import admin
from django.urls import path
from websites import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from websites.sitemaps import BlogSitemap, StaticViewSitemap

sitemaps = {
    'static': StaticViewSitemap,
    'blog': BlogSitemap,
}

urlpatterns = [
    path("", views.index, name="index"),
    path("about/", views.about, name="about"),
    path("items/", views.items, name="items"),
    path("item/category/<str:url>/", views.items_by_category, name="items_by_category"),
    path("item-details/<str:url>/", views.item_details, name="item_details"),
    path("blogs/", views.blogs, name="blogs"),
    path("blog/category/<str:url>/", views.blogs_by_category, name="blogs_by_category"),
    path("blog-details/<str:url>/", views.blog_details, name="blog_details"),
    path("gallery/", views.gallery, name="gallery"),
    path("contact/", views.contact, name="contact"),
    path("admin/", admin.site.urls),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
