# Generated by Django 4.1.1 on 2022-12-05 11:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_powdercoating_deliveredto_powdercoating_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock_issuing',
            name='issuingmto',
            field=models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='issuingmto', to='store.mto'),
        ),
        migrations.AlterField(
            model_name='powdercoating',
            name='copy',
            field=models.CharField(default='1', max_length=100),
        ),
    ]
