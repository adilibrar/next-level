# Generated by Django 4.1.1 on 2023-02-20 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0113_remove_cartorder_quotaionproject_cartorder_quotation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='quantity',
            field=models.IntegerField(default='0', max_length=11, null=True),
        ),
    ]