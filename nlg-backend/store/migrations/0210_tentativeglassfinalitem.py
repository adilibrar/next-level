# Generated by Django 4.1.1 on 2023-12-21 06:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0209_glasscutting'),
    ]

    operations = [
        migrations.CreateModel(
            name='TentativeGlassFinalItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barcode', models.CharField(default='1', max_length=100)),
                ('system', models.CharField(default='1', max_length=100)),
                ('location', models.CharField(default='NA', max_length=100)),
                ('GlassRef', models.CharField(default='NA', max_length=100)),
                ('opwidth', models.CharField(default='1', max_length=100)),
                ('opheight', models.CharField(default='1', max_length=100)),
                ('ipwidth', models.CharField(default='1', max_length=100)),
                ('ipheight', models.CharField(default='1', max_length=100)),
                ('quantity', models.CharField(default='1', max_length=100)),
                ('area', models.CharField(default='1', max_length=100)),
                ('WindowRef', models.CharField(default='NA', max_length=100)),
                ('remarks', models.CharField(default='NA', max_length=100)),
                ('created_at', models.DateField(auto_now_add=True, null=True)),
                ('FinalTentaiveGlassType', models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FinalTentaiveGlassType', to='store.tentativeglasstype')),
                ('GlassCuttingID', models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='GlassCuttingID', to='store.glasscutting')),
            ],
            options={
                'db_table': 'TentativeGlassCuttingItem',
            },
        ),
    ]
