import json
from django.shortcuts import render
#from backend.store.Serializations.StockSerializer import ItemTypeSerializer

from store.models import ItemType
#from store.serializers import DepartmentSerializer
#from store.Model.DepartmentModel import Department
from store.Serializations.ItemTypeSerialization import ItemTypeSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
# Create your views here.


def item_type(request):
    stock = ItemType.objects.all()
    serializer = ItemTypeSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')
