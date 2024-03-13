from django.db import models

# Create your models here.


class Supplier(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    vat_number = models.CharField(max_length=100)
