# Generated by Django 4.1.1 on 2022-12-23 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0028_corvisionhardware_corvisiongasket_corvisionacc'),
    ]

    operations = [
        migrations.AddField(
            model_name='corvisionacc',
            name='coating',
            field=models.CharField(default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='corvisionacc',
            name='cutting',
            field=models.CharField(default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='corvisionacc',
            name='remark',
            field=models.CharField(default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='corvisionhardware',
            name='coating',
            field=models.CharField(default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='corvisionhardware',
            name='cutting',
            field=models.CharField(default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='corvisionhardware',
            name='remark',
            field=models.CharField(default='NA', max_length=200),
        ),
        migrations.DeleteModel(
            name='CorVisionGasket',
        ),
    ]
