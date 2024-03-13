# Generated by Django 4.1.1 on 2022-12-06 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_stock_issuing_balance'),
    ]

    operations = [
        migrations.AddField(
            model_name='powdercoatingitems',
            name='Issued_item_PC',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Issued_item_PC', to='store.stock_issuing'),
        ),
        migrations.AddField(
            model_name='powdercoatingitems',
            name='pcissuedmto',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pcissuedmto', to='store.mto'),
        ),
        migrations.AddField(
            model_name='powdercoatingitems',
            name='projectPC',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='projectPC', to='store.project'),
        ),
        migrations.AlterField(
            model_name='powdercoatingitems',
            name='assigned',
            field=models.CharField(default='1', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='powdercoatingitems',
            name='revision',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='productionissuing',
            name='Issuingproject',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='IssuingProject', to='store.project'),
        ),
    ]
