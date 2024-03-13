from django.db import models

# Create your models here.


class System(models.Model):
    name = models.CharField(max_length=100)
    orign = models.CharField(max_length=100)
