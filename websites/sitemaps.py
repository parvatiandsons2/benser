from django.contrib import sitemaps
from django.urls import reverse
from datetime import datetime

from blogs.models import Blog



class Site:
    domain = 'www.domain.in'

class StaticViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(StaticViewSitemap, self).get_urls(site=site, **kwargs)

    def items(self):
        return ['', 'about', 'contact', 'blogs']


class BlogSitemap(sitemaps.Sitemap):
    changefreq = "daily"
    priority = 0.5

    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(BlogSitemap, self).get_urls(site=site, **kwargs)

    def location(self, item):
        return "/blog/"+item.url+"/"

    def items(self):
        return Blog.objects.filter(is_active=True)

    def lastmod(self, obj):
        return obj.created_on