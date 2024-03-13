from store.models import PowderCoating
from store.models import PowderCoatingItems
from rest_framework import serializers


class DNSerializer(serializers.ModelSerializer):
    class Meta:
        model = PowderCoating
        fields='__all__'
        depth = 1



class DNSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = PowderCoating
        fields='__all__'


class DNItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PowderCoating
        #fields = ['id']
        fields='__all__'
        depth=2

class DNItemSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = PowderCoatingItems
        fields='__all__'

class DNItemSerializerLimit(serializers.ModelSerializer):
    class Meta:
        model = PowderCoatingItems
        #fields = ['id']
        fields='__all__'
        depth=1