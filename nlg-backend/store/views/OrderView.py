from django.shortcuts import render
from django.core.mail import send_mass_mail
from store.models import Shopping_Cart,OrderItemDetail,Item,CartOrder,Project,MTO,Supplier,OrderItemQuotation
from store.Serializations.OrderSerializer import OrderSaveSerializer,CartOrderSerializer,OrderItemSerializer,OrderQuotationItemSerializer,OrderQuotationItemSerializerDetail,OrderItemLessSerializer
from store.Serializations.CartSerializations import CartSerializer,CartSerializerNoDepth
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import datetime
from django.core.mail import send_mail


@csrf_exempt
@api_view(['POST'])
#@permission_classes((IsAuthenticated, ))
def CreateOrder(request):
    if request.method == "POST":
        serializer = OrderSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            order_id=serializer.data['id']
            items = Shopping_Cart.objects.filter(status=1)
            serializer = CartSerializerNoDepth(items, many=True)
            serialize_data=serializer.data
            json_data=JsonResponse(serializer.data,safe=False)
            #print(json_data)
            for data in serialize_data:
                if(data['Supplier']==1 or data['Supplier']==8):
                    OrderItemDetail.objects.create(
                        orderNo=CartOrder.objects.get(id=order_id),
                        order_item=Item.objects.get(id=data['item_cart']),
                        forprojectorder=Project.objects.get(id=data['forproject']),
                        fromprojectorder=Project.objects.get(id=data['fromproject']),
                        Supplier=Supplier.objects.get(id=data['Supplier']),
                        mtocartorder=MTO.objects.get(id=data['mtocart']),
                        assigned_date=data['assigned_date'],
                        quantity=data['quantity'],
                        )
                else:
                    OrderItemDetail.objects.create(
                        orderNo=CartOrder.objects.get(id=order_id),
                        order_item=Item.objects.get(id=data['item_cart']),
                        forprojectorder=Project.objects.get(id=data['forproject']),
                        fromprojectorder=Project.objects.get(id=data['fromproject']),
                        Supplier=Supplier.objects.get(id=data['Supplier']),
                        mtocartorder=MTO.objects.get(id=data['mtocart']),
                        assigned_date=data['assigned_date'],
                        quantity=data['quantity'],
                        status='2'
                        ) 
            item = Shopping_Cart.objects.all()
            serializer = CartSerializer(item, many=True)
            for object in item:
                object.status=0
                object.save()    
            return JsonResponse(serializer.data, status=201,safe=False)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
def OrderList(request):
    order = CartOrder.objects.all().order_by('-id')
    serializer = CartOrderSerializer(order, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view(['GET'])
def OrderListLimit(request):
    order = CartOrder.objects.all().order_by('-id')[:5]
    serializer = CartOrderSerializer(order, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['GET'])
def OrderItems(request,pk):
    items = OrderItemDetail.objects.filter(orderNo=pk)
    serializer = OrderItemSerializer(items,many=True)
    #return JsonResponse(serializer.data)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view(['GET'])
def Order(request,pk):
    order = OrderItemDetail.objects.get(id=pk)
    serializer = OrderItemSerializer(order)
    #return JsonResponse(serializer.data)
    #print(order)
    order.status=2
    #order.status_text='Approved'
    order.save()
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['GET'])
def QuotationOrderItemUpdate(request,pk):
    order = OrderItemQuotation.objects.get(id=pk)
    serializer = OrderQuotationItemSerializer(order)
    order.status=2
    order.save()
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

    
@api_view(['GET'])
def Order_backup(request,pk):
    order = CartOrder.objects.get(id=pk)
    serializer = CartOrderSerializer(order)
    #return JsonResponse(serializer.data)
    #print(order)
    order.status=2
    order.status_text='Approved'
    order.save()
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

    

@api_view(['GET'])
def ApprovedOrderItems(request):
    items = OrderItemDetail.objects.filter(status=2,po_status=0,hidden=0)
    serializer = OrderItemSerializer(items,many=True)
    #return JsonResponse(serializer.data)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view(['GET'])
def ApprovedQuotationOrderItems(request):
    items = OrderItemQuotation.objects.filter(status=2,po_status=0)
    serializer = OrderQuotationItemSerializerDetail(items,many=True)
    #return JsonResponse(serializer.data)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

 
@api_view(['GET'])
def AproveOrderandItem(request,pk):
    order = CartOrder.objects.get(id=pk)
    serializer = CartOrderSerializer(order)
    #return JsonResponse(serializer.data)
    #print(order)
    order.status=2
    order.status_text='Approved'
    order.save()
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

    
        
@api_view(['GET'])
def OrderDetail(request,pk):
    order = CartOrder.objects.get(id=pk)
    serializer = CartOrderSerializer(order)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

    
@csrf_exempt
@api_view(['POST'])
def AddQuotationOrderItem(request):
    serializer = OrderQuotationItemSerializer(data=request.data)
    #serializer.data)
    print(request.data)
    #serializer = StockSerializer(data)
    #if serializer.is_valid():   
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
def QuotationOrderItems(request,pk):
    items = OrderItemQuotation.objects.filter(QuotationorderNo=pk)
    serializer = OrderQuotationItemSerializerDetail(items,many=True)
    #return JsonResponse(serializer.data)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['POST'])
def PR_Save(request):
    if request.method == "POST":
        serializer = OrderSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
def UpdateOrderAndItem(request,pk):
    order = CartOrder.objects.get(id=pk)
    serializer = CartOrderSerializer(order)
    #return JsonResponse(serializer.data)
    #print(order)
    order.status=2
    #order.status_text='Approved'
    order.save()
    items = OrderItemDetail.objects.filter(orderNo=pk)
    serializer = OrderItemLessSerializer(items,many=True)
    #print(serializer)
    for data in serializer.data:   
        order_item = OrderItemDetail.objects.get(id=data['id'])
        order_item.status=2
        order_item.save()
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def NAEmail(request):
    #serializer = OrderQuotationItemSerializer(data=request.data)
    #serializer.data)

    Mto=request.data['mto']
    pr_no=request.data['pr_no']
    #print(request.data)
    message1=(
    "item Not Available In Market-Purchase Department",
    "The requested item # "+''+request.data['itemcode']+" ("+str(request.data['itemname'])+") "+"quantity "+str(request.data['quantity'])+" from MTO #"+str(Mto)+" against project "+str(request.data['project'])+" is not availble please reconsider the item.",
    "nextlevelgroup.do.not.reply@gmail.com",
    ["design1@nlc-me.com"],
    #fail_silently=False,
    )

    message3=(
    "item Not Available In Market-Purchase Department",
    "The requested item # "+''+request.data['itemcode']+" ("+str(request.data['itemname'])+") "+"quantity "+str(request.data['quantity'])+" from MTO #"+str(Mto)+" against project "+str(request.data['project'])+" is not availble please reconsider the item.",
    "nextlevelgroup.do.not.reply@gmail.com",
    ["design4@nlc-me.com"],
    #fail_silently=False,
    )

    message2=(
    "item Not Available In Market-Purchase Department",
    "The requested item # "+''+str(request.data['itemcode'])+" ("+str(request.data['itemname'])+") "+"quantity "+str(request.data['quantity'])+" from MTO #"+str(Mto)+" and Purchase Request #"+str(pr_no)+" against project "+str(request.data['project'])+" is not availble please reconsider the item.",
    "nextlevelgroup.do.not.reply@gmail.com",
    ["store1@nlc-me.com"],
    #fail_silently=False,
    )
    if(request.data['req']==1):
        send_mail(
                "item Removed From Purchase Request-Purchase Department",
                "The  item # "+''+str(request.data['itemcode'])+" ("+str(request.data['itemname'])+") "+"quantity "+str(request.data['quantity'])+" from MTO #"+str(Mto)+" and Purchase Request #"+str(pr_no)+" against project "+str(request.data['project'])+" has been removed from Purchase Request , Based on your Request.",
                "nextlevelgroup.do.not.reply@gmail.com",
                ["store1@nlc-me.com"],
                fail_silently=False,
            )
    elif(request.data['mto']==1):
        #print("mto is 1")
        #send_mass_mail((message3), fail_silently=False)
        # send_mail(
        #         "Certified Payment-Project Managment Department",
        #         "This is to inform you that we received confirmation for the certified amount of "+ str(request.data['approvedcertifiedamount']) +" against "+certify.certificationid+" for project #"+str(certify.projectid)+" Please take the necessary action. If you have any questions, don't hesitate to reach out.",
        #         "nextlevelgroup.do.not.reply@gmail.com",
        #         #["adil@nlc-me.com"],
        #         ["accounts@nlc-me.com"],
        #         message2=(
        #         "item Not Available In Market-Purchase Department",
        #         "The requested item # "+''+str(request.data['itemcode'])+" ("+str(request.data['itemname'])+") "+"quantity "+str(request.data['quantity'])+" from MTO #"+str(Mto)+" and Purchase Request #"+str(pr_no)+" against project "+str(request.data['project'])+" is not availble please reconsider the item.",
        #         "nextlevelgroup.do.not.reply@gmail.com",
        #         ["store1@nlc-me.com"],
        #         #fail_silently=False,
        #         )
        #         fail_silently=False,
        #     )
        
        send_mail(
                "item Not available In Market-Purchase Department",
                "The requested item # "+''+str(request.data['itemcode'])+" ("+str(request.data['itemname'])+") "+"quantity "+str(request.data['quantity'])+" from MTO #"+str(Mto)+" and Purchase Request #"+str(pr_no)+" against project "+str(request.data['project'])+" is not availble please reconsider the item.",
                "nextlevelgroup.do.not.reply@gmail.com",
                ["store1@nlc-me.com"],
                fail_silently=False,
            )
    else:
        send_mass_mail((message1, message2,message3), fail_silently=False)
        #print("mto is 2")
    items = OrderItemDetail.objects.get(id=request.data['id'])
    #serializer = OrderItemSerializer(items,many=True
    items.hidden=1
    items.save()
    send_mass_mail((message1, message2,message3), fail_silently=False)
    return JsonResponse(request.data, status=201)