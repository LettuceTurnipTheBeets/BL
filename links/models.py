from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=80)
    link = models.CharField(max_length=200)
    seen = models.BooleanField(default=False)
    viewed = models.CharField(max_length=80)

    def __str__(self):
        return self.title