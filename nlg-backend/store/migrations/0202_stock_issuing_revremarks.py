# Generated by Django 4.1.1 on 2023-12-01 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0201_releasedcustomdim_dim1_releasedcustomdim_dim2_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock_issuing',
            name='Revremarks',
            field=models.CharField(default='1', max_length=100, null=True),
        ),
    ]