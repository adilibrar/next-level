# Generated by Django 4.1.1 on 2023-02-14 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0095_deliverynotefromsupplieritem'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseorder',
            name='quotationRefrence',
            field=models.CharField(default='QR', max_length=100, null=True),
        ),
    ]