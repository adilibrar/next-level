# Generated by Django 4.1.1 on 2023-01-09 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0048_stock_issuing_remarks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock_issuing',
            name='remarks',
            field=models.CharField(default='NA', max_length=100, null=True),
        ),
    ]
