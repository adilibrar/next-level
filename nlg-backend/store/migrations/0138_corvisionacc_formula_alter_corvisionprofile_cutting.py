# Generated by Django 4.1.1 on 2023-03-22 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0137_stock_issuing_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='corvisionacc',
            name='formula',
            field=models.CharField(default='1', max_length=100),
        ),
        migrations.AlterField(
            model_name='corvisionprofile',
            name='cutting',
            field=models.CharField(default='45', max_length=200),
        ),
    ]