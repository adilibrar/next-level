# Generated by Django 4.1.1 on 2022-12-22 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0021_rename_windowname_corvision_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='corvision',
            name='name',
            field=models.CharField(default='Cor', max_length=100),
        ),
        migrations.AlterField(
            model_name='corvision',
            name='status',
            field=models.CharField(default='1', max_length=100),
        ),
        migrations.AlterField(
            model_name='corvision',
            name='type',
            field=models.CharField(default='NA', max_length=100),
        ),
    ]
