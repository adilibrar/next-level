from django.shortcuts import render
from store.models import SiteDeliveryNote,SiteDeliveryNoteItems
from store.Serializations.SiteViewSerialization import SiteDeliverySerializer,SiteDeliverySaveSerializer,SiteDeliveryItemSerializer,NSiteDeliverySerializer
from store.Serializations.StockSerializer import StockQTYSerializer
from store.models import Stock_issuing,Stock
from store.Serializations.PurchaseOrderSerializer import POSerializer,POItemSerializer,POItemSaveSerializer,DeliverNoteSupplierSerializer,DeliverNoteSupplierItemSerializer,POQuotationSerializer,POQuotationSerializerDetail
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view()
@permission_classes([AllowAny])
def SDN_List(request):
    projects = SiteDeliveryNote.objects.all().order_by('-id')
    serializer = SiteDeliverySerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
def add_site_item(request):
    #print(request.data)
    serializer = SiteDeliverySaveSerializer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def SDN_Item(request,pk):
    projects = SiteDeliveryNoteItems.objects.filter(site_delivery_note_no=pk).order_by('-id')
    serializer = SiteDeliveryItemSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def SingleSiteDN(request,pk):
    projects = SiteDeliveryNote.objects.get(id=pk)
    serializer = SiteDeliverySerializer(projects)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def SiteDN_Save(request):
    if request.method == "POST":
        serializer = NSiteDeliverySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
