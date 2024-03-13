from store.models import Status
from rest_framework import serializers


class StatusSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Status
        fields = ['id','title']
        depth = 1