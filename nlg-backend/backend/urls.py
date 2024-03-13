"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from store.views import MTOViews
from store.views import MTOImportViews
from store.views import MiscView
from store.views import UserView
from store.views import CartView
from store.views import DeliveryNoteViews
from store.views import ProductionView
from store.views import StockView
from store.views import ProjectViews
from store.views import StrippingView
from store.views import CurrencyViews
from store.views import PurchaseOrderView
from store.views import EProjOverview
from store.views import TentativeGlass
from store.views.Accounts import InvoiceView
#from store.views import Cities
admin.site.site_header = 'NLG admin'

urlpatterns = [

    #path('admin/', admin.site.urls),
    path('nlg-auth/', include('dj_rest_auth.urls')),

    path('admin/', admin.site.urls),
    #path('api-auth/', include('rest_framework.urls')),
    # path('department/',include,store.))

    path('department/', include('store.urls')),
    path('store/', include('store.urls')),


    path('me/',UserView.userDetailView.as_view()),
    path('profile/<int:pk>',MiscView.ProfileData),

    path('mto-list', MTOViews.Mtolist),
    path('mto-list-by-project/<int:pk>', MTOViews.MtolistBYProject),
    
    path('mto-list-submitted', MTOViews.MtolistSubmitted),
    path('single-mto/<int:pk>', MTOViews.Singlemto),
    path('add-mto', MTOViews.MTO_Save),    

    path('mto-item/<int:pk>', MTOViews.MtoItemlist),
    path('add-mtoitem', MTOViews.MTOItem_Save),    
    path('delete-mto-item/<int:pk>', MTOViews.DeleteMTOItem),
    path('delete-cart-item/<int:pk>', CartView.DeleteCartItem),
    path('mto-import/<int:pk>', MTOImportViews.simple_upload),
    path('mto-submital-status', MTOViews.update_mto),
    path('mto-item-status', MTOViews.update_mto_item), 
    path('mto-item-copy/<int:pk>/<int:pko>',MTOViews.MTOItem_Copy),
    #path('mto-item-status', MTOViews.update_mto_item), 
    path('check-mto-item',MTOViews.check_mto_item),
    path('add-dn', DeliveryNoteViews.DN_Save),  
    path('add-dn-item', DeliveryNoteViews.DN_ITEM_Save),    
    path('dn-list', DeliveryNoteViews.DN_list),    
    path('dn-list-limit', DeliveryNoteViews.DN_list_limit),
    path('dn-item-list/<int:pk>', DeliveryNoteViews.DNItemlist),
    path('dn-copy-status', DeliveryNoteViews.update_dn_copy),
    path('delete-dn-item/<int:pk>', DeliveryNoteViews.DeleteDNItem),
    path('delete-dn-item-custom/<int:pk>/<int:pk2>', DeliveryNoteViews.DeleteCustomDNItem),

    path('update-mto-item-qty/<int:pk>/<int:pk2>', MTOViews.UpdateMTOItemQTY),
    path('update-mto-item-color/<int:pk>/<pk2>', MTOViews.UpdateMTOItemColor),
    
    path('dn-item-copy/<int:pk>/<int:pko>',DeliveryNoteViews.DNItem_Copy),
    path('single-dn/<int:pk>', DeliveryNoteViews.Singledn),
    path('reserved-item-by-mto/<int:pk>', StockView.IssuedItemForMTO),

    path('save-item-issuing-production', ProductionView.ProductionIssuing_Save),
    
    path('update-issue-balance', ProductionView.update_issue_balance),    
    
    path('unit-of-measure', MiscView.UnitOfMeasure),    
    
    path('pc-item-by-project/<int:pk>', ProjectViews.DNItemForProject),
    path('pr-item-by-project/<int:pk>', ProjectViews.PRItemForProject),
    path('mto-item-color',MTOViews.mto_item_color),
    path('update-dn-note',DeliveryNoteViews.update_dn_note),

    path('add-st', StrippingView.ST_Save),  
    path('st-list', StrippingView.ST_list),  
    path('add-st-item', StrippingView.ST_ITEM_Save),    
    path('st-item-list/<int:pk>', StrippingView.STItemlist),
    path('single-st/<int:pk>', StrippingView.Singlest),
    path('update-st-note',StrippingView.update_st_note),
    path('mto-all-items/<int:pk>',MTOViews.ProjectMtoItemlist),
    path('all-mto-items/<int:pk>',MTOViews.ProjectMtoItemlistAll),
    
    path('all-currency',CurrencyViews.get_all_currency),
    path('add-po',PurchaseOrderView.Save_PO),
    path('edit-po',PurchaseOrderView.Update_PO),
    path('edit-po-item',PurchaseOrderView.Update_POItem),
    path('edit-quotation-po-item',PurchaseOrderView.Update_QPOItem),


    # external Database
    path('proj-overview',EProjOverview.projects),
    path('project-list/<int:pk>',EProjOverview.ExternalprojectsList),
    path('project-list-all',EProjOverview.ExternalprojectsListAll),
    
    path('variation-list/<int:pk>',EProjOverview.ExternalVariationList),
    path('variation-total-amount/<int:pk>',EProjOverview.VariationTotalAmount),
    
    path('save-variation',EProjOverview.SaveVariation),
    path('update-variation',EProjOverview.UpdateVariation),
    path('update-payment',EProjOverview.UpdatePayment),
    
    path('payment-terms',EProjOverview.PaymentTerms),
    path('save-project-payment',EProjOverview.SaveProjectPayment),


    path('update-project-overview',EProjOverview.UpdateProjectOverview),
    path('add-non-system-items',EProjOverview.ADDNSI),
    path('update-non-system-items',EProjOverview.UpdateNSI),
    path('update-non-system-items-sd',EProjOverview.UpdateNSISD),
    path('add-non-system-items-ms',EProjOverview.ADDNSMS),
    
    path('update-non-system-items-sd-ind',EProjOverview.UpdateNSISDIND),
    
    path('get-non-system-item-sd/<int:pk>',EProjOverview.GetNonSystemItemsSDAll),
    path('get-non-system-item-ms/<int:pk>',EProjOverview.GetNonSystemItemsMSAll),
    path('get-non-system-item/<int:pk>',EProjOverview.GetNSI),
    
    path('project-list-by-status/<pk>/<int:pk2>',EProjOverview.ExternalprojectsListByStatus),
    path('project-list-by-status-sa/<pk>',EProjOverview.ExternalprojectsListByStatusSA),
    path('project-list-by-status-pm/<pk>/<int:pk2>',EProjOverview.ExternalprojectsListByStatusPM),
    
    path('project-managers-list',EProjOverview.ExternalprojectManagers),
    path('project-managers-single/<int:pk>',EProjOverview.ExternalprojectManagersSingle),
    path('single-project/<int:pk>',EProjOverview.ExternalSingleproject),
    path('single-project-main/<int:pk>',EProjOverview.ExternalSingleprojectMain),
    
    path('single-project-overview/<int:pk>',EProjOverview.ExternalSingleprojectOverView),
    path('create-project-profile',EProjOverview.CreateProjectProfile),
    path('add-glass-material-damage',EProjOverview.AddGMDamage),
    
    path('get-total-ordered-item/<int:pk>',PurchaseOrderView.OrderedItems),
    path('get-total-reserved-item/<int:pk>',MiscView.ReservedAllItems),
    
    path('get-project-payments/<int:pk>',EProjOverview.ExternalPaymentList),
    
    
    path('get-project-events/<int:pk>',EProjOverview.ProjectEventLog),
    path('update-project-events',EProjOverview.ProjectEventUpdate),

    path('edit-project-events',EProjOverview.EditProjectEvent),


    path('get-project-inoices/<int:pk>',EProjOverview.GetInvoicing),

    path('get-project-collection/<int:pk>',EProjOverview.GetCollection),
    path('get-project-rec/<int:pk>',EProjOverview.GetRec),
    path('get-project-pay/<int:pk>',EProjOverview.GetPay),

    path('payment-type-all',EProjOverview.PaymentType),

    path('all-parameters',EProjOverview.Parameters),
    path('project-certified-payment/<int:pk>',EProjOverview.GetCertified),

    path('save-certified-payment',EProjOverview.SaveCertified),
    path('update-certified-amount',EProjOverview.UpdateCertified),

        
    path('get-certified-payment-total/<int:pk>',EProjOverview.GetCertifiedPaymentTotal), 
    path('get-approved-certified-payment-total/<int:pk>',EProjOverview.GetCertifiedApprovedPaymentTotal), 
       
    path('get-certified-payment-edit/<int:pk>',EProjOverview.GetCertifiedPaymentEdit),
    path('get-glass-type',EProjOverview.GetGlassType),

    path('update-project-status',EProjOverview.UpdateProjectStatus),

    path('get-attachments-list/<int:pk>',EProjOverview.GetAttachment),
    path('add-project-attachments',EProjOverview.ProjectAttachmentADD),
    path('event-search-by-impact',EProjOverview.SearchEventByImpact),
    path('event-search-by-cat',EProjOverview.SearchEventByCAT),
    path('event-search-by-date',EProjOverview.SearchEventByDate),
    path('delete-event-log/<int:pk>',EProjOverview.DeleteEventLog),
    path('delete-attachment/<int:pk>',EProjOverview.DeleteAttachment),
    path('get-finishing-list',EProjOverview.GetFinishingList),

    path('get-tentative-glass-list/<int:pk>',TentativeGlass.GetTentativeGlass),

    path('get-tentative-glass-item/<int:pk>',TentativeGlass.GetTentativeGlassItem),
    
    path('get-glass-booking-detail/<int:pk>',TentativeGlass.GetGlassBookingDetail),
    
    path('get-glass-summary-details/<int:pk>',TentativeGlass.GetGlassSummaryDetails),
    




    path('get-tentative-glass-type',TentativeGlass.GetGlassType),
    path('get-single-tentative-glass-data/<int:pk>',TentativeGlass.GetSingleTentativeGlass),
    path('submit-tentative-glass/<int:pk>',TentativeGlass.SubmitTentativeGlass),
    path('submit-cutting-glass/<int:pk>',TentativeGlass.SubmitCuttingGlass),
    
    path('get-glass-processor-list',TentativeGlass.GetGlassProcessor),
    path('save-booking-order',TentativeGlass.SaveBookingOrder),
    path('get-glass-cutting/<int:pk>',TentativeGlass.GetGlassCutting),
    path('get-glass-booking/<int:pk>',TentativeGlass.GetGlassBooking),
    path('po-list-limit-no-depth',PurchaseOrderView.PO_List_Limit_no_depth),
    path('save-cutting-glass-item',TentativeGlass.SaveCuttingGlassItem),
    path('save-tentative-glass-item',TentativeGlass.SaveTentativeGlassItem),
    
    path('get-cutting-glass-item/<int:pk>',TentativeGlass.GetGlassCuttingList),
    path('get-cutting-glass-item-po/<int:pk>',TentativeGlass.GetGlassCuttingListPO),

    path('get-cutting-glass-item-insert-po/<int:pk>',TentativeGlass.GetGlassCuttingListinsertPO),
    
    path('get-cutting-glass-data/<int:pk>',TentativeGlass.FinalGetGlassCuttingData),
    
    path('delete-cutting-glass-item/<int:pk>',TentativeGlass.DeleteCuttingGlassItem),
    path('delete-tentative-glass-item/<int:pk>',TentativeGlass.DeleteTentativeGlassItem),
    path('get-cutting-glass-unique',TentativeGlass.GetCuttingGlassUnique),
    path('add-purchase-order-glass-item',TentativeGlass.AddPurchaseOrderGlass),
   
    path('create-tentative-glass',TentativeGlass.CreateTentativeGlassOrder),
   
    path('create-cutting-glass',TentativeGlass.CreateCuttingGlassOrder),
    path('glass-po-list/<int:pk>',TentativeGlass.Glass_PO_List),
    path('glass-po-item-list/<int:pk>',TentativeGlass.Glass_PO_Item_List),
    path('get-cutting-glass-id/<int:pk>',TentativeGlass.GetGlassCuttingID),
    path('glass-po-item-recieve',TentativeGlass.GlassPORecieve),

    path('save-glass-supplier-item',TentativeGlass.SaveGlassSupplierItem),
    path('get-project-glass-summary/<int:pk>',TentativeGlass.ProjectGlassSummary),

    path('create-new-project',ProjectViews.CreateNew),
    path('update-new-project',ProjectViews.UpdateNewProject),
    path('get-city-list',ProjectViews.GetCities),
    path('get-customer-list',ProjectViews.GetCustomers),

    path('add-project-budget',ProjectViews.AddBudget),
    path('get-budget-list/<int:pk>',ProjectViews.GetBudgetList),
    path('get-budget-list-two-factor/<int:pk>/<int:pk2>',ProjectViews.GetBudgetListTwoFactor),
    path('delete-budget-list/<int:pk>',ProjectViews.DeleteBudgetList),


    path('recieve-invoice/<int:pk>',PurchaseOrderView.RecieveInvoice),
    path('get-all-invoice-status',InvoiceView.GetAllInvoiceByStatus),
    path('get-all-invoice-status-review',InvoiceView.GetAllInvoiceByStatusF),

    path('add-invoice-draft',InvoiceView.AddInvoiceDraft),

    path('remove-invoice-from-draft/<int:pk>',InvoiceView.RemoveInvoiceDraft),

    path('get-invoice-data/<int:pk>',InvoiceView.GetInVoiceData),
    
    path('review-invoice/<int:pk>',InvoiceView.ReviewInvoice),

    path('submit-for-approval',InvoiceView.SubmitToApprove),

    path('get-certified-payments-list',InvoiceView.GetCertifiedPayments),

    path('update-certified-payment-status/<int:pk>/<int:pk2>',InvoiceView.UpdateCertifiedStatus),

    path('get-non-system-damage-list/<int:pk>',EProjOverview.GetNONSystemDamageList),
    
    path('update-damage-items',EProjOverview.UpdateDamageItem),

    
    path('get-unique-project-id/<int:pk>',ProjectViews.GetUniqueProjectID),
    path('update-project-id/<int:pk>/<int:pk2>',MiscView.UpdatePID),
    path('copy-project-phase',ProjectViews.CopyProjects),
    



    #path('department/<int:pk>', DepartmentView.department_detail),
    #path('department/', DepartmentView.department_list),
    #path('department/<int:pk>', store.views.DepartmentViews.department_detail),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
