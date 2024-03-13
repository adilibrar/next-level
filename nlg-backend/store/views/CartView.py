from django.shortcuts import render
from store.models import Shopping_Cart
from store.Serializations.CartSerializations import CartSaveSerializer,CartSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@csrf_exempt
@api_view(['POST'])
def AdddToCart(request):
    if request.method == "POST":
        serializer = CartSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
def CartList(request):
    projects = Shopping_Cart.objects.filter(status=1).order_by('-id')
    serializer = CartSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['DELETE'])
def DeleteCartItem(self,pk):
    event = Shopping_Cart.objects.get(id=pk)
    event.delete()
    #return Response(status=status.HTTP_204_NO_CONTENT
    return Response({"message":"200"})

