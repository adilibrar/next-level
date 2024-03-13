# Generated by Django 4.1.1 on 2024-02-05 06:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0234_invoicefromsupplier_invoicesupplier'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoiceitemfromsupplier',
            name='InvoiceItem',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='InvoiceItem', to='store.item'),
        ),
    ]
