import json
from django.shortcuts import render
from store.models import Stock,Stock_issuing,Status,transactions,Profile,Supplier,Item,ProjectsList,Vodetails,Attachments,Collection,Invoicing,Certifiedpayment,Eventslogging
from store.models import Stock_damage,ItemType,Unit,System,Finishing,Unit,AccountsHead,projectsoverview,Certifiedpayment,Eventslogging,Projectpayments
from store.Serializations.StockDamageSerialization import StockDamageSerializer,StockDamageSaveSerializer
from store.Serializations.MiscSerialization import GetProfileSerializer,UnitSerializer,FinishingSerializer,AccountsSerializer
from store.Serializations.StockSerializer import StockSerializer,StockAvalibilitySerializer
from store.Serializations.StockIssuingSerializations import StockIssuingSerializer,StockIssuingSaveSerializer,StockIssuingSerializerRevoke,StockIssuingRevokeSerializer
from store.Serializations.ItemSerializations import ItemSerializerImport
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
from django.db.models import F
import json
from rest_framework.permissions import IsAuthenticated
from store.resources import SupplierRescource
from store.resources import ItemRescource
from tablib import Dataset
# Create your views here.

#@api_view()
@permission_classes([AllowAny])
#@renderer_classes((TemplateHTMLRenderer, JSONRenderer))

@csrf_exempt
@api_view(['POST'])
def stock_avalibility(request,pk):
    item = Stock.objects.get(id=pk)
    data=request.data
    r_quantity=int(data['quantity'])
    serializer = StockAvalibilitySerializer(item)
    a_quantity=int(serializer['quantity'].value)
    payload=data['payload']
    if payload == 'sub':
        if r_quantity<=a_quantity:
            new_qty=a_quantity - r_quantity
            item.quantity=new_qty
            #item.stockvalue=new_qty
            item.save()
            #json_data = JSONRenderer().render(serializer.data)
            #return HttpResponse(json_data, content_type='application/json')
            return Response({"message":"200"})
        else:
            return Response({"message":"401"})
   
    elif payload == 'add':

        return Response({"message":"202"})




#getting data using item id
@csrf_exempt
@api_view(['POST'])
def stock_avalibility_BY_Item(request,pk):
    item = Stock.objects.get(item=pk)
    data=request.data
    r_quantity=int(data['quantity'])
    serializer = StockAvalibilitySerializer(item)
    a_quantity=int(serializer['quantity'].value)
    payload=data['payload']
    if payload == 'sub':
        if r_quantity<=a_quantity:
            new_qty=a_quantity - r_quantity
            item.quantity=new_qty
            #item.stockvalue=new_qty
            item.save()
            #json_data = JSONRenderer().render(serializer.data)
            #return HttpResponse(json_data, content_type='application/json')
            return Response({"message":"200"})
        else:
            new_qty=a_quantity - a_quantity
            item.quantity=new_qty
            #item.stockvalue=new_qty
            item.save()
            return Response({"message":"200"})
   
    elif payload == 'add':

        return Response({"message":"202"})




@csrf_exempt
@api_view(['POST'])
def adding_damage(request):

    serializer = StockDamageSaveSerializer(data=request.data)
    #serializer.data)
    #serializer = StockSerializer(data)
    #if serializer.is_valid():   
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)



#change aassigned quantity
@csrf_exempt
@api_view(['POST'])
def Changed_assigned_qty(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    item_id=int(data['issued_item'])
    project_id=int(data['project'])
    quantity_old=int(data['old_quantity'])
    quantity_new=int(data['quantity'])
    balance=int(data['balance'])
    to_assign=quantity_old-quantity_new
    to_balance=balance-quantity_new
    #print(to_assign)
    item = Stock_issuing.objects.get(Issued_item=item_id,project=project_id,quantity=quantity_old)
    serializer = StockIssuingSaveSerializer(item)
    #print(serializer)
    item.quantity=to_assign
    item.balance=to_balance
    item.save()
    return JsonResponse(serializer.data, status=202)

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def ProfileData(request, pk):
    user = Profile.objects.get(id=pk)
    serializer = GetProfileSerializer(user)
    return JsonResponse(serializer.data)




@csrf_exempt
@api_view(['POST'])
def supplier_upload(request):
    if request.method =='POST':
        person_rescource = SupplierRescource()
        dataset = Dataset()
        new_person=request.FILES['file']
        #new_person=request.FILES.get('myfile', False)

        if not new_person.name.endswith('xlsx'):
            
            messages.info(request,'Wrong Format')
            return Response({"message":"500"})

        imported_data=dataset.load(new_person.read(),format='xlsx')
        for data in imported_data:
            title=data[0]
            Supplier.objects.create(
                name=title,
                )

                    
    return Response({"message":"200"})






@csrf_exempt
@api_view(['POST'])
def stock_upload(request):
    if request.method =='POST':
        person_rescource = ItemRescource()
        dataset = Dataset()
        new_person=request.FILES['file']
        #new_person=request.FILES.get('myfile', False)

        if not new_person.name.endswith('xlsx'):
            
            messages.info(request,'Wrong Format')
            return Response({"message":"500"})

        imported_data=dataset.load(new_person.read(),format='xlsx')
        bar=7101
        for data in imported_data:
            item_name=data[4]
            #print(item_name)
            item_code=data[3]
            item_type=data[1]
            barcodenlg="NLG-"+str(bar)
            #supplier for System
            #item_supplier=(int(data[2])+(1))

            #supplier for local
            item_supplier=1
            if data[5] is None:
                item_finsihing=1
            else:
                item_finsihing=data[5]
            item_length=data[6]
            if data[6] is None:
                item_length='NA'
            else:
                item_length=data[6]
            item_unit=data[7]
            item_stock=data[10]
            weight=data[11]
            width=data[12]
            bar=bar+1
            Item.objects.create(     
                name=item_name,
                type=ItemType.objects.get(id=item_type),
                barcode=barcodenlg,
                unit=Unit.objects.get(id=item_unit),
                system=System.objects.get(id=1),
                Supplier=Supplier.objects.get(id=item_supplier),
                finishing=Finishing.objects.get(id=item_finsihing),
                description=item_name,
                length=item_length,
                itemcode=item_code,
                weight=weight,
                width=width
             )
            item = Item.objects.last()
            serializer = ItemSerializerImport(item)
            item_id=int(serializer['id'].value)

            Stock.objects.create(
                item=Item.objects.get(id=item_id),
                quantity=item_stock
             )

                    
    return Response({"message":"200"})

@api_view(['GET'])
def UnitOfMeasure(request):
    units = Unit.objects.all()
    serializer = UnitSerializer(units, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


#change aassigned quantity
@csrf_exempt
@api_view(['POST'])
def Changed_assigned_qty_issued(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    issue_id=int(data['issue_id'])
    #project_id=int(data['project'])
    issued_quantity=int(data['reserved_qty'])
    balance_quantity=int(data['balance_qty'])
    assign_qty=int(data['assign'])
    to_assign=issued_quantity-assign_qty
    to_balance=balance_quantity-assign_qty
    #print(to_assign)
    item = Stock_issuing.objects.get(id=issue_id)
    serializer = StockIssuingSaveSerializer(item)
    #print(serializer)
    item.quantity=to_assign
    item.balance=to_balance
    item.save()
    return JsonResponse(serializer.data, status=202)


@api_view(['GET'])
def GetFinishing(request):
    finishing = Finishing.objects.all()
    serializer = FinishingSerializer(finishing, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


def StockReservedItem(request):
    projects = Stock_issuing.objects.filter(balance__gt=0,balance__lt=F('quantity'))
    serializer = StockIssuingSerializerRevoke(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def UpdateRevokeStock(request):
    data=request.data
    issue_id=int(data['issue_id'])
    quantity=int(data['balance'])  
    item_id=int(data['item_id'])
    
    item = Stock_issuing.objects.get(id=issue_id)
    serializer = StockIssuingSaveSerializer(item)

    stock=Stock.objects.get(item=item_id)
    Stock_serializer=StockSerializer(stock)
    
    stock.quantity=int(Stock_serializer.data['quantity'])+quantity
    item.balance=int(serializer.data['balance'])-quantity
    item.revoke=int(serializer.data['revoke'])+quantity
    if serializer.data['status']=='Completed' or serializer.data['status']=='Cancelled':
        item.Revremarks='0'
    else:
        item.Revremarks='1'
   
    #item.save()
    #stock.save()
    return JsonResponse(serializer.data, status=201)



@api_view(['GET'])
def GetAccountsHead(request):
    accounts = AccountsHead.objects.all()
    serializer = AccountsSerializer(accounts, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')





@csrf_exempt
@api_view(['POST'])
def Account_upload(request):
    if request.method =='POST':
        person_rescource = ItemRescource()
        dataset = Dataset()
        new_person=request.FILES['file']
        #new_person=request.FILES.get('myfile', False)

        if not new_person.name.endswith('xlsx'):
            
            messages.info(request,'Wrong Format')
            return Response({"message":"500"})

        imported_data=dataset.load(new_person.read(),format='xlsx')
        bar=4001
        for data in imported_data:
            code=data[1]
            title=data[2]
            AccountsHead.objects.create(     
                code=code,
                title=title
             )

                    
    return Response({"message":"200"})





#getting data using item id
@csrf_exempt
@api_view(['POST'])
def UpdateStock_For_Issuing(request):
    
    data=request.data
    item = Stock.objects.get(item=data['item_id'])
    r_quantity=int(data['total'])
    serializer = StockAvalibilitySerializer(item)
    a_quantity=int(serializer['quantity'].value)
    #r_quantity=1
    
    if r_quantity<=a_quantity:
            new_qty=a_quantity-r_quantity
            item.quantity=new_qty
            item.save()

            item = Stock_issuing.objects.get(id=data['issue_id'])
            serializer = StockIssuingSaveSerializer(item)
            item.balance=item.balance + r_quantity
            item.quantity=item.quantity+r_quantity
            item.total=int(item.total)-r_quantity
            item.save()
            return JsonResponse(serializer.data, status=201)
    
    else:
        return Response({"message":"500"})
    


def StockRevokedDetail(request):
    projects = Stock_issuing.objects.filter(revoke__gt=0,restore__lt=1,Revremarks=1)
    serializer = StockIssuingRevokeSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



def StockRevokedDetailProject(request,pk):
    projects = Stock_issuing.objects.filter(revoke__gt=0,restore__lt=1,project=pk)
    serializer = StockIssuingRevokeSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


def StockReservedForMTO(request,pk):
    projects = Stock_issuing.objects.filter(issuingmto=pk)
    serializer = StockIssuingRevokeSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def RestoreRevoked(request):
    
    data=request.data
    #print(data)
    item = Stock.objects.get(item=data['item_id'])
    r_quantity=int(data['restore'])
    serializer = StockAvalibilitySerializer(item)
    
    a_quantity=int(serializer['quantity'].value)
    # #r_quantity=1
    if r_quantity<=a_quantity:
        new_qty=a_quantity-r_quantity
        
        item.quantity=new_qty
    #   item.stockvalue=new_qty
        item.save()

        item = Stock_issuing.objects.get(id=data['issue_id'])
        serializer = StockIssuingSaveSerializer(item)
    #         #item.quantity=to_assign
        item.balance=item.balance + r_quantity
        item.revoke=item.revoke - r_quantity
        item.restore=r_quantity
    #         item.quantity=item.quantity+r_quantity
    #         item.total=0
        item.save()
    #return JsonResponse(serializer.data, status=201)
        return JsonResponse(data,status=201)
    else:
        return Response({"message":"500"})
 


@api_view()
@permission_classes([AllowAny])
def ReservedAllItems(request,pk):
    new_balance=0
    item = Stock_issuing.objects.filter(Issued_item=pk)
    serializer = StockIssuingSaveSerializer(item,many=True)
    
    for balance in serializer.data:
        
        new_balance=new_balance+int(balance['balance'])
    #return JsonResponse(final_mandatory_data,safe=False)
    return HttpResponse(new_balance, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def UpdatePID(request,pk,pk2):
    
    data=request.data
    print(request.data['code'])
    code=request.data['code']
    id=request.data['id']
    proj=projectsoverview.objects.filter(projectid=request.data['code']).using("account").first()
    proj.mainid=int(id)
    # try:
    #     attach = Attachments.objects.filter(project_id=code).using("account")
    #     if(attach):
    #         attach.mainid=request.data['id']
    #         attach.save()
    # except Attachments.DoesNotExist:
    #     attach=None

    try:
        attach = Attachments.objects.filter(project_id=code).using("account")
        if(attach):
            for att in attach:
                att.mainid=int(id)
                att.save()
    except Attachments.DoesNotExist:
        attach=None

    try:
        collect = Collection.objects.filter(projectid=code).using("account")
        if(collect):
            for col in collect:
                col.mainid=int(id)
                col.save()
    except Collection.DoesNotExist:
        collect=None


    try:
        invoice = Invoicing.objects.filter(projectid=code).using("account")
        if(invoice):
            for inv in invoice:
                inv.mainid=int(id)
                inv.save()
    except Invoicing.DoesNotExist:
        invoice=None

    try:
        certified = Certifiedpayment.objects.filter(projectid=code).using("account")
        if(certified):
            for cer in certified:
                cer.mainid=int(id)
                cer.save()
    except Certifiedpayment.DoesNotExist:
        certified=None

    try:
        event = Eventslogging.objects.filter(projectid=code).using("account")
        if(event):
            for eve in event:
                eve.mainid=int(id)
                eve.save()
    except Eventslogging.DoesNotExist:
        event=None

    try:
        payment = Projectpayments.objects.filter(projectid=code).using("projects")
        if(payment):
            for pay in payment:
                pay.mainid=int(id)
                pay.save()
    except Projectpayments.DoesNotExist:
        payment=None

    try:
        variation = Vodetails.objects.filter(projectid=code).using("account")
        if(variation):
            for var in variation:
                var.mainid=int(id)
                var.save()
    except Vodetails.DoesNotExist:
        variation=None

    # try:
    #     transaction = transactions.objects.filter(projectnameid=code).using("projects")
    #     if(transaction):
    #         for tran in transaction:
    #             tran.mainid=int(id)
    #             tran.save()
    # except transactions.DoesNotExist:
    #     transaction=None

    # collect = Collection.objects.filter(projectid=code).using("account").first()
    # collect.mainid=int(id)

    # invoice = Invoicing.objects.filter(projectid=code).using("account").first()
    # invoice.mainid=int(id)

    # certified = Certifiedpayment.objects.filter(projectid=code).using("account").first()
    # certified.mainid=int(id)

    # event = Eventslogging.objects.filter(projectid=code).using("account").first()
    # event.mainid=int(id)

    # payment = Projectpayments.objects.filter(projectid=code).using("account").first()
    # payment.mainid=int(id)

    list = ProjectsList.objects.filter(project_id=code).using("projects").first()
    list.mainid=int(id)

    # variation = Vodetails.objects.filter(projectid=code).using("account").first()
    # variation.mainid=int(id)




    proj.save()
    
    # collect.save(using="account")
    # invoice.save(using="account")
    # certified.save(using="account")
    # event.save(using="account")
    # payment.save(using="account")
    list.save()
    # variation.save(using="account")
    return Response({"message":"200"})
 