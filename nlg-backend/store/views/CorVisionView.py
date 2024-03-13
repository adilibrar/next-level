from django.shortcuts import render
from store.models import Item,MTO,Project,WindowStatus,StockList,StockListItem,FinalReleasedWindowInterLock,FinalReleasedWindow,ReleasedCustomDim,MTOItem,MTOType,ReleasedWindow,FinalReleasedWindowProfile,ReleasedWindowCustomShutter,ReleasedWindowProfile,ReleasedWindowACC,ReleasedWindowInterLockACC,ReleasedWindowGasket,ReleasedWindowScrew,ReleasedWindowPacking,ReleasedWindowGlass,ReleasedWindowInterLock,Floor,Lock,Elevation,CorVisionProfile,CORVISION,CorVisionInterLockAcc,CorVisionDIM,CorVisionShutter,CorVisionGlass,CorVisionAcc,CorVisionGasket,CorScrew,CorPacking,CorVisionInterLock
from store.Serializations.CorVisionSerializer import CorVisionProfileSerializer,FinalReleasedCustomShutterSerializer,FinalCorVisioninterProfileShortSerializer,ReleasedCustomShutterSerializer,FinalReleaseWindowInterProfileSerializer,CorVisionInterProfileShortSerializer,GetReleasedCustomDimSerializer,FinalCorVisionReleasedProfileShortSerializer,ReleasedCustomDimSerializer,FinalReleaseWindowProfileSerializer,ReleaseWindowShortSerializer,FinalReleaseWindowShortSerializer,CorVisionReleasedProfileShortSerializer,ReleaseWindowACCSerializer,ReleaseWindowSerializerDepth,ReleaseWindowPackingSerializer,ReleaseWindowGlassSerializer,ReleaseWindowGasketSerializer,ReleaseWindowScrewSerializer,ReleaseWindowInterlockACCSerializer,ReleaseWindowsaveSerializer,ReleaseWindowInterLockSerializer,ReleaseWindowProfileSerializer,ReleaseWindowSerializer,FloorSerializer,LockSerializer,ElevationSerializer,CorVisionInterLockAccSerializer,CorVisionInterLockSerializer,CorVisionProfileShortSerializer,CorVisionPackingSerializer,CorVisionScrewSerializer,CorVisionSerializer,CorVisionDIMSerializer,CorVisionShutterSerializer,CorVisionGlassSerializer,CorVisionAccSerializer,CorVisionGasketSerializer
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
        CorData = CORVISION.objects.get(id=pk)
        Corserializer = CorVisionSerializer(CorData)
        wd=Corserializer.data['wd']
        projects = CorVisionProfile.objects.filter(CorVision=pk)
        serializer = CorVisionProfileSerializer(projects, many=True)
        serialize_data=serializer.data
        dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
        DIMserializer = CorVisionDIMSerializer(dim, many=True)
        DIMserializer_data=DIMserializer.data
        WindowStatus=ReleasedWindow.objects.get(id=int(requestdata['released']))
        Wserializer = ReleaseWindowSerializer(WindowStatus)
        if(Wserializer.data['Window']['status']=='4'):
            #print(requestdata)
            if (int(wd)<=6):
                #d1s1w,d1s1h,d1s2w,d1s2h,d2s1w,d2s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s1w']),float(requestdata['d2s1h'])
                d1s1w, d1s1h, d2s1w, d2s1h, d3s1w, d3s1h, d4s1w, d4s1h, d5s1w, d5s1h, d6s1w, d6s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d2s1w']),float(requestdata['d2s1h']),float(requestdata['d3s1w']),float(requestdata['d3s1h']),float(requestdata['d4s1w']),float(requestdata['d4s1h']),float(requestdata['d5s1w']),float(requestdata['d5s1h']),float(requestdata['d6s1w']),float(requestdata['d6s1h'])
                d1s2w, d1s2h, d2s2w, d2s2h, d3s2w, d3s2h, d4s2w, d4s2h, d5s2w, d5s2h, d6s2w, d6s2h=float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s2w']),float(requestdata['d2s2h']),float(requestdata['d3s2w']),float(requestdata['d3s2h']),float(requestdata['d4s2w']),float(requestdata['d4s2h']),float(requestdata['d5s2w']),float(requestdata['d5s2h']),float(requestdata['d6s2w']),float(requestdata['d6s2h'])
                d1s3w, d1s3h, d2s3w, d2s3h, d3s3w, d3s3h, d4s3w, d4s3h, d5s3w, d5s3h, d6s3w, d6s3h=float(requestdata['d1s3w']),float(requestdata['d1s3h']),float(requestdata['d2s3w']),float(requestdata['d2s3h']),float(requestdata['d3s3w']),float(requestdata['d3s3h']),float(requestdata['d4s3w']),float(requestdata['d4s3h']),float(requestdata['d5s3w']),float(requestdata['d5s3h']),float(requestdata['d6s3w']),float(requestdata['d6s3h'])
                d1s4w, d1s4h, d2s4w, d2s4h, d3s4w, d3s4h, d4s4w, d4s4h, d5s4w, d5s4h, d6s4w, d6s4h=float(requestdata['d1s4w']),float(requestdata['d1s4h']),float(requestdata['d2s4w']),float(requestdata['d2s4h']),float(requestdata['d3s4w']),float(requestdata['d3s4h']),float(requestdata['d4s4w']),float(requestdata['d4s4h']),float(requestdata['d5s4w']),float(requestdata['d5s4h']),float(requestdata['d6s4w']),float(requestdata['d6s4h'])
                d1s5w, d1s5h, d2s5w, d2s5h, d3s5w, d3s5h, d4s5w, d4s5h, d5s5w, d5s5h, d6s5w, d6s5h=float(requestdata['d1s5w']),float(requestdata['d1s5h']),float(requestdata['d2s5w']),float(requestdata['d2s5h']),float(requestdata['d3s5w']),float(requestdata['d3s5h']),float(requestdata['d4s5w']),float(requestdata['d4s5h']),float(requestdata['d5s5w']),float(requestdata['d5s5h']),float(requestdata['d6s5w']),float(requestdata['d6s5h'])
                d1s6w, d1s6h, d2s6w, d2s6h, d3s6w, d3s6h, d4s6w, d4s6h, d5s6w, d5s6h, d6s6w, d6s6h=float(requestdata['d1s6w']),float(requestdata['d1s6h']),float(requestdata['d2s6w']),float(requestdata['d2s6h']),float(requestdata['d3s6w']),float(requestdata['d3s6h']),float(requestdata['d4s6w']),float(requestdata['d4s6h']),float(requestdata['d5s6w']),float(requestdata['d5s6h']),float(requestdata['d6s6w']),float(requestdata['d6s6h'])            
                w=int(requestdata['width'])
                h=int(requestdata['height'])
                for profile in serialize_data:        
                    formula=profile['formula']
                    #print(eval(formula))
                    #final_formula=eval(formula)
                    profile_data=[profile['CorVisionItem']['itemcode'],profile['CorVisionItem']['name'],profile['title'],"%.2f" %eval(formula),profile['quantity'],profile['cutting'],profile['coating'],profile['remark'],profile['CorVisionItem']['unit']]
                    if(requestdata['status']=='1'):      
                        ReleasedWindowProfile.objects.create(
                            ReleasedWindowP=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                            ReleasedWindowPItem=Item.objects.get(id=int(profile['CorVisionItem']['id'])),
                            description=profile['title'],
                            cutlength=round(eval(formula),2),
                            quantity=profile['quantity'],
                            cutting=profile['cutting'],
                            coating=profile['coating'],
                            remark=profile['remark'],
                            Releasedprofileproject=Project.objects.get(id=int(project_id))
                            )
                    final_profile_data.append(profile_data)  
                json_data = JSONRenderer().render(final_profile_data)
                return HttpResponse(json_data, content_type='application/json')
               
        else:
            if(Wserializer.data['Window']['status']=='3' and wd=='99'):
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
                    ReleasedWindowProfile.objects.create(
                        ReleasedWindowP=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                        ReleasedWindowPItem=Item.objects.get(id=int(profile['CorVisionItem']['id'])),
                        description=profile['title'],
                        cutlength=round(eval(final_formula),2),
                        quantity=profile['quantity'],
                        cutting=profile['cutting'],
                        coating=profile['coating'],
                        remark=profile['remark'],
                        Releasedprofileproject=Project.objects.get(id=int(project_id))
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
    WindowStatus=ReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)
    ##end of customized dim
    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data
    if(Wserializer.data['Window']['status']=='4'):
            if (int(wd)<=6):
                #d1s1w,d1s1h,d1s2w,d1s2h,d2s1w,d2s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s1w']),float(requestdata['d2s1h'])
                d1s1w, d1s1h, d2s1w, d2s1h, d3s1w, d3s1h, d4s1w, d4s1h, d5s1w, d5s1h, d6s1w, d6s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d2s1w']),float(requestdata['d2s1h']),float(requestdata['d3s1w']),float(requestdata['d3s1h']),float(requestdata['d4s1w']),float(requestdata['d4s1h']),float(requestdata['d5s1w']),float(requestdata['d5s1h']),float(requestdata['d6s1w']),float(requestdata['d6s1h'])
                d1s2w, d1s2h, d2s2w, d2s2h, d3s2w, d3s2h, d4s2w, d4s2h, d5s2w, d5s2h, d6s2w, d6s2h=float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s2w']),float(requestdata['d2s2h']),float(requestdata['d3s2w']),float(requestdata['d3s2h']),float(requestdata['d4s2w']),float(requestdata['d4s2h']),float(requestdata['d5s2w']),float(requestdata['d5s2h']),float(requestdata['d6s2w']),float(requestdata['d6s2h'])
                d1s3w, d1s3h, d2s3w, d2s3h, d3s3w, d3s3h, d4s3w, d4s3h, d5s3w, d5s3h, d6s3w, d6s3h=float(requestdata['d1s3w']),float(requestdata['d1s3h']),float(requestdata['d2s3w']),float(requestdata['d2s3h']),float(requestdata['d3s3w']),float(requestdata['d3s3h']),float(requestdata['d4s3w']),float(requestdata['d4s3h']),float(requestdata['d5s3w']),float(requestdata['d5s3h']),float(requestdata['d6s3w']),float(requestdata['d6s3h'])
                d1s4w, d1s4h, d2s4w, d2s4h, d3s4w, d3s4h, d4s4w, d4s4h, d5s4w, d5s4h, d6s4w, d6s4h=float(requestdata['d1s4w']),float(requestdata['d1s4h']),float(requestdata['d2s4w']),float(requestdata['d2s4h']),float(requestdata['d3s4w']),float(requestdata['d3s4h']),float(requestdata['d4s4w']),float(requestdata['d4s4h']),float(requestdata['d5s4w']),float(requestdata['d5s4h']),float(requestdata['d6s4w']),float(requestdata['d6s4h'])
                d1s5w, d1s5h, d2s5w, d2s5h, d3s5w, d3s5h, d4s5w, d4s5h, d5s5w, d5s5h, d6s5w, d6s5h=float(requestdata['d1s5w']),float(requestdata['d1s5h']),float(requestdata['d2s5w']),float(requestdata['d2s5h']),float(requestdata['d3s5w']),float(requestdata['d3s5h']),float(requestdata['d4s5w']),float(requestdata['d4s5h']),float(requestdata['d5s5w']),float(requestdata['d5s5h']),float(requestdata['d6s5w']),float(requestdata['d6s5h'])
                d1s6w, d1s6h, d2s6w, d2s6h, d3s6w, d3s6h, d4s6w, d4s6h, d5s6w, d5s6h, d6s6w, d6s6h=float(requestdata['d1s6w']),float(requestdata['d1s6h']),float(requestdata['d2s6w']),float(requestdata['d2s6h']),float(requestdata['d3s6w']),float(requestdata['d3s6h']),float(requestdata['d4s6w']),float(requestdata['d4s6h']),float(requestdata['d5s6w']),float(requestdata['d5s6h']),float(requestdata['d6s6w']),float(requestdata['d6s6h'])
                
                w=int(requestdata['width'])
                h=int(requestdata['height'])
                for acc in accserialize_data:
                    formula=acc['formula']
                    final_formula=formula
                    acc_data=[acc['CorVisionItem']['itemcode'],acc['CorVisionItem']['name'],acc['title'],"%.2f" %eval(final_formula),acc['quantity'],acc['cutting'],acc['coating'],acc['remark'],acc['CorVisionItem']['unit']] 
                    if(requestdata['status']=='1'):      
                        ReleasedWindowACC.objects.create(
                        ReleasedWindowA=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                        ReleasedWindowAcc=Item.objects.get(id=int(acc['CorVisionItem']['id'])),
                        description=acc['title'],
                        quantity=eval(final_formula),
                        cutting=acc['cutting'],
                        coating=acc['coating'],
                        remark=acc['remark'],
                        ReleasedAccproject=Project.objects.get(id=int(project_id))
                        )  
                    final_acc_data.append(acc_data)  
                json_data = JSONRenderer().render(final_acc_data)
                return HttpResponse(json_data, content_type='application/json')
    else:
        if(Wserializer.data['Window']['status']=='3' and wd=='99'):
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
                    ReleasedWindowACC.objects.create(
                        ReleasedWindowA=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                        ReleasedWindowAcc=Item.objects.get(id=int(acc['CorVisionItem']['id'])),
                        description=acc['title'],
                        quantity=eval(final_formula),
                        cutting=acc['cutting'],
                        coating=acc['coating'],
                        remark=acc['remark'],
                        ReleasedAccproject=Project.objects.get(id=int(project_id))
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
    ##new dim data
    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']
    WindowStatus=ReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)
    gasket = CorVisionGasket.objects.filter(CorVision=pk)
    Gasketserializer = CorVisionGasketSerializer(gasket, many=True)
    gasketserialize_data=Gasketserializer.data
    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data
    if(Wserializer.data['Window']['status']=='4'):
            if (int(wd)<=6):
                #d1s1w,d1s1h,d1s2w,d1s2h,d2s1w,d2s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s1w']),float(requestdata['d2s1h'])
                d1s1w, d1s1h, d2s1w, d2s1h, d3s1w, d3s1h, d4s1w, d4s1h, d5s1w, d5s1h, d6s1w, d6s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d2s1w']),float(requestdata['d2s1h']),float(requestdata['d3s1w']),float(requestdata['d3s1h']),float(requestdata['d4s1w']),float(requestdata['d4s1h']),float(requestdata['d5s1w']),float(requestdata['d5s1h']),float(requestdata['d6s1w']),float(requestdata['d6s1h'])
                d1s2w, d1s2h, d2s2w, d2s2h, d3s2w, d3s2h, d4s2w, d4s2h, d5s2w, d5s2h, d6s2w, d6s2h=float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s2w']),float(requestdata['d2s2h']),float(requestdata['d3s2w']),float(requestdata['d3s2h']),float(requestdata['d4s2w']),float(requestdata['d4s2h']),float(requestdata['d5s2w']),float(requestdata['d5s2h']),float(requestdata['d6s2w']),float(requestdata['d6s2h'])
                d1s3w, d1s3h, d2s3w, d2s3h, d3s3w, d3s3h, d4s3w, d4s3h, d5s3w, d5s3h, d6s3w, d6s3h=float(requestdata['d1s3w']),float(requestdata['d1s3h']),float(requestdata['d2s3w']),float(requestdata['d2s3h']),float(requestdata['d3s3w']),float(requestdata['d3s3h']),float(requestdata['d4s3w']),float(requestdata['d4s3h']),float(requestdata['d5s3w']),float(requestdata['d5s3h']),float(requestdata['d6s3w']),float(requestdata['d6s3h'])
                d1s4w, d1s4h, d2s4w, d2s4h, d3s4w, d3s4h, d4s4w, d4s4h, d5s4w, d5s4h, d6s4w, d6s4h=float(requestdata['d1s4w']),float(requestdata['d1s4h']),float(requestdata['d2s4w']),float(requestdata['d2s4h']),float(requestdata['d3s4w']),float(requestdata['d3s4h']),float(requestdata['d4s4w']),float(requestdata['d4s4h']),float(requestdata['d5s4w']),float(requestdata['d5s4h']),float(requestdata['d6s4w']),float(requestdata['d6s4h'])
                d1s5w, d1s5h, d2s5w, d2s5h, d3s5w, d3s5h, d4s5w, d4s5h, d5s5w, d5s5h, d6s5w, d6s5h=float(requestdata['d1s5w']),float(requestdata['d1s5h']),float(requestdata['d2s5w']),float(requestdata['d2s5h']),float(requestdata['d3s5w']),float(requestdata['d3s5h']),float(requestdata['d4s5w']),float(requestdata['d4s5h']),float(requestdata['d5s5w']),float(requestdata['d5s5h']),float(requestdata['d6s5w']),float(requestdata['d6s5h'])
                d1s6w, d1s6h, d2s6w, d2s6h, d3s6w, d3s6h, d4s6w, d4s6h, d5s6w, d5s6h, d6s6w, d6s6h=float(requestdata['d1s6w']),float(requestdata['d1s6h']),float(requestdata['d2s6w']),float(requestdata['d2s6h']),float(requestdata['d3s6w']),float(requestdata['d3s6h']),float(requestdata['d4s6w']),float(requestdata['d4s6h']),float(requestdata['d5s6w']),float(requestdata['d5s6h']),float(requestdata['d6s6w']),float(requestdata['d6s6h'])
                
                w=int(requestdata['width'])
                h=int(requestdata['height'])
                for gasket in gasketserialize_data:
                    formula=gasket['formula']
                    final_formula=formula
                    gasket_data=[gasket['CorVisionItem']['itemcode'],gasket['CorVisionItem']['name'],gasket['title'],"%.2f" %eval(final_formula),gasket['quantity'],gasket['cutting'],gasket['coating'],gasket['remark']]    
                    if(requestdata['status']=='1'):      
                        ReleasedWindowGasket.objects.create(
                            ReleasedWindowG=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                            ReleasedWindowGasket=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                            description=gasket['title'],
                            cutlength=round(eval(final_formula),2),
                            quantity=gasket['quantity'],
                            cutting=gasket['cutting'],
                            coating=gasket['coating'],
                            remark=gasket['remark'],
                            ReleasedGasketroject=Project.objects.get(id=int(project_id))
                    )
                    final_gasket_data.append(gasket_data)  
                json_data = JSONRenderer().render(final_gasket_data)
                return HttpResponse(json_data, content_type='application/json')
            
    else:
        if(Wserializer.data['Window']['status']=='3' and wd=='99'):
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
    ##end of new dim data

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
                ReleasedWindowGasket.objects.create(
                            ReleasedWindowG=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                            ReleasedWindowGasket=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                            description=gasket['title'],
                            cutlength=round(eval(final_formula),2),
                            quantity=gasket['quantity'],
                            cutting=gasket['cutting'],
                            coating=gasket['coating'],
                            remark=gasket['remark'],
                            ReleasedGasketroject=Project.objects.get(id=int(project_id))
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
    ##new dim data
    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']

    ##validating customized dim
    WindowStatus=ReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)

    ##end of customized dim
    
    screw = CorScrew.objects.filter(CorVision=pk)
    Screwserializer = CorVisionScrewSerializer(screw, many=True)
    screwserialize_data=Screwserializer.data
    
    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data

    if(Wserializer.data['Window']['status']=='4'):
            if (int(wd)<=6):
                #d1s1w,d1s1h,d1s2w,d1s2h,d2s1w,d2s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s1w']),float(requestdata['d2s1h'])
                d1s1w, d1s1h, d2s1w, d2s1h, d3s1w, d3s1h, d4s1w, d4s1h, d5s1w, d5s1h, d6s1w, d6s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d2s1w']),float(requestdata['d2s1h']),float(requestdata['d3s1w']),float(requestdata['d3s1h']),float(requestdata['d4s1w']),float(requestdata['d4s1h']),float(requestdata['d5s1w']),float(requestdata['d5s1h']),float(requestdata['d6s1w']),float(requestdata['d6s1h'])
                d1s2w, d1s2h, d2s2w, d2s2h, d3s2w, d3s2h, d4s2w, d4s2h, d5s2w, d5s2h, d6s2w, d6s2h=float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s2w']),float(requestdata['d2s2h']),float(requestdata['d3s2w']),float(requestdata['d3s2h']),float(requestdata['d4s2w']),float(requestdata['d4s2h']),float(requestdata['d5s2w']),float(requestdata['d5s2h']),float(requestdata['d6s2w']),float(requestdata['d6s2h'])
                d1s3w, d1s3h, d2s3w, d2s3h, d3s3w, d3s3h, d4s3w, d4s3h, d5s3w, d5s3h, d6s3w, d6s3h=float(requestdata['d1s3w']),float(requestdata['d1s3h']),float(requestdata['d2s3w']),float(requestdata['d2s3h']),float(requestdata['d3s3w']),float(requestdata['d3s3h']),float(requestdata['d4s3w']),float(requestdata['d4s3h']),float(requestdata['d5s3w']),float(requestdata['d5s3h']),float(requestdata['d6s3w']),float(requestdata['d6s3h'])
                d1s4w, d1s4h, d2s4w, d2s4h, d3s4w, d3s4h, d4s4w, d4s4h, d5s4w, d5s4h, d6s4w, d6s4h=float(requestdata['d1s4w']),float(requestdata['d1s4h']),float(requestdata['d2s4w']),float(requestdata['d2s4h']),float(requestdata['d3s4w']),float(requestdata['d3s4h']),float(requestdata['d4s4w']),float(requestdata['d4s4h']),float(requestdata['d5s4w']),float(requestdata['d5s4h']),float(requestdata['d6s4w']),float(requestdata['d6s4h'])
                d1s5w, d1s5h, d2s5w, d2s5h, d3s5w, d3s5h, d4s5w, d4s5h, d5s5w, d5s5h, d6s5w, d6s5h=float(requestdata['d1s5w']),float(requestdata['d1s5h']),float(requestdata['d2s5w']),float(requestdata['d2s5h']),float(requestdata['d3s5w']),float(requestdata['d3s5h']),float(requestdata['d4s5w']),float(requestdata['d4s5h']),float(requestdata['d5s5w']),float(requestdata['d5s5h']),float(requestdata['d6s5w']),float(requestdata['d6s5h'])
                d1s6w, d1s6h, d2s6w, d2s6h, d3s6w, d3s6h, d4s6w, d4s6h, d5s6w, d5s6h, d6s6w, d6s6h=float(requestdata['d1s6w']),float(requestdata['d1s6h']),float(requestdata['d2s6w']),float(requestdata['d2s6h']),float(requestdata['d3s6w']),float(requestdata['d3s6h']),float(requestdata['d4s6w']),float(requestdata['d4s6h']),float(requestdata['d5s6w']),float(requestdata['d5s6h']),float(requestdata['d6s6w']),float(requestdata['d6s6h'])
                
                w=int(requestdata['width'])
                h=int(requestdata['height'])
                for gasket in screwserialize_data:
                    formula=gasket['formula']
                    final_formula=formula
                    gasket_data=[gasket['CorVisionItem']['itemcode'],gasket['CorVisionItem']['name'],gasket['title'],"%.2f" %eval(final_formula),gasket['quantity'],gasket['cutting'],gasket['coating'],gasket['remark']] 
                    ReleasedWindowScrew.objects.create(
                        ReleasedWindowS=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                        ReleasedWindowSc=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                        description=gasket['title'],
                        quantity=round(eval(final_formula),2),
                        coating=gasket['coating'],
                        remark=gasket['remark'],
                        ReleasedScrewproject=Project.objects.get(id=int(project_id))
                        
                        )
                    final_screw_data.append(gasket_data)  

                json_data = JSONRenderer().render(final_screw_data)
                return HttpResponse(json_data, content_type='application/json')
  
    else:
        if(Wserializer.data['Window']['status']=='3' and wd=='99'):
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
    ##end of new dim data

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
                
                    ReleasedWindowScrew.objects.create(
                        ReleasedWindowS=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                        ReleasedWindowSc=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                        description=gasket['title'],
                        quantity=round(eval(final_formula),2),
                        coating=gasket['coating'],
                        remark=gasket['remark'],
                        ReleasedScrewproject=Project.objects.get(id=int(project_id))
                        
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
     ##new dim data
    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']

    ##validating customized dim
    WindowStatus=ReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)
    dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
    DIMserializer = CorVisionDIMSerializer(dim, many=True)
    DIMserializer_data=DIMserializer.data

    packing = CorPacking.objects.filter(CorVision=pk)
    Packingserializer = CorVisionPackingSerializer(packing, many=True)
    packingserialize_data=Packingserializer.data

    if(Wserializer.data['Window']['status']=='4'):
            if (int(wd)<=6):
                #d1s1w,d1s1h,d1s2w,d1s2h,d2s1w,d2s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s1w']),float(requestdata['d2s1h'])
                d1s1w, d1s1h, d2s1w, d2s1h, d3s1w, d3s1h, d4s1w, d4s1h, d5s1w, d5s1h, d6s1w, d6s1h=float(requestdata['d1s1w']),float(requestdata['d1s1h']),float(requestdata['d2s1w']),float(requestdata['d2s1h']),float(requestdata['d3s1w']),float(requestdata['d3s1h']),float(requestdata['d4s1w']),float(requestdata['d4s1h']),float(requestdata['d5s1w']),float(requestdata['d5s1h']),float(requestdata['d6s1w']),float(requestdata['d6s1h'])
                d1s2w, d1s2h, d2s2w, d2s2h, d3s2w, d3s2h, d4s2w, d4s2h, d5s2w, d5s2h, d6s2w, d6s2h=float(requestdata['d1s2w']),float(requestdata['d1s2h']),float(requestdata['d2s2w']),float(requestdata['d2s2h']),float(requestdata['d3s2w']),float(requestdata['d3s2h']),float(requestdata['d4s2w']),float(requestdata['d4s2h']),float(requestdata['d5s2w']),float(requestdata['d5s2h']),float(requestdata['d6s2w']),float(requestdata['d6s2h'])
                d1s3w, d1s3h, d2s3w, d2s3h, d3s3w, d3s3h, d4s3w, d4s3h, d5s3w, d5s3h, d6s3w, d6s3h=float(requestdata['d1s3w']),float(requestdata['d1s3h']),float(requestdata['d2s3w']),float(requestdata['d2s3h']),float(requestdata['d3s3w']),float(requestdata['d3s3h']),float(requestdata['d4s3w']),float(requestdata['d4s3h']),float(requestdata['d5s3w']),float(requestdata['d5s3h']),float(requestdata['d6s3w']),float(requestdata['d6s3h'])
                d1s4w, d1s4h, d2s4w, d2s4h, d3s4w, d3s4h, d4s4w, d4s4h, d5s4w, d5s4h, d6s4w, d6s4h=float(requestdata['d1s4w']),float(requestdata['d1s4h']),float(requestdata['d2s4w']),float(requestdata['d2s4h']),float(requestdata['d3s4w']),float(requestdata['d3s4h']),float(requestdata['d4s4w']),float(requestdata['d4s4h']),float(requestdata['d5s4w']),float(requestdata['d5s4h']),float(requestdata['d6s4w']),float(requestdata['d6s4h'])
                d1s5w, d1s5h, d2s5w, d2s5h, d3s5w, d3s5h, d4s5w, d4s5h, d5s5w, d5s5h, d6s5w, d6s5h=float(requestdata['d1s5w']),float(requestdata['d1s5h']),float(requestdata['d2s5w']),float(requestdata['d2s5h']),float(requestdata['d3s5w']),float(requestdata['d3s5h']),float(requestdata['d4s5w']),float(requestdata['d4s5h']),float(requestdata['d5s5w']),float(requestdata['d5s5h']),float(requestdata['d6s5w']),float(requestdata['d6s5h'])
                d1s6w, d1s6h, d2s6w, d2s6h, d3s6w, d3s6h, d4s6w, d4s6h, d5s6w, d5s6h, d6s6w, d6s6h=float(requestdata['d1s6w']),float(requestdata['d1s6h']),float(requestdata['d2s6w']),float(requestdata['d2s6h']),float(requestdata['d3s6w']),float(requestdata['d3s6h']),float(requestdata['d4s6w']),float(requestdata['d4s6h']),float(requestdata['d5s6w']),float(requestdata['d5s6h']),float(requestdata['d6s6w']),float(requestdata['d6s6h'])
                
                w=int(requestdata['width'])
                h=int(requestdata['height'])
                
                for gasket in packingserialize_data:
                    formula=gasket['formula']
                    final_formula=formula
                    gasket_data=[gasket['CorVisionItem']['itemcode'],gasket['CorVisionItem']['name'],gasket['title'],"%.2f" %eval(final_formula),gasket['quantity'],gasket['cutting'],gasket['coating'],gasket['remark']]
                    if(requestdata['status']=='1'):
                        
                            ReleasedWindowPacking.objects.create(
                                ReleasedWindowPacking=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                                ReleasedWindowPac=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                                description=gasket['title'],
                                quantity=eval(final_formula,2),
                                coating=gasket['coating'],
                                remark=gasket['remark'],
                                ReleasedPackingproject=Project.objects.get(id=int(project_id))
                                )
                    final_packing_data.append(gasket_data)  

                json_data = JSONRenderer().render(final_packing_data)
                return HttpResponse(json_data, content_type='application/json')


    else:

        if(Wserializer.data['Window']['status']=='3' and wd=='99'):
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

    ##end of new dim data

  
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
                    ReleasedWindowPacking.objects.create(
                        ReleasedWindowPacking=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                        ReleasedWindowPac=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                        description=gasket['title'],
                        quantity=eval(final_formula),
                        coating=gasket['coating'],
                        remark=gasket['remark'],
                        ReleasedPackingproject=Project.objects.get(id=int(project_id))
                        )
            final_packing_data.append(gasket_data)  

        json_data = JSONRenderer().render(final_packing_data)
        return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_Glass(request):
    requestdata=request.data
    final_glass_data=[]
    pk=int(requestdata['id']) 
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    project_id=int(requestdata['project'])
    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    WindowStatus=ReleasedWindow.objects.get(id=int(requestdata['released']))
    Wserializer = ReleaseWindowSerializer(WindowStatus)
    wd=Corserializer.data['wd']
    if(Wserializer.data['Window']['status']=='4'):
        return Response({"message":"200"})
    else:    
        dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
        DIMserializer = CorVisionDIMSerializer(dim, many=True)
        DIMserializer_data=DIMserializer.data


        if(Wserializer.data['Window']['status']=='3' and wd=='99'):
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

        glass = CorVisionGlass.objects.filter(CorVision=pk).order_by('id')
        GlassSerializer = CorVisionGlassSerializer(glass, many=True)
        Glassserializer_data=GlassSerializer.data
        for glass in Glassserializer_data:
                if(wd<='5'):
                    name=glass['CodeName']
                    initial_gl_width=glass['Widthformula']
                    initial_gl_height=glass['Heightformula']
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
                        initial_gl_height=glass['Heightformula']
                        final_gl_width=initial_gl_width.replace('dim5', "dim5")
                        final_gl_width=initial_gl_width.replace('dim4', "dim4")
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
                else:
                    name=glass['CodeName']
                    initial_gl_width=glass['Widthformula']
                    initial_gl_height=glass['Heightformula']
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
    if(Corserializer.data['status']=='4'):
        return Response({"message":"200"})
    #Dimension Calculation
    else:
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
        dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
        DIMserializer = CorVisionDIMSerializer(dim, many=True)
        DIMserializer_data=DIMserializer.data
        for dim in DIMserializer_data:
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
                if(name=='dim1'):
                    dim_height_formula=dim['heightFormula']
                    dim_height=dim_height_formula.replace('h','h')       
                    dimh=(eval(dim_height)/1000)
                    dim1=eval(dim_height)
                    initial_dim1=dim['formula']
                    final_dim1=initial_dim1.replace('w', "w")
                    dim1=eval(final_dim1)
                elif(name=='dim2'):
                    initial_dim2=dim['formula']
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
            inter_formula=maximum_value=minimum_value=0
            inter_formula=inter['formula']
            wind_pressure=inter_formula.replace('wp',"wind")
            dim_width=wind_pressure.replace('dimw',"dimw")
            dim_height=dim_width.replace('dimh',"dimh")
            final_value=eval(dim_height)
            for profiles in InterLockserializer_data:
                if(final_value > int(profiles['minimum']) and final_value <= int(profiles['maximum'])):
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
                    
                        ReleasedWindowInterLock.objects.create(
                            ReleasedWindowInter=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                            ReleasedWindowInterProfile=Item.objects.get(id=int(profiles['CorVisionItem']['id'])),
                            description=profiles['title'],
                            cutlength=round(eval(final_formula_profile),2),
                            quantity=profiles['quantity'],
                            cutting=profiles['cutting'],
                            coating=profiles['coating'],
                            remark=profiles['remark'],
                            ReleasedInterLockproject=Project.objects.get(id=project_id)
                            )
                    final_profile_data.append(profile_data)


            break
        glass = CorVisionGlass.objects.filter(CorVision=pk).order_by('id')
        GlassSerializer = CorVisionGlassSerializer(glass, many=True)
        Glassserializer_data=GlassSerializer.data

        for glass in Glassserializer_data:
                if(wd=='2'):
                    initial_gl1_width=0
                    initial_gl1_height=0
                    initial_gl2_width=0
                    initial_gl2_height=0
                    name=glass['CodeName']
                    if(name=='gls1'):
                        initial_gl1_width=glass['Widthformula']
                        initial_gl1_height=glass['Heightformula']
                        final_gl1_width=initial_gl1_width.replace('dim2', "dim2")
                        final_gl1_height=initial_gl1_height.replace('h', "h")
                        gl1_w=eval(final_gl1_width)
                        gl1_h=eval(final_gl1_height)
                        gl1_title=glass['title']
                    elif(name=='gls2'):
                        initial_gl2_width=glass['Widthformula']
                        initial_gl2_height=glass['Heightformula']
                        final_gl2_width=initial_gl2_width.replace('dim1', "dim1")
                        final_gl2_height=initial_gl2_height.replace('h', "h")
                        gl2_w=eval(final_gl2_width)
                        gl2_h=eval(final_gl2_height) 
                        gl2_title=glass['title']
        glass_data=[gl1_title,"%.2f" %gl1_w,"%.2f" %gl1_h,gl2_title,"%.2f" %gl2_w,"%.2f" %gl2_h,dim1,dim2]

        json_data = JSONRenderer().render(final_profile_data)
        return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_InterLockAcc(request):
    requestdata=request.data
    final_glass_data=[]
    pk=int(requestdata['id']) 
    CorData = CORVISION.objects.get(id=pk)
    Corserializer = CorVisionSerializer(CorData)
    wd=Corserializer.data['wd']
    if(Corserializer.data['status']=='4'):
        return Response({"message":"200"})
    #Dimension Calculation
    else:
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
        w=float(requestdata['width'])
        h=float(requestdata['height'])
        wind=float(requestdata['wp']) 
        dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
        DIMserializer = CorVisionDIMSerializer(dim, many=True)
        DIMserializer_data=DIMserializer.data
        for dim in DIMserializer_data:
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
                if(name=='dim1'):
                    dim_height_formula=dim['heightFormula']
                    dim_height=dim_height_formula.replace('h','h') 
                    dimh=(eval(dim_height)/1000)
                    dim1=eval(dim_height)
                    initial_dim1=dim['formula']
                    final_dim1=initial_dim1.replace('w', "w")
                    dim1=eval(final_dim1)
            
                elif(name=='dim2'):
                    initial_dim2=dim['formula']
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

        interLockAcc = CorVisionInterLockAcc.objects.filter(CorVision=pk)
        interLockAccSerializer = CorVisionInterLockAccSerializer(interLockAcc, many=True)
        interLockAccSerializer_data=interLockAccSerializer.data
    
        if(wd<='5'):
            dimw=(max(dim1,dim2,dim3,dim4,dim5))/1000
        for inter in InterLockserializer_data:
            last_acc=0
            pair=1
            inter_formula=maximum_value=minimum_value=0
            inter_formula=inter['formula']
            wind_pressure=inter_formula.replace('wp',"wind")
            dim_width=wind_pressure.replace('dimw',"dimw")
            dim_height=dim_width.replace('dimh',"dimh")
            final_value=eval(dim_height)

            for profiles in InterLockserializer_data:
                if(final_value > int(profiles['minimum']) and final_value <= int(profiles['maximum'])):          
                    for interlockacc in interLockAccSerializer_data:
                        if(profiles['CorVisionItem']['id']==interlockacc['CorVisionItemProfile']['id']):
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

                                if(profiles['pair']==interlockacc['pair']):
                                    final_profile_data.append(profile_data)
                                    if(requestdata['status']=='1'):
                                        ReleasedWindowInterLockACC.objects.create(
                                        ReleasedWindowInterA=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                                        ReleasedWindowInterAcc=Item.objects.get(id=int(interlockacc['CorVisionItemAcc']['id'])),
                                        description=interlockacc['title'],
                                        quantity=eval(final_formula_profile),
                                        cutting=interlockacc['cutting'],
                                        coating=interlockacc['coating'],
                                        remark=interlockacc['remark']
                                        )
                                
            break

        json_data = JSONRenderer().render(final_profile_data)
        return HttpResponse(json_data, content_type='application/json')


##update window status
@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def UpdateWindowStatus(request,pk):
    if request.method == "GET":
        update_released_window=ReleasedWindow.objects.get(id=pk)
        update_released_window.status=WindowStatus.objects.get(id=3)
        update_released_window.save()
        update_released_window_profile=ReleasedWindowProfile.objects.filter(ReleasedWindowP=pk)
        for profile in update_released_window_profile:
                profile.status=3
                profile.save()
        return Response({'Message': 'Window Updated'}, status=201)
    

    ##update window status
@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def UpdateWindowStatusCustom(request):
    if request.method == "POST":
        
        update_released_window=ReleasedWindow.objects.get(id=request.data['id'])
        update_released_window.status=WindowStatus.objects.get(id=request.data['status'])
        update_released_window.save()
        update_released_window_profile=ReleasedWindowProfile.objects.filter(ReleasedWindowP=request.data['id'])
        for profile in update_released_window_profile:
                profile.status=request.data['status']
                profile.save()
        update_released_window_interlock=ReleasedWindowInterLock.objects.filter(ReleasedWindowInter=request.data['id'])
        for profile in update_released_window_interlock:
                profile.status=request.data['status']
                profile.save()
        return Response({'Message': 'Window Updated'}, status=201)
    

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def UpdateWindowStatusWNum(request,pk,pk2):
    if request.method == "GET":
        update_released_window=ReleasedWindow.objects.get(id=pk)
        update_released_window.status=WindowStatus.objects.get(id=pk2)
        update_released_window.save()
        update_released_window_profile=ReleasedWindowProfile.objects.filter(ReleasedWindowP=pk)
        for profile in update_released_window_profile:
                profile.status=pk2
                profile.save()
        return Response({'Message': 'Window Updated'}, status=201)
    
    


##for stock list no action required
@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def CORVCutting_Profile(request,pk,pk2):

    if request.method == "GET":
        if(pk2==2):
            final_profile_data=[]
            final_bar_data=[]
            dim1=0
            dim2=0
            final_acc_data=[]
            w=2000
            h=3000
            profile_data=[]
 
            allprofiles = ReleasedWindowProfile.objects.filter(Releasedprofileproject=pk,status=1)
            serializer = ReleaseWindowProfileSerializer(allprofiles, many=True)

            if not allprofiles:
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
                    cut_qty=0
                    if(profile['ReleasedWindowPItem']['id']==value):
                        WindowData = ReleasedWindow.objects.get(id=profile['ReleasedWindowP']['id'])
                        ShortWindowSerializer = ReleaseWindowShortSerializer(WindowData)
                        wqty=ShortWindowSerializer.data['quantity']
                        cut_qty=int(profile['quantity'])*int(wqty)

                        if(len(all_balance)<=0):              
                            cut_qty=cut_qty-1
                            balance=bar_length-float(profile['cutlength'])
                            total_bar=total_bar+1
                            all_balance.append(balance)
                        #add new
                        while(cut_qty>0):
                            matching_number=next((f for f in all_balance if float(profile['cutlength']) <= f),None)
                            if(matching_number):
                                cut_qty=cut_qty-1                 
                                balance=matching_number-float(profile['cutlength'])        
                                all_balance.remove(matching_number)
                                all_balance.append(balance)
                            else:
                                cut_qty=cut_qty-1
                                total_bar=total_bar+1
                                balance=bar_length-float(profile['cutlength'])
                                all_balance.append(balance)

 
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
                        remarks='Profile'
                )
                
            allinterlockprofiles = ReleasedWindowInterLock.objects.filter(ReleasedInterLockproject=pk,status=1)
            serializer = ReleaseWindowInterLockSerializer(allinterlockprofiles, many=True)
            if not allinterlockprofiles:     
                print("No interlock Profile available")

            else:
                serialize_data = sorted(
                    serializer.data, key=lambda k: k['cutlength'], reverse=True)
                uniqueserializer = CorVisionInterProfileShortSerializer(allinterlockprofiles, many=True)     
                unique_values = set(chain.from_iterable(d.values() for d in uniqueserializer.data))
  
                for value in unique_values:  
                    total_bar=0
                    balance=0
                    all_balance=[]
                    all_balance_copy=[]
                    bar_length=6500
                    cut_qty=0
                    for profile in serialize_data:
                        
                        cut_qty=0
                        if(profile['ReleasedWindowInterProfile']['id']==value):
                            WindowData = ReleasedWindow.objects.get(id=profile['ReleasedWindowInter']['id'])
                            ShortWindowSerializer = ReleaseWindowShortSerializer(WindowData)
                            wqty=ShortWindowSerializer.data['quantity']
                            cut_qty=int(profile['quantity'])*int(wqty)
                            if(len(all_balance)<=0):
                                cut_qty=cut_qty-1
                                balance=float(bar_length)-float(profile['cutlength'])
                                total_bar=total_bar+1
                                all_balance.append(balance)
                            #add new 
                            while(cut_qty>0):
                                matching_number=next((f for f in all_balance if float(profile['cutlength']) <= f),None)
                                if(matching_number):
                                    cut_qty=cut_qty-1
                                    balance=matching_number-float(profile['cutlength'])
                                    all_balance.remove(matching_number)
                                    all_balance.append(balance)
                                else:
                                    cut_qty=cut_qty-1
                                    total_bar=total_bar+1
                                    balance=bar_length-float(profile['cutlength'])
                                    all_balance.append(balance)               
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
                        remarks='InterLock'
                )
            ##orignal
            update_released_window=ReleasedWindow.objects.filter(Windowproject=pk,status=1)
            for object in update_released_window:
                object.status=WindowStatus.objects.get(id=2)
                object.save()
            update_released_window_profile=ReleasedWindowProfile.objects.filter(Releasedprofileproject=pk,status=1)
            for profile in update_released_window_profile:
                profile.status=2
                profile.save()
            update_released_window_interlock_profile=ReleasedWindowInterLock.objects.filter(ReleasedInterLockproject=pk,status=1)
            if update_released_window_interlock_profile:
                for profile in update_released_window_interlock_profile:
                    profile.status=2
                    profile.save()
            return Response({'Message': 'MTO Generated successfully'}, status=201)
        else:
            final_profile_data=[]
            final_bar_data=[]
            dim1=0
            dim2=0
            final_acc_data=[] 
            w=2000
            h=3000
            profile_data=[]
            allprofiles = FinalReleasedWindowProfile.objects.filter(FReleasedprofileproject=pk,status=4)
            serializer = FinalReleaseWindowProfileSerializer(allprofiles, many=True)
            if not allprofiles:
                return Response({'Message': 'Data not available to create Stock List.'}, status=203)
            createstocklist=StockList.objects.create(
                        ProjectStockList=Project.objects.get(id=pk),
                        Type=MTOType.objects.get(id=1),
                        title='Stock List'
                )
 
            serialize_data = sorted(
                serializer.data, key=lambda k: k['cutlength'], reverse=True)
            uniqueserializer = FinalCorVisionReleasedProfileShortSerializer(allprofiles, many=True)       
            unique_values = set(chain.from_iterable(d.values() for d in uniqueserializer.data))  
            for value in unique_values:
                total_bar=0
                balance=0
                all_balance=[]
                all_balance_copy=[]
                bar_length=6500
                cut_qty=0
                
                for profile in serialize_data:
                    cut_qty=0
                    if(profile['FReleasedWindowPItem']['id']==value):
                        WindowData = FinalReleasedWindow.objects.get(id=profile['FReleasedWindowP']['id'])
                        ShortWindowSerializer = FinalReleaseWindowShortSerializer(WindowData)
                        wqty=ShortWindowSerializer.data['quantity']
                        cut_qty=int(profile['quantity'])*int(wqty)
                        if(len(all_balance)<=0):
                            cut_qty=cut_qty-1   
                            balance=bar_length-float(profile['cutlength'])
                            total_bar=total_bar+1
                            all_balance.append(balance)
                        while(cut_qty>0):
                            matching_number=next((f for f in all_balance if float(profile['cutlength']) <= f),None)
                            if(matching_number):
                                cut_qty=cut_qty-1
                                balance=matching_number-float(profile['cutlength'])
                                            
                                all_balance.remove(matching_number)
                                all_balance.append(balance)
                            else:
                                cut_qty=cut_qty-1
                                total_bar=total_bar+1
                                balance=bar_length-float(profile['cutlength'])
                                all_balance.append(balance)
                    
                stockitems=StockListItem.objects.create(
                        StockListID=StockList.objects.get(id=createstocklist.id),
                        StockListItem=Item.objects.get(id=value),
                        quantity=total_bar
                )

            allinterlockprofiles = FinalReleasedWindowInterLock.objects.filter(FReleasedInterLockproject=pk,status=4)
            interserializer = FinalReleaseWindowInterProfileSerializer(allinterlockprofiles, many=True) 
            if not allinterlockprofiles:
              print("No interlock Profile available")

            else:
                serialize_data = sorted(
                    interserializer.data, key=lambda k: k['cutlength'], reverse=True)
                uniqueserializer = FinalCorVisioninterProfileShortSerializer(allprofiles, many=True)         
                unique_values = set(chain.from_iterable(d.values() for d in uniqueserializer.data))
                for value in unique_values:
                        total_bar=0
                        balance=0
                        all_balance=[]
                        all_balance_copy=[]
                        bar_length=6500
                        cut_qty=0
                        for profile in serialize_data:
                            cut_qty=0
                            if(profile['FReleasedWindowPItem']['id']==value):
                                WindowData = FinalReleasedWindow.objects.get(id=profile['FReleasedWindowP']['id'])
                                ShortWindowSerializer = FinalReleaseWindowShortSerializer(WindowData)
                                wqty=ShortWindowSerializer.data['quantity']
                                cut_qty=int(profile['quantity'])*int(wqty)
                                if(len(all_balance)<=0):
                                    cut_qty=cut_qty-1   
                                    balance=bar_length-profile['cutlength']
                                    total_bar=total_bar+1
                                    all_balance.append(balance)

                                while(cut_qty>0):
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
            ## new end
                        
            update_released_window=FinalReleasedWindow.objects.filter(FWindowproject=pk,Fstatus=4)
            for object in update_released_window:
                object.Fstatus=WindowStatus.objects.get(id=5)
                object.save()
            update_released_window_profile=FinalReleasedWindowProfile.objects.filter(FReleasedprofileproject=pk,status=4)
            for profile in update_released_window_profile:
                profile.status=5
                profile.save()
            update_released_window_interlock_profile=FinalReleasedWindowInterLock.objects.filter(FReleasedInterLockproject=pk,status=4)
            if update_released_window_interlock_profile:
                for profile in update_released_window_interlock_profile:
                    profile.status=5
                    profile.save()
            return Response({'Message': 'StockList Generated successfully'}, status=204)

##fetching window details no action required
@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def CORVision(request,pk):
    requestdata=request.data
    if request.method == "GET":
        final_profile_data=[]
        final_acc_data=[]
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
        FloorData = Floor.objects.filter(projectfloor=pk).order_by('-id')
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
        window=request.data['Window']
        CorData = CORVISION.objects.get(id=window)
        Corserializer = CorVisionSerializer(CorData)
        if(Corserializer.data['status']=='3'):
            if int(request.data['dim1']) !=0 and int(request.data['dim2']) !=0 and int(request.data['dim3'])==0:
                dim1=int(request.data['dim1'])
                dim2=int(request.data['dim2'])
                serializer = ReleasedCustomDimSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
            elif int(request.data['dim1']) !=0 and int(request.data['dim2']) !=0 and int(request.data['dim3']) !=0:
                dim1=int(request.data['dim1'])
                dim2=int(request.data['dim2'])
                dim3=int(request.data['dim3'])
                serializer = ReleasedCustomDimSerializer(data=request.data)
              
                if serializer.is_valid():
                    serializer.save()
         
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
        serializer = ReleasedCustomDimSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
def ReleaseWindowCustomShutter(request):
    if request.method == "POST":
        serializer = ReleasedCustomShutterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



@csrf_exempt
@api_view(['POST'])
def FinalReleaseWindowCustomShutter(request):
    if request.method == "POST":
        serializer = FinalReleasedCustomShutterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



@csrf_exempt
@api_view(['GET'])
def ReleaseWindowCustomShutterData(request,pk):
    if request.method == "GET":
        WindowData = ReleasedWindowCustomShutter.objects.get(ReleasedWindowCS=pk)
        Dimserializer = ReleasedCustomShutterSerializer(WindowData)
        json_data = JSONRenderer().render(Dimserializer.data)
        #print(json_data)
        return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
def ReleaseWindowCustomDimData(request,pk):
    if request.method == "GET":
        WindowData = ReleasedCustomDim.objects.get(ReleasedWindowCDim=pk)
        Dimserializer = GetReleasedCustomDimSerializer(WindowData)
        json_data = JSONRenderer().render(Dimserializer.data)
        return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def FloorWindows(request,pk,pk2):
    if request.method == "GET":
        WindowData = ReleasedWindow.objects.filter(Windowproject=pk,Windowfloor=pk2)
        Lockserializer = ReleaseWindowSerializer(WindowData, many=True)     
    json_data = JSONRenderer().render(Lockserializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def SingleWindowData(request,pk):
    if request.method == "GET":
        WindowData = ReleasedWindow.objects.get(id=pk)
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
        WindowData = ReleasedWindowProfile.objects.filter(ReleasedWindowP=pk)
        Lockserializer = ReleaseWindowProfileSerializer(WindowData, many=True)     
    json_data = JSONRenderer().render(Lockserializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataInterlock(request,pk):
    if request.method == "GET":
        Interlock = ReleasedWindowInterLock.objects.filter(ReleasedWindowInter=pk)
        Interlockserializer = ReleaseWindowInterLockSerializer(Interlock, many=True)    
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataAcc(request,pk):
    if request.method == "GET":
        Interlock = ReleasedWindowACC.objects.filter(ReleasedWindowA=pk)
        Interlockserializer = ReleaseWindowACCSerializer(Interlock, many=True) 
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataAccInterlock(request,pk):
    if request.method == "GET":
        Interlock = ReleasedWindowInterLockACC.objects.filter(ReleasedWindowInterA=pk)
        Interlockserializer = ReleaseWindowInterlockACCSerializer(Interlock, many=True)    
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataGasket(request,pk):
    if request.method == "GET":
        Interlock = ReleasedWindowGasket.objects.filter(ReleasedWindowG=pk)
        Interlockserializer = ReleaseWindowGasketSerializer(Interlock, many=True)    
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataScrew(request,pk):
    if request.method == "GET":
        Interlock = ReleasedWindowScrew.objects.filter(ReleasedWindowS=pk)
        Interlockserializer = ReleaseWindowScrewSerializer(Interlock, many=True)      
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataPacking(request,pk):
    if request.method == "GET":
        Interlock = ReleasedWindowPacking.objects.filter(ReleasedWindowPacking=pk)
        Interlockserializer = ReleaseWindowPackingSerializer(Interlock, many=True)   
    json_data = JSONRenderer().render(Interlockserializer.data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def WindowDataGlass(request,pk):
    if request.method == "GET":
        Interlock = ReleasedWindowGlass.objects.filter(ReleasedWindowGlass=pk)
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
    item.save()
    return JsonResponse(data,status=201)
  