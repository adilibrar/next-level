from urllib import response
from django.shortcuts import render
from store.models import Stock_issuing,Stock
from store.Serializations.StockIssuingSerializations import StockIssuingSerializer
from store.Serializations.StockSerializer import StockSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.response import Response


class StockIssuingViewSet(viewsets.ModelViewSet):

    serializer_class = StockIssuingSerializer

    def get_queryset(self):
        stock = Stock_issuing.objects.all()
        return stock

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        issued_stock = Stock_issuing.objects.filter(Issued_item=params['pk'])
        serializer = StockIssuingSerializer(issued_stock, many=True)
        #json_data = JSONRenderer().render(serializer.data)
        # print(serializer.data[1]['item'])
        return Response(serializer.data)
        # return JsonResponse(serializer.data)

    def destroy(self,request,*args,**kwargs):
        params=kwargs
        issued=self.get_object()
        issued.delete()
        return Response({"message":"200"})

    def partial_update(self,request,*args,**kwargs):
        #stock=self.get_object()
        params=kwargs
        #stock_object=self.get_object()
        item = Stock.objects.get(item=params['pk'])
        serializer = StockSerializer(item)
        #print(serializer.data['quantity'])
        #json_data = JSONRenderer().render(serializer.data)
        new_quantity=int(request.data['quantity'])
        old_quantity=int(serializer.data['quantity'])
        quantity=new_quantity+old_quantity
        #item.status=request.data['status']
        item.quantity=quantity
        item.stockvalue=quantity
        item.save();
        #print(stock_object)
        #data=request.data
        return Response({"message":"200"})

  

