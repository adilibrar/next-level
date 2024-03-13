# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AcGroup(models.Model):
    acgroupid = models.SmallIntegerField(db_column='ACGroupID')  # Field name made lowercase.
    acgroup = models.CharField(db_column='ACGroup', primary_key=True, max_length=15)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ac-group'


class Banks(models.Model):
    bank_id = models.SmallIntegerField(db_column='Bank-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    bank_name = models.CharField(db_column='Bank-Name', max_length=25)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    bank_accountnb = models.CharField(db_column='Bank-AccountNB', max_length=25, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    iban = models.CharField(db_column='IBAN', max_length=45, blank=True, null=True)  # Field name made lowercase.
    swift = models.CharField(db_column='SWIFT', max_length=12, blank=True, null=True)  # Field name made lowercase.
    branch_location = models.CharField(db_column='Branch-Location', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rm_name = models.CharField(db_column='RM-Name', max_length=25, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rm_mobile = models.CharField(db_column='RM-Mobile', max_length=25, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rm_email = models.CharField(db_column='RM-Email', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.

    class Meta:
        managed = False
        db_table = 'banks'


class Budgetcategory(models.Model):
    bcatid = models.SmallIntegerField(db_column='BCATID', primary_key=True)  # Field name made lowercase.
    bcategory_name = models.CharField(db_column='Bcategory-Name', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    bcategory_group = models.CharField(db_column='Bcategory-Group', max_length=25)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    account_group = models.ForeignKey(AcGroup, models.DO_NOTHING, db_column='Account Group')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    pnl_bs = models.CharField(db_column='PNL-BS', max_length=5)  # Field name made lowercase. Field renamed to remove unsuitable characters.

    class Meta:
        managed = False
        db_table = 'budgetcategory'


class Cities(models.Model):
    customerarea_id = models.SmallIntegerField(db_column='CustomerArea_ID', primary_key=True)  # Field name made lowercase.
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=55)
    country_code = models.CharField(db_column='Country_Code', max_length=10)  # Field name made lowercase.
    continent = models.CharField(db_column='Continent', max_length=55, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'cities'


class Credebitstatus(models.Model):
    deb_cred_id = models.SmallIntegerField(db_column='Deb-Cred-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    deb_cred_type = models.CharField(db_column='Deb-Cred-Type', max_length=12)  # Field name made lowercase. Field renamed to remove unsuitable characters.

    class Meta:
        managed = False
        db_table = 'credebitstatus'


class Customers(models.Model):
    customer_id = models.SmallIntegerField(db_column='Customer_ID', primary_key=True)  # Field name made lowercase.
    customer_name = models.CharField(db_column='Customer_Name', max_length=60)  # Field name made lowercase.
    customer_locationid = models.ForeignKey(Cities, models.DO_NOTHING, db_column='Customer_LocationID')  # Field name made lowercase.
    customer_address = models.CharField(db_column='Customer_Address', max_length=255)  # Field name made lowercase.
    customer_type = models.CharField(db_column='Customer_Type', max_length=25)  # Field name made lowercase.
    introduced_by = models.ForeignKey('Salesmen', models.DO_NOTHING, db_column='Introduced_By', blank=True, null=True)  # Field name made lowercase.
    introduction_email = models.CharField(db_column='Introduction_Email', max_length=5, blank=True, null=True)  # Field name made lowercase.
    registration_status = models.CharField(db_column='Registration_Status', max_length=25, blank=True, null=True)  # Field name made lowercase.
    prequalification_submital = models.CharField(db_column='Prequalification_Submital', max_length=25, blank=True, null=True)  # Field name made lowercase.
    meeting = models.CharField(db_column='Meeting', max_length=25, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'customers'


class Payments(models.Model):
    payment_id = models.SmallIntegerField(db_column='Payment-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    payment_type = models.CharField(db_column='Payment_Type', max_length=25)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'payments'


class Paymentterms(models.Model):
    paytid = models.SmallIntegerField(db_column='PayTID', primary_key=True)  # Field name made lowercase.
    paymentterm = models.CharField(db_column='PaymentTerm', max_length=60)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'paymentterms'


class Pbudget(models.Model):
    sn = models.SmallIntegerField(db_column='SN', primary_key=True)  # Field name made lowercase.
    project_id = models.SmallIntegerField(db_column='Project-ID')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    bcategoryname = models.CharField(db_column='BcategoryName', max_length=45)  # Field name made lowercase.
    budget_value = models.FloatField(db_column='Budget-Value')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    budgetcategory_id = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'pbudget'


class Petycashholders(models.Model):
    ptcid = models.IntegerField(db_column='PTCID', primary_key=True)  # Field name made lowercase.
    ptca_name = models.CharField(db_column='PTCA_Name', max_length=12)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'petycashholders'


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


class Projectvariations(models.Model):
    sn = models.SmallIntegerField(db_column='SN', primary_key=True)  # Field name made lowercase.
    projectid = models.ForeignKey(ProjectsList, models.DO_NOTHING, db_column='ProjectID')  # Field name made lowercase.
    variationref = models.CharField(db_column='VariationRef', max_length=5)  # Field name made lowercase.
    variationamount = models.FloatField(db_column='VariationAmount')  # Field name made lowercase.
    quotationreference = models.CharField(db_column='QuotationReference', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'projectvariations'


class Salesmen(models.Model):
    salesmanid = models.SmallIntegerField(db_column='SalesmanID', primary_key=True)  # Field name made lowercase.
    salesman_name = models.CharField(db_column='Salesman_Name', max_length=60)  # Field name made lowercase.
    salesman_type = models.CharField(db_column='Salesman_Type', max_length=20)  # Field name made lowercase.
    salesman_nationality = models.CharField(db_column='Salesman_Nationality', max_length=55, blank=True, null=True)  # Field name made lowercase.
    salesman_mobile = models.CharField(db_column='Salesman_Mobile', max_length=20, blank=True, null=True)  # Field name made lowercase.
    salesman_email = models.CharField(db_column='Salesman_Email', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'salesmen'


class Suppliersclientslist(models.Model):
    clientsupplier_id = models.SmallIntegerField(db_column='ClientSupplier-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    clientsupplier_type = models.CharField(db_column='ClientSupplier-Type', max_length=20)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    clientsupplier_name = models.CharField(db_column='ClientSupplier-Name', max_length=255)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_category = models.CharField(db_column='Supplier-Category', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    clientsupplier_cityid = models.SmallIntegerField(db_column='ClientSupplier-CityID')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    trn = models.CharField(db_column='TRN', max_length=25, blank=True, null=True)  # Field name made lowercase.
    contactnb = models.CharField(db_column='ContactNb', max_length=25, blank=True, null=True)  # Field name made lowercase.
    contactname = models.CharField(db_column='ContactName', max_length=45, blank=True, null=True)  # Field name made lowercase.
    emailaddress = models.CharField(db_column='EmailAddress', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'suppliersclientslist'


class Transactions(models.Model):
    transaction_id = models.SmallIntegerField(db_column='Transaction-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    transaction_date = models.DateField(db_column='Transaction-Date')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    transaction_or_invoice = models.CharField(db_column='Transaction_Or_Invoice', max_length=12)  # Field name made lowercase.
    transactiontype = models.CharField(db_column='TransactionType', max_length=12)  # Field name made lowercase.
    clientnameid = models.ForeignKey(Suppliersclientslist, models.DO_NOTHING, db_column='ClientNameID')  # Field name made lowercase.
    clienttype = models.CharField(db_column='ClientType', max_length=20)  # Field name made lowercase.
    banknameid = models.ForeignKey(Banks, models.DO_NOTHING, db_column='BankNameID')  # Field name made lowercase.
    currency = models.CharField(db_column='Currency', max_length=5)  # Field name made lowercase.
    transactionvalue = models.FloatField(db_column='TransactionValue')  # Field name made lowercase.
    vat = models.IntegerField(db_column='VAT')  # Field name made lowercase.
    paymenttypeid = models.ForeignKey(Payments, models.DO_NOTHING, db_column='PaymentTypeID')  # Field name made lowercase.
    paymentreference = models.CharField(db_column='PaymentReference', max_length=45, blank=True, null=True)  # Field name made lowercase.
    paymentduedate = models.DateField(db_column='PaymentDueDate')  # Field name made lowercase.
    debitdreditstatusid = models.ForeignKey(Credebitstatus, models.DO_NOTHING, db_column='DebitDreditStatusID')  # Field name made lowercase.
    invoicenb = models.CharField(db_column='InvoiceNB', max_length=255, blank=True, null=True)  # Field name made lowercase.
    projectnameid = models.ForeignKey(ProjectsList, models.DO_NOTHING, db_column='ProjectNameID')  # Field name made lowercase.
    bcategoryid = models.ForeignKey(Budgetcategory, models.DO_NOTHING, db_column='BcategoryID')  # Field name made lowercase.
    comment = models.CharField(db_column='Comment', max_length=255, blank=True, null=True)  # Field name made lowercase.
    transactionstatus = models.CharField(db_column='TransactionStatus', max_length=25)  # Field name made lowercase.
    transaction_payment = models.CharField(db_column='Transaction_Payment', max_length=12)  # Field name made lowercase.
    verifying_invoice = models.CharField(db_column='Verifying_Invoice', max_length=12, blank=True, null=True)  # Field name made lowercase.
    paymentproof = models.CharField(db_column='PaymentProof', max_length=255, blank=True, null=True)  # Field name made lowercase.
    paymentmilestoneid = models.ForeignKey(Projectpayments, models.DO_NOTHING, db_column='PaymentMilestoneID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'transactions'
