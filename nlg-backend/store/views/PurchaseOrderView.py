from django.shortcuts import render
from datetime import date
from store.models import PurchaseOrder,ProjectBudget,Item,Project,Supplier,InvoiceFromSupplier,InvoiceItemFromSupplier,transactions,PurchaseOrderItems,ProjectsList,Stock,OrderItemDetail,DeliveryNoteFromSupplier,DeliveryNoteFromSupplierItem,OrderItemQuotation,PurchaseOrderQuotationItems
from store.Serializations.MTOSerializations import MTOSerializer,MTOSaveSerializer,MTOItemSerializer,MTOItemSaveSerializer,MtoColorUpdate
from store.Serializations.StockSerializer import StockQTYSerializer
from store.models import Stock_issuing,Stock
from store.Serializations.PurchaseOrderSerializer import POSerializer,POPlainSerializer,POItemSerializer,DeliverNoteSupplierItemDetailSerializer,POItemSaveSerializer,DeliverNoteSupplierDetailSerializer,DeliverNoteSupplierSerializer,DeliverNoteSupplierItemSerializer,POQuotationSerializer,POQuotationSerializerDetail,POSerializerNoDepth
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view()
@permission_classes([AllowAny])
def PO_List(request):
    projects = PurchaseOrder.objects.all().order_by('-id')
    serializer = POSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')
    

@api_view()
@permission_classes([AllowAny])
def PIPO_List(request):
    projects = PurchaseOrder.objects.filter(PerformaInvoice=1).order_by('-id')
    serializer = POSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')
    


@csrf_exempt
@api_view(['POST'])
def adding_poitem(request):
    # discount=0
    # try:
    #     project = ProjectBudget.objects.get(ProjectBudget=int(request.data['forprojectpo']),BudgetHead=int(request.data['accountshead']))
    #     # print(project.balance)
    #     # print(((int(request.data['balance'])*int(request.data['price']))-int(request.data['discount'])))
    #     if(request.data['discount']==''):
    #         discount=0
    #     else:
    #         discount=int(request.data['discount'])
    #     if(int(project.balance)<((int(request.data['balance'])*int(request.data['price']))-discount)):
    #         return Response({"message":"203"})

    #     else:
            
    #         serializer = POItemSaveSerializer(data=request.data)  
    #         if serializer.is_valid():
    #             serializer.save()
    #             project.balance=int(project.balance)-int(((int(request.data['balance'])*int(request.data['price']))-discount))
    #             project.save()
    #             return Response({"message":"201"})
    #         return Response({"message":"202"})

    # except ProjectBudget.DoesNotExist:
    #     print("none")
    #     Project=None
    #     return Response({"message":"204"})
        serializer = POItemSaveSerializer(data=request.data)  
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"201"})
        return Response({"message":"202"})    


@csrf_exempt
@api_view(['POST'])
def adding_quotation_poitem(request):
    #print(request.data)
    serializer = POQuotationSerializer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)



@api_view()
@permission_classes([AllowAny])
def PoItemlist(request,pk):
    projects = PurchaseOrderItems.objects.filter(pono=pk)
    serializer = POItemSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view()
@permission_classes([AllowAny])
def PoQItemlist(request,pk):
    projects = PurchaseOrderQuotationItems.objects.filter(quot_item_pono=pk)
    serializer = POQuotationSerializerDetail(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


#change aassigned quantity
@csrf_exempt
@api_view(['POST'])
def Changed_stock_qty(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    item_id=int(data['po_item'])
    quantity=int(data['quantity'])
    item = Stock.objects.get(item=item_id)
    #print(item.quantity)
    serializer = StockQTYSerializer(item)
    #print(serializer)
    #print(int(item.quantity)+int(quantity))
    item.quantity=int(item.quantity)+int(quantity)
    #item.balance=to_balance
    item.save()
    return JsonResponse(serializer.data, status=202)

@api_view()
@permission_classes([AllowAny])
def PO_List_Limit(request):
    projects = PurchaseOrder.objects.all().order_by('-id')[:300]
    serializer = POSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view()
@permission_classes([AllowAny])
def PO_List_Limit_no_depth(request):
    projects = PurchaseOrder.objects.all().order_by('-id')[:200]
    serializer = POSerializerNoDepth(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def UpdatePRItems(request,pk):
    item = OrderItemDetail.objects.get(id=pk)
    item.po_status=1
    item.save()
    return Response({"message":"203"})

@csrf_exempt
@api_view(['POST'])
def UpdatePRQItems(request,pk):
    item = OrderItemQuotation.objects.get(id=pk)
    item.po_status=1
    item.save()
    return Response({"message":"203"})


@api_view(['GET'])
def SinglePO(request,pk):
    po = PurchaseOrder.objects.get(id=pk)
    serializer = POSerializer(po)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


#change aassigned quantity
@csrf_exempt
@api_view(['POST'])
def Submitted_Po_accounts(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    po_id=int(data['id'])
    po = PurchaseOrder.objects.get(id=po_id)
    po.accounts_submital=1
    po.save()
    return Response({"message":"201"})



##will add functions here for getting submitted po and approved

@api_view(['GET'])
def GetSubmitted_Po_accounts(request):
    try:
        po = PurchaseOrder.objects.filter(accounts_submital=1,accounts_approval=0)
        serializer = POSerializer(po,many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    except PurchaseOrder.DoesNotExist:
        po=None
        return Response({"message":"400"})

@api_view(['GET'])
def GetSubmittedApproved_Po_accounts(request):
    try:
        po = PurchaseOrder.objects.filter(accounts_submital=1,accounts_approval=1)
        serializer = POSerializer(po,many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    except PurchaseOrder.DoesNotExist:
        po=None
        return Response({"message":"400"})


@csrf_exempt
@api_view(['POST'])
def Approve_Submitted_Po(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    po_id=int(data['id'])
    po = PurchaseOrder.objects.get(id=po_id)
    po.accounts_approval=1
    po.save()
    return Response({"message":"201"})



#change aassigned quantity
@csrf_exempt
@api_view(['PATCH'])
def UpdatePIMTO(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    remarks=data['remarks']
    quantity=int(data['quantity'])
    item=int(data['item_id'])
    item = PurchaseOrderItems.objects.get(id=item)
    #print(item.quantity)
    serializer = POItemSerializer(item)
    #print(serializer)
    #print(int(item.quantity)+int(quantity))
    item.quantity=quantity
    item.remarks=remarks
    item.balance=quantity
    #item.balance=to_balance
    item.save()
    return JsonResponse(serializer.data, status=202)

    
@csrf_exempt
@api_view(['POST'])
def POIemRecieve(request):
    data=request.data
    projects = PurchaseOrderItems.objects.get(id=data['id'])
    
    projects.balance=int(projects.balance)-int(data['quantity'])
    projects.save()

    item = Stock.objects.get(item=data['item_id'])
    item.quantity=int(item.quantity)+int(data['quantity'])
    serializer = StockQTYSerializer(item)
    item.save()

    return JsonResponse(serializer.data,status=202)

@api_view(['GET'])
def SupplierDeliverNote(request):
    supplierdn = DeliveryNoteFromSupplier.objects.all().order_by('-id')
    serializer = DeliverNoteSupplierDetailSerializer(supplierdn,many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')
    

@csrf_exempt
@api_view(['POST'])
def DNINSupplierItemSave(request):
    #print(request.data)
    serializer = DeliverNoteSupplierItemSerializer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
def Save_PO(request):
    #print(request.data)
    serializer = POPlainSerializer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
def Update_PO(request):
    data=request.data
    id=int(data['po_id'])   
    po = PurchaseOrder.objects.get(id=id)
    serializer = POPlainSerializer(po,data=request.data,partial=True)  
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
def Update_POItem(request):
    data=request.data
    id=int(data['id'])   
    po = PurchaseOrderItems.objects.get(id=id)
    serializer = POItemSaveSerializer(po,data=request.data,partial=True)  
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
def Update_QPOItem(request):
    data=request.data
    id=int(data['id'])   
    po = PurchaseOrderQuotationItems.objects.get(id=id)
    serializer = PurchaseOrderQuotationItems(po,data=request.data,partial=True)  
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view()
@permission_classes([AllowAny])
def OrderedItems(request,pk):
    new_balance=0
    projects = PurchaseOrderItems.objects.filter(po_item=pk)
    serializer = POItemSerializer(projects,many=True)
    
    for balance in serializer.data:
        new_balance=new_balance+int(balance['balance'])
    #return JsonResponse(final_mandatory_data,safe=False)
    return HttpResponse(new_balance, content_type='application/json')


@api_view(['GET'])
def RecieveInvoice(request,pk):
    po = PurchaseOrder.objects.get(id=pk)
    #transaction = transactions.objects.using("test").last()
    #print(transaction.transaction_id)
    try:
        dn=DeliveryNoteFromSupplier.objects.get(DNINPurchaseOrder=pk)
        poItem = PurchaseOrderItems.objects.filter(pono=pk)
        serializer = POItemSerializer(poItem, many=True)
        dnitems=DeliveryNoteFromSupplierItem.objects.filter(DNINFromsupplierNo=dn.id)

        itemserializer=DeliverNoteSupplierItemDetailSerializer(dnitems,many=True)
        
        total_value=0
        price=0
        quantity=0
        discount=0
        for item in serializer.data:
            price=float(item['price'])
            quantity=float(item['quantity'])
            if(item['discount']==''):
                discount=0
            item_value=(price*quantity)-discount
            total_value=item_value+total_value

        if(po.status=='1'):
            po.status=2
            po.save()
            obj=InvoiceFromSupplier(    

                amount=total_value,
                balance=total_value,
                InvoicePO=PurchaseOrder.objects.get(id=po.id),
                due_date=date.today(),
                DNRef=dn.orderno,
                InvoiceRef=dn.orderno,
                InvoiceSupplier=Supplier.objects.get(id=int(dn.DNFromsupplierName.id)),
                InvoiceProject=Project.objects.get(id=po.projectpo.id),

            	)
            obj.save()
            latest_invoice=InvoiceFromSupplier.objects.last()
            print("we will generate")
            print(latest_invoice)
            for item in itemserializer.data:
                
                itemobj=InvoiceItemFromSupplier(
                    InvoiceItemPO=PurchaseOrder.objects.get(id=po.id),
                    InvoiceItemProject=Project.objects.get(id=po.projectpo.id),
                    InvoiceItem=Item.objects.get(id=item['recievedItem']['id']),
                    quantity=item['quantity'],
                    amount=item['orderitemid']['price'],
                    InvoiceFromSupplierNO=latest_invoice
                        )

                itemobj.save()
            return Response({"message":"200"})      
    except DeliveryNoteFromSupplier.DoesNotExist:
        dn=None
        
        return Response({"message":"201"})    
