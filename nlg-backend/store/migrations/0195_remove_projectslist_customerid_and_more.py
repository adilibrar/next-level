# Generated by Django 4.1.1 on 2023-10-12 08:21

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0194_attachments_certifiedpayment_collection_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projectslist',
            name='customerid',
        ),
        migrations.RemoveField(
            model_name='projectslist',
            name='paymentstatus',
        ),
        migrations.RemoveField(
            model_name='projectslist',
            name='project_area',
        ),
        migrations.RemoveField(
            model_name='projectslist',
            name='project_cityid',
        ),
        migrations.RemoveField(
            model_name='projectslist',
            name='project_id',
        ),
        migrations.RemoveField(
            model_name='projectslist',
            name='project_name',
        ),
        migrations.RemoveField(
            model_name='projectslist',
            name='projectmanagerid',
        ),
        migrations.RemoveField(
            model_name='projectslist',
            name='projectstatus',
        ),
        migrations.RemoveField(
            model_name='projectslist',
            name='projectvalue',
        ),
        migrations.RemoveField(
            model_name='projectsmanagers',
            name='pmname',
        ),
        migrations.RemoveField(
            model_name='projectsmanagers',
            name='projectmid',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='projectid',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='voamount',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='voapprovaldate',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='voapprovalform',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='voapprovalstatus',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='vodate',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='vodescription',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='void',
        ),
        migrations.RemoveField(
            model_name='vodetails',
            name='vonb',
        ),
        migrations.AddField(
            model_name='projectslist',
            name='id',
            field=models.BigAutoField(auto_created=True, default=django.utils.timezone.now, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectslist',
            name='name',
            field=models.CharField(default='test', max_length=100),
        ),
        migrations.AddField(
            model_name='projectsmanagers',
            name='id',
            field=models.BigAutoField(auto_created=True, default=django.utils.timezone.now, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectsmanagers',
            name='name',
            field=models.CharField(default='test', max_length=100),
        ),
        migrations.AddField(
            model_name='vodetails',
            name='id',
            field=models.BigAutoField(auto_created=True, default=django.utils.timezone.now, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vodetails',
            name='name',
            field=models.CharField(default='test', max_length=100),
        ),
        migrations.AlterField(
            model_name='finalreleasedwindowacc',
            name='FReleasedWindowA',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FReleasedWindowA', to='store.finalreleasedwindow'),
        ),
        migrations.AlterField(
            model_name='finalreleasedwindowgasket',
            name='FReleasedWindowG',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FReleasedWindowG', to='store.finalreleasedwindow'),
        ),
        migrations.AlterField(
            model_name='finalreleasedwindowglass',
            name='FReleasedWindowGlass',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FReleasedWindowGlass', to='store.finalreleasedwindow'),
        ),
        migrations.AlterField(
            model_name='finalreleasedwindowinterlock',
            name='FReleasedWindowInter',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FReleasedWindowInter', to='store.finalreleasedwindow'),
        ),
        migrations.AlterField(
            model_name='finalreleasedwindowinterlockacc',
            name='FReleasedWindowInterA',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FReleasedWindowInterA', to='store.finalreleasedwindow'),
        ),
        migrations.AlterField(
            model_name='finalreleasedwindowpacking',
            name='FReleasedWindowPacking',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FReleasedWindowPacking', to='store.finalreleasedwindow'),
        ),
        migrations.AlterField(
            model_name='finalreleasedwindowprofile',
            name='FReleasedWindowP',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FReleasedWindowP', to='store.finalreleasedwindow'),
        ),
        migrations.AlterField(
            model_name='finalreleasedwindowscrew',
            name='FReleasedWindowS',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='FReleasedWindowS', to='store.finalreleasedwindow'),
        ),
        migrations.AlterModelTable(
            name='projectslist',
            table=None,
        ),
        migrations.AlterModelTable(
            name='projectsmanagers',
            table=None,
        ),
        migrations.AlterModelTable(
            name='vodetails',
            table=None,
        ),
    ]
