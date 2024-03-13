from store.models import PurchaseOrder,InvoiceFromSupplier,InvoiceItemFromSupplier,Certifiedpayments
from rest_framework import serializers


class InvoiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceFromSupplier
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth = 1


class InvoiceFromSupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceFromSupplier
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'


class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItemFromSupplier
        #fields = ['id','projectpo','refrence','creation_date']
        fields=['id','InvoiceItem','amount','quantity']
        depth=1



class CertifiedPaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certifiedpayments
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth=1