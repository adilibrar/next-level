# Generated by Django 4.1.1 on 2023-04-05 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0150_corvisioninterlockacc_pair'),
    ]

    operations = [
        migrations.AddField(
            model_name='corvisioninterlock',
            name='pair',
            field=models.CharField(default='NA', max_length=200),
        ),
    ]
