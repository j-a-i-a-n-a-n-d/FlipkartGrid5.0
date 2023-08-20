from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')


class UserContextAdmin(admin.ModelAdmin):
    list_display = ('context', 'user')


class UserHistoryAdmin(admin.ModelAdmin):
    list_display = ('description', 'user')


admin.site.register(User, UserAdmin)
admin.site.register(UserHistory, UserHistoryAdmin)
admin.site.register(UserContext, UserContextAdmin)
