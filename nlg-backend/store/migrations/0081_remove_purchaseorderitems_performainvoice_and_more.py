# Generated by Django 4.1.1 on 2023-01-31 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0080_purchaseorderitems_performainvoice'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchaseorderitems',
            name='PerformaInvoice',
        ),
        migrations.AddField(
            model_name='purchaseorder',
            name='PerformaInvoice',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
