# Generated by Django 4.1.1 on 2023-02-24 07:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0126_alter_stock_issuing_actual_quantity_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteDeliveryNote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prsrno', models.CharField(max_length=100)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('issue_project', models.ForeignKey(blank=True, default='1', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='issue_project', to='store.project')),
            ],
        ),
    ]
