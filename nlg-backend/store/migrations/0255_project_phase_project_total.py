# Generated by Django 4.1.1 on 2024-03-04 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0254_nonsystemitems_mainid'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='phase',
            field=models.CharField(default='0', max_length=100),
        ),
        migrations.AddField(
            model_name='project',
            name='total',
            field=models.CharField(default='1', max_length=100),
        ),
    ]