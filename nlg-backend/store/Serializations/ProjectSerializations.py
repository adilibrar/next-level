from store.models import Project,Cities,Customers,ProjectBudget
from rest_framework import serializers


class ProjectSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id','name', 'refrence_no', 'status', 'created_at','phase','total']
        depth = 1

class ProjectUniqueIDSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id','refrence_no']
        
class CitySerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Cities
        fields = ['customerarea_id','city']

class CustomerSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Customers
        fields = ['customer_id','customer_name']


class ProjectBudgetSerializer(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = ProjectBudget
        fields = '__all__'

class ProjectBudgetSerializerDetail(serializers.ModelSerializer):
    #type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = ProjectBudget
        fields = ['id','BudgetHead','created_date','amount','remarks','balance']
        depth=1

