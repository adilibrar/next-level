from urllib import response
from django.shortcuts import render
from store.models import Stock_damage
from store.Serializations.StockDamageSerialization import StockDamageSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.response import Response


class StockDamageViewSet(viewsets.ModelViewSet):

    serializer_class = StockDamageSerializer

    def get_queryset(self):
        stock = Stock_damage.objects.all()
        return stock

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        damage_stock = Stock_damage.objects.filter(Item_Damage=params['pk'])
        serializer = StockDamageSerializer(damage_stock, many=True)
        #json_data = JSONRenderer().render(serializer.data)
        # print(serializer.data[1]['item'])
        return Response(serializer.data)
        # return JsonResponse(serializer.data)
