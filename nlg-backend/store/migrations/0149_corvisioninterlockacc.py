# Generated by Django 4.1.1 on 2023-04-04 10:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0148_corvisioninterlock_profileformula'),
    ]

    operations = [
        migrations.CreateModel(
            name='CorVisionInterLockAcc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Gasket', max_length=100)),
                ('quantity', models.CharField(default='1', max_length=100)),
                ('formula', models.CharField(max_length=200, null='1')),
                ('cutting', models.CharField(default='NA', max_length=200)),
                ('coating', models.CharField(default='NA', max_length=200)),
                ('remark', models.CharField(default='NA', max_length=200)),
                ('CorVision', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CorVisionInterLockAcc', to='store.corvision')),
                ('CorVisionItemAcc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CorVisionInterLockItemAcc', to='store.item')),
                ('CorVisionItemProfile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CorVisionInterLockItemProfile', to='store.item')),
            ],
        ),
    ]