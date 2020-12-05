from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import *


class UserAdmin(BaseUserAdmin):
    def get_search_results(self, request, queryset, search_term):
        queryset, use_distinct = super().get_search_results(request, queryset, search_term)
        try:
            search_username = str(search_term)
        except ValueError:
            pass
        else:
            if search_username and not request.user.is_superuser:
                queryset = self.model.objects.filter(
                    username=search_username,
                    is_superuser=False
                )
            elif not request.user.is_superuser:
                queryset = self.model.objects.filter(
                    is_superuser=False
                )

        return queryset, use_distinct


admin.site.unregister(User)
admin.site.register(User, UserAdmin)


class Message_admin(admin.ModelAdmin):
    list_display = (
        'pk',
        'author',
        'sent_date',
    )
    exclude = (
        'id',
    )
    search_fields = (
        'author__username'
        'sent_date',
    )
    autocomplete_fields = [
        'author'
    ]
    actions = [
        'delete_selected_message'
    ]

    def delete_selected_message(self, request, queryset):
        try:
            for qs in queryset:
                qs.delete()
        except Exception as e:
            print(e)
    delete_selected_message.short_description = "delete selected message"

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions


admin.site.register(Message, Message_admin)
