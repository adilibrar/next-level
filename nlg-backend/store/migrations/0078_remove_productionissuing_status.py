# Generated by Django 4.1.1 on 2023-01-31 06:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0077_productionissuing_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productionissuing',
            name='status',
        ),
    ]
