from django.contrib import admin

from apps.pattern.models import Pattern, PatternCrossType, PatternCross


class PatternAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'width', 'height', 'created_at', 'id')


class PatternCrossTypeAdmin(admin.ModelAdmin):
    list_display = ('pattern', 'type', 'color', 'symbol', 'id')


class PatternCrossAdmin(admin.ModelAdmin):
    list_display = ('type', 'x_coord', 'y_coord', 'is_done', 'done_at', 'id')


admin.site.register(Pattern, PatternAdmin)
admin.site.register(PatternCrossType, PatternCrossTypeAdmin)
admin.site.register(PatternCross, PatternCrossAdmin)
