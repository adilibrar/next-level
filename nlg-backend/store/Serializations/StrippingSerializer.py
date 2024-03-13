from store.models import Stripping,StrippingItems
from store.models import PowderCoatingItems
from rest_framework import serializers


class STSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stripping
        fields='__all__'



class STAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stripping
        fields='__all__'
        depth=1


class STItemSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = StrippingItems
        fields='__all__'



class STItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StrippingItems
        fields='__all__'
        depth=1