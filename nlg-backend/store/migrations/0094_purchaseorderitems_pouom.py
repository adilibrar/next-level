# Generated by Django 4.1.1 on 2023-02-10 12:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0093_purchaseorderitems_poitemorderno'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseorderitems',
            name='pouom',
            field=models.ForeignKey(blank=True, default='16', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pouom', to='store.unit'),
        ),
    ]