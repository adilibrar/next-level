from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
#from store.Model.DepartmentModel import Department
#from store.Model.CurrencyModel import Currency
#from store.Model.ItemModel import Item
#from store.Model.ProjectModel import Project
#from store.Model.SupplierModel import Supplier
#from store.Model.SystemModel import System
#from store.Model.UnitModel import Unit
from .models import *
from django.contrib.auth.admin import UserAdmin


@admin.register(Profile)
class UserProfile(admin.ModelAdmin):
    list_display=['user','department','comments']

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ['name', 'symbol']


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'image']
    search_fields = ['name','itemcode']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'refrence_no']


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'contact', 'email', 'address', 'vat_number']


@admin.register(System)
class SystemAdmin(admin.ModelAdmin):
    list_display = ['name', 'orign']


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['name', 'Short']


@admin.register(ItemType)
class ItemTypeAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Finishing)
class FinishingAdmin(admin.ModelAdmin):
    list_display = ['id','name']

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ['title']


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ['id', 'quantity', 'stockvalue','item']
    search_fields = ['item__name','item__itemcode']

@admin.register(Stock_issuing)
class StockAdminn(admin.ModelAdmin):
    list_display = ['project', 'department', 'Issued_item',
                     'length', 'quantity', 'status']

@admin.register(Stock_damage)
class StockDamage(admin.ModelAdmin):
    list_display=['title','quantity','length']


@admin.register(MTO)
class MTO(admin.ModelAdmin):
    list_display = ['projectmto','description','extra','revision','status']

#@admin.register(MTOItem)
#class MTOItem(admin.ModelAdmin):
 #   list_display = ['mto','itemname','quantity','revision','status']

@admin.register(MTOImport)
class MTOImportAdmin(ImportExportModelAdmin):
    list_display = ['First','Last','Gender']


@admin.register(CORVISION)
class MTOImportAdmin(ImportExportModelAdmin):
    list_display = ['name','status','type']


@admin.register(CorVisionProfile)
class MTOImportAdmin(ImportExportModelAdmin):
    list_display = ['title','CorVision','CorVisionItem','formula','quantity','cutting']


@admin.register(CorPacking)
class MTOImportAdmin(ImportExportModelAdmin):
    list_display = ['title','CorVision','CorVisionItem','quantity','formula','cutting']


@admin.register(CorVisionInterLock)
class CorVisionInterLockAdmin(ImportExportModelAdmin):
    list_display = ['title','CorVision','CorVisionItem','quantity','minimum','maximum','formula','cutting','profileFormula']


@admin.register(CorVisionInterLockAcc)
class CorVisionInterLockAdmin(ImportExportModelAdmin):
    list_display = ['title','CorVision','CorVisionItemProfile','CorVisionItemAcc','quantity','formula','cutting','coating','remark','pair']


@admin.register(CorVisionDIM)
class CorVisionDIMAdmin(ImportExportModelAdmin):
    list_display = ['CorVision','title','formula','heightFormula']


@admin.register(CorVisionShutter)
class CorVisionShutterAdmin(ImportExportModelAdmin):
    list_display = ['CorVision','title','Widthformula','Heightformula']


@admin.register(CorVisionGlass)
class CorVisionGlassAdmin(ImportExportModelAdmin):
    list_display = ['CorVision','title','Widthformula','Heightformula']



@admin.register(CorVisionGasket)
class CorVisionGasket(ImportExportModelAdmin):
    list_display = ['title','CorVision','CorVisionItem','quantity','formula','cutting']


@admin.register(CorScrew)
class CorVisionScrew(ImportExportModelAdmin):
    list_display = ['title','CorVision','CorVisionItem','quantity','formula','cutting']




@admin.register(CorVisionHardware)
class CorVisionHardware(ImportExportModelAdmin):
    list_display = ['CorVision','title','CorVisionItem','quantity']



@admin.register(CorVisionAcc)
class CorVisionAcc(ImportExportModelAdmin):
    list_display = ['CorVision','title','CorVisionItem','quantity']


@admin.register(PurchaseOrder)
class PurchaseOrder(ImportExportModelAdmin):
    list_display = ['refrence','PurchaseSupplier','projectpo','creation_date']

@admin.register(StockAlternative)
class StockAdmin(admin.ModelAdmin):
    list_display = ['id']
    search_fields = ['item__name','item__itemcode']


@admin.register(ProductionStock)
class ProductionStock(admin.ModelAdmin):
    list_display = ['id']


@admin.register(DeliveryNoteFromSupplier)
class ProductionStock(admin.ModelAdmin):
    list_display = ['orderno','created_at']


@admin.register(MTOItem)
class ProductionStock(admin.ModelAdmin):
    list_display = ['mto','itemname','quantity','extra_quantity',]


@admin.register(CartOrder)
class ProductionStock(admin.ModelAdmin):
    list_display = ['id','description']

@admin.register(SiteDeliveryNote)
class ProductionStock(admin.ModelAdmin):
    list_display = ['id','prsrno','issue_project']


@admin.register(PurchaseOrderItems)
class ProductionStock(admin.ModelAdmin):
    list_display = ['po_item']


@admin.register(DeliveryNoteFromSupplierItem)
class ProductionStock(admin.ModelAdmin):
    list_display = ['DNINFromsupplierNo']


@admin.register(Floor)
class CorVisionFloor(ImportExportModelAdmin):
    list_display = ['title','projectfloor']


@admin.register(Elevation)
class CorVisionElevation(ImportExportModelAdmin):
    list_display = ['title','floorelevation','ElevationProject']


@admin.register(Lock)
class CorVisionLock(ImportExportModelAdmin):
    list_display = ['lockitem']
    

@admin.register(MandatoryStock)
class MandatoryStock(ImportExportModelAdmin):
    list_display = ['MandatoryItem','minimum']
    

@admin.register(ReleasedWindow)
class MandatoryStock(ImportExportModelAdmin):
    list_display = ['id']
    

##Tentative Glass Temporary

@admin.register(TentativeGlassBooking)
class TentativeGlassB(ImportExportModelAdmin):
    list_display = ['TentaiveGlassBookingProject','purchaseRef','QuotationRef','GlassType','area','status','GlassProcessor','remarks','inquiry_date','quotation_receiving_date','booking_cofirmation_date',]
    



@admin.register(TentativeGlass)
class TentativeGlass(ImportExportModelAdmin):
    list_display = ['TentaiveGlassProject','revision','remarks']
    

@admin.register(TentativeGlassItem)
class TentativeGlassItem(ImportExportModelAdmin):
    list_display = ['TentativeGlassID','TentaiveGlassType','WindowRef','height','quantity','area','location']


@admin.register(GlassCutting)
class TentativeGlassCutting(ImportExportModelAdmin):
    list_display = ['TentaiveGlassCuttingProject','remarks']

@admin.register(TentativeGlassType)
class TentativeGlassTypeAd(ImportExportModelAdmin):
    list_display = ['title','description']
    


@admin.register(Certifiedpayments)
class CertifiedPaymentsClass(ImportExportModelAdmin):
    list_display=['CertifiedProject','CertificationID']



@admin.register(NCR)
class NCR(ImportExportModelAdmin):
    list_display=['id','NCRProject','refrence']

    
@admin.register(NCRItems)
class NCRItems(ImportExportModelAdmin):
    list_display=['NCRId','NCRItemProject','title']