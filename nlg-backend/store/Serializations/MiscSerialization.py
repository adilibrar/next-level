from rest_framework import serializers
from store.models import Stock_issuing,Currency
from store.models import Profile,Finishing,Unit,AccountsHead


class AddDamageSerializer(serializers.ModelSerializer):
    #Item = serializers.StringRelatedField(many=True, read_only=True)
    #Item = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        # moodel = Finishing, Item, ItemType, Unit, System, Supplier
        model = Stock_issuing
        fields = '__all__'





class GetProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class FinishingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Finishing
        fields = '__all__'

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'


class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountsHead
        fields = '__all__'


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'

