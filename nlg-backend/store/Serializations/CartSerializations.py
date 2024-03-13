from store.models import Shopping_Cart
from rest_framework import serializers


class CartSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shopping_Cart
        fields='__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Shopping_Cart
        fields='__all__'
        depth=1

class CartSerializerNoDepth(serializers.ModelSerializer):
    class Meta:
        model=Shopping_Cart
        fields='__all__'

