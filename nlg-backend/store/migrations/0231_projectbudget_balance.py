# Generated by Django 4.1.1 on 2024-01-24 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0230_alter_projectbudget_created_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectbudget',
            name='balance',
            field=models.CharField(default='0', max_length=100),
        ),
    ]