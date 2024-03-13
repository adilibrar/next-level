from typing import ItemsView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
#from backend.store.models import ItemType
from .views import DepartmentViews
from .views import ItemViews
from .views import ItemTypeViews
from .views import StockView
from .views import StockDamageView
from .views import ProjectViews
from .views import StatusView
from .views import MiscView
from .views import CartView
from .views import OrderView
from .views import FCorVisionView
from .views import CorVisionView
from .views import PurchaseOrderView
from .views import StrippingView
from .views import SiteView
from .views import NCRView
from .views import ProductionView
from .views import SupplierViews
from .views import StockListView
from .views.StockIssuingViews import StockIssuingViewSet
from .views.StockDamageView import StockDamageViewSet
from .views import CorvisionData

router = DefaultRouter()
router.register('stock-issued', StockIssuingViewSet, basename='stock-issued')
router.register('stock-damaged', StockDamageViewSet, basename='stock-damaged')
# urlpatterns=router.urls
urlpatterns = [
    # Start of department URL

    #path('', DepartmentViews.department_list),
    #path('<int:pk>', DepartmentViews.department_detail),

    # End of Department URL


    # Start of department URL

    path('department-list', DepartmentViews.department_list),
    path('department/<int:pk>', DepartmentViews.department_detail),


    path('stock', StockView.stock_list),
    path('stock-detail', StockView.stock_list_detail),
    path('available-stock', StockView.AvailableStock),
    path('acc-stock', StockView.AccStock),
    path('out-of-stock', StockView.OutOfStock),
    path('single-stock/<int:pk>', StockView.single_stock),
    path('single-stock-qty', StockView.single_stock_qty),
    path('updateIssuedItemStatus/<int:pk>',StockView.updateIssuingStockStatus),

    path('stock-issuing',StockView.IssueStock),
    path('stock-issued-list',StockView.stock_issued_list),
    path('stock-issued-by-project/<int:pk>',StockView.stock_issued_list_by_project),
    #path('damge-stock/<int:pk>',StockDamageView)
    

    path('change-assigned-quantity',MiscView.Changed_assigned_qty),


    path('itemtype', ItemTypeViews.item_type),
    path('items', ItemViews.item),
    path('items/<int:pk>', ItemViews.SingleItem),
    path('', include(router.urls)),


    path('projects',ProjectViews.Projects),
    path('latest-projects',ProjectViews.LatestProjects),
    path('running-projects',ProjectViews.RunningProjects),
    path('projects/<int:pk>',ProjectViews.SingleProject),
    path('item-by-projects/<int:pk>',ProjectViews.ItemForProject),
    
    # End of Department URL


    #check stock availibility
    path('stock-avalibility/<int:pk>',MiscView.stock_avalibility),
    path('stock-avalibility-by-item/<int:pk>',MiscView.stock_avalibility_BY_Item),
    
    path('adding-damage',MiscView.adding_damage),

    path('status', StatusView.get_all),


    path('add-to-cart',CartView.AdddToCart),
    path('cart-list',CartView.CartList),

    path('create-order',OrderView.CreateOrder),
    path('create-quotation-order-item',OrderView.AddQuotationOrderItem),
    
    path('order-list',OrderView.OrderList),
    path('order-list-limit',OrderView.OrderListLimit),
    path('approved-order-item',OrderView.ApprovedOrderItems),
    path('send-email-not-available',OrderView.NAEmail),
    path('approved-quotation-order-item',OrderView.ApprovedQuotationOrderItems),
    

    path('order-item/<int:pk>',OrderView.OrderItems),
    path('order-detail/<int:pk>',OrderView.OrderDetail),
    path('create-order-quotation',OrderView.PR_Save),
    path('order-update/<int:pk>',OrderView.Order),
    path('order-update-quotation-item/<int:pk>',OrderView.Order),
    path('order-update-and-item/<int:pk>',OrderView.QuotationOrderItemUpdate),

    
    path('order-approve-and-item/<int:pk>',OrderView.UpdateOrderAndItem),
    path('import-supplier',MiscView.supplier_upload),
    path('import-item',MiscView.stock_upload),
    path('import-account',MiscView.Account_upload),
    

    path('issued-item-update',MiscView.Changed_assigned_qty_issued),


    
    
    path('get-alternative',ItemViews.Alternative),
    path('production-stock',ItemViews.ProductionStockView),

    path('po-list',PurchaseOrderView.PO_List),
    path('po-list-pi',PurchaseOrderView.PIPO_List),
    path('update-pi-mto',PurchaseOrderView.UpdatePIMTO),
    path('po-list-limit',PurchaseOrderView.PO_List_Limit),
    path('save-po-item',PurchaseOrderView.adding_poitem),
    path('save-po-quotation-item',PurchaseOrderView.adding_quotation_poitem),
    
    path('po-item-list/<int:pk>',PurchaseOrderView.PoItemlist),
    path('po-quotation-item-list/<int:pk>',PurchaseOrderView.PoQItemlist),
    path('update-po-item',PurchaseOrderView.Changed_stock_qty),
    path('update-st-item',StrippingView.Changed_stock_qty),
    path('update-pr-item/<int:pk>',PurchaseOrderView.UpdatePRItems),
    path('update-quot-pr-item/<int:pk>',PurchaseOrderView.UpdatePRQItems),
    path('get-reserved-item-mto/<int:pk>',StockView.IssuedItemForMTO),

    path('update_stock_balnce-reserved',StockView.update_stock_balnce),
    path('get-finishing',MiscView.GetFinishing),
    path('single-po/<int:pk>',PurchaseOrderView.SinglePO),
    path('pr-item-by-date',ProductionView.PRItemByDate),
    path('po-accounts-submitted',PurchaseOrderView.Submitted_Po_accounts),
    path('get-po-accounts-submitted',PurchaseOrderView.GetSubmitted_Po_accounts),
    path('get-po-accounts-approved',PurchaseOrderView.GetSubmittedApproved_Po_accounts),
    path('approve-submitted-po',PurchaseOrderView.Approve_Submitted_Po),
    path('new-stock-list',StockView.New_stock_list),
    path('new-stock-list-type',StockView.New_stock_list_With_Type),
    path('new-stock-list-itemid',StockView.New_stock_list_With_Item),
    path('issued-stock-rollback',MiscView.StockReservedItem),
    path('update-revoked-stock',MiscView.UpdateRevokeStock),

    path('po-item-recieve',PurchaseOrderView.POIemRecieve),
    path('supplier-dn-in-list',PurchaseOrderView.SupplierDeliverNote),
    path('dnin-supplier-item-save',PurchaseOrderView.DNINSupplierItemSave),

    path('accounts-head-list',MiscView.GetAccountsHead),

    path('low-stock-report',StockView.LowStockReport),
    
    
    path('return-issue-stock',ProductionView.ReturnIssueStock),
    
    
    path('quotation-order-item/<int:pk>',OrderView.QuotationOrderItems),

    path('site-delivery-list',SiteView.SDN_List),

    path('save-site-item',SiteView.add_site_item),

    path('site-delivery-item/<int:pk>',SiteView.SDN_Item),


    path('single-site-dn/<int:pk>',SiteView.SingleSiteDN),

    path('all-mto-data/<int:pk>',StockView.IssuedItemForProject),
    
    #path('supplier-dn-all-items/<int:pk>',StockView.IssuedItemForProject),
    
    path('supplier-dn-all-items/<int:pk>',SupplierViews.RecievedItemForInvoice),
    
    path('save-site-dn',SiteView.SiteDN_Save),
    
    path('supplier-list',SupplierViews.SupplierList),
    path('supplier-dn-save',SupplierViews.SupplierDNSave),

    path('adjust-balance-issue',MiscView.UpdateStock_For_Issuing),
    path('revoke-list',MiscView.StockRevokedDetail),

    path('restore-revoked',MiscView.RestoreRevoked),
    path('revoke-list-project/<int:pk>',MiscView.StockRevokedDetailProject),
    path('item-list-by-mto/<int:pk>',MiscView.StockReservedForMTO),
    


    path('get-released-window-data-short/<int:pk>',CorVisionView.ReleasedWindowDataShort),
    path('get-corvision-data/<int:pk>',CorVisionView.CORVision),
    path('get-corvision-profile',CorVisionView.CORVision_Profile),
    path('get-corvision-acc',CorVisionView.CORVision_Acc),
    path('get-corvision-gasket',CorVisionView.CORVision_Gasket),
    path('get-corvision-screw',CorVisionView.CORVision_Screw),
    path('get-corvision-packing',CorVisionView.CORVision_Packing),
    path('get-corvision-glass',CorVisionView.CORVision_Glass),
    path('get-corvision-interlock',CorVisionView.CORVision_InterLock),

    
    path('update-cor-profile',CorVisionView.UpdateCorProfile),

    path('get-single-corvision-profile/<int:pk>',CorVisionView.GetSingleProfile),

    path('get-total-profile/<int:pk>/<int:pk2>',CorVisionView.CORVCutting_Profile),
    path('update-window-status/<int:pk>',CorVisionView.UpdateWindowStatus),
    path('update-window-status-wnum/<int:pk>/<int:pk2>',CorVisionView.UpdateWindowStatusWNum),
    path('update-created-window-status',CorVisionView.UpdateWindowStatusCustom),

    path('get-corvision-interlockacc',CorVisionView.CORVision_InterLockAcc),
    path('get-floors/<int:pk>',CorVisionView.GetFloor),
    path('get-elevation/<int:pk>/<int:pk2>',CorVisionView.GetElevation),
    path('get-single-floor/<int:pk>',CorVisionView.GetSingleFloor),
    path('get-lock',CorVisionView.GetLock),

    ####final releas window
    path('final-release-window',FCorVisionView.ReleaseWindow),
    path('final-get-corvision-profile',FCorVisionView.CORVision_Profile),
    path('final-get-corvision-acc',FCorVisionView.CORVision_Acc),
    path('final-get-corvision-gasket',FCorVisionView.CORVision_Gasket),
    path('final-get-corvision-screw',FCorVisionView.CORVision_Screw),
    path('final-get-corvision-packing',FCorVisionView.CORVision_Packing),
    path('final-get-corvision-glass',FCorVisionView.CORVision_Glass),
    path('final-get-corvision-interlockacc',FCorVisionView.CORVision_InterLockAcc),
    path('final-get-corvision-interlock',FCorVisionView.CORVision_InterLock),



    path('final-floor-windows/<int:pk>/<int:pk2>',FCorVisionView.FloorWindows),


    path('final-single-window-data/<int:pk>',FCorVisionView.SingleWindowData),
    path('final-window-data/<int:pk>',FCorVisionView.WindowData),
    path('final-window-interlock-data/<int:pk>',FCorVisionView.WindowDataInterlock),
    path('final-window-acc-data/<int:pk>',FCorVisionView.WindowDataAcc),
    path('final-window-acc-interlock-data/<int:pk>',FCorVisionView.WindowDataAccInterlock),
    path('final-window-screw-data/<int:pk>',FCorVisionView.WindowDataScrew),
    path('final-window-gasket-data/<int:pk>',FCorVisionView.WindowDataGasket),
    path('final-window-glass-data/<int:pk>',FCorVisionView.WindowDataGlass),
    path('final-window-packing-data/<int:pk>',FCorVisionView.WindowDataPacking),

    path('final-release-window-custom-dim',FCorVisionView.ReleaseWindowCustomDim),
    # path('all-corvision-data',CorVisionView.CORVisionWindows),

    ###Mto released window
    path('release-window',CorVisionView.ReleaseWindow),
    path('release-window-custom-dim',CorVisionView.ReleaseWindowCustomDim),
    path('release-window-custom-shutter',CorVisionView.ReleaseWindowCustomShutter),
    path('final-release-window-custom-shutter',CorVisionView.FinalReleaseWindowCustomShutter),
    path('release-window-custom-dim-data/<int:pk>',CorVisionView.ReleaseWindowCustomDimData),
    path('release-window-custom-shutter-data/<int:pk>',CorVisionView.ReleaseWindowCustomShutterData),
    
    path('floor-windows/<int:pk>/<int:pk2>',CorVisionView.FloorWindows),
    path('window-data/<int:pk>',CorVisionView.WindowData),
    path('single-window-data/<int:pk>',CorVisionView.SingleWindowData),
    path('window-interlock-data/<int:pk>',CorVisionView.WindowDataInterlock),
    path('window-acc-data/<int:pk>',CorVisionView.WindowDataAcc),
    path('window-acc-interlock-data/<int:pk>',CorVisionView.WindowDataAccInterlock),
    path('window-screw-data/<int:pk>',CorVisionView.WindowDataScrew),
    path('window-gasket-data/<int:pk>',CorVisionView.WindowDataGasket),
    path('window-glass-data/<int:pk>',CorVisionView.WindowDataGlass),
    path('window-packing-data/<int:pk>',CorVisionView.WindowDataPacking),
    path('all-corvision-data',CorVisionView.CORVisionWindows),
    path('single-lock/<int:pk>',CorVisionView.GetSingleLock),
    path('save-floor',CorVisionView.SaveFloor),
    


    path('save-corvision-data',CorvisionData.SaveCorVision),
    path('save-window-profile-data',CorvisionData.SaveCorVisionProfile),
    path('save-corvisioninterlock-profile-data',CorvisionData.SaveCorVisionInterLockProfile),
    path('save-corvisioninterlock-acc-data',CorvisionData.SaveCorVisionInterLockAcc),
    path('save-window-acc-data',CorvisionData.SaveCorVisionAcc),
    path('save-window-gasket-data',CorvisionData.SaveCorVisionGasket),
    path('save-window-screw-data',CorvisionData.SaveCorVisionScrew),
    path('save-window-packing-data',CorvisionData.SaveCorVisionPacking),
    path('save-window-glass-data',CorvisionData.SaveCorVisionGlass),

    path('get-window-profile-data/<int:pk>',CorvisionData.GetCorWindowProfileData),
    path('get-interlock-profile-data/<int:pk>',CorvisionData.GetCorWindowInterlockProfileData),
    path('get-cor-acc-data/<int:pk>',CorvisionData.GetCorWindowAccData),
    path('get-cor-gasket-data/<int:pk>',CorvisionData.GetCorWindowGasketData),
    path('get-cor-screw-data/<int:pk>',CorvisionData.GetCorWindowScrewData),
    path('get-cor-packing-data/<int:pk>',CorvisionData.GetCorWindowPackingData),
    path('get-cor-glass-data/<int:pk>',CorvisionData.GetCorWindowGlassData),
    path('get-cor-interlock-acc-data/<int:pk>',CorvisionData.GetCorWindowIAData),
    
    
    

    path('delete-window-profile-data/<int:pk>',CorvisionData.DeleteCorProfile),
    path('delete-window-interprofile-data/<int:pk>',CorvisionData.DeleteCorInterProfile),
    path('delete-window-interacc-data/<int:pk>',CorvisionData.DeleteCorInterAcc),
    path('delete-window-acc-data/<int:pk>',CorvisionData.DeleteCorAcc),
    path('delete-window-gasket-data/<int:pk>',CorvisionData.DeleteCorGasket),
    path('delete-window-screw-data/<int:pk>',CorvisionData.DeleteCorScrew),
    path('delete-window-packing-data/<int:pk>',CorvisionData.DeleteCorPacking),
    path('delete-window-glass-data/<int:pk>',CorvisionData.DeleteCorGlass),


    
    path('stock-view-by-item/<int:pk>',StockView.StockIssuingByItem),

    path('update-stock-revoke-qty',StockView.StockAndRevokeUpdate),
    path('mandatory-stock-list',StockView.MandatoryStockAll),


    ##validate stock list
    path('get-corvision-stocklist/<int:pk>',StockListView.GetStockList),
    path('get-single-stocklist/<int:pk>',StockListView.GetSingleStockList),
    path('get-single-stocklist-detail/<int:pk>',StockListView.GetSingleStockListDetail),
    path('validate-stock-list/<int:pk>/<int:pk2>',StockListView.ValidateStockList),

    path('ncr-list',NCRView.NCR_List),
    path('save-ncr',NCRView.SaveNCR),
    path('save-ncr-items',NCRView.SaveNCRItems),
    path('get-ncr-items-list/<int:pk>',NCRView.NCRItemList),

    path('get-ncr-balance-ran/<int:pk>',NCRView.NCRItemRAN),
    path('update-ncr-item',NCRView.UpdateNCRItem),
    path('ncr-item-list-by-project/<int:pk>',NCRView.NCRItemListProject),
    path('ncr-list-by-project/<int:pk>',NCRView.NCRListProject),

    

    
    
]

