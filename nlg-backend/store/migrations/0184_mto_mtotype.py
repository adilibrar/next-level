# Generated by Django 4.1.1 on 2023-06-19 10:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0183_mtotype_project_projectmanager'),
    ]

    operations = [
        migrations.AddField(
            model_name='mto',
            name='MTOType',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='mtotype', to='store.mtotype'),
        ),
    ]