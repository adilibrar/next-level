# Generated by Django 4.1.1 on 2023-03-30 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0142_alter_corpacking_title_alter_corscrew_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchaseorder',
            name='quotationRefrence',
            field=models.CharField(default='QR', max_length=200, null=True),
        ),
    ]
