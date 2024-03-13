from store.models import Stock, Finishing, Item, ItemType, Unit, System, Supplier,MandatoryStock
from rest_framework import serializers


class StockSerializer(serializers.ModelSerializer):
    #Item = serializers.StringRelatedField(many=True, read_only=True)
    #Item = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock
        fields = ['id','item','quantity', 'stockvalue']
        depth = 2


class StockDetailedSerializer(serializers.ModelSerializer):
    
    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock
        fields = ['id','item','quantity']
        depth = 2


class StockSerializerDetail(serializers.ModelSerializer):

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock
        fields = '__all__'
        depth=2


# class ItemSerializer



class StockAvalibilitySerializer(serializers.ModelSerializer):

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock
        fields = ['id','quantity', 'stockvalue']


class StockQTYSerializer(serializers.ModelSerializer):
    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock
        fields = ['id','quantity','item']


### Serilaizer to reduce stock loading time test


class StockNewSerializer(serializers.ModelSerializer):
    itemid=serializers.CharField(source='item.id')
    item=serializers.CharField(source='item.name')
    itemcode=serializers.CharField(source='item.itemcode')
    length=serializers.CharField(source='item.length')
    width=serializers.CharField(source='item.width')
    supplier=serializers.CharField(source='item.Supplier')
    finishing=serializers.CharField(source='item.finishing')
    #size=serializers.CharField(source='item.size')
    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock
        fields = ['id','itemid','quantity','item','itemcode','length','width','supplier','finishing']


class StockNewWithTypeSerializer(serializers.ModelSerializer):
    item=serializers.CharField(source='item.name')
    itemcode=serializers.CharField(source='item.itemcode')
    length=serializers.CharField(source='item.length')
    width=serializers.CharField(source='item.width')
    supplier=serializers.CharField(source='item.Supplier')
    finishing=serializers.CharField(source='item.finishing')
    type=serializers.CharField(source='item.type')
    #size=serializers.CharField(source='item.size')
    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock
        fields = ['id','quantity','item','itemcode','length','width','supplier','finishing','type']


class StockNewWithItemSerializer(serializers.ModelSerializer):
    item=serializers.CharField(source='item.name')
    item_id=serializers.CharField(source='item.id')
    itemcode=serializers.CharField(source='item.itemcode')
    length=serializers.CharField(source='item.length')
    width=serializers.CharField(source='item.width')
    supplier=serializers.CharField(source='item.Supplier')
    finishing=serializers.CharField(source='item.finishing')
    type=serializers.CharField(source='item.type')
    #size=serializers.CharField(source='item.size')
    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock
        fields = ['quantity','item','itemcode','length','width','supplier','finishing','type','item_id']



class MandatorySerializer(serializers.ModelSerializer):
    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = MandatoryStock
        fields = ['MandatoryItem','minimum']
