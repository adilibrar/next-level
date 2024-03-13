#from .Model import CurrencyModel, DepartmentModel, ItemModel, ProjectModel, SupplierModel, SystemModel, UnitModel
from locale import currency
from django.db import models
from .manager import UserManager
from django.contrib.auth.models import AbstractUser
from datetime import datetime

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #bio = models.TextField(max_length=500, blank=True)
    department = models.CharField(max_length=30,default='VI')
    comments = models.CharField(max_length=30,default='Active')
    externaluserID=models.IntegerField(default='0')
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Currency(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=100)

    class Meta:
        db_table = "Currency"

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "Department"

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=100)
    refrence_no = models.CharField(max_length=100)
    phase = models.CharField(max_length=100,default='0')
    total = models.CharField(max_length=100,default='1')
    ProjectManager = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True,default='1')
    status = models.CharField(max_length=100, null=True, default='Active')
    created_at = models.DateField(auto_now_add=True,null=True)
    completed_at = models.DateField(null=True, blank=True)
    sample = models.BooleanField(null=True, blank=False,default=False)
    class Meta:
        db_table = "Project"

    # def __str__(self):
    #     return self.refrence_no
    
class Floor(models.Model):
    title = models.CharField(max_length=100)
    projectfloor = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='projectfloor', null=True, blank=True)
    class Meta:
        db_table = "Project_Floor"

    def __str__(self):
        return self.title
    
class Elevation(models.Model):
    title = models.CharField(max_length=100)
    floorelevation = models.ForeignKey(
        Floor, on_delete=models.CASCADE, related_name='floorelevation', null=True, blank=True)
    ElevationProject = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='ElevationProject', null=True, blank=True)
    class Meta:
        db_table = "Project_elevation"

    def __str__(self):
        return self.title

class MTOType(models.Model):
     title=models.CharField(max_length=100,default='1')
     
     def __str__(self):
        return self.title
    
class MTO(models.Model):
    title = models.CharField(max_length=100,null=True, blank=True)
    MTOType = models.ForeignKey(
        MTOType, on_delete=models.CASCADE, related_name='mtotype',default='1')
    projectmto = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='projectmto', null=True, blank=True)
    description = models.CharField(max_length=190)
    revision = models.CharField(max_length=100)
    extra = models.CharField(max_length=100)
    copy = models.CharField(max_length=100, default='0')
    status=models.CharField(max_length=100,null=True, default='1')
    submital=models.CharField(max_length=100,null=True, default='0')
    created_at = models.DateField(auto_now_add=True)
    submitted_at=models.DateField(default=datetime.date.today,null=True,blank=True)
  
    class Meta:
        db_table = "MTO"

    def __str__(self):
        return self.title

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    vat=models.IntegerField(null=True, blank=True,default='5')
    balance=models.IntegerField(null=True, blank=True,default='0')
    vat_number = models.CharField(max_length=100,null=True,blank=True)

    class Meta:
        db_table = "Supplier"

    def __str__(self):
        return self.name


class System(models.Model):
    name = models.CharField(max_length=100)
    orign = models.CharField(max_length=100)

    class Meta:
        db_table = "System"

    def __str__(self):
        return self.name


class Finishing(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "Finishing"

    def __str__(self):
        return self.name


class Unit(models.Model):
    name = models.CharField(max_length=100)
    Short = models.CharField(max_length=100)

    class Meta:
        db_table = "Unit"

    def __str__(self):
        return self.name


class ItemType(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "ItemType"
    def __str__(self):
        return self.name

def nameFile(instance, filename):
    #return '/'.join(['images', str(instance.name), filename])
    return '/'.join(['images', filename])




class Item(models.Model):
    name = models.CharField(max_length=100)
    barcode = models.CharField(max_length=100,null=True, default='1')
    type = models.ForeignKey(
        ItemType, on_delete=models.CASCADE, related_name='Type')
    itemcode = models.CharField(max_length=100)
    unit = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name='Unit')
    system = models.ForeignKey(
        System, on_delete=models.CASCADE, related_name='System',default='1')
    Supplier = models.ForeignKey(
        Supplier, on_delete=models.CASCADE, related_name='Supplier',default='1')
    finishing = models.ForeignKey(
        Finishing, on_delete=models.CASCADE, related_name='Finishing',default='1')
    description = models.TextField(null=True, default='NA')
    length=models.CharField(max_length=100,blank=True, default='NA')
    width=models.CharField(max_length=100,blank=True,default='NA',null=True)
    weight=models.CharField(max_length=100,blank=True,default='NA',null=True)
    is_length = models.CharField(max_length=100, null=True, default='0')
    is_quantity = models.CharField(max_length=100, null=True, default='1')
    is_both = models.CharField(max_length=100, null=True, default='0')
    alternate = models.CharField(max_length=100, null=True, default='0')
    previous_price = models.CharField(max_length=100, null=True, default='0')
    image = models.ImageField(upload_to=nameFile, blank=True, null=True)

    class Meta:
        db_table = "Item"

    def __str__(self):
        #return self.name+"----------->>> ( "+self.itemcode+" )"
        return self.itemcode


class Lock(models.Model):
    lockitem = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='lockitem', null=True, blank=True)
    
class MTOItem(models.Model):
    mto = models.ForeignKey(
        MTO, on_delete=models.CASCADE, related_name='mto', null=True, blank=True)
    itemname= models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='itemname')
    quantity = models.CharField(max_length=190)
    extra_quantity = models.CharField(max_length=190)
    revision = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    status=models.CharField(max_length=100,null=True, default='1')
    remarks=models.CharField(max_length=100,null=True, default='NA')
    assigned=models.CharField(max_length=100,null=True, default='0')
    cart=models.CharField(max_length=100,null=True, default='0')
    created_at = models.DateTimeField(auto_now_add=True)
  

class PowderCoating(models.Model):
    dnproject = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='dnproject',default='1')
    revision = models.CharField(max_length=100)
    copy = models.CharField(max_length=100, default='0')
    status=models.CharField(max_length=100,null=True, default='1')
    submital=models.CharField(max_length=100,null=True, default='0')
    description = models.CharField(max_length=190,null=True, default='NA')
    deliveredto = models.CharField(max_length=190,null=True, default='NA')
    created_at = models.DateField(auto_now_add=True)
    note = models.CharField(max_length=190,null=True, default='NA')
    class Meta:
        db_table = "PowderCoating"

    def __str__(self):
        return self.revision
        


class Status(models.Model):
        title = models.CharField(max_length=100)
        category = models.CharField(max_length=100, null=True, default='0')
        def __str__(self):
            return self.title


class Stock(models.Model):
    #project = models.IntegerField()
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='Item')
    quantity = models.IntegerField(null=True, default='0')
    stockvalue = models.CharField(max_length=100, null=True, default='0')

    class Meta:
        unique_together = ('item',)

class Stock_issuing(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='Project', null=True, blank=True)
    issuingmto = models.ForeignKey(
        MTO, on_delete=models.CASCADE, related_name='issuingmto', null=True, blank=True,default='1')
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name='Department', null=True, blank=True)
    Issued_item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='Issued_item')
    finishing = models.ForeignKey(
        Finishing, on_delete=models.CASCADE, related_name='Finishing_Issuing', null=True, blank=True)
    length = models.CharField(
        max_length=100, null=True, blank=True, default='NA')
    quantity = models.IntegerField(
       null=True, blank=True, default='0')
    total = models.IntegerField(
       null=True, blank=True, default='0')
    actual_quantity = models.IntegerField(
         null=True, blank=True, default='0')
    balance = models.IntegerField(
         null=True, blank=True, default='0')
    revoke = models.IntegerField(
         null=True, blank=True, default='0')
    restore = models.IntegerField(
         null=True, blank=True, default='0')
    color = models.CharField(
        max_length=100, null=True, blank=True, default='NA')
    description = models.CharField(max_length=100, null=True, default='NA')
    status = models.ForeignKey(
        Status, on_delete=models.CASCADE, related_name='status')
    remarks = models.CharField(max_length=100, null=True,default='NA')
    Revremarks = models.CharField(max_length=100, null=True,default='1')
    returned = models.IntegerField(null=True,default='0')
    created_at = models.DateField(auto_now_add=True,null=True)


class Stock_damage(models.Model):
        Item_Damage = models.ForeignKey(
            Item, on_delete=models.CASCADE, related_name='item_Damage')
        title = models.CharField(
            max_length=100)
        quantity = models.CharField(
            max_length=100, null=True, blank=True, default='0')
        length = models.CharField(
            max_length=100, null=True, blank=True, default='NA')
        status = models.ForeignKey(
            Status, on_delete=models.CASCADE, related_name='status_damage')
        created_at = models.DateField(auto_now_add=True)
        
        def __str__(self):
            return self.title


class MTOImport(models.Model):
    First = models.CharField(max_length=100, null=True, default='0')
    Last = models.CharField(max_length=100, null=True, default='0')
    Gender = models.CharField(max_length=100, null=True, default='0')

    def __str__(self):
        return self.First


class Shopping_Cart(models.Model):
        item_cart = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='item_cart')
        forproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='forproject', null=True, blank=True,default=1)
        fromproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='fromProject', null=True, blank=True, default=1)
        mtocart = models.ForeignKey(MTO, on_delete=models.CASCADE, related_name='mtocart',  null=True, blank=True, default='1')
        Supplier = models.ForeignKey(
        Supplier, on_delete=models.CASCADE, related_name='CartSupplier',default='1',null=True, blank=True)
        assigned_date = models.DateField(auto_now_add=True)
        description = models.CharField(max_length=100, null=True, default='0')
        quantity=models.CharField(max_length=100, default='1')
        priority=models.CharField(max_length=100,null=True, default='1')
        status=models.CharField(max_length=100,null=True, default='1')
        basket=models.CharField(max_length=100,null=True, default='0')

class CartOrder(models.Model):
        description = models.CharField(max_length=100, null=True, default='NA')
        priority=models.CharField(max_length=100,null=True, default='Normal')
        status=models.CharField(max_length=100,null=True, default='1')
        status_text=models.CharField(max_length=100,null=True, default='Pending')
        quotation=models.CharField(max_length=100,null=True, default='0')
        created_at = models.DateField(auto_now_add=True,null=True,blank=True)

class OrderItemDetail(models.Model):
        orderNo = models.ForeignKey(CartOrder, on_delete=models.CASCADE, related_name='orderNo')
        order_item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='order_item')
        forprojectorder = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='forprojectorder', null=True, blank=True,default='1')
        fromprojectorder = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='fromProjectorder', null=True, blank=True, default='1')
        Supplier = models.ForeignKey(
        Supplier, on_delete=models.CASCADE, related_name='OrderSupplier',default='1',null=True, blank=True)
        mtocartorder = models.ForeignKey(MTO, on_delete=models.CASCADE, related_name='mtocartorder',  null=True, blank=True, default='1')
        assigned_date = models.DateField(auto_now_add=True)
        description = models.CharField(max_length=100, null=True, default='0')
        quantity=models.CharField(max_length=100, default='1')
        priority=models.CharField(max_length=100,null=True, default='1')
        status=models.CharField(max_length=100,null=True, default='1')
        po_status=models.CharField(max_length=100,null=True, default='0')
        hidden=models.CharField(max_length=100,null=True, default='0')

class AccountsHead(models.Model):
    title = models.CharField(max_length=190,null=True)
    code = models.CharField(max_length=190,null=True)
    class Meta:
        db_table = "AccountsHead"

    def __str__(self):
        return self.title


class PurchaseOrder(models.Model):
        refrence=models.CharField(max_length=100,null=True, default='PO')
        quotationRefrence=models.CharField(max_length=200,null=True, default='QR')
        orderno = models.ForeignKey(
        CartOrder, on_delete=models.CASCADE, related_name='orderno', null=True, blank=True,default='1')
        currency = models.ForeignKey(
        Currency, on_delete=models.CASCADE, related_name='currency', null=True, blank=True,default='1')
        PurchaseSupplier = models.ForeignKey(
        Supplier, on_delete=models.CASCADE, related_name='PurchaseSupplier',default='1')
        projectpo = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='Projectpo', null=True, blank=True,default='1')
        note = models.CharField(max_length=100, null=True, default='NA')
        priority=models.CharField(max_length=100,null=True, default='1')
        status=models.CharField(max_length=100,null=True, default='1')
        status_text=models.CharField(max_length=100,null=True, default='Pending')
        creation_date = models.DateField(auto_now_add=True)
        delivery_date = models.DateField(null=True)
        payment_term=models.CharField(max_length=100,null=True, default='NA')
        local = models.BooleanField(null=True, blank=False,default=False)
        glass = models.BooleanField(null=True, blank=False,default=False)
        PerformaInvoice=models.BooleanField(null=True, blank=False,default=False)
        accounts_submital=models.CharField(max_length=100,null=True, default='0')
        accounts_approval=models.CharField(max_length=100,null=True, default='0')
        pi_approval=models.CharField(max_length=100,null=True, default='0')
        serviceQuotation=models.BooleanField(null=True, blank=False,default=False)
        def __str__(self):
            return self.refrence

class PurchaseOrderItems(models.Model):
        pono = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='pono', null=True, blank=True,default='1')
        po_item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='po_item')
        forprojectpo = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='forprojectpo', null=True, blank=True,default='1')
        fromprojectpo = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='fromProjectpo', null=True, blank=True, default='1')
        POItemorderno = models.ForeignKey(
        CartOrder, on_delete=models.CASCADE, related_name='POItemorderno', null=True, blank=True,default='1')
        mtopo = models.ForeignKey(MTO, on_delete=models.CASCADE, related_name='mtopo',  null=True, blank=True, default='1')
        pouom = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='pouom', null=True, blank=True,default='16')
        assigned_date = models.DateField(auto_now_add=True)
        price = models.CharField(max_length=100, null=True, default='0')
        description = models.CharField(max_length=100, null=True, default='0')
        accountshead=models.ForeignKey(AccountsHead, on_delete=models.CASCADE, related_name='accountshead', blank=True,default='78')
        quantity=models.IntegerField(default='1')
        balance=models.IntegerField( default='0')
        vat=models.CharField(max_length=100,default='0')
        priority=models.CharField(max_length=100,null=True, default='1')
        status=models.CharField(max_length=100,null=True, default='1')
        remarks=models.CharField(max_length=100,null=True, default='',blank=True)
        discount=models.CharField(max_length=100,null=True, blank=True,default='')
      



      
   

class ProductionIssuing(models.Model):
    Issuingproject = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='IssuingProject', null=True, blank=True,default='1')
    issuedmto = models.ForeignKey(
        MTO, on_delete=models.CASCADE, related_name='issuedmto', null=True, blank=True,default='1')
    Production_Issued_item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='Production_Issued_item')
    Issued_item_reserved = models.ForeignKey(
        Stock_issuing, on_delete=models.CASCADE, related_name='Issued_item_reserved',null=True, blank=True,default='1')
    quantity = models.CharField(
        max_length=100, null=True, blank=True, default='0')
    color = models.CharField(
        max_length=100, null=True, blank=True, default='NA') 
    created_at = models.DateField(auto_now_add=True,null=True)
    update = models.DateTimeField(auto_now=True,null=True)

        

class PowderCoatingItems(models.Model):
    dno = models.ForeignKey(
        PowderCoating, on_delete=models.CASCADE, related_name='pcno', null=True, blank=True)
    dnitem= models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='dnitem')
    quantity = models.CharField(max_length=190)
    pcissuedmto = models.ForeignKey(
        MTO, on_delete=models.CASCADE, related_name='pcissuedmto', null=True, blank=True,default='1')
    Issued_item_PC = models.ForeignKey(
        Stock_issuing, on_delete=models.CASCADE, related_name='Issued_item_PC',null=True, blank=True,default='1')
    projectPC = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='projectPC', null=True, blank=True,default='1')
    revision = models.CharField(max_length=100,null=True,default='0')
    color = models.CharField(max_length=100)
    status=models.CharField(max_length=100,null=True, default='1')
    remark=models.CharField(max_length=100,null=True, blank=True,default='NA')
    assigned=models.CharField(max_length=100,null=True, default='1')
    custom=models.CharField(max_length=100,null=True, default='0')
    length=models.CharField(max_length=100,null=True, blank=True, default='1')
    created_at = models.DateField(auto_now_add=True,null=True)
    update = models.DateField(auto_now=True,null=True)

        

class CORVISION(models.Model):
    name = models.CharField(max_length=100,default='Cor')
    status = models.CharField(max_length=100,default='1')
    type = models.CharField(max_length=100,default='NA')
    system=models.CharField(max_length=100,default='NA')
    subsystem=models.CharField(max_length=100,default='NA')
    wd = models.CharField(max_length=100,default='2')
    image = models.ImageField(upload_to=nameFile, blank=True, null=True)
    #custom = models.CharField(max_length=100,default='0')

    class Meta:
        db_table = "Corvision"
    def __str__(self):
        return self.name


class CorVisionProfile(models.Model):
        title = models.CharField(max_length=100,default='COR')
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVision')
        CorVisionItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionItem')
        quantity=models.CharField(max_length=100, default='1')
        formula=models.CharField(max_length=200)
        cutting=models.CharField(max_length=200,default='45')
        coating=models.CharField(max_length=200,default='NA')
        remark=models.CharField(max_length=200,default='NA')
    
class CorVisionDIM(models.Model):
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionDIM')
        title = models.CharField(max_length=100,default='COR')
        CodeName = models.CharField(max_length=100,default='dim')     
        formula=models.CharField(max_length=200)
        heightFormula=models.CharField(max_length=200,null='1')
        
class CorVisionShutter(models.Model):
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionShutter')
        CodeName = models.CharField(max_length=100,default='sht')   
        title = models.CharField(max_length=100,default='COR')     
        Widthformula=models.CharField(max_length=200,default='0')
        Heightformula=models.CharField(max_length=200,default='0')

class CorVisionGlass(models.Model):
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionGlass')
        title = models.CharField(max_length=100,default='COR')     
        CodeName = models.CharField(max_length=100,default='gls')   
        Widthformula=models.CharField(max_length=200,default='0')
        Heightformula=models.CharField(max_length=200,default='0')


class CorVisionHardware(models.Model):
        title = models.CharField(max_length=100,default='Hardware')
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionHardware')
        CorVisionItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionHardItem')
        quantity=models.CharField(max_length=100, default='1')
        cutting=models.CharField(max_length=200,default='NA')
        coating=models.CharField(max_length=200,default='NA')
        remark=models.CharField(max_length=200,default='NA')
    
class CorVisionAcc(models.Model):
        title = models.CharField(max_length=100,default='Acc')
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionAcc')
        CorVisionItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionAccItem')
        quantity=models.CharField(max_length=100, default='1')
        formula=models.CharField(max_length=100, default='1')
        cutting=models.CharField(max_length=200,default='NA')
        coating=models.CharField(max_length=200,default='NA')
        remark=models.CharField(max_length=200,default='NA')
    
class CorVisionGasket(models.Model):
        title = models.CharField(max_length=100,default='Gasket')
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionGasket')
        CorVisionItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionGasketItem')
        quantity=models.CharField(max_length=100, default='1')
        formula=models.CharField(max_length=200,null='1')
        cutting=models.CharField(max_length=200,default='NA')
        coating=models.CharField(max_length=200,default='NA')
        remark=models.CharField(max_length=200,default='NA')
    
   
class CorPacking(models.Model):
        title = models.CharField(max_length=100,default='Packing')
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionPacking')
        CorVisionItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionPackingItem')
        quantity=models.CharField(max_length=100, default='1')
        formula=models.CharField(max_length=200,null='1')
        cutting=models.CharField(max_length=200,default='NA')
        coating=models.CharField(max_length=200,default='NA')
        remark=models.CharField(max_length=200,default='NA')

class CorVisionInterLock(models.Model):
        title = models.CharField(max_length=100,default='Gasket')
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionInterLock')
        CorVisionItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionInterLockItem')
        quantity=models.CharField(max_length=100, default='1')
        formula=models.CharField(max_length=200,null='1')
        profileFormula=models.CharField(max_length=200,null='1')
        maximum=models.CharField(max_length=200,null='0')
        minimum=models.CharField(max_length=200,null='0')
        cutting=models.CharField(max_length=200,default='NA')
        coating=models.CharField(max_length=200,default='NA')
        remark=models.CharField(max_length=200,default='NA')
        pair=models.CharField(max_length=200,default='NA')

class CorVisionInterLockAcc(models.Model):
        title = models.CharField(max_length=100,default='Gasket')
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionInterLockAcc')
        CorVisionItemProfile = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionInterLockItemProfile')
        CorVisionItemAcc = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionInterLockItemAcc')
        quantity=models.CharField(max_length=100, default='1')
        formula=models.CharField(max_length=200,null='1')
        cutting=models.CharField(max_length=200,default='NA')
        coating=models.CharField(max_length=200,default='NA')
        remark=models.CharField(max_length=200,default='NA')
        pair=models.CharField(max_length=200,default='NA')

class CorScrew(models.Model):
        title = models.CharField(max_length=100,default='Screw')
        CorVision = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='CorVisionScrew')
        CorVisionItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='CorVisionScrewItem')
        quantity=models.CharField(max_length=100, default='1')
        formula=models.CharField(max_length=200,null='1')
        cutting=models.CharField(max_length=200,default='NA')
        coating=models.CharField(max_length=200,default='NA')
        remark=models.CharField(max_length=200,default='NA')

class Stripping(models.Model):
    sproject = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='sproject',default='1')
    revision = models.CharField(max_length=100)
    copy = models.CharField(max_length=100, default='0')
    status=models.CharField(max_length=100,null=True, default='1')
    submital=models.CharField(max_length=100,null=True, default='0')
    description = models.CharField(max_length=190,null=True, default='NA')
    deliveredto = models.CharField(max_length=190,null=True, default='NA')
    created_at = models.DateField(auto_now_add=True)
    note = models.CharField(max_length=190,null=True, default='NA')
    class Meta:
        db_table = "Stripping"

    def __str__(self):
        return self.revision


class StrippingItems(models.Model):
    stno = models.ForeignKey(
        Stripping, on_delete=models.CASCADE, related_name='stno', null=True, blank=True)
    sitem= models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='stitem')
    quantity = models.CharField(max_length=190)
    status=models.CharField(max_length=100,null=True, default='1')
    remark=models.CharField(max_length=100,null=True, blank=True,default='Pending')
    assigned=models.CharField(max_length=100,null=True, default='1')
    wastage=models.CharField(max_length=100,null=True, default='0')
    

class StockAlternative(models.Model):
    ParentItem= models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='ParentItem')
    ChildItem= models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='ChildItem')
        

class ProductionStock(models.Model):
    Pitem= models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='Pitem')
    quantity= models.CharField(max_length=100)
    created_at = models.DateField(auto_now=True)


class DeliveryNoteFromSupplier(models.Model):
    orderno=models.CharField(max_length=100)
    DNFromsupplierName=models.ForeignKey(Supplier,on_delete=models.CASCADE,related_name='DNFromsupplierName',default='1')
    DNINPurchaseOrder = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='DNINPurchaseOrder', null=True, blank=True,default='1')
    created_at = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.orderno

class DeliveryNoteFromSupplierItem(models.Model):
    DNINFromsupplierNo=models.ForeignKey(DeliveryNoteFromSupplier,on_delete=models.CASCADE,related_name='DNINFromsupplierNo',default='1')
    quantity=models.CharField(max_length=100)
    recievedItem=models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='recievedItem')
    orderitemid=models.ForeignKey(
        PurchaseOrderItems, on_delete=models.CASCADE, related_name='orderitemid')
    created_at = models.DateField(auto_now_add=True)


class OrderItemQuotation(models.Model):
        QuotationorderNo = models.ForeignKey(CartOrder, on_delete=models.CASCADE, related_name='QuotationorderNo')
        title=models.CharField(max_length=200, null=True)
        projectorderquotation = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='projectorderquotation', null=True, blank=True,default='1')
        Quotationdno = models.ForeignKey(
        PowderCoating, on_delete=models.CASCADE, related_name='Quotationdno', null=True, blank=True)
        assigned_date = models.DateField(auto_now_add=True)
        quotationuom = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='quotationuom', null=True, blank=True,default='16')
        quantity=models.CharField(max_length=100, default='1')
        amount=models.CharField(max_length=100,null=True, default='1')
        po_status=models.CharField(max_length=100,null=True, default='0')
        vat=models.CharField(max_length=100,null=True, default='0')
        weight=models.CharField(max_length=100,null=True, blank=True,default='1')
        status=models.CharField(max_length=100,null=True, default='1')

class PurchaseOrderQuotationItems(models.Model):
        quot_item_pono = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='quot_item_pono', null=True, blank=True,default='1')
        po_item_title = models.CharField(max_length=200, null=True)
        po_item_project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='po_item_project', null=True, blank=True,default='1')
        POQItemorderno = models.ForeignKey(
        OrderItemQuotation, on_delete=models.CASCADE, related_name='POQItemorderno', null=True, blank=True,default='1')
        quotitemdn = models.ForeignKey(PowderCoating, on_delete=models.CASCADE, related_name='quotitemdn',  null=True, blank=True, default='1')
        qpouom = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='qpouom', null=True, blank=True,default='16')
        assigned_date = models.DateField(auto_now_add=True)
        price = models.CharField(max_length=100, null=True, default='0')
        quotaccountshead=models.ForeignKey(AccountsHead, on_delete=models.CASCADE, related_name='quotaccountshead', blank=True,default='78')
        quantity=models.CharField(max_length=100, default='1')
        weight=models.CharField(max_length=100,default='0')
        vat=models.CharField(max_length=100,default='0')
        status=models.CharField(max_length=100,null=True, default='1')

class SiteDeliveryNote(models.Model):
    prsrno=models.CharField(max_length=100)
    issue_project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='issue_project', null=True, blank=True,default='1')
    created_at = models.DateField(auto_now_add=True)


class SiteDeliveryNoteItems(models.Model):
    site_delivery_note_no=models.ForeignKey(SiteDeliveryNote,on_delete=models.CASCADE,related_name='site_delivery_note_no')
    SiteItem= models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='SiteItem')
    site_issuing_id = models.ForeignKey(
        Stock_issuing, on_delete=models.CASCADE, related_name='site_issuing_id',null=True, blank=True,default='1')
    sitedeliverymto = models.ForeignKey(
        MTO, on_delete=models.CASCADE, related_name='sitedeliverymto', null=True, blank=True)
    quantity=models.CharField(max_length=100)
    remarks=models.CharField(max_length=100, default='',blank=True,null=True)
    assigned_date = models.DateField(auto_now_add=True)

class WindowStatus(models.Model):
     title=models.CharField(max_length=100)

class ReleasedWindow(models.Model):
    title=models.CharField(max_length=100)
    width=models.CharField(max_length=100)
    GlassColor=models.CharField(max_length=100,default='AG')
    ProfileFinishing=models.CharField(max_length=100,default='AC')
    LockHeight=models.CharField(max_length=100,default='1050')
    LockFinishing=models.CharField(max_length=100,default='AC')
    quantity=models.CharField(max_length=100)
    elevation=models.CharField(max_length=100)
    Windowfloor=models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='Floor',default='1')
    height=models.CharField(max_length=100)
    windload=models.CharField(max_length=100)
    status=models.ForeignKey(WindowStatus,related_name='status', on_delete=models.SET_DEFAULT,default='1') 
    Window = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='Window',default='1')
    WindowLock = models.ForeignKey(Lock, on_delete=models.CASCADE, related_name='WindowLock',default='1')
    Windowproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='Windowproject', null=True, blank=True,default='1')
    

class ReleasedCustomDim(models.Model):
    ReleasedWindowCDim=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowCDim')
    dim1=models.CharField(max_length=100)
    dim2=models.CharField(max_length=100)
    dim3=models.CharField(max_length=100)

class ReleasedWindowCustomShutter(models.Model):
        ReleasedWindowCS=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowCS',default='1')
        d1s1w=models.CharField(max_length=100)
        d1s1h=models.CharField(max_length=100)
        d2s1w=models.CharField(max_length=100)
        d2s1h=models.CharField(max_length=100)
        d3s1w=models.CharField(max_length=100)
        d3s1h=models.CharField(max_length=100)
        d4s1w=models.CharField(max_length=100)
        d4s1h=models.CharField(max_length=100)
        d5s1w=models.CharField(max_length=100)
        d5s1h=models.CharField(max_length=100)
        d6s1w=models.CharField(max_length=100)
        d6s1h=models.CharField(max_length=100)
        
        d1s2w=models.CharField(max_length=100)
        d1s2h=models.CharField(max_length=100)
        d2s2w=models.CharField(max_length=100)
        d2s2h=models.CharField(max_length=100)
        d3s2w=models.CharField(max_length=100)
        d3s2h=models.CharField(max_length=100)
        d4s2w=models.CharField(max_length=100)
        d4s2h=models.CharField(max_length=100)
        d5s2w=models.CharField(max_length=100)
        d5s2h=models.CharField(max_length=100)
        d6s2w=models.CharField(max_length=100)
        d6s2h=models.CharField(max_length=100)
        
        d1s3w=models.CharField(max_length=100)
        d1s3h=models.CharField(max_length=100)
        d2s3w=models.CharField(max_length=100)
        d2s3h=models.CharField(max_length=100)
        d3s3w=models.CharField(max_length=100)
        d3s3h=models.CharField(max_length=100)
        d4s3w=models.CharField(max_length=100)
        d4s3h=models.CharField(max_length=100)
        d5s3w=models.CharField(max_length=100)
        d5s3h=models.CharField(max_length=100)
        d6s3w=models.CharField(max_length=100)
        d6s3h=models.CharField(max_length=100)

        d1s4w=models.CharField(max_length=100)
        d1s4h=models.CharField(max_length=100)
        d2s4w=models.CharField(max_length=100)
        d2s4h=models.CharField(max_length=100)
        d3s4w=models.CharField(max_length=100)
        d3s4h=models.CharField(max_length=100)
        d4s4w=models.CharField(max_length=100)
        d4s4h=models.CharField(max_length=100)
        d5s4w=models.CharField(max_length=100)
        d5s4h=models.CharField(max_length=100)
        d6s4w=models.CharField(max_length=100)
        d6s4h=models.CharField(max_length=100)

        d1s5w=models.CharField(max_length=100)
        d1s5h=models.CharField(max_length=100)
        d2s5w=models.CharField(max_length=100)
        d2s5h=models.CharField(max_length=100)
        d3s5w=models.CharField(max_length=100)
        d3s5h=models.CharField(max_length=100)
        d4s5w=models.CharField(max_length=100)
        d4s5h=models.CharField(max_length=100)
        d5s5w=models.CharField(max_length=100)
        d5s5h=models.CharField(max_length=100)
        d6s5w=models.CharField(max_length=100)
        d6s5h=models.CharField(max_length=100)

        d1s6w=models.CharField(max_length=100)
        d1s6h=models.CharField(max_length=100)
        d2s6w=models.CharField(max_length=100)
        d2s6h=models.CharField(max_length=100)
        d3s6w=models.CharField(max_length=100)
        d3s6h=models.CharField(max_length=100)
        d4s6w=models.CharField(max_length=100)
        d4s6h=models.CharField(max_length=100)
        d5s6w=models.CharField(max_length=100)
        d5s6h=models.CharField(max_length=100)
        d6s6w=models.CharField(max_length=100)
        d6s6h=models.CharField(max_length=100)

class ReleasedWindowProfile(models.Model):
    ReleasedWindowP=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowP',default='1')
    ReleasedWindowPItem=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ReleasedWindowPItem',default='1')
    description=models.CharField(max_length=100)
    cutlength=models.FloatField(max_length=100)
    quantity=models.CharField(max_length=100)
    cutting=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    Releasedprofileproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='Releasedprofileproject',default='1')
    def save(self, *args, **kwargs):
        self.cutlength = round(self.cutlength, 2)
        super(ReleasedWindowProfile, self).save(*args, **kwargs)


class ReleasedWindowInterLock(models.Model):
    ReleasedWindowInter=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowInter',default='1')
    ReleasedWindowInterProfile=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ReleasedWindowInterProfile',default='1')
    description=models.CharField(max_length=100)
    cutlength=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    cutting=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    ReleasedInterLockproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ReleasedInterLockproject',default='1')
    

class ReleasedWindowACC(models.Model):
    ReleasedWindowA=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowA',default='1')
    ReleasedWindowAcc=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ReleasedWindowAcc',default='1')
    description=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    cutting=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    ReleasedAccproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ReleasedAccproject',default='1')



class ReleasedWindowGasket(models.Model):
    ReleasedWindowG=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowG',default='1')
    ReleasedWindowGasket=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ReleasedWindowGasket',default='1')
    description=models.CharField(max_length=100)
    cutlength=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    cutting=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    ReleasedGasketroject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ReleasedGasketroject',default='1')
    

class ReleasedWindowScrew(models.Model):
    ReleasedWindowS=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowS',default='1')
    ReleasedWindowSc=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ReleasedWindowSc',default='1')
    description=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    ReleasedScrewproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ReleasedScrewproject',default='1')
    


class ReleasedWindowPacking(models.Model):
    ReleasedWindowPacking=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowPacking',default='1')
    ReleasedWindowPac=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ReleasedWindowPac',default='1')
    description=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    ReleasedPackingproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ReleasedPackingproject',default='1')
    

class ReleasedWindowGlass(models.Model):
    ReleasedWindowGlass=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowGlass',default='1')
    title=models.CharField(max_length=100)
    width=models.CharField(max_length=100)
    height=models.CharField(max_length=100)
    status=models.CharField(max_length=100,default='1')
    ReleasedGlassproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ReleasedGlassproject',default='1')
    


class ReleasedWindowInterLockACC(models.Model):
        ReleasedWindowInterA=models.ForeignKey(ReleasedWindow, on_delete=models.CASCADE, related_name='ReleasedWindowInterA',default='1')
        ReleasedWindowInterAcc=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ReleasedWindowInterAcc',default='1')
        description=models.CharField(max_length=100)
        cutlength=models.CharField(max_length=100)
        quantity=models.CharField(max_length=100)
        cutting=models.CharField(max_length=100)
        coating=models.CharField(max_length=100,default='NA')
        remark=models.CharField(max_length=100,default='NA')
        status=models.CharField(max_length=100,default='1')
        ReleasedInterLockAccproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ReleasedInterLockAccproject',default='1')
    
class StockList(models.Model):
        ProjectStockList=models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ProjectStockList',default='1')
        Type = models.ForeignKey(
            MTOType, on_delete=models.CASCADE, related_name='Type',default='1')
        title=models.CharField(max_length=100,default='title')
        status=models.CharField(max_length=100,default='1')
        created_at = models.DateField(auto_now_add=True,null=True)

class StockListItem(models.Model):
        StockListID=models.ForeignKey(StockList, on_delete=models.CASCADE, related_name='StockListID',default='1')
        StockListItem=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='StockListItem',default='1')
        quantity=models.CharField(max_length=100)


class MandatoryStock(models.Model):
    MandatoryItem = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='MandatoryItem')
    minimum=models.CharField(max_length=100)


##final fabrication size

class FinalReleasedWindow(models.Model):
    title=models.CharField(max_length=100)
    width=models.CharField(max_length=100)
    GlassColor=models.CharField(max_length=100,default='AG')
    ProfileFinishing=models.CharField(max_length=100,default='AC')
    LockHeight=models.CharField(max_length=100,default='1050')
    LockFinishing=models.CharField(max_length=100,default='AC')
    quantity=models.CharField(max_length=100)
    elevation=models.CharField(max_length=100)
    FWindowfloor=models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='FFloor',default='1')
    height=models.CharField(max_length=100)
    windload=models.CharField(max_length=100)
    Fstatus=models.ForeignKey(WindowStatus,related_name='Fstatus', on_delete=models.SET_DEFAULT,default='1') 
    FWindow = models.ForeignKey(CORVISION, on_delete=models.CASCADE, related_name='FWindow',default='1')
    FWindowLock = models.ForeignKey(Lock, on_delete=models.CASCADE, related_name='FWindowLock',default='1')
    FWindowproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FWindowproject', null=True, blank=True,default='1')
    
class FinalReleasedCustomDim(models.Model):
    FinalReleasedWindowCDim=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FinalReleasedWindowCDim')
    dim1=models.CharField(max_length=100)
    dim2=models.CharField(max_length=100)
    dim3=models.CharField(max_length=100)

class FinalReleasedWindowProfile(models.Model):
    FReleasedWindowP=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FReleasedWindowP',default='1')
    FReleasedWindowPItem=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='FReleasedWindowPItem',default='1')
    description=models.CharField(max_length=100)
    cutlength=models.FloatField(max_length=100)
    quantity=models.CharField(max_length=100)
    cutting=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    FReleasedprofileproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FReleasedprofileproject',default='1')
    def save(self, *args, **kwargs):
        self.cutlength = round(self.cutlength, 2)
        super(FinalReleasedWindowProfile, self).save(*args, **kwargs)


class FinalReleasedWindowInterLock(models.Model):
    FReleasedWindowInter=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FReleasedWindowInter',default='1')
    FReleasedWindowInterProfile=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='FReleasedWindowInterProfile',default='1')
    description=models.CharField(max_length=100)
    cutlength=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    cutting=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    FReleasedInterLockproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FReleasedInterLockproject',default='1')
    

class FinalReleasedWindowACC(models.Model):
    FReleasedWindowA=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FReleasedWindowA',default='1')
    FReleasedWindowAcc=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='FReleasedWindowAcc',default='1')
    description=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    cutting=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    FReleasedAccproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FReleasedAccproject',default='1')



class FinalReleasedWindowGasket(models.Model):
    FReleasedWindowG=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FReleasedWindowG',default='1')
    FReleasedWindowGasket=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='FReleasedWindowGasket',default='1')
    description=models.CharField(max_length=100)
    cutlength=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    cutting=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    FReleasedGasketroject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FReleasedGasketroject',default='1')
    

class FinalReleasedWindowScrew(models.Model):
    FReleasedWindowS=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FReleasedWindowS',default='1')
    FReleasedWindowSc=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='FReleasedWindowSc',default='1')
    description=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    FReleasedScrewproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FReleasedScrewproject',default='1')
    


class FinalReleasedWindowPacking(models.Model):
    FReleasedWindowPacking=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FReleasedWindowPacking',default='1')
    FReleasedWindowPac=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='FReleasedWindowPac',default='1')
    description=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)
    coating=models.CharField(max_length=100,default='NA')
    remark=models.CharField(max_length=100,default='NA')
    status=models.CharField(max_length=100,default='1')
    FReleasedPackingproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FReleasedPackingproject',default='1')
    

class FinalReleasedWindowGlass(models.Model):
    FReleasedWindowGlass=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FReleasedWindowGlass',default='1')
    title=models.CharField(max_length=100)
    width=models.CharField(max_length=100)
    height=models.CharField(max_length=100)
    status=models.CharField(max_length=100,default='1')
    FReleasedGlassproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FReleasedGlassproject',default='1')
    


class FinalReleasedWindowInterLockACC(models.Model):
        FReleasedWindowInterA=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FReleasedWindowInterA',default='1')
        FReleasedWindowInterAcc=models.ForeignKey(Item, on_delete=models.CASCADE, related_name='FReleasedWindowInterAcc',default='1')
        description=models.CharField(max_length=100)
        cutlength=models.CharField(max_length=100)
        quantity=models.CharField(max_length=100)
        cutting=models.CharField(max_length=100)
        coating=models.CharField(max_length=100,default='NA')
        remark=models.CharField(max_length=100,default='NA')
        status=models.CharField(max_length=100,default='1')
        FReleasedInterLockAccproject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='FReleasedInterLockAccproject',default='1')



class FinalReleasedWindowCustomShutter(models.Model):
        FinalReleasedWindowCS=models.ForeignKey(FinalReleasedWindow, on_delete=models.CASCADE, related_name='FinalReleasedWindowCS',default='1')
        d1s1w=models.CharField(max_length=100)
        d1s1h=models.CharField(max_length=100)
        d2s1w=models.CharField(max_length=100)
        d2s1h=models.CharField(max_length=100)
        d3s1w=models.CharField(max_length=100)
        d3s1h=models.CharField(max_length=100)
        d4s1w=models.CharField(max_length=100)
        d4s1h=models.CharField(max_length=100)
        d5s1w=models.CharField(max_length=100)
        d5s1h=models.CharField(max_length=100)
        d6s1w=models.CharField(max_length=100)
        d6s1h=models.CharField(max_length=100)
        
        d1s2w=models.CharField(max_length=100)
        d1s2h=models.CharField(max_length=100)
        d2s2w=models.CharField(max_length=100)
        d2s2h=models.CharField(max_length=100)
        d3s2w=models.CharField(max_length=100)
        d3s2h=models.CharField(max_length=100)
        d4s2w=models.CharField(max_length=100)
        d4s2h=models.CharField(max_length=100)
        d5s2w=models.CharField(max_length=100)
        d5s2h=models.CharField(max_length=100)
        d6s2w=models.CharField(max_length=100)
        d6s2h=models.CharField(max_length=100)
        
        d1s3w=models.CharField(max_length=100)
        d1s3h=models.CharField(max_length=100)
        d2s3w=models.CharField(max_length=100)
        d2s3h=models.CharField(max_length=100)
        d3s3w=models.CharField(max_length=100)
        d3s3h=models.CharField(max_length=100)
        d4s3w=models.CharField(max_length=100)
        d4s3h=models.CharField(max_length=100)
        d5s3w=models.CharField(max_length=100)
        d5s3h=models.CharField(max_length=100)
        d6s3w=models.CharField(max_length=100)
        d6s3h=models.CharField(max_length=100)

        d1s4w=models.CharField(max_length=100)
        d1s4h=models.CharField(max_length=100)
        d2s4w=models.CharField(max_length=100)
        d2s4h=models.CharField(max_length=100)
        d3s4w=models.CharField(max_length=100)
        d3s4h=models.CharField(max_length=100)
        d4s4w=models.CharField(max_length=100)
        d4s4h=models.CharField(max_length=100)
        d5s4w=models.CharField(max_length=100)
        d5s4h=models.CharField(max_length=100)
        d6s4w=models.CharField(max_length=100)
        d6s4h=models.CharField(max_length=100)

        d1s5w=models.CharField(max_length=100)
        d1s5h=models.CharField(max_length=100)
        d2s5w=models.CharField(max_length=100)
        d2s5h=models.CharField(max_length=100)
        d3s5w=models.CharField(max_length=100)
        d3s5h=models.CharField(max_length=100)
        d4s5w=models.CharField(max_length=100)
        d4s5h=models.CharField(max_length=100)
        d5s5w=models.CharField(max_length=100)
        d5s5h=models.CharField(max_length=100)
        d6s5w=models.CharField(max_length=100)
        d6s5h=models.CharField(max_length=100)

        d1s6w=models.CharField(max_length=100)
        d1s6h=models.CharField(max_length=100)
        d2s6w=models.CharField(max_length=100)
        d2s6h=models.CharField(max_length=100)
        d3s6w=models.CharField(max_length=100)
        d3s6h=models.CharField(max_length=100)
        d4s6w=models.CharField(max_length=100)
        d4s6h=models.CharField(max_length=100)
        d5s6w=models.CharField(max_length=100)
        d5s6h=models.CharField(max_length=100)
        d6s6w=models.CharField(max_length=100)
        d6s6h=models.CharField(max_length=100)
class TentativeGlassType(models.Model):
        title=models.CharField(max_length=100,default='NA')
        description=models.CharField(max_length=200)
        status=models.CharField(max_length=100,default='1')
        class Meta:
            db_table = "TentativeGlassType"
        def __str__(self):
            return self.title





class TentativeGlass(models.Model):
        TentaiveGlassProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='TentaiveGlassProject',default='1')
        #TentaiveGlassType = models.ForeignKey(TentativeGlassType, on_delete=models.CASCADE, related_name='TentaiveGlassType',default='1')
        created_at = models.DateField(auto_now_add=True,null=True)
        status=models.CharField(max_length=100,default='1')
        revision=models.CharField(max_length=100,default='0')
        submitted_at = models.DateField(null=True)
        created_by = models.ForeignKey(User, on_delete=models.CASCADE)
        remarks=models.CharField(max_length=200)
        class Meta:
            db_table = "TentativeGlass"


class TentativeGlassItem(models.Model):
        TentativeGlassID = models.ForeignKey(TentativeGlass, on_delete=models.CASCADE, related_name='TentativeGlassID',default='1')
        TentaiveGlassType = models.ForeignKey(TentativeGlassType, on_delete=models.CASCADE, related_name='TentaiveGlassType',default='1')
        WindowRef=models.CharField(max_length=100,default='1')
        width=models.CharField(max_length=100,default='1')
        height=models.CharField(max_length=100,default='1')
        quantity=models.CharField(max_length=100,default='1')
        area=models.CharField(max_length=100,default='1')
        system=models.CharField(max_length=100,default='1')
        location=models.CharField(max_length=100,default='1')
        created_at = models.DateField(auto_now_add=True,null=True)
        class Meta:
            db_table = "TentativeGlassItem"

class GlassCutting(models.Model):
        TentaiveGlassCuttingProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='TentaiveGlassCuttingProject',default='1')
        #TentaiveGlassType = models.ForeignKey(TentativeGlassType, on_delete=models.CASCADE, related_name='TentaiveGlassType',default='1')
        created_at = models.DateField(auto_now_add=True,null=True)
        status=models.CharField(max_length=100,default='1')
        revision=models.CharField(max_length=100,default='0')
        submitted_at = models.DateField(null=True)
        created_by = models.ForeignKey(User, on_delete=models.CASCADE)
        remarks=models.CharField(max_length=200)
        class Meta:
            db_table = "GlassCutting"



class TentativeGlassFinalItem(models.Model):
        GlassCuttingID = models.ForeignKey(GlassCutting, on_delete=models.CASCADE, related_name='GlassCuttingID',default='1')
        barcode=models.CharField(max_length=100,default='1')
        system=models.CharField(max_length=100,default='1')
        location=models.CharField(max_length=100,default='NA')
        GlassRef=models.CharField(max_length=100,default='NA')   
        FinalTentaiveGlassType = models.ForeignKey(TentativeGlassType, on_delete=models.CASCADE, related_name='FinalTentaiveGlassType',default='1')
        opwidth=models.FloatField(max_length=100,default='1')
        opheight=models.FloatField(max_length=100,default='1')
        ipwidth=models.FloatField(max_length=100,default='1')
        ipheight=models.FloatField(max_length=100,default='1')
        quantity=models.IntegerField(default='1')
        recieved=models.IntegerField(default='0')
        area=models.FloatField(max_length=100,default='1')
        WindowRef=models.CharField(max_length=100,default='NA')
        remarks=models.CharField(max_length=100,default='NA')
        uinsert=models.IntegerField(default='0')  
        created_at = models.DateField(auto_now_add=True,null=True)
        po=models.CharField(max_length=100,default='0')
        class Meta:
            db_table = "TentativeGlassCuttingItem"
        # def __str__(self):
        #         return self.GlassCuttingID

class TentativeGlassProcessor(models.Model):
        title=models.CharField(max_length=100,default='NA')
        class Meta:
            db_table = "TentativeGlassProcessor"
        def __str__(self):
            return self.title


class DeliveryNoteFromSupplierGlass(models.Model):
        DNINFromsupplierNoGlass=models.ForeignKey(DeliveryNoteFromSupplier,on_delete=models.CASCADE,related_name='DNINFromsupplierNoGlass',default='1')
        quantity=models.CharField(max_length=100)
        SupplierglassType=models.ForeignKey(
            TentativeGlassFinalItem, on_delete=models.CASCADE, related_name='SupplierglassType')
        glassCuttingsupplier=models.ForeignKey(
             GlassCutting, on_delete=models.CASCADE, related_name='glassCuttingsupplier')
        created_at = models.DateField(auto_now_add=True)


class TentativeGlassBooking(models.Model):
        TentaiveGlassBookingProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='TentaiveGlassBookingProject',default='1')
        inquiry_date = models.DateField(null=True)
        quotation_receiving_date = models.DateField(null=True)
        booking_cofirmation_date = models.DateField(null=True)
        eta = models.DateField(null=True)
        #purchaseRef = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='purchaseRef', null=True, blank=True,default='1')
        purchaseRef=models.CharField(max_length=100,default='NA')
        QuotationRef=models.CharField(max_length=100,default='1')
        GlassType=models.CharField(max_length=100,default='1')
        area=models.CharField(max_length=100,default='1')
        status=models.CharField(max_length=100,default='1')
        GlassProcessor=models.ForeignKey(TentativeGlassProcessor, on_delete=models.CASCADE, related_name='GlassProcessor',default='1')
        remarks=models.CharField(max_length=100,default='1')
        uinsert=models.IntegerField(default='0')    
        created_at = models.DateField(auto_now_add=True,null=True)
        class Meta:
            db_table = "TentativeGlassBooking"

class PurchaseOrderGlassItems(models.Model):
        gpono = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='gpono', null=True, blank=True,default='1')
        #POGlassType = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='po_item')
        POGlassType = models.ForeignKey(TentativeGlassType, on_delete=models.CASCADE, related_name='POGlassType',default='1')
        # forprojectpo = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='forprojectpo', null=True, blank=True,default='1')
        # fromprojectpo = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='fromProjectpo', null=True, blank=True, default='1')
        #POItemorderno = models.ForeignKey(
        #CartOrder, on_delete=models.CASCADE, related_name='POItemorderno', null=True, blank=True,default='1')
        glasscutting = models.ForeignKey(GlassCutting, on_delete=models.CASCADE, related_name='glasscutting',  null=True, blank=True, default='1')
        assigned_date = models.DateField(auto_now_add=True)
        price = models.CharField(max_length=100, null=True, default='0')
        description = models.CharField(max_length=100, null=True, default='0')
        gaccountshead=models.ForeignKey(AccountsHead, on_delete=models.CASCADE, related_name='gaccountshead', blank=True,default='78')
        quantity=models.IntegerField(default='1')
        balance=models.IntegerField( default='0')
        area=models.FloatField( default='0')
        vat=models.CharField(max_length=100,default='0')
        uinsert=models.CharField(max_length=100,null=True, default='0')
        status=models.CharField(max_length=100,null=True, default='1')
        remarks=models.CharField(max_length=100,null=True, default='',blank=True)
        discount=models.CharField(max_length=100,null=True, blank=True,default='')


class ProjectBudget(models.Model):
        ProjectBudget = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ProjectBudget',default='1')
        BudgetHead=models.ForeignKey(AccountsHead, on_delete=models.CASCADE, related_name='BudgetHead',default='1')
        #TentaiveGlassType = models.ForeignKey(TentativeGlassType, on_delete=models.CASCADE, related_name='TentaiveGlassType',default='1')
        #created_at = models.DateField(auto_now_add=True,null=True)
        created_date = models.DateField(auto_now_add = True)
        #ctime = models.TimeField(default=datetime.date.today,null=True,blank=True,auto_now_add = True)
        #cdate = models.DateField(default=datetime.date.today,null=True,blank=True,auto_now_add = True)
        updated_date = models.DateTimeField(auto_now = True)
        status=models.CharField(max_length=100,default='1')
        amount=models.CharField(max_length=100,default='0')
        balance=models.CharField(max_length=100,default='0')
        #submitted_at = models.DateField(null=True)
        created_by = models.ForeignKey(User, on_delete=models.CASCADE)
        remarks=models.CharField(max_length=200)

class NonSystemItems(models.Model):
    project=models.CharField(max_length=100,null=True, default='',blank=True)
    type=models.CharField(max_length=100,null=True, default='',blank=True)
    mto_taking=models.CharField(max_length=100,null=True, default='',blank=True)
    order_status=models.CharField(max_length=100,null=True, default='',blank=True)
    eta=models.DateField(max_length=100,null=True,blank=True)
    status=models.CharField(max_length=100,null=True, default='',blank=True)
    mainid = models.IntegerField(db_column='mainid',default='0')
    # al_ass_del_status=models.CharField(max_length=100,null=True, default='',blank=True)

    # sheet_mto_taking=models.CharField(max_length=100,null=True, default='',blank=True)
    # sheet_order_status=models.CharField(max_length=100,null=True, default='',blank=True)
    # sheet_eta=models.DateField(max_length=100,null=True,blank=True)
    # sheet_fabrication_status=models.CharField(max_length=100,null=True, default='',blank=True)
    

    # steel_mto_taking=models.CharField(max_length=100,null=True, default='',blank=True)
    # steel_order_status=models.CharField(max_length=100,null=True, default='',blank=True)
    # steel_eta=models.DateField(max_length=100,null=True,blank=True)
    # steel_fabrication_status=models.CharField(max_length=100,null=True, default='',blank=True)
    # steel_galvanizing_status=models.CharField(max_length=100,null=True, default='',blank=True)
    
    # powder_mto_taking=models.CharField(max_length=100,null=True, default='',blank=True)
    # powder_order_status=models.CharField(max_length=100,null=True, default='',blank=True)
    # powder_eta=models.DateField(max_length=100,null=True,blank=True)

class NonSystemItemsSD(models.Model):
    project=models.CharField(max_length=100,null=True, default='',blank=True)
    sd_status=models.CharField(max_length=100,null=True, default='',blank=True)
    sd_start_date=models.DateField(max_length=100,null=True,blank=True)
    sd_end_date=models.DateField(max_length=100,null=True,blank=True)
    sd_submission_status=models.CharField(max_length=100,null=True, default='',blank=True)
    sd_approval_status=models.CharField(max_length=100,null=True, default='',blank=True)
    sd_revision=models.CharField(max_length=100,null=True, default='',blank=True)
    sd_approval_date=models.DateField(max_length=100,null=True,blank=True)
    sd_desiginer=models.CharField(max_length=100,null=True,blank=True)
    status=models.CharField(max_length=100,null=True,blank=True)
    type=models.CharField(max_length=100,null=True,blank=True)
    mainid = models.IntegerField(db_column='mainid',default='0')

class NonSystemItemsMS(models.Model):
    project=models.CharField(max_length=100,null=True, default='',blank=True)
    ms_status=models.CharField(max_length=100,null=True, default='',blank=True)
    ms_start_date=models.DateField(max_length=100,null=True,blank=True)
    ms_end_date=models.DateField(max_length=100,null=True,blank=True)
    ms_submission_status=models.CharField(max_length=100,null=True, default='',blank=True)
    ms_approval_status=models.CharField(max_length=100,null=True, default='',blank=True)
    ms_revision=models.CharField(max_length=100,null=True, default='',blank=True)
    ms_approval_date=models.DateField(max_length=100,null=True,blank=True)
    ms_desiginer=models.CharField(max_length=100,null=True,blank=True)
    status=models.CharField(max_length=100,null=True,blank=True)
    type=models.CharField(max_length=100,null=True,blank=True)
    mainid = models.IntegerField(db_column='mainid',default='0')

class NonSystemDamage(models.Model):
        project=models.CharField(max_length=100,null=True, default='',blank=True)
        type=models.CharField(max_length=100,default='1',null=True)
        refrence=models.CharField(max_length=100,null=True, default='',blank=True)
        qty=models.CharField(max_length=100,null=True, default='',blank=True)
        reason=models.CharField(max_length=100,null=True,blank=True)
        replacement_status=models.CharField(max_length=100,null=True, default='',blank=True)
        order_date=models.DateField(null=True,blank=True)
        recieved_status=models.CharField(max_length=100,null=True, default='',blank=True)
        mainid = models.IntegerField(db_column='mainid',default='0')



##Accounts Database Tabeles
        

class InvoiceFromSupplier(models.Model):
        InvoicePO = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='InvoicePO', null=True, blank=True,default='1')
        InvoiceProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='InvoiceProject',default='1')
        InvoiceSupplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='InvoiceSupplier',default='1')
        amount = models.CharField(max_length=100, null=True, default='0')
        balance = models.CharField(max_length=100, null=True, default='0')
        InvoiceRef=models.CharField(max_length=200,null=True, default='NA')
        DNRef=models.CharField(max_length=200,null=True, default='NA')
        is_review=models.CharField(max_length=100,null=True, default='0')
        is_verify=models.CharField(max_length=100,null=True, default='0')
        creation_date = models.DateField(auto_now_add=True)
        due_date = models.DateField(null=True)
        priority=models.CharField(max_length=100,null=True, default='1')
        status=models.CharField(max_length=100,null=True, default='1')

class InvoiceItemFromSupplier(models.Model):
        InvoiceItemPO = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='InvoiceItemPO', null=True, blank=True,default='1')
        InvoiceItemProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='InvoiceItemProject',default='1')
        InvoiceFromSupplierNO = models.ForeignKey(InvoiceFromSupplier, on_delete=models.CASCADE, related_name='InvoiceFromSupplierNO',default='1')
        InvoiceItem = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='InvoiceItem', null=True, blank=True,default='1')
        amount = models.CharField(max_length=100, null=True, default='0')
        quantity = models.CharField(max_length=100, null=True, default='0')
        is_review=models.CharField(max_length=100,null=True, default='0')
        is_verify=models.CharField(max_length=100,null=True, default='0')
        creation_date = models.DateField(auto_now_add=True)
        status=models.CharField(max_length=100,null=True, default='1')



class Certifiedpayments(models.Model):
    CertifiedProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='CertifiedProject', null=True, blank=True,default='1')
    CertificationID = models.CharField(max_length=100, null=True, default='0')
    CertifiedAmount = models.CharField(max_length=100, null=True, default='0')
    CertificationDate=models.DateField(max_length=100,null=True)
    Remarks=models.CharField(max_length=100,null=True, default='0')
    ApprovedAmount=models.CharField(max_length=100,null=True, default='0')
    ApprovalDate=models.DateField(max_length=100,null=True)
    is_verify=models.CharField(max_length=100,null=True, default='0')
    creation_date = models.DateField(auto_now_add=True)
    status=models.CharField(max_length=100,null=True, default='1')


class NCR(models.Model):
     NCRProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='NCRProject', null=True, blank=True,default='1')
     refrence=models.CharField(max_length=100, null=True, default='0')
     date=models.DateField(auto_now_add=True,null=True)
     Type=models.CharField(max_length=100,null=True, default='0')
     Remarks=models.CharField(max_length=100,null=True, default='0')
     Status=models.CharField(max_length=100,null=True, default='0')



# class NCRItems(models.Model):
#      NCRProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='NCRProject', null=True, blank=True,default='1')
#      refrence=models.CharField(max_length=100, null=True, default='0')
#      date=models.DateField(max_length=100,null=True)
#      Type=models.CharField(max_length=100,null=True, default='0')
#      Remarks=models.CharField(max_length=100,null=True, default='0')
#      Status=models.CharField(max_length=100,null=True, default='0')


class NCRItems(models.Model):
        NCRId = models.ForeignKey(NCR, on_delete=models.CASCADE, related_name='NCRId',default='1')
        NCRItemProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='NCRItemProject', null=True, blank=True,default='1')
        title=models.CharField(max_length=100,default='1')
        description=models.CharField(max_length=100,default='1')
        location=models.CharField(max_length=100,default='NA')
        qty=models.IntegerField(default='0')
        date=models.DateField(auto_now_add=True,null=True)
        balance=models.IntegerField(default='0')
        status=models.CharField(max_length=100,default='NA')   
        remarks=models.CharField(max_length=100,default='NA')   

    
#external DataBase Project Overview
        
        
class projectsoverview(models.Model):
    projectid = models.SmallIntegerField(db_column='ProjectID', primary_key=True)  # Field name made lowercase.
    pmid = models.SmallIntegerField(db_column='PMID')  # Field name made lowercase.
    offer_approval_method = models.CharField(db_column='Offer-Approval-Method', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    draft_contract_issuance = models.CharField(db_column='Draft-Contract-issuance', max_length=25, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    draft_contract_negotiation_status = models.CharField(db_column='Draft-Contract-negotiation-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    original_contract_receipt = models.CharField(db_column='Original-Contract-Receipt', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    original_contract_signature_by_nlg = models.CharField(db_column='Original-Contract-signature-by-NLG', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    ifc_drawings = models.CharField(db_column='IFC-Drawings', max_length=15, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    structural_drawings = models.CharField(db_column='Structural-Drawings', max_length=15, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    architectural_drawings = models.CharField(db_column='Architectural-Drawings', max_length=15, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    id_drawings = models.CharField(db_column='ID-Drawings', max_length=15, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_schedule_status = models.CharField(db_column='SD-Schedule-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_scheduled_startup_date = models.DateField(db_column='SD-Scheduled-Startup-Date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_scheduled_endup_date = models.DateField(db_column='SD-Scheduled-Endup-Date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_preparation_status = models.CharField(db_column='SD-Preparation-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_submission_status = models.CharField(db_column='SD-Submission-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_approval_status = models.CharField(db_column='SD-Approval-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    latest_sd_revision = models.CharField(db_column='latest-SD-Revision', max_length=5, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_sample_preparation_status = models.CharField(db_column='Glass-Sample-Preparation-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    frame_color_preparation_status = models.CharField(db_column='Frame-color-Preparation-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    material_submission_status = models.CharField(db_column='Material-Submission-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_approval_status = models.CharField(db_column='Glass-Approval-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    approved_glass_type = models.CharField(db_column='Approved-Glass-Type', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    frame_finishing_approval = models.CharField(db_column='Frame-Finishing-Approval', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    approved_color = models.CharField(db_column='Approved-Color', max_length=75, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    approved_color2 = models.CharField(db_column='Approved-Color2', max_length=75, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    approved_color3 = models.CharField(db_column='Approved-Color3', max_length=75, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_mto = models.CharField(db_column='Aluminium-MTO', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_mto = models.CharField(db_column='Glass-MTO', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_system_procurement = models.CharField(db_column='Aluminium-system-Procurement', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_raw_sheets_procurement = models.CharField(db_column='Glass-raw-sheets-procurement', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_system_eta = models.DateField(db_column='Aluminium-system-ETA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_sheets_eta = models.DateField(db_column='Glass-sheets-ETA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    variation_ref = models.CharField(db_column='Variation-ref', max_length=5, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    vo_approval_status = models.CharField(db_column='VO-approval-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    snagging_desnags_esd = models.DateField(db_column='Snagging-Desnags-ESD', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    snagging_desnags_efd = models.DateField(db_column='Snagging-Desnags-EFD', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    as_built_drawings_preparation_status = models.CharField(db_column='As-built-Drawings-Preparation-Status', max_length=12, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    as_built_drawings_submission_status = models.CharField(db_column='AS-built-Drawings-Submission-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    as_built_drawings_submission_date = models.DateField(db_column='AS-built-Drawings-Submission-Date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    handover_documents_preparation = models.CharField(db_column='handover-Documents-Preparation', max_length=12, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    handover_documents_submission_status = models.CharField(db_column='handover-Documents-Submission-status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    handover_documents_submission_date = models.DateField(db_column='handover-Documents-Submission-date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    toc_issuance_status = models.CharField(db_column='TOC-issuance-Status', max_length=20, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    toc_date = models.DateField(db_column='TOC-date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    toc_payment_status = models.CharField(db_column='TOC-payment-Status', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    remarks = models.CharField(db_column='Remarks', max_length=500, blank=True, null=True)  # Field name made lowercase.
    original_contract_countersigned_receipt = models.CharField(db_column='Original-Contract-countersigned-receipt', max_length=10, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    site_measurements_status = models.CharField(db_column='Site-Measurements-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    site_readiness = models.CharField(db_column='Site-readiness', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    installation_status = models.CharField(db_column='Installation-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_approval_date = models.DateField(db_column='Glass Approval date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    color_approval_date = models.DateField(db_column='Color Approval date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    mto_taking = models.CharField(db_column='MTO Taking', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    alumunium_system_order_status = models.CharField(db_column='Alumunium-system-Order-Status', max_length=55, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_takeoff_preparation = models.CharField(db_column='Glass-Takeoff-Preparation', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_sheets_booking_status = models.CharField(db_column='Glass-Sheets-Booking-Status', max_length=55, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    powder_mto_taking = models.CharField(db_column='Powder-MTO-Taking', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    powder_order_status = models.CharField(db_column='Powder-Order-Status', max_length=55, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    powder_eta = models.DateField(db_column='Powder-ETA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_order_release_status = models.CharField(db_column='Aluminium-Order-release-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_order_release_status = models.CharField(db_column='Glass-Order-Release-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    fabrication_status = models.CharField(db_column='Fabrication-Status', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sd_approval_date = models.DateField(db_column='SD-Approval-date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    facadearea = models.FloatField(db_column='FacadeArea', blank=True, null=True)  # Field name made lowercase.
    contractamount = models.FloatField(db_column='ContractAmount', blank=True, null=True)  # Field name made lowercase.
    accumulated_offer_amount = models.FloatField(db_column='Accumulated-Offer-Amount', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    accumulatedcertamount = models.FloatField(db_column='AccumulatedcertAmount', blank=True, null=True)  # Field name made lowercase.
    balance2certify = models.FloatField(db_column='Balance2Certify', blank=True, null=True)  # Field name made lowercase.
    oldcertifiedamount = models.FloatField(db_column='OldCertifiedAmount', blank=True, null=True)  # Field name made lowercase.
    accumulatedinvamount = models.FloatField(db_column='AccumulatedInvAmount', blank=True, null=True)  # Field name made lowercase.
    balance2invoice = models.FloatField(db_column='Balance2Invoice', blank=True, null=True)  # Field name made lowercase.
    accumulatedcollectedamount = models.FloatField(db_column='AccumulatedCollectedAmount', blank=True, null=True)  # Field name made lowercase.
    balance2collect = models.FloatField(db_column='Balance2Collect', blank=True, null=True)  # Field name made lowercase.
    vat = models.CharField(db_column='vat',max_length=45, blank=True, null=True)  # Field name made lowercase.
    site_ready_progress = models.CharField(db_column='SiteReadyProgress', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    site_measurement_progress = models.CharField(db_column='SiteMeasurementProgress', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    aluminium_order_release_progress = models.CharField(db_column='AluminiumOrderReleaseStatus', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_order_release_progress = models.CharField(db_column='GlassOrderReleaseStatus', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    fabrication_progress = models.CharField(db_column='FabricationStatus', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    installation_progress = models.CharField(db_column='InstallationStatus', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_delivery_progress = models.CharField(db_column='GlassDeliveryProgress', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_delivery_status = models.CharField(db_column='GlassDeliveryStatus', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_delivery_eta = models.DateField(db_column='GlassDeliveryETA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    mainid = models.IntegerField(db_column='mainid',default='0')

    site_ready_release = models.CharField(db_column='SiteReadyRelease', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    site_measurement_release = models.CharField(db_column='SiteMeasurementRelease', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_order_release = models.CharField(db_column='GlassOrderStatusReleased', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    alu_order_release = models.CharField(db_column='AluminiumOrderRelease', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    fabrication_release = models.CharField(db_column='FabricationRelease', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    installation_release = models.CharField(db_column='InstallationRelease', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    glass_delivery_release = models.CharField(db_column='GlassDeliveryRelease', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    designer= models.CharField(db_column='designer', max_length=45)

    GlassShutterToSite= models.CharField(db_column='GlassShutterToSite', max_length=45)
    GlassShutterToSiteTotal= models.CharField(db_column='GlassShutterToSiteTotal', max_length=45)
    GlassShutterToSiteRelease= models.CharField(db_column='GlassShutterToSiteRelease', max_length=45)

    SiteMeasureRejection= models.CharField(db_column='SiteMeasureRejection', max_length=45)
    AluOrderRejection= models.CharField(db_column='AluOrderRejection', max_length=45)
    GlassReleaseRejection= models.CharField(db_column='GlassReleaseRejection', max_length=45)
    FabricationRejection= models.CharField(db_column='FabricationRejection', max_length=45)
    InstallationRejection= models.CharField(db_column='InstallationRejection', max_length=45)
    TofactoryRejection= models.CharField(db_column='TofactoryRejection', max_length=45)
    GlassRecievedatNLG= models.CharField(db_column='GlassRecievedatNLG', max_length=45)
    ShuttertoSiteExecuted= models.CharField(db_column='ShuttertoSiteExecuted', max_length=45)
    GlasstoSiteLabel=models.CharField(db_column='GlasstoSiteLabel', max_length=200)
    ShuttertoFactLabel=models.CharField(db_column='ShuttertoFactLabel', max_length=200)

    GlassRelFactoryOpt= models.CharField(db_column='GlassRelFactoryOpt', max_length=200)
    GlassRelFactoryTotal= models.CharField(db_column='GlassRelFactoryTotal', max_length=45)
    GlassRelFactoryExecu= models.CharField(db_column='GlassRelFactoryExecu', max_length=45)
    GlassRelFactoryRej= models.CharField(db_column='GlassRelFactoryRej', max_length=45)
    
    installed_site= models.CharField(db_column='installed_site', max_length=45)
    balance_site= models.CharField(db_column='balance_site', max_length=45)
    install_factory= models.CharField(db_column='install_factory', max_length=45)
    balance_fact= models.CharField(db_column='balance_fact', max_length=45)
    related= models.CharField(db_column='related', max_length=45)
    sd_submission_date= models.CharField(db_column='sd_submission_date', max_length=45)
    class Meta:
        managed = False
        db_table = 'projectoverview'

class Vodetails(models.Model):
    void = models.SmallAutoField(db_column='VOID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
    vonb = models.CharField(db_column='VONB', max_length=3)  # Field name made lowercase.
    voamount = models.FloatField(db_column='VOamount')  # Field name made lowercase.
    vodate = models.DateField(db_column='VOdate')  # Field name made lowercase.
    vodescription = models.CharField(db_column='VODescription', max_length=45, blank=True, null=True)  # Field name made lowercase.
    voapprovalstatus = models.CharField(db_column='VOApprovalStatus', max_length=20)  # Field name made lowercase.
    voapprovalform = models.CharField(db_column='VOapprovalForm', max_length=20, blank=True, null=True)  # Field name made lowercase.
    voapprovaldate = models.DateField(db_column='VOapprovalDate')  # Field name made lowercase.
    mainid = models.IntegerField(db_column='mainid',default='0')
    class Meta:
        managed = False
        db_table = 'vodetails'


##external DataBase projects

class ProjectsList(models.Model):
    project_id = models.SmallIntegerField(db_column='Project-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    project_name = models.CharField(db_column='Project-Name', max_length=45)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    project_area = models.CharField(db_column='Project-Area', max_length=25)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    project_cityid = models.SmallIntegerField(db_column='Project-CityID')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    projectvalue = models.FloatField(db_column='ProjectValue', blank=True, null=True)  # Field name made lowercase.
    customerid = models.SmallIntegerField(db_column='CustomerID')  # Field name made lowercase.
    projectmanagerid = models.SmallIntegerField(db_column='ProjectManagerID')  # Field name made lowercase.
    phase = models.IntegerField(db_column='phase',default='0')  # Field name made lowercase.
    # mainid = models.IntegerField(db_column='mainid',default='0') 
    projectstatus = models.CharField(db_column='ProjectStatus', max_length=20, blank=True, null=True)  # Field name made lowercase.
    paymentstatus = models.CharField(db_column='PaymentStatus', max_length=40, blank=True, null=True)  # Field name made lowercase.
    mainid = models.IntegerField(db_column='mainid',default='0')
    class Meta:
        managed = False
        db_table = 'projects_list'


class Projectsmanagers(models.Model):
    projectmid = models.SmallIntegerField(db_column='ProjectMID', primary_key=True)  # Field name made lowercase.
    pmname = models.CharField(db_column='PMName', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'projectsmanagers'



class Paymentterms(models.Model):
    paytid = models.SmallIntegerField(db_column='PayTID', primary_key=True)  # Field name made lowercase.
    paymentterm = models.CharField(db_column='PaymentTerm', max_length=60)  # Field name made lowercase.
 
    class Meta:
        managed = False
        db_table = 'paymentterms'


class Projectpayments(models.Model):
    pptid = models.SmallIntegerField(db_column='PPTID', primary_key=True)  # Field name made lowercase.
    projectid = models.ForeignKey('ProjectsList', models.DO_NOTHING, db_column='ProjectID')  # Field name made lowercase.
    paymenttermid = models.ForeignKey(Paymentterms, models.DO_NOTHING, db_column='PaymenttermID')  # Field name made lowercase.
    paymentpercentage = models.DecimalField(db_column='PaymentPercentage', max_digits=5, decimal_places=4)  # Field name made lowercase.
    note = models.CharField(db_column='Note', max_length=45, blank=True, null=True)  # Field name made lowercase.
    mainid = models.IntegerField(db_column='mainid',default='0')
    class Meta:
        managed = False
        db_table = 'projectpayments'




class Eventslogging(models.Model):
    eventid = models.SmallIntegerField(db_column='EventID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
    eventdate = models.DateField(db_column='EventDate')  # Field name made lowercase.
    eventdescription = models.CharField(db_column='EventDescription', max_length=300)  # Field name made lowercase.
    eventimpact = models.CharField(db_column='EventImpact', max_length=45)  # Field name made lowercase.
    category = models.CharField(db_column='category', max_length=45)
    link = models.CharField(db_column='link', max_length=700)  # Field name made lowercase.
    mainid = models.IntegerField(db_column='mainid',default='0')
    class Meta:
        managed = False
        db_table = 'eventslogging'


class transactions(models.Model):
    transaction_id = models.SmallIntegerField(db_column='Transaction-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    transaction_date = models.DateField(db_column='Transaction-Date')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    transaction_or_invoice = models.CharField(db_column='Transaction_Or_Invoice', max_length=12)  # Field name made lowercase.
    transactiontype = models.CharField(db_column='TransactionType', max_length=12)  # Field name made lowercase.
    clientnameid = models.SmallIntegerField(db_column='ClientNameID')  # Field name made lowercase.
    clienttype = models.CharField(db_column='ClientType', max_length=20)  # Field name made lowercase.
    banknameid = models.SmallIntegerField(db_column='BankNameID')  # Field name made lowercase.
    currency = models.CharField(db_column='Currency', max_length=5)  # Field name made lowercase.
    transactionvalue = models.FloatField(db_column='TransactionValue')  # Field name made lowercase.
    vat = models.IntegerField(db_column='VAT')  # Field name made lowercase.
    paymenttypeid = models.SmallIntegerField(db_column='PaymentTypeID')  # Field name made lowercase.
    paymentreference = models.CharField(db_column='PaymentReference', max_length=45, blank=True, null=True)  # Field name made lowercase.
    paymentduedate = models.DateField(db_column='PaymentDueDate')  # Field name made lowercase.
    debitdreditstatusid = models.SmallIntegerField(db_column='DebitDreditStatusID')  # Field name made lowercase.
    invoicenb = models.CharField(db_column='InvoiceNB', max_length=255, blank=True, null=True)  # Field name made lowercase.
    projectnameid = models.SmallIntegerField(db_column='ProjectNameID')  # Field name made lowercase.
    bcategoryid = models.SmallIntegerField(db_column='BcategoryID')  # Field name made lowercase.
    comment = models.CharField(db_column='Comment', max_length=255, blank=True, null=True)  # Field name made lowercase.
    transactionstatus = models.CharField(db_column='TransactionStatus', max_length=25)  # Field name made lowercase.
    transaction_payment = models.CharField(db_column='Transaction_Payment', max_length=12)  # Field name made lowercase.
    verifying_invoice = models.CharField(db_column='Verifying_Invoice', max_length=12, blank=True, null=True)  # Field name made lowercase.
    paymentproof = models.CharField(db_column='PaymentProof', max_length=255, blank=True, null=True)  # Field name made lowercase.
    paymentmilestoneid = models.SmallIntegerField(db_column='PaymentMilestoneID', blank=True, null=True)  # Field name made lowercase.
    mainid = models.IntegerField(db_column='MainID',default='0')
    class Meta:
        managed = False
        db_table = 'transactions'




class Paymenttypes(models.Model):
    payment_id = models.SmallIntegerField(db_column='Payment-ID', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    payment_type = models.CharField(db_column='Payment_Type', max_length=25)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'paymenttypes'



class Parameters4Po(models.Model):
    paraid = models.SmallIntegerField(db_column='ParaID', primary_key=True)  # Field name made lowercase.
    paracontrol = models.CharField(db_column='ParaControl', max_length=145, blank=True, null=True)  # Field name made lowercase.
    paravalue = models.CharField(db_column='ParaValue', max_length=145, blank=True, null=True)  # Field name made lowercase.
    paracolor = models.CharField(db_column='ParaColor', max_length=45, blank=True, null=True) 
    class Meta:
        managed = False
        db_table = 'parameters4po'



class Certifiedpayment(models.Model):
    serialnb = models.SmallIntegerField(primary_key=True)
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
    certificationid = models.CharField(db_column='CertificationID', max_length=10, blank=True, null=True)  # Field name made lowercase.
    certifiedamount = models.FloatField(db_column='CertifiedAmount', blank=True, null=True)  # Field name made lowercase.
    certificationdate = models.DateField(db_column='CertificationDate', blank=True, null=True)  # Field name made lowercase.
    certificationremark = models.CharField(db_column='CertificationRemark', max_length=200, blank=True, null=True)  # Field name made lowercase.
    approvedcertifiedamount = models.FloatField(db_column='ApprovedCertifiedAmount', blank=True, null=True)  # Field name made lowercase.
    certificationapprovaldate = models.DateField(db_column='CertificationApprovalDate', blank=True, null=True)  # Field name made lowercase.
    # accumulatedcertamount = models.FloatField(db_column='AccumulatedcertAmount', blank=True, null=True)  # Field name made lowercase.
    #balance2certify = models.FloatField(db_column='Balance2Certify', blank=True, null=True)  # Field name made lowercase.
    #oldcertifiedamount = models.FloatField(db_column='OldCertifiedAmount', blank=True, null=True)  # Field name made lowercase.
    mainid = models.IntegerField(db_column='mainid',default='0')
    class Meta:
        managed = False
        db_table = 'certifiedpayment'


class Invoicing(models.Model):
    invoicingid = models.IntegerField(db_column='InvoicingID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID')  # Field name made lowercase.
    certificationid = models.CharField(db_column='CertificationID', max_length=10, blank=True, null=True)  # Field name made lowercase.
    invoicereference = models.CharField(db_column='InvoiceReference', max_length=35, blank=True, null=True)  # Field name made lowercase.
    invoiceamount = models.FloatField(db_column='InvoiceAmount', blank=True, null=True)  # Field name made lowercase.
    invoicedate = models.DateField(db_column='InvoiceDate', blank=True, null=True)  # Field name made lowercase.
    invoiceduedate = models.DateField(db_column='InvoiceDueDate', blank=True, null=True)  # Field name made lowercase.
    mainid = models.IntegerField(db_column='mainid',default='0')
    class Meta:
        managed = False
        db_table = 'invoicing'



class Collection(models.Model):
    collectionid = models.IntegerField(db_column='CollectionID', primary_key=True)  # Field name made lowercase.
    projectid = models.SmallIntegerField(db_column='ProjectID', blank=True, null=True)  # Field name made lowercase.
    invoicereference = models.CharField(db_column='InvoiceReference', max_length=45, blank=True, null=True)  # Field name made lowercase.
    received_amount = models.FloatField(db_column='Received Amount', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    paymentreceiptdate = models.DateField(db_column='PaymentReceiptDate', blank=True, null=True)  # Field name made lowercase.
    paymenttype = models.CharField(db_column='PaymentType', max_length=45, blank=True, null=True)  # Field name made lowercase.
    paymentduedate = models.DateField(db_column='PaymentDueDate', blank=True, null=True)  # Field name made lowercase.
    mainid = models.IntegerField(db_column='mainid',default='0')
    class Meta:
        managed = False
        db_table = 'collection'



class Glasstypes(models.Model):
    glassid = models.AutoField(db_column='GlassID', primary_key=True)  # Field name made lowercase.
    glasstype = models.CharField(db_column='GlassType', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'glasstypes'


class Attachments(models.Model):
    title = models.CharField(max_length=99, blank=True, null=True)
    link = models.CharField(max_length=200, blank=True, null=True)
    project_id = models.CharField(max_length=45)
    date = models.CharField(max_length=45, blank=True, null=True)
    mainid = models.IntegerField(db_column='mainid',default='0')
    class Meta:
        managed = False
        db_table = 'attachments'



class Finishingtype(models.Model):
    finishid = models.AutoField(db_column='FinishID', primary_key=True)  # Field name made lowercase.
    finishdescription = models.CharField(db_column='FinishDescription', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'finishingtype'


##External Database For Accounts
        
        
class Cities(models.Model):
    customerarea_id = models.SmallIntegerField(db_column='CustomerArea_ID', primary_key=True)  # Field name made lowercase.
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=55)
    country_code = models.CharField(db_column='Country_Code', max_length=10)  # Field name made lowercase.
    continent = models.CharField(db_column='Continent', max_length=55, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'cities'


class Salesmen(models.Model):
    salesmanid = models.SmallIntegerField(db_column='SalesmanID', primary_key=True)  # Field name made lowercase.
    salesman_name = models.CharField(db_column='Salesman_Name', max_length=60)  # Field name made lowercase.
    salesman_type = models.CharField(db_column='Salesman_Type', max_length=20)  # Field name made lowercase.
    salesman_nationality = models.CharField(db_column='Salesman_Nationality', max_length=55, blank=True, null=True)  # Field name made lowercase.
    salesman_mobile = models.CharField(db_column='Salesman_Mobile', max_length=20, blank=True, null=True)  # Field name made lowercase.
    salesman_email = models.CharField(db_column='Salesman_Email', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'salesmen'

class Customers(models.Model):
    customer_id = models.SmallIntegerField(db_column='Customer_ID', primary_key=True)  # Field name made lowercase.
    customer_name = models.CharField(db_column='Customer_Name', max_length=60)  # Field name made lowercase.
    customer_locationid = models.ForeignKey(Cities, models.DO_NOTHING, db_column='Customer_LocationID')  # Field name made lowercase.
    customer_address = models.CharField(db_column='Customer_Address', max_length=255)  # Field name made lowercase.
    customer_type = models.CharField(db_column='Customer_Type', max_length=25)  # Field name made lowercase.
    introduced_by = models.ForeignKey('Salesmen', models.DO_NOTHING, db_column='Introduced_By', blank=True, null=True)  # Field name made lowercase.
    introduction_email = models.CharField(db_column='Introduction_Email', max_length=5, blank=True, null=True)  # Field name made lowercase.
    registration_status = models.CharField(db_column='Registration_Status', max_length=25, blank=True, null=True)  # Field name made lowercase.
    prequalification_submital = models.CharField(db_column='Prequalification_Submital', max_length=25, blank=True, null=True)  # Field name made lowercase.
    meeting = models.CharField(db_column='Meeting', max_length=25, blank=True, null=True)  # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'customers'

##end of ecternal database

##Delete these tables on project completion
##un comment before running any migration 
# class Finishingtype(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Collection(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Attachments(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Glasstypes(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Invoicing(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class projectsoverview(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Paymenttypes(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Certifiedpayment(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Parameters4Po(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Eventslogging(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class ProjectsList(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class transactions(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Projectsmanagers(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Vodetails(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Projectpayments(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Paymentterms(models.Model):
#     name = models.CharField(max_length=100,default='test')

# class Cities(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Salesmen(models.Model):
#     name = models.CharField(max_length=100,default='test')
# class Customers(models.Model):
#     name = models.CharField(max_length=100,default='test')
# #Finishingtype,Collection,Attachments,Glasstypes,Invoicing,projectsoverview,Paymenttypes,Certifiedpayment,Parameters4Po,Eventslogging,ProjectsList,transactions,Projectsmanagers,Vodetails,Projectpayments,Paymentterms