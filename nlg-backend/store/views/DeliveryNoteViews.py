from django.shortcuts import render
from store.Serializations.DNSerialization import DNSerializer,DNSaveSerializer,DNItemSaveSerializer,DNItemSerializerLimit
from store.models import PowderCoating,PowderCoatingItems,Item,Stock_issuing,MTO,Project
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



@api_view()
@permission_classes([AllowAny])
def DN_list(request):
    projects = PowderCoating.objects.all().order_by('-id')
    serializer = DNSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def MtolistSubmitted(request):
    projects = MTO.objects.filter(submital=1)
    serializer = DNSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def DN_list_limit(request):
    projects = PowderCoating.objects.all().order_by('-id')[:20]
    serializer = DNSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def DN_Save(request):
    if request.method == "POST":
        serializer = DNSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
def DN_ITEM_Save(request):
    if request.method == "POST":
        serializer = DNItemSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
def DNItemlist(request,pk):
    projects = PowderCoatingItems.objects.filter(dno=pk)
    serializer = DNItemSerializerLimit(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def Singledn(request,pk):
    project = PowderCoating.objects.get(id=pk)
    serializer = DNSerializer(project)
    return JsonResponse(serializer.data)


@csrf_exempt
@api_view(['PATCH'])
def update_dn_note(request):
    data=request.data
    dn_id=int(data['id'])
    dn = PowderCoating.objects.get(id=dn_id)
    serializer = DNSerializer(dn, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@api_view(['PATCH'])
def update_dn_copy(request):
    data=request.data
    dn_id=int(data['id'])
    dn = PowderCoating.objects.get(id=dn_id)
    serializer = DNSerializer(dn, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def DNItem_Copy(request,pk,pko):
    if request.method == "GET":
        projects = PowderCoatingItems.objects.filter(dno=pko)
        serializer = DNItemSaveSerializer(projects, many=True)
        serialize_data=serializer.data
        #json_data=JsonResponse(serializer.data,safe=False)
            #print(json_data)
        for data in serialize_data:
            PowderCoatingItems.objects.create(
                quantity=data['quantity'],
                revision=(int(data['revision'])+1),
                color=data['color'],
                status=data['status'],
                assigned=data['assigned'],
                dnitem=Item.objects.get(id=data['dnitem']),
                dno=PowderCoating.objects.get(id=pk),
                Issued_item_PC=Stock_issuing.objects.get(id=data['Issued_item_PC']),
                pcissuedmto=MTO.objects.get(id=data['pcissuedmto']),
                projectPC=Project.objects.get(id=data['projectPC']),
                remark=data['remark']
            )
    return Response({"message":"200"})

@csrf_exempt
@api_view(['DELETE'])
def DeleteDNItem(self,pk):
    event = PowderCoatingItems.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})


@csrf_exempt
@api_view(['DELETE'])
def DeleteCustomDNItem(self,pk,pk2):
    event = PowderCoatingItems.objects.get(id=pk)
    issue=Stock_issuing.objects.get(id=pk2)
    #print(serialize_data)
    event.delete()
    issue.delete()
    return Response({"message":"200"})