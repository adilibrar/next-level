# Generated by Django 4.1.1 on 2024-02-12 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0242_rename_approval_date_nonsystemdamage_order_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nonsystemdamage',
            name='reason',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]