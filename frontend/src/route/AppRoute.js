import React, { Component, Fragment } from "react";
import { Route, Routes, Router, Switch } from "react-router";
import HomePage from "../Pages/HomePage";
import ItemIssuedEditPage from "../Pages/ItemIssuedEditPage";
import ItemPage from "../Pages/ItemPage";
import ManageItemIssuing from "../Pages/ManageItemIssuing";
import StockPage from "../Pages/StockPage";
import ProjectPage from "../Pages/ProjectPage";
import ProjectDetailPage from "../Pages/ProjectDetailPage";
import CreateMTOPage from "../Pages/CreateMTOPage";
import MTODetailPage from "../Pages/MTODetailPage";
import SubmittedMTO from "../Pages/SubmittedMTO";
import SubmittedMTODetail from "../Pages/SubmittedMTODetail";
import CartView from "../Pages/CartView";
import AvailableStock from "../Componenets/Stock/AvailableStock";
import OutOfStock from "../Componenets/Stock/OutOfStock";
import OrderPage from "../Pages/OrderPage";
import OrderDetailPage from "../Pages/OrderDetailPage";
import LoginPage from "../Pages/LoginPage";
import axios from "axios";
import AppURL from "../api/AppURL";
import NavMenu from "../Componenets/Common/NavMenu";
import DeliveryNote from "../Pages/DeliveryNote";
import IssueReservedStock from "../Pages/IssueReservedStock";
import DeliveryNoteDetail from "../Pages/DeliveryNoteDetail";
import RecieveItem from "../Pages/RecieveItem";
import RecieveItemDetail from "../Pages/RecieveItemDetail";
import Stripping from "../Pages/Stripping";
import STDetailPage from "../Pages/STDetailPage";
import ApprovedPurchaseRequest from "../Pages/ApprovedPurchaseRequest";
import MTOQtyAdjustment from "../Pages/MTOQtyAdjustment";
import AccStock from "../Componenets/Stock/AccStock";
import AvAccStock from "../Componenets/Stock/AvAccStock";
import IssuedReport from "../Pages/IssuedReport";
import AccountsSubmittedPO from "../Pages/AccountsSubmittedPO";
import AccountsApprovedPO from "../Pages/AccountsApprovedPO";
import MTOForPI from "../Pages/MTOForPI";
import MTOForPIDetails from "../Pages/MTOForPIDetails";
import ProjectMTOs from "../Pages/ProjectMTOs";
import MTOsForProject from "../Pages/MTOsForProject";
import RSS from "../Pages/RSS.jsx";
import ReportPage from "../Pages/ReportPage";
import ApprovedQuotationPurchaseRequest from "../Pages/ApprovedQuotationPurchaseRequest";
import ReturnIssueStock from "../Pages/ReturnIssueStock";
import SiteReserveIssue from "../Pages/SiteReserveIssue";
import SiteDNList from "../Pages/SiteDNList";
import SiteDNDetail from "../Pages/SiteDNDetail";
import AllMTOItems from "../Pages/AllMTOItems";
import AllMtoSiteIssue from "../Pages/AllMtoSiteIssue";
import SupplierInvoiceDetail from "../Pages/SupplierInvoiceDetail";
import CreatePR from "../Pages/CreatePR";
import EditPO from "../Pages/EditPO";
import TentativeGlass from "../Pages/TentativeGlass";
import CorVision from "../Pages/CorVision";
import CorVisionMain from "../Pages/CorVisionMain";
import CorProject from "../Pages/CorProject";
import FloorList from "../Componenets/CorVision/FloorList";
import Elevation from "../Componenets/CorVision/Elevation";
import CreateWindow from "../Componenets/CorVision/CreateWindow";
import FloorWindows from "../Componenets/CorVision/FloorWindows";
import SavedWindow from "../Componenets/CorVision/SavedWindow";
import WindowData from "../Componenets/CorVision/admin/CreateWindow";
import AddWindowData from "../Componenets/CorVision/admin/AddWindowData";
import Revoked from "../Pages/Revoked";
import StockList from "../Componenets/CorVision/StockList";
import ActiveProjects from "../Componenets/CorVision/Dashboard/ActiveProjects";
import ProjectDetails from "../Componenets/CorVision/Dashboard/ProjectDetails";
import RevokedList from "../Componenets/CorVision/Dashboard/RevokedList";
import StockListDetails from "../Componenets/CorVision/StockListDetails";
import SubmittedMTOAllItem from "../Pages/SubmittedMTOAllItem";
import MandatoryStock from "../Componenets/Stock/MandatoryStock";
import ProjectList from "../Pages/EprojectOverview/ProjectList";
import ProjectListByStatus from "../Pages/EprojectOverview/ProjectListByStatus";
import ProjectDetail from "../Pages/EprojectOverview/ProjectDetail";
import EditData from "../Pages/EprojectOverview/EditData";
import EditPayment from "../Pages/EprojectOverview/EditPayment";
import EditCuttingList from "../Componenets/CorVision/EditCuttinList";
import EventLog from "../Pages/EprojectOverview/EventLog";
import ProjectInvoices from "../Pages/EprojectOverview/ProjectInvoices";
import ProjectCollection from "../Pages/EprojectOverview/ProjectCollections";
import UpdateProjectStatus from "../Pages/EprojectOverview/UpdateProjectStatus";
import ProjectAttachments from "../Pages/EprojectOverview/ProjectAttachments";
import EditCertifiedPayment from "../Pages/EprojectOverview/EditCertifiedPayment";
import AccountsProjectDetails from "../Pages/EprojectOverview/AccountsProjectDetails";
import FinalSavedWindow from "../Componenets/CorVision/FinalSavedWindow";
import GlassCuttingList from "../Pages/GlassCuttingList"
import GlassReport from "../Pages/GlassReport.jsx";
import CreateCustomWindow from "../Componenets/CorVision/CreateCustomWindow.jsx";
import NewProject from "../Pages/Accounts/NewProject.jsx";
import ProjectAccountsHead from "../Pages/Estimate/ProjectAccountsHead.jsx";
import PoBudgetCheck from "../Pages/PoBudgetCheck.jsx";
import PayableInvoices from "../Pages/Accounts/RecableInvoices.jsx"
import NonSystemItems from "../Pages/EprojectOverview/NonSystemItems.jsx";
import NCR from "../Pages/NCR.jsx";
import NCRDetailspage from "../Pages/NCRDetailspage.jsx";
import ProjectDetailsDummy from "../Pages/EprojectOverview/ProjectDetailsDummy.jsx";
export class AppRoute extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      profile: {},
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.UserData)
      .then((responseU) => {
        axios
          .get(AppURL.UserProfile(responseU.data.id))
          .then((response) => {
            this.setUser(responseU.data);
            this.setProfile(response.data);
            sessionStorage.setItem("code", response.data.department);
            sessionStorage.setItem("misc", response.data.id);
            sessionStorage.setItem("external", response.data.externaluserID);
            
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUser = (user) => {
    this.setState({ user: user });
  };

  setProfile = (profile) => {
    this.setState({ profile: profile });
  };

  render() {
    //console.log(this.state.user.username);

    return (
      <Fragment>
        <NavMenu
          user={this.state.user}
          setUser={this.setUser}
          profile={this.state.profile}
          setProfile={this.setProfile}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage user={this.state.user} setUser={this.setUser} />}
          />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/item-detail" element={<ItemPage />} />
          <Route path="/manage-item" element={<ManageItemIssuing />} />
          <Route path="/issued-item-edit" element={<ItemIssuedEditPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/project-detail" element={<ProjectDetailPage />} />
          <Route path="/project-mto" element={<MTOsForProject />} />
          <Route path="/mto-detail" element={<MTODetailPage />} />
          <Route path="/dn-detail" element={<DeliveryNoteDetail />} />
          <Route
            path="/submitted-mto-detail"
            element={<SubmittedMTODetail />}
          />

          <Route
            path="/issue-reserve-stock"
            element={<IssueReservedStock />}
          />
          <Route path="/submitted-mto" element={<SubmittedMTO />} />
          <Route path="/cart-view" element={<CartView />} />
          <Route path="/available-stock" element={<AvailableStock />} />
          <Route path="/out-of-stock" element={<OutOfStock />} />
          <Route path="/purchase-request" element={<OrderPage />} />
          <Route path="/approved-purchase-request" element={<ApprovedPurchaseRequest />} />
          <Route path="/pr-detail" element={<OrderDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/delivery-note" element={<DeliveryNote />} />
          <Route path="/recieve-item" element={<RecieveItem />} />
          <Route path="/po-detail" element={<RecieveItemDetail />} />
          <Route path="/stripping" element={<Stripping />} />
          <Route path="/st-detail" element={<STDetailPage />} />
          <Route path="/mto-adjustments" element={<MTOQtyAdjustment />} />
          <Route path="/low-stock" element={<AccStock />} />
          <Route path="/available-acc-stock" element={<AvAccStock />} />
          <Route path="/issued-report" element={<IssuedReport />} />
          <Route path="/accounts-submitted-po" element={<AccountsSubmittedPO />} />
          <Route path="/accounts-approved-po" element={<AccountsApprovedPO />} />
          <Route path="/mto-for-pi" element={<MTOForPI />} />
          <Route path="/mto-for-pi-details" element={<MTOForPIDetails />} />
          <Route path="/project-mtos" element={<ProjectMTOs />} />
          <Route path="/revoke-reserved-item" element={<RSS />} />
          <Route path="/low-stock-report" element={<ReportPage />} />   
          <Route path="/return-issue-stock" element={<ReturnIssueStock />} />    
          <Route path="/approved-quotation-purchase-request" element={<ApprovedQuotationPurchaseRequest />} />    
          <Route path="/site-issue-item" element={<SiteReserveIssue />} />
          <Route path="/site-delivery-note" element={<SiteDNList />} />
          <Route path="/site-delivery-detail" element={<SiteDNDetail />} />
          <Route path="/all-mto-items" element={<AllMTOItems />} />
          <Route path="/all-mto-site-issue" element={<AllMtoSiteIssue />} />
          <Route path="/recieved-supplier-items" element={<SupplierInvoiceDetail />} />
          <Route path="/create-pr" element={<CreatePR />} />
          <Route path="/edit-po" element={<EditPO />} />
          <Route path="/cutting-detail" element={<CorVision/>} />
          <Route path="/cutting" element={<CorVisionMain/>} />
          <Route path="/cor-project" element={<CorProject/>} />
          <Route path="/project-floor" element={<FloorList/>} />
          <Route path="/project-elevation" element={<Elevation/>} />
          <Route path="/create-window" element={<CreateWindow/>} />
          <Route path="/create-custom-window" element={<CreateCustomWindow/>} />
          <Route path="/floor-windows" element={<FloorWindows/>} />
          <Route path="/window-detail" element={<SavedWindow/>} />
          <Route path="/final-window-detail" element={<FinalSavedWindow/>} />
          <Route path="/windows-data" element={<WindowData/>} />
          <Route path="/single-window-data" element={<AddWindowData/>} />
          <Route path="/borrowed-list" element={<Revoked/>} />
          <Route path="/project-revoke-list" element={<RevokedList/>} />
          <Route path="/stock-list" element={<StockList/>} />
          <Route path="/active-projects" element={<ActiveProjects/>} />
          <Route path="/project-details" element={<ProjectDetails/>} />
          <Route path="/stock-list-detail" element={<StockListDetails/>} />
          <Route path="/mto-all-items" element={<SubmittedMTOAllItem/>} />
          <Route path="/mandatory-stock-list" element={<MandatoryStock/>} />
          
          {/* External DataBase Project */}
          <Route path="/project-list" element={<ProjectList/>} />
          {/* <Route path="/project-list-by-status" element={ProjectListByStatus} /> */}
          <Route path="/project-list-by-status" element={<ProjectListByStatus/>} />
          <Route path="/single-project-details" element={<ProjectDetail/>} />
          <Route path="/single-project-details-dummy" element={<ProjectDetailsDummy/>} />

          <Route path="/edit-variation" element={<EditData/>} />

          <Route path="/edit-payment" element={<EditPayment/>} />
          
          <Route path="/edit-cutting-data" element={<EditCuttingList/>} />
                    
          <Route path="/project-event-log" element={<EventLog/>} />
          <Route path="/non-system-items" element={<NonSystemItems/>} />
          <Route path="/project-invoicing" element={<ProjectInvoices/>} />
          <Route path="/project-collection" element={<ProjectCollection/>} />

          <Route path="/project-status" element={<UpdateProjectStatus/>} /> 
          <Route path="/project-attachments" element={<ProjectAttachments/>} />          
          <Route path="/edit-certified-payment" element={<EditCertifiedPayment/>} />   
           
          <Route path="/project-accounts" element={<AccountsProjectDetails/>} />   
          
          <Route path="/tentative-glass-item-list" element={<TentativeGlass/>} />   
          <Route path="/glass-cutting-list-item" element={<GlassCuttingList/>} />
          <Route path="/project-glass-report" element={<GlassReport/>} />   
          <Route path="/new-project" element={<NewProject/>} /> 
          <Route path="/project-budget-accounts" element={<ProjectAccountsHead/>} />
          <Route path="/purchase-order-approval" element={<PoBudgetCheck/>} /> 

          <Route path="/payable-invoices" element={<PayableInvoices/>} />
          <Route path="/ncr" element={<NCR/>} />
          <Route path="ncr-details" element={<NCRDetailspage/>}/>
          
          
        </Routes>
      </Fragment>
    );
  }
}

export default AppRoute;
