from django.shortcuts import render
from store.models import Item,Project,Cities,Customers,User,ProjectBudget,projectsoverview
from store.Serializations.ProjectSerializations import ProjectSerializer,ProjectUniqueIDSerializer,CitySerializer,CustomerSerializer,ProjectBudgetSerializer,ProjectBudgetSerializerDetail
from store.Serializations.ProductionSerializations import ProductionIssuingSerializer
from store.models import Stock_issuing,Stock,PowderCoatingItems,ProductionIssuing,ProjectsList
from store.Serializations.StockIssuingSerializations import StockIssuingProjectSerializer,DNIssuingProjectSerializer
from store.Serializations.EProjSerializer import ProjOverViewSerializer,FinishingtypeSerializer,GlasstypesSerializer,AttachmentSerializer,EventLoggingSerializer,ParametersSerializer,CertifiedpaymentSerializer,PaymentTypesSerializer,CollectionSerializer,InvoicingSerializer,ProjectListSerializer,ProjectPaymentShortSerializer,ProjectManagerSerializer,ProjectVariationSerializer,ProjectPaymentSerializer,PaymentTermSerializer
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


@api_view()
@permission_classes([AllowAny])
def Projects(request):
    projects = Project.objects.all().order_by('-id')
    serializer = ProjectSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

def SingleProject(request,pk):
    project = Project.objects.get(id=pk)
    serializer = ProjectSerializer(project)
    return JsonResponse(serializer.data)


def ItemForProject(request,pk):
    project = Stock_issuing.objects.filter(project=pk)
    serializer = StockIssuingProjectSerializer(project,many=True)
    return JsonResponse(serializer.data,safe=False)

def DNItemForProject(request,pk):
    project = PowderCoatingItems.objects.filter(projectPC=pk)
    serializer = DNIssuingProjectSerializer(project,many=True)
    return JsonResponse(serializer.data,safe=False)

    
def PRItemForProject(request,pk):
    project = ProductionIssuing.objects.filter(Issuingproject=pk)
    serializer = ProductionIssuingSerializer(project,many=True)
    return JsonResponse(serializer.data,safe=False)


def LatestProjects(request):
    project = Project.objects.all().order_by('-id')[:5]
    serializer = ProjectSerializer(project,many=True)
    return JsonResponse(serializer.data,safe=False)



def RunningProjects(request):
    project = Project.objects.filter(status='active').order_by('-id')
    serializer = ProjectSerializer(project,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view()
@permission_classes([AllowAny])
def GetCities(request):
    city = Cities.objects.all().using('test')
    serializer = CitySerializer(city, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def GetCustomers(request):
    city = Customers.objects.all().using('test')
    serializer = CustomerSerializer(city, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateNewProject(request):
    # projectid=ProjectsList.objects.using("test").latest('project_id')
    # new_id=int(projectid.project_id+1)
    project = ProjectsList.objects.filter(mainid=request.data['mainid']).using("projects").first()
    
    # SaveMainProject=Project(
    #       refrence_no=new_id,
    #       name=request.data['project_name'],
    #       status=request.data['projectstatus'],
    #       sample=False,
    #       ProjectManager=User.objects.get(id=1),
    # )

    Mproject = Project.objects.get(id=request.data['mainid'])
    Mproject.name=request.data['project_name']
    Mproject.status=request.data['projectstatus']
    Mproject.save()

    project.project_name=request.data['project_name']
    project.project_area=request.data['project_area']
    project.project_cityid=request.data['project_cityid']
    project.projectvalue=request.data['projectvalue']
    project.customerid=request.data['customerid']
    project.projectmanagerid=request.data['projectmanagerid']
    project.projectstatus=request.data['projectstatus']
    project.paymentstatus=request.data['paymentstatus']
    project.save()

    return Response({"message":"200"})

@api_view(['POST'])
@permission_classes([AllowAny])
def CreateNew(request):
    #projectid=ProjectsList.objects.using("projects").latest('project_id')
    projectid=Project.objects.last()
    # print(projectid.refrence_no)
    #print(projectid)
    new_id=int(projectid.refrence_no)+1
    #print(new_id)
    #print(request.data)
    # print(new_id)
    SaveMainProject=Project(
          refrence_no=new_id,
          name=request.data['project_name'],
          #ProjectManager=request.data['projectmanagerid'],
          status=request.data['projectstatus'],
          sample=False,
          ProjectManager=User.objects.get(id=1),
    )
    SaveMainProject.save()
    main_id = Project.objects.latest('id')
    new_main_id=int(main_id.id)
    SaveProject=ProjectsList(
          project_id=new_id,
          project_name=request.data['project_name'],
          project_area=request.data['project_area'],
          phase='0',
          mainid=new_main_id,
          project_cityid=request.data['project_cityid'],
          projectvalue=request.data['projectvalue'],
          customerid=request.data['customerid'],
          projectmanagerid=request.data['projectmanagerid'],
          projectstatus=request.data['projectstatus'],
          paymentstatus=request.data['paymentstatus'],
    )
    SaveProject.save(using="projects")


    return Response({"message":"200"})

@api_view(['POST'])
def AddBudget(request):
    #print(request.data)
    serializer = ProjectBudgetSerializer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view()
@permission_classes([AllowAny])
def ExternalprojectsListAll(request):
    project = ProjectsList.objects.all().using("projects").order_by('-project_id')
    serializer = ProjectListSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view()
@permission_classes([AllowAny])
def GetBudgetList(request,pk):
    project = ProjectBudget.objects.filter(ProjectBudget=pk).order_by('-id')
    serializer = ProjectBudgetSerializerDetail(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def GetBudgetListTwoFactor(request,pk,pk2):
    project = ProjectBudget.objects.get(ProjectBudget=pk,BudgetHead=pk2)
    serializer = ProjectBudgetSerializerDetail(project)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view(['GET'])
def DeleteBudgetList(request,pk):
    tentativeglass = ProjectBudget.objects.get(id=pk)
    tentativeglass.delete()
    return Response({"message":"200"})


@api_view()
@permission_classes([AllowAny])
def GetUniqueProjectID(request,pk):
    project = Project.objects.get(ProjectBudget=pk)
    serializer = ProjectUniqueIDSerializer(project)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['POST'])
@permission_classes([AllowAny])
def CopyProjects(request):
    projectid=Project.objects.get(id=request.data['mainid'])

    #projectid.phase=int(projectid.phase)+1
    projectid.total=2
    projectid.save()
    #print(projectid)
    #new_id=int(projectid.project_id+1)
    #print(new_id)
    #print(request.data)



    #projectid=ProjectsList.objects.using("test").latest('project_id')
    #print(projectid)
    #new_id=int(projectid.project_id+1)
    #print(new_id)
    #print(request.data)

    SaveMainProject=Project(
          refrence_no=request.data['projectcode'],
          name=projectid.name,
          #ProjectManager=request.data['projectmanagerid'],
          status='Active',
          sample=False,
          ProjectManager=User.objects.get(id=1),
          phase=int(projectid.phase)+1,
          total=1
    )
    SaveMainProject.save()

    #latest_project=Project.objects.get(id=request.data['mainid'])
    main_id = Project.objects.latest('id')
    new_main_id=int(main_id.id)
    SaveProject=ProjectsList(
          project_id=request.data['projectcode'],
          project_name=projectid.name,
          project_area='NA',
          phase=int(projectid.phase)+1,
          mainid=new_main_id,
          project_cityid='3889',
          projectvalue='0',
          customerid='-1',
          projectmanagerid='100',
          projectstatus='Active',
          paymentstatus='',
    )
    SaveProject.save(using="projects")



    print(request.data)
    return Response({"message":"200"})