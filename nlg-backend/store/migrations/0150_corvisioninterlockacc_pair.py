# Generated by Django 4.1.1 on 2023-04-05 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0149_corvisioninterlockacc'),
    ]

    operations = [
        migrations.AddField(
            model_name='corvisioninterlockacc',
            name='pair',
            field=models.CharField(default='NA', max_length=200),
        ),
    ]