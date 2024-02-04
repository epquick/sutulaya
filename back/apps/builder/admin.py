from django.contrib import admin

from apps.builder.models import File


admin.site.register(File, admin.ModelAdmin)
