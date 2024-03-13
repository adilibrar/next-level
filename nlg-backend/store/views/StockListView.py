from django.shortcuts import render
from store.models import StockList,StockListItem
from store.models import Stock_issuing,StockList,MTOItem
from store.Serializations.StockListSerializations import StockListSerializer,StockListItemSerializer,StockListDetailSerializer,StockListItemSerializerValidate
from store.Serializations.StockIssuingSerializations import StockIssuingSaveSerializer

from store.Serializations.StockIssuingSerializations import StockIssuingProjectSerializer
from rest_framework.renderers import JSONRenderer
from django.http import QueryDict
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from itertools import chain
from django.db.models import Sum

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetStockList(request,pk):
    if request.method == "GET":
        projects = StockList.objects.filter(ProjectStockList=pk).order_by('-id')
        serializer = StockListSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetSingleStockList(request,pk):
    if request.method == "GET":
        StockList = StockListItem.objects.filter(StockListID=pk)
        WindowSerializer = StockListItemSerializer(StockList,many=True)
        
    json_data = JSONRenderer().render(WindowSerializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def ValidateStockList(request,pk,pk2):
    alldata=[]
    Nodata=[]
    if request.method == "GET":
        
        StockList = StockListItem.objects.filter(StockListID=pk)
        StockListSerializer = StockListItemSerializerValidate(StockList,many=True)
        #print(StockListSerializer.data)
        for stock in StockListSerializer.data:
           
            # print(stock['StockListItem'])
            # print(pk2)
            # item = Stock_issuing.objects.filter(project=pk2,Issued_item=stock['StockListItem']).aggregate(Sum('balance'))
            # serializer = StockIssuingSaveSerializer(item, many=True)
            item = Stock_issuing.objects.filter(project=pk2,Issued_item=stock['StockListItem']['id'])
            if item:
                total_variation_quantity = sum(item.values_list('balance', flat=True))
                if(int(stock['quantity'])<=int(total_variation_quantity)):
                    None
                else:
                    #print(int(stock['StockListItem']))
                    # print(stock['StockListItem'])
                    alldata.append(stock['StockListItem']['itemcode']+",")
                    #print(alldata)
        #     print(stock['itemcode'])
            else:
                alldata.append(stock['StockListItem']['itemcode']+", ")
    #print(alldata)
    json_data = JSONRenderer().render(alldata)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetSingleStockListDetail(request,pk):
    if request.method == "GET":
        StockList = StockListItem.objects.filter(StockListID=pk)
        StockListSerializer = StockListItemSerializer(StockList,many=True)
        #print(StockListSerializer.data)
    json_data = JSONRenderer().render(StockListSerializer.data)
    return HttpResponse(json_data, content_type='application/json')
