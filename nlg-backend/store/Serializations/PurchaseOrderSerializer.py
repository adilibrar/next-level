from store.models import PurchaseOrder,PurchaseOrderItems,DeliveryNoteFromSupplier,DeliveryNoteFromSupplierItem,PurchaseOrderQuotationItems
from rest_framework import serializers


class POSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth = 1

class POSerializerNoDepth(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'

        
class POPlainSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'


class POItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderItems
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth=1

class POItemSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderItems
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'

class DeliverNoteSupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryNoteFromSupplier
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'

class DeliverNoteSupplierDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryNoteFromSupplier
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth=1


class DeliverNoteSupplierItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryNoteFromSupplierItem
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'


class DeliverNoteSupplierItemDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryNoteFromSupplierItem
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth=1


class POQuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderQuotationItems
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'

class POQuotationSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderQuotationItems
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth=1

