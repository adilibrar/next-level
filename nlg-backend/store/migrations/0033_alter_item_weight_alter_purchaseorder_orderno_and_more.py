# Generated by Django 4.1.1 on 2022-12-28 12:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0032_purchaseorderitems_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='weight',
            field=models.CharField(blank=True, default='NA', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='purchaseorder',
            name='orderno',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orderno', to='store.cartorder'),
        ),
        migrations.AlterField(
            model_name='purchaseorder',
            name='projectpo',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Projectpo', to='store.project'),
        ),
    ]