from store.models import DeliveryNoteFromSupplierItem,Supplier,DeliveryNoteFromSupplier
from rest_framework import serializers


class DeliveryNoteItemSup(serializers.ModelSerializer):
    class Meta:
        model = DeliveryNoteFromSupplierItem
        fields='__all__'
        depth=1


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields='__all__'


class SupplierDN(serializers.ModelSerializer):
    class Meta:
        model = DeliveryNoteFromSupplier
        fields='__all__'
