from django.shortcuts import render
from store.models import Item,MTO,Project,MTOItem,ReleasedWindow,ReleasedWindowProfile,ReleasedWindowACC,ReleasedWindowInterLockACC,ReleasedWindowGasket,ReleasedWindowScrew,ReleasedWindowPacking,ReleasedWindowGlass,ReleasedWindowInterLock,Floor,Lock,Elevation,StockList,StockListItem,CorVisionProfile,CORVISION,CorVisionInterLockAcc,CorVisionDIM,CorVisionShutter,CorVisionGlass,CorVisionAcc,CorVisionGasket,CorScrew,CorPacking,CorVisionInterLock
from store.Serializations.CorVisionSerializer import CorVisionProfileSerializer,CorVisionInterLockSaveAccSerializer,CorVisionPackingSaveSerializer,CorVisionGlassSaveSerializer,CorVisionGasketSaveSerializer,CorVisionScrewSaveSerializer,CorVisionProfileSaveSerializer,CorVisionInterLockSaveSerializer,CorVisionAccSaveSerializer,ReleaseWindowACCSerializer,ReleaseWindowSerializerDepth,ReleaseWindowPackingSerializer,ReleaseWindowGlassSerializer,ReleaseWindowGasketSerializer,ReleaseWindowScrewSerializer,ReleaseWindowInterlockACCSerializer,ReleaseWindowsaveSerializer,ReleaseWindowInterLockSerializer,ReleaseWindowProfileSerializer,ReleaseWindowSerializer,FloorSerializer,LockSerializer,ElevationSerializer,CorVisionInterLockAccSerializer,CorVisionInterLockSerializer,CorVisionProfileShortSerializer,CorVisionPackingSerializer,CorVisionScrewSerializer,CorVisionSerializer,CorVisionDIMSerializer,CorVisionShutterSerializer,CorVisionGlassSerializer,CorVisionAccSerializer,CorVisionGasketSerializer
from store.models import Stock_issuing,Stock
from store.Serializations.StockIssuingSerializations import StockIssuingProjectSerializer
from rest_framework.renderers import JSONRenderer
from django.http import QueryDict
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from itertools import chain

@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVision(request):
    if request.method == "POST":
        serializer = CorVisionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVisionProfile(request):
    if request.method == "POST":
        serializer = CorVisionProfileSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    



@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVisionAcc(request):
    if request.method == "POST":
        serializer = CorVisionAccSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    



@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVisionGasket(request):
    if request.method == "POST":
        serializer = CorVisionGasketSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVisionScrew(request):
    if request.method == "POST":
        serializer = CorVisionScrewSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVisionPacking(request):
    if request.method == "POST":
        serializer = CorVisionPackingSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    

    
@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVisionGlass(request):
    if request.method == "POST":
        serializer = CorVisionGlassSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    

    
@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVisionInterLockProfile(request):
    if request.method == "POST":
        serializer = CorVisionInterLockSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
    
@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveCorVisionInterLockAcc(request):
    if request.method == "POST":
        serializer = CorVisionInterLockSaveAccSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    




@csrf_exempt
@api_view(['DELETE'])
def DeleteCorProfile(self,pk):
    event = CorVisionProfile.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})

@csrf_exempt
@api_view(['DELETE'])
def DeleteCorInterProfile(self,pk):
    event = CorVisionInterLock.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})


@csrf_exempt
@api_view(['DELETE'])
def DeleteCorInterAcc(self,pk):
    event = CorVisionInterLockAcc.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})



@csrf_exempt
@api_view(['DELETE'])
def DeleteCorAcc(self,pk):
    event = CorVisionAcc.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})


@csrf_exempt
@api_view(['DELETE'])
def DeleteCorGasket(self,pk):
    event = CorVisionGasket.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})



@csrf_exempt
@api_view(['DELETE'])
def DeleteCorScrew(self,pk):
    event = CorScrew.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})



@csrf_exempt
@api_view(['DELETE'])
def DeleteCorPacking(self,pk):
    event = CorPacking.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})


@csrf_exempt
@api_view(['DELETE'])
def DeleteCorGlass(self,pk):
    event = CorVisionGlass.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetCorWindowProfileData(request,pk):
    if request.method == "GET":
        projects = CorVisionProfile.objects.filter(CorVision=pk)
        serializer = CorVisionProfileSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetCorWindowInterlockProfileData(request,pk):
    if request.method == "GET":
        projects = CorVisionInterLock.objects.filter(CorVision=pk)
        serializer = CorVisionInterLockSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetCorWindowAccData(request,pk):
    if request.method == "GET":
        projects = CorVisionAcc.objects.filter(CorVision=pk)
        serializer = CorVisionAccSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetCorWindowGasketData(request,pk):
    if request.method == "GET":
        projects = CorVisionGasket.objects.filter(CorVision=pk)
        serializer = CorVisionGasketSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetCorWindowScrewData(request,pk):
    if request.method == "GET":
        projects = CorScrew.objects.filter(CorVision=pk)
        serializer = CorVisionScrewSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetCorWindowPackingData(request,pk):
    if request.method == "GET":
        projects = CorPacking.objects.filter(CorVision=pk)
        serializer = CorVisionPackingSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetCorWindowGlassData(request,pk):
    if request.method == "GET":
        projects = CorVisionGlass.objects.filter(CorVision=pk)
        serializer = CorVisionGlassSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetCorWindowIAData(request,pk):
    if request.method == "GET":
        projects = CorVisionInterLockAcc.objects.filter(CorVision=pk)
        serializer = CorVisionInterLockAccSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetStockList(request,pk):
    if request.method == "GET":
        projects = StockList.objects.filter(ProjectStockList=pk)
        serializer = CorVisionPackingSerializer(projects, many=True)
        
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


