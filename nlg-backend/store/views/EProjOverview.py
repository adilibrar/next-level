from django.shortcuts import render
from store.models import Item,StockAlternative,NonSystemItemsSD,NonSystemItemsMS,NonSystemDamage,ProductionStock,NonSystemItems,Finishingtype,Collection,Attachments,Glasstypes,Invoicing,projectsoverview,Paymenttypes,Certifiedpayment,Parameters4Po,Eventslogging,ProjectsList,transactions,Projectsmanagers,Vodetails,Projectpayments,Paymentterms
from store.Serializations.EProjSerializer import NonSysteMSerializer,NonSystemItemsMSSerializer,NonSystemItemsSDSerializer,NonSystemDamageSerializer,ProjOverViewSerializer,FinishingtypeSerializer,GlasstypesSerializer,AttachmentSerializer,EventLoggingSerializer,ParametersSerializer,CertifiedpaymentSerializer,PaymentTypesSerializer,CollectionSerializer,InvoicingSerializer,ProjectListSerializer,ProjectPaymentShortSerializer,ProjectManagerSerializer,ProjectVariationSerializer,ProjectPaymentSerializer,PaymentTermSerializer
from store.Serializations.StockSerializer import StockSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import time
from django.views.decorators.csrf import csrf_exempt
from rest_framework.fields import CurrentUserDefault
from django.core.mail import send_mail
import socket
from rest_framework.response import Response
import datetime

@api_view()
@permission_classes([AllowAny])
def projects(request):
    stock = projectsoverview.objects.all().using("account")
    serializer = ProjOverViewSerializer(stock, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def ExternalprojectsList(request,pk):
    project = ProjectsList.objects.filter(projectmanagerid=pk).using("projects").order_by('-project_id')
    serializer = ProjectListSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def ExternalprojectsListAll(request):
    project = ProjectsList.objects.all().using("projects").order_by('-project_id')
    serializer = ProjectListSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def ExternalVariationList(request,pk):
    project = Vodetails.objects.filter(mainid=pk).using("account")
    serializer = ProjectVariationSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@api_view()
@permission_classes([AllowAny])
def ExternalPaymentList(request,pk):
    project = Projectpayments.objects.filter(mainid=pk).using("projects")
    serializer = ProjectPaymentSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def VariationTotalAmount(request,pk):
    project = Vodetails.objects.filter(mainid=pk,voapprovalstatus='Approved').using("account")
    total_amount=0
    serializer = ProjectVariationSerializer(project, many=True)
    for balance in serializer.data:
        
        total_amount=total_amount+float(balance['voamount'])
    return HttpResponse(total_amount, content_type='application/json')


@api_view(['POST'])
@permission_classes([AllowAny])
def SaveVariation(request):
        if request.data['voapprovaldate'] == '':
                obj=Vodetails(
                        projectid=request.data['projectid'],
                        vonb=request.data['vonb'],
                        voamount=request.data['voamount'],
                        vodate=request.data['vodate'],
                        vodescription=request.data['vodescription'],
                        voapprovalstatus=request.data['voapprovalstatus'],
                        voapprovalform=request.data['voapprovalform'],
                        mainid=request.data['mainid'],
                        #voapprovaldate=request.data['voapprovaldate'],
                )
        else:
  
                obj=Vodetails(
                        projectid=request.data['projectid'],
                        vonb=request.data['vonb'],
                        voamount=request.data['voamount'],
                        vodate=request.data['vodate'],
                        vodescription=request.data['vodescription'],
                        voapprovalstatus=request.data['voapprovalstatus'],
                        voapprovalform=request.data['voapprovalform'],
                        voapprovaldate=request.data['voapprovaldate'],
                        mainid=request.data['mainid'],
                )
        obj.save(using="account")
        return JsonResponse(request.data,status=201)




@api_view(['POST'])
@permission_classes([AllowAny])
def SaveProjectPayment(request):
        percentage=int(request.data['paymentpercentage'])/100
        
        payments = Projectpayments.objects.all().using("projects").last()
        serializer = ProjectPaymentShortSerializer(payments)

        new_id=(serializer.data['pptid']+1)
        obj=Projectpayments(
                pptid=new_id,
                projectid=ProjectsList.objects.filter(project_id=request.data['projectid']).using("projects").order_by('-project_id').first(),
                paymenttermid=Paymentterms.objects.filter(paytid=request.data['paymenttermid']).using("projects").first(),
                note=request.data['note'],
                paymentpercentage=percentage,
                mainid=request.data['mainid'],
        )
        obj.save(using="projects")
        return JsonResponse(request.data,status=201)




@api_view(['POST'])
@permission_classes([AllowAny])
def CreateProjectProfile(request):
    obj=projectsoverview(
          projectid=request.data['projectid'],
          pmid=request.data['pmid'],
          contractamount=request.data['contractamount'],
          mainid=request.data['contractamount'],
    )

    # obj=Vodetails(
    #     projectid=request.data['projectid'],
    #     vonb=request.data['vonb'],
    #     voamount=request.data['voamount'],
    #     vodate=request.data['vodate'],
    #     vodescription=request.data['vodescription'],
    #     voapprovalstatus=request.data['voapprovalstatus'],
    #     voapprovalform=request.data['voapprovalform'],
    #     voapprovaldate=request.data['voapprovaldate'],
    # )
    # 
    obj.save(using="account")
    return JsonResponse(request.data,status=201)

@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateNSISD(request):
        sd_approval_da=0
        sd_end_da=0
        sd_start_da=0
        print(request.data)
        if request.data['sd_approval_date'] == '':
                sd_approval_da=None
        else:
                sd_approval_da=request.data['sd_approval_date']

        if request.data['sd_end_date'] == '':
                sd_end_da=None
        else:
                sd_end_da=request.data['sd_end_date']

        if request.data['sd_start_date'] == '':
                sd_start_da=None
        else:
                sd_start_da=request.data['sd_start_date']
        obj=NonSystemItemsSD(
          sd_status=request.data['sd_status'],
          sd_submission_status=request.data['sd_submission_status'],
          sd_approval_status=request.data['sd_approval_status'],
          sd_revision=request.data['sd_revision'],
          sd_approval_date=sd_approval_da,
          sd_end_date=sd_end_da,
          sd_start_date=sd_start_da,
          project=request.data['project'],
          sd_desiginer=request.data['sd_desiginer'],
          type=request.data['sd_type'],
          mainid=request.data['mainid'],
          status=1
                )
        obj.save()
        return Response({"message":"200"})


@api_view(['POST'])
@permission_classes([AllowAny])
def ADDNSMS(request):
        print(request.data)
        ms_approval_da=0
        ms_end_da=0
        ms_start_da=0
        print(request.data)
        if request.data['ms_approval_date'] == '':
                ms_approval_da=None
        else:
                ms_approval_da=request.data['ms_approval_date']

        if request.data['ms_end_date'] == '':
                ms_end_da=None
        else:
                ms_end_da=request.data['ms_end_date']

        if request.data['ms_start_date'] == '':
                ms_start_da=None
        else:
                ms_start_da=request.data['ms_start_date']
        obj=NonSystemItemsMS(
          ms_status=request.data['ms_status'],
          ms_submission_status=request.data['ms_submission_status'],
          ms_approval_status=request.data['ms_approval_status'],
          ms_revision=request.data['ms_revision'],
          ms_approval_date=ms_approval_da,
          ms_end_date=ms_end_da,
          ms_start_date=ms_start_da,
          project=request.data['project'],
          ms_desiginer=request.data['ms_desiginer'],
          type=request.data['ms_type'],
          mainid=request.data['mainid'],
          status=1
                )
        obj.save()
        return Response({"message":"200"})



@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateNSISDIND(request):
                nsi=NonSystemItemsSD.objects.get(id=request.data['id'])
                #print(nsi)
                nsi.sd_status=request.data['sd_status']
                if request.data['sd_start_date'] == '':
                        nsi.sd_start_date=None
                else:
                        nsi.sd_start_date=request.data['sd_start_date']
                if request.data['sd_end_date'] == '':
                        nsi.sd_end_date=None
                else:
                        nsi.sd_end_date=request.data['sd_end_date']
                nsi.sd_submission_status=request.data['sd_submission_status']
                nsi.sd_approval_status=request.data['sd_approval_status']
                nsi.sd_approval_status=request.data['sd_approval_status']
                nsi.sd_revision=request.data['sd_revision']
                nsi.type=request.data['sd_type']
                if request.data['sd_approval_date'] == '':
                         nsi.sd_approval_date=None
                else:
                         nsi.sd_approval_date=request.data['sd_approval_date']
                nsi.sd_desiginer=request.data['sd_desiginer']

                nsi.save()
                
      
                return Response({"message":"200"})



@api_view()
@permission_classes([AllowAny])
def GetNonSystemItemsSDAll(request,pk):
    nonsd = NonSystemItemsSD.objects.filter(mainid=pk)
    serializer = NonSystemItemsSDSerializer(nonsd, many=True)
    json_data = JSONRenderer().render(serializer.data)
#     print(request.META['USERDOMAIN'])
#     print(request.META)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def GetNonSystemItemsMSAll(request,pk):
    nonsd = NonSystemItemsMS.objects.filter(mainid=pk)
    serializer = NonSystemItemsMSSerializer(nonsd, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateNSI(request):
                print(request.data)
                nsi=NonSystemItems.objects.get(id=request.data['id'])

                nsi.mto_taking=request.data['mto_taking']
                nsi.order_status=request.data['order_status']
                if request.data['eta'] == '':
                        nsi.eta=None
                else:
                       nsi.eta=request.data['eta']
                nsi.type=request.data['type']
                # nsi.al_ass_del_status=request.data['al_ass_del_status']

                # nsi.sheet_mto_taking=request.data['sheet_mto_taking']
                # nsi.sheet_order_status=request.data['sheet_order_status']
                # if request.data['sheet_eta'] == '':
                #         nsi.sheet_eta=None
                # else:
                #         nsi.sheet_eta=request.data['sheet_eta']
                # nsi.sheet_fabrication_status=request.data['sheet_fabrication_status']

                # nsi.steel_mto_taking=request.data['steel_mto_taking']
                # nsi.steel_order_status=request.data['steel_order_status']
                # if request.data['steel_eta'] == '':
                #         nsi.steel_eta=None
                # else:
                #         nsi.steel_eta=request.data['steel_eta']
                # nsi.steel_fabrication_status=request.data['steel_fabrication_status']
                # nsi.steel_galvanizing_status=request.data['steel_galvanizing_status']

                # nsi.powder_mto_taking=request.data['powder_mto_taking']
                # nsi.powder_order_status=request.data['powder_order_status']
                # if request.data['powder_eta'] == '':
                #         nsi.powder_eta=None
                # else:
                #         nsi.powder_eta=request.data['powder_eta']
                # nsi.sd_status=request.data['sd_status']
                # if request.data['sd_start_date'] == '':
                #         nsi.sd_start_date=None
                # else:
                #         nsi.sd_start_date=request.data['sd_start_date']
                # if request.data['sd_end_date'] == '':
                #         nsi.sd_end_date=None
                # else:
                #         nsi.sd_end_date=request.data['sd_end_date']
                # nsi.sd_submission_status=request.data['sd_submission_status']
                # nsi.sd_approval_status=request.data['sd_approval_status']
                # nsi.sd_revision=request.data['sd_revision']
                # if request.data['sd_approval_date'] == '':
                #         nsi.sd_approval_date=None
                # else:
                #         nsi.sd_approval_date=request.data['sd_approval_date']
                # nsi.sd_desiginer=request.data['sd_desiginer']

                nsi.save()
      
                return Response({"message":"200"})


@api_view(['GET'])
@permission_classes([AllowAny])
def GetNSI(request,pk):
        try:
                NSI=NonSystemItems.objects.filter(project=pk)
                serializer=NonSysteMSerializer(NSI,many=True)
                json_data = JSONRenderer().render(serializer.data)
                return HttpResponse(json_data, content_type='application/json')
        except NonSystemItems.DoesNotExist:
                obj=NonSystemItems(
                      project=pk
                )
                obj.save()
                NSI=NonSystemItems.objects.get(project=pk)
                serializer=NonSysteMSerializer(NSI)
                json_data = JSONRenderer().render(serializer.data)
                return HttpResponse(json_data, content_type='application/json')

      #print(request.data['project'])
      #print("Fetching Data")
#       return Response({"message":"200"})


@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateProjectOverview(request):
    projects=projectsoverview.objects.filter(mainid=request.data['mainid']).using("account").first()
    #print(projects)
    #print(request.data['mainid'])
    data=request.data
    #print(request.data)
    projects.offer_approval_method=request.data['offer_approval_method']
    projects.draft_contract_issuance=request.data['draft_contract_issuance']
    projects.draft_contract_negotiation_status=request.data['draft_contract_negotiation_status']
    projects.original_contract_receipt=request.data['original_contract_receipt']
    projects.original_contract_signature_by_nlg=request.data['original_contract_signature_by_nlg']
    projects.original_contract_countersigned_receipt=request.data['original_contract_countersigned_receipt']
    if data['facadearea'] == '':
            
             projects.facadearea = 0
    else:
             projects.facadearea=request.data['facadearea']
    projects.vat=request.data['vat']  
    projects.contractamount=request.data['contractamount']
    projects.accumulated_offer_amount=request.data['accumulated_offer_amount']

    projects.ifc_drawings=request.data['ifc_drawings']
    projects.structural_drawings=request.data['structural_drawings']
    projects.architectural_drawings=request.data['architectural_drawings']
    projects.id_drawings=request.data['id_drawings']
    projects.remarks=request.data['remarks']

    projects.sd_schedule_status=request.data['sd_schedule_status']
    if data['sd_scheduled_startup_date'] == '':
            
            projects.sd_scheduled_startup_date = None
    else:
            projects.sd_scheduled_startup_date=request.data['sd_scheduled_startup_date']
    
    if data['sd_scheduled_endup_date'] == '':
            
            projects.sd_scheduled_endup_date = None
    else:
            projects.sd_scheduled_endup_date=request.data['sd_scheduled_endup_date']


    projects.sd_preparation_status=request.data['sd_preparation_status']
    projects.sd_submission_status=request.data['sd_submission_status']
    projects.sd_approval_status=request.data['sd_approval_status']
    projects.latest_sd_revision=request.data['latest_sd_revision']
    
    if data['sd_approval_date'] == '':
            
            projects.sd_approval_date = None
    else:
            projects.sd_approval_date=request.data['sd_approval_date']
    


    projects.glass_sample_preparation_status=request.data['glass_sample_preparation_status']
    projects.frame_color_preparation_status=request.data['frame_color_preparation_status']
    projects.material_submission_status=request.data['material_submission_status']
    projects.glass_approval_status=request.data['glass_approval_status']
    projects.approved_glass_type=request.data['approved_glass_type']
    projects.frame_finishing_approval=request.data['frame_finishing_approval']
    projects.approved_color=request.data['approved_color']
    projects.approved_color2=request.data['approved_color2']
    projects.approved_color3=request.data['approved_color3']
    projects.glass_delivery_status=request.data['glass_delivery_status']
    projects.site_ready_progress=request.data['site_ready_progress']
    projects.site_measurement_progress=request.data['site_measurement_progress']
    projects.aluminium_order_release_progress=request.data['aluminium_order_release_progress']
    projects.glass_order_release_progress=request.data['glass_order_release_progress']
    projects.fabrication_progress=request.data['fabrication_progress']
    projects.installation_progress=request.data['installation_progress']
    projects.glass_delivery_progress=request.data['glass_delivery_progress']
    if data['glass_approval_date'] == '':
            
            projects.glass_approval_date = None
    else:
            
            projects.glass_approval_date=request.data['glass_approval_date']
     
    if data['color_approval_date'] == '':
            
            projects.color_approval_date = None
    else:
            projects.color_approval_date=request.data['color_approval_date']





    projects.mto_taking=request.data['mto_taking']
    projects.alumunium_system_order_status=request.data['alumunium_system_order_status']

    if data['aluminium_system_eta'] == '':
            
            projects.aluminium_system_eta = None
    else:
            projects.aluminium_system_eta=request.data['aluminium_system_eta']
    projects.glass_sheets_booking_status=request.data['glass_sheets_booking_status']

    if data['glass_sheets_eta'] == '':
            
            projects.glass_sheets_eta = None
    else:
            projects.glass_sheets_eta=request.data['glass_sheets_eta']
    
    projects.powder_mto_taking=request.data['powder_mto_taking']
    projects.powder_order_status=request.data['powder_order_status']

    if data['powder_eta'] == '':
            
            projects.powder_eta = None
    else:
            projects.powder_eta=request.data['powder_eta']

    if data['glass_delivery_eta'] == '':
            
            projects.glass_delivery_eta = None
    else:
            projects.glass_delivery_eta=request.data['glass_delivery_eta']


    projects.site_readiness=request.data['site_readiness']
    projects.site_measurements_status=request.data['site_measurements_status']
    projects.aluminium_order_release_status=request.data['aluminium_order_release_status']
    projects.glass_order_release_status=request.data['glass_order_release_status']
    projects.fabrication_status=request.data['fabrication_status']
    projects.installation_status=request.data['installation_status']


    projects.site_ready_release=request.data['site_ready_release']
    projects.site_measurement_release=request.data['site_measurement_release']
    projects.glass_order_release=request.data['glass_order_release']
    projects.alu_order_release=request.data['alu_order_release']
    projects.fabrication_release=request.data['fabrication_release']
    projects.installation_release=request.data['installation_release']
    projects.glass_delivery_release=request.data['glass_delivery_release']

    projects.as_built_drawings_preparation_status=request.data['as_built_drawings_preparation_status']
    projects.as_built_drawings_submission_status=request.data['as_built_drawings_submission_status']
    
    projects.designer=request.data['designer']
     
    if data['as_built_drawings_submission_date'] == '':
            
            projects.as_built_drawings_submission_date = None
    else:
            projects.as_built_drawings_submission_date=request.data['as_built_drawings_submission_date']

    projects.handover_documents_preparation=request.data['handover_documents_preparation']
    projects.handover_documents_submission_status=request.data['handover_documents_submission_status']

    if data['handover_documents_submission_date'] == '':
            
            projects.handover_documents_submission_date = None
    else:
            projects.handover_documents_submission_date=request.data['handover_documents_submission_date']


    if data['snagging_desnags_esd'] == '':

            projects.snagging_desnags_esd = None
    else:
            projects.snagging_desnags_esd=request.data['snagging_desnags_esd']



    if data['snagging_desnags_efd'] == '':
            
            projects.snagging_desnags_efd = None
    else:
            projects.snagging_desnags_efd=request.data['snagging_desnags_efd']



    projects.toc_issuance_status=request.data['toc_issuance_status']

    if data['toc_date'] == '':
            
            projects.toc_date = None
    else:
            projects.toc_date=request.data['toc_date']

    projects.GlassShutterToSite=request.data['GlassShutterToSite']
    projects.GlassShutterToSiteTotal=request.data['GlassShutterToSiteTotal']
    projects.GlassShutterToSiteRelease=request.data['GlassShutterToSiteRelease']


    projects.SiteMeasureRejection=request.data['SiteMeasureRejection']
    projects.AluOrderRejection=request.data['AluOrderRejection']
    projects.GlassReleaseRejection=request.data['GlassReleaseRejection']
    projects.FabricationRejection=request.data['FabricationRejection']
    projects.InstallationRejection=request.data['InstallationRejection']
    projects.TofactoryRejection=request.data['TofactoryRejection']
    projects.GlassRecievedatNLG=request.data['GlassRecievedatNLG']
    projects.ShuttertoSiteExecuted=request.data['ShuttertoSiteExecuted']
    projects.GlasstoSiteLabel=request.data['GlasstoSiteLabel']
    projects.ShuttertoFactLabel=request.data['ShuttertoFactLabel']

    projects.GlassRelFactoryOpt=request.data['GlassRelFactoryOpt']
    projects.GlassRelFactoryTotal=request.data['GlassRelFactoryTotal']
    projects.GlassRelFactoryExecu=request.data['GlassRelFactoryExecu']
    projects.GlassRelFactoryRej=request.data['GlassRelFactoryRej']

    projects.installed_site=request.data['installed_site']
    projects.balance_site=request.data['balance_site']
    projects.install_factory=request.data['install_factory']
    projects.balance_fact=request.data['balance_fact']
    projects.related=request.data['related']
    projects.sd_submission_date=request.data['sd_submission_date']

    projects.save()
        

    return JsonResponse(request.data,status=201)

@api_view()
@permission_classes([AllowAny])
def ExternalprojectsListByStatus(request,pk,pk2):
    project = ProjectsList.objects.filter(projectstatus=pk,projectmanagerid=pk2).using("projects").order_by('-project_id')
    serializer = ProjectListSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)

#     print(request.META['COMPUTERNAME'])
#     print(request.META['USERNAME'])
#     print(request.META['HTTP_USER_AGENT'])
#     print(request.META['USERDOMAIN_ROAMINGPROFILE'])
#     print(request.user_agent.browser.family)
#     print(request.user_agent.device)
#     print(request.user_agent.device.family)
#     print(request.user_agent.os)
#     print(request.user_agent.os.family)
#     print(request.META['REMOTE_HOST'])
#     print(request.user_agent)
   # print(request.META)

    #hostname = socket.gethostname()
    #ip_address = socket.gethostbyname(hostname)
#     print(f"Hostname: {hostname}")
#     print(f"IP Address: {ip_address}")
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def ExternalprojectsListByStatusSA(request,pk):
    project = ProjectsList.objects.filter(projectstatus=pk).using("projects").order_by('-project_id')
    serializer = ProjectListSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
#     print(request.META['USERDOMAIN'])
#     print(request.META)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def ExternalprojectsListByStatusPM(request,pk,pk2):
    project = ProjectsList.objects.filter(projectstatus=pk,projectmanagerid=pk2).using("projects").order_by('-project_id')
    serializer = ProjectListSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
#     print(request.META['USERDOMAIN'])
#     print(request.META)
    return HttpResponse(json_data, content_type='application/json')




@api_view(['POST'])
@permission_classes([AllowAny])
def UpdatePayment(request):
        
        payments = Projectpayments.objects.filter(pptid=request.data['pptid']).using("projects").last()   

        pay=Paymentterms.objects.filter(paytid=request.data['paymenttermid']).using("projects")
        payd=pay.get(paytid=request.data['paymenttermid'])
        payments.paymentpercentage=request.data['paymentpercentage']
        payments.note=request.data['note']
        payments.paymenttermid=payd
        payments.save()
        return JsonResponse(request.data,status=201)



@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateVariation(request):
        #projects=Projoverview.objects.filter(projectid=request.data['projectid']).using("account").first()
        variation = Vodetails.objects.filter(void=request.data['void']).using("account").first()
        variation.vonb=request.data['vonb']
        variation.voamount=request.data['voamount']
        variation.vodate=request.data['vodate']
        if request.data['vodate'] == '':
            variation.vodate=request.data['vodate'] = None
        else:
            variation.vodate=request.data['vodate']
        variation.vodescription=request.data['vodescription']
        variation.voapprovalstatus=request.data['voapprovalstatus']
        variation.voapprovalform=request.data['voapprovalform']
        if request.data['voapprovaldate'] == '':
            variation.voapprovaldate=request.data['voapprovaldate'] = None
        else:
            variation.voapprovaldate=request.data['voapprovaldate']
        variation.save()
        return JsonResponse(request.data,status=201)



@api_view()
@permission_classes([AllowAny])
def ExternalprojectManagers(request):
    project = Projectsmanagers.objects.all().using("projects").order_by('projectmid')
    serializer = ProjectManagerSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def ExternalprojectManagersSingle(request,pk):
    project = Projectsmanagers.objects.filter(projectmid=pk).using("projects")[:1]
    serializer = ProjectManagerSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def ExternalSingleproject(request,pk):
    project = ProjectsList.objects.filter(mainid=pk).using("projects")[:1]
    serializer = ProjectListSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def ExternalSingleprojectMain(request,pk):
    project = ProjectsList.objects.filter(mainid=pk).using("projects")[:1]
    serializer = ProjectListSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def ExternalSingleprojectOverView(request,pk):
    project = projectsoverview.objects.filter(mainid=pk).using("account")[:1]
    serializer = ProjOverViewSerializer(project, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view()
@permission_classes([AllowAny])
def PaymentTerms(request):
    payment = Paymentterms.objects.all().using("projects")
    serializer = PaymentTermSerializer(payment, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@api_view()
@permission_classes([AllowAny])
def ProjectEventLog(request,pk):
    event = Eventslogging.objects.filter(mainid=pk).using("account").order_by('-eventdate')
    serializer = EventLoggingSerializer(event, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')



@api_view(['POST'])
@permission_classes([AllowAny])
def ProjectEventUpdate(request):
        #projects=Projoverview.objects.filter(projectid=request.data['projectid']).using("account").first()
        print("We are here")
        print(request.data)
        # variation = Vodetails.objects.filter(void=request.data['void']).using("account").first()
        # variation.voamount=request.data['voamount']
        # variation.vodate=request.data['vodate']
        # if request.data['vodate'] == '':
        #     variation.vodate=request.data['vodate'] = None
        # else:
        #     variation.vodate=request.data['vodate']
        # variation.vodescription=request.data['vodescription']
        # variation.voapprovalstatus=request.data['voapprovalstatus']
        # variation.voapprovalform=request.data['voapprovalform']
        # if request.data['voapprovaldate'] == '':
        #     variation.voapprovaldate=request.data['voapprovaldate'] = None
        # else:
        #     variation.voapprovaldate=request.data['voapprovaldate']
        # variation.save()
        #return JsonResponse(request.data,status=201)
        events = Eventslogging.objects.all().using("account").last()
        serializer = EventLoggingSerializer(events)
        if(serializer.data['eventid']==None):
                new_id=1
        else:
                new_id=(int(serializer.data['eventid'])+1)
        obj=Eventslogging(           
                eventid=new_id,
                
                projectid=request.data['projectid'],
                mainid=request.data['mainid'],
                eventdate=request.data['eventdate'],
                eventdescription=request.data['eventdescription'],
                category=request.data['category'],
                eventimpact=request.data['eventimpact'],
                link=request.data['link']
        )

        # obj=Vodetails(
        #     projectid=request.data['projectid'],
        #     vonb=request.data['vonb'],
        #     voamount=request.data['voamount'],
        #     vodate=request.data['vodate'],
        #     vodescription=request.data['vodescription'],
        #     voapprovalstatus=request.data['voapprovalstatus'],
        #     voapprovalform=request.data['voapprovalform'],
        #     voapprovaldate=request.data['voapprovaldate'],
        # )
        # 
        obj.save(using="account")
        return JsonResponse(request.data,status=201)





@api_view(['POST'])
@permission_classes([AllowAny])
def EditProjectEvent(request):
        logs = Eventslogging.objects.filter(eventid=request.data['editid']).using("account").first()
        logs.eventdescription=request.data['editdescription']
        logs.eventdate=request.data['editdate']
        logs.eventimpact=request.data['editimpact']
        logs.link=request.data['editlink']
        logs.category=request.data['category']
        # certify.certificationremark=request.data['certificationremark']
        # certify.approvedcertifiedamount=request.data['approvedcertifiedamount']
        # if request.data['certificationapprovaldate'] == '':
        #     certify.certificationapprovaldate=request.data['certificationapprovaldate'] = None
        # else:
        #     certify.certificationapprovaldate=request.data['certificationapprovaldate']
        # #print("i am ready")
        logs.save()
        return JsonResponse(request.data,status=201)



@api_view()
@permission_classes([AllowAny])
def GetInvoicing(request,pk):
    total_invoice=0
    total_variation_amount=0
    invoice = transactions.objects.filter(mainid=pk,transaction_or_invoice='Invoice',transactiontype='Payable',clienttype='Client').using("projects").order_by('-transaction_id')
    serializer = InvoicingSerializer(invoice, many=True)
    variation = Vodetails.objects.filter(mainid=pk,voapprovalstatus='Approved').using("account")
    if variation:
        total_variation_amount = sum(variation.values_list('voamount', flat=True))
    getinvoice=Invoicing.objects.filter(mainid=pk).using("account")
    getinvoice.delete()
    if serializer:
        for invoice in serializer.data:
                obj=Invoicing(           
                        projectid=pk,
                        certificationid=invoice['paymentreference'],
                        invoicereference=invoice['invoicenb'],
                        invoiceamount=invoice['transactionvalue'],
                        invoicedate=invoice['transaction_date'],
                        invoiceduedate=invoice['paymentduedate'],
                        mainid=pk
                )
                total_invoice=total_invoice+invoice['transactionvalue']
                obj.save(using="account")
    projects=projectsoverview.objects.filter(mainid=pk).using("account").first()
    projects.accumulatedinvamount=total_invoice
    projects.balance2invoice=((float(projects.contractamount)+float(total_variation_amount))-(float(total_invoice)))
    projects.save()
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')

@api_view()
@permission_classes([AllowAny])
def GetPay(request,pk):
    total_invoice=0
    total_variation_amount=0
    invoice = transactions.objects.filter(projectnameid=pk,transaction_or_invoice='Invoice',transactiontype='Payable',clienttype='Client').using("projects").order_by('-transaction_id')
    #serializer = InvoicingSerializer(invoice, many=True)
    total_rec_amount = sum(invoice.values_list('transactionvalue', flat=True))
    json_data = JSONRenderer().render(total_rec_amount)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def GetRec(request,pk):
    total_invoice=0
    total_variation_amount=0
    invoice = transactions.objects.filter(mainid=pk,transaction_or_invoice='Invoice',transactiontype='Receivable',clienttype='Client').using("projects").order_by('-transaction_id')
    #serializer = InvoicingSerializer(invoice, many=True)
    total_rec_amount = sum(invoice.values_list('transactionvalue', flat=True))
    #variation = Vodetails.objects.filter(projectid=pk,voapprovalstatus='Approved').using("account")
#     if variation:
#         total_variation_amount = sum(variation.values_list('voamount', flat=True))
#     getinvoice=Invoicing.objects.filter(projectid=pk).using("account")
#     getinvoice.delete()
#     if serializer:
#         for invoice in serializer.data:
#                 obj=Invoicing(           
#                         projectid=pk,
#                         certificationid=invoice['paymentreference'],
#                         invoicereference=invoice['invoicenb'],
#                         invoiceamount=invoice['transactionvalue'],
#                         invoicedate=invoice['transaction_date'],
#                         invoiceduedate=invoice['paymentduedate']
#                 )
#                 total_invoice=total_invoice+invoice['transactionvalue']
#                 obj.save(using="account")
#     projects=projectsoverview.objects.filter(projectid=pk).using("account").first()
#     projects.accumulatedinvamount=total_invoice
#     projects.balance2invoice=((float(projects.contractamount)+float(total_variation_amount))-(float(total_invoice)))
#     projects.save()
    json_data = JSONRenderer().render(total_rec_amount)
    return HttpResponse(json_data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def GetCollection(request,pk):
    total_collection=0
    collection = transactions.objects.filter(mainid=pk,transaction_or_invoice='Transaction',clienttype='Client',transactiontype='Receivable').using("projects").order_by('-transaction_id')
    serializer = CollectionSerializer(collection, many=True)

    variation = Vodetails.objects.filter(mainid=pk,voapprovalstatus='Approved').using("account")
    total_variation_amount = sum(variation.values_list('voamount', flat=True))

    getcollection=Collection.objects.filter(mainid=pk).using("account")
    getcollection.delete()
    for collection in serializer.data:
        obj=Collection(           
                projectid=pk,
                invoicereference=collection['invoicenb'],
                received_amount=collection['transactionvalue'],
                paymentduedate=collection['paymentduedate'],
                paymentreceiptdate=collection['transaction_date'],
                paymenttype=collection['paymenttypeid'],
                mainid=pk
        )

        total_collection=total_collection+collection['transactionvalue']
        obj.save(using="account")
    projects=projectsoverview.objects.filter(mainid=pk).using("account").first()
    projects.accumulatedcollectedamount=total_collection
    projects.balance2collect=((int(projects.contractamount)+int(total_variation_amount))-(int(total_collection)))
        #total_invoice=total_invoice+collection['transactionvalue']
    projects.save(using="account")
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view()
@permission_classes([AllowAny])
def PaymentType(request):
    payment = Paymenttypes.objects.all().using("account")
    serializer = PaymentTypesSerializer(payment, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')





@api_view()
@permission_classes([AllowAny])
def Parameters(request):
    parameters = Parameters4Po.objects.all().using("account")
    serializer = ParametersSerializer(parameters, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@api_view()
@permission_classes([AllowAny])
def GetCertified(request,pk):
    certified = Certifiedpayment.objects.filter(mainid=pk).using("account").order_by('-serialnb')
    serializer = CertifiedpaymentSerializer(certified, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateCertified(request):
        certify = Certifiedpayment.objects.filter(serialnb=request.data['serialnb']).using("account").first()
        certify.certificationremark=request.data['certificationremark']
        certify.approvedcertifiedamount=request.data['approvedcertifiedamount']
        certify.certifiedamount=request.data['certifiedamount']
        old_certified_amount=certify.certifiedamount
        certify.certificationid=request.data['certificationid']
        if request.data['certificationapprovaldate'] == '':
            certify.certificationapprovaldate=request.data['certificationapprovaldate'] = None
        else:
            certify.certificationapprovaldate=request.data['certificationapprovaldate']
        # print(old_certified_amount)
        # print(request.data['certifiedamount'])
        # if(float(old_certified_amount)>float(request.data['certifiedamount'])):
        #       print("its greater")
        
        # else:
        #       print("its smalller")
        
        certify.save()

        if (request.data['approvedcertifiedamount']=='0'):
                variation = Vodetails.objects.filter(projectid=certify.projectid,voapprovalstatus='Approved').using("account")
                total_variation_amount = sum(variation.values_list('voamount', flat=True))
                certified = Certifiedpayment.objects.filter(projectid=certify.projectid).using("account")
                total_price = sum(certified.values_list('certifiedamount', flat=True))

                projects=projectsoverview.objects.filter(projectid=certify.projectid).using("account").first()
                #data=request.data
                projects.accumulatedcertamount=((float(total_price)+float(request.data['certifiedamount']))-float(old_certified_amount))
                projects.balance2certify=((float(projects.contractamount)+float(total_variation_amount))-((float(total_price)+float(request.data['certifiedamount']))-float(old_certified_amount)))
                projects.save()
              
        else:
                variation = Vodetails.objects.filter(projectid=certify.projectid,voapprovalstatus='Approved').using("account")
                total_variation_amount = sum(variation.values_list('voamount', flat=True))

                certified = Certifiedpayment.objects.filter(projectid=certify.projectid).using("account")
                total_price = sum(certified.values_list('certifiedamount', flat=True))

            
                projects=projectsoverview.objects.filter(projectid=certify.projectid).using("account").first()
                #data=request.data
                projects.accumulatedcertamount=((float(total_price)+float(request.data['certifiedamount']))-old_certified_amount)
                projects.balance2certify=((float(projects.contractamount)+float(total_variation_amount))-((float(total_price)+float(request.data['certifiedamount']))-float(old_certified_amount)))
                projects.save()
                send_mail(
                "Certified Payment-Project Managment Department",
                "This is to inform you that we received confirmation for the certified amount of "+ str(request.data['approvedcertifiedamount']) +" against "+certify.certificationid+" for project #"+str(certify.projectid)+" Please take the necessary action. If you have any questions, don't hesitate to reach out.",
                "nextlevelgroup.do.not.reply@gmail.com",
                ["accounts@nlc-me.com"],
                fail_silently=False,
                )

        return JsonResponse(request.data,status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
def SaveCertified(request):
        # percentage=int(request.data['paymentpercentage'])/100
        payments = Certifiedpayment.objects.all().using("account").last()
        serializer = CertifiedpaymentSerializer(payments)

        variation = Vodetails.objects.filter(projectid=request.data['projectid'],voapprovalstatus='Approved').using("account")
        total_variation_amount = sum(variation.values_list('voamount', flat=True))
        if(serializer.data['serialnb']==None):
                new_id=1
        else:
                new_id=(serializer.data['serialnb']+1)

        if request.data['certificationapprovaldate'] == '':
            
            certificationapprovaldate_new = None
        else:
            certificationapprovaldate_new=request.data['certificationapprovaldate']
        obj=Certifiedpayment(
        #         pptid=new_id,
        #         projectid=ProjectsList.objects.filter(project_id=request.data['projectid']).using("projects").order_by('-project_id').first(),
        #         paymenttermid=Paymentterms.objects.filter(paytid=request.data['paymenttermid']).using("projects").first(),
                serialnb=new_id,
                certificationid=request.data['certificationid'],
                certifiedamount=request.data['certifiedamount'],
                certificationdate=request.data['certificationdate'],
                certificationremark=request.data['certificationremark'],
                approvedcertifiedamount=request.data['approvedcertifiedamount'],
                
                certificationapprovaldate=certificationapprovaldate_new,
                # accumulatedcertamount=request.data['accumulatedcertamount'],
                #balance2certify=request.data['balance2certify'],
                #oldcertifiedamount=request.data['oldcertifiedamount'],
                projectid = request.data['projectid'],
                mainid=request.data['mainid']
                #ProjectsList.objects.filter(project_id=request.data['projectid']).using("projects")[:1]
        )
        certified = Certifiedpayment.objects.filter(projectid=request.data['projectid']).using("account")
        total_price = sum(certified.values_list('certifiedamount', flat=True))

            
        projects=projectsoverview.objects.filter(projectid=request.data['projectid']).using("account").first()
        #data=request.data
        projects.accumulatedcertamount=float(total_price)+float(request.data['certifiedamount'])
        projects.balance2certify=((float(projects.contractamount)+float(total_variation_amount))-(float(total_price)+float(request.data['certifiedamount'])))
        projects.save()

        obj.save(using="account")

        if (request.data['approvedcertifiedamount']=='0'):
              None
        else:
                send_mail(
                "Certified Payment-Project Managment Department",
                "This is to inform you that we received confirmation for the certified amount of "+ str(request.data['approvedcertifiedamount']) +" against "+request.data['certificationid']+" for project #"+str(request.data['projectid'])+" Please take the necessary action. If you have any questions, don't hesitate to reach out.",
                "nextlevelgroup.do.not.reply@gmail.com",
                #["adil@nlc-me.com"],
                ["accounts@nlc-me.com"],
                fail_silently=False,
                )
        return JsonResponse(request.data,status=201)


@api_view()
@permission_classes([AllowAny])
def GetCertifiedPaymentTotal(request,pk):
    certified = Certifiedpayment.objects.filter(mainid=pk).using("account")
    total_price = sum(certified.values_list('certifiedamount', flat=True))
    #serializer = CertifiedpaymentSerializer(certified, many=True)
    #json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(total_price, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def GetCertifiedApprovedPaymentTotal(request,pk):
    certified = Certifiedpayment.objects.filter(mainid=pk).using("account")
    approved_total_price = sum(certified.values_list('approvedcertifiedamount', flat=True))
    #serializer = CertifiedpaymentSerializer(certified, many=True)
    #json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(approved_total_price, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def GetCertifiedPaymentEdit(request,pk):
    #certified = Certifiedpayment.objects.filter(serialnb=pk).using("account").first()
    #total_price = sum(certified.values_list('certifiedamount', flat=True))
    #serializer = CertifiedpaymentSerializer(certified,many=True)

    certified = Certifiedpayment.objects.filter(serialnb=pk).using("account").first()
    serializer = CertifiedpaymentSerializer(certified)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')





@api_view()
@permission_classes([AllowAny])
def GetGlassType(request):
        glassType = Glasstypes.objects.all().using("account")
        serializer = GlasstypesSerializer(glassType,many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')




@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateProjectStatus(request):
        #projects=Projoverview.objects.filter(projectid=request.data['projectid']).using("account").first()
        project = ProjectsList.objects.filter(project_id=request.data['id']).using("projects").first()      
        project.projectstatus=request.data['projectstatus']

        project.save()
        return JsonResponse(request.data,status=201)



@api_view()
@permission_classes([AllowAny])
def GetAttachment(request,pk):
    certified = Attachments.objects.filter(mainid=pk).using("account").order_by('-id')
    serializer = AttachmentSerializer(certified, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')




@api_view(['POST'])
@permission_classes([AllowAny])
def ProjectAttachmentADD(request):
        obj=Attachments(           
                project_id=request.data['projectid'],
                title=request.data['title'],
                link=request.data['link'],
                mainid=request.data['mainid'],
                date=datetime.date.today()
        )

        # obj=Vodetails(
        #     projectid=request.data['projectid'],
        #     vonb=request.data['vonb'],
        #     voamount=request.data['voamount'],
        #     vodate=request.data['vodate'],
        #     vodescription=request.data['vodescription'],
        #     voapprovalstatus=request.data['voapprovalstatus'],
        #     voapprovalform=request.data['voapprovalform'],
        #     voapprovaldate=request.data['voapprovaldate'],
        # )
        # 
        
        obj.save(using="account")
        return JsonResponse(request.data,status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
def SearchEventByImpact(request):
        event = Eventslogging.objects.filter(projectid=request.data['projectid'],eventimpact=request.data['eventimpact']).using("account").order_by('-eventid')
        serializer = EventLoggingSerializer(event, many=True)
        json_data = JSONRenderer().render(serializer.data)
       
        return HttpResponse(json_data, content_type='application/json')



@api_view(['POST'])
@permission_classes([AllowAny])
def SearchEventByCAT(request):
        event = Eventslogging.objects.filter(projectid=request.data['projectid'],category=request.data['category']).using("account").order_by('-eventid')
        serializer = EventLoggingSerializer(event, many=True)
        json_data = JSONRenderer().render(serializer.data)
       
        return HttpResponse(json_data, content_type='application/json')




@api_view(['POST'])
@permission_classes([AllowAny])
def SearchEventByDate(request):
        event = Eventslogging.objects.filter(projectid=request.data['projectid'],eventdate__gte=request.data['date1'],eventdate__lte=request.data['date2'] ).using("account").order_by('-eventid')
        serializer = EventLoggingSerializer(event, many=True)
        json_data = JSONRenderer().render(serializer.data)
       
        return HttpResponse(json_data, content_type='application/json')





@api_view()
@permission_classes([AllowAny])
def DeleteEventLog(request,pk):
        # event = Eventslogging.objects.filter(projectid=request.data['projectid'],eventdate__gte=request.data['date1'],eventdate__lte=request.data['date2'] ).using("account").order_by('-eventid')
        # serializer = EventLoggingSerializer(event, many=True)
        # json_data = JSONRenderer().render(serializer.data)
        logs = Eventslogging.objects.filter(eventid=pk).using("account").first()
        logs.delete()
        return HttpResponse(request.data, content_type='application/json')



@api_view()
@permission_classes([AllowAny])
def DeleteAttachment(request,pk):
        # event = Eventslogging.objects.filter(projectid=request.data['projectid'],eventdate__gte=request.data['date1'],eventdate__lte=request.data['date2'] ).using("account").order_by('-eventid')
        # serializer = EventLoggingSerializer(event, many=True)
        # json_data = JSONRenderer().render(serializer.data)
        logs = Attachments.objects.filter(id=pk).using("account").first()
        logs.delete()
        return HttpResponse(request.data, content_type='application/json')



@api_view(['GET'])
@permission_classes([AllowAny])
def GetFinishingList(request):
        event = Finishingtype.objects.all().using("account").order_by('-finishid')
        serializer = FinishingtypeSerializer(event, many=True)
        json_data = JSONRenderer().render(serializer.data)
       
        return HttpResponse(json_data, content_type='application/json')


@csrf_exempt
@api_view(['POST'])
def AddGMDamage(request):
    if request.method == "POST":
        orderdate=0
        if request.data['order_date'] == '':
            
            orderdate = None
        else:
            orderdate=request.data['order_date']

        obj=NonSystemDamage(
                project=request.data['project'],
                type=request.data['type'],
                refrence=request.data['refrence'],
                reason=request.data['reason'],
                qty=request.data['qty'],
                replacement_status=request.data['replacement_status'],
                order_date=orderdate,
                recieved_status=request.data['recieved_status'],
        )
        obj.save()
        return Response({"message":"200"})  
        # serializer = NonSystemDamageSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse(serializer.data, status=201)
        # return JsonResponse(serializer.errors, status=400)
    

@api_view()
@permission_classes([AllowAny])
def GetNONSystemDamageList(request,pk):
    damage = NonSystemDamage.objects.filter(project=pk)
    serializer = NonSystemDamageSerializer(damage, many=True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['POST'])
@permission_classes([AllowAny])
def UpdateDamageItem(request):
        damage = NonSystemDamage.objects.get(id=request.data['id'])
        damage.qty=request.data['qty']
        damage.replacement_status=request.data['replacement_status']
        #damage.order_date=request.data['order_date']
        damage.recieved_status=request.data['recieved_status']
        if request.data['order_date'] == '':
            damage.order_date = None
        else:
            damage.order_date=request.data['order_date']

        damage.save()
        #print(damage)
        return Response({"message":"201"}) 



@csrf_exempt
@api_view(['POST'])
def ADDNSI(request):

    serializer = NonSysteMSerializer(data=request.data)
    #serializer.data)
    #serializer = StockSerializer(data)
    #if serializer.is_valid():   
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)