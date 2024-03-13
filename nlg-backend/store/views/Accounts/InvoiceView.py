from django.shortcuts import render
from datetime import date
from store.models import PurchaseOrder,Certifiedpayments,ProjectBudget,Project,InvoiceFromSupplier,InvoiceItemFromSupplier,transactions,PurchaseOrderItems,ProjectsList,Stock,OrderItemDetail,DeliveryNoteFromSupplier,DeliveryNoteFromSupplierItem,OrderItemQuotation,PurchaseOrderQuotationItems
from store.Serializations.MTOSerializations import MTOSerializer,MTOSaveSerializer,MTOItemSerializer,MTOItemSaveSerializer,MtoColorUpdate
from store.Serializations.StockSerializer import StockQTYSerializer
from store.Serializations.InvoiceSerializer import InvoiceListSerializer,InvoiceItemSerializer,CertifiedPaymentsSerializer,InvoiceFromSupplierSerializer
from store.models import Stock_issuing,Stock
from store.Serializations.PurchaseOrderSerializer import POSerializer,POPlainSerializer,POItemSerializer,DeliverNoteSupplierItemDetailSerializer,POItemSaveSerializer,DeliverNoteSupplierDetailSerializer,DeliverNoteSupplierSerializer,DeliverNoteSupplierItemSerializer,POQuotationSerializer,POQuotationSerializerDetail,POSerializerNoDepth
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
@api_view()
@permission_classes([AllowAny])
def GetAllInvoiceByStatus(request):
    invoice = InvoiceFromSupplier.objects.filter(status='1').order_by('-id')
    serializer = InvoiceListSerializer(invoice, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def GetAllInvoiceByStatusF(request):
    invoice = InvoiceFromSupplier.objects.filter(status='2').order_by('-id')
    serializer = InvoiceListSerializer(invoice, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')
    



@csrf_exempt
@api_view(['POST'])
def AddInvoiceDraft(request):
    data=request.data
    try:
        check_draft=InvoiceFromSupplier.objects.filter(status=2).last()
        print(check_draft)
        #print(check_draft)
        if(check_draft):
            print("I am in draft")
            if(check_draft.InvoiceSupplier.id==request.data['sup']):
                get_invoice=InvoiceFromSupplier.objects.get(id=request.data['inv'])
                get_invoice.status=2
                get_invoice.save()
                print(get_invoice)
                return Response({"message":"200"})  
            else:
                print("Clear Draft")
                return Response({"message":"201"})
        else:
            get_invoice=InvoiceFromSupplier.objects.get(id=request.data['inv'])
            get_invoice.status=2
            get_invoice.save()
            return Response({"message":"200"})  
    except InvoiceFromSupplier.DoesNotExist:
        check_draft=None
        get_invoice=InvoiceFromSupplier.objects.get(id=request.data['inv'])
        get_invoice.status=2
        get_invoice.save()
        return Response({"message":"200"})  



@csrf_exempt
@api_view(['GET'])
def RemoveInvoiceDraft(request,pk):
    get_invoice=InvoiceFromSupplier.objects.get(id=pk)
    get_invoice.status=1
    get_invoice.save()
    #print(get_invoice)
    return Response({"message":"200"}) 
    



@csrf_exempt
@api_view(['GET'])
def ReviewInvoice(request,pk):
    get_invoice=InvoiceFromSupplier.objects.get(id=pk)
    get_invoice.is_review=1
    get_invoice.save()
    #print(get_invoice)
    return Response({"message":"200"}) 
    


@csrf_exempt
@api_view(['GET'])
def SubmitToApprove(request):
    get_invoice=InvoiceFromSupplier.objects.filter(status=2)
    for invoice in get_invoice:
        invoice.status=3
        invoice.save()
        #print(get_invoice)
    return Response({"message":"200"}) 
    




@api_view()
@permission_classes([AllowAny])
def GetInVoiceData(request,pk):
    invoiceitem = InvoiceItemFromSupplier.objects.filter(InvoiceFromSupplierNO=pk)
    serializer = InvoiceItemSerializer(invoiceitem, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')





@api_view()
@permission_classes([AllowAny])
def GetCertifiedPayments(request):
    certified = Certifiedpayments.objects.filter(~Q(ApprovedAmount=''),status=1)
    serializer = CertifiedPaymentsSerializer(certified, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['GET'])
def UpdateCertifiedStatus(request,pk,pk2):
    get_cert=Certifiedpayments.objects.get(id=pk)
    get_cert.status=pk2
    get_cert.save()
        #print(get_invoice)
    return Response({"message":"200"}) 

###########################################################End Of Invoice View ################

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
    print(po.status)
    print(pk)
    transaction = transactions.objects.using("test").last()
    #print(transaction.transaction_id)
    try:
        dn=DeliveryNoteFromSupplier.objects.get(DNINPurchaseOrder=pk)
        #print(po.currency)
        
        poItem = PurchaseOrderItems.objects.filter(pono=pk)
        serializer = POItemSerializer(poItem, many=True)
        dnitems=DeliveryNoteFromSupplierItem.objects.filter(DNINFromsupplierNo=dn.id)

        itemserializer=DeliverNoteSupplierItemDetailSerializer(dnitems,many=True)
        
        print(itemserializer.data)
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
            print("we will generate")
            po.status=2
            print(po.projectpo.id)
            #po.save()
            # adding_item=transactions.objects.create(
            obj=InvoiceFromSupplier(    

                amount=total_value,
                balance=total_value,
                InvoicePO=PurchaseOrder.objects.get(id=po.id),
                due_date=date.today(),
                DNRef=dn.orderno,
                InvoiceRef=dn.orderno,
                #projectnameid=po.projectpo.refrence_no,
                InvoiceProject=Project.objects.get(id=po.projectpo.id),

            	)
            
            for item in itemserializer.data:
                print(item)
                print(item['orderitemid']['price'])

                itemobj=InvoiceItemFromSupplier(
                    InvoiceItemPO=PurchaseOrder.objects.get(id=po.id),
                    InvoiceItemProject=Project.objects.get(id=po.projectpo.id),
                    quantity=item['quantity'],
                    amount=item['orderitemid']['price']

                )

                itemobj.save()
        # InvoiceItemPO = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='InvoiceItemPO', null=True, blank=True,default='1')
        # InvoiceItemProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='InvoiceItemProject',default='1')
        # InvoiceFromSupplierNO = models.ForeignKey(InvoiceFromSupplier, on_delete=models.CASCADE, related_name='InvoiceFromSupplierNO',default='1')
        # amount = models.CharField(max_length=100, null=True, default='0')
        # quantity = models.CharField(max_length=100, null=True, default='0')
        # is_review=models.CharField(max_length=100,null=True, default='0')
        # is_verify=models.CharField(max_length=100,null=True, default='0')
        # creation_date = models.DateField(auto_now_add=True)
        # status=models.CharField(max_length=100,null=True, default='1')
            #obj.save()
    except DeliveryNoteFromSupplier.DoesNotExist:
        #DeliveryNoteFromSupplier=None

        print("Not Found")

        


    # transaction_id = models.SmallIntegerField(db_column='Transaction-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    # transaction_date = models.DateField(db_column='Transaction-Date')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    # transaction_or_invoice = models.CharField(db_column='Transaction_Or_Invoice', max_length=12)  # Field name made lowercase.
    # transactiontype = models.CharField(db_column='TransactionType', max_length=12)  # Field name made lowercase.
    # clientnameid = models.SmallIntegerField(db_column='ClientNameID')  # Field name made lowercase.
    # clienttype = models.CharField(db_column='ClientType', max_length=20)  # Field name made lowercase.
    # banknameid = models.SmallIntegerField(db_column='BankNameID')  # Field name made lowercase.
    # currency = models.CharField(db_column='Currency', max_length=5)  # Field name made lowercase.
    # transactionvalue = models.FloatField(db_column='TransactionValue')  # Field name made lowercase.
    # vat = models.IntegerField(db_column='VAT')  # Field name made lowercase.
    # paymenttypeid = models.SmallIntegerField(db_column='PaymentTypeID')  # Field name made lowercase.
    # paymentreference = models.CharField(db_column='PaymentReference', max_length=45, blank=True, null=True)  # Field name made lowercase.
    # paymentduedate = models.DateField(db_column='PaymentDueDate')  # Field name made lowercase.
    # debitdreditstatusid = models.SmallIntegerField(db_column='DebitDreditStatusID')  # Field name made lowercase.
    # invoicenb = models.CharField(db_column='InvoiceNB', max_length=255, blank=True, null=True)  # Field name made lowercase.
    # projectnameid = models.SmallIntegerField(db_column='ProjectNameID')  # Field name made lowercase.
    # bcategoryid = models.SmallIntegerField(db_column='BcategoryID')  # Field name made lowercase.
    # comment = models.CharField(db_column='Comment', max_length=255, blank=True, null=True)  # Field name made lowercase.
    # transactionstatus = models.CharField(db_column='TransactionStatus', max_length=25)  # Field name made lowercase.
    # transaction_payment = models.CharField(db_column='Transaction_Payment', max_length=12)  # Field name made lowercase.
    # verifying_invoice = models.CharField(db_column='Verifying_Invoice', max_length=12, blank=True, null=True)  # Field name made lowercase.
    # paymentproof = models.CharField(db_column='PaymentProof', max_length=255, blank=True, null=True)  # Field name made lowercase.
    # paymentmilestoneid = models.SmallIntegerField(db_column='PaymentMilestoneID', blank=True, null=True)  # Field name made lowercase.



        # refrence=models.CharField(max_length=100,null=True, default='PO')
        # quotationRefrence=models.CharField(max_length=200,null=True, default='QR')
        # orderno = models.ForeignKey(
        # CartOrder, on_delete=models.CASCADE, related_name='orderno', null=True, blank=True,default='1')
        # currency = models.ForeignKey(
        # Currency, on_delete=models.CASCADE, related_name='currency', null=True, blank=True,default='1')
        # PurchaseSupplier = models.ForeignKey(
        # Supplier, on_delete=models.CASCADE, related_name='PurchaseSupplier',default='1')
        # projectpo = models.ForeignKey(
        # Project, on_delete=models.CASCADE, related_name='Projectpo', null=True, blank=True,default='1')
        # note = models.CharField(max_length=100, null=True, default='NA')
        # priority=models.CharField(max_length=100,null=True, default='1')
        # status=models.CharField(max_length=100,null=True, default='1')
        # status_text=models.CharField(max_length=100,null=True, default='Pending')
        # creation_date = models.DateField(auto_now_add=True)
        # delivery_date = models.DateField(null=True)
        # payment_term=models.CharField(max_length=100,null=True, default='NA')
        # local = models.BooleanField(null=True, blank=False,default=False)
        # glass = models.BooleanField(null=True, blank=False,default=False)
        # PerformaInvoice=models.BooleanField(null=True, blank=False,default=False)
        # accounts_submital=models.CharField(max_length=100,null=True, default='0')
        # accounts_approval=models.CharField(max_length=100,null=True, default='0')
        # pi_approval=models.CharField(max_length=100,null=True, default='0')
        # serviceQuotation=models.BooleanField(null=True, blank=False,default=False)
        # def __str__(self):
        #     return self.refrence
        

    return Response({"message":"200"})    
