# Generated by Django 4.1.1 on 2023-10-26 08:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0197_releasedcustomdim_finalreleasedcustomdim'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='releasedcustomdim',
            name='ReleasedWindowCDim',
        ),
        migrations.DeleteModel(
            name='FinalReleasedCustomDim',
        ),
        migrations.DeleteModel(
            name='ReleasedCustomDim',
        ),
    ]
