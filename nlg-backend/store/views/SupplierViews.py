from django.shortcuts import render
from store.models import SiteDeliveryNote,SiteDeliveryNoteItems,DeliveryNoteFromSupplierItem,Supplier
from store.Serializations.SiteViewSerialization import SiteDeliverySerializer,SiteDeliverySaveSerializer,SiteDeliveryItemSerializer
from store.Serializations.SupplierSerilization import DeliveryNoteItemSup,SupplierDN
from store.Serializations.SupplierSerilization import SupplierSerializer
from store.models import Stock_issuing,Stock
from store.Serializations.PurchaseOrderSerializer import POSerializer,POItemSerializer,POItemSaveSerializer,DeliverNoteSupplierSerializer,DeliverNoteSupplierItemSerializer,POQuotationSerializer,POQuotationSerializerDetail
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([AllowAny])
def SUpplierDN_Item(request,pk):
    projects = SiteDeliveryNoteItems.objects.filter(site_delivery_note_no=pk).order_by('-id')
    serializer = SiteDeliveryItemSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view(['GET'])
def RecievedItemForInvoice(request,pk):
    project = DeliveryNoteFromSupplierItem.objects.filter(DNINFromsupplierNo=pk)
    serializer = DeliveryNoteItemSup(project,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['GET'])
def SupplierList(request):
    supplier = Supplier.objects.all()
    serializer = SupplierSerializer(supplier,many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

    


@csrf_exempt
@api_view(['POST'])
def SupplierDNSave(request):
    if request.method == "POST":
        serializer = SupplierDN(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
