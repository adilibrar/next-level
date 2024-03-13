# Generated by Django 4.1.1 on 2023-04-26 09:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0167_alter_releasedwindow_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='releasedwindow',
            name='status',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.SET_DEFAULT, related_name='status', to='store.windowstatus'),
        ),
    ]
