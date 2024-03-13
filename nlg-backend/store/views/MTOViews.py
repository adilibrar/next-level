from django.shortcuts import render
from store.models import Item,MTO,Project,MTOItem
from store.Serializations.MTOSerializations import MTOSerializer,MTOSaveSerializer,MTOItemSerializer,MTOItemSaveSerializer,MtoColorUpdate,IssuingColorUpdate
from store.Serializations.ProjectSerializations import ProjectSerializer
from store.models import Stock_issuing,Stock
from store.Serializations.StockIssuingSerializations import StockIssuingProjectSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view()
@permission_classes([AllowAny])
def Mtolist(request):
    projects = MTO.objects.all().order_by('-id')
    serializer = MTOSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def MtolistBYProject(request,pk):
    projects = MTO.objects.filter(projectmto=pk).order_by('-submitted_at','-id')
    serializer = MTOSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def MtolistSubmitted(request):
    projects = MTO.objects.filter(submital=1).order_by('-submitted_at','-id')
    serializer = MTOSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def Singlemto(request,pk):
    project = MTO.objects.get(id=pk)
    serializer = MTOSerializer(project)
    return JsonResponse(serializer.data)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def MTO_Save(request):
    if request.method == "POST":
        serializer = MTOSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view()
@permission_classes([AllowAny])
def MtoItemlist(request,pk):
    projects = MTOItem.objects.filter(mto=pk)
    serializer = MTOItemSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def MTOItem_Save(request):
    if request.method == "POST":
        serializer = MTOItemSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



#def DeleteMTOItem(self,request,*args,**kwargs):
@csrf_exempt
@api_view(['DELETE'])
def DeleteMTOItem(self,pk):
    event = MTOItem.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})


@csrf_exempt
@api_view(['PATCH'])
def update_mto(request):
    data=request.data
    mto_id=int(data['mto'])
    mto = MTO.objects.get(id=mto_id)
    serializer = MTOSerializer(mto, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@api_view(['PATCH'])
def update_mto_item(request):
    data=request.data
    mto_item_id=int(data['id'])
    mto = MTOItem.objects.get(id=mto_item_id)
    serializer = MTOItemSaveSerializer(mto, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def MTOItem_Copy(request,pk,pko):
    if request.method == "GET":
        projects = MTOItem.objects.filter(mto=pko)
        serializer = MTOItemSerializer(projects, many=True)
        serialize_data=serializer.data
        #json_data=JsonResponse(serializer.data,safe=False)
            #print(json_data)
        for data in serialize_data:
            MTOItem.objects.create(
                quantity=data['quantity'],
                revision=(int(data['revision'])+1),
                color=data['color'],
                status=data['status'],
                mto=MTO.objects.get(id=pk),
                itemname=Item.objects.get(id=data['itemname']['id']),
                extra_quantity=data['extra_quantity']
            )
    return Response({"message":"200"})


@csrf_exempt
@api_view(['POST'])
def check_mto_item(request):
    data=request.data
    mto_item_id=data['itemname']
    revision_version=int(data['revision'])
    mto_id=int(data['mto'])
    colors=data['color']
    remark=data['remarks']
    #print(colors)
    try:
        mtod = MTOItem.objects.get(itemname=mto_item_id,revision=revision_version,mto=mto_id,color=colors,remarks=remark)
        if(mtod):
            return Response({"message":"200"})
    except MTOItem.DoesNotExist:
        mtod = None
        return Response({"message":"400"})




@csrf_exempt
@api_view(['PATCH'])
def mto_item_color(request):
    data=request.data
    old_color=data['old_color']
    new_color=data['new_color']
    mto_id=int(data['mto'])
    try:
        mtoc = MTOItem.objects.filter(mto=mto_id,color=old_color)
        serializer = MtoColorUpdate(mtoc, many=True)
        for object in mtoc:
            object.color=new_color
            object.save()                 
        mtos = Stock_issuing.objects.filter(issuingmto=mto_id,color=old_color)
        serializer = IssuingColorUpdate(mtos, many=True)
        for object in mtos:
            object.color=new_color
            object.save()
        return JsonResponse(serializer.data, status=201,safe=False)
    except MTOItem.DoesNotExist:
        mtoc = None
        return Response({"message":"400"})


@api_view()
@permission_classes([AllowAny])
def ProjectMtoItemlist(request,pk):
    # projects = MTOItem.objects.filter(mto=pk)
    # serializer = MTOItemSerializer(projects, many=True)
    # json_data = JSONRenderer().render(serializer.data)
    # return HttpResponse(json_data, content_type='application/json')
    alldata=[]
    mtos = MTO.objects.filter(projectmto=pk).order_by('-id')
    serializer = MTOSerializer(mtos, many=True)
    for object in mtos:
        
        projects = MTOItem.objects.filter(mto=object.id,assigned=1)
        serializer = MTOItemSerializer(projects, many=True)
        #print(serializer.data)
        alldata=alldata + serializer.data
    json_data = JSONRenderer().render(alldata)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def ProjectMtoItemlistAll(request,pk):
    # projects = MTOItem.objects.filter(mto=pk)
    # serializer = MTOItemSerializer(projects, many=True)
    # json_data = JSONRenderer().render(serializer.data)
    # return HttpResponse(json_data, content_type='application/json')
    alldata=[]
    mtos = MTO.objects.filter(projectmto=pk,submital=1).order_by('-id')
    serializer = MTOSerializer(mtos, many=True)
    for object in mtos:
        
        projects = MTOItem.objects.filter(mto=object.id)
        serializer = MTOItemSerializer(projects, many=True)
        #print(serializer.data)
        alldata=alldata + serializer.data
    json_data = JSONRenderer().render(alldata)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view()
@permission_classes([AllowAny])
def UpdateMTOItemQTY(request,pk,pk2):
    #id=params['pk']

    if request.method == "GET":
        # data=request.data
        # item=Stock_issuing.objects.get(id=int(data['id']))
        # balance=int(data['balance'])
        # returned=int(data['returned'])
        # new_balance=int(balance)+int(returned)
        # new_returned=returned
        # item.balance=new_balance
        # item.returned=new_returned
        #print("all ok")
        #item.save()
        items = MTOItem.objects.get(id=pk)
        items.quantity=pk2
        items.save()
        #serializer = MTOItemSerializer(items)
    #return HttpResponse("Done",content_type='application/json')
    return Response({"message":"200"})

@csrf_exempt
@api_view()
@permission_classes([AllowAny])
def UpdateMTOItemColor(request,pk,pk2):
    #id=params['pk']
    if request.method == "GET":
        # data=request.data
        # item=Stock_issuing.objects.get(id=int(data['id']))
        # balance=int(data['balance'])
        # returned=int(data['returned'])
        # new_balance=int(balance)+int(returned)
        # new_returned=returned
        # item.balance=new_balance
        # item.returned=new_returned
        #print("all ok")
        #item.save()
        items = MTOItem.objects.get(id=pk)
        items.color=pk2
        items.save()
        serializer = MTOItemSerializer(items)
    #return HttpResponse("Done",content_type='application/json')
    return Response({"message":"200"})