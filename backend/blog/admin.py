from django.contrib import admin
from .models import Blog


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "author",
        "created_date",
        "updated_date",
    )

    search_fields = (
        "title",
        "content",
        "author__username",
    )

    list_filter = (
        "created_date",
        "updated_date",
    )