from store.models import ProductionIssuing
from rest_framework import serializers

class ProductionIssuingSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionIssuing
        fields='__all__'



class ProductionIssuingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionIssuing
        fields='__all__'
        depth=1


