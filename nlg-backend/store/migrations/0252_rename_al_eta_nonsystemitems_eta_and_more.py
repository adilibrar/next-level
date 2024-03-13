# Generated by Django 4.1.1 on 2024-02-26 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0251_ncritems_date_alter_ncr_date_alter_ncritems_balance_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='nonsystemitems',
            old_name='al_eta',
            new_name='eta',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='al_ass_del_status',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='al_fabrication_status',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='al_mto_taking',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='al_order_status',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='powder_eta',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='powder_mto_taking',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='powder_order_status',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='sheet_eta',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='sheet_fabrication_status',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='sheet_mto_taking',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='sheet_order_status',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='steel_eta',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='steel_fabrication_status',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='steel_galvanizing_status',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='steel_mto_taking',
        ),
        migrations.RemoveField(
            model_name='nonsystemitems',
            name='steel_order_status',
        ),
        migrations.AddField(
            model_name='nonsystemitems',
            name='mto_taking',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='nonsystemitems',
            name='order_status',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='nonsystemitems',
            name='status',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='nonsystemitems',
            name='type',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
    ]
