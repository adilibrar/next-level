from store.models import SiteDeliveryNote,SiteDeliveryNoteItems
from rest_framework import serializers


class SiteDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteDeliveryNote
        fields='__all__'
        depth = 1

class SiteDeliverySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteDeliveryNoteItems
        fields='__all__'

class NSiteDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteDeliveryNote
        fields='__all__'
        
class SiteDeliveryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteDeliveryNoteItems
        fields='__all__'
        depth=1
        