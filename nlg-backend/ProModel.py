# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Paymentterms(models.Model):
    paytid = models.SmallIntegerField(db_column='PayTID', primary_key=True)  # Field name made lowercase.
    paymentterm = models.CharField(db_column='PaymentTerm', max_length=60)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'paymentterms'


class Projectpayments(models.Model):
    pptid = models.SmallIntegerField(db_column='PPTID', primary_key=True)  # Field name made lowercase.
    projectid = models.ForeignKey('ProjectsList', models.DO_NOTHING, db_column='ProjectID')  # Field name made lowercase.
    paymenttermid = models.ForeignKey(Paymentterms, models.DO_NOTHING, db_column='PaymenttermID')  # Field name made lowercase.
    paymentpercentage = models.DecimalField(db_column='PaymentPercentage', max_digits=5, decimal_places=4)  # Field name made lowercase.
    note = models.CharField(db_column='Note', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'projectpayments'


class ProjectsList(models.Model):
    project_id = models.SmallIntegerField(db_column='Project-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    project_name = models.CharField(db_column='Project-Name', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    project_area = models.CharField(db_column='Project-Area', max_length=25)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    project_cityid = models.SmallIntegerField(db_column='Project-CityID')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    projectvalue = models.FloatField(db_column='ProjectValue', blank=True, null=True)  # Field name made lowercase.
    customerid = models.SmallIntegerField(db_column='CustomerID')  # Field name made lowercase.
    projectmanagerid = models.SmallIntegerField(db_column='ProjectManagerID')  # Field name made lowercase.
    projectstatus = models.CharField(db_column='ProjectStatus', max_length=20, blank=True, null=True)  # Field name made lowercase.
    paymentstatus = models.CharField(db_column='PaymentStatus', max_length=40, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'projects_list'


class Projectsmanagers(models.Model):
    projectmid = models.SmallIntegerField(db_column='ProjectMID', primary_key=True)  # Field name made lowercase.
    pmname = models.CharField(db_column='PMName', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'projectsmanagers'
