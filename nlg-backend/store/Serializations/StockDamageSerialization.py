from store.models import Stock_damage
from rest_framework import serializers


class StockDamageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock_damage
        fields = ['Item_Damage', 'title', 'quantity',
                  'length', 'status','created_at']
        depth = 1





class StockDamageSaveSerializer(serializers.ModelSerializer):
    #Item = serializers.StringRelatedField(many=True, read_only=True)
    #Item = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock_damage
        fields = '__all__'


# class ItemSerializer
