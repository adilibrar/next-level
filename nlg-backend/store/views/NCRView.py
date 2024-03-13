from django.shortcuts import render
from store.models import NCR,NCRItems,Project
# from store.Serializations.SiteViewSerialization import SiteDeliverySerializer,SiteDeliverySaveSerializer,SiteDeliveryItemSerializer,NSiteDeliverySerializer
from store.Serializations.NCRSerialization import NCRSerializer,NCRItemSerializer,NCRSerializerNO
# from store.models import Stock_issuing,Stock
# from store.Serializations.PurchaseOrderSerializer import POSerializer,POItemSerializer,POItemSaveSerializer,DeliverNoteSupplierSerializer,DeliverNoteSupplierItemSerializer,POQuotationSerializer,POQuotationSerializerDetail
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json

@api_view()
@permission_classes([AllowAny])
def NCR_List(request):
    ncr = NCR.objects.all().order_by('-id')
    serializer = NCRSerializer(ncr, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def SaveNCR(request):
    #print(request.data)
    serializer = NCRSerializerNO(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
def SaveNCRItems(request):
    #print(request.data)
    serializer = NCRItemSerializer(data=request.data)
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def NCRItemList(request,pk):
    
    projects = NCRItems.objects.filter(NCRId=pk).order_by('-id')
    serializer = NCRItemSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    
    return HttpResponse(json_data, content_type='application/json')


@api_view(['GET'])
@permission_classes([AllowAny])
def NCRItemListProject(request,pk):
    try:
        # project_id=Project.objects.get(refrence_no=pk)
        # id=int(project_id.id)
        ncritem = NCRItems.objects.filter(NCRItemProject=pk)
        serializer=NCRItemSerializer(ncritem,many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    except Project.DoesNotExist:
        #Project=None
        return Response({"message":"201"}) 
    


@api_view(['GET'])
@permission_classes([AllowAny])
def NCRListProject(request,pk):
    #print("i akm here")
    try:
        #project_id=Project.objects.get(refrence_no=pk)
        #id=int(project_id.id)
        print(pk)
        ncritem = NCR.objects.filter(NCRProject=pk)
        serializer=NCRSerializerNO(ncritem,many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    except Project.DoesNotExist:
        #Project=None
        #print("Not Found")
        project_id=None
        ncritem=None
        #json_data={}
        #return HttpResponse(json_data, content_type='application/json')
        return Response({"message":"400"})




@api_view(['GET'])
@permission_classes([AllowAny])
def NCRItemRAN(request,pk):
    total_qtyGsf=0
    total_qtyGTS=0
    total_qtyRat=0
    # try:
    #     project_id=Project.objects.get(refrence_no=pk)
    #     id=int(project_id.id)
    # except Project.DoesNotExist:
    #     #Project=None
    #     return Response({"message":"200"}) 
    try:
        ncritemsrat = NCRItems.objects.filter(NCRItemProject=pk,location="Received at NLG",balance__gt=0)
        if(ncritemsrat):
            total_qtyRat = sum(ncritemsrat.values_list('balance', flat=True))
        else:
            total_qtyRat=0
        
        ncritemsGSF = NCRItems.objects.filter(NCRItemProject=pk,location="Glass Shutter at Factory",balance__gt=0)
        if(ncritemsGSF):  
            total_qtyGsf = sum(ncritemsGSF.values_list('balance', flat=True))
        else:
            total_qtyGsf=0
        
        ncritemsGTS = NCRItems.objects.filter(NCRItemProject=pk,location="Glass Delivery to Site",balance__gt=0) 
        if(ncritemsGTS):
            total_qtyGTS = sum(ncritemsGTS.values_list('balance', flat=True))
        else:
            total_qtyGTS=0
        data_details = {'Rat' :total_qtyRat, 'GSF' : total_qtyGsf, 'GTS' :total_qtyGTS }
        #return HttpResponse(data_details, content_type='application/json')
        return HttpResponse(json.dumps(data_details))
    except NCRItems.DoesNotExist:
        total_qtyRat=None
        return HttpResponse(total_qtyRat, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
def UpdateNCRItem(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    balance=data['balance']
    quantity=int(data['qty'])
    item=int(data['id'])
    item = NCRItems.objects.get(id=item)
    #print(serializer)
    #print(int(item.quantity)+int(quantity))
    item.balance=int(balance)-int(quantity)
    item.save()
    return Response({"message":"200"}) 

# get-ncr-balance
# @csrf_exempt
# @api_view(['POST'])
# def add_site_item(request):
#     #print(request.data)
#     serializer = SiteDeliverySaveSerializer(data=request.data)  
#     #print(serializer)
#     if serializer.is_valid():
#         serializer.save()
#         return JsonResponse(serializer.data, status=201)
#     return JsonResponse(serializer.errors, status=400)


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def SDN_Item(request,pk):
#     projects = SiteDeliveryNoteItems.objects.filter(site_delivery_note_no=pk).order_by('-id')
#     serializer = SiteDeliveryItemSerializer(projects, many=True)
#     json_data = JSONRenderer().render(serializer.data)
#     return HttpResponse(json_data, content_type='application/json')



# @api_view()
# @permission_classes([AllowAny])
# def SingleSiteDN(request,pk):
#     projects = SiteDeliveryNote.objects.get(id=pk)
#     serializer = SiteDeliverySerializer(projects)
#     json_data = JSONRenderer().render(serializer.data)
#     return HttpResponse(json_data, content_type='application/json')


# @csrf_exempt
# @api_view(['POST'])
# def SiteDN_Save(request):
#     if request.method == "POST":
#         serializer = NSiteDeliverySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)
