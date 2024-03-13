# Generated by Django 4.1.1 on 2023-10-27 08:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0200_remove_releasedcustomdim_dim1_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='releasedcustomdim',
            name='dim1',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='releasedcustomdim',
            name='dim2',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='releasedcustomdim',
            name='dim3',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
    ]
