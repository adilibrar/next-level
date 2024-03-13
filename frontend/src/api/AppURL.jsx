class AppURL{

    static BaseURL="http://192.168.168.52:8000/"

    static NewStock=this.BaseURL+"store/new-stock-list";
    static NewStockType=this.BaseURL+"store/new-stock-list-type";
    static NewStockByItem=this.BaseURL+"store/new-stock-list-itemid";
    
    static Stock=this.BaseURL+"store/stock";
    static StockDetail=this.BaseURL+"store/stock-detail";
    static AvailableStock=this.BaseURL+"store/available-stock";
    static OutOfStock=this.BaseURL+"store/out-of-stock";
    static AccStock=this.BaseURL+"store/acc-stock";
    
    
    static SingleStockItem(item){
        return this.BaseURL+"store/single-stock/"+item;

    }


    static SingleStockQTY = this.BaseURL+"store/single-stock-qty"

    static ChangeSingleQTY = this.BaseURL+"store/change-assigned-quantity"


    static SingleStockIssued(item){
        return this.BaseURL+"store/stock-issued/"+item;

    }


    static StockDamaged(item){
        return this.BaseURL+"store/stock-damaged/"+item;

    }

    static StockIssuingDelete(item){
        return this.BaseURL+"store/stock-issued/"+item+"/";

    }

    static StockReleaseUpdate(item){
        return this.BaseURL+"store/stock-issued/"+item+"/";

    }


    static StockValueUpdate(item){
        return this.BaseURL+"store/stock-avalibility/"+item;

    }



    static StockValueUpdateBYItem(item){
        return this.BaseURL+"store/stock-avalibility-by-item/"+item;

    }


   static IssuedStockList=this.BaseURL+"store/stock-issued-list"

    static IssueStock = this.BaseURL+"store/stock-issuing"
    static AdjustBalance=this.BaseURL+"store/adjust-balance-issue"
    static DamageStock = this.BaseURL+"store/adding-damage"



    static StockIssuedStatus(item){
        return this.BaseURL+"store/updateIssuedItemStatus/"+item;

    }

    static ProjectList = this.BaseURL+"store/projects"
    static LatestProjects = this.BaseURL+"store/latest-projects"
    static RunningProjects = this.BaseURL+"store/running-projects"
    static StockList = this.BaseURL+"store/stock"
    static ProjectDetail(project){
        return this.BaseURL+"store/projects/"+project;
    }

    static ItemByProject(project){
        return this.BaseURL+"store/item-by-projects/"+project;

    }

    
    static DNItemByProject(project){
        return this.BaseURL+"pc-item-by-project/"+project;

    }

    static PRItemByProject(project){
        return this.BaseURL+"pr-item-by-project/"+project;

    }
    

  //  static ProjectDetail(project){
    //    return this.BaseURL+"store/items/"+project;
//
//    }

    

    static StatusList = this.BaseURL+"store/status"
    static ItemAll = this.BaseURL+"store/items"

    //MTO URL

    static MTOList = this.BaseURL+"mto-list"
    static MTOListByProject(projectid){
        return this.BaseURL+"mto-list-by-project/"+projectid;

    }
    
    
    static getAlternative = this.BaseURL+"store/get-alternative"
    static getProductionStock = this.BaseURL+"store/production-stock"

    static MTOListSubmitted = this.BaseURL+"mto-list-submitted"
    static ItemByMto(mto){
        return this.BaseURL+"mto-item/"+mto;

    }

    static IssuedItemByMto(mto){
        return this.BaseURL+"reserved-item-by-mto/"+mto;

    }

    static AddMTOItem = this.BaseURL+"add-mtoitem"
    static MTOItemDelete(item){
        return this.BaseURL+"delete-mto-item/"+item;
    }

    static DNItemDelete(item){
        return this.BaseURL+"delete-dn-item/"+item;
    }

    static DNItemCustomDelete(item,issue){
        return this.BaseURL+"delete-dn-item-custom/"+item+"/"+issue;
    }

    static UpdateMIQty(id,qty){
        return this.BaseURL+"update-mto-item-qty/"+id+"/"+qty;
    }

    static UpdateMIColor(id,color){
        return this.BaseURL+"update-mto-item-color/"+id+"/"+color;
    }
    
    static CartItemDelete(item){
        return this.BaseURL+"delete-cart-item/"+item;
    }

    static AddMTO = this.BaseURL+"add-mto"
    static UpdateMTOItemStatus = this.BaseURL+"mto-item-status"
    //static MTOImport = this.BaseURL+"/mto-import"

    static MTOImport(mto){
        return this.BaseURL+"mto-import/"+mto;
    }

    static SingleMTO(mto){
        return this.BaseURL+"single-mto/"+mto;
    }


    
    //http://127.0.0.1:8000/mto-list
    //static ItemList = this.BaseURL+"/store/items"
    static ItemList(item){
        return this.BaseURL+"store/items/"+item;
    }
    static UpdateMTOStatus=this.BaseURL+"mto-submital-status"
    
    //adding-damage

    //ADD to Cart
    static ADDToCart=this.BaseURL+"store/add-to-cart"
    static CartList=this.BaseURL+"store/cart-list"
    static OrderList=this.BaseURL+"store/order-list"
    static OrderListLimit=this.BaseURL+"store/order-list-limit"

    static OrderItems(oid){
        return this.BaseURL+"store/order-item/"+oid;
    }
    static ApprovedOrderItem=this.BaseURL+"store/approved-order-item"
    static NAEmail=this.BaseURL+"store/send-email-not-available"
    
    static ApprovedQuotationOrderItem=this.BaseURL+"store/approved-quotation-order-item"
    
    static PurchaseOrderList=this.BaseURL+"store/purchase-order-list"
    static PurchaseOrderListLimit=this.BaseURL+"store/po-list-limit"
    
    static LoginURL=this.BaseURL+"nlg-auth/login/"

    static UserData=this.BaseURL+"me"

    static CreateOrder=this.BaseURL+"store/create-order"
    static CreatOrderQItem=this.BaseURL+"store/create-quotation-order-item"
    static GetMTOITEMDetail=this.BaseURL+"check-mto-item"
    static MTOItemColorUpdate=this.BaseURL+"mto-item-color"
    
    
    static UpdateDNNote=this.BaseURL+"update-dn-note"
    
    static UpdateDNStatus=this.BaseURL+"dn-copy-status"
    static AddDN=this.BaseURL+"add-dn"
    static AddDNITEM=this.BaseURL+"add-dn-item"
    static DNList = this.BaseURL+"dn-list"
    static DNListLimit = this.BaseURL+"dn-list-limit"



    static ItemByDN(dn){
        return this.BaseURL+"dn-item-list/"+dn;
    }
    
    
    static SingleDN(dn){
        return this.BaseURL+"single-dn/"+dn;
    }

    static AddST=this.BaseURL+"add-st"
    static STList = this.BaseURL+"st-list"
    static AddSTItem=this.BaseURL+"add-st-item"
    
    static SingleST(st){
        return this.BaseURL+"single-st/"+st;
    }
    static ItemByST(st){
        return this.BaseURL+"st-item-list/"+st;
    }

    static UpdateSTNote=this.BaseURL+"update-st-note"
    static UpdateSTItemQty=this.BaseURL+"store/update-st-item"
    
    static IssuetoProduction = this.BaseURL+"save-item-issuing-production"
    static IssuedBalance = this.BaseURL+"update-issue-balance"
    static UnitOfMeasure = this.BaseURL+"unit-of-measure"
    static IssueItemUpdate = this.BaseURL+"store/issued-item-update"
    static GetFinishing = this.BaseURL+"store/get-finishing"

    static GetItemType = this.BaseURL+"store/itemtype"

    
    static AddPOItem=this.BaseURL+"store/add-po-item"
    static UpdatePRItems(pr_item_id){
        return this.BaseURL+"store/update-pr-item/"+pr_item_id
    }

    static UpdatePRQItems(pr_item_id){
        return this.BaseURL+"store/update-quot-pr-item/"+pr_item_id
    }

    
    static GetReservedItemMTO(mtoid){
        return this.BaseURL+"store/get-reserved-item-mto/"+mtoid
    }
    static UpdateStockReservedMTO = this.BaseURL+"store/update_stock_balnce-reserved"
    
    //temporary for sumod recieving item next 3
    static POLIST = this.BaseURL+"store/po-list"
    static POLISTPI = this.BaseURL+"store/po-list-pi"
    static UpdateItemPI = this.BaseURL+"store/update-pi-mto"
    
    //used in others as well
    static POItemSave = this.BaseURL+"store/save-po-item"
    static POQItemSave = this.BaseURL+"store/save-po-quotation-item"
    static UpdatePOItem = this.BaseURL+"store/update-po-item"
    
    static POITEMByPO(poid){
        return this.BaseURL+"store/po-item-list/"+poid;
        }

    static POQITEMByPO(poid){
            return this.BaseURL+"store/po-quotation-item-list/"+poid;
            }
        
       
    static SinglePO(poid){
            return this.BaseURL+"store/single-po/"+poid;
            }

     
    
   static UserProfile(oid){
    return this.BaseURL+"profile/"+oid;
    }

static MTOItemCopy(mtoidn,mtoido){
    return this.BaseURL+"mto-item-copy/"+mtoidn+"/"+mtoido;
}

static DNItemCopy(mtoidn,mtoido){
    return this.BaseURL+"dn-item-copy/"+mtoidn+"/"+mtoido;
}

static ApproveOrder(orderid){
    return this.BaseURL+"store/order-update/"+orderid;
}

static QuotationOrderItem(orderid){
    return this.BaseURL+"store/order-update/"+orderid;
}

static QuotationOrderItemUpdate(orderid){
    return this.BaseURL+"store/order-update-and-item/"+orderid;
}




static OrderDetail(orderid){
    return this.BaseURL+"store/order-detail/"+orderid;
}
static ApproveOrderAndItem(orderid){
    return this.BaseURL+"store/order-approve-and-item/"+orderid;
}

static ProductionItemByDate = this.BaseURL+"store/pr-item-by-date"

static GETAccountsSubmittedPO = this.BaseURL+"store/get-po-accounts-submitted"

static GETAccountsApprovedPO = this.BaseURL+"store/get-po-accounts-approved"

static UpdateAccountsPO=this.BaseURL+"store/po-accounts-submitted"

static ApproveSubmittedPO = this.BaseURL+"store/approve-submitted-po"
static RevokeSubmittedData = this.BaseURL+"store/issued-stock-rollback"
static UpdateRevokedData = this.BaseURL+"store/update-revoked-stock"

static POItemRecieve = this.BaseURL+"store/po-item-recieve"

static SupplierDNINList = this.BaseURL+"store/supplier-dn-in-list"

static DNINSupplierItem = this.BaseURL+"store/dnin-supplier-item-save"

static AccountsHead = this.BaseURL+"store/accounts-head-list"

static LowStock = this.BaseURL+"store/low-stock-report"

static QuotationOrderItem(orderid){
    return this.BaseURL+"store/quotation-order-item/"+orderid;
}
static ReturnIssue = this.BaseURL+"store/return-issue-stock"

static SiteDNList = this.BaseURL+"store/site-delivery-list"

static SaveSiteItem = this.BaseURL+"store/save-site-item"

static SaveSiteDN = this.BaseURL+"store/save-site-dn"
//static SiteDNItem = this.BaseURL+"store/site-delivery-item"
static SupplierList = this.BaseURL+"store/supplier-list"
static SupplierDNSAve = this.BaseURL+"store/supplier-dn-save"
static CurrencyList = this.BaseURL+"all-currency"
static ADDPO = this.BaseURL+"add-po"
static EditPO = this.BaseURL+"edit-po"
static EditPOItem = this.BaseURL+"edit-po-item"

static EditQPOItem = this.BaseURL+"edit-quotation-po-item"


static SiteDNItem(sitedn){
    return this.BaseURL+"store/site-delivery-item/"+sitedn;
}

static SiteDNDetail(sitedn){
    return this.BaseURL+"store/single-site-dn/"+sitedn;
}

static ProjectAllItems(project){
    return this.BaseURL+"mto-all-items/"+project;
}


static ProjectAllMTOItems(project){
    return this.BaseURL+"all-mto-items/"+project;
}
static ProjectAllIssuedItem(project){
    return this.BaseURL+"store/stock-issued-by-project/"+project;
}



static IssuedItemByProject(project){
    return this.BaseURL+"store/all-mto-data/"+project;
}

static SupplierInvoice(dn){
    return this.BaseURL+"store/supplier-dn-all-items/"+dn;
}


static CreateOrderQuotation = this.BaseURL+"store/create-order-quotation"

// static GetCutingProfile(dn){
//     return this.BaseURL+"store/get-corvision-profile/"+dn;
// }

static GetCorvision(cor){
    return this.BaseURL+"store/get-corvision-data/"+cor;
}
static GetCutingProfile = this.BaseURL+"store/get-corvision-profile"
static GetCutingInterlockProfile = this.BaseURL+"store/get-corvision-interlock"
static GetCutingInterlockAcc = this.BaseURL+"store/get-corvision-interlockacc"
static GetCutingAcc = this.BaseURL+"store/get-corvision-acc"
static GetCutingGasket = this.BaseURL+"store/get-corvision-gasket"
static GetCutingScrew = this.BaseURL+"store/get-corvision-screw"
static GetCuttingScrew = this.BaseURL+"store/get-corvision-packing"
static GetCuttingGlass = this.BaseURL+"store/get-corvision-glass"
//static GetProfileData = this.BaseURL+"store/get-total-profile"

static GetProfileData(project,mtostatus){
    return this.BaseURL+"store/get-total-profile/"+project+"/"+mtostatus;
}
static GetFloors(project){
    return this.BaseURL+"store/get-floors/"+project;
}

static GetElevation(project,elevation){
    return this.BaseURL+"store/get-elevation/"+project+"/"+elevation;
}

static GetSingleFloor(project){
    return this.BaseURL+"store/get-single-floor/"+project;
}

static GetLocks = this.BaseURL+"store/get-lock"

//Final Released Window
static FReleaseWindow = this.BaseURL+"store/final-release-window"
static FGetCutingProfile = this.BaseURL+"store/final-get-corvision-profile"
static FGetCutingInterlockProfile = this.BaseURL+"store/final-get-corvision-interlock"
static FGetCutingInterlockAcc = this.BaseURL+"store/final-get-corvision-interlockacc"
static FinalGetCutingAcc = this.BaseURL+"store/final-get-corvision-acc"
static FGetCutingGasket = this.BaseURL+"store/final-get-corvision-gasket"
static FGetCutingScrew = this.BaseURL+"store/final-get-corvision-screw"
static FGetCuttingPacking = this.BaseURL+"store/final-get-corvision-packing"
static FGetCuttingGlass = this.BaseURL+"store/final-get-corvision-glass"

//MTO Released Window
static ReleaseWindow = this.BaseURL+"store/release-window"
static ReleaseWindowCustomDim = this.BaseURL+"store/release-window-custom-dim"
static ReleaseWindowCustomShuter = this.BaseURL+"store/release-window-custom-shutter"
static FinalReleaseWindowCustomShuter = this.BaseURL+"store/final-release-window-custom-shutter"
static FReleaseWindowCustomDim = this.BaseURL+"store/final-release-window-custom-dim"
static  = this.BaseURL+"store/release-window-custom-dim-data"
static ReleaseWindowCustomDimData(window){
    return this.BaseURL+"store/release-window-custom-dim-data/"+window
}

static ReleaseWindowCustomShutterData(window){
    return this.BaseURL+"store/release-window-custom-shutter-data/"+window
}


// static ReleaseWindowCustomShutter(window){
//     return this.BaseURL+"store/release-window-custom-dim-data/"+window
// }

static GetRevokeList=this.BaseURL+"store/revoke-list"

static RestoreReversed=this.BaseURL+"store/restore-revoked"

static GetRevokeListProject(project){
    return this.BaseURL+"store/revoke-list-project/"+project;
}

//static item_list_by_mto=this.BaseURL+"store/item-list-by-mto"
//static FloorWindows = this.BaseURL+"store/floor-windows"


static item_list_by_mto(mto){
    return this.BaseURL+"store/item-list-by-mto/"+mto;
}

static FloorWindows(project,elevation){
    return this.BaseURL+"store/floor-windows/"+project+"/"+elevation;
}

static FFloorWindows(project,elevation){
    return this.BaseURL+"store/final-floor-windows/"+project+"/"+elevation;
}

static WindowProfileDetail(window){
    return this.BaseURL+"store/window-data/"+window;
}

//getting final window data
static FinalSingleWindowData(window){
    return this.BaseURL+"store/final-single-window-data/"+window;
}

static FinalWindowProfileDetail(window){
    return this.BaseURL+"store/final-window-data/"+window;
}


static FinalWindowInterLockDetail(window){
    return this.BaseURL+"store/final-window-interlock-data/"+window;
}

static FinalWindowAccDetail(window){
    return this.BaseURL+"store/final-window-acc-data/"+window;
}

static FinalWindowDataAccInterlock(window){
    return this.BaseURL+"store/final-window-acc-interlock-data/"+window;
}


static FinalWindowDataScrew(window){
    return this.BaseURL+"store/final-window-screw-data/"+window;
}


static FinalWindowDataGasket(window){
    return this.BaseURL+"store/final-window-gasket-data/"+window;
}

static FinalWindowDataGlass(window){
    return this.BaseURL+"store/final-window-glass-data/"+window;
}

static FinalWindowDataPacking(window){
    return this.BaseURL+"store/final-window-packing-data/"+window;
}
//edn


static SingleWindowData(window){
    return this.BaseURL+"store/single-window-data/"+window;
}

static WindowInterLockDetail(window){
    return this.BaseURL+"store/window-interlock-data/"+window;
}

static WindowAccDetail(window){
    return this.BaseURL+"store/window-acc-data/"+window;
}


static WindowDataAccInterlock(window){
    return this.BaseURL+"store/window-acc-interlock-data/"+window;
}



static WindowDataScrew(window){
    return this.BaseURL+"store/window-screw-data/"+window;
}



static WindowDataGasket(window){
    return this.BaseURL+"store/window-gasket-data/"+window;
}

static WindowDataGlass(window){
    return this.BaseURL+"store/window-glass-data/"+window;
}

static WindowDataPacking(window){
    return this.BaseURL+"store/window-packing-data/"+window;
}

static SingleLock(lock){
    return this.BaseURL+"store/single-lock/"+lock;
}


static AllCorWindows = this.BaseURL+"store/all-corvision-data"

static SaveFloor = this.BaseURL+"store/save-floor"

static CreateData = this.BaseURL+"store/create-data"


static SaveCorWindow = this.BaseURL+"store/save-corvision-data"


static SaveWindowProfileData = this.BaseURL+"store/save-window-profile-data"
static SaveCorVisionInterLockProfile = this.BaseURL+"store/save-corvisioninterlock-profile-data"
static SaveCorVisionInterLockAcc = this.BaseURL+"store/save-corvisioninterlock-acc-data"


static SaveWindowAccData = this.BaseURL+"store/save-window-acc-data"

static SaveWindowGasketData = this.BaseURL+"store/save-window-gasket-data"

static SaveWindowScrewData = this.BaseURL+"store/save-window-screw-data"

static SaveWindowPackingData = this.BaseURL+"store/save-window-packing-data"

static SaveWindowGlassData = this.BaseURL+"store/save-window-glass-data"


static GetSingleCorProfile(item){
    return this.BaseURL+"store/get-single-corvision-profile/"+item;
}


static DeleteCorProfileData(profile){
    return this.BaseURL+"store/delete-window-profile-data/"+profile;
}


static DeleteCorInterProfileData(profile){
    return this.BaseURL+"store/delete-window-interprofile-data/"+profile;
}

static DeleteCorInterAccData(profile){
    return this.BaseURL+"store/delete-window-interacc-data/"+profile;
}

static DeleteCorAccData(profile){
    return this.BaseURL+"store/delete-window-acc-data/"+profile;
}


static DeleteCorGasketData(profile){
    return this.BaseURL+"store/delete-window-gasket-data/"+profile;
}


static DeleteCorScrewData(profile){
    return this.BaseURL+"store/delete-window-screw-data/"+profile;
}


static DeleteCorPackingData(profile){
    return this.BaseURL+"store/delete-window-packing-data/"+profile;
}

static DeleteCorGlassData(profile){
    return this.BaseURL+"store/delete-window-glass-data/"+profile;
}


static GetCorProfileData(cor){
    return this.BaseURL+"store/get-window-profile-data/"+cor;
}

static GetCorInterLockProfileData(cor){
    return this.BaseURL+"store/get-interlock-profile-data/"+cor;
}


static GetCorAccData(cor){
    return this.BaseURL+"store/get-cor-acc-data/"+cor;
}

static GetCorGasketData(cor){
    return this.BaseURL+"store/get-cor-gasket-data/"+cor;
}


static GetCorScrewData(cor){
    return this.BaseURL+"store/get-cor-screw-data/"+cor;
}


static GetCorPackingData(cor){
    return this.BaseURL+"store/get-cor-packing-data/"+cor;
}

static GetCorGlassData(cor){
    return this.BaseURL+"store/get-cor-glass-data/"+cor;
}


static GetCorIAccData(cor){
    return this.BaseURL+"store/get-cor-interlock-acc-data/"+cor;
}

static UpdateWindowStatus(window){
    return this.BaseURL+"store/update-window-status/"+window;
}

//UpdateHoldWindowStatus


static UpdateHoldWindowStatus = this.BaseURL+"store/update-created-window-status";

static UpdateWindowStatusWNum(window,status){
    return this.BaseURL+"store/update-window-status-wnum/"+window+"/"+status;
}

static GetStockListAll(project){
    return this.BaseURL+"store/get-corvision-stocklist/"+project;
}

static GetSingleStockList(stock){
    return this.BaseURL+"store/get-single-stocklist/"+stock;
}


static GetSingleStockListDetail(stock){
    return this.BaseURL+"store/get-single-stocklist-detail/"+stock;
}

static IssuedDetailByItem(item){
    return this.BaseURL+"store/stock-view-by-item/"+item;
}



static UpdateStockRevoke = this.BaseURL+"store/update-stock-revoke-qty";

static MandatoryStockDetail = this.BaseURL+"store/mandatory-stock-list";


static GetTotalOrderItem(item){
    return this.BaseURL+"get-total-ordered-item/"+item;
}

static GetTotalReservedItem(item){
    return this.BaseURL+"get-total-reserved-item/"+item;
}


// External Database Requests

// static ExternalProjectsList = this.BaseURL+"proj-overview";

static ExternalProjectManagerList = this.BaseURL+"project-managers-list";

static ExternalprojectsListByStatus(status,external){
    return this.BaseURL+"project-list-by-status/"+status+"/"+external;
}

static ExternalprojectsListByStatusSA(status){
    return this.BaseURL+"project-list-by-status-sa/"+status;
}

static ExternalprojectsList(external){
    return this.BaseURL+"project-list/"+external;
}

static ExternalprojectsListBYPMStatus(status,pm){
    return this.BaseURL+"project-list-by-status-pm/"+status+"/"+pm;
}


static ExternalprojectsListAll = this.BaseURL+"project-list-all";


static ESingleProject(project){
    return this.BaseURL+"single-project/"+project;
}

static ESingleProjectMain(project){
    return this.BaseURL+"single-project-main/"+project;
}


static ESingleProjectOverView(project){
    return this.BaseURL+"single-project-overview/"+project;
}


static ESingleProjectManager(manager){
    return this.BaseURL+"project-managers-single/"+manager;
}

static GetTotalOrderItem(item){
    return this.BaseURL+"get-total-ordered-item/"+item;
}

static GetVariationList(project){
    return this.BaseURL+"variation-list/"+project;
}

static GetVariationTotalAmount(project){
    return this.BaseURL+"variation-total-amount/"+project;
}



static PaymentTerms = this.BaseURL+"payment-terms";
static SaveProjectPayment=this.BaseURL+"save-project-payment"

static SaveVariation = this.BaseURL+"save-variation";
static UpdateVariation = this.BaseURL+"update-variation";
static UpdatePayment = this.BaseURL+"update-payment";

static CreateProjectOverview = this.BaseURL+"create-project-profile";
static UpdateRecords = this.BaseURL+"update-project-overview";
static UpdateNSI = this.BaseURL+"update-non-system-items";
static ADDNSI = this.BaseURL+"add-non-system-items";

static UpdateNSISD = this.BaseURL+"update-non-system-items-sd";
static UpdateNSIMS = this.BaseURL+"add-non-system-items-ms";


static UpdateNSISDIndividual = this.BaseURL+"update-non-system-items-sd-ind";



static GetNSISD(project){
    return this.BaseURL+"get-non-system-item-sd/"+project;
}

static GetNSIMS(project){
    return this.BaseURL+"get-non-system-item-ms/"+project;
}


static GetNSI(project){
    return this.BaseURL+"get-non-system-item/"+project;
}



static GetProjectPayments(project){
    return this.BaseURL+"get-project-payments/"+project;
}


static UpdateCorProfile = this.BaseURL+"store/update-cor-profile";

static GetProjectEvents(project){
    return this.BaseURL+"get-project-events/"+project;
}

static GetProjectCollection(project){
    return this.BaseURL+"get-project-collection/"+project;
}

static GetProjectRecievable(project){
    return this.BaseURL+"get-project-rec/"+project;
}

static GetProjectPayable(project){
    return this.BaseURL+"get-project-pay/"+project;
}


static UniqueProjectID(project){
    return this.BaseURL+"get-unique-project-id/"+project;
}





static GetProjectInvoices(project){
    return this.BaseURL+"get-project-inoices/"+project;
}


static UpdateProjectEvents = this.BaseURL+"update-project-events";
static EditProjectEvents = this.BaseURL+"edit-project-events";


static PaymentTypeall = this.BaseURL+"payment-type-all";

static AllParameters = this.BaseURL+"all-parameters";

static GetCertified(project){
    return this.BaseURL+"project-certified-payment/"+project;
}

static SaveCertifiedPayments = this.BaseURL+"save-certified-payment";

static GetCertifiedTotalAmount(project){
    return this.BaseURL+"get-certified-payment-total/"+project;
}


static GetApprovedCertifiedTotalAmount(project){
    return this.BaseURL+"get-approved-certified-payment-total/"+project;
}




static GetCertifiedEdit(id){
    return this.BaseURL+"get-certified-payment-edit/"+id;
}



static GetGlassType = this.BaseURL+"get-glass-type";

static UpdateProjectStatus = this.BaseURL+"update-project-status";

static GetTotalAttachment(project){
    return this.BaseURL+"get-attachments-list/"+project;
}

static AddProjectAttachments = this.BaseURL+"add-project-attachments";

static UpdateProjectCertified = this.BaseURL+"update-certified-amount";

static SearchEventByImpact = this.BaseURL+"event-search-by-impact";
static SearchEventByCAT = this.BaseURL+"event-search-by-cat";

static SearchEventByDate = this.BaseURL+"event-search-by-date";

static GetFinishingList = this.BaseURL+"get-finishing-list";


static DeleteEventLog(id){
    return this.BaseURL+"delete-event-log/"+id;
}


static DeleteAttachment(id){
    return this.BaseURL+"delete-attachment/"+id;
}


static ValidateStockList(stock_id,project){
    return this.BaseURL+"store/validate-stock-list/"+stock_id+"/"+project;
}


static GetTentativeGlassList(project){
    return this.BaseURL+"get-tentative-glass-list/"+project;
}

static GetGlassBookingShort(project){
    return this.BaseURL+"get-glass-booking-detail/"+project;
}



static GetTentativeGlassItem(glass){
    return this.BaseURL+"get-tentative-glass-item/"+glass;
}



static GetGlassTypeList = this.BaseURL+"get-tentative-glass-type";
static GetCuttingGlassListUnique = this.BaseURL+"get-cutting-glass-unique";


static GetTentativeGlassData(glass){
    return this.BaseURL+"get-single-tentative-glass-data/"+glass;
}


static SubmitTentativeGlass(glass){
    return this.BaseURL+"submit-tentative-glass/"+glass;
}


static SubmitCuttingGlass(glass){
    return this.BaseURL+"submit-cutting-glass/"+glass;
}

static DeleteCuttingGlass(glass){
    return this.BaseURL+"delete-cutting-glass-item/"+glass;
}

static DeleteTentativeGlass(glass){
    return this.BaseURL+"delete-tentative-glass-item/"+glass;
}

static GetGlassProcessorList = this.BaseURL+"get-glass-processor-list";
static SaveBoookingOrder = this.BaseURL+"save-booking-order";




static GetGlassBookingDetails(project){
    return this.BaseURL+"get-glass-booking/"+project;
}

static GetGlassSummaryDetails(project){
    return this.BaseURL+"get-glass-summary-details/"+project;
}


static POListDepthNoLimit = this.BaseURL+"po-list-limit-no-depth";


static GetGlassCutting(project){
    return this.BaseURL+"get-glass-cutting/"+project;
}

static SaveCuttingGlass = this.BaseURL+"save-cutting-glass-item";

static SaveTentativeGlassItem = this.BaseURL+"save-tentative-glass-item";



static GetCuttingGlassList(project){
    return this.BaseURL+"get-cutting-glass-item/"+project;
}


static GetCuttingGlassListPO(project){
    return this.BaseURL+"get-cutting-glass-item-po/"+project;
}


static GetCuttingGlassListPOInsert(project){
    return this.BaseURL+"get-cutting-glass-item-insert-po/"+project;
}



static GetCuttingGlassData(project){
    return this.BaseURL+"get-cutting-glass-data/"+project;
}


static AddPurchaseOrderGlassItem = this.BaseURL+"add-purchase-order-glass-item";

static TentativeGlassCreate = this.BaseURL+"create-tentative-glass";


static CuttingGlassCreate = this.BaseURL+"create-cutting-glass";

static GlasssPOItemRecieve = this.BaseURL+"glass-po-item-recieve";

static GlassDNINSupplier = this.BaseURL+"save-glass-supplier-item";


static GetGlassPO(project){
    return this.BaseURL+"glass-po-list/"+project;
}

static GlassPOItem(project){
    return this.BaseURL+"glass-po-item-list/"+project;
}

static GetGlassCuttingID(project){
    return this.BaseURL+"get-cutting-glass-id/"+project;
}

static GetGlassProjectSummary(project){
    return this.BaseURL+"get-project-glass-summary/"+project;
}
static CreateNewProject = this.BaseURL+"create-new-project";
static UpdateProject = this.BaseURL+"update-new-project";

static GetCities = this.BaseURL+"get-city-list";

static GetCustomerList = this.BaseURL+"get-customer-list";

static AddProjectBudget = this.BaseURL+"add-project-budget";


static GetAllInvoiceList = this.BaseURL+"get-all-invoice-status";

static InvoiceDraft = this.BaseURL+"add-invoice-draft";


static RemoveInvoiceDraft(inv){
    return this.BaseURL+"remove-invoice-from-draft/"+inv;
}
static GetAllInvoiceListR = this.BaseURL+"get-all-invoice-status-review";

static GetBudgetList(project){
    return this.BaseURL+"get-budget-list/"+project;
}


static GetBudgetListTwoFactor(project,account){
    return this.BaseURL+"get-budget-list-two-factor/"+project+"/"+account;
}

static DeleteBudget(project){
    return this.BaseURL+"delete-budget-list/"+project;
}
static RecieveInvoice(invoice){
    return this.BaseURL+"recieve-invoice/"+invoice;
}

static GetInvoiceData(invoice){
    return this.BaseURL+"get-invoice-data/"+invoice;
}

static ReviewInvoice(invoice){
    return this.BaseURL+"review-invoice/"+invoice;
}


static SubmitToApprove = this.BaseURL+"submit-for-approval";

static GetCertifiedPaymentsList = this.BaseURL+"get-certified-payments-list";



static UpdateDamage = this.BaseURL+"update-damage-items";


static UpdateCertifiedPayment(invoice,status){
    return this.BaseURL+"update-certified-payment-status/"+invoice+"/"+status;
}

static GetNonSystemDamageList(project){
    return this.BaseURL+"get-non-system-damage-list/"+project;
}

static GetNCRListRANItems(project){
    return this.BaseURL+"store/get-ncr-balance-ran/"+project;
}




static AddGMDamage = this.BaseURL+"add-glass-material-damage";
static GetNCRList = this.BaseURL+"store/ncr-list";
static UpdateNcrItem = this.BaseURL+"store/update-ncr-item";
static SaveNCR = this.BaseURL+"store/save-ncr";
static SaveNCRItems = this.BaseURL+"store/save-ncr-items";


static GetNCRItemList(ncr){
    return this.BaseURL+"store/get-ncr-items-list/"+ncr;
}

static GetNCRItemListByProject(project){
    return this.BaseURL+"store/ncr-item-list-by-project/"+project;
}


static GetNCRListByProject(project){
    return this.BaseURL+"store/ncr-list-by-project/"+project;
}
static ProjectCopy = this.BaseURL+"copy-project-phase";


}
export default AppURL