# Generated by Django 4.1.1 on 2023-01-25 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0068_stock_issuing_actual_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseorderitems',
            name='vat',
            field=models.CharField(default='0', max_length=100),
        ),
    ]