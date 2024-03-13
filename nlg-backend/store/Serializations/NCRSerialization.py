from store.models import NCR,NCRItems
from rest_framework import serializers


class NCRSerializer(serializers.ModelSerializer):
    class Meta:
        model = NCR
        fields = '__all__'
        depth = 1



class NCRItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NCRItems
        fields = '__all__'


class NCRItemSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = NCRItems
        fields = '__all__'
        depth=1

# class MTOSaveSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MTO
#         fields='__all__'

class NCRSerializerNO(serializers.ModelSerializer):
    class Meta:
        model = NCR
        fields = '__all__'
    


