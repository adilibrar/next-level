# Generated by Django 4.1.1 on 2023-12-21 09:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0212_remove_glasscutting_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='glasscutting',
            name='created_at',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='glasscutting',
            name='created_by',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='glasscutting',
            name='revision',
            field=models.CharField(default='1', max_length=100),
        ),
        migrations.AddField(
            model_name='glasscutting',
            name='status',
            field=models.CharField(default='1', max_length=100),
        ),
        migrations.AddField(
            model_name='glasscutting',
            name='submitted_at',
            field=models.DateField(null=True),
        ),
    ]
