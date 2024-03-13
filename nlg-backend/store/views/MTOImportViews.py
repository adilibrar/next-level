import json
from django.shortcuts import render
from store.resources import MTORescource

from store.models import MTOImport,Item,MTOItem,MTO,Finishing
from django.contrib import messages
from tablib import Dataset
from store.Serializations.StockDamageSerialization import StockDamageSerializer,StockDamageSaveSerializer
from store.Serializations.ItemSerializations import ItemSerializerImport
from store.Serializations.MiscSerialization import FinishingSerializer
from store.Serializations.StockSerializer import StockSerializer,StockAvalibilitySerializer
from store.Serializations.DeapartmentSerializations import DepartmentSerializer
from store.Serializations.StockIssuingSerializations import StockIssuingSerializer,StockIssuingSaveSerializer
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

@csrf_exempt
@api_view(['POST'])
def simple_upload(request,pk):
	if request.method =='POST':
		person_rescource = MTORescource()
		dataset = Dataset()
		new_person=request.FILES['file']
		#new_person=request.FILES.get('myfile', False)

		if not new_person.name.endswith('xlsx'):
			
			messages.info(request,'Wrong Format')
			return Response({"message":"500"})

		imported_data=dataset.load(new_person.read(),format='xlsx')
		#print(imported_data)
		testinglimit=1
		for data in imported_data:
			#print(data)
			if data[7] is None:
				try:
					#print("test")
					try:
						finishingdata=Finishing.objects.get(name=data[5])
					except:
						finishingdata:None
						print(data[2])
						MTOItem.objects.filter(mto=pk).delete()
						return Response(data[2], content_type='application/json',status=203)
					fserializer=FinishingSerializer(finishingdata)
					finishing_id=fserializer.data['id']
					project = Item.objects.get(itemcode=data[2],finishing=int(finishing_id))
					#print(project)
					serializer = ItemSerializerImport(project)
					quantity=data[8]
					equantity=data[9]
					color=data[10]
					item_id=serializer.data['id']
					mto_id=pk
					revision=1
					remark=data[11]
					status=1
					MTOItem.objects.create(
						mto=MTO.objects.get(id=pk),
						itemname=project,
						quantity=quantity,
						extra_quantity=equantity,
						revision=revision,
						color=color,
						remarks=remark
						)
				except Item.DoesNotExist:
					project=None
					MTOItem.objects.filter(mto=pk).delete()
					return Response(data[2], content_type='application/json',status=203)
					


			# ✅ Check if variable is NOT None
			if data[7] is not None:
				try:
					#print("test")
					try:
						finishingdata=Finishing.objects.get(name=data[5])
					except:
						print(data[2])
						finishingdata:None
						MTOItem.objects.filter(mto=pk).delete()
						return Response(data[2], content_type='application/json',status=203)
					fserializer=FinishingSerializer(finishingdata)
					finishing_id=fserializer.data['id']
					project = Item.objects.get(itemcode=data[2],length=int(data[7]),finishing=int(finishing_id))
					serializer = ItemSerializerImport(project)
					quantity=data[8]
					color=data[10]
					remark=data[11]
					equantity=data[9]
					item_id=serializer.data['id']
					mto_id=pk
					revision=1
					status=1
					MTOItem.objects.create(
						mto=MTO.objects.get(id=pk),
						itemname=project,
						quantity=quantity,
						extra_quantity=equantity,
						revision=revision,
						color=color,
						remarks=remark
						)
				except Item.DoesNotExist:
					project=None
					MTOItem.objects.filter(mto=pk).delete()
					return Response(data[2], content_type='application/json',status=203)
									
		return Response({"message":"200"})
