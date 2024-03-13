from store.models import StockList,StockListItem
from rest_framework import serializers


class StockListSerializer(serializers.ModelSerializer):

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = StockList
        fields = '__all__'

class StockListDetailSerializer(serializers.ModelSerializer):

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = StockList
        fields = '__all__'
        depth=1

class StockListItemSerializer(serializers.ModelSerializer):

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = StockListItem
        fields =['StockListItem','quantity']
        depth=1

class StockListItemSerializer(serializers.ModelSerializer):

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = StockListItem
        fields ='__all__'
        depth=1

class StockListItemSerializerValidate(serializers.ModelSerializer):
    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = StockListItem
        fields =['StockListItem','quantity']
        depth=1
# class ItemSerializer

