# Generated by Django 4.1.1 on 2023-02-20 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0115_alter_stock_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitemquotation',
            name='status',
            field=models.CharField(default='1', max_length=100, null=True),
        ),
    ]