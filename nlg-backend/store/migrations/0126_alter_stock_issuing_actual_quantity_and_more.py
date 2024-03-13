# Generated by Django 4.1.1 on 2023-02-23 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0125_stock_issuing_returned'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock_issuing',
            name='actual_quantity',
            field=models.IntegerField(blank=True, default='0', null=True),
        ),
        migrations.AlterField(
            model_name='stock_issuing',
            name='balance',
            field=models.IntegerField(blank=True, default='0', null=True),
        ),
        migrations.AlterField(
            model_name='stock_issuing',
            name='quantity',
            field=models.IntegerField(blank=True, default='0', null=True),
        ),
        migrations.AlterField(
            model_name='stock_issuing',
            name='revoke',
            field=models.IntegerField(blank=True, default='0', null=True),
        ),
    ]