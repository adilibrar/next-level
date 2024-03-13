from store.models import Item
from rest_framework import serializers


class ItemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id','name']
