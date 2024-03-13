# Generated by Django 4.1.1 on 2023-01-27 12:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0071_alter_supplier_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseorder',
            name='currency',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='currency', to='store.currency'),
        ),
    ]
