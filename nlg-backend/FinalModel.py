# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Attachments(models.Model):
    title = models.CharField(max_length=99, blank=True, null=True)
    link = models.CharField(max_length=200, blank=True, null=True)
    project_id = models.CharField(max_length=45)
    date = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'attachments'


class Certifiedpayment(models.Model):
    serialnb = models.SmallIntegerField(primary_key=True)
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
    certificationid = models.CharField(db_column='CertificationID', max_length=10, blank=True, null=True)  # Field name made lowercase.
    certifiedamount = models.FloatField(db_column='CertifiedAmount', blank=True, null=True)  # Field name made lowercase.
    certificationdate = models.DateField(db_column='CertificationDate', blank=True, null=True)  # Field name made lowercase.
    certificationremark = models.CharField(db_column='CertificationRemark', max_length=200, blank=True, null=True)  # Field name made lowercase.
    approvedcertifiedamount = models.FloatField(db_column='ApprovedCertifiedAmount', blank=True, null=True)  # Field name made lowercase.
    certificationapprovaldate = models.DateField(db_column='CertificationApprovalDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'certifiedpayment'


class Collection(models.Model):
    collectionid = models.AutoField(db_column='CollectionID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID', blank=True, null=True)  # Field name made lowercase.
    invoicereference = models.CharField(db_column='InvoiceReference', max_length=45, blank=True, null=True)  # Field name made lowercase.
    received_amount = models.FloatField(db_column='Received Amount', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    paymentreceiptdate = models.DateField(db_column='PaymentReceiptDate', blank=True, null=True)  # Field name made lowercase.
    paymenttype = models.CharField(db_column='PaymentType', max_length=45, blank=True, null=True)  # Field name made lowercase.
    paymentduedate = models.DateField(db_column='PaymentDueDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'collection'


class Eventslogging(models.Model):
    eventid = models.SmallIntegerField(db_column='EventID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
    eventdate = models.DateField(db_column='EventDate')  # Field name made lowercase.
    eventdescription = models.CharField(db_column='EventDescription', max_length=300)  # Field name made lowercase.
    eventimpact = models.CharField(db_column='EventImpact', max_length=45)  # Field name made lowercase.
    link = models.CharField(max_length=700, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'eventslogging'


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


class Invoicing(models.Model):
    invoicingid = models.AutoField(db_column='InvoicingID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
    certificationid = models.CharField(db_column='CertificationID', max_length=10, blank=True, null=True)  # Field name made lowercase.
    invoicereference = models.CharField(db_column='InvoiceReference', max_length=35, blank=True, null=True)  # Field name made lowercase.
    invoiceamount = models.FloatField(db_column='InvoiceAmount', blank=True, null=True)  # Field name made lowercase.
    invoicedate = models.DateField(db_column='InvoiceDate', blank=True, null=True)  # Field name made lowercase.
    invoiceduedate = models.DateField(db_column='InvoiceDueDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'invoicing'


class Parameters4Po(models.Model):
    paraid = models.SmallIntegerField(db_column='ParaID', primary_key=True)  # Field name made lowercase.
    paracontrol = models.CharField(db_column='ParaControl', max_length=145, blank=True, null=True)  # Field name made lowercase.
    paravalue = models.CharField(db_column='ParaValue', max_length=145, blank=True, null=True)  # Field name made lowercase.
    paracolor = models.CharField(db_column='ParaColor', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'parameters4po'


class Paymenttypes(models.Model):
    payment_id = models.SmallIntegerField(db_column='Payment-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    payment_type = models.CharField(db_column='Payment_Type', max_length=25)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'paymenttypes'


class Projectoverview(models.Model):
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
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
    approved_glass_type = models.CharField(db_column='Approved-Glass-Type', max_length=100, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
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
    accumulatedcertamount = models.CharField(db_column='AccumulatedcertAmount', max_length=100, blank=True, null=True)  # Field name made lowercase.
    balance2certify = models.CharField(db_column='Balance2Certify', max_length=100, blank=True, null=True)  # Field name made lowercase.
    oldcertifiedamount = models.CharField(db_column='OldCertifiedAmount', max_length=100, blank=True, null=True)  # Field name made lowercase.
    accumulatedinvamount = models.CharField(db_column='AccumulatedInvAmount', max_length=100, blank=True, null=True)  # Field name made lowercase.
    balance2invoice = models.CharField(db_column='Balance2Invoice', max_length=100, blank=True, null=True)  # Field name made lowercase.
    accumulatedcollectedamount = models.CharField(db_column='AccumulatedCollectedAmount', max_length=100, blank=True, null=True)  # Field name made lowercase.
    balance2collect = models.CharField(db_column='Balance2Collect', max_length=100, blank=True, null=True)  # Field name made lowercase.
    geometridid = models.SmallIntegerField(db_column='GeometridID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'projectoverview'


class Vodetails(models.Model):
    void = models.SmallAutoField(db_column='VOID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID', blank=True, null=True)  # Field name made lowercase.
    vonb = models.CharField(db_column='VONB', max_length=3)  # Field name made lowercase.
    voamount = models.FloatField(db_column='VOamount')  # Field name made lowercase.
    vodate = models.DateField(db_column='VOdate', blank=True, null=True)  # Field name made lowercase.
    vodescription = models.CharField(db_column='VODescription', max_length=45, blank=True, null=True)  # Field name made lowercase.
    voapprovalstatus = models.CharField(db_column='VOApprovalStatus', max_length=20, blank=True, null=True)  # Field name made lowercase.
    voapprovalform = models.CharField(db_column='VOapprovalForm', max_length=20, blank=True, null=True)  # Field name made lowercase.
    voapprovaldate = models.DateField(db_column='VOapprovalDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vodetails'
