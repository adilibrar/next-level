from django.shortcuts import render
from store.Serializations.StrippingSerializer import STSaveSerializer,STAllSerializer,STItemSerializer,STItemSerializer,STItemSaveSerializer
from store.Serializations.StockSerializer import StockQTYSerializer
from store.Serializations.ItemSerializations import ItemDetailSerializer
from store.models import PowderCoating,PowderCoatingItems,Item,Stock_issuing,MTO,Project,Stripping,StrippingItems,Stock,ItemType,Unit,Supplier,Finishing,System,Stock_damage,Status
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@csrf_exempt
@api_view(['POST'])
def ST_Save(request):
    if request.method == "POST":
        serializer = STSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def ST_list(request):
    projects = Stripping.objects.all()
    serializer = STAllSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
def ST_ITEM_Save(request):
    if request.method == "POST":
        print(request.data)
        serializer = STItemSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
def STItemlist(request,pk):
    projects = StrippingItems.objects.filter(stno=pk)
    serializer = STItemSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['GET'])
def Singlest(request,pk):
    project = Stripping.objects.get(id=pk)
    serializer = STAllSerializer(project)
    return JsonResponse(serializer.data)



@csrf_exempt
@api_view(['PATCH'])
def update_st_note(request):
    data=request.data
    dn_id=int(data['id'])
    dn = Stripping.objects.get(id=dn_id)
    serializer = STSaveSerializer(dn, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)



#change strippping quantity
@csrf_exempt
@api_view(['POST'])
def Changed_stock_qty(request):
    #item = Stock.objects.get(item=pk)
    data=request.data
    item_id=int(data['id'])
    item_code=data['item_code']
    length=data['length']
    supplier=int(data['supplier'])
    quantity=int(data['quantity'])
    stripping_id=int(data['striping_id'])
    old_qty=int(data['old_qty'])
    #item = Stock.objects.get(itemcode=item_code,length=length,Supplier=supplier,finishing='2')
    #item = Item.objects.get(itemcode=item_code,length=length,Supplier=supplier,finishing='200')
    #print(item.quantity)
    #serializer = ItemDetailSerializer(item)
    #print(serializer)
    #print(int(item.quantity)+int(quantity))
    #item.quantity=int(item.quantity)+int(quantity)
    #item.balance=to_balance
    #item.save()

    try:
        item = Item.objects.get(itemcode=item_code,length=length,Supplier=supplier,finishing='2')    
        #mtod = MTOItem.objects.get(itemname=mto_item_id,revision=revision_version,mto=mto_id,color=colors)
        if(item):
            serializer = ItemDetailSerializer(item)
            #print(serializer.data['id'])
            item_Stock = Stock.objects.get(item=serializer.data['id'])
            #item = Stock.objects.get(item=params['pk'])
            #Stock_serializer = StockQTYSerializer(item_Stock)
            item_Stock.quantity=int(item_Stock.quantity)+int(quantity)
            #print(item_Stock.quantity)
            item_Stock.save()

            Stripitemstatus = StrippingItems.objects.get(id=stripping_id)  
            Stripitemstatus.status=0
            Stripitemstatus.remark='Completed'
            Stripitemstatus.wastage=int(old_qty)-int(quantity)
            Stripitemstatus.save()

            if(int(old_qty)-int(quantity)>0):
                Stock_damage.objects.create(
                Item_Damage=Item.objects.get(id=item_id),
                quantity=int(old_qty)-int(quantity),
                title='Strpping Rejected',
                status=Status.objects.get(id=2),
                )
            return Response({"message":"200"})
    except Item.DoesNotExist:
        #item = None
        single_item = Item.objects.get(id=item_id)
        single_item_serializer=ItemDetailSerializer(single_item)

        #last_item=Item.objects.filter(CorVision=pk).order_by('id')
        last_item=Item.objects.last()
        last_item_serializer=ItemDetailSerializer(last_item)
        #print(last_item_serializer.data['id'])
        #barcode='NLG'+"-"+(last_item_serializer.data['id']+1)
        #print(barcode)
        barserial=last_item_serializer.data['id']+1
        barcode='NLG'+"-"+str(barserial)
        adding_item=Item.objects.create(
						name=single_item_serializer.data['name'],
                        barcode=barcode,
                        itemcode=item_code,
                        description=single_item_serializer.data['description'],
                        length=length,
                        weight=single_item_serializer.data['weight'],
                        Supplier=Supplier.objects.get(id=supplier),
                        finishing=Finishing.objects.get(id=2),
                        type=ItemType.objects.get(id=single_item_serializer.data['type']),
                        unit=Unit.objects.get(id=single_item_serializer.data['unit']),
						)
        if(adding_item):
            last_item_for_stock=Item.objects.last()
            stock_last_item_serializer=ItemDetailSerializer(last_item_for_stock)
            Stock.objects.create(
            item=Item.objects.get(id=stock_last_item_serializer.data['id']),
            quantity=quantity
             )
            Stripitemstatus = StrippingItems.objects.get(id=stripping_id)  
            Stripitemstatus.status=0
            Stripitemstatus.remark='Completed'
            Stripitemstatus.wastage=int(old_qty)-int(quantity)
            Stripitemstatus.save()
            if(int(old_qty)-int(quantity)>0):
                Stock_damage.objects.create(
                Item_Damage=Item.objects.get(id=item_id),
                quantity=int(old_qty)-int(quantity),
                title='Stripping Rejected',
                status=Status.objects.get(id=2),
                )
            return Response({"message":"200"})
        return Response({"message":"400"})


    #return JsonResponse(serializer.data, status=202)
