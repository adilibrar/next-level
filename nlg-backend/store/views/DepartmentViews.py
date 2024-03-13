import imp
import json
from django.shortcuts import render

from store.models import Department
#from store.serializers import DepartmentSerializer
#from store.Model.DepartmentModel import Department
from store.Serializations.DeapartmentSerializations import DepartmentSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
# Create your views here.


def department_detail(request, pk):
    stu = Department.objects.get(id=pk)
    serializer = DepartmentSerializer(stu)
    #json_data = JSONRenderer().render(serializer.data)
    # return HttpResponse(json_data, content_type='application/json')
    return JsonResponse(serializer.data)


def department_list(request):
    stu = Department.objects.all()
    serializer = DepartmentSerializer(stu, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')
