from django.contrib import admin
from .models import *
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')


class UserHistoryAdmin(admin.ModelAdmin):
    list_display = ('description', 'user')


admin.site.register(User, UserAdmin)
admin.site.register(UserHistory, UserHistoryAdmin)
