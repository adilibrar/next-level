# Generated by Django 4.1.1 on 2022-12-19 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_alter_powdercoatingitems_revision'),
    ]

    operations = [
        migrations.AlterField(
            model_name='powdercoatingitems',
            name='revision',
            field=models.CharField(default='0', max_length=100, null=True),
        ),
    ]