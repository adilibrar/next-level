from store.models import Stock_issuing,PowderCoatingItems
from rest_framework import serializers


class StockIssuingSerializer(serializers.ModelSerializer):
    #Item = serializers.StringRelatedField(many=True, read_only=True)
    #Item = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock_issuing
        fields = ['id','project', 'department', 'Issued_item', 'finishing',
                  'length', 'quantity', 'status','created_at','balance','remarks','revoke','issuingmto']
        depth = 1


class StockIssuingSerializerRevoke(serializers.ModelSerializer):
    #Item = serializers.StringRelatedField(many=True, read_only=True)
    #Item = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock_issuing
        fields = ['id','project', 'Issued_item', 'finishing',
                  'length', 'quantity', 'balance','created_at','actual_quantity']
        depth = 1




class StockIssuingRevokeSerializer(serializers.ModelSerializer):
    #Item = serializers.StringRelatedField(many=True, read_only=True)
    #Item = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock_issuing
        fields = ['id','project', 'Issued_item', 'finishing',
                  'length', 'quantity', 'balance','revoke','restore','actual_quantity','color']
        depth = 1



class StockIssuingSaveSerializer(serializers.ModelSerializer):
    #Item = serializers.StringRelatedField(many=True, read_only=True)
    #Item = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock_issuing
        fields = '__all__'


# class ItemSerializer
class StockIssuingProjectSerializer(serializers.ModelSerializer):
    #Item = serializers.StringRelatedField(many=True, read_only=True)
    #Item = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock_issuing
        fields = ['id','Issued_item', 'finishing',
                  'length', 'quantity','balance']
        depth = 1


class ReserveStockIssuingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock_issuing
        fields = '__all__'
        depth = 1


class DNIssuingProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PowderCoatingItems
        fields = '__all__'
        depth = 1

