# Generated by Django 4.1.1 on 2023-01-31 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0081_remove_purchaseorderitems_performainvoice_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseorder',
            name='accounts_approval',
            field=models.CharField(default='0', max_length=100, null=True),
        ),
    ]