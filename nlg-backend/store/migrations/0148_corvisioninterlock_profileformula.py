# Generated by Django 4.1.1 on 2023-04-03 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0147_remove_corvisioninterlock_heightformula_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='corvisioninterlock',
            name='profileFormula',
            field=models.CharField(max_length=200, null='1'),
            preserve_default='1',
        ),
    ]