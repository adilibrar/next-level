# Generated by Django 4.1.1 on 2023-01-13 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0054_productionstock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productionstock',
            name='quantity',
            field=models.CharField(max_length=100),
        ),
    ]
