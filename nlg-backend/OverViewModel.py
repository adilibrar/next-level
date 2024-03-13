# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Accountshead(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=190, blank=True, null=True)
    code = models.CharField(max_length=190, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'accountshead'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class Corvision(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    wd = models.CharField(max_length=100)
    image = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'corvision'


class Currency(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'currency'


class Department(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'department'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Finishing(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'finishing'


class Finishingtype(models.Model):
    finishid = models.AutoField(db_column='FinishID', primary_key=True)  # Field name made lowercase.
    finishdescription = models.CharField(db_column='FinishDescription', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'finishingtype'


class Glasstypes(models.Model):
    glassid = models.AutoField(db_column='GlassID', primary_key=True)  # Field name made lowercase.
    glasstype = models.CharField(db_column='GlassType', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'glasstypes'


class Item(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    barcode = models.CharField(max_length=100, blank=True, null=True)
    itemcode = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    length = models.CharField(max_length=100)
    width = models.CharField(max_length=100, blank=True, null=True)
    weight = models.CharField(max_length=100, blank=True, null=True)
    is_length = models.CharField(max_length=100, blank=True, null=True)
    is_quantity = models.CharField(max_length=100, blank=True, null=True)
    is_both = models.CharField(max_length=100, blank=True, null=True)
    image = models.CharField(max_length=100, blank=True, null=True)
    supplier = models.ForeignKey('Supplier', models.DO_NOTHING, db_column='Supplier_id')  # Field name made lowercase.
    finishing = models.ForeignKey(Finishing, models.DO_NOTHING)
    system = models.ForeignKey('System', models.DO_NOTHING)
    type = models.ForeignKey('Itemtype', models.DO_NOTHING)
    unit = models.ForeignKey('Unit', models.DO_NOTHING)
    alternate = models.CharField(max_length=100, blank=True, null=True)
    previous_price = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item'


class Itemtype(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'itemtype'


class Mto(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=190)
    revision = models.CharField(max_length=100)
    extra = models.CharField(max_length=100)
    copy = models.CharField(max_length=100)
    status = models.CharField(max_length=100, blank=True, null=True)
    submital = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateField()
    projectmto = models.ForeignKey('Project', models.DO_NOTHING, blank=True, null=True)
    submitted_at = models.DateField(blank=True, null=True)
    mtotype = models.ForeignKey('StoreMtotype', models.DO_NOTHING, db_column='MTOType_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mto'


class Powdercoating(models.Model):
    id = models.BigAutoField(primary_key=True)
    revision = models.CharField(max_length=100)
    copy = models.CharField(max_length=100)
    status = models.CharField(max_length=100, blank=True, null=True)
    submital = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateField()
    dnproject = models.ForeignKey('Project', models.DO_NOTHING)
    deliveredto = models.CharField(max_length=190, blank=True, null=True)
    description = models.CharField(max_length=190, blank=True, null=True)
    note = models.CharField(max_length=190, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'powdercoating'


class Project(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    refrence_no = models.CharField(max_length=100)
    status = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateField(blank=True, null=True)
    completed_at = models.DateField(blank=True, null=True)
    sample = models.IntegerField(blank=True, null=True)
    projectmanager = models.ForeignKey(AuthUser, models.DO_NOTHING, db_column='ProjectManager_id', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'project'


class ProjectElevation(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    elevationproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='ElevationProject_id', blank=True, null=True)  # Field name made lowercase.
    floorelevation = models.ForeignKey('ProjectFloor', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_elevation'


class ProjectFloor(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    projectfloor = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_floor'


class Projoverview(models.Model):
    projectid = models.SmallIntegerField(db_column='ProjectID', primary_key=True)  # Field name made lowercase.
    pmid = models.SmallIntegerField(db_column='PMID')  # Field name made lowercase.
    offer_approval_method = models.CharField(db_column='Offer-Approval-Method', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    draft_contract_issuance = models.CharField(db_column='Draft-Contract-issuance', max_length=25, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    draft_contract_negotiation_status = models.CharField(db_column='Draft-Contract-negotiation-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    original_contract_receipt = models.CharField(db_column='Original-Contract-Receipt', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    original_contract_signature_by_nlg = models.CharField(db_column='Original-Contract-signature-by-NLG', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    ifc_drawings = models.CharField(db_column='IFC-Drawings', max_length=15, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    structural_drawings = models.CharField(db_column='Structural-Drawings', max_length=15, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    architectural_drawings = models.CharField(db_column='Architectural-Drawings', max_length=15, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    id_drawings = models.CharField(db_column='ID-Drawings', max_length=15, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_schedule_status = models.CharField(db_column='SD-Schedule-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_scheduled_startup_date = models.DateField(db_column='SD-Scheduled-Startup-Date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_scheduled_endup_date = models.DateField(db_column='SD-Scheduled-Endup-Date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_preparation_status = models.CharField(db_column='SD-Preparation-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_submission_status = models.CharField(db_column='SD-Submission-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_approval_status = models.CharField(db_column='SD-Approval-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    latest_sd_revision = models.CharField(db_column='latest-SD-Revision', max_length=5, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_sample_preparation_status = models.CharField(db_column='Glass-Sample-Preparation-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    frame_color_preparation_status = models.CharField(db_column='Frame-color-Preparation-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    material_submission_status = models.CharField(db_column='Material-Submission-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_approval_status = models.CharField(db_column='Glass-Approval-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    approved_glass_type = models.CharField(db_column='Approved-Glass-Type', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    frame_finishing_approval = models.CharField(db_column='Frame-Finishing-Approval', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    approved_color = models.CharField(db_column='Approved-Color', max_length=75, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_mto = models.CharField(db_column='Aluminium-MTO', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_mto = models.CharField(db_column='Glass-MTO', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_system_procurement = models.CharField(db_column='Aluminium-system-Procurement', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_raw_sheets_procurement = models.CharField(db_column='Glass-raw-sheets-procurement', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_system_eta = models.DateField(db_column='Aluminium-system-ETA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_sheets_eta = models.DateField(db_column='Glass-sheets-ETA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    variation_ref = models.CharField(db_column='Variation-ref', max_length=5, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    vo_approval_status = models.CharField(db_column='VO-approval-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    snagging_desnags_esd = models.DateField(db_column='Snagging-Desnags-ESD', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    snagging_desnags_efd = models.DateField(db_column='Snagging-Desnags-EFD', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    as_built_drawings_preparation_status = models.CharField(db_column='As-built-Drawings-Preparation-Status', max_length=12, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    as_built_drawings_submission_status = models.CharField(db_column='AS-built-Drawings-Submission-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    as_built_drawings_submission_date = models.DateField(db_column='AS-built-Drawings-Submission-Date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    handover_documents_preparation = models.CharField(db_column='handover-Documents-Preparation', max_length=12, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    handover_documents_submission_status = models.CharField(db_column='handover-Documents-Submission-status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    handover_documents_submission_date = models.DateField(db_column='handover-Documents-Submission-date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    toc_issuance_status = models.CharField(db_column='TOC-issuance-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    toc_date = models.DateField(db_column='TOC-date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    toc_payment_status = models.CharField(db_column='TOC-payment-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    remarks = models.CharField(db_column='Remarks', max_length=500, blank=True, null=True)  # Field name made lowercase.
    original_contract_countersigned_receipt = models.CharField(db_column='Original-Contract-countersigned-receipt', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    site_measurements_status = models.CharField(db_column='Site-Measurements-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    site_readiness = models.CharField(db_column='Site-readiness', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    installation_status = models.CharField(db_column='Installation-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_approval_date = models.DateField(db_column='Glass Approval date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    color_approval_date = models.DateField(db_column='Color Approval date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    mto_taking = models.CharField(db_column='MTO Taking', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    alumunium_system_order_status = models.CharField(db_column='Alumunium-system-Order-Status', max_length=55, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_takeoff_preparation = models.CharField(db_column='Glass-Takeoff-Preparation', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_sheets_booking_status = models.CharField(db_column='Glass-Sheets-Booking-Status', max_length=55, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    powder_mto_taking = models.CharField(db_column='Powder-MTO-Taking', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    powder_order_status = models.CharField(db_column='Powder-Order-Status', max_length=55, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    powder_eta = models.DateField(db_column='Powder-ETA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_order_release_status = models.CharField(db_column='Aluminium-Order-release-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_order_release_status = models.CharField(db_column='Glass-Order-Release-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    fabrication_status = models.CharField(db_column='Fabrication-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_approval_date = models.DateField(db_column='SD-Approval-date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    facadearea = models.FloatField(db_column='FacadeArea', blank=True, null=True)  # Field name made lowercase.
    contractamount = models.FloatField(db_column='ContractAmount', blank=True, null=True)  # Field name made lowercase.
    accumulated_offer_amount = models.FloatField(db_column='Accumulated-Offer-Amount', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.

    class Meta:
        managed = False
        db_table = 'projoverview'


class StoreCartorder(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    priority = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    status_text = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateField(blank=True, null=True)
    quotation = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_cartorder'


class StoreCorpacking(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    formula = models.CharField(max_length=200, blank=True, null=True)
    cutting = models.CharField(max_length=200)
    coating = models.CharField(max_length=200)
    remark = models.CharField(max_length=200)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    corvisionitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItem_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_corpacking'


class StoreCorscrew(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    formula = models.CharField(max_length=200, blank=True, null=True)
    cutting = models.CharField(max_length=200)
    coating = models.CharField(max_length=200)
    remark = models.CharField(max_length=200)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    corvisionitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItem_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_corscrew'


class StoreCorvisionacc(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    corvisionitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItem_id')  # Field name made lowercase.
    coating = models.CharField(max_length=200)
    cutting = models.CharField(max_length=200)
    remark = models.CharField(max_length=200)
    formula = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_corvisionacc'


class StoreCorvisiondim(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    formula = models.CharField(max_length=200)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    codename = models.CharField(db_column='CodeName', max_length=100)  # Field name made lowercase.
    heightformula = models.CharField(db_column='heightFormula', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_corvisiondim'


class StoreCorvisiongasket(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    formula = models.CharField(max_length=200, blank=True, null=True)
    cutting = models.CharField(max_length=200)
    coating = models.CharField(max_length=200)
    remark = models.CharField(max_length=200)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    corvisionitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItem_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_corvisiongasket'


class StoreCorvisionglass(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    heightformula = models.CharField(db_column='Heightformula', max_length=200)  # Field name made lowercase.
    widthformula = models.CharField(db_column='Widthformula', max_length=200)  # Field name made lowercase.
    codename = models.CharField(db_column='CodeName', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_corvisionglass'


class StoreCorvisionhardware(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    corvisionitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItem_id')  # Field name made lowercase.
    coating = models.CharField(max_length=200)
    cutting = models.CharField(max_length=200)
    remark = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'store_corvisionhardware'


class StoreCorvisioninterlock(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    formula = models.CharField(max_length=200, blank=True, null=True)
    maximum = models.CharField(max_length=200, blank=True, null=True)
    cutting = models.CharField(max_length=200)
    coating = models.CharField(max_length=200)
    remark = models.CharField(max_length=200)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    corvisionitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItem_id')  # Field name made lowercase.
    minimum = models.CharField(max_length=200, blank=True, null=True)
    profileformula = models.CharField(db_column='profileFormula', max_length=200, blank=True, null=True)  # Field name made lowercase.
    pair = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'store_corvisioninterlock'


class StoreCorvisioninterlockacc(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    formula = models.CharField(max_length=200, blank=True, null=True)
    cutting = models.CharField(max_length=200)
    coating = models.CharField(max_length=200)
    remark = models.CharField(max_length=200)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    corvisionitemacc = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItemAcc_id')  # Field name made lowercase.
    corvisionitemprofile = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItemProfile_id')  # Field name made lowercase.
    pair = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'store_corvisioninterlockacc'


class StoreCorvisionprofile(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    formula = models.CharField(max_length=200)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    corvisionitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='CorVisionItem_id')  # Field name made lowercase.
    coating = models.CharField(max_length=200)
    cutting = models.CharField(max_length=200)
    remark = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'store_corvisionprofile'


class StoreCorvisionshutter(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    corvision = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='CorVision_id')  # Field name made lowercase.
    heightformula = models.CharField(db_column='Heightformula', max_length=200)  # Field name made lowercase.
    widthformula = models.CharField(db_column='Widthformula', max_length=200)  # Field name made lowercase.
    codename = models.CharField(db_column='CodeName', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_corvisionshutter'


class StoreDeliverynotefromsupplier(models.Model):
    id = models.BigAutoField(primary_key=True)
    orderno = models.CharField(max_length=100)
    created_at = models.DateField()
    dnfromsuppliername = models.ForeignKey('Supplier', models.DO_NOTHING, db_column='DNFromsupplierName_id')  # Field name made lowercase.
    dninpurchaseorder = models.ForeignKey('StorePurchaseorder', models.DO_NOTHING, db_column='DNINPurchaseOrder_id', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_deliverynotefromsupplier'


class StoreDeliverynotefromsupplieritem(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.CharField(max_length=100)
    created_at = models.DateField()
    dninfromsupplierno = models.ForeignKey(StoreDeliverynotefromsupplier, models.DO_NOTHING, db_column='DNINFromsupplierNo_id')  # Field name made lowercase.
    orderitemid = models.ForeignKey('StorePurchaseorderitems', models.DO_NOTHING)
    recieveditem = models.ForeignKey(Item, models.DO_NOTHING, db_column='recievedItem_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_deliverynotefromsupplieritem'


class StoreLock(models.Model):
    id = models.BigAutoField(primary_key=True)
    lockitem = models.ForeignKey(Item, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_lock'


class StoreMandatorystock(models.Model):
    id = models.BigAutoField(primary_key=True)
    minimum = models.CharField(max_length=100)
    mandatoryitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='MandatoryItem_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_mandatorystock'


class StoreMtoimport(models.Model):
    id = models.BigAutoField(primary_key=True)
    first = models.CharField(db_column='First', max_length=100, blank=True, null=True)  # Field name made lowercase.
    last = models.CharField(db_column='Last', max_length=100, blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(db_column='Gender', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_mtoimport'


class StoreMtoitem(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.CharField(max_length=190)
    extra_quantity = models.CharField(max_length=190)
    revision = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    status = models.CharField(max_length=100, blank=True, null=True)
    assigned = models.CharField(max_length=100, blank=True, null=True)
    itemname = models.ForeignKey(Item, models.DO_NOTHING)
    mto = models.ForeignKey(Mto, models.DO_NOTHING, blank=True, null=True)
    cart = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField()
    remarks = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_mtoitem'


class StoreMtotype(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_mtotype'


class StoreOrderitemdetail(models.Model):
    id = models.BigAutoField(primary_key=True)
    assigned_date = models.DateField()
    description = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.CharField(max_length=100)
    priority = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    po_status = models.CharField(max_length=100, blank=True, null=True)
    forprojectorder = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    fromprojectorder = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    mtocartorder = models.ForeignKey(Mto, models.DO_NOTHING, blank=True, null=True)
    orderno = models.ForeignKey(StoreCartorder, models.DO_NOTHING, db_column='orderNo_id')  # Field name made lowercase.
    order_item = models.ForeignKey(Item, models.DO_NOTHING)
    supplier = models.ForeignKey('Supplier', models.DO_NOTHING, db_column='Supplier_id', blank=True, null=True)  # Field name made lowercase.
    hidden = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_orderitemdetail'


class StoreOrderitemquotation(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    assigned_date = models.DateField()
    quantity = models.CharField(max_length=100)
    amount = models.CharField(max_length=100, blank=True, null=True)
    vat = models.CharField(max_length=100, blank=True, null=True)
    quotationdno = models.ForeignKey(Powdercoating, models.DO_NOTHING, db_column='Quotationdno_id', blank=True, null=True)  # Field name made lowercase.
    quotationorderno = models.ForeignKey(StoreCartorder, models.DO_NOTHING, db_column='QuotationorderNo_id')  # Field name made lowercase.
    projectorderquotation = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    quotationuom = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    po_status = models.CharField(max_length=100, blank=True, null=True)
    weight = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_orderitemquotation'


class StorePowdercoatingitems(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.CharField(max_length=190)
    revision = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=100)
    status = models.CharField(max_length=100, blank=True, null=True)
    assigned = models.CharField(max_length=100, blank=True, null=True)
    dnitem = models.ForeignKey(Item, models.DO_NOTHING)
    dno = models.ForeignKey(Powdercoating, models.DO_NOTHING, blank=True, null=True)
    issued_item_pc = models.ForeignKey('StoreStockIssuing', models.DO_NOTHING, db_column='Issued_item_PC_id', blank=True, null=True)  # Field name made lowercase.
    pcissuedmto = models.ForeignKey(Mto, models.DO_NOTHING, blank=True, null=True)
    projectpc = models.ForeignKey(Project, models.DO_NOTHING, db_column='projectPC_id', blank=True, null=True)  # Field name made lowercase.
    remark = models.CharField(max_length=100, blank=True, null=True)
    custom = models.CharField(max_length=100, blank=True, null=True)
    length = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateField(blank=True, null=True)
    update = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_powdercoatingitems'


class StoreProductionissuing(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=100, blank=True, null=True)
    issued_item_reserved = models.ForeignKey('StoreStockIssuing', models.DO_NOTHING, db_column='Issued_item_reserved_id', blank=True, null=True)  # Field name made lowercase.
    issuingproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='Issuingproject_id', blank=True, null=True)  # Field name made lowercase.
    production_issued_item = models.ForeignKey(Item, models.DO_NOTHING, db_column='Production_Issued_item_id')  # Field name made lowercase.
    issuedmto = models.ForeignKey(Mto, models.DO_NOTHING, blank=True, null=True)
    created_at = models.DateField(blank=True, null=True)
    update = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_productionissuing'


class StoreProductionstock(models.Model):
    id = models.BigAutoField(primary_key=True)
    pitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='Pitem_id')  # Field name made lowercase.
    quantity = models.CharField(max_length=100)
    created_at = models.DateField()

    class Meta:
        managed = False
        db_table = 'store_productionstock'


class StoreProfile(models.Model):
    id = models.BigAutoField(primary_key=True)
    department = models.CharField(max_length=30)
    comments = models.CharField(max_length=30)
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'store_profile'


class StorePurchaseorder(models.Model):
    id = models.BigAutoField(primary_key=True)
    payment_term = models.CharField(max_length=100, blank=True, null=True)
    priority = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    status_text = models.CharField(max_length=100, blank=True, null=True)
    creation_date = models.DateField()
    delivery_date = models.DateField(blank=True, null=True)
    note = models.CharField(max_length=100, blank=True, null=True)
    orderno = models.ForeignKey(StoreCartorder, models.DO_NOTHING, blank=True, null=True)
    projectpo = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    refrence = models.CharField(max_length=100, blank=True, null=True)
    purchasesupplier = models.ForeignKey('Supplier', models.DO_NOTHING, db_column='PurchaseSupplier_id')  # Field name made lowercase.
    currency = models.ForeignKey(Currency, models.DO_NOTHING, blank=True, null=True)
    local = models.IntegerField(blank=True, null=True)
    performainvoice = models.IntegerField(db_column='PerformaInvoice', blank=True, null=True)  # Field name made lowercase.
    accounts_approval = models.CharField(max_length=100, blank=True, null=True)
    accounts_submital = models.CharField(max_length=100, blank=True, null=True)
    pi_approval = models.CharField(max_length=100, blank=True, null=True)
    quotationrefrence = models.CharField(db_column='quotationRefrence', max_length=200, blank=True, null=True)  # Field name made lowercase.
    servicequotation = models.IntegerField(db_column='serviceQuotation', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_purchaseorder'


class StorePurchaseorderitems(models.Model):
    id = models.BigAutoField(primary_key=True)
    assigned_date = models.DateField()
    description = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.CharField(max_length=100)
    priority = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    forprojectpo = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    fromprojectpo = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    mtopo = models.ForeignKey(Mto, models.DO_NOTHING, blank=True, null=True)
    po_item = models.ForeignKey(Item, models.DO_NOTHING)
    pono = models.ForeignKey(StorePurchaseorder, models.DO_NOTHING, blank=True, null=True)
    balance = models.CharField(max_length=100)
    price = models.CharField(max_length=100, blank=True, null=True)
    vat = models.CharField(max_length=100)
    remarks = models.CharField(max_length=100, blank=True, null=True)
    poitemorderno = models.ForeignKey(StoreCartorder, models.DO_NOTHING, db_column='POItemorderno_id', blank=True, null=True)  # Field name made lowercase.
    pouom = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    discount = models.CharField(max_length=100, blank=True, null=True)
    accountshead = models.ForeignKey(Accountshead, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'store_purchaseorderitems'


class StorePurchaseorderquotationitems(models.Model):
    id = models.BigAutoField(primary_key=True)
    po_item_title = models.CharField(max_length=200, blank=True, null=True)
    assigned_date = models.DateField()
    price = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.CharField(max_length=100)
    weight = models.CharField(max_length=100)
    vat = models.CharField(max_length=100)
    status = models.CharField(max_length=100, blank=True, null=True)
    poqitemorderno = models.ForeignKey(StoreOrderitemquotation, models.DO_NOTHING, db_column='POQItemorderno_id', blank=True, null=True)  # Field name made lowercase.
    po_item_project = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    qpouom = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    quot_item_pono = models.ForeignKey(StorePurchaseorder, models.DO_NOTHING, blank=True, null=True)
    quotaccountshead = models.ForeignKey(Accountshead, models.DO_NOTHING)
    quotitemdn = models.ForeignKey(Powdercoating, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_purchaseorderquotationitems'


class StoreReleasedwindow(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    width = models.CharField(max_length=100)
    glasscolor = models.CharField(db_column='GlassColor', max_length=100)  # Field name made lowercase.
    profilefinishing = models.CharField(db_column='ProfileFinishing', max_length=100)  # Field name made lowercase.
    lockheight = models.CharField(db_column='LockHeight', max_length=100)  # Field name made lowercase.
    lockfinishing = models.CharField(db_column='LockFinishing', max_length=100)  # Field name made lowercase.
    quantity = models.CharField(max_length=100)
    elevation = models.CharField(max_length=100)
    height = models.CharField(max_length=100)
    windload = models.CharField(max_length=100)
    window = models.ForeignKey(Corvision, models.DO_NOTHING, db_column='Window_id')  # Field name made lowercase.
    windowlock = models.ForeignKey(StoreLock, models.DO_NOTHING, db_column='WindowLock_id')  # Field name made lowercase.
    windowproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='Windowproject_id', blank=True, null=True)  # Field name made lowercase.
    windowfloor = models.ForeignKey(ProjectFloor, models.DO_NOTHING, db_column='Windowfloor_id')  # Field name made lowercase.
    status = models.ForeignKey('StoreWindowstatus', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'store_releasedwindow'


class StoreReleasedwindowacc(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    cutting = models.CharField(max_length=100)
    coating = models.CharField(max_length=100)
    remark = models.CharField(max_length=100)
    releasedwindowa = models.ForeignKey(StoreReleasedwindow, models.DO_NOTHING, db_column='ReleasedWindowA_id')  # Field name made lowercase.
    releasedwindowacc = models.ForeignKey(Item, models.DO_NOTHING, db_column='ReleasedWindowAcc_id')  # Field name made lowercase.
    releasedaccproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='ReleasedAccproject_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_releasedwindowacc'


class StoreReleasedwindowgasket(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=100)
    cutlength = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    cutting = models.CharField(max_length=100)
    coating = models.CharField(max_length=100)
    remark = models.CharField(max_length=100)
    releasedwindowg = models.ForeignKey(StoreReleasedwindow, models.DO_NOTHING, db_column='ReleasedWindowG_id')  # Field name made lowercase.
    releasedwindowgasket = models.ForeignKey(Item, models.DO_NOTHING, db_column='ReleasedWindowGasket_id')  # Field name made lowercase.
    releasedgasketroject = models.ForeignKey(Project, models.DO_NOTHING, db_column='ReleasedGasketroject_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_releasedwindowgasket'


class StoreReleasedwindowglass(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    width = models.CharField(max_length=100)
    height = models.CharField(max_length=100)
    releasedwindowglass = models.ForeignKey(StoreReleasedwindow, models.DO_NOTHING, db_column='ReleasedWindowGlass_id')  # Field name made lowercase.
    releasedglassproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='ReleasedGlassproject_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_releasedwindowglass'


class StoreReleasedwindowinterlock(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=100)
    cutlength = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    cutting = models.CharField(max_length=100)
    coating = models.CharField(max_length=100)
    remark = models.CharField(max_length=100)
    releasedwindowinter = models.ForeignKey(StoreReleasedwindow, models.DO_NOTHING, db_column='ReleasedWindowInter_id')  # Field name made lowercase.
    releasedwindowinterprofile = models.ForeignKey(Item, models.DO_NOTHING, db_column='ReleasedWindowInterProfile_id')  # Field name made lowercase.
    releasedinterlockproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='ReleasedInterLockproject_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_releasedwindowinterlock'


class StoreReleasedwindowinterlockacc(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=100)
    cutlength = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    cutting = models.CharField(max_length=100)
    coating = models.CharField(max_length=100)
    remark = models.CharField(max_length=100)
    releasedwindowintera = models.ForeignKey(StoreReleasedwindow, models.DO_NOTHING, db_column='ReleasedWindowInterA_id')  # Field name made lowercase.
    releasedwindowinteracc = models.ForeignKey(Item, models.DO_NOTHING, db_column='ReleasedWindowInterAcc_id')  # Field name made lowercase.
    releasedinterlockaccproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='ReleasedInterLockAccproject_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_releasedwindowinterlockacc'


class StoreReleasedwindowpacking(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    coating = models.CharField(max_length=100)
    remark = models.CharField(max_length=100)
    releasedwindowpac = models.ForeignKey(Item, models.DO_NOTHING, db_column='ReleasedWindowPac_id')  # Field name made lowercase.
    releasedwindowpacking = models.ForeignKey(StoreReleasedwindow, models.DO_NOTHING, db_column='ReleasedWindowPacking_id')  # Field name made lowercase.
    releasedpackingproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='ReleasedPackingproject_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_releasedwindowpacking'


class StoreReleasedwindowprofile(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=100)
    cutlength = models.FloatField()
    quantity = models.CharField(max_length=100)
    cutting = models.CharField(max_length=100)
    coating = models.CharField(max_length=100)
    remark = models.CharField(max_length=100)
    releasedwindowpitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='ReleasedWindowPItem_id')  # Field name made lowercase.
    releasedwindowp = models.ForeignKey(StoreReleasedwindow, models.DO_NOTHING, db_column='ReleasedWindowP_id')  # Field name made lowercase.
    releasedprofileproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='Releasedprofileproject_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_releasedwindowprofile'


class StoreReleasedwindowscrew(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    coating = models.CharField(max_length=100)
    remark = models.CharField(max_length=100)
    releasedwindows = models.ForeignKey(StoreReleasedwindow, models.DO_NOTHING, db_column='ReleasedWindowS_id')  # Field name made lowercase.
    releasedwindowsc = models.ForeignKey(Item, models.DO_NOTHING, db_column='ReleasedWindowSc_id')  # Field name made lowercase.
    releasedscrewproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='ReleasedScrewproject_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_releasedwindowscrew'


class StoreShoppingCart(models.Model):
    id = models.BigAutoField(primary_key=True)
    assigned_date = models.DateField()
    description = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.CharField(max_length=100)
    priority = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    forproject = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    fromproject = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    item_cart = models.ForeignKey(Item, models.DO_NOTHING)
    mtocart = models.ForeignKey(Mto, models.DO_NOTHING, blank=True, null=True)
    supplier = models.ForeignKey('Supplier', models.DO_NOTHING, db_column='Supplier_id', blank=True, null=True)  # Field name made lowercase.
    basket = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_shopping_cart'


class StoreSitedeliverynote(models.Model):
    id = models.BigAutoField(primary_key=True)
    prsrno = models.CharField(max_length=100)
    created_at = models.DateField()
    issue_project = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_sitedeliverynote'


class StoreSitedeliverynoteitems(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.CharField(max_length=100)
    assigned_date = models.DateField()
    siteitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='SiteItem_id')  # Field name made lowercase.
    site_delivery_note_no = models.ForeignKey(StoreSitedeliverynote, models.DO_NOTHING)
    sitedeliverymto = models.ForeignKey(Mto, models.DO_NOTHING, blank=True, null=True)
    site_issuing_id = models.ForeignKey('StoreStockIssuing', models.DO_NOTHING, blank=True, null=True)
    remarks = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_sitedeliverynoteitems'


class StoreStatus(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_status'


class StoreStock(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.IntegerField(blank=True, null=True)
    stockvalue = models.CharField(max_length=100, blank=True, null=True)
    item = models.OneToOneField(Item, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'store_stock'


class StoreStockDamage(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100, blank=True, null=True)
    length = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateField()
    item_damage = models.ForeignKey(Item, models.DO_NOTHING, db_column='Item_Damage_id')  # Field name made lowercase.
    status = models.ForeignKey(StoreStatus, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'store_stock_damage'


class StoreStockIssuing(models.Model):
    id = models.BigAutoField(primary_key=True)
    length = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    created_at = models.DateField(blank=True, null=True)
    issued_item = models.ForeignKey(Item, models.DO_NOTHING, db_column='Issued_item_id')  # Field name made lowercase.
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True)
    finishing = models.ForeignKey(Finishing, models.DO_NOTHING, blank=True, null=True)
    project = models.ForeignKey(Project, models.DO_NOTHING, blank=True, null=True)
    status = models.ForeignKey(StoreStatus, models.DO_NOTHING)
    issuingmto = models.ForeignKey(Mto, models.DO_NOTHING, blank=True, null=True)
    color = models.CharField(max_length=100, blank=True, null=True)
    balance = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    remarks = models.CharField(max_length=100, blank=True, null=True)
    actual_quantity = models.IntegerField(blank=True, null=True)
    revoke = models.IntegerField(blank=True, null=True)
    returned = models.IntegerField(blank=True, null=True)
    total = models.IntegerField(blank=True, null=True)
    restore = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_stock_issuing'


class StoreStockalternative(models.Model):
    id = models.BigAutoField(primary_key=True)
    childitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='ChildItem_id')  # Field name made lowercase.
    parentitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='ParentItem_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_stockalternative'


class StoreStocklist(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateField(blank=True, null=True)
    projectstocklist = models.ForeignKey(Project, models.DO_NOTHING, db_column='ProjectStockList_id')  # Field name made lowercase.
    type = models.ForeignKey(StoreMtotype, models.DO_NOTHING, db_column='Type_id')  # Field name made lowercase.
    status = models.CharField(max_length=100)
    title = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_stocklist'


class StoreStocklistitem(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.CharField(max_length=100)
    stocklistitem = models.ForeignKey(Item, models.DO_NOTHING, db_column='StockListItem_id')  # Field name made lowercase.
    stocklistid = models.ForeignKey(StoreStocklist, models.DO_NOTHING, db_column='StockListID_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'store_stocklistitem'


class StoreStrippingitems(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.CharField(max_length=190)
    status = models.CharField(max_length=100, blank=True, null=True)
    remark = models.CharField(max_length=100, blank=True, null=True)
    assigned = models.CharField(max_length=100, blank=True, null=True)
    sitem = models.ForeignKey(Item, models.DO_NOTHING)
    stno = models.ForeignKey('Stripping', models.DO_NOTHING, blank=True, null=True)
    wastage = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'store_strippingitems'


class StoreWindowstatus(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'store_windowstatus'


class Stripping(models.Model):
    id = models.BigAutoField(primary_key=True)
    revision = models.CharField(max_length=100)
    copy = models.CharField(max_length=100)
    status = models.CharField(max_length=100, blank=True, null=True)
    submital = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=190, blank=True, null=True)
    deliveredto = models.CharField(max_length=190, blank=True, null=True)
    created_at = models.DateField()
    note = models.CharField(max_length=190, blank=True, null=True)
    sproject = models.ForeignKey(Project, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'stripping'


class Supplier(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    vat_number = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'supplier'


class System(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    orign = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'system'


class Unit(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    short = models.CharField(db_column='Short', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'unit'


class Vodetails(models.Model):
    void = models.SmallAutoField(db_column='VOID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
    vonb = models.CharField(db_column='VONB', max_length=3)  # Field name made lowercase.
    voamount = models.FloatField(db_column='VOamount')  # Field name made lowercase.
    vodate = models.DateField(db_column='VOdate')  # Field name made lowercase.
    vodescription = models.CharField(db_column='VODescription', max_length=45, blank=True, null=True)  # Field name made lowercase.
    voapprovalstatus = models.CharField(db_column='VOApprovalStatus', max_length=20)  # Field name made lowercase.
    voapprovalform = models.CharField(db_column='VOapprovalForm', max_length=20, blank=True, null=True)  # Field name made lowercase.
    voapprovaldate = models.DateField(db_column='VOapprovalDate')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vodetails'
