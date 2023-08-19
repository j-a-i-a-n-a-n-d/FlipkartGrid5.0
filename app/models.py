from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class UserHistory(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='history_entries')
    description = models.TextField()
    blob_url = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.email}"


class UserContext(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='context_entries')
    context = models.TextField()

    def __str__(self):
        return f"{self.user.email}"
