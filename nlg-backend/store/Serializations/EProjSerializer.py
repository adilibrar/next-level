from store.models import projectsoverview,NonSystemItems,NonSystemItemsMS,NonSystemItemsSD,NonSystemDamage,ProjectsList,Finishingtype,Projectsmanagers,Attachments,Glasstypes,Vodetails,Parameters4Po,Certifiedpayment,Projectpayments,Paymentterms,Eventslogging,transactions,Paymenttypes
from rest_framework import serializers


class ProjOverViewSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = projectsoverview
        fields='__all__'


class ProjectListSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = ProjectsList
        fields='__all__'
        depth=1



class NonSysteMSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = NonSystemItems
        fields='__all__'


class ProjectManagerSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Projectsmanagers
        fields='__all__'



class ProjectVariationSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Vodetails
        fields='__all__'




class ProjectPaymentSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Projectpayments
        fields='__all__'
        depth=1


class ProjectPaymentShortSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Projectpayments
        fields='__all__'



class PaymentTermSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Paymentterms
        fields='__all__'
   


class EventLoggingSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Eventslogging
        fields='__all__'
   
   

class InvoicingSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = transactions
        fields = ['invoicenb', 'transactionvalue', 'transaction_date', 'paymentduedate','paymentreference']
   
   

class CollectionSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = transactions
        fields = ['invoicenb', 'transactionvalue', 'transaction_date','paymenttypeid', 'paymentduedate','paymentreference']
        depth=1
   


class PaymentTypesSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Paymenttypes
        fields='__all__'
   


class ParametersSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Parameters4Po
        fields='__all__'

class CertifiedpaymentSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Certifiedpayment
        fields='__all__' 
   


class AttachmentSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Attachments
        fields='__all__' 
   


class GlasstypesSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Glasstypes
        fields='__all__' 
   

class FinishingtypeSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = Finishingtype
        fields='__all__' 
   

class NonSystemDamageSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = NonSystemDamage
        fields='__all__' 
   
   
class NonSystemItemsSDSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = NonSystemItemsSD
        fields='__all__' 
   

class NonSystemItemsMSSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True
    class Meta:
        model = NonSystemItemsMS
        fields='__all__' 
   
   

# class Invoicingcollection(models.Model):
#     transaction_id = models.SmallIntegerField(db_column='Transaction-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
#     transaction_date = models.DateField(db_column='Transaction-Date')  # Field name made lowercase. Field renamed to remove unsuitable characters.
#     transaction_or_invoice = models.CharField(db_column='Transaction_Or_Invoice', max_length=12)  # Field name made lowercase.
#     transactiontype = models.CharField(db_column='TransactionType', max_length=12)  # Field name made lowercase.
#     clientnameid = models.SmallIntegerField(db_column='ClientNameID')  # Field name made lowercase.
#     clienttype = models.CharField(db_column='ClientType', max_length=20)  # Field name made lowercase.
#     banknameid = models.SmallIntegerField(db_column='BankNameID')  # Field name made lowercase.
#     currency = models.CharField(db_column='Currency', max_length=5)  # Field name made lowercase.
#     transactionvalue = models.FloatField(db_column='TransactionValue')  # Field name made lowercase.
#     vat = models.IntegerField(db_column='VAT')  # Field name made lowercase.
#     paymenttypeid = models.SmallIntegerField(db_column='PaymentTypeID')  # Field name made lowercase.
#     paymentreference = models.CharField(db_column='PaymentReference', max_length=45, blank=True, null=True)  # Field name made lowercase.
#     paymentduedate = models.DateField(db_column='PaymentDueDate')  # Field name made lowercase.
#     debitdreditstatusid = models.SmallIntegerField(db_column='DebitDreditStatusID')  # Field name made lowercase.
#     invoicenb = models.CharField(db_column='InvoiceNB', max_length=255, blank=True, null=True)  # Field name made lowercase.
#     projectnameid = models.SmallIntegerField(db_column='ProjectNameID')  # Field name made lowercase.
#     bcategoryid = models.SmallIntegerField(db_column='BcategoryID')  # Field name made lowercase.
#     comment = models.CharField(db_column='Comment', max_length=255, blank=True, null=True)  # Field name made lowercase.
#     transactionstatus = models.CharField(db_column='TransactionStatus', max_length=25)  # Field name made lowercase.
#     transaction_payment = models.CharField(db_column='Transaction_Payment', max_length=12)  # Field name made lowercase.
#     verifying_invoice = models.CharField(db_column='Verifying_Invoice', max_length=12, blank=True, null=True)  # Field name made lowercase.
#     paymentproof = models.CharField(db_column='PaymentProof', max_length=255, blank=True, null=True)  # Field name made lowercase.
#     paymentmilestoneid = models.SmallIntegerField(db_column='PaymentMilestoneID', blank=True, null=True)  # Field name made lowercase.
