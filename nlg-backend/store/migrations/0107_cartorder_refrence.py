# Generated by Django 4.1.1 on 2023-02-20 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0106_alter_purchaseorderitems_accountshead'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartorder',
            name='refrence',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]