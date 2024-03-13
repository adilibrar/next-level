from store.models import TentativeGlass,TentativeGlassItem,TentativeGlassType,TentativeGlassProcessor,TentativeGlassBooking,GlassCutting,TentativeGlassFinalItem,PurchaseOrder,PurchaseOrderGlassItems,DeliveryNoteFromSupplierGlass
from rest_framework import serializers


class GetTentativeGlassSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = TentativeGlass
        fields = '__all__'

class GetTentativeGlassSingleSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = TentativeGlass
        fields = '__all__'
        depth=1

class GetTentativeGlassItemSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = TentativeGlassItem
        fields = '__all__'

class TentativeGlassTypeSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = TentativeGlassType
        fields = '__all__'

class TentativeGlassProcessorSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = TentativeGlassProcessor
        fields = '__all__'



class TentativeGlassBookingSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = TentativeGlassBooking
        fields = '__all__'



class DetailedTentativeGlassBookingSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = TentativeGlassBooking
        fields = '__all__'
        depth=1


class TentativeGlassCuttingSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = GlassCutting
        fields = '__all__'

class DetailedTentativeGlassCuttingSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = GlassCutting
        fields = '__all__'
        depth=1

class TentativeGlassBookingShort(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = TentativeGlassBooking
        fields = ['status']


class GlassCuttingItemSer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = TentativeGlassFinalItem
        fields = '__all__'


class POSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth = 1


class POItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderGlassItems
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
        depth=1

class SupplierGlassRecSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryNoteFromSupplierGlass
        #fields = ['id','projectpo','refrence','creation_date']
        fields='__all__'
 
    