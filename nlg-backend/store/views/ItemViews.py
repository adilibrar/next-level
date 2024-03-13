from django.shortcuts import render
from store.models import Item,StockAlternative,ProductionStock
from store.Serializations.ItemSerializations import ItemSerializer,AlternativeSerializer,ProductionStovkSerializer
from store.Serializations.StockSerializer import StockSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


@api_view()
@permission_classes([AllowAny])
def item(request):
    stock = Item.objects.all()
    serializer = ItemSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def SingleItem(request,pk):
    item = Item.objects.get(id=pk)
    serializer = ItemSerializer(item)
    return JsonResponse(serializer.data)


def Alternative(request):
    stock = StockAlternative.objects.all()
    serializer = AlternativeSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    #print(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def ProductionStockView(request):
    stock = ProductionStock.objects.all()
    serializer = ProductionStovkSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    #print(serializer.data)
    return HttpResponse(json_data, content_type='application/json')