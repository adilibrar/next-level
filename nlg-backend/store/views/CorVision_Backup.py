from django.shortcuts import render
from store.models import Item,MTO,Project,MTOItem,CorVisionProfile,CORVISION,CorVisionDIM,CorVisionShutter,CorVisionGlass
from store.Serializations.CorVisionSerializer import CorVisionProfileSerializer,CorVisionSerializer,CorVisionDIMSerializer,CorVisionShutterSerializer,CorVisionGlassSerializer
from store.models import Stock_issuing,Stock
from store.Serializations.StockIssuingSerializations import StockIssuingProjectSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def CORVision_Profile(request,pk):
    if request.method == "GET":

        iw=2000
        ih=3000
        sgap=6
        rw=iw-sgap*2
        rh=ih-sgap+74
        
        rw=2000
        rh=3000

        CorData = CORVISION.objects.get(id=pk)
        Corserializer = CorVisionSerializer(CorData)
        wd=Corserializer.data['wd']
        projects = CorVisionProfile.objects.filter(CorVision=pk)
        serializer = CorVisionProfileSerializer(projects, many=True)
        serialize_data=serializer.data
        
        #Dimension Calculation
        dim = CorVisionDIM.objects.filter(CorVision=pk).order_by('id')
        DIMserializer = CorVisionDIMSerializer(dim, many=True)
        DIMserializer_data=DIMserializer.data
        #print(DIMserializer_data)
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
                    final_dim1=initial_dim1.replace('w', "rw")
                    dim1=eval(final_dim1)
                    #print(dim1)
                elif(name=='dim2'):
                    initial_dim2=dim['formula']
                    #print(dim1)
                    #print(initial_dim2)
                    final_dim2=initial_dim2.replace('dim1', "dim1")
                    dim2=eval(final_dim2)
       
        ###end of dimension Calculation

        print(dim1)
        print(dim2)
        
#Shutter Calculation

        shutter = CorVisionShutter.objects.filter(CorVision=pk).order_by('id')
        Shutterserializer = CorVisionShutterSerializer(shutter, many=True)
        Shutterserializer_data=Shutterserializer.data
        print(Shutterserializer_data)
        for shut in Shutterserializer_data:
            #print(profile['fromula'])
            if(wd=='2'):
                initial_sh1_width=0
                initial_sh1_height=0
                initial_sh2_width=0
                initial_sh2_height=0
                name=shut['CodeName']
                #formula=shut['formula']
                if(name=='sht1'):
                    initial_sh1_width=shut['Widthformula']
                    print(initial_sh1_width)
                    initial_sh1_height=shut['Heightformula']
                    final_sh1_width=initial_sh1_width.replace('dim2', "dim2")
                    final_sh1_height=initial_sh1_height.replace('h', "rh")
                    sh1_w=eval(final_sh1_width)
                    sh1_h=eval(final_sh1_height)
                    #print(dim1)
                elif(name=='sht2'):
                    initial_sh2_width=shut['Widthformula']
                    print(initial_sh2_width)
                    initial_sh2_height=shut['Heightformula']
                    final_sh2_width=initial_sh2_width.replace('dim1', "dim1")
                    final_sh2_height=initial_sh2_height.replace('h', "rh")
                    sh2_w=eval(final_sh2_width)
                    sh2_h=eval(final_sh2_height)
        print(sh1_h)
        print(sh1_w)
        print(sh2_h)
        print(sh2_w)
###end of shutter Calculation


#Glass Calculation

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
                    print(initial_gl1_width)
                    initial_gl1_height=glass['Heightformula']
                    final_gl1_width=initial_gl1_width.replace('dim2', "dim2")
                    final_gl1_height=initial_gl1_height.replace('h', "rh")
                    gl1_w=eval(final_gl1_width)
                    gl1_h=eval(final_gl1_height)
                    #print(dim1)
                elif(name=='gls2'):
                    initial_gl2_width=glass['Widthformula']
                    #print(initial_sh2_width)
                    initial_gl2_height=glass['Heightformula']
                    #print(initial_gl2_width)
                    final_gl2_width=initial_gl2_width.replace('dim1', "dim1")
                    final_gl2_height=initial_gl2_height.replace('h', "rh")
                    gl2_w=eval(final_gl2_width)
                    gl2_h=eval(final_gl2_height)
        print(gl1_w)
        print(gl1_h)
        print(gl2_w)
        print(gl2_h)

###end of Glass Calculation



        #Profile Data

        for profile in serialize_data:
            #print(profile['fromula'])
            formula=profile['fromula']
            fix_width=formula.replace('w', "rw")
            fix_height=fix_width.replace('h', "rh")
            final_formula=fix_height
            length=eval(final_formula)
            print(length)
            

    return Response({"message":"200"})
