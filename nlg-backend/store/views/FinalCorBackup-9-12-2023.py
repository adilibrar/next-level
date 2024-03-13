from django.shortcuts import render
from store.models import Item,MTO,Project,WindowStatus,StockList,StockListItem,MTOItem,MTOType,FinalReleasedWindow,FinalReleasedWindowPacking,ReleasedWindow,FinalReleasedWindowProfile,ReleasedWindowProfile,FinalReleasedWindowACC,ReleasedWindowACC,FinalReleasedWindowInterLockACC,ReleasedWindowInterLockACC,FinalReleasedWindowGasket,FinalReleasedWindowScrew,ReleasedWindowGasket,ReleasedWindowScrew,ReleasedWindowPacking,FinalReleasedWindowGlass,ReleasedWindowGlass,ReleasedWindowInterLock,FinalReleasedWindowInterLock,Floor,Lock,Elevation,CorVisionProfile,CORVISION,CorVisionInterLockAcc,CorVisionDIM,CorVisionShutter,CorVisionGlass,CorVisionAcc,CorVisionGasket,CorScrew,CorPacking,CorVisionInterLock
from store.Serializations.CorVisionSerializer import CorVisionProfileSerializer,CorVisionReleasedProfileShortSerializer,FloorSerializer,LockSerializer,ElevationSerializer,CorVisionInterLockAccSerializer,CorVisionInterLockSerializer,CorVisionProfileShortSerializer,CorVisionPackingSerializer,CorVisionScrewSerializer,CorVisionSerializer,CorVisionDIMSerializer,CorVisionShutterSerializer,CorVisionGlassSerializer,CorVisionAccSerializer,CorVisionGasketSerializer
from store.Serializations.FCorVisionSerializer import CorVisionProfileSerializer,FinalReleasedCustomDimSerializer,ReleaseWindowShortSerializer,CorVisionReleasedProfileShortSerializer,ReleaseWindowACCSerializer,ReleaseWindowSerializerDepth,ReleaseWindowPackingSerializer,ReleaseWindowGlassSerializer,ReleaseWindowGasketSerializer,ReleaseWindowScrewSerializer,ReleaseWindowInterlockACCSerializer,ReleaseWindowsaveSerializer,ReleaseWindowInterLockSerializer,ReleaseWindowProfileSerializer,ReleaseWindowSerializer,FloorSerializer,LockSerializer,ElevationSerializer,CorVisionInterLockAccSerializer,CorVisionInterLockSerializer,CorVisionProfileShortSerializer,CorVisionPackingSerializer,CorVisionScrewSerializer,CorVisionSerializer,CorVisionDIMSerializer,CorVisionShutterSerializer,CorVisionGlassSerializer,CorVisionAccSerializer,CorVisionGasketSerializer
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
def CORVision_Profile(request):
    requestdata=request.data
    if request.method == "POST":
        final_profile_data=[]
        final_acc_data=[]
        pk=int(requestdata['id'])
        
        w=int(requestdata['width'])
        h=int(requestdata['height']) 
      
        project_id=int(requestdata['project'])
        released_window=requestdata['released']
        
        CorData = CORVISION.objects.get(id=pk)
        Corserializer = CorVisionSerializer(CorData)
        wd=Corserializer.data['wd']


        dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
        DIMserializer = CorVisionDIMSerializer(dim, many=True)
        DIMserializer_data=DIMserializer.data


        WindowStatus=FinalReleasedWindow.objects.get(id=int(requestdata['released']))
        Wserializer = ReleaseWindowSerializer(WindowStatus)

        # if(Wserializer.data['Window']['status']=='3'):
            
        #     if int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0  and int(request.data['dim3'])==0:
        #         dim1=int(requestdata['dim1'])
        #         dim2=int(requestdata['dim2'])
        #     elif int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0 and int(requestdata['dim3']) !=0:
        #         dim1=int(requestdata['dim1'])
        #         dim2=int(requestdata['dim2'])
        #         dim3=int(requestdata['dim3'])
        #     else:
        #         return JsonResponse({'Key':'error'})
            

        print(Wserializer.data)
        if(Wserializer.data['FWindow']['status']=='3' and wd=='99'):
            if int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0  and int(request.data['dim3'])==0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
            elif int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0 and int(requestdata['dim3']) !=0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
                dim3=int(requestdata['dim3'])
            else:
                return JsonResponse({'Key':'error'})      
        else: 
            for dim in DIMserializer_data:
                    #print(profile['fromula'])
            ##to test
                if(wd <= '5'):

                    initial_dim1=0
                    initial_dim2=0
                    initial_dim3=0
                    initial_dim4=0
                    initial_dim5=0

                    name=dim['CodeName']
                    formula=dim['formula']
                    if(name=='dim1'):
                        initial_dim1=dim['formula']
                        final_dim1=initial_dim1.replace('w', "w")
                        dim1=eval(final_dim1)

                    elif(name=='dim2'):
                        initial_dim2=dim['formula']
                        dimc1=initial_dim2.replace('dim1', "dim1")
                        final_dim2=dimc1.replace('w', "w")
                        dim2=eval(final_dim2)

                    elif(name=='dim3'):
                        initial_dim3=dim['formula']
                        dimc1=initial_dim3.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        final_dim3=dimc2.replace('w', "w")
                        dim3=eval(final_dim3)

                    elif(name=='dim4'):
                        initial_dim4=dim['formula']
                        dimc1=initial_dim4.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        final_dim4=dimc3.replace('w', "w")
                        dim4=eval(final_dim4)

                    elif(name=='dim5'):
                        initial_dim5=dim['formula']
                        dimc1=initial_dim5.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        dimc4=dimc3.replace('w', "w")
                        final_dim5=dimc4.replace('w', "w")
                        dim5=eval(final_dim5)


#        projects = CorVisionProfile.objects.filter(CorVision=pk)
 #       serializer = CorVisionProfileSerializer(projects, many=True)
 #       serialize_data=serializer.data


        projects = CorVisionProfile.objects.filter(CorVision=pk)
        serializer = CorVisionProfileSerializer(projects, many=True)
        serialize_data=serializer.data

        for profile in serialize_data:
            
            formula=profile['formula']
            fix_width=formula.replace('w', "w")
            dimen1=fix_width.replace('dim1','dim1')
            dimen2=dimen1.replace('dim2','dim2')
            dimen3=dimen2.replace('dim3','dim3')
            dimen4=dimen3.replace('dim4','dim4')
            dimen5=dimen4.replace('dim5','dim5')
            fix_height=dimen5.replace('h', "h")

            final_formula=fix_height
            profile_data=[profile['CorVisionItem']['itemcode'],profile['CorVisionItem']['name'],profile['title'],"%.2f" %eval(final_formula),profile['quantity'],profile['cutting'],profile['coating'],profile['remark'],profile['CorVisionItem']['unit']]
            if(requestdata['status']=='1'):
              
                FinalReleasedWindowProfile.objects.create(
                    FReleasedWindowP=FinalReleasedWindow.objects.get(id=int(released_window)),
                    FReleasedWindowPItem=Item.objects.get(id=int(profile['CorVisionItem']['id'])),
                    description=profile['title'],
                    cutlength=round(eval(final_formula),2),
                    quantity=profile['quantity'],
                    cutting=profile['cutting'],
                    coating=profile['coating'],
                    remark=profile['remark'],
                    status='4',
                    FReleasedprofileproject=Project.objects.get(id=int(project_id))
                    )
            final_profile_data.append(profile_data)

        
    json_data = JSONRenderer().render(final_profile_data)
    return HttpResponse(json_data, content_type='application/json')

        ##end to test

@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_Acc(request):
    final_acc_data=[]
    requestdata=request.data
    project_id=int(requestdata['project'])
    final_acc_data=[]
    pk=int(requestdata['id'])   
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    acc = CorVisionAcc.objects.filter(CorVision=pk)
    Accserializer = CorVisionAccSerializer(acc, many=True)
    accserialize_data=Accserializer.data


    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']

    ##validating customized dim
    WindowStatus=FinalReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)

    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data

    if(Wserializer.data['FWindow']['status']=='3' and wd=='99'):
            if int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0  and int(request.data['dim3'])==0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
            elif int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0 and int(requestdata['dim3']) !=0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
                dim3=int(requestdata['dim3'])
            else:
                return JsonResponse({'Key':'error'})      
    else: 
            for dim in DIMserializer_data:
                    #print(profile['fromula'])
            ##to test
                if(wd <= '5'):

                    initial_dim1=0
                    initial_dim2=0
                    initial_dim3=0
                    initial_dim4=0
                    initial_dim5=0

                    name=dim['CodeName']
                    formula=dim['formula']
                    if(name=='dim1'):
                        initial_dim1=dim['formula']
                        final_dim1=initial_dim1.replace('w', "w")
                        dim1=eval(final_dim1)

                    elif(name=='dim2'):
                        initial_dim2=dim['formula']
                        dimc1=initial_dim2.replace('dim1', "dim1")
                        final_dim2=dimc1.replace('w', "w")
                        dim2=eval(final_dim2)

                    elif(name=='dim3'):
                        initial_dim3=dim['formula']
                        dimc1=initial_dim3.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        final_dim3=dimc2.replace('w', "w")
                        dim3=eval(final_dim3)

                    elif(name=='dim4'):
                        initial_dim4=dim['formula']
                        dimc1=initial_dim4.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        final_dim4=dimc3.replace('w', "w")
                        dim4=eval(final_dim4)

                    elif(name=='dim5'):
                        initial_dim5=dim['formula']
                        dimc1=initial_dim5.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        dimc4=dimc3.replace('w', "w")
                        final_dim5=dimc4.replace('w', "w")
                        dim5=eval(final_dim5)


        
    for acc in accserialize_data:
        #print(acc['CorVisionItem']['unit'])


        
        # formula=acc['formula']
        # fix_width=formula.replace('w', "w")
        # fix_height=fix_width.replace('h', "h")
        # final_formula=fix_height

        formula=acc['formula']
        fix_width=formula.replace('w', "w")
        dimen1=fix_width.replace('dim1','dim1')
        dimen2=dimen1.replace('dim2','dim2')
        dimen3=dimen2.replace('dim3','dim3')
        dimen4=dimen3.replace('dim4','dim4')
        dimen5=dimen4.replace('dim5','dim5')
        fix_height=dimen5.replace('h', "h")
        final_formula=fix_height
        acc_data=[acc['CorVisionItem']['itemcode'],acc['CorVisionItem']['name'],acc['title'],"%.2f" %eval(final_formula),acc['quantity'],acc['cutting'],acc['coating'],acc['remark'],acc['CorVisionItem']['unit']]
        
        if(requestdata['status']=='1'):
                FinalReleasedWindowACC.objects.create(
                    FReleasedWindowA=FinalReleasedWindow.objects.get(id=int(requestdata['released'])),
                    FReleasedWindowAcc=Item.objects.get(id=int(acc['CorVisionItem']['id'])),
                    description=acc['title'],
                    quantity=eval(final_formula),
                    cutting=acc['cutting'],
                    coating=acc['coating'],
                    remark=acc['remark'],
                    status='4',
                    FReleasedAccproject=Project.objects.get(id=int(project_id))
                    )
        
        final_acc_data.append(acc_data)  

    json_data = JSONRenderer().render(final_acc_data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_Gasket(request):
    final_gasket_data=[]
    requestdata=request.data
    project_id=int(requestdata['project'])
    pk=int(requestdata['id'])   
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    gasket = CorVisionGasket.objects.filter(CorVision=pk)
    Gasketserializer = CorVisionGasketSerializer(gasket, many=True)
    gasketserialize_data=Gasketserializer.data

    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']


    WindowStatus=FinalReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)

    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data

    if(Wserializer.data['FWindow']['status']=='3' and wd=='99'):
            if int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0  and int(request.data['dim3'])==0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
            elif int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0 and int(requestdata['dim3']) !=0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
                dim3=int(requestdata['dim3'])
            else:
                return JsonResponse({'Key':'error'})      
    else: 
            for dim in DIMserializer_data:
                    #print(profile['fromula'])
            ##to test
                if(wd <= '5'):

                    initial_dim1=0
                    initial_dim2=0
                    initial_dim3=0
                    initial_dim4=0
                    initial_dim5=0

                    name=dim['CodeName']
                    formula=dim['formula']
                    if(name=='dim1'):
                        initial_dim1=dim['formula']
                        final_dim1=initial_dim1.replace('w', "w")
                        dim1=eval(final_dim1)

                    elif(name=='dim2'):
                        initial_dim2=dim['formula']
                        dimc1=initial_dim2.replace('dim1', "dim1")
                        final_dim2=dimc1.replace('w', "w")
                        dim2=eval(final_dim2)

                    elif(name=='dim3'):
                        initial_dim3=dim['formula']
                        dimc1=initial_dim3.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        final_dim3=dimc2.replace('w', "w")
                        dim3=eval(final_dim3)

                    elif(name=='dim4'):
                        initial_dim4=dim['formula']
                        dimc1=initial_dim4.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        final_dim4=dimc3.replace('w', "w")
                        dim4=eval(final_dim4)

                    elif(name=='dim5'):
                        initial_dim5=dim['formula']
                        dimc1=initial_dim5.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        dimc4=dimc3.replace('w', "w")
                        final_dim5=dimc4.replace('w', "w")
                        dim5=eval(final_dim5)
   

                        
    for gasket in gasketserialize_data:
        formula=gasket['formula']
        fix_width=formula.replace('w', "w")
        dimen1=fix_width.replace('dim1','dim1')
        dimen2=dimen1.replace('dim2','dim2')
        dimen3=dimen2.replace('dim3','dim3')
        dimen4=dimen3.replace('dim4','dim4')
        dimen5=dimen4.replace('dim5','dim5')
        fix_height=dimen5.replace('h', "h")
        final_formula=fix_height
        gasket_data=[gasket['CorVisionItem']['itemcode'],gasket['CorVisionItem']['name'],gasket['title'],"%.2f" %eval(final_formula),gasket['quantity'],gasket['cutting'],gasket['coating'],gasket['remark']]
        
        if(requestdata['status']=='1'):
            FinalReleasedWindowGasket.objects.create(
                        FReleasedWindowG=FinalReleasedWindow.objects.get(id=int(requestdata['released'])),
                        FReleasedWindowGasket=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                        description=gasket['title'],
                        cutlength=round(eval(final_formula),2),
                        quantity=gasket['quantity'],
                        cutting=gasket['cutting'],
                        coating=gasket['coating'],
                        remark=gasket['remark'],
                        status='4',
                        FReleasedGasketroject=Project.objects.get(id=int(project_id))
                )
        final_gasket_data.append(gasket_data)  

    json_data = JSONRenderer().render(final_gasket_data)
    return HttpResponse(json_data, content_type='application/json')





@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_Screw(request):
    final_screw_data=[]
    requestdata=request.data
    project_id=int(requestdata['project'])
    pk=int(requestdata['id'])   
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    screw = CorScrew.objects.filter(CorVision=pk)
    Screwserializer = CorVisionScrewSerializer(screw, many=True)
    screwserialize_data=Screwserializer.data

    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']

    ##validating customized dim
    WindowStatus=FinalReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)

    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data

    if(Wserializer.data['FWindow']['status']=='3' and wd=='99'):
            if int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0  and int(request.data['dim3'])==0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
            elif int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0 and int(requestdata['dim3']) !=0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
                dim3=int(requestdata['dim3'])
            else:
                return JsonResponse({'Key':'error'})      
    else: 
            for dim in DIMserializer_data:
                    #print(profile['fromula'])
            ##to test
                if(wd <= '5'):

                    initial_dim1=0
                    initial_dim2=0
                    initial_dim3=0
                    initial_dim4=0
                    initial_dim5=0

                    name=dim['CodeName']
                    formula=dim['formula']
                    if(name=='dim1'):
                        initial_dim1=dim['formula']
                        final_dim1=initial_dim1.replace('w', "w")
                        dim1=eval(final_dim1)

                    elif(name=='dim2'):
                        initial_dim2=dim['formula']
                        dimc1=initial_dim2.replace('dim1', "dim1")
                        final_dim2=dimc1.replace('w', "w")
                        dim2=eval(final_dim2)

                    elif(name=='dim3'):
                        initial_dim3=dim['formula']
                        dimc1=initial_dim3.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        final_dim3=dimc2.replace('w', "w")
                        dim3=eval(final_dim3)

                    elif(name=='dim4'):
                        initial_dim4=dim['formula']
                        dimc1=initial_dim4.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        final_dim4=dimc3.replace('w', "w")
                        dim4=eval(final_dim4)

                    elif(name=='dim5'):
                        initial_dim5=dim['formula']
                        dimc1=initial_dim5.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        dimc4=dimc3.replace('w', "w")
                        final_dim5=dimc4.replace('w', "w")
                        dim5=eval(final_dim5)





    for gasket in screwserialize_data:
        formula=gasket['formula']
        fix_width=formula.replace('w', "w")
        dimen1=fix_width.replace('dim1','dim1')
        dimen2=dimen1.replace('dim2','dim2')
        dimen3=dimen2.replace('dim3','dim3')
        dimen4=dimen3.replace('dim4','dim4')
        dimen5=dimen4.replace('dim5','dim5')
        fix_height=dimen5.replace('h', "h")

        final_formula=fix_height
        gasket_data=[gasket['CorVisionItem']['itemcode'],gasket['CorVisionItem']['name'],gasket['title'],"%.2f" %eval(final_formula),gasket['quantity'],gasket['cutting'],gasket['coating'],gasket['remark']]
        if(requestdata['status']=='1'):
              
                FinalReleasedWindowScrew.objects.create(
                    FReleasedWindowS=FinalReleasedWindow.objects.get(id=int(requestdata['released'])),
                    FReleasedWindowSc=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                    description=gasket['title'],
                    quantity=round(eval(final_formula),2),
                    coating=gasket['coating'],
                    remark=gasket['remark'],
                    status='4',
                    FReleasedScrewproject=Project.objects.get(id=int(project_id))
                    
                    )
        final_screw_data.append(gasket_data)  

    json_data = JSONRenderer().render(final_screw_data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_Packing(request):
    final_packing_data=[]
    requestdata=request.data
    project_id=int(requestdata['project'])
    pk=int(requestdata['id'])   
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    packing = CorPacking.objects.filter(CorVision=pk)
    Packingserializer = CorVisionPackingSerializer(packing, many=True)
    packingserialize_data=Packingserializer.data


    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']

    ##validating customized dim
    WindowStatus=FinalReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)

    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data


    if(Wserializer.data['FWindow']['status']=='3' and wd=='99'):
            if int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0  and int(request.data['dim3'])==0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
            elif int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0 and int(requestdata['dim3']) !=0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
                dim3=int(requestdata['dim3'])
            else:
                return JsonResponse({'Key':'error'})      
    else: 
            for dim in DIMserializer_data:
                    #print(profile['fromula'])
            ##to test
                if(wd <= '5'):

                    initial_dim1=0
                    initial_dim2=0
                    initial_dim3=0
                    initial_dim4=0
                    initial_dim5=0

                    name=dim['CodeName']
                    formula=dim['formula']
                    if(name=='dim1'):
                        initial_dim1=dim['formula']
                        final_dim1=initial_dim1.replace('w', "w")
                        dim1=eval(final_dim1)

                    elif(name=='dim2'):
                        initial_dim2=dim['formula']
                        dimc1=initial_dim2.replace('dim1', "dim1")
                        final_dim2=dimc1.replace('w', "w")
                        dim2=eval(final_dim2)

                    elif(name=='dim3'):
                        initial_dim3=dim['formula']
                        dimc1=initial_dim3.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        final_dim3=dimc2.replace('w', "w")
                        dim3=eval(final_dim3)

                    elif(name=='dim4'):
                        initial_dim4=dim['formula']
                        dimc1=initial_dim4.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        final_dim4=dimc3.replace('w', "w")
                        dim4=eval(final_dim4)

                    elif(name=='dim5'):
                        initial_dim5=dim['formula']
                        dimc1=initial_dim5.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        dimc4=dimc3.replace('w', "w")
                        final_dim5=dimc4.replace('w', "w")
                        dim5=eval(final_dim5)




    for gasket in packingserialize_data:
        formula=gasket['formula']
        fix_width=formula.replace('w', "w")
        dimen1=fix_width.replace('dim1','dim1')
        dimen2=dimen1.replace('dim2','dim2')
        dimen3=dimen2.replace('dim3','dim3')
        dimen4=dimen3.replace('dim4','dim4')
        dimen5=dimen4.replace('dim5','dim5')
        fix_height=dimen5.replace('h', "h")
        final_formula=fix_height
        gasket_data=[gasket['CorVisionItem']['itemcode'],gasket['CorVisionItem']['name'],gasket['title'],"%.2f" %eval(final_formula),gasket['quantity'],gasket['cutting'],gasket['coating'],gasket['remark']]
        
        if(requestdata['status']=='1'):
              
                FinalReleasedWindowPacking.objects.create(
                    FReleasedWindowPacking=FinalReleasedWindow.objects.get(id=int(requestdata['released'])),
                    FReleasedWindowPac=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                    description=gasket['title'],
                    quantity=eval(final_formula),
                    coating=gasket['coating'],
                    remark=gasket['remark'],
                    status='4',
                    FReleasedPackingproject=Project.objects.get(id=int(project_id))
                    )
        final_packing_data.append(gasket_data)  

    json_data = JSONRenderer().render(final_packing_data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_Glass(request):
    #Dimension Calculation

    requestdata=request.data
    project_id=int(requestdata['project'])
    final_glass_data=[]
    pk=int(requestdata['id']) 
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
      
    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']

    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data

    WindowStatus=FinalReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)

    if(Wserializer.data['FWindow']['status']=='3' and wd=='99'):
            if int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0  and int(request.data['dim3'])==0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
            elif int(requestdata['dim1']) !=0 and int(requestdata['dim2']) !=0 and int(requestdata['dim3']) !=0:
                dim1=int(requestdata['dim1'])
                dim2=int(requestdata['dim2'])
                dim3=int(requestdata['dim3'])
            else:
                return JsonResponse({'Key':'error'})      
    else: 
            for dim in DIMserializer_data:
                    #print(profile['fromula'])
            ##to test
                if(wd <= '5'):

                    initial_dim1=0
                    initial_dim2=0
                    initial_dim3=0
                    initial_dim4=0
                    initial_dim5=0

                    name=dim['CodeName']
                    formula=dim['formula']
                    if(name=='dim1'):
                        initial_dim1=dim['formula']
                        final_dim1=initial_dim1.replace('w', "w")
                        dim1=eval(final_dim1)

                    elif(name=='dim2'):
                        initial_dim2=dim['formula']
                        dimc1=initial_dim2.replace('dim1', "dim1")
                        final_dim2=dimc1.replace('w', "w")
                        dim2=eval(final_dim2)

                    elif(name=='dim3'):
                        initial_dim3=dim['formula']
                        dimc1=initial_dim3.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        final_dim3=dimc2.replace('w', "w")
                        dim3=eval(final_dim3)

                    elif(name=='dim4'):
                        initial_dim4=dim['formula']
                        dimc1=initial_dim4.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        final_dim4=dimc3.replace('w', "w")
                        dim4=eval(final_dim4)

                    elif(name=='dim5'):
                        initial_dim5=dim['formula']
                        dimc1=initial_dim5.replace('dim1', "dim1")
                        dimc2=dimc1.replace('dim2', "dim2")
                        dimc3=dimc2.replace('dim2', "dim2")
                        dimc4=dimc3.replace('w', "w")
                        final_dim5=dimc4.replace('w', "w")
                        dim5=eval(final_dim5)

    # for dim in DIMserializer_data:
    #             #print(profile['fromula'])
    #     # if(wd=='2'):
    #     #     initial_dim1=0
    #     #     initial_dim2=0
    #     #     name=dim['CodeName']
    #     #             #print(name)
    #     #     formula=dim['formula']
    #     #         #print(formula)
    #     #     if(name=='dim1'):
    #     #         initial_dim1=dim['formula']
    #     #         final_dim1=initial_dim1.replace('w', "w")
    #     #         dim1=eval(final_dim1)
    #     #                 #print(dim1)
    #     #     elif(name=='dim2'):
    #     #         initial_dim2=dim['formula']
    #     #                 #print(dim1)
    #     #                 #print(initial_dim2)
    #     #         final_dim2=initial_dim2.replace('dim1', "dim1")
    #     #         dim2=eval(final_dim2)

    #     if(wd <= '5'):

    #         initial_dim1=0
    #         initial_dim2=0
    #         initial_dim3=0
    #         initial_dim4=0
    #         initial_dim5=0

    #         name=dim['CodeName']
    #         formula=dim['formula']
    #         if(name=='dim1'):
    #             initial_dim1=dim['formula']
    #             final_dim1=initial_dim1.replace('w', "w")
    #             dim1=eval(final_dim1)

    #         elif(name=='dim2'):
    #             initial_dim2=dim['formula']
    #             final_dim2=initial_dim2.replace('w', "w")
    #             dim2=eval(final_dim2)

    #         elif(name=='dim3'):
    #             initial_dim3=dim['formula']
    #             final_dim3=initial_dim3.replace('w', "w")
    #             dim3=eval(final_dim3)

    #         elif(name=='dim4'):
    #             initial_dim4=dim['formula']
    #             final_dim4=initial_dim4.replace('w', "w")
    #             dim4=eval(final_dim4)

    #         elif(name=='dim5'):
    #             initial_dim5=dim['formula']
    #             final_dim5=initial_dim5.replace('w', "w")
    #             dim5=eval(final_dim5)

    glass = CorVisionGlass.objects.filter(CorVision=pk).order_by('id')
    GlassSerializer = CorVisionGlassSerializer(glass, many=True)
    Glassserializer_data=GlassSerializer.data
        #print(Glassserializer_data)
    for glass in Glassserializer_data:
            #print(profile['fromula'])
            if(wd<='5'):
    
                name=glass['CodeName']

                initial_gl_width=glass['Widthformula']
                        #print(initial_sh2_width)
                initial_gl_height=glass['Heightformula']
                        #print(initial_gl2_width)
                final_gl_width=initial_gl_width.replace('dim5', "dim5")
                final_gl_width=initial_gl_width.replace('dim4', "dim4")
                final_gl_width=initial_gl_width.replace('dim3', "dim3")
                final_gl_width=initial_gl_width.replace('dim2', "dim2")
                final_gl_width=initial_gl_width.replace('dim1', "dim1")
                final_gl_height=initial_gl_height.replace('h', "h")
                gl_w=eval(final_gl_width)
                gl_h=eval(final_gl_height) 
                gl_title=glass['title']

                gasket_data=[gl_title,gl_w,gl_h]


                if(requestdata['status']=='1'):
                    initial_gl_width=glass['Widthformula']
                        #print(initial_sh2_width)
                    initial_gl_height=glass['Heightformula']
                        #print(initial_gl2_width)
                    final_gl_width=initial_gl_width.replace('dim5', "dim5")
                    final_gl_width=initial_gl_width.replace('dim4', "dim4")
                    final_gl_width=initial_gl_width.replace('dim3', "dim3")
                    final_gl_width=initial_gl_width.replace('dim2', "dim2")
                    final_gl_width=initial_gl_width.replace('dim1', "dim1")
                    final_gl_height=initial_gl_height.replace('h', "h")
                    gl_w=eval(final_gl_width)
                    gl_h=eval(final_gl_height) 
                    gl_title=glass['title']
                    FinalReleasedWindowGlass.objects.create(
                            FReleasedWindowGlass=FinalReleasedWindow.objects.get(id=int(requestdata['released'])),
                            title=gl_title,
                            width=gl_w,
                            height=gl_h,
                            status='4',
                            FReleasedGlassproject=Project.objects.get(id=int(project_id))
                        )
                #gasket_data=[gl_title,gl_w,gl_h]
            else:
                name=glass['CodeName']

                initial_gl_width=glass['Widthformula']
                initial_gl_height=glass['Heightformula']
                # final_gl_width=initial_gl_width.replace('dim5', "dim5")
                # final_gl_width=initial_gl_width.replace('dim4', "dim4")
                final_gl_width=initial_gl_width.replace('dim3', "dim3")
                final_gl_width=initial_gl_width.replace('dim2', "dim2")
                final_gl_width=initial_gl_width.replace('dim1', "dim1")
                final_gl_height=initial_gl_height.replace('h', "h")
                gl_w=eval(final_gl_width)
                gl_h=eval(final_gl_height) 
                gl_title=glass['title']

                gasket_data=[gl_title,gl_w,gl_h]


                if(requestdata['status']=='1'):
                    initial_gl_width=glass['Widthformula']
                    initial_gl_height=glass['Heightformula']
                    # final_gl_width=initial_gl_width.replace('dim5', "dim5")
                    # final_gl_width=initial_gl_width.replace('dim4', "dim4")
                    final_gl_width=initial_gl_width.replace('dim3', "dim3")
                    final_gl_width=initial_gl_width.replace('dim2', "dim2")
                    final_gl_width=initial_gl_width.replace('dim1', "dim1")
                    final_gl_height=initial_gl_height.replace('h', "h")
                    gl_w=eval(final_gl_width)
                    gl_h=eval(final_gl_height) 
                    gl_title=glass['title']

                    ReleasedWindowGlass.objects.create(
                            ReleasedWindowGlass=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                            title=gl_title,
                            width=gl_w,
                            height=gl_h,
                            ReleasedGlassproject=Project.objects.get(id=int(project_id))
                        )
 
            final_glass_data.append(gasket_data)  

    json_data = JSONRenderer().render(final_glass_data)
    return HttpResponse(json_data, content_type='application/json')





@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_InterLock(request):
    #Dimension Calculation
    dim1=0
    dim2=0
    dim3=0
    dim4=0
    dim5=0
    dimh=0
    sh1_w=0
    sh1_h=0
    sh2_w=0
    sh2_h=0
    gl1_w=0
    gl1_h=0
    gl2_w=0
    gl2_h=0
    dimh=0
    gl1_title=''
    gl2_title=''
    final_profile_data=[]
    requestdata=request.data
    final_glass_data=[]
    pk=int(requestdata['id']) 
    w=float(requestdata['width'])
    h=float(requestdata['height'])
    wind=float(requestdata['wp']) 
    project_id=int(requestdata['project'])
    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']

    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data
    for dim in DIMserializer_data:
        #print(profile['fromula'])
        if(wd<='5'):
            initial_dim1=0
            initial_dim2=0
            initial_dim3=0 
            initial_dim4=0
            initial_dim5=0
            dim_height=0
            dim_height_formula=0
            
            name=dim['CodeName']
                    #print(name)
            formula=dim['formula']
                #print(formula)
            if(name=='dim1'):
                dim_height_formula=dim['heightFormula']
                dim_height=dim_height_formula.replace('h','h')
                
                dimh=(eval(dim_height)/1000)
                dim1=eval(dim_height)
                #print(dimh)
                initial_dim1=dim['formula']
                final_dim1=initial_dim1.replace('w', "w")
                dim1=eval(final_dim1)
                        #print(dim1)
            elif(name=='dim2'):
                initial_dim2=dim['formula']
                        #print(dim1)
                        #print(initial_dim2)
                final_dim2=initial_dim2.replace('dim1', "dim1")
                final_dim2=final_dim2.replace('w', "w")
                dim2=eval(final_dim2)
  
  
            elif(name=='dim3'):
                initial_dim3=dim['formula']

                final_dim3=initial_dim3.replace('dim1', "dim1")
                final_dim3=final_dim3.replace('dim2', "dim2")
                final_dim3=final_dim3.replace('w', "w")
                dim3=eval(final_dim3)

            elif(name=='dim4'):
                initial_dim4=dim['formula']
                final_dim4=initial_dim4.replace('dim1', "dim1")
                final_dim4=final_dim4.replace('dim2', "dim2")
                final_dim4=final_dim4.replace('dim3', "dim3")
                final_dim4=final_dim4.replace('w', "w")
                dim4=eval(final_dim4)

            elif(name=='dim5'):
                initial_dim5=dim['formula']
                final_dim5=initial_dim5.replace('dim1', "dim1")
                final_dim5=final_dim5.replace('dim2', "dim2")
                final_dim5=final_dim5.replace('dim3', "dim3")
                final_dim5=final_dim5.replace('dim4', "dim4")
                final_dim5=final_dim5.replace('w', "w")
                dim5=eval(final_dim5)

    interLock = CorVisionInterLock.objects.filter(CorVision=pk)
    GlassSerializer = CorVisionInterLockSerializer(interLock, many=True)
    InterLockserializer_data=GlassSerializer.data
    if(wd<='5'):
        dimw=(max(dim1,dim2,dim3,dim4,dim5))/1000
    for inter in InterLockserializer_data:
        #print("fsdfsd")
        inter_formula=maximum_value=minimum_value=0
        inter_formula=inter['formula']
        
        wind_pressure=inter_formula.replace('wp',"wind")
        dim_width=wind_pressure.replace('dimw',"dimw")
        dim_height=dim_width.replace('dimh',"dimh")
        # #print(dim_height)
        final_value=eval(dim_height)
        #print(final_value)
        # if(final_value > inter['minimum'] and final_value < inter['maximum']):
        #     print("i have something")
        for profiles in InterLockserializer_data:
            if(final_value > int(profiles['minimum']) and final_value <= int(profiles['maximum'])):
                #print("i have something")
                #print(profiles['title'])
                formula=profiles['profileFormula']
                fix_width=formula.replace('w', "w")
                dimen1=fix_width.replace('dim1','dim1')
                dimen2=dimen1.replace('dim2','dim2')
                                         
                dimen3=dimen2.replace('dim3','dim3')
                dimen4=dimen3.replace('dim4','dim4')
                dimen5=dimen4.replace('dim5','dim5')
                fix_height_profile=dimen5.replace('h', "h")

                final_formula_profile=fix_height_profile
                profile_data=[profiles['CorVisionItem']['itemcode'],profiles['CorVisionItem']['name'],profiles['title'],"%.2f" %eval(final_formula_profile),profiles['quantity'],profiles['cutting'],profiles['coating'],profiles['remark'],profiles['CorVisionItem']['unit']]
                if(requestdata['status']=='1'):
                
                    FinalReleasedWindowInterLock.objects.create(
                        FReleasedWindowInter=FinalReleasedWindow.objects.get(id=int(requestdata['released'])),
                        FReleasedWindowInterProfile=Item.objects.get(id=int(profiles['CorVisionItem']['id'])),
                        description=profiles['title'],
                        cutlength=round(eval(final_formula_profile),2),
                        quantity=profiles['quantity'],
                        cutting=profiles['cutting'],
                        coating=profiles['coating'],
                        status='4',
                        remark=profiles['remark'],
                        FReleasedInterLockproject=Project.objects.get(id=project_id)
                        )
                final_profile_data.append(profile_data)


        break
    glass = CorVisionGlass.objects.filter(CorVision=pk).order_by('id')
    GlassSerializer = CorVisionGlassSerializer(glass, many=True)
    Glassserializer_data=GlassSerializer.data
        #print(Glassserializer_data)

    

    for glass in Glassserializer_data:
            #print(profile['fromula'])
            if(wd=='2'):
                initial_gl1_width=0
                initial_gl1_height=0
                initial_gl2_width=0
                initial_gl2_height=0
                name=glass['CodeName']
                #print(name)
                #formula=shut['formula']
                if(name=='gls1'):
                    initial_gl1_width=glass['Widthformula']
                    initial_gl1_height=glass['Heightformula']
                    final_gl1_width=initial_gl1_width.replace('dim2', "dim2")
                    final_gl1_height=initial_gl1_height.replace('h', "h")
                    gl1_w=eval(final_gl1_width)
                    gl1_h=eval(final_gl1_height)
                    gl1_title=glass['title']
                    #print(dim1)
                elif(name=='gls2'):
                    initial_gl2_width=glass['Widthformula']
                    #print(initial_sh2_width)
                    initial_gl2_height=glass['Heightformula']
                    #print(initial_gl2_width)
                    final_gl2_width=initial_gl2_width.replace('dim1', "dim1")
                    final_gl2_height=initial_gl2_height.replace('h', "h")
                    gl2_w=eval(final_gl2_width)
                    gl2_h=eval(final_gl2_height) 
                    gl2_title=glass['title']
    glass_data=[gl1_title,"%.2f" %gl1_w,"%.2f" %gl1_h,gl2_title,"%.2f" %gl2_w,"%.2f" %gl2_h,dim1,dim2]
    #final_glass_data.append(gasket_data)  

    json_data = JSONRenderer().render(final_profile_data)
    return HttpResponse(json_data, content_type='application/json')





@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_InterLockAcc(request):
    #Dimension Calculation
    dim1=0
    dim2=0
    dim3=0
    dim4=0
    dim5=0
   
    dimh=0
    sh1_w=0
    sh1_h=0
    sh2_w=0
    sh2_h=0
    gl1_w=0
    gl1_h=0
    gl2_w=0
    gl2_h=0
    dimh=0
    final_profile_data=[]
    final_profile_data_new=[]
    requestdata=request.data
    final_glass_data=[]
    pk=int(requestdata['id']) 
    w=float(requestdata['width'])
    h=float(requestdata['height'])
    wind=float(requestdata['wp']) 
    
    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']

    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data
    for dim in DIMserializer_data:
                #print(profile['fromula'])
        if(wd<='5'):
            initial_dim1=0
            initial_dim2=0
            initial_dim3=0
            initial_dim4=0
            initial_dim5=0
            dim_height=0
            dim_height_formula=0
            
            name=dim['CodeName']
       
            formula=dim['formula']
                #print(formula)
            if(name=='dim1'):
                dim_height_formula=dim['heightFormula']
                dim_height=dim_height_formula.replace('h','h')
                
                dimh=(eval(dim_height)/1000)
                dim1=eval(dim_height)
                #print(dimh)
                initial_dim1=dim['formula']
                final_dim1=initial_dim1.replace('w', "w")
                dim1=eval(final_dim1)
        
            elif(name=='dim2'):
                initial_dim2=dim['formula']
                        #print(dim1)
                        #print(initial_dim2)
                final_dim2=initial_dim2.replace('dim1', "dim1")
                final_dim2=final_dim2.replace('w', "w")
                dim2=eval(final_dim2)

            elif(name=='dim3'):
                initial_dim3=dim['formula']

                final_dim3=initial_dim3.replace('dim1', "dim1")
                final_dim3=final_dim3.replace('dim2', "dim2")
                final_dim3=final_dim3.replace('w', "w")
                dim3=eval(final_dim3)

            elif(name=='dim4'):
                initial_dim4=dim['formula']
                final_dim4=initial_dim4.replace('dim1', "dim1")
                final_dim4=final_dim4.replace('dim2', "dim2")
                final_dim4=final_dim4.replace('dim3', "dim3")
                final_dim4=final_dim4.replace('w', "w")
                dim4=eval(final_dim4)

            elif(name=='dim5'):
                initial_dim5=dim['formula']
                final_dim5=initial_dim5.replace('dim1', "dim1")
                final_dim5=final_dim5.replace('dim2', "dim2")
                final_dim5=final_dim5.replace('dim3', "dim3")
                final_dim5=final_dim5.replace('dim4', "dim4")
                final_dim5=final_dim5.replace('w', "w")
                dim5=eval(final_dim5)
   
    #print(dim1)
    #print(dim2)


    interLock = CorVisionInterLock.objects.filter(CorVision=pk)
    GlassSerializer = CorVisionInterLockSerializer(interLock, many=True)
    InterLockserializer_data=GlassSerializer.data


    interLockAcc = CorVisionInterLockAcc.objects.filter(CorVision=pk)
    interLockAccSerializer = CorVisionInterLockAccSerializer(interLockAcc, many=True)
    interLockAccSerializer_data=interLockAccSerializer.data
  
    if(wd<='5'):
        dimw=(max(dim1,dim2,dim3,dim4,dim5))/1000
    for inter in InterLockserializer_data:
        #print("fsdfsd")
        last_acc=0
        pair=1
        inter_formula=maximum_value=minimum_value=0
        inter_formula=inter['formula']
        
        wind_pressure=inter_formula.replace('wp',"wind")
        dim_width=wind_pressure.replace('dimw',"dimw")
        dim_height=dim_width.replace('dimh',"dimh")
        # #print(dim_height)
        final_value=eval(dim_height)
        #print(final_value)
        # if(final_value > inter['minimum'] and final_value < inter['maximum']):
        #     print("i have something")
        for profiles in InterLockserializer_data:
            if(final_value > int(profiles['minimum']) and final_value <= int(profiles['maximum'])):
                #print("i have something")
                #print(profiles['title'])

                
                for interlockacc in interLockAccSerializer_data:
                    
                    #print(interlockacc['CorVisionItemAcc']['id'])
                    if(profiles['CorVisionItem']['id']==interlockacc['CorVisionItemProfile']['id']):
                        #print(interlockacc['CorVisionItemAcc']['id'])
                            print(interlockacc['CorVisionItemProfile']['id']) 
                        #if(interlockacc['CorVisionItemProfile']['id']!=last_acc):

                            formula=interlockacc['formula']
                            fix_width=formula.replace('w', "w")
                            dimen1=fix_width.replace('dim1','dim1')
                            dimen2=dimen1.replace('dim2','dim2')
                            dimen3=dimen2.replace('dim3','dim3')
                            dimen4=dimen3.replace('dim4','dim4')
                            dimen5=dimen4.replace('dim5','dim5')
                        
                            fix_height_profile=dimen5.replace('h', "h")

                            final_formula_profile=fix_height_profile

                            profile_data=[interlockacc['CorVisionItemAcc']['itemcode'],interlockacc['CorVisionItemAcc']['name'],interlockacc['title'],"%.2f" %eval(final_formula_profile),interlockacc['quantity'],interlockacc['cutting'],interlockacc['coating'],interlockacc['remark'],interlockacc['CorVisionItemAcc']['unit'],interlockacc['CorVisionItemProfile']['id']]
                            
                            # if(interlockacc['pair']==pair):
                            #     None
                            # else:
                            if(profiles['pair']==interlockacc['pair']):
                                final_profile_data.append(profile_data)
                                if(requestdata['status']=='1'):
                                    FinalReleasedWindowInterLockACC.objects.create(
                                    FReleasedWindowInterA=FinalReleasedWindow.objects.get(id=int(requestdata['released'])),
                                    FReleasedWindowInterAcc=Item.objects.get(id=int(interlockacc['CorVisionItemAcc']['id'])),
                                    description=interlockacc['title'],
                                    quantity=eval(final_formula_profile),
                                    cutting=interlockacc['cutting'],
                                    coating=interlockacc['coating'],
                                    status='4',
                                    remark=interlockacc['remark']
                                    )
                            # pair=interlockacc['pair']


        break

    json_data = JSONRenderer().render(final_profile_data)
    return HttpResponse(json_data, content_type='application/json')


##update window status
@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def UpdateWindowStatus(request,pk):
    if request.method == "GET":
    #requestdata=request.data
        update_released_window=ReleasedWindow.objects.get(id=pk)
            #update_released_window.status=2
        update_released_window.status=WindowStatus.objects.get(id=3)
        update_released_window.save()
        update_released_window_profile=ReleasedWindowProfile.objects.filter(ReleasedWindowP=pk)
        for profile in update_released_window_profile:
                profile.status=3
                profile.save()
        return Response({'Message': 'Window Updated'}, status=201)
##for stock list no action required
@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def CORVCutting_Profile(request,pk,pk2):
    #requestdata=request.data
    
    if request.method == "GET":
        if(pk2==2):
            final_profile_data=[]
            final_bar_data=[]
            dim1=0
            dim2=0
            final_acc_data=[]
            #pk=10
            
            w=2000
            h=3000
            profile_data=[]
            # dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
            # DIMserializer = CorVisionDIMSerializer(dim, many=True)
            # DIMserializer_data=DIMserializer.data
            # for dim in DIMserializer_data:
            #         #print(profile['fromula'])
            #     initial_dim1=0
            #     initial_dim2=0
            #     dim_height=0
            #     dim_height_formula=0
                
            #     name=dim['CodeName']
            #             #print(name)
            #     formula=dim['formula']
            #         #print(formula)
            #     if(name=='dim1'):
            #         dim_height_formula=dim['heightFormula']
            #         dim_height=dim_height_formula.replace('h','h')
                    
            #         dimh=(eval(dim_height)/1000)
            #         dim1=eval(dim_height)
            #         #print(dimh)
            #         initial_dim1=dim['formula']
            #         final_dim1=initial_dim1.replace('w', "w")
            #         dim1=eval(final_dim1)
            #                 #print(dim1)
            #     elif(name=='dim2'):
            #         initial_dim2=dim['formula']

            #         final_dim2=initial_dim2.replace('dim1', "dim1")
            #         dim2=eval(final_dim2)


            



            allprofiles = ReleasedWindowProfile.objects.filter(Releasedprofileproject=pk,status=1)
            serializer = ReleaseWindowProfileSerializer(allprofiles, many=True)

            if not allprofiles:
            #serialize_data=serializer.data
                return Response({'Message': 'Data not available to create MTO'}, status=202)

            creatingmto=  MTO.objects.create(
                    title='Profile MTO',
                    MTOType=MTOType.objects.get(id=1),
                    projectmto=Project.objects.get(id=pk),
                    description='A profile MTO',
                    revision=1,
                    extra=0,
                    copy=0,
                    status=1,
                    submital=0
                )
            serialize_data = sorted(
                serializer.data, key=lambda k: k['cutlength'], reverse=True)


            uniqueserializer = CorVisionReleasedProfileShortSerializer(allprofiles, many=True)
            
            unique_values = set(chain.from_iterable(d.values() for d in uniqueserializer.data))
            
            for value in unique_values:
                total_bar=0
                balance=0
                all_balance=[]
                all_balance_copy=[]
                bar_length=6500
                cut_qty=0
                for profile in serialize_data:
                    #print(profile)
                    cut_qty=0

                    if(profile['ReleasedWindowPItem']['id']==value):
                        #,Window=profile['ReleasedWindowP']['id']
                        WindowData = ReleasedWindow.objects.get(id=profile['ReleasedWindowP']['id'])
                        ShortWindowSerializer = ReleaseWindowShortSerializer(WindowData)
                        #print(WindowSerializer.data)
                        

                        wqty=ShortWindowSerializer.data['quantity']
                        
                        cut_qty=int(profile['quantity'])*int(wqty)
                        if(value==99):
                                print(cut_qty)
                        if(len(all_balance)<=0):
                            #cut_qty=int(profile['quantity'])-1
                            cut_qty=cut_qty-1
                            if(value==99):
                                print(cut_qty)
                            balance=bar_length-profile['cutlength']
                            if(value==99):
                                print(profile['cutlength'])
                            total_bar=total_bar+1
                            if(value==99):
                                
                                print("total bar  "+str(total_bar))
                            all_balance.append(balance)
                            if(value==99):
                                print(all_balance)


                        #add new




                        while(cut_qty>0):
                                    #if(profile['ReleasedWindowPItem']['itemcode']=='772854'):
                            matching_number=next((f for f in all_balance if profile['cutlength'] <= f),None)
                            if(value==99):
                                 print(profile['cutlength'])
                                # print("Matching Number")
                                # print(matching_number)
                            if(matching_number):
                                cut_qty=cut_qty-1
                                if(value==99):
                                    print(cut_qty)
                                #balance=profile['cutlength']-matching_number
                                balance=matching_number-profile['cutlength']
                                if(value==99):
                                    print(all_balance)
                                all_balance.remove(matching_number)
                                all_balance.append(balance)
                                if(value==99):
                                    print(all_balance)
                            else:
                                cut_qty=cut_qty-1
                                if(value==99):
                                    print(cut_qty)
                                total_bar=total_bar+1
                                if(value==99):
                                    
                                    print("total bar "+str(total_bar))
                                balance=bar_length-profile['cutlength']
                                all_balance.append(balance)
                                if(value==99):
                                    print(all_balance)


                        #profile_data=[profile['ReleasedWindowPItem']['itemcode'],profile['ReleasedWindowPItem']['name'],profile['ReleasedWindowPItem']['length'],total_bar,profile['ReleasedWindowPItem']['finishing']]
                
                if(value==99):
                    print("Final total bar "+str(total_bar))
                mtoitems=MTOItem.objects.create(
                        mto=MTO.objects.get(id=creatingmto.id),
                        itemname=Item.objects.get(id=value),
                        quantity=total_bar,
                        extra_quantity=1,
                        revision=1,
                        color='MF',
                        status=1,
                        assigned=1,
                        cart=1,
                        remarks='Nill'
                )


                # stock_issuing=Stock_issuing.objects.get(id=item_issued_id)
                # stock_issuing.balance=int(balance)-int(quantity)
                # stock_issuing.revoke=int(quantity)+int(stock_issuing.revoke)
                # stock_issuing.save()
                # item = Stock.objects.get(item=item_id)
                # serializer = StockQTYSerializer(item)
                # stock_qty=serializer.data['quantity']
                # item.quantity=int(stock_qty)+int(quantity)
                # item.save()
            #final_bar_dataa=[]
            #json_data = JSONRenderer().render(final_bar_data)
            #return HttpResponse(json_data, content_type='application/json')
            update_released_window=ReleasedWindow.objects.filter(Windowproject=pk,status=1)
            #update_released_window.status=2
            for object in update_released_window:
                object.status=WindowStatus.objects.get(id=2)
                object.save()
            update_released_window_profile=ReleasedWindowProfile.objects.filter(Releasedprofileproject=pk,status=1)
            for profile in update_released_window_profile:
                profile.status=2
                profile.save()
            return Response({'Message': 'MTO Generated successfully'}, status=201)
        else:
            final_profile_data=[]
            final_bar_data=[]
            dim1=0
            dim2=0
            final_acc_data=[]
            #pk=10
            
            w=2000
            h=3000
            profile_data=[]
            

            allprofiles = FinalReleasedWindowProfile.objects.filter(Releasedprofileproject=pk,status=4)
            serializer = ReleaseWindowProfileSerializer(allprofiles, many=True)
            #serialize_data=serializer.data


            if not allprofiles:
            #serialize_data=serializer.data
                return Response({'Message': 'Data not available to create MTO'}, status=203)
            
            createstocklist=StockList.objects.create(
                        ProjectStockList=Project.objects.get(id=pk),
                        Type=MTOType.objects.get(id=1),
                        title='Stock List'
                )
            serialize_data = sorted(
                serializer.data, key=lambda k: k['cutlength'], reverse=True)


            uniqueserializer = CorVisionReleasedProfileShortSerializer(allprofiles, many=True)
            
            unique_values = set(chain.from_iterable(d.values() for d in uniqueserializer.data))
            
            for value in unique_values:
                total_bar=0
                balance=0
                all_balance=[]
                all_balance_copy=[]
                bar_length=6500
                cut_qty=0
                
                for profile in serialize_data:
                    #print(profile)
                    cut_qty=0

                    if(profile['FReleasedWindowPItem']['id']==value):
                        #,Window=profile['ReleasedWindowP']['id']
                        WindowData = FinalReleasedWindow.objects.get(id=profile['FReleasedWindowP']['id'])
                        ShortWindowSerializer = ReleaseWindowShortSerializer(WindowData)
                        #print(WindowSerializer.data)
                        wqty=ShortWindowSerializer.data['quantity']
                        cut_qty=int(profile['quantity'])*int(wqty)
                        if(len(all_balance)<=0):
                    
                            # cut_qty=int(profile['quantity'])-1   
                            # balance=bar_length-profile['cutlength']
                            # total_bar=total_bar+1
                            # all_balance.append(balance)

                            cut_qty=cut_qty-1   
                            balance=bar_length-profile['cutlength']
                            total_bar=total_bar+1
                            all_balance.append(balance)

                
                        while(cut_qty>0):
                                    #if(profile['ReleasedWindowPItem']['itemcode']=='772854'):
                            # matching_number=next((f for f in all_balance if profile['cutlength'] <= f),None)
                            # if(matching_number):
                            #     cut_qty=cut_qty-1
                            #     balance=profile['cutlength']-matching_number
                                            
                            #     all_balance.remove(matching_number)
                            #     all_balance.append(balance)



                            matching_number=next((f for f in all_balance if profile['cutlength'] <= f),None)
                            if(matching_number):
                                cut_qty=cut_qty-1
                                balance=matching_number-profile['cutlength']
                                            
                                all_balance.remove(matching_number)
                                all_balance.append(balance)
                            else:
                                cut_qty=cut_qty-1
                                total_bar=total_bar+1
                                balance=bar_length-profile['cutlength']
                                all_balance.append(balance)
                    
                stockitems=StockListItem.objects.create(
                        StockListID=StockList.objects.get(id=createstocklist.id),
                        StockListItem=Item.objects.get(id=value),
                        quantity=total_bar
                )
                # profile_datas=[]
                # final_bar_data.append(profile_data)

            update_released_window=FinalReleasedWindow.objects.filter(FWindowproject=pk,status=4)
            #update_released_window.status=2
            for object in update_released_window:
                object.status=WindowStatus.objects.get(id=5)
                object.save()
            update_released_window_profile=FinalReleasedWindowProfile.objects.filter(Releasedprofileproject=pk,status=4)
            for profile in update_released_window_profile:
                profile.status=5
                profile.save()
            return Response({'Message': 'StockList Generated successfully'}, status=204)
            # final_bar_dataa=[]
            # json_data = JSONRenderer().render(final_bar_data)
            # return HttpResponse(json_data, content_type='application/json')
    



##fetching window details no action required
@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def CORVision(request,pk):
    requestdata=request.data
    if request.method == "GET":
        final_profile_data=[]
        final_acc_data=[]
        #pk=int(requestdata['id'])
        
        # w=int(requestdata['width'])
        # h=int(requestdata['height']) 
      

        CorData = CORVISION.objects.get(id=pk)
        Corserializer = CorVisionSerializer(CorData)
        
        
    json_data = JSONRenderer().render(Corserializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def CORVisionWindows(request):
    if request.method == "GET":
        CorData = CORVISION.objects.all()
        Corserializer = CorVisionSerializer(CorData,many=True)
        
    json_data = JSONRenderer().render(Corserializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetFloor(request,pk):
    if request.method == "GET":
        FloorData = Floor.objects.filter(projectfloor=pk)
        Floorserializer = FloorSerializer(FloorData,many=True)
        
        
    json_data = JSONRenderer().render(Floorserializer.data)
    return HttpResponse(json_data, content_type='application/json')




@csrf_exempt
@api_view(['POST'])
def SaveFloor(request):
    if request.method == "POST":
        serializer = FloorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetElevation(request,pk,pk2):
    if request.method == "GET":
        ElevationData = Elevation.objects.filter(ElevationProject=pk,floorelevation=pk2)
        Elevationserializer = ElevationSerializer(ElevationData,many=True)
        
        
    json_data = JSONRenderer().render(Elevationserializer.data)
    return HttpResponse(json_data, content_type='application/json')




@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetSingleFloor(request,pk):
    if request.method == "GET":
        FloorData = Floor.objects.get(id=pk)
        Floorserializer = FloorSerializer(FloorData)
        
        
    json_data = JSONRenderer().render(Floorserializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetLock(request):
    if request.method == "GET":
        LockData = Lock.objects.all()
        Lockserializer = LockSerializer(LockData, many=True)
        
    json_data = JSONRenderer().render(Lockserializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetSingleLock(request,pk):
    if request.method == "GET":
        LockData = Lock.objects.get(id=pk)
        Lockserializer = LockSerializer(LockData)
        
    json_data = JSONRenderer().render(Lockserializer.data)
    return HttpResponse(json_data, content_type='application/json')




@csrf_exempt
@api_view(['POST'])
def ReleaseWindow(request):
    if request.method == "POST":
        window=request.data['FWindow']
        CorData = CORVISION.objects.get(id=window)
        Corserializer = CorVisionSerializer(CorData)
        if(Corserializer.data['status']=='3'):
            

            if int(request.data['dim1']) !=0 and int(request.data['dim2']) !=0 and int(request.data['dim3'])==0:
                dim1=int(request.data['dim1'])
                dim2=int(request.data['dim2'])

                serializer = FinalReleasedCustomDimSerializer(data=request.data)
                
                if serializer.is_valid():

                    serializer.save()
                #print("in two")
            elif int(request.data['dim1']) !=0 and int(request.data['dim2']) !=0 and int(request.data['dim3']) !=0:
                dim1=int(request.data['dim1'])
                dim2=int(request.data['dim2'])
                dim3=int(request.data['dim3'])
                serializer = FinalReleasedCustomDimSerializer(data=request.data)
                
                if serializer.is_valid():
                    serializer.save()
                #print("in three")
            else:
                return JsonResponse({'Key':'error'})
            


        serializer = ReleaseWindowsaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
@api_view(['POST'])
def ReleaseWindowCustomDim(request):
    if request.method == "POST":
        serializer = FinalReleasedCustomDimSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def FloorWindows(request,pk,pk2):
    if request.method == "GET":
        WindowData = FinalReleasedWindow.objects.filter(FWindowproject=pk,FWindowfloor=pk2)
        Lockserializer = ReleaseWindowSerializer(WindowData, many=True)
        
    json_data = JSONRenderer().render(Lockserializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def SingleWindowData(request,pk):
    if request.method == "GET":
        WindowData = FinalReleasedWindow.objects.get(id=pk)
        WindowSerializer = ReleaseWindowSerializerDepth(WindowData)
        
    json_data = JSONRenderer().render(WindowSerializer.data)
    return HttpResponse(json_data, content_type='application/json')

#details of window begin


#released Window Short

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def ReleasedWindowDataShort(request,pk):
    if request.method == "GET":
        WindowData = ReleasedWindow.objects.filter(Windowproject=pk,status=1)
        WindowSerializer = ReleaseWindowShortSerializer(WindowData, many=True)
        
    json_data = JSONRenderer().render(WindowSerializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowData(request,pk):
    if request.method == "GET":
        WindowData = FinalReleasedWindowProfile.objects.filter(FReleasedWindowP=pk)
        Lockserializer = ReleaseWindowProfileSerializer(WindowData, many=True)
        
    json_data = JSONRenderer().render(Lockserializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataInterlock(request,pk):
    if request.method == "GET":
        Interlock = FinalReleasedWindowInterLock.objects.filter(FReleasedWindowInter=pk)
        Interlockserializer = ReleaseWindowInterLockSerializer(Interlock, many=True)
        
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataAcc(request,pk):
    if request.method == "GET":
        Interlock = FinalReleasedWindowACC.objects.filter(FReleasedWindowA=pk)
        Interlockserializer = ReleaseWindowACCSerializer(Interlock, many=True)
        
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')




@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataAccInterlock(request,pk):
    if request.method == "GET":
        Interlock = FinalReleasedWindowInterLockACC.objects.filter(FReleasedWindowInterA=pk)
        Interlockserializer = ReleaseWindowInterlockACCSerializer(Interlock, many=True)
        
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')




@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataGasket(request,pk):
    if request.method == "GET":
        Interlock = FinalReleasedWindowGasket.objects.filter(FReleasedWindowG=pk)
        Interlockserializer = ReleaseWindowGasketSerializer(Interlock, many=True)
        
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')





@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataScrew(request,pk):
    if request.method == "GET":
        Interlock = FinalReleasedWindowScrew.objects.filter(FReleasedWindowS=pk)
        Interlockserializer = ReleaseWindowScrewSerializer(Interlock, many=True)
        
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')




@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataPacking(request,pk):
    if request.method == "GET":
        Interlock = FinalReleasedWindowPacking.objects.filter(FReleasedWindowPacking=pk)
        Interlockserializer = ReleaseWindowPackingSerializer(Interlock, many=True)
        
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')





@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataGlass(request,pk):
    if request.method == "GET":
        Interlock = FinalReleasedWindowGlass.objects.filter(FReleasedWindowGlass=pk)
        Interlockserializer = ReleaseWindowGlassSerializer(Interlock, many=True)
        
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')


#edit data Controls


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def GetSingleProfile(request,pk):
    if request.method == "GET":
        WindowData = CorVisionProfile.objects.get(id=pk)
        Lockserializer = CorVisionProfileSerializer(WindowData)
        
    json_data = JSONRenderer().render(Lockserializer.data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateCorProfile(request):
    
    data=request.data
    item = CorVisionProfile.objects.get(id=data['id'])
    item.title=data['title']
    item.CorVisionItem=Item.objects.get(id=data['itempr'])
    item.formula=data['formula']
    item.cutting=data['cutting']
    item.coating=data['coating']
    item.remark=data['remark']

        #     title = models.CharField(max_length=100,default='COR')
        # CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVision')
        # CorVisionItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionItem')
        # quantity=models.CharField(max_length=100, default='1')
        # formula=models.CharField(max_length=200)
        # cutting=models.CharField(max_length=200,default='45')
        # coating=models.CharField(max_length=200,default='NA')
        # remark=models.CharField(max_length=200,default='NA')
    # r_quantity=int(data['restore'])
    # serializer = StockAvalibilitySerializer(item)
    
    # a_quantity=int(serializer['quantity'].value)
    # # #r_quantity=1
    # if r_quantity<=a_quantity:
    #     new_qty=a_quantity-r_quantity
        
    #     item.quantity=new_qty
    # #   item.stockvalue=new_qty
    #     #item.save()

    #     item = Stock_issuing.objects.get(id=data['issue_id'])
    #     serializer = StockIssuingSaveSerializer(item)
    # #         #item.quantity=to_assign
    #     item.balance=item.balance + r_quantity
    #     item.revoke=item.revoke - r_quantity
    #     item.restore=r_quantity
    # #         item.quantity=item.quantity+r_quantity
    # #         item.total=0
    # #         item.save()
    # #return JsonResponse(serializer.data, status=201)
    item.save()
    return JsonResponse(data,status=201)
    # else:
    #     return Response({"message":"500"})
 