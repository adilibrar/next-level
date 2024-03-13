# Generated by Django 4.1.1 on 2023-10-26 08:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0198_remove_releasedcustomdim_releasedwindowcdim_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReleasedCustomDim',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dim1', models.CharField(max_length=100)),
                ('dim2', models.CharField(max_length=100)),
                ('dim3', models.CharField(max_length=100)),
                ('ReleasedWindowCDim', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ReleasedWindowCDim', to='store.releasedwindow')),
            ],
        ),
        migrations.CreateModel(
            name='FinalReleasedCustomDim',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dim1', models.CharField(max_length=100)),
                ('dim2', models.CharField(max_length=100)),
                ('dim3', models.CharField(max_length=100)),
                ('FinalReleasedWindowCDim', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='FinalReleasedWindowCDim', to='store.finalreleasedwindow')),
            ],
        ),
    ]
