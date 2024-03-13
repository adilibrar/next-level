import json
from django.shortcuts import render
from store.models import Currency
from store.Serializations.MiscSerialization import CurrencySerializer
from store.Serializations.StockIssuingSerializations import StockIssuingSerializer
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
import json

# Create your views here.

@api_view()
@permission_classes([AllowAny])
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))

def get_all_currency(request):
    stock = Currency.objects.all()
    serializer = CurrencySerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')