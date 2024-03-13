from store.models import Item,StockAlternative,ProductionStock
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Item
        fields = ['name', 'description', 'image', 'type', 'itemcode','is_length','is_quantity','is_both']
        depth = 1


class ItemDetailSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Item
        fields='__all__'



class ItemSerializerImport(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id']


class AlternativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockAlternative
        fields='__all__'
        depth=1


class ProductionStovkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionStock
        fields='__all__'
        depth=1
