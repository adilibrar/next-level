from django.shortcuts import render
from store.models import Item,MTO,Project,MTOItem,ReleasedWindow,ReleasedWindowProfile,ReleasedWindowACC,ReleasedWindowInterLockACC,ReleasedWindowGasket,ReleasedWindowScrew,ReleasedWindowPacking,ReleasedWindowGlass,ReleasedWindowInterLock,Floor,Lock,Elevation,CorVisionProfile,CORVISION,CorVisionInterLockAcc,CorVisionDIM,CorVisionShutter,CorVisionGlass,CorVisionAcc,CorVisionGasket,CorScrew,CorPacking,CorVisionInterLock
from store.Serializations.CorVisionSerializer import CorVisionProfileSerializer,ReleaseWindowACCSerializer,ReleaseWindowSerializerDepth,ReleaseWindowPackingSerializer,ReleaseWindowGlassSerializer,ReleaseWindowGasketSerializer,ReleaseWindowScrewSerializer,ReleaseWindowInterlockACCSerializer,ReleaseWindowsaveSerializer,ReleaseWindowInterLockSerializer,ReleaseWindowProfileSerializer,ReleaseWindowSerializer,FloorSerializer,LockSerializer,ElevationSerializer,CorVisionInterLockAccSerializer,CorVisionInterLockSerializer,CorVisionProfileShortSerializer,CorVisionPackingSerializer,CorVisionScrewSerializer,CorVisionSerializer,CorVisionDIMSerializer,CorVisionShutterSerializer,CorVisionGlassSerializer,CorVisionAccSerializer,CorVisionGasketSerializer
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
      

        CorData = CORVISION.objects.get(id=pk)
        Corserializer = CorVisionSerializer(CorData)
        wd=Corserializer.data['wd']
        # unique_item = CorVisionProfile.objects.filter(CorVision=pk).distinct()
        # uniqueserializer = CorVisionProfileShortSerializer(unique_item, many=True)
        # print(uniqueserializer.data)


        dim1=0
        dim2=0
        gl1_w=0
        gl1_h=0
        gl2_w=0
        gl2_h=0
   

        dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
        DIMserializer = CorVisionDIMSerializer(dim, many=True)
        DIMserializer_data=DIMserializer.data

        for dim in DIMserializer_data:
                #print(profile['fromula'])
            if(wd=='2'):
                initial_dim1=0
                initial_dim2=0
                name=dim['CodeName']
                        #print(name)
                formula=dim['formula']
                    #print(formula)
                if(name=='dim1'):
                    initial_dim1=dim['formula']
                    final_dim1=initial_dim1.replace('w', "w")
                    dim1=eval(final_dim1)
                            #print(dim1)
                elif(name=='dim2'):
                    initial_dim2=dim['formula']
                            #print(dim1)
                            #print(initial_dim2)
                    final_dim2=initial_dim2.replace('dim1', "dim1")
                    dim2=eval(final_dim2)

        projects = CorVisionProfile.objects.filter(CorVision=pk)
        serializer = CorVisionProfileSerializer(projects, many=True)
        serialize_data=serializer.data

        for profile in serialize_data:
            # if(wd>5000):
            #     print("greate tahn 5000")
            formula=profile['formula']
            fix_width=formula.replace('w', "w")
            dimen1=fix_width.replace('dim1','dim1')
            dimen2=dimen1.replace('dim2','dim2')
            fix_height=dimen2.replace('h', "h")

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
                    remark=profile['remark']
                    )
            final_profile_data.append(profile_data)

        
    json_data = JSONRenderer().render(final_profile_data)
    return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_Acc(request):
    final_acc_data=[]
    requestdata=request.data
    final_acc_data=[]
    pk=int(requestdata['id'])   
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    acc = CorVisionAcc.objects.filter(CorVision=pk)
    Accserializer = CorVisionAccSerializer(acc, many=True)
    accserialize_data=Accserializer.data
    for acc in accserialize_data:
        #print(acc['CorVisionItem']['unit'])
        formula=acc['formula']
        fix_width=formula.replace('w', "w")
        fix_height=fix_width.replace('h', "h")
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
                    remark=acc['remark']
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
    pk=int(requestdata['id'])   
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    gasket = CorVisionGasket.objects.filter(CorVision=pk)
    Gasketserializer = CorVisionGasketSerializer(gasket, many=True)
    gasketserialize_data=Gasketserializer.data
    for gasket in gasketserialize_data:
        formula=gasket['formula']
        fix_width=formula.replace('w', "w")
        fix_height=fix_width.replace('h', "h")
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
                        remark=gasket['remark']
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
    pk=int(requestdata['id'])   
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    screw = CorScrew.objects.filter(CorVision=pk)
    Screwserializer = CorVisionScrewSerializer(screw, many=True)
    screwserialize_data=Screwserializer.data
    for gasket in screwserialize_data:
        formula=gasket['formula']
        fix_width=formula.replace('w', "w")
        fix_height=fix_width.replace('h', "h")
        final_formula=fix_height
        gasket_data=[gasket['CorVisionItem']['itemcode'],gasket['CorVisionItem']['name'],gasket['title'],"%.2f" %eval(final_formula),gasket['quantity'],gasket['cutting'],gasket['coating'],gasket['remark']]
        if(requestdata['status']=='1'):
              
                ReleasedWindowScrew.objects.create(
                    ReleasedWindowS=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                    ReleasedWindowSc=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                    description=gasket['title'],
                    quantity=round(eval(final_formula),2),
                    coating=gasket['coating'],
                    remark=gasket['remark']
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
    pk=int(requestdata['id'])   
    w=int(requestdata['width'])
    h=int(requestdata['height']) 
    packing = CorPacking.objects.filter(CorVision=pk)
    Packingserializer = CorVisionPackingSerializer(packing, many=True)
    packingserialize_data=Packingserializer.data
    for gasket in packingserialize_data:
        formula=gasket['formula']
        fix_width=formula.replace('w', "w")
        fix_height=fix_width.replace('h', "h")
        final_formula=fix_height
        gasket_data=[gasket['CorVisionItem']['itemcode'],gasket['CorVisionItem']['name'],gasket['title'],"%.2f" %eval(final_formula),gasket['quantity'],gasket['cutting'],gasket['coating'],gasket['remark']]
        
        if(requestdata['status']=='1'):
              
                ReleasedWindowPacking.objects.create(
                    ReleasedWindowPacking=ReleasedWindow.objects.get(id=int(requestdata['released'])),
                    ReleasedWindowPac=Item.objects.get(id=int(gasket['CorVisionItem']['id'])),
                    description=gasket['title'],
                    quantity=eval(final_formula),
                    coating=gasket['coating'],
                    remark=gasket['remark']
                    )
        final_packing_data.append(gasket_data)  

    json_data = JSONRenderer().render(final_packing_data)
    return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_Glass(request):
    #Dimension Calculation
    dim1=0
    dim2=0
    sh1_w=0
    sh1_h=0
    sh2_w=0
    sh2_h=0
    gl1_w=0
    gl1_h=0
    gl2_w=0
    gl2_h=0
    requestdata=request.data
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
    for dim in DIMserializer_data:
                #print(profile['fromula'])
        if(wd=='2'):
            initial_dim1=0
            initial_dim2=0
            name=dim['CodeName']
                    #print(name)
            formula=dim['formula']
                #print(formula)
            if(name=='dim1'):
                initial_dim1=dim['formula']
                final_dim1=initial_dim1.replace('w', "w")
                dim1=eval(final_dim1)
                        #print(dim1)
            elif(name=='dim2'):
                initial_dim2=dim['formula']
                        #print(dim1)
                        #print(initial_dim2)
                final_dim2=initial_dim2.replace('dim1', "dim1")
                dim2=eval(final_dim2)
    #print(dim1)
    #print(dim2)

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
                print(name)
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



                initial_gl_width=glass['Widthformula']
                        #print(initial_sh2_width)
                initial_gl_height=glass['Heightformula']
                        #print(initial_gl2_width)
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
                            height=gl_h
                        )
                #gasket_data=[gl_title,gl_w,gl_h]
        
 
            final_glass_data.append(gasket_data)  

    #glass_data=[gl1_title,"%.2f" %gl1_w,"%.2f" %gl1_h,gl2_title,"%.2f" %gl2_w,"%.2f" %gl2_h,dim1,dim2]
    #final_glass_data.append(gasket_data)  

    json_data = JSONRenderer().render(final_glass_data)
    return HttpResponse(json_data, content_type='application/json')





@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVision_InterLock(request):
    #Dimension Calculation
    dim1=0
    dim2=0
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
        if(wd=='2'):
            initial_dim1=0
            initial_dim2=0
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
                dim2=eval(final_dim2)
    #print(dim1)
    #print(dim2)


    interLock = CorVisionInterLock.objects.filter(CorVision=pk)
    GlassSerializer = CorVisionInterLockSerializer(interLock, many=True)
    InterLockserializer_data=GlassSerializer.data
    print(dim1)
    print(dim2)
    dimw=(max(dim1,dim2))/1000
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
                fix_height_profile=dimen2.replace('h', "h")

                final_formula_profile=fix_height_profile
                print(eval(final_formula_profile))

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
                        remark=profiles['remark']
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
        if(wd=='2'):
            initial_dim1=0
            initial_dim2=0
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
                dim2=eval(final_dim2)
    #print(dim1)
    #print(dim2)


    interLock = CorVisionInterLock.objects.filter(CorVision=pk)
    GlassSerializer = CorVisionInterLockSerializer(interLock, many=True)
    InterLockserializer_data=GlassSerializer.data


    interLockAcc = CorVisionInterLockAcc.objects.filter(CorVision=pk)
    interLockAccSerializer = CorVisionInterLockAccSerializer(interLockAcc, many=True)
    interLockAccSerializer_data=interLockAccSerializer.data
  

    dimw=(max(dim1,dim2))/1000
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
                            fix_height_profile=dimen2.replace('h', "h")

                            final_formula_profile=fix_height_profile

                            profile_data=[interlockacc['CorVisionItemAcc']['itemcode'],interlockacc['CorVisionItemAcc']['name'],interlockacc['title'],"%.2f" %eval(final_formula_profile),interlockacc['quantity'],interlockacc['cutting'],interlockacc['coating'],interlockacc['remark'],interlockacc['CorVisionItemAcc']['unit'],interlockacc['CorVisionItemProfile']['id']]
                            
                            # if(interlockacc['pair']==pair):
                            #     None
                            # else:
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
                            # pair=interlockacc['pair']


        break

    json_data = JSONRenderer().render(final_profile_data)
    return HttpResponse(json_data, content_type='application/json')



@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def CORVCutting_Profile(request):
    requestdata=request.data
    if request.method == "POST":
        final_profile_data=[]
        final_bar_data=[]
        dim1=0
        dim2=0
        final_acc_data=[]
        pk=int(requestdata['id'])
        
        w=int(requestdata['width'])
        h=int(requestdata['height']) 




        dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
        DIMserializer = CorVisionDIMSerializer(dim, many=True)
        DIMserializer_data=DIMserializer.data
        for dim in DIMserializer_data:
                #print(profile['fromula'])
            initial_dim1=0
            initial_dim2=0
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
                dim2=eval(final_dim2)
      
        projects = CorVisionProfile.objects.filter(CorVision=pk)
        serializer = CorVisionProfileSerializer(projects, many=True)
        serialize_data=serializer.data
 

#.order_by().values("CorVisionItem").distinct()
        #unique_item = CorVisionProfile.objects.order_by('CorVisionItem').distinct('CorVisionItem')
        #unique_item = CorVisionProfile.objects.filter(CorVision=pk)
        selected_items = CorVisionProfile.objects.filter(CorVision=pk)
        #selected_items = CorVisionProfile.objects.all().filter(CorVision=pk).values('CorVisionItem').annotate(num_of_group=Count('customer_group_name', distinct=True))
        
        uniqueserializer = CorVisionProfileShortSerializer(selected_items, many=True)
        #print(uniqueserializer)
        #print(uniqueserializer.data)
        unique_values = set(chain.from_iterable(d.values() for d in uniqueserializer.data))
        #uniqueValues = set(uniqueserializer.data.values())
        #print(unique_values)
        for value in unique_values:
            total_bar=0
            balance=0
            for profile in serialize_data:
                #formula=profile['formula']
                #print(profile['CorVisionItem']['id'])
                #print(value)
                
                if(profile['CorVisionItem']['id']==value):
                    #print("value and id equal")
                    formula=profile['formula']
                    fix_width=formula.replace('w', "w")
                    dimen1=fix_width.replace('dim1','dim1')
                    dimen2=dimen1.replace('dim2','dim2')
                    fix_height=dimen2.replace('h', "h")
                    final_formula=fix_height
                    print(final_formula)
                    qty=int(profile['quantity'])

                    if(balance>=(eval(final_formula)*qty)):
                        qty=0
                    elif( eval(final_formula) <= balance):
                        balance=balance-eval(final_formula)
                        qty=qty-1

                        #print("balance less than total")
                        
                    else:
                        #print("we are in else")
                        if( eval(final_formula) <= float(profile['CorVisionItem']['length'])):
                            if(int(profile['quantity'])>1):
                                print("")
                            total_bar=total_bar+int(profile['quantity'])
                            profile_data=[profile['CorVisionItem']['itemcode'],profile['CorVisionItem']['name'],profile['CorVisionItem']['length'],profile['CorVisionItem']['finishing'],total_bar]
                            qty=qty-int(profile['quantity'])
                            balance=float(profile['CorVisionItem']['length'])-eval(final_formula)

                    #if(eval(final_formula)<profile['CorVisionItem']['length']):
            
            #print(balance)
            #print(value)
            final_bar_data.append(profile_data)

        #print(uniqueserializer.data)
        #print(DIMserializer_data)
        

  

        for profile in serialize_data:
   
            formula=profile['formula']
            fix_width=formula.replace('w', "w")
            fix_height=fix_width.replace('h', "h")
            final_formula=fix_height

            # if(requestdata['status']=='1'):
              
            #     ReleasedWindowProfile.objects.create(
            #         ReleasedWindowP=ReleasedWindow.objects.get(id=int(requestdata['released'])),
            #         ReleasedWindowPItem=Item.objects.get(id=int(profile['CorVisionItem']['id'])),
            #         description=profile['title'],
            #         cutlength=round(eval(final_formula),2),
            #         quantity=profile['quantity'],
            #         cutting=profile['cutting'],
            #         coating=profile['coating'],
            #         remark=profile['remark']
            #         )
            profile_data=[profile['CorVisionItem']['itemcode'],profile['CorVisionItem']['name'],profile['title'],"%.2f" %eval(final_formula),profile['quantity'],profile['cutting'],profile['coating'],profile['remark']]

            final_profile_data.append(profile_data)

        
    json_data = JSONRenderer().render(final_bar_data)
    return HttpResponse(json_data, content_type='application/json')




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
        serializer = ReleaseWindowsaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


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


