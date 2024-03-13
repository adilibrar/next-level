# Generated by Django 4.1.1 on 2023-01-12 12:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0052_item_alternate'),
    ]

    operations = [
        migrations.CreateModel(
            name='StockAlternative',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ChildItem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ChildItem', to='store.item')),
                ('ParentItem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ParentItem', to='store.item')),
            ],
        ),
    ]
