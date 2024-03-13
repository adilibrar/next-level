from django.shortcuts import render
from store.models import TentativeGlass,Project,TentativeGlassItem,TentativeGlassType,TentativeGlassProcessor,TentativeGlassBooking,projectsoverview,GlassCutting,TentativeGlassFinalItem,PurchaseOrder,AccountsHead,PurchaseOrderGlassItems,DeliveryNoteFromSupplierGlass
from store.Serializations.ProjectSerializations import ProjectSerializer
from store.Serializations.TentativeSerialization import GetTentativeGlassSer,GetTentativeGlassItemSer,TentativeGlassTypeSer,GetTentativeGlassSingleSer,TentativeGlassProcessorSer,TentativeGlassBookingSer,DetailedTentativeGlassBookingSer,SupplierGlassRecSerializer,POSerializer,POItemSerializer,TentativeGlassBookingShort,TentativeGlassCuttingSer,GlassCuttingItemSer,DetailedTentativeGlassCuttingSer
from store.models import Stock_issuing,Stock,PowderCoatingItems,ProductionIssuing
from store.Serializations.StockIssuingSerializations import StockIssuingProjectSerializer,DNIssuingProjectSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import datetime
from rest_framework.response import Response
from itertools import chain

@api_view()
@permission_classes([AllowAny])
def GetTentativeGlass(request,pk):
    tentativeglass = TentativeGlass.objects.filter(TentaiveGlassProject=pk)
    serializer = GetTentativeGlassSer(tentativeglass, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def GetSingleTentativeGlass(request,pk):
    tentativeglass = TentativeGlass.objects.get(id=pk)
    serializer = GetTentativeGlassSingleSer(tentativeglass)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def GetTentativeGlassItem(request,pk):
    tentativeglassitem = TentativeGlassItem.objects.filter(TentativeGlassID=pk).order_by('TentaiveGlassType')
    serializer = GetTentativeGlassItemSer(tentativeglassitem, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view()
@permission_classes([AllowAny])
def GetGlassType(request):
    tentativeglassitem = TentativeGlassType.objects.all()
    serializer = TentativeGlassTypeSer(tentativeglassitem, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view(['GET'])
def SubmitTentativeGlass(request,pk):
    tentativeglass = TentativeGlass.objects.get(id=pk)
    tentativeglass.status='2'
    tentativeglass.submitted_at=datetime.date.today()
    tentativeglass.save()
    return Response({"message":"200"})




@api_view(['GET'])
def SubmitCuttingGlass(request,pk):
    tentativeglass = GlassCutting.objects.get(id=pk)
    print(tentativeglass.TentaiveGlassCuttingProject.refrence_no)
    tentativeglass.status='2'
    tentativeglass.submitted_at=datetime.date.today()

    tentativeglassall = TentativeGlassFinalItem.objects.filter(GlassCuttingID=pk)
    serializer = GlassCuttingItemSer(tentativeglassall,many=True)
    i=1
    for item in serializer.data:

        today = datetime.date.today()   
        signletent = TentativeGlassFinalItem.objects.get(id=int(item['id']))

        op=(((item['opwidth']/1000)*(item['opheight']/1000))*item['quantity'])
        ip=(((item['ipwidth']/1000)*(item['ipheight']/1000))*item['quantity'])
        area=max(op,ip)
        area=round(area,2)  
        #print(area)
        signletent.barcode=str(tentativeglass.TentaiveGlassCuttingProject.refrence_no)+''+str(tentativeglass.revision)+''+str(str(today.month)[-2:])+''+str(str(today.year)[-2:]+''+str(i))
        signletent.area=area
        signletent.save()
        i+=1
    tentativeglass.save()

    # serializer = GetTentativeGlassSer(tentativeglass)
    # #print(tentativeglass.TentaiveGlassProject)
    # print(serializer.data['id'])
    # tentativeglassitem = TentativeGlass.objects.get(id=pk)
    return Response({"message":"200"})





@api_view()
@permission_classes([AllowAny])
def GetGlassBooking(request,pk):
    try:
        tentativeglassitem = TentativeGlassBooking.objects.get(TentaiveGlassBookingProject=pk)
        serializer = DetailedTentativeGlassBookingSer(tentativeglassitem)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    except TentativeGlassBooking.DoesNotExist:
        tentativeglassitem=None
        return HttpResponse(tentativeglassitem, content_type='application/json')
    
@api_view()
@permission_classes([AllowAny])
def FinalGetGlassCuttingData(request,pk):
    try:
        tentativeglassitem = GlassCutting.objects.get(id=pk)
        serializer = DetailedTentativeGlassCuttingSer(tentativeglassitem)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    except TentativeGlassBooking.DoesNotExist:
        tentativeglassitem=None
        return HttpResponse(tentativeglassitem, content_type='application/json')
    




@api_view()
@permission_classes([AllowAny])
def GetGlassCutting(request,pk):
    try:
        tentativeglass = GlassCutting.objects.filter(TentaiveGlassCuttingProject=pk)
        serializer = TentativeGlassCuttingSer(tentativeglass,many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    except GlassCutting.DoesNotExist:
        tentativeglass=None
        return HttpResponse(tentativeglass, content_type='application/json')
    



@api_view()
@permission_classes([AllowAny])
def GetGlassBookingDetail(request,pk):
    try:
        tentativeglassitem = TentativeGlassBooking.objects.get(TentaiveGlassBookingProject=pk)
        serializer = TentativeGlassBookingShort(tentativeglassitem)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    except TentativeGlassBooking.DoesNotExist:
        tentativeglassitem='0'
        return HttpResponse(tentativeglassitem, content_type='application/json')
    


#GetGlassSummaryDetails

@api_view()
@permission_classes([AllowAny])
def GetGlassSummaryDetails(request,pk):
    all_points=TentativeGlassFinalItem.objects.none()
    try:
        #print(pk)
        GlassCuttingData=GlassCutting.objects.filter(TentaiveGlassCuttingProject=pk)
        #print(GlassCuttingData)
        for glass in GlassCuttingData:
            #print(glass.id)
            #print(glass)
            #result_list=glass.union(glass)
            #print(glass)
            #stories = stories | glass
            tentativeglass = TentativeGlassFinalItem.objects.filter(GlassCuttingID=int(glass.id))
            #print(tentativeglass)
            all_points = all_points | tentativeglass
            

            #p1_points.union(tentativeglass)
            #for single in tentativeglass:
                #print(tentativeglass)
                #result_list = list(chain(single))
                #result = list(single)
                #print(single)
      
        #tentativeglassitem = TentativeGlassBooking.objects.get(TentaiveGlassBookingProject=pk)
        serializer = GlassCuttingItemSer(all_points,many=True)

        json_data = JSONRenderer().render(serializer.data)
        
        return HttpResponse(json_data, content_type='application/json')
    except TentativeGlassBooking.DoesNotExist:
        tentativeglassitem='0'
        return HttpResponse(tentativeglassitem, content_type='application/json')
    
    
@api_view()
@permission_classes([AllowAny])
def GetGlassProcessor(request):
    tentativeglassitem = TentativeGlassProcessor.objects.all()
    serializer = TentativeGlassProcessorSer(tentativeglassitem, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['POST'])
@permission_classes([AllowAny])
def SaveBookingOrder(request):
    project=request.data['TentaiveGlassBookingProject']

    try:
        bookingorder = TentativeGlassBooking.objects.get(TentaiveGlassBookingProject=project)
        if(bookingorder):
            #print("Found")

            bookingorder.eta=request.data['eta']
            bookingorder.status=request.data['status']
            bookingorder.inquiry_date=request.data['inquiry_date']
            bookingorder.quotation_receiving_date=request.data['quotation_receiving_date']
            bookingorder.booking_cofirmation_date=request.data['booking_cofirmation_date']
            bookingorder.purchaseRef=request.data['purchaseRef']
            bookingorder.QuotationRef=request.data['QuotationRef']
            bookingorder.GlassType=request.data['GlassType']
            bookingorder.GlassProcessor=TentativeGlassProcessor.objects.get(id=request.data['GlassProcessor'])
            bookingorder.area=request.data['area']
            bookingorder.save()

            project = Project.objects.get(id=project)
            pref=project.refrence_no
            eprojects=projectsoverview.objects.filter(projectid=pref).using("account").first()
            eprojects.glass_sheets_booking_status=request.data['status']
            eprojects.glass_sheets_eta=request.data['eta']
            eprojects.save()


            return Response({"message":"200"})
    except TentativeGlassBooking.DoesNotExist:
        #bookingorder = None
        #print("NotFound")
        serializer = TentativeGlassBookingSer(data=request.data)
        #print(serializer)
        if serializer.is_valid():
            project = Project.objects.get(id=project)
            pref=project.refrence_no
            eprojects=projectsoverview.objects.filter(projectid=pref).using("account").first()
            eprojects.glass_sheets_booking_status=request.data['status']
            eprojects.glass_sheets_eta=request.data['eta']
            serializer.save()
            eprojects.save()

            return JsonResponse(serializer.data, status=201)
        else:
            print(serializer.errors)
        #return Response({"message":"400"})
    # projects = MTO.objects.all().order_by('-id')
    # serializer = MTOSerializer(projects, many=True)
    # json_data = JSONRenderer().render(serializer.data)
    # return HttpResponse(json_data, content_type='application/json')
    return Response({"message":"200"})

#def DeleteMTOItem(self,request,*args,**kwargs):
# @csrf_exempt
# @api_view(['DELETE'])
# def DeleteMTOItem(self,pk):
#     event = MTOItem.objects.get(id=pk)
#     event.delete()
#     #return Response(status=status.HTTP_204_NO_CONTENT
#     return Response({"message":"200"})




@api_view(['GET'])
def DeleteCuttingGlassItem(request,pk):
    tentativeglass = TentativeGlassFinalItem.objects.get(id=pk)
    tentativeglass.delete()
    return Response({"message":"200"})

@api_view(['GET'])
def DeleteTentativeGlassItem(request,pk):
    tentativeglass = TentativeGlassItem.objects.get(id=pk)
    tentativeglass.delete()
    return Response({"message":"200"})




@api_view(['GET'])
def GetCuttingGlassUnique(request):
    # print(request.data)
    # print("no data")
    return Response({"message":"200"})



@api_view(['POST'])
def SaveCuttingGlassItem(request):
    #print(request.data)
    serializer = GlassCuttingItemSer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['POST'])
def SaveTentativeGlassItem(request):
    #print(request.data)
    serializer = GetTentativeGlassItemSer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)



@api_view(['POST'])
def CreateTentativeGlassOrder(request):
    #print(request.data)
    serializer = GetTentativeGlassSer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['POST'])
def CreateCuttingGlassOrder(request):
    #print(request.data)
    serializer = TentativeGlassCuttingSer(data=request.data)  
    #print(serializer)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
        
        tentativeglassrev =GlassCutting.objects.filter(TentaiveGlassCuttingProject=request.data['TentaiveGlassCuttingProject'])
        # tentativeglass =GlassCutting.objects.filter().last()
        revision = max(tentativeglassrev.values_list('revision', flat=True))
        tentativeglass =GlassCutting.objects.filter().last()
        tentativeglass.revision=int(revision)+1
        #tentativeglass.revision='1'
        tentativeglass.save()
        # tentativeglass.status='2'
        # tentativeglass.submitted_at=datetime.date.today()
        # tentativeglass.save()

        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view()
@permission_classes([AllowAny])
def GetGlassCuttingList(request,pk):
    try:
        # print(pk)
        tentativeglassitem = TentativeGlassFinalItem.objects.filter(GlassCuttingID=pk).order_by('FinalTentaiveGlassType_id')
        serializer = GlassCuttingItemSer(tentativeglassitem,many=True)
        json_data = JSONRenderer().render(serializer.data)
        #print(json_data)
        return HttpResponse(json_data, content_type='application/json')
    except TentativeGlassBooking.DoesNotExist:
        tentativeglassitem='0'
        return HttpResponse(tentativeglassitem, content_type='application/json')
    

@api_view()
@permission_classes([AllowAny])
def GetGlassCuttingListPO(request,pk):
    try:
        # print(pk)
        tentativeglassitem = TentativeGlassFinalItem.objects.filter(GlassCuttingID=pk,po='0',uinsert=0)
        serializer = GlassCuttingItemSer(tentativeglassitem,many=True)
        json_data = JSONRenderer().render(serializer.data)
        #print(json_data)
        return HttpResponse(json_data, content_type='application/json')
    except TentativeGlassBooking.DoesNotExist:
        tentativeglassitem='0'
        return HttpResponse(tentativeglassitem, content_type='application/json')
    
@api_view()
@permission_classes([AllowAny])
def GetGlassCuttingListinsertPO(request,pk):
    try:
        # print(pk)
        tentativeglassitem = TentativeGlassFinalItem.objects.filter(GlassCuttingID=pk,po='0',uinsert__gt=0)
        serializer = GlassCuttingItemSer(tentativeglassitem,many=True)
        json_data = JSONRenderer().render(serializer.data)
        #print(json_data)
        return HttpResponse(json_data, content_type='application/json')
    except TentativeGlassBooking.DoesNotExist:
        tentativeglassitem='0'
        return HttpResponse(tentativeglassitem, content_type='application/json')
    




@api_view(['POST'])
@permission_classes([AllowAny])
def AddPurchaseOrderGlass(request):
    #print(request.data)
    #print(request.data['uchannel'])
    if(int(request.data['uchannel'])==0):
        print("zerp")
        print(request.data['uchannel'])

        tentativeglassitem = TentativeGlassFinalItem.objects.filter(FinalTentaiveGlassType=request.data['glass_id'],GlassCuttingID=request.data['glasscutting'],uinsert=0)
        print(tentativeglassitem)
        total_qty = sum(tentativeglassitem.values_list('quantity', flat=True))
        total_area = sum(tentativeglassitem.values_list('area', flat=True))
        # total_insert = sum(tentativeglassitem.values_list('uinsert', flat=True))
        

        PurchaseOrderGlassItems.objects.create(
                    vat='5',
                    quantity=total_qty,
                    price=request.data['price'],
                    area=total_area,
                   uinsert=0,
                    remarks=request.data['remarks'],
                    gpono=PurchaseOrder.objects.get(id=request.data['po']),
                    gaccountshead=AccountsHead.objects.get(id=request.data['account']),
                    POGlassType=TentativeGlassType.objects.get(id=request.data['glass_id']),
                    glasscutting=GlassCutting.objects.get(id=request.data['glasscutting']),
                )
        for singleglass in tentativeglassitem:
            singleglass.po='1'
            singleglass.save()
    else:
        print("zerp")
        print(request.data['uchannel'])

        tentativeglassitem = TentativeGlassFinalItem.objects.filter(FinalTentaiveGlassType=request.data['glass_id'],GlassCuttingID=request.data['glasscutting'],uinsert__gt=0)
        
        total_qty = sum(tentativeglassitem.values_list('quantity', flat=True))
        total_area = sum(tentativeglassitem.values_list('area', flat=True))
        total_insert = sum(tentativeglassitem.values_list('uinsert', flat=True))
        

        PurchaseOrderGlassItems.objects.create(
                    vat='5',
                    quantity=total_qty,
                    price=request.data['price'],
                    area=total_area,
                    uinsert=total_insert,
                    # balance=total_qty,
                    remarks=request.data['remarks'],
                    gpono=PurchaseOrder.objects.get(id=request.data['po']),
                    gaccountshead=AccountsHead.objects.get(id=request.data['account']),
                    POGlassType=TentativeGlassType.objects.get(id=request.data['glass_id']),
                    glasscutting=GlassCutting.objects.get(id=request.data['glasscutting']),
                )
        for singleglass in tentativeglassitem:
            singleglass.po='1'
            singleglass.save()

    return Response({"message":"200"})

@api_view()
@permission_classes([AllowAny])
def Glass_PO_List(request,pk):
    projects = PurchaseOrder.objects.filter(projectpo=pk,glass=1).order_by('-id')
    serializer = POSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view()
@permission_classes([AllowAny])
def Glass_PO_Item_List(request,pk):
    projects = PurchaseOrderGlassItems.objects.filter(gpono=pk)
    serializer = POItemSerializer(projects, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def GetGlassCuttingID(request,pk):
    print("welcome")
    print(pk)
    projects = PurchaseOrderGlassItems.objects.filter(gpono=pk).last()
    serializer = POItemSerializer(projects)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@api_view(['POST'])
@permission_classes([AllowAny])
def GlassPORecieve(request):
    print(request.data)
    tentativeglassitem = TentativeGlassFinalItem.objects.get(id=request.data['id'])
    print(tentativeglassitem)
    tentativeglassitem.recieved=tentativeglassitem.recieved+int(request.data['recieved'])
    #tentativeglassitem.save()
    # total_qty = sum(tentativeglassitem.values_list('quantity', flat=True))
    # total_area = sum(tentativeglassitem.values_list('area', flat=True))]
    #return HttpResponse(json_data, content_type='application/json')
    return Response({"message":"200"})
            # total_insert = sum(tentativeglassitem.values_list('uinsert', flat=True))
        


@api_view(['POST'])
def SaveGlassSupplierItem(request):
    #print(request.data)
    serializer = SupplierGlassRecSerializer(data=request.data)  
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        #print(serializer.data)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([AllowAny])
def ProjectGlassSummary(request,pk):
    project = Project.objects.get(refrence_no=pk)

    return JsonResponse(project.id, status=201,safe=False)