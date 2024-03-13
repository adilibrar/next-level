# Generated by Django 4.1.1 on 2024-02-07 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0237_certifiedpayments'),
    ]

    operations = [
        migrations.CreateModel(
            name='NonSystemItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('al_mto_taking', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('al_order_status', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('al_eta', models.DateField(blank=True, max_length=100, null=True)),
                ('al_fabrication_status', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('al_ass_del_status', models.CharField(blank=True, default='', max_length=100, null=True)),
            ],
        ),
    ]