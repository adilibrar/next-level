from store.models import CartOrder
from store.models import OrderItemDetail,OrderItemQuotation
from rest_framework import serializers


class OrderSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrder
        fields='__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartOrder
        fields='__all__'
        depth=1


class CartOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrder
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemDetail
        fields = '__all__'
        depth=1

class OrderItemLessSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemDetail
        fields = '__all__'


class OrderQuotationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemQuotation
        fields = '__all__'


class OrderQuotationItemSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = OrderItemQuotation
        fields = '__all__'
        depth=1

        