# Generated by Django 4.1.1 on 2023-12-20 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0205_alter_attachments_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tentativeglassbooking',
            name='eta',
            field=models.DateField(null=True),
        ),
    ]