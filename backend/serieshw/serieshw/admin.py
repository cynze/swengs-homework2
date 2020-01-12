from django.contrib import admin
from .models import *


class EpisodeAdmin(admin.ModelAdmin):
    list_filter = ('author__last_name',)


class AuthorAdmin(admin.ModelAdmin): pass


class SeriesAdmin(admin.ModelAdmin): pass


admin.site.register(Episode, EpisodeAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Series, SeriesAdmin)
