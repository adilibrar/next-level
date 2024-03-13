import json
from django.shortcuts import render
from store.models import Stock,Stock_issuing,Status,MandatoryStock,MTOItem,Item,Shopping_Cart
#from store.serializers import DepartmentSerializer
#from store.Model.DepartmentModel import Department
from store.Serializations.StockSerializer import StockSerializer,StockQTYSerializer,MandatorySerializer,StockDetailedSerializer,StockNewSerializer,StockNewWithTypeSerializer,StockNewWithItemSerializer
from store.Serializations.DeapartmentSerializations import DepartmentSerializer
from store.Serializations.StockIssuingSerializations import StockIssuingSerializer,StockIssuingSaveSerializer,ReserveStockIssuingSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
import io
from rest_framework.parsers import JSONParser
import re
import json
from django.db.models import Q


# Create your views here.

@api_view()
@permission_classes([AllowAny])
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def department_detail(request, pk):
    stu = Department.objects.get(id=pk)
    serializer = DepartmentSerializer(stu)
    #json_data = JSONRenderer().render(serializer.data)
    # return HttpResponse(json_data, content_type='application/json')
    return JsonResponse(serializer.data)


def stock_list(request):
    stock = Stock.objects.all()
    serializer = StockSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def stock_list_detail(request):
    stock = Stock.objects.all()
    serializer = StockDetailedSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


def OutOfStock(request):
    stock = Stock.objects.filter(quantity=0)
    serializer = StockNewSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def AccStock(request):
    stock = Stock.objects.filter(quantity__lte=10)
    serializer = StockNewSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def AvailableStock(request):
    stock = Stock.objects.filter(~Q(quantity=0))
    serializer = StockNewSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



def single_stock(request,pk):
    item = Stock.objects.get(id=pk)
    serializer = StockDetailedSerializer(item)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



def single_stock_qty(request):
    stock = Stock.objects.all()
    serializer = StockQTYSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



def stock_issued_list(request):
    stock = Stock_issuing.objects.all()
    serializer = StockIssuingSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



def stock_issued_list_by_project(request,pk):
    stock = Stock_issuing.objects.filter(project=pk)
    serializer = StockIssuingSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')







#need to move to issuing Stock Later
@csrf_exempt
@api_view(['PATCH'])
def updateIssuingStockStatus(request,pk):
    #id=params['pk']
    item=Stock_issuing.objects.get(id=pk)
    if request.method == "PATCH":
        data=request.data
        new=data.get("status")
        First=Status.objects.get(id=new)
        item.status=First
        #item.status=data.get("status",item.status)
        #item.status=data.get("status",item.status)
        item.quantity=data.get("quantity",item.quantity)
        item.save()
    #return HttpResponse("Done",content_type='application/json')
    return Response({"message":"200"})

@csrf_exempt
@api_view(['POST'])
def IssueStock(request):
    #data=request.data
    serializer = StockIssuingSaveSerializer(data=request.data)
    #serializer = StockSerializer(data)
    #if serializer.is_valid():   
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
def IssuedItemForMTO(request,pk):
    project = Stock_issuing.objects.filter(issuingmto=pk)
    serializer = ReserveStockIssuingSerializer(project,many=True)
    return JsonResponse(serializer.data,safe=False)

#change aassigned quantity
@csrf_exempt
@api_view(['POST'])
def update_stock_balnce(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    item_id=int(data['item_id'])
    item_issued_id=int(data['item_issued_id'])
    print(item_issued_id)
    item = Stock.objects.get(item=item_id)
    balance=int(data['balance'])
    quantity=int(data['quantity'])
    total=int(data['total'])
    color=data['color']
    mto_id=int(data['mto'])
    if(int(balance) == int(quantity) ==  int(total)):
        try:
            cart_check = Shopping_Cart.objects.get(mtocart=mto_id,item_cart=item_id)
        except Shopping_Cart.DoesNotExist:
            cart_check=None
            if(cart_check):
                None
            else:
                try:
                    stock_issuing=Stock_issuing.objects.get(id=item_issued_id)
                    stock_issuing.delete()
                except:
                    None
                try:
                    mto_item = MTOItem.objects.get(mto=mto_id,itemname=item_id,color=color)
                    mto_item.delete()
                except:
                    None
        try:
            item = Stock.objects.get(item=item_id)
            serializer = StockQTYSerializer(item)
            stock_qty=serializer.data['quantity']
            item.quantity=int(stock_qty)+int(quantity)
            item.save()
        except:
            None

        #new statements
        try:
            stock_issuing=Stock_issuing.objects.get(id=item_issued_id)
            stock_issuing.balance=int(balance)-int(quantity)
            stock_issuing.revoke=int(quantity)+int(stock_issuing.revoke)
            stock_issuing.save()
        except:
            None
        #end of new statements

        return JsonResponse(serializer.data, status=202)
    else:
        stock_issuing=Stock_issuing.objects.get(id=item_issued_id)
        stock_issuing.balance=int(balance)-int(quantity)
        stock_issuing.revoke=int(quantity)+int(stock_issuing.revoke)
        stock_issuing.save()
        item = Stock.objects.get(item=item_id)
        serializer = StockQTYSerializer(item)
        stock_qty=serializer.data['quantity']
        item.quantity=int(stock_qty)+int(quantity)
        item.save()
        return JsonResponse(serializer.data, status=202)

def New_stock_list(request):
    stock = Stock.objects.all()
    serializer = StockNewSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


def New_stock_list_With_Type(request):
    stock = Stock.objects.all()
    serializer = StockNewWithTypeSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


def New_stock_list_With_Item(request):
    stock = Stock.objects.all()
    serializer = StockNewWithItemSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

    

def LowStockReport(request):
    stock = Stock.objects.filter(quantity__lte=int(15))
    serializer = StockNewSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view(['GET'])
def IssuedItemForProject(request,pk):
    project = Stock_issuing.objects.filter(project=pk)
    serializer = ReserveStockIssuingSerializer(project,many=True)
    return JsonResponse(serializer.data,safe=False)



@api_view(['GET'])
def StockIssuingByItem(request,pk):
    item = Stock_issuing.objects.filter(Issued_item=pk,balance__gt=0)
    serializer = ReserveStockIssuingSerializer(item,many=True)
    return JsonResponse(serializer.data,safe=False)


@api_view(['POST'])
def StockAndRevokeUpdate(request):
    data=request.data
    item = Stock.objects.get(item=data['item'])
    serializer = StockQTYSerializer(item)
    stock_qty=serializer.data['quantity']
    item.quantity=int(stock_qty)+int(data['quantity'])
    item.save()
    
    Sitem = Stock_issuing.objects.get(id=data['issue_id'])
    #serializer = StockIssuingSaveSerializer(item)
    #         #item.quantity=to_assign
    Sitem.balance=Sitem.balance - int(data['quantity'])
    Sitem.revoke=Sitem.revoke + int(data['quantity'])
    Sitem.save()

    return JsonResponse(data,status=201)



@api_view(['GET'])
def MandatoryStockAll(request):
    item = MandatoryStock.objects.all()
    serializer = MandatorySerializer(item,many=True)
    final_mandatory_data=[]
    
    for mandatory in serializer.data:
        
        stockitem = Stock.objects.get(item=int((mandatory['MandatoryItem'])))
        serializer = StockNewSerializer(stockitem)
        print(serializer.data)
        stock_data=[serializer.data['itemid'],serializer.data['item'],serializer.data['itemcode'],serializer.data['length'],serializer.data['supplier'],serializer.data['finishing'],serializer.data['quantity'],mandatory['minimum']]
        #json_data = JSONRenderer().render(serializer.data)
        final_mandatory_data.append(stock_data)
    return JsonResponse(final_mandatory_data,safe=False)