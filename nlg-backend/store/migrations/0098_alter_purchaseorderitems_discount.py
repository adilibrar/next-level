# Generated by Django 4.1.1 on 2023-02-14 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0097_purchaseorderitems_discount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchaseorderitems',
            name='discount',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
    ]
