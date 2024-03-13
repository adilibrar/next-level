from store.models import MTO,MTOItem,Stock_issuing
from rest_framework import serializers


class MTOSerializer(serializers.ModelSerializer):
    class Meta:
        model = MTO
        fields = ['id','projectmto', 'description', 'revision', 'extra','status','submital','created_at','copy','MTOType']
        #fields='__all__'
        depth = 1



class MTOSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = MTO
        fields='__all__'


class MTOItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MTOItem
        #fields = ['id']
        fields='__all__'
        depth=2

class MTOItemSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = MTOItem
        fields='__all__'



class MtoColorUpdate(serializers.ModelSerializer):
    class Meta:
        model = MTOItem
        fields='__all__'

class IssuingColorUpdate(serializers.ModelSerializer):
    class Meta:
        model = Stock_issuing
        fields='__all__'
