from django.shortcuts import render
from store.models import ProductionIssuing,Stock_issuing
from store.Serializations.ProductionSerializations import ProductionIssuingSaveSerializer,ProductionIssuingSerializer
from store.Serializations.ProjectSerializations import ProjectSerializer
from store.Serializations.StockIssuingSerializations import StockIssuingSaveSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@permission_classes([AllowAny])
@csrf_exempt
@api_view(['POST'])
def ProductionIssuing_Save(request):
    if request.method == "POST":
        serializer = ProductionIssuingSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['PATCH'])
def update_issue_balance(request):
    data=request.data
    issue_item_id=int(data['id'])
    issue = Stock_issuing.objects.get(id=issue_item_id)
    serializer = StockIssuingSaveSerializer(issue, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@api_view(['POST'])
def PRItemByDate(request):
    data=request.data
    project = ProductionIssuing.objects.filter(created_at=data['date'])
    serializer = ProductionIssuingSerializer(project,many=True)
    return JsonResponse(serializer.data,safe=False)



#need to move to issuing Stock Later
@csrf_exempt
@api_view(['PATCH'])
def ReturnIssueStock(request):
    #id=params['pk']
    
    if request.method == "PATCH":
        data=request.data
        item=Stock_issuing.objects.get(id=int(data['id']))
        balance=int(data['balance'])
        returned=int(data['returned'])
        new_balance=int(balance)+int(returned)
        new_returned=returned
        item.balance=new_balance
        item.returned=new_returned
        #print("all ok")
        item.save()
    #return HttpResponse("Done",content_type='application/json')
    return Response({"message":"200"})



