# Generated by Django 4.1.1 on 2023-02-21 09:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0121_purchaseorder_servicequotation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchaseorderquotationitems',
            name='balance',
        ),
    ]