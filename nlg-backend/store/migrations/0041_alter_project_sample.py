# Generated by Django 4.1.1 on 2023-01-03 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0040_alter_project_sample'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='sample',
            field=models.BooleanField(default=False),
        ),
    ]
