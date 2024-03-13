import React, { Component, Fragment ,useEffect,useState,useReducer,useRef} from 'react'
import NavMenu from '../../Componenets/Common/NavMenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import AppURL from '../../api/AppURL';
import Modal from 'react-bootstrap/Modal';
import cogoToast from 'cogo-toast';
import Select from 'react-select'
//  components
import { redirect, useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import { Container,
  Card,

  Row,
  Col,
  Button,
} from 'react-bootstrap';
// core components


import {Link, useNavigate} from 'react-router-dom';
function ProjectDetails() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[divshow,setdivshow]=useState(false);
  const[variationform,setvariationform]=useState(false);
  const[singleProject,setsingleProject]=useState([]);
  const[variation,setvariation]=useState([]);
  const[manager,setmanager]=useState([]);
  const[paymentterms,setpaymentterms]=useState([]);
  const project_id=location.state.id;
  const main_id=location.state.mainid;
  const check_login=sessionStorage.getItem('login');
  const [loading,setLoading]=useState(true);
  const[parameters,setparameters]=useState([]);
  const[certifiedpayment,setCertifiedPayment]=useState([]);
  const[certifiedpaymenttotal,setCertifiedPaymentTotal]=useState([]);
  const[approvedcertifiedpaymenttotal,setApprovedCertifiedPaymentTotal]=useState([]);
  const status=sessionStorage.getItem('code');
  const[Recievable,setRecievable]=useState([]);
  const[payable,setpayable]=useState([]);
  const [rerender, setRerender] = useState(false);
  const[totalvari,settotalvari]=useState([]);
  const[nsi,setNSI]=useState([]);
  
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const [damageshow, setdamageshow] = useState(false);
  const [dirty, setDirty] = React.useState(false);
  const markFormDirty = () => setDirty(true);
  const [projectpayments, setProjectPayments] = useState(true);

  const [getsiteready, setsiteready] = useState(0);
  const [recatnlg, setrecatnlg] = useState(0);
  const [shutterfact, setshutterfact] = useState(0);
  const [glasssite, setglasssite] = useState(0);
  const[GETSDNON,setGETSDNON]=useState([]);
  const[GETNSIMS,setGETNSIMS]=useState([]);
  const[NCRItemByProject,setNCRItemByProject]=useState([]);
  const[NCRByProject,setNCRByProject]=useState([]);
  const[UniquePID,setUniqueProjectID]=useState([]);
  
  
  let pays=0
  let glasssheetbooking=0;
  let sdsubmission=0;
  let sdapproval=0;
  let sdprepration=0;
  let systemorderstatus=0;
  let mtotaking=0;
  let glassapproval=0;
  let frameapproval=0;
  let powderorder=0;
  let powdermto=0;
  let dpreprationstatus=0;
  let dsubmissionstatus=0;
  let handoverdocumentprep=0;
  let handoverdocumentsubm=0;
  let tocissuance=0;
  let siteready=0
  let sitemeasure=0
  let aorderrelease=0
  let glassorderrelease=0
  let glassorderreleasefactory=0
  let fabrications=0
  let installations=0
  let glassdeliverystatus=0
  let glassshutterstatus=0
  let certified_length=0
  let zerodefaultvalue=0

    pays=location.state.payreturn;
  let vars=0
     vars=location.state.varreturn;
  let scrollpage=0
  scrollpage=location.state.scrollpage;
  const [varshow, setvarshow] = useState(vars);
  const [paysshow, setpaysshow] = useState(pays);

  const[paymentdiv,setpaymentshow]=useState(false);

  const[certified,setcertified]=useState(false);
  const[transaction,settransaction]=useState(false);
  const[getglass,setgetglass]=useState([]);
  const[finishinglist,setfinishinglist]=useState([]);
  const[ncrdata,setncrdata]=useState([]);
  
  const[getdamagelist,SetDamageList]=useState([]);
  const[damageid,setdamageid]=useState(0);
  const[sdid,setsdid]=useState(0);
  const[nonsystemsd,setnonsystemsd]=useState(0);
  const[damageedit,setdamageedit]=useState(false);
  const[ncritemdetail,setncritemdetail]=useState(false);
  const[ncrid,setncrid]=useState(0);

  const[nonSystemid,setnonSystemid]=useState(0);
  const[nonSystemidStatus,setnonSystemidStatus]=useState(false);
  
  //let divRef=React.useRef(null)
  const divRef = React.useRef<HTMLDivElement>(null);
  useEffect(()=>{
     //bottomRef = React.useRef<HTMLDivElement>(null);
     
      if(!check_login){
          navigate('/login')
        }
        const getstockDetails = async()=>{
          try{

            const getNCRByProject = await axios.get(AppURL.GetNCRListByProject(main_id))
            setNCRByProject(getNCRByProject.data);
            //console.log(getNCRByProject.data)
             const response= await axios.get(AppURL.ESingleProjectOverView(main_id))
             setprojectsOverview(response.data);
            const issue_response = await axios.get(AppURL.ESingleProject(main_id))
            setsingleProject(issue_response.data);
      
            const projectmanager = await axios.get(AppURL.ExternalProjectManagerList)
            setmanager(projectmanager.data);
              
            const projectvariation = await axios.get(AppURL.GetVariationList(main_id))
            setvariation(projectvariation.data);
             
            
            const totalvariation = await axios.get(AppURL.GetVariationTotalAmount(main_id))
            settotalvari(totalvariation.data);
            
            //not done
            const payments = await axios.get(AppURL.GetProjectPayments(main_id))
            setProjectPayments(payments.data);
            
            const terms = await axios.get(AppURL.PaymentTerms)
            setpaymentterms(terms.data);
            // not done 
            const recieveable = await axios.get(AppURL.GetProjectRecievable(main_id))
            setRecievable(recieveable.data);
            // not done 
            const payable_amount = await axios.get(AppURL.GetProjectPayable(main_id))
            setpayable(payable_amount.data);
            
            const parameters = await axios.get(AppURL.AllParameters)
            setparameters(parameters.data);
            
            const cer = await axios.get(AppURL.GetCertified(main_id))
            setCertifiedPayment(cer.data);
  
            const certoal = await axios.get(AppURL.GetCertifiedTotalAmount(main_id))
            setCertifiedPaymentTotal(certoal.data);
            
            const approvedcertoal = await axios.get(AppURL.GetApprovedCertifiedTotalAmount(main_id))
            setApprovedCertifiedPaymentTotal(approvedcertoal.data);
            
            // const unique_project_id = await axios.get(AppURL.UniqueProjectID(project_id))
            // setUniqueProjectID(unique_project_id.data);
            

            const finish = await axios.get(AppURL.GetFinishingList)
            setfinishinglist(finish.data);   
            //done
            const NCR = await axios.get(AppURL.GetNCRListRANItems(main_id))
            setncrdata(NCR.data);   


            // if(ncrdata.Rat){
            //   console.log(ncrdata.Rat)
            //   setrecatnlg(ncrdata.Rat)
            // }
            // else{
            //   setrecatnlg(0)
            // }
            if(NCR.data){
              console.log(NCR.data)
              if(NCR.data.Rat){
                setrecatnlg(NCR.data.Rat)
              }
              else{
                setrecatnlg(0)
              }

              if(NCR.data.GSF){
                setshutterfact(NCR.data.GSF)
              }
              else{
                setshutterfact(0)
              }

              if(NCR.data.GTS){
                setglasssite(NCR.data.GTS)
              }
              else{
                setglasssite(0)
              }
            }
            const getNCRItemByProject = await axios.get(AppURL.GetNCRItemListByProject(main_id))
            setNCRItemByProject(getNCRItemByProject.data);

            //Need to Revise


            const getglass = await axios.get(AppURL.GetGlassType)
            setgetglass(getglass.data);
  
            // const damagelist = await axios.get(AppURL.GetNonSystemDamageList(project_id))
            // SetDamageList(damagelist.data);
            // if(damagelist.data.length>0){
            //   damagelist.data.map((damag,i)=>{
                
            //     if(damag.refrence=='Site Readiness'){
            //       setsiteready(damag.qty)
            //     }
            //    else if(damag.refrence=='Received at NLG'){
            //     setrecatnlg(damag.qty)
            //     }
            //     else if(damag.refrence=='Glass Shutter at Factory'){
            //       setshutterfact(damag.qty)
            //     }
            //     else if(damag.refrence=='Glass Delivery to Site'){
            //       setglasssite(damag.qty)
            //     }
            //   })  
            // }
            const getNonSystSD = await axios.get(AppURL.GetNSISD(main_id))
            setGETSDNON(getNonSystSD.data);

            const getNonSystMS = await axios.get(AppURL.GetNSIMS(main_id))
            setGETNSIMS(getNonSystMS.data);

            if(scrollpage=='1'){
          window.focus();
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: 'smooth',
                    });
                }
                // console.log(NCRItemByProject)
                // console.log(NCRByProject)
            setLoading(false);
          }catch(error){
              console.log(error);
          }
      }
      getstockDetails();
      
        if(status=='SI'){
          
        }
        else{
          window.addEventListener('popstate', (event) => {
                    //event.preventDefault();
              
                      cogoToast.error("You Can not use this button to go back, Please use designated button to go back ,your unsaved data will be Lost ...",{hideAfter:10});
                
                    
                      window.removeEventListener('popstate')
                });
              }
    
      },[ignored])


    
  // if(dirty){
  //   window.addEventListener("beforeunload", function (e) {
  //     var confirmationMessage = "\o/";
    
  //     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  //     return confirmationMessage;                            //Webkit, Safari, Chrome
      
  //   });  

  // }

  const GetNcrItems=(e,id)=>{
    setncrid(id)
    setncritemdetail(true)
    //alert(id)
  }
  
           
  const setNONID=(e,id)=>{
    e.preventDefault();
    setnonSystemid(id)
    setnonSystemidStatus(true)
  // const[nonSystemid,setnonSystemid]=useState(0);
  // const[nonSystemidStatus,setnonSystemidStatus]=useState(false);
  }

const savepayment=(e)=>{
  e.preventDefault();
const data={
  note:e.target.note.value,
  paymentpercentage:e.target.paymentpercentage.value,
  paymenttermid:e.target.paymenttermid.value,
  projectid:project_id,
  mainid:main_id,
}


  axios.post(AppURL.SaveProjectPayment,data,{ 
            
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===201){
      cogoToast.success('Project Payment Added Successfully...')
    
      //forceUpdate();
      e.target.reset()
  
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    forceUpdate();
 
  })


}



const savecertify=(e)=>{
  e.preventDefault();
const data={
  certificationid:e.target.certificationid.value,
  certifiedamount:e.target.certifiedamount.value,
  certificationdate:e.target.certificationdate.value,
  certificationremark:e.target.certificationremark.value,
  approvedcertifiedamount:e.target.approvedcertifiedamount.value,
  certificationapprovaldate:e.target.certificationapprovaldate.value,
  // accumulatedcertamount:e.target.accumulatedcertamount.value,
  // balance2certify:e.target.balance2certify.value,
  // oldcertifiedamount:e.target.oldcertifiedamount.value,
  mainid:main_id,
  projectid:project_id
}


  axios.post(AppURL.SaveCertifiedPayments,data,{ 
            
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===201){
      cogoToast.success('Certified Payment Added Successfully...')
    
      //forceUpdate();
      e.target.reset()
  
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    forceUpdate();
 
  })


}

function currencyFormat(num) {
 if(num==null){
  num=0
  return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
 else{
  return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
  
}


const UpdateDamageItems=(e,id)=>{
  setdamageid(id)
  setdamageedit(true)
}


const AddIndividualSD=(e,id)=>{
  e.preventDefault()
  // alert("Please Dont Update any Information in this section...")
  // alert(id)
  setsdid(id)
  setnonsystemsd(true)
}

const UpdateIndividualDamageItems=(e)=>{
  //setdamageedit(false)
  e.preventDefault()
  const data={
    qty:e.target.qty.value,
    replacement_status:e.target.replacement_status.value,
    order_date:e.target.order_date.value,
    recieved_status:e.target.recieved_status.value,
    id:e.target.id.value
  }

  axios.post(AppURL.UpdateDamage,data,{ 
          
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    setdamageshow(false);
    if(response.data['message']=='201'){

      //forceUpdate();
      // const damagelist = axios.get(AppURL.GetNonSystemDamageList(project_id))
      // SetDamageList(damagelist.data);
      setdamageedit(false)
      
      axios.get(AppURL.GetNonSystemDamageList(project_id)).then(damagelist=>{
        SetDamageList(damagelist.data)
          if(damagelist.data.length>0){
            damagelist.data.map((damag,i)=>{
              
              if(damag.refrence=='Site Readiness'){
                setsiteready(damag.qty)
              }
            else if(damag.refrence=='Received at NLG'){
              setrecatnlg(damag.qty)
              }
              else if(damag.refrence=='Glass Shutter at Factory'){
                setshutterfact(damag.qty)
              }
              else if(damag.refrence=='Glass Delivery to Site'){
                setglasssite(damag.qty)
              }
            })  
           // setdamageshow(true);
           window.location.reload();
          }
          //forceUpdate()
          
          cogoToast.success('Record Added Successfully...')
          
          
          
        })
        
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    //forceUpdate();
})
}
const goback=(e,status)=>{
  if(dirty){
    let result = window.confirm("You have unsaved changes, are you sure you want to leave this page ?")
    if (result == true) {
      e.preventDefault();
      navigate('/project-list-by-status',{state:{status:status}});
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    navigate('/project-list-by-status',{state:{status:status}});
  }
 
}

const mainpage=(e,status)=>{
  e.preventDefault();
    navigate('/project-list');
     
}

const homepage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}

const AdddamageItem=(e)=>{
  e.preventDefault();
  const data={
    project:project_id,
    type:e.target.type.value,
    refrence:e.target.refrence.value,
    reason:e.target.reason.value,
    qty:e.target.qty.value,
  
    replacement_status:e.target.replacement_status.value,
    order_date:e.target.order_date.value,
    recieved_status:e.target.recieved_status.value,
  }

  axios.post(AppURL.AddGMDamage,data,{ 
          
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.data['message']=='200'){
      cogoToast.success('Record Added Successfully...')
     
      forceUpdate();
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    forceUpdate();
})
}

const UpdateIndividualNSSD=(e)=>{
  e.preventDefault()
  const data={
    project:project_id,
    sd_status:e.target.sd_status.value,
    id:e.target.id.value,
    sd_start_date:e.target.sd_start_date.value,
    sd_type:e.target.sd_type.value,
    sd_end_date:e.target.sd_end_date.value,
    sd_submission_status:e.target.sd_submission_status.value,
    sd_approval_status:e.target.sd_approval_status.value,
    sd_revision:e.target.sd_revision.value,
    sd_approval_date:e.target.sd_approval_date.value,
    sd_desiginer:e.target.sd_desiginer.value,
  }
  
  axios.post(AppURL.UpdateNSISDIndividual,data,{ 
          
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===200){
      cogoToast.success('Record Update Successfully...')
     
      forceUpdate();
      
      setnonsystemsd(false)
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    forceUpdate();
})
}

const UpdateNonSystemMS=(e)=>{
  e.preventDefault();
  alert("Under maintenance")
 
  const data={
    project:project_id,
    ms_status:e.target.ms_status.value,
    ms_start_date:e.target.ms_start_date.value,
    ms_type:e.target.ms_type.value,
    ms_end_date:e.target.ms_end_date.value,
    ms_submission_status:e.target.ms_submission_status.value,
    ms_approval_status:e.target.ms_approval_status.value,
    ms_revision:e.target.ms_revision.value,
    ms_approval_date:e.target.ms_approval_date.value,
    ms_desiginer:e.target.ms_desiginer.value,
    mainid:main_id,
  }
  console.log(data)
  axios.post(AppURL.UpdateNSIMS,data,{ 
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===200){
      cogoToast.success('Record Added Successfully...')
     
      forceUpdate();
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    forceUpdate();
})


}
const UpdateNonSystemSD=(e)=>{
  e.preventDefault();

  const data={
    project:project_id,
    sd_status:e.target.sd_status.value,
    sd_start_date:e.target.sd_start_date.value,
    sd_type:e.target.sd_type.value,
    sd_end_date:e.target.sd_end_date.value,
    sd_submission_status:e.target.sd_submission_status.value,
    sd_approval_status:e.target.sd_approval_status.value,
    sd_revision:e.target.sd_revision.value,
    sd_approval_date:e.target.sd_approval_date.value,
    sd_desiginer:e.target.sd_desiginer.value,
    mainid:main_id,
  }

  axios.post(AppURL.UpdateNSISD,data,{ 
          
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===200){
      cogoToast.success('Record Added Successfully...')
     
      forceUpdate();
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    forceUpdate();
})
  
}

const AddNonSystem=(e)=>{
  e.preventDefault();
  const data={
    project:project_id,
    mto_taking:e.target.mto_taking.value,
    order_status:e.target.order_status.value,
    eta:e.target.eta.value,
    status:1,
    type:e.target.type.value,
    mainid:main_id,
  }
 
//   axios.post(AppURL.UpdateNSI,data,{ 
          
//     headers: {
//     "Content-Type": "application/json",
//     "Authorization": "Token "+sessionStorage.getItem("token"),
//   },}
//   ).then(response =>{  
//     if(response.status===200){
//       cogoToast.success('Record Updated Successfully...')
     
//       forceUpdate();
//     }
//     else{
//       cogoToast.error('Something Went Wrong...')
//     }
//     forceUpdate();
// })

axios.post(AppURL.ADDNSI,data,{ 
          
  headers: {
  "Content-Type": "application/json",
  "Authorization": "Token "+sessionStorage.getItem("token"),
},}
).then(response =>{  
  if(response.status===201){
    cogoToast.success('Record Added Successfully...')
   
    forceUpdate();
    setShow(false)
  }
  else{
    cogoToast.error('Something Went Wrong...')
  }
  forceUpdate();
})
}



const UpdateNonSystem=(e)=>{
  e.preventDefault();
  const data={
    id:e.target.non_id.value,
    mto_taking:e.target.mto_taking.value,
    order_status:e.target.order_status.value,
    eta:e.target.eta.value,
    status:1,
    type:e.target.type.value,
    
  }

  axios.post(AppURL.UpdateNSI,data,{ 
          
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===200){
      cogoToast.success('Record Updated Successfully...')
      forceUpdate();
      setnonSystemidStatus(false)
      setShow(false)
      
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    //forceUpdate();
})
}

const UpdateRecords = (e) => {
  e.preventDefault();
  const data={
    mainid:main_id,
    projectid:project_id,
    offer_approval_method:e.target.offer_approval_method.value,
    draft_contract_issuance:e.target.draft_contract_issuance.value,
    draft_contract_negotiation_status:e.target.draft_contract_negotiation_status.value,
    original_contract_receipt:e.target.original_contract_receipt.value,
    original_contract_signature_by_nlg:e.target.original_contract_signature_by_nlg.value,
    original_contract_countersigned_receipt:e.target.original_contract_countersigned_receipt.value,
    facadearea:e.target.facadearea.value,
    vat:e.target.vat.value,
    contractamount:parseInt(e.target.contractamount.value.replaceAll(',', '')),
    accumulated_offer_amount:parseInt(e.target.accumulated_offer_amount.value.replaceAll(',', '')),
    //accumulated_offer_amount:e.target.accumulated_offer_amount.value,
    ifc_drawings:e.target.ifc_drawings.value,
    structural_drawings:e.target.structural_drawings.value,
    architectural_drawings:e.target.architectural_drawings.value,
    id_drawings:e.target.id_drawings.value,
    remarks:e.target.remarks.value,
    sd_schedule_status:e.target.sd_schedule_status.value,
    sd_scheduled_startup_date:e.target.sd_scheduled_startup_date.value,
    sd_scheduled_endup_date:e.target.sd_scheduled_endup_date.value,
    sd_preparation_status:e.target.sd_preparation_status.value,
    sd_submission_status:e.target.sd_submission_status.value,
    sd_approval_status:e.target.sd_approval_status.value,
    latest_sd_revision:e.target.latest_sd_revision.value,
    sd_approval_date:e.target.sd_approval_date.value,
    glass_sample_preparation_status:e.target.glass_sample_preparation_status.value,
    frame_color_preparation_status:e.target.frame_color_preparation_status.value,
    material_submission_status:e.target.material_submission_status.value,
    glass_approval_status:e.target.glass_approval_status.value,
    approved_glass_type:e.target.approved_glass_type.value,
    frame_finishing_approval:e.target.frame_finishing_approval.value,
    approved_color:e.target.approved_color.value,
    approved_color2:e.target.approved_color2.value,
    approved_color3:e.target.approved_color3.value,
    glass_approval_date:e.target.glass_approval_date.value,
    color_approval_date:e.target.color_approval_date.value,
    mto_taking:e.target.mto_taking.value,
    alumunium_system_order_status:e.target.alumunium_system_order_status.value,
    aluminium_system_eta:e.target.aluminium_system_eta.value,
    glass_sheets_booking_status:e.target.glass_sheets_booking_status.value,
    glass_sheets_eta:e.target.glass_sheets_eta.value,
    powder_mto_taking:e.target.powder_mto_taking.value,
    powder_order_status:e.target.powder_order_status.value,
    glass_delivery_status:e.target.glass_delivery_status.value,
    powder_eta:e.target.powder_eta.value,
    glass_delivery_eta:e.target.glass_delivery_eta.value,
    
    site_readiness:e.target.site_readiness.value,
    site_measurements_status:e.target.site_measurements_status.value,
    aluminium_order_release_status:e.target.aluminium_order_release_status.value,
    glass_order_release_status:e.target.glass_order_release_status.value,
    fabrication_status:e.target.fabrication_status.value,
    installation_status:e.target.installation_status.value,

    as_built_drawings_preparation_status:e.target.as_built_drawings_preparation_status.value,
    as_built_drawings_submission_status:e.target.as_built_drawings_submission_status.value,
    as_built_drawings_submission_date:e.target.as_built_drawings_submission_date.value,
    handover_documents_preparation:e.target.handover_documents_preparation.value,
    handover_documents_submission_status:e.target.handover_documents_submission_status.value,
    handover_documents_submission_date:e.target.handover_documents_submission_date.value,
    snagging_desnags_esd:e.target.snagging_desnags_esd.value,
    snagging_desnags_efd:e.target.snagging_desnags_efd.value,
    toc_issuance_status:e.target.toc_issuance_status.value,
    toc_date:e.target.toc_date.value,
    site_ready_progress:e.target.site_ready_progress.value,
    site_measurement_progress:e.target.site_measurement_progress.value,
    aluminium_order_release_progress:e.target.aluminium_order_release_progress.value,
    glass_order_release_progress:e.target.glass_order_release_progress.value,
    fabrication_progress:e.target.fabrication_progress.value,
    installation_progress:e.target.installation_progress.value,
    glass_delivery_progress:e.target.glass_delivery_progress.value,


    site_ready_release:e.target.site_ready_release.value,
    site_measurement_release:e.target.site_measurement_release.value,
    glass_order_release:e.target.glass_order_release.value,
    alu_order_release:e.target.alu_order_release.value,
    fabrication_release:e.target.fabrication_release.value,
    installation_release:e.target.installation_release.value,
    glass_delivery_release:e.target.glass_delivery_release.value,
    designer:e.target.designer.value,
    GlassShutterToSite:e.target.GlassShutterToSite.value,
    GlassShutterToSiteTotal:e.target.GlassShutterToSiteTotal.value,
    GlassShutterToSiteRelease:e.target.GlassShutterToSiteRelease.value,


    SiteMeasureRejection:e.target.SiteMeasureRejection.value,
    AluOrderRejection:e.target.AluOrderRejection.value,
    GlassReleaseRejection:e.target.GlassReleaseRejection.value,
    FabricationRejection:e.target.FabricationRejection.value,
    InstallationRejection:e.target.InstallationRejection.value,
    TofactoryRejection:e.target.TofactoryRejection.value,
    GlassRecievedatNLG:e.target.GlassRecievedatNLG.value,
    ShuttertoSiteExecuted:e.target.ShuttertoSiteExecuted.value,
    GlasstoSiteLabel:e.target.GlasstoSiteLabel.value,
    ShuttertoFactLabel:e.target.ShuttertoFactLabel.value,

    GlassRelFactoryOpt:e.target.GlassRelFactoryOpt.value,
    GlassRelFactoryTotal:e.target.GlassRelFactoryTotal.value,
    GlassRelFactoryExecu:e.target.GlassRelFactoryExecu.value,
    GlassRelFactoryRej:e.target.GlassRelFactoryRej.value,

    installed_site:e.target.installed_site.value,
    balance_site:e.target.balance_site.value,
    install_factory:e.target.install_factory.value,
    balance_fact:e.target.balance_fact.value,
    related:e.target.related.value,
    sd_submission_date:e.target.sd_submission_date.value

  }

  axios.post(AppURL.UpdateRecords,data,{ 
          
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===201){
      cogoToast.success('Record Updated Successfully...')
      setDirty(false)
      window.location.reload();
    }
    else{
      cogoToast.error('Something Went Wrong...')
    }
    forceUpdate();
})
}
    const saveVariation=(e)=>{
      e.stopPropagation()
      e.preventDefault();
      const data={
        projectid:project_id,
        vonb:e.target.vonb.value,
        voamount:e.target.voamount.value,
        vodate:e.target.vodate.value,
        vodescription:e.target.vodescription.value,
        voapprovalstatus:e.target.voapprovalstatus.value,
        voapprovalform:e.target.voapprovalform.value,
        voapprovaldate:e.target.voapprovaldate.value,
        mainid:main_id,
      }
      
      
        axios.post(AppURL.SaveVariation,data,{
          
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}
        ).then(response =>{  
          if(response.status===201){
            cogoToast.success('Variation Added Successfully...')
            //window.location.reload(false);
            //forceUpdate();
            setLoading(true)
            getstockDetailsNew();
            forceUpdate();
            setvariationform(false)
            setdivshow(true)
            
            //e.target.reset();
            // axios.get(AppURL.GetVariationTotalAmount(project_id)).then(response=>{
            //   settotalvari(response.data);
            //   axios.get(AppURL.ESingleProjectOverView(project_id)).then(response=>{
            //     setprojectsOverview(response.data);
                
                
            //     })

            //   })
            //window.location.reload(false);

            // axios.get(AppURL.GetVariationTotalAmount(project_id)).then(varires=>{
            //   settotalvari(varires.data);
            //   console.log(totalvari)
             
                

            //   })
              
          }
          else{
            cogoToast.error('Something Went Wrong...')
          }
         
          setvariationform(false)
            setdivshow(true)
        
      })
      
      }
    const UpdateVariation=(e,varid,voamount,vodescription,voapprovalstatus,voapprovalform,voapprovaldate)=>{

      navigate('/edit-variation',{state:{mainid:main_id,project:project_id,vid:varid}})
   }

   const UpdatePayment=(e,paid)=>{

    navigate('/edit-payment',{state:{mainid:main_id,project:project_id,pa:paid}})
 }

 const ProjectLog=(e)=>{
  navigate('/project-event-log',{state:{project:project_id,mainid:main_id}})
}
 
const ProjectInvoicing=(e)=>{

  navigate('/project-invoicing',{state:{project:project_id,mainid:main_id}})
}
   
const ProjectCollection=(e)=>{

  navigate('/project-collection',{state:{project:project_id,mainid:main_id}})
}
const ProjectAttachments=(e)=>{

  navigate('/project-attachments',{state:{project:project_id,mainid:main_id}})
}

const ProjectGlassReport=(e)=>{

  navigate('/project-glass-report',{state:{project:project_id}})
}

const NonSystemItems=(e)=>{
  axios.get(AppURL.GetNSI(main_id)).then(NSIresponse=>{
    setNSI(NSIresponse.data)
    setShow(true);
        })
  
}


const DamageItems=(e)=>{
  // axios.get(AppURL.GetNSI(project_id)).then(NSIresponse=>{
  //   setNSI(NSIresponse.data)
  //   console.log(NSIresponse.data)
  setdamageshow(true);
       // })
  
}





      const showdiv=(e)=>{
        e.preventDefault();
        if(varshow){
          setvarshow(false)
          setcertified(false)
          settransaction(false)
        }
        else{
        if(divshow){
          
          setvariationform(false)   
          setpaysshow(false)
          setpaymentshow(false)
          setcertified(false)
          settransaction(false)
          setdivshow(false)
        }
        else{      
          setvariationform(false)   
          setpaysshow(false)
          setpaymentshow(false)
          settransaction(false)
          setcertified(false)
          setdivshow(true)  
        }
      }
      }  
    


      const showPaymentdiv=(e)=>{
        e.preventDefault();
        //setvarshow(false)
        if(paysshow){
          setpaysshow(false)
          setpaymentshow(false)
          // setdivshow(false)
          // setvariationform(false)
          setcertified(false)
          settransaction(false)
        }
        if(paymentdiv){
          setpaymentshow(false)
          setdivshow(false)
          setvariationform(false)
          settransaction(false)
          setpaysshow(false)
          setcertified(false)
        }
        else{
          
          setvariationform(false)
          setdivshow(false)
          setpaysshow(false)
          settransaction(false)
          setcertified(false)
          setpaymentshow(true)
        }
        
      }  
    

      

      const showCertifieddiv=(e)=>{
        e.preventDefault();
        //setvarshow(false)
        // if(paysshow){
        //   setpaysshow(false)
        //   setpaymentshow(false)
      
        //   setcertified(false)
        // }
        if(certified){
          setcertified(false)
          setpaymentshow(false)
          setdivshow(false)
          settransaction(false)
          setvariationform(false)
          setpaysshow(false)
        }
        else{
          
          setvariationform(false)
          setdivshow(false)
          setpaysshow(false)
          setpaymentshow(false)
          settransaction(false)
          setcertified(true)
        }
        
      }  

      

    const showtransationdiv=(e)=>{
        e.preventDefault();
        //setvarshow(false)
        // if(paysshow){
        //   setpaysshow(false)
        //   setpaymentshow(false)
      
        //   setcertified(false)
        // }
        if(transaction){
          setcertified(false)
          setpaymentshow(false)
          setdivshow(false)
          setvariationform(false)
          setpaysshow(false)
          settransaction(false)
        }
        else{
          
          setvariationform(false)
          setdivshow(false)
          setpaysshow(false)
          setpaymentshow(false)
          setcertified(false)
          settransaction(true)
        }
        
      }  
      
      const createProfile=(e)=>{
        e.preventDefault();
        let manager=0;
        let maini=0;
        singleProject.map((single,sr)=>{
          manager=single.projectmanagerid
          maini=single.mainid
        })

        const data={
          mainid:main_id,
          projectid:project_id,
          pmid:manager,
          contractamount:0,
        }
        
          axios.post(AppURL.CreateProjectOverview,data,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}
          ).then(response =>{  
            if(response.status===201){
              cogoToast.success('Project Profile Created Successfully...')
             
              //forceUpdate();
            }
            else{
              cogoToast.error('Something Went Wrong...')
            }
            forceUpdate();
        })
        

      } 

      
 

      const showVariationForm=(e)=>{
        e.preventDefault();
        
        if(variationform){
          setvariationform(false)
          setdivshow(false)
        }
        else{
          setdivshow(false)
          setvariationform(true)
        }
        
      } 

      
      const EditCertifiedForm=(e,id)=>{
        e.preventDefault();
        navigate('/edit-certified-payment',{state:{mainid:main_id,id:id,project_id:project_id}});
      } 

      const getstockDetailsNew = async()=>{
        try{
    
            
          const totalvariation = await axios.get(AppURL.GetVariationTotalAmount(main_id))
          settotalvari(totalvariation.data);
         
          setLoading(false);
    
        }catch(error){
            console.log(error);
        }
         //unit_short=item.unit['Short'];
    }

    //   const getstockDetails = async()=>{
    //     try{
    
    //        const response= await axios.get(AppURL.ESingleProjectOverView(project_id))
    //        setprojectsOverview(response.data);
    //       const issue_response = await axios.get(AppURL.ESingleProject(project_id))
    //       setsingleProject(issue_response.data);
    
    //       const projectmanager = await axios.get(AppURL.ExternalProjectManagerList)
    //       setmanager(projectmanager.data);
            
          
    //       const projectvariation = await axios.get(AppURL.GetVariationList(project_id))
    //       setvariation(projectvariation.data);
            
    //       const totalvariation = await axios.get(AppURL.GetVariationTotalAmount(project_id))
    //       settotalvari(totalvariation.data);
          
    //       const payments = await axios.get(AppURL.GetProjectPayments(project_id))
    //       setProjectPayments(payments.data);
          
    //       const terms = await axios.get(AppURL.PaymentTerms)
    //       setpaymentterms(terms.data);

    //       const recieveable = await axios.get(AppURL.GetProjectRecievable(project_id))
    //       setRecievable(recieveable.data);
          
    //       const payable_amount = await axios.get(AppURL.GetProjectPayable(project_id))
    //       setpayable(payable_amount.data);
          
    //       const parameters = await axios.get(AppURL.AllParameters)
    //       setparameters(parameters.data);
          
    //       const cer = await axios.get(AppURL.GetCertified(project_id))
    //       setCertifiedPayment(cer.data);

    //       const certoal = await axios.get(AppURL.GetCertifiedTotalAmount(project_id))
    //       setCertifiedPaymentTotal(certoal.data);
          
    //       const approvedcertoal = await axios.get(AppURL.GetApprovedCertifiedTotalAmount(project_id))
    //       setApprovedCertifiedPaymentTotal(approvedcertoal.data);
          
    //       const finish = await axios.get(AppURL.GetFinishingList)
    //       setfinishinglist(finish.data);   
    //       const getglass = await axios.get(AppURL.GetGlassType)
    //       setgetglass(getglass.data);

    //       const damagelist = await axios.get(AppURL.GetNonSystemDamageList(project_id))
    //       SetDamageList(damagelist.data);
    //       if(damagelist.data.length>0){
    //         damagelist.data.map((damag,i)=>{
              
    //           if(damag.refrence=='Site Readiness'){
    //             setsiteready(damag.qty)
    //           }
    //          else if(damag.refrence=='Received at NLG'){
    //           setrecatnlg(damag.qty)
    //           }
    //           else if(damag.refrence=='Glass Shutter at Factory'){
    //             setshutterfact(damag.qty)
    //           }
    //           else if(damag.refrence=='Glass Delivery to Site'){
    //             setglasssite(damag.qty)
    //           }
    //         })  
    //       }
    //       if(scrollpage=='1'){
    //     window.focus();
    //               window.scrollTo({
    //                 top: document.documentElement.scrollHeight,
    //                 behavior: 'smooth',
    //               });
    //           }
    //       setLoading(false);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    

        
        if(loading){
        return(
            <>Loading</>
            )
        }
        else if(projects.length=='0'){
          
     
            return(

              
              <div style={{textAlign:'center',marginTop:200}}>
                 <span className='form-inline'> <h4>Project Profile Not Found ! <button onClick={(e)=> createProfile(e)} className='btn btn-link'>Click here to Create</button></h4>or go back to 
                
                                &nbsp;<button className='btn btn-link'  onClick={(e)=> homepage(e)} > Homepage</button>
                                  
                 </span>

              </div>)
        } 
        else{
    
            return(
                
                singleProject.map((single,sr)=>{
                    //console.log(single)
                            // projects.map((scproject,sr)=>{
                 //setsingleProjectclone(scproject,srr)
                        return(
                            <Fragment>
                            <div className='container-fluid dashboard-background-color mt-2'>
                                 
                                 <div className="content ">
                                 <Row className=''>
                                  <Col md="3">
                                   <h3 className=''>Project Dashboard </h3>
                                   </Col>
                                   <Col md="9">
                                   <button onClick={(e)=> ProjectLog(e)}   className='btn btn-success'>Project Logs</button>&nbsp;&nbsp;
                                   <button onClick={(e)=> showPaymentdiv(e)}   className='btn btn-success '>Project Payments</button>&nbsp;&nbsp;
                                   <button onClick={(e)=> showdiv(e)} className='btn btn-success'>VO Details </button>&nbsp;&nbsp;

                                    <button onClick={(e)=> showCertifieddiv(e)}   className='btn btn-success'>Certified Payments</button>&nbsp;&nbsp;
                                    {/* <button onClick={(e)=> showtransationdiv(e)}   className='btn btn-success mt-3'>Transactions</button>&nbsp;&nbsp; */}
                                    <button onClick={(e)=> ProjectInvoicing(e)}   className='btn btn-success '>Invoices</button>&nbsp;&nbsp;

                                    <button onClick={(e)=> ProjectCollection(e)}   className='btn btn-success'>Collections</button>&nbsp;&nbsp;
                                    <button onClick={(e)=> ProjectAttachments(e)}   className='btn btn-success'>Attachments</button>&nbsp;&nbsp;
                                    <button  onClick={(e)=> ProjectGlassReport(e)} disabled  className='btn btn-success'>Glass</button>&nbsp;&nbsp;
                                    <button onClick={(e)=> NonSystemItems(e)}   className='btn btn-success'>Non System Items</button>&nbsp;&nbsp;
                                    <button onClick={(e)=> DamageItems(e)}   className='btn btn-success'>NCR's</button>&nbsp;&nbsp;
                                    <button className='btn btn-danger'  onClick={(e)=> goback(e,single.projectstatus)} ><i className='fa fa-arrow-left'></i> Go Back</button>&nbsp;&nbsp;
                                   <button className='btn btn-danger'  onClick={(e)=> mainpage(e,single.projectstatus)} ><i className='fa fa-arrow-left'></i> Homepage</button>&nbsp;&nbsp;
                                   </Col>
                                   </Row>
          
                                   {
                
                divshow || varshow?
                <div className='mt-3'>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>VO Number</th>
                        
                              <th>VO Amount (AED)</th>
                              <th>VO issuance Date</th>
                              <th>VO Approval Status</th>
                              <th>VO Approval Form</th>
                              <th>VO Approval Date</th>
                              <th>VO Description</th>
                              <th>Action</th>
                              {/* <th>Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
           {
                variation.map((vari,sr)=>{
                    return(

                          <tr>
                            <td>{vari.vonb}</td>
                            <td>
                            {currencyFormat(vari.voamount)}
                  
                            </td>
                            <td>
                           {vari.vodate}
                            </td>
                            
                            <td>
                            
                            { vari.voapprovalstatus
                              }
                           </td>
                            <td>
                           
                          
                              
                            { vari.voapprovalform
                              }

                            </td>
                            <td>
                            {vari.voapprovaldate}
                            </td>
                            <td>
                           {vari.vodescription}
                            </td>
                            <th><button className='btn btn-danger'  onClick={(e)=> UpdateVariation(e,vari.void,single.projectstatus)}>Edit</button></th>
                       
                          </tr>
                      )
                })
                }   
                  {/* <button className='btn btn-danger'  onClick={(e)=> UpdateVariation(e,vari.void,vari.voamount,vari.vodescription,vari.voapprovalstatus,vari.voapprovalform,vari.voapprovaldate)}>Edit</button> */}
                             
                                
                             <button className='btn btn-warning mt-3' onClick={(e)=> showVariationForm(e)}>Add New Variation</button>&nbsp;&nbsp;

                          </tbody>
                        </Table>
               </div>
               :null
              }
            

            {
                certified?
                <div className='mt-3'>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Certification Reference</th>
                              <th>Certified Amount</th>
                                <th>Certification Date</th>
                              <th>Certification Remarks</th>
                              <th>Approved Amount</th>
                              <th>Approval Date</th>
                              <th>Update</th>
                             
                            </tr>
                          </thead>
                          <tbody>
                               
            {
                certifiedpayment.map((vari,sr)=>{
                    return(  
                          <tr key={sr}>
                              <td>{vari.certificationid}</td>
                              <td>{vari.certifiedamount}</td>
                              <td>{vari.certificationdate}</td>
                              <td>{vari.certificationremark}</td>
                              <td>{vari.approvedcertifiedamount}</td>
                              <td>{vari.certificationapprovaldate}</td>
                              <td><button className='btn btn-danger' onClick={(e)=> EditCertifiedForm(e,vari.serialnb)}><i className='fa fa-pencil'></i></button></td>
                 
                          
                 
                            {/* <th><button className='btn btn-danger' onClick={(e)=> UpdatePayment(e,vari.serialnb)}>Edit</button></th> */}
                          
                          </tr>
                      )
                })
                }     
                          
                          </tbody>
                        </Table>
                  <Row>
                    
                   <form className='form-inline input-group' onSubmit={savecertify} id='payment' onChange={markFormDirty}>
                   <Col md="3">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Certification ID</strong></p> &nbsp;&nbsp;&nbsp;
                   
                  
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationid' defaultValue={'PC-'} ></input>

                     </span>    
                     </Form.Group>
                 
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Certification Remark</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationremark' ></input>
                     </span>    
                   </Form.Group>
                   {/* <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Accumulated Certified Amount</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='accumulatedcertamount' ></input>
                     </span>    
                   </Form.Group> */}
                   </Col>
                   <Col md="1"></Col>
                   <Col md="3">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Certified Amount</strong></p> &nbsp;&nbsp;&nbsp;
                   
                  
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='certifiedamount' required></input>
                     </span>    
                     </Form.Group>
                 
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Approved Certified Amount</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='approvedcertifiedamount' defaultValue={'0'}></input>
                     </span>    
                   </Form.Group>

                   {/* <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Balance to Certify</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='balance2certify' ></input>
                     </span>    
                   </Form.Group> */}
                   </Col>
                   <Col md="1"></Col>
                   <Col md="3">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Certification Date</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationdate' required></input>
                  
                     </span>    
                    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Certification Approve Date</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationapprovaldate' ></input>
                  
                     </span>    
                    
                     </Form.Group>
                     {/* <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Old Certified Amount</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='oldcertifiedamount' ></input>
                     </span>    
                   </Form.Group> */}
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                  <Button className='btn btn-success' type='submit' form='payment' style={{marginLeft:'10px'}}>Add Certified Amount</Button>
                     </span>    
                    
                     </Form.Group>
                     </Col>
                    

                      </form> 
                      </Row>
               </div>
               :null
              }



{
                transaction?
                <div className='mt-3'>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Tra Number</th>
                              <th>Payment Percentage</th>
                                <th>Note</th>
                              <th>Payment Term</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                               
            {
                projectpayments.map((vari,sr)=>{
                    return(  
                          <tr key={sr}>
                                               
                            <td>{vari.pptid}</td>
                            <td>{vari.paymentpercentage*100} %</td>
                            <td>{vari.note}</td>
                            
                            <td>{vari.paymenttermid['paymentterm']}</td>
                 
                            <th><button className='btn btn-danger' onClick={(e)=> UpdatePayment(e,vari.pptid)}>Edit</button></th>
                          
                          </tr>
                      )
                })
                }     
                          
                          </tbody>
                        </Table>
                  <Row>
                    
                   <form className='form-inline input-group' onSubmit={savepayment} id='payment' onChange={markFormDirty}>
                   <Col md="6">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Payment Term</strong></p> &nbsp;&nbsp;&nbsp;

                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='paymenttermid'  title='Offer'>
                       {
                        paymentterms.map((terms,sr)=>{
                          return(
                              <option value={terms.paytid}>{terms.paymentterm}</option>
                            )
                        })
                       }
                        <></>
                   </select>
                     </span>    
                     </Form.Group>
                 
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Payment Percentage</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='paymentpercentage' ></input>
                     </span>    
                   </Form.Group>
                   </Col>
                   <Col md="1"></Col>
                   <Col md="5">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Note</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <textarea cols={2} class="form-control" id="exampleFormControlInput1" placeholder="" name='note' ></textarea>
                  
                     </span>    
                    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                  <Button className='btn btn-success' type='submit' form='payment' style={{marginLeft:'50px'}}>Add Payment</Button>
                     </span>    
                    
                     </Form.Group>
                     </Col>
                    

                      </form> 
                      </Row>
               </div>
               :null
              }
{/* 
{
                transaction?
                <div className='mt-3'>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Tra Number</th>
                              <th>Payment Percentage</th>
                                <th>Note</th>
                              <th>Payment Term</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                               
            {
                projectpayments.map((vari,sr)=>{
                    return(  
                          <tr key={sr}>
                                               
                            <td>{vari.pptid}</td>
                            <td>{vari.paymentpercentage*100} %</td>
                            <td>{vari.note}</td>
                            
                            <td>{vari.paymenttermid['paymentterm']}</td>
                 
                            <th><button className='btn btn-danger' onClick={(e)=> UpdatePayment(e,vari.pptid)}>Edit</button></th>
                          
                          </tr>
                      )
                })
                }     
                          
                          </tbody>
                        </Table>
                  <Row>
                    
                   <form className='form-inline input-group' onSubmit={savepayment} id='payment' onChange={markFormDirty}>
                   <Col md="6">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Payment Term</strong></p> &nbsp;&nbsp;&nbsp;
                   
                  



                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='paymenttermid'  title='Offer'>
                       {
                        paymentterms.map((terms,sr)=>{
                          return(
                              <option value={terms.paytid}>{terms.paymentterm}</option>
                            )
                        })
                       }
                        <></>
                        
                   </select>
                     </span>    
                     </Form.Group>
                 
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Payment Percentage</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='paymentpercentage' ></input>
                     </span>    
                   </Form.Group>
                   </Col>
                   <Col md="1"></Col>
                   <Col md="5">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Note</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <textarea cols={2} class="form-control" id="exampleFormControlInput1" placeholder="" name='note' ></textarea>
                  
                     </span>    
                    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                  <Button className='btn btn-success' type='submit' form='payment' style={{marginLeft:'50px'}}>Add Payment</Button>
                     </span>    
                    
                     </Form.Group>
                     </Col>
                    

                      </form> 
                      </Row>
               </div>
               :null
              } */}



            {
                paymentdiv || paysshow?
                <div className='mt-3'>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Payment Number</th>
                              <th>Payment Percentage</th>
                                <th>Note</th>
                              <th>Payment Term</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                               
            {
                projectpayments.map((vari,sr)=>{
                    return(  
                          <tr key={sr}>
                                               
                            <td>{vari.pptid}</td>
                            <td>{vari.paymentpercentage*100} %</td>
                            <td>{vari.note}</td>
                            
                            <td>{vari.paymenttermid['paymentterm']}</td>
                 
                            <th><button className='btn btn-danger' onClick={(e)=> UpdatePayment(e,vari.pptid)}>Edit</button></th>
                          
                          </tr>
                      )
                })
                }     
                          
                          </tbody>
                        </Table>
                  <Row>
                    
                   <form className='form-inline input-group' onSubmit={savepayment} id='payment' onChange={markFormDirty}>
                   <Col md="6">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Payment Term</strong></p> &nbsp;&nbsp;&nbsp;
                   
                  



                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='paymenttermid'  title='Offer'>
                       {
                        paymentterms.map((terms,sr)=>{
                          return(
                              <option value={terms.paytid}>{terms.paymentterm}</option>
                            )
                        })
                       }
                        <></>
                        
                   </select>
                     </span>    
                     </Form.Group>
                 
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Payment Percentage</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='paymentpercentage' ></input>
                     </span>    
                   </Form.Group>
                   </Col>
                   <Col md="1"></Col>
                   <Col md="5">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Note</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <textarea cols={2} class="form-control" id="exampleFormControlInput1" placeholder="" name='note' ></textarea>
                  
                     </span>    
                    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                  <Button className='btn btn-success' type='submit' form='payment' style={{marginLeft:'50px'}}>Add Payment</Button>
                     </span>    
                    
                     </Form.Group>
                     </Col>
                    

                      </form> 
                      </Row>
               </div>
               :null
              }


            {
                variationform?
                <div className='mt-3'>
                  <hr></hr>
        <Row> 
        <form style={{display:'contents'}} onSubmit={saveVariation} id="form1" >
          <Col md="6 mb-2 mt-4" style={{padding:'inherit'}}>
           <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                  
                      <span className='form-inline input-group'>  
                    
                    <p><strong>VO No</strong></p> &nbsp;&nbsp;&nbsp;
                  
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Maximum 3 characters e.g 999" name='vonb' required></input>
                      
                      </span>    

                  </Form.Group> 

                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                  
                  <span className='form-inline input-group'>  
                
                <p><strong>VO Amount</strong></p> &nbsp;&nbsp;&nbsp;
              
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='voamount' required></input>
                  
                  </span>    

              </Form.Group> 

              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                  
                  <span className='form-inline input-group'>  
                
                <p><strong>VO Date</strong></p> &nbsp;&nbsp;&nbsp;
              
                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='vodate' required></input>
                  
                  </span>    

              </Form.Group> 

              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                  
                  <span className='form-inline input-group'>  
                
                <p><strong>Description</strong></p> &nbsp;&nbsp;&nbsp;
              
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" name='vodescription'></textarea>
                  
                  </span>    

              </Form.Group> 
                                 
                           </Col>

                      <Col md="6 mb-2 mt-4" style={{padding:'inherit'}}>

                        <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">

                        <span className='form-inline input-group'>  

                        <p><strong>Approval Status</strong></p> &nbsp;&nbsp;&nbsp;


                        <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='voapprovalstatus' title='Offer'>
                        <option></option>
                          <option value='Approved'>Approved</option>
                          <option value='Not approved'>Not approved</option>
                          <option value='Partially Approved'>Partially Approved</option>
                          <option value='Undecided'>Undecided</option>
                        </select>
                        </span>    

                        </Form.Group>


                        <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">

                        <span className='form-inline input-group'>  

                        <p><strong>Vo Approval Form</strong></p> &nbsp;&nbsp;&nbsp;


                        <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='voapprovalform' title='Offer'>
                        <option></option>
                          <option value='Via Email'>Via Email</option>
                          <option value='PO'>PO</option>
                          <option value='Revised Contract'>Revised Contract</option>
                    
                        </select>
                        </span>    

                        </Form.Group>

                        <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                  
                            <span className='form-inline input-group'>  
                          
                          <p><strong>VO Approval Date</strong></p> &nbsp;&nbsp;&nbsp;
                        
                          <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='voapprovaldate'></input>
                            
                            </span>    

                        </Form.Group> 
                      <span style={{display:'grid'}}><Button  type='submit' form="form1">Save</Button></span>
                        
                        </Col>
                        </form>
                                </Row>
                
               </div>
               :null
              }

{

  
    projects.map((scproject,sr)=>{
        return(
           
    <Row>
      <form  onSubmit={UpdateRecords} onChange={markFormDirty} id='main'>
    <Row  className='mt-2'>
         <Col md="5 mb-2">
           <Card>
             <>
               <Card.Title tag="h1" className='p-1'><u >Offer & Contract</u></Card.Title>
             </>
             <Card.Body style={{ padding:5 }}>
             <div className="legend">
             <Row>
              <Col md="6 mb-1">

              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   
                   <p>Project</p> &nbsp;&nbsp;&nbsp;
                   
 
                     <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='' disabled title='Offer'>
                  <option value="Via email" selected >{single.project_id} - {single.project_name}</option>
                   
 
                     </select>
 
                     </span>    
 
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   
                   <p>Manager</p> &nbsp;&nbsp;&nbsp;
                   
 
                     <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='' disabled title='Offer'>
                  
                  {
                                                    manager.map((man,sr)=>{
                                                      
                                                        if(man.projectmid==single.projectmanagerid){
                                                            return(
                                                                
                                                                <option value="Via email" selected >{man.pmname}</option>
                                                            )
                                                        }
                                                    })
                                                }

 
                     </select>
 
                     </span>    
 
                     </Form.Group>




                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Villa Refrence</p> &nbsp;&nbsp;&nbsp;
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='related'  defaultValue={scproject.related}></input>
                  
                     </span>    
                     
                     </Form.Group>
                   
             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                  <span className='form-inline input-group'>  
                  
                  <p>Offer Approval</p> &nbsp;&nbsp;&nbsp;
                  

                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='offer_approval_method' title='Offer'>
                      <option></option>
                      
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Offer Approval Method'){
                                          return(
                                            <>
                                            { scproject.offer_approval_method==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }

                    </select>

           </span>    

                    </Form.Group>

                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Draft Contract</p> &nbsp;&nbsp;&nbsp;
                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='draft_contract_issuance' title='Offer'>
                   <option></option>
            
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Draft Contract Issuance'){
                                          return(
                                            <>
                                            { scproject.draft_contract_issuance==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }

                    </select>
                     </span>    
                 
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
  
                     <p>Contract Negotiation</p> &nbsp;&nbsp;&nbsp;
              
                     <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='draft_contract_negotiation_status' title='Offer'>
                                  <option></option>

                                  
                                  {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='DraftContractnegotiationStatus'){
                                          return(
                                            <>
                                            { scproject.draft_contract_negotiation_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }
                              
                                  </select>
                         </span>    
 
                     </Form.Group>
 
                <Form.Group className="mb-4 form-inline" controlId="formBasicEmail">
                   
                  <span className='form-inline input-group'>  
 
                    <p>Original Contract</p> &nbsp;&nbsp;&nbsp;
 

                  
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='original_contract_receipt' title='Offer'>
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='OriginalContractReceipt'){
                                          return(
                                            <>
                                            { scproject.original_contract_receipt==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }
                    </select>
                      </span>    
                    </Form.Group>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   <span className='form-inline input-group'>  
                   <p>Contract signature-NLG</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='original_contract_signature_by_nlg' title='Offer'>
                    <option></option>


                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='OriginalContractsignaturebyNLG'){
                                          return(
                                            <>
                                            { scproject.original_contract_signature_by_nlg==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }


               
                    </select>
                     </span>    
 
                     </Form.Group>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>C-countersigned receipt</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='original_contract_countersigned_receipt' title='Offer'>
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='OriginalContractcountersignedreceipt'){
                                          return(
                                            <>
                                            { scproject.original_contract_countersigned_receipt==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }


                        </select>
                     </span>    
 
 
                     </Form.Group>
                     </Col>
                  


                     <Col md="6"
                        style={{
                          backgroundColor: '#e0eaf2',
                        }}
                        
                     >
                     <Form.Group className="mb-1 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
  
                     <p>Facade Area(SQM) & VAT</p> &nbsp;&nbsp;&nbsp;
                     <input type="text" class="form-control textbox-height" id="exampleFormControlInput1" placeholder="" name='facadearea' defaultValue={scproject.facadearea}></input>
                     <input type="text" class="form-control textbox-height" id="exampleFormControlInput1" placeholder="" name='vat' defaultValue={scproject.vat}></input>
                       
                       </span>    
 
                     </Form.Group>
 
                <Form.Group className="mb-1 form-inline" controlId="formBasicEmail">
                   
                <span className='form-inline input-group'>  
 
                  <p>Contract Amount(AED)</p> &nbsp;&nbsp;&nbsp;
                  <input type="text" class="form-control textbox-height" id="exampleFormControlInput1" placeholder="" name='contractamount' defaultValue={
                   currencyFormat(scproject.contractamount)}></input>
                    </span>   

                    </Form.Group>
               

                    <Form.Group className="mb-1 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Total VOs Amount</p> &nbsp;&nbsp;&nbsp;
           
                  <input type="text" class="form-control textbox-height" id="exampleFormControlInput1" placeholder="" defaultValue={currencyFormat(totalvari) } disabled name='TotalVOsAmount'></input>
                      
                     </span>    
 
 
                     </Form.Group>


                     
                    <Form.Group className="mb-1 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Accumulated Offer Amount(AED)</p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control textbox-height" id="exampleFormControlInput1" placeholder="" name='accumulated_offer_amount' disabled defaultValue={currencyFormat(totalvari+scproject.contractamount)}></input>
                     </span>    

                     </Form.Group>


                     <Form.Group className="mb-1 form-inline" controlId="formBasicEmail">
                  

                     <span className='form-inline input-group'>  
 
                    <p>Accumulated Offer Amount+VAT: </p> &nbsp;&nbsp; <strong>{currencyFormat((totalvari+scproject.contractamount)*scproject.vat)}</strong>&nbsp;&nbsp;&nbsp;
                    </span> 
                     </Form.Group>

                     <Form.Group className=" form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   {/* <p>Accumulated Certified Amount :</p>&nbsp;&nbsp; <strong>{currencyFormat((1.05*scproject.accumulatedcertamount))}</strong> &nbsp;&nbsp;&nbsp;
                    */}
                     </span>    
 
                     {
                     
                     (scproject.vat*scproject.accumulatedcertamount) > ((totalvari+scproject.contractamount)*scproject.vat)?
                       <p style={{color:'red'}}>Accumulated Certified Amount :&nbsp; <strong style={{color:'red'}}>{currencyFormat((scproject.vat*certifiedpaymenttotal))}</strong></p>
                
                     :
                     <p>Accumulated Certified Amount :&nbsp; <strong>{currencyFormat((scproject.vat*certifiedpaymenttotal))}</strong></p>
            
                     }
 
                     </Form.Group>

                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Balance Certified Approval: </p> &nbsp;&nbsp; <strong>{currencyFormat((certifiedpaymenttotal-approvedcertifiedpaymenttotal)*scproject.vat)}</strong>&nbsp;&nbsp;&nbsp;

                     </span>    
 
                     
                     </Form.Group>

                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 

                   <p>Balance to Certify: </p> &nbsp;&nbsp; <strong>{currencyFormat(((totalvari+scproject.contractamount)-certifiedpaymenttotal)*scproject.vat)}</strong>&nbsp;&nbsp;&nbsp;
                     </span>    
 
                     
                     </Form.Group>
                     
                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   {(scproject.accumulatedinvamount-Recievable) > (((totalvari+scproject.contractamount)*scproject.vat))?
                    
                   <><p  style={{color:'red'}}>Accumulated Invoice Amount:</p> &nbsp;&nbsp; <strong style={{color:'red'}}>{currencyFormat((scproject.accumulatedinvamount-Recievable)*scproject.vat)}</strong>&nbsp;&nbsp;&nbsp;</> 
                    
                   
                    :
                    
                    <>  <p>Accumulated Invoice Amount: </p> &nbsp;&nbsp; <strong>{currencyFormat((scproject.accumulatedinvamount-Recievable)*scproject.vat)}</strong>&nbsp;&nbsp;&nbsp;</>
                    
                   }
                    </span>    
 
 
                     </Form.Group>

                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   
                   {/* scproject.balance2invoice */}
                   <p>Balance to Invoice:</p> &nbsp;&nbsp; <strong>{currencyFormat(((totalvari+scproject.contractamount)-(scproject.accumulatedinvamount-Recievable))*scproject.vat)}</strong>&nbsp;&nbsp;&nbsp;
                   </span>    
 
 
                     </Form.Group>

                     
                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Accumulated Collected Amount: </p> &nbsp;&nbsp; <strong>{currencyFormat(scproject.accumulatedcollectedamount)}</strong>&nbsp;&nbsp;&nbsp;
                   </span>    
 
                     </Form.Group>

                     
                     <Form.Group className=" form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   {/* (scproject.balance2collect) */}
                   <p>Balance to Collect: </p> &nbsp;&nbsp; <strong>{currencyFormat(((totalvari+scproject.contractamount)*scproject.vat)-scproject.accumulatedcollectedamount)}</strong>&nbsp;&nbsp;&nbsp;
                   </span>    
 
 
                     </Form.Group>

              
                     </Col>
             </Row>
  
               </div>
             </Card.Body>
            
           </Card>
         </Col>

         

         <Col md="2 mb-2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>IFC Drawings</u></Card.Title>
             </>
             <Card.Body style={{padding:5}}>


             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
                 
                   <p>Architectural</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='architectural_drawings' title='Offer'>
                    <option></option>
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Architectural Drawings'){
                                          return(
                                            <>
                                            { scproject.architectural_drawings==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }

               
                        </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Structural</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='structural_drawings' title='Offer'>
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Structural Drawings'){
                                          return(
                                            <>
                                            { scproject.structural_drawings==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }

                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>ID</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='id_drawings' title='Offer'>
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='ID Drawings'){
                                          return(
                                            <>
                                            { scproject.id_drawings==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }

                        </select>
                     </span>    
                     </Form.Group>
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>RCP</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='ifc_drawings' title='Offer'>
                    <option></option>

                    
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='IFC Drawings'){
                                          return(
                                            <>
                                            { scproject.ifc_drawings==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                                    }


                        </select>
                     </span>    
                     </Form.Group>
             </Card.Body>
            

            
           </Card>
            <Card className='mt-3'>
              <Card.Body>
              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">  
              <p><strong>Remarks </strong></p>             
                 
                   <span className='form-inline input-group'>  
                   
                 <textarea cols={6} rows="4" class="form-control" id="exampleFormControlTextarea1" name='remarks'>{scproject.remarks}</textarea>
                     </span>    
                     </Form.Group>
              </Card.Body>
            </Card>
        
         </Col>




         <Col md="3 mb-2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Shop Drawings</u></Card.Title>
             </>
             <Card.Body style={{padding:13}}>


                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Status</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_schedule_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='SD Schedule Status'){
                                          return(
                                            <>
                                            { scproject.sd_schedule_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                 
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Start Date</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_scheduled_startup_date' defaultValue={scproject.sd_scheduled_startup_date}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>End Date</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_scheduled_endup_date' defaultValue={scproject.sd_scheduled_endup_date}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Preparation</p> &nbsp;&nbsp;&nbsp;

               

                    <select  class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_preparation_status' title='Offer'>
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='SD Preparation Status'){
                                          return(
                                            <>
                                            { scproject.sd_preparation_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                        </select>
                     </span>    
                     </Form.Group>
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
                     
                     
                   <p>Submission</p> &nbsp;&nbsp;&nbsp;

                   <select  class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_submission_status' title='Offer'>
                   <option></option>

                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='SD Submission Status'){
                                          return(
                                            <>
                                            { scproject.sd_submission_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                        </select>
                      &nbsp; Date: &nbsp; <input type="date" class="form-control" id="exampleFormControlInput1"  placeholder="" name='sd_submission_date' defaultValue={scproject.sd_submission_date}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Approval</p> &nbsp;&nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='SD Approval Status'){
                                          if(scproject.sd_approval_status==parameter.paravalue){
                                            sdapproval=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }

                   <select class="form-select form-select-sm" style={{backgroundColor:sdapproval}} aria-label=".form-select-sm example" name='sd_approval_status' title='Offer'>
                    <option></option>
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='SD Approval Status'){
                                          return(
                                            <>
                                            { scproject.sd_approval_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                        </select>
                        &nbsp; Date: &nbsp; <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_approval_date' defaultValue={scproject.sd_approval_date}></input>
                  
                     </span>    
                     
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Revision</p> &nbsp;&nbsp;&nbsp;
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='latest_sd_revision' defaultValue={scproject.latest_sd_revision}></input>
                  
                     </span>    
                     </Form.Group>

                     {/* <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Approval Date</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_approval_date' defaultValue={scproject.sd_approval_date}></input>
                  
                     </span>    
                     
                     </Form.Group> */}

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Designer</p> &nbsp;&nbsp;&nbsp;
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='designer' defaultValue={scproject.designer}></input>
                  
                     </span>    
                     
                     </Form.Group>
             </Card.Body>
            
           </Card>
         </Col>



  

         <Col md="2 mb-2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Material Submittal</u></Card.Title>
             </>
             <Card.Body style={{padding:5}}>


                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Glass Sample</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_sample_preparation_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Sample Preparation Status'){
                                          return(
                                            <>
                                            { scproject.glass_sample_preparation_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Frame color</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='frame_color_preparation_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Frame color Preparation Status'){
                                          return(
                                            <>
                                            { scproject.frame_color_preparation_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Material Submission</p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='material_submission_status' >
                    <option></option>
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Material Submission Status'){
                                          return(
                                            <>
                                            { scproject.material_submission_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                 </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Glass Approval</p> &nbsp;&nbsp;&nbsp;

                   {
                                      parameters.map((parameter,i)=>{
                                          if(parameter.paracontrol=='Glass Approval Status'){
                                          if(scproject.glass_approval_status==parameter.paravalue){
                                            glassapproval=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:glassapproval}}  class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_approval_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Approval Status'){
                                          return(
                                            <>
                                            { scproject.glass_approval_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                        </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Approved Glass</p> &nbsp;&nbsp;&nbsp;
                   {/* <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='approved_glass_type' defaultValue={scproject.approved_glass_type}></input>
                   */}
                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='approved_glass_type' title='Offer'>
                                  <option></option>

                                  
                                  {
                                      getglass.map((parameter,i)=>{
                                          return(
                                            <>
                                            { scproject.approved_glass_type==parameter.glasstype ? 
                                              <option value={parameter.glasstype} selected >{parameter.glasstype}-MM</option>
                                            : 
                                              <option value={parameter.glasstype}>{parameter.glasstype}-MM</option>
                                            }
                                          </>
                                          )
                                        
                                      })
                                    }
                              
                                  </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
                                        
                   <p>Frame Finishing</p> &nbsp;&nbsp;&nbsp;

                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Frame Finishing Approval'){
                                          if(scproject.frame_finishing_approval==parameter.paravalue){
                                            frameapproval=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select  

                          style={{backgroundColor:frameapproval}}
                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='frame_finishing_approval' >
                    <option ></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Frame Finishing Approval'){
                                          return(
                                            <>
                                            { scproject.frame_finishing_approval==parameter.paravalue ? 
                                              
                                              <option style={{color:'red'}}  value={parameter.paravalue} selected
                                              
                                              >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>AC</p> &nbsp;&nbsp;&nbsp;
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='approved_color' defaultValue={scproject.approved_color}></input>
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='approved_color2' defaultValue={scproject.approved_color2}></input>
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='approved_color3' defaultValue={scproject.approved_color3}></input>
{/*                                   
                   <select 
                      class="form-select form-select-sm" aria-label=".form-select-sm example" name='approved_color' >
                      <option ></option>

                      {
                                  finishinglist.map((parameter,i)=>{
                                      return(
                                        <>
                                        { scproject.approved_color==parameter.finishdescription ? 
                                          
                                          <option value={parameter.finishdescription} selected
                                       
                                          >{parameter.finishdescription}</option>
                                        : 
                                          <option value={parameter.finishdescription}>{parameter.finishdescription}</option>
                                        }
                                      </>
                                      )
                                    
                                  })
                      }

                      </select>

                   <select  
                      class="form-select form-select-sm" aria-label=".form-select-sm example" name='approved_color2' >
                      <option ></option>

                      {
                                  finishinglist.map((parameter,i)=>{
                                      return(
                                        <>
                                        { scproject.approved_color2==parameter.finishdescription ? 
                                          
                                          <option value={parameter.finishdescription} selected
                                          
                                          >{parameter.finishdescription}</option>
                                        : 
                                          <option value={parameter.finishdescription}>{parameter.finishdescription}</option>
                                        }
                                      </>
                                      )
                                    
                                  })
                      }

                      </select>

                      <select  
                      class="form-select form-select-sm" aria-label=".form-select-sm example" name='approved_color3' >
                      <option ></option>

                      {
                                  finishinglist.map((parameter,i)=>{
                                      return(
                                        <>
                                        { scproject.approved_color3==parameter.finishdescription ? 
                                          
                                          <option value={parameter.finishdescription} selected
                                          
                                          >{parameter.finishdescription}</option>
                                        : 
                                          <option value={parameter.finishdescription}>{parameter.finishdescription}</option>
                                        }
                                      </>
                                      )
                                    
                                  })
                      }

                      </select> */}
                 </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Glass Approval Date</p> &nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='glass_approval_date' defaultValue={scproject.glass_approval_date}></input>
                  
                     </span>    
                     </Form.Group>


                     
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Color Approval Date</p> &nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='color_approval_date' defaultValue={scproject.color_approval_date}></input>
                  
                     </span>    
                     </Form.Group>


             </Card.Body>
            
           </Card>
         </Col>


         
         <Col md="2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Procurement</u></Card.Title>
             </>
             <Card.Body style={{padding:7}}>
                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
                  
                  
                   <p>MTO Taking</p> &nbsp;&nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='MTO Taking'){
                                          if(scproject.mto_taking==parameter.paravalue){
                                            mtotaking=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select  

                          style={{backgroundColor:mtotaking}}
                         class="form-select form-select-sm" aria-label=".form-select-sm example" name='mto_taking' >
                      <option></option>
                      {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='MTO Taking'){
                                          return(
                                            <>
                                            { scproject.mto_taking==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                 
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
                   <p>Alum Order</p> &nbsp;&nbsp;&nbsp;

                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Aluminium Order Status'){
                                          if(scproject.alumunium_system_order_status==parameter.paravalue){
                                            systemorderstatus=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select  

                          style={{backgroundColor:systemorderstatus}}
                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='alumunium_system_order_status' >
                      <option></option>

                      {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Aluminium Order Status'){
                                          return(
                                            <>
                                            { scproject.alumunium_system_order_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                 
                        </select>
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Alum System ETA</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='aluminium_system_eta' defaultValue={scproject.aluminium_system_eta}></input>
                  
                     </span>    
                     </Form.Group>
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Glass booking</p> &nbsp;&nbsp;&nbsp;


                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass booking Status'){
                                          if(scproject.glass_sheets_booking_status==parameter.paravalue){
                                            glasssheetbooking=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select  

                          style={{backgroundColor:glasssheetbooking}}

                           class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_sheets_booking_status' >
                   <option></option>

                   
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass booking Status'){
                                          return(
                                            <>
                                            { scproject.glass_sheets_booking_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                 
                 
                        </select>
                     </span>    
                     </Form.Group>




                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Glass Sheet ETA</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='glass_sheets_eta' defaultValue={scproject.glass_sheets_eta}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Powder MTO</p> &nbsp;&nbsp;&nbsp;

                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Powder MTO Taking'){
                                          if(scproject.powder_mto_taking==parameter.paravalue){
                                            powdermto=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }

                    <select style={{backgroundColor:powdermto}}  class="form-select form-select-sm" aria-label=".form-select-sm example" name='powder_mto_taking' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Powder MTO Taking'){
                                          return(
                                            <>
                                            { scproject.powder_mto_taking==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }


                 
                        </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Powder Order</p> &nbsp;&nbsp;&nbsp;
                   
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Powder Order Status'){
                                          if(scproject.powder_order_status==parameter.paravalue){
                                            powderorder=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select style={{backgroundColor:powderorder}} class="form-select form-select-sm" aria-label=".form-select-sm example" name='powder_order_status' >
                    <option></option>

                    
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Powder Order Status'){
                                          return(
                                            <>
                                            { scproject.powder_order_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                                    
                        </select>
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Powder ETA</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='powder_eta' defaultValue={scproject.powder_eta}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>GD ETA</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1"  placeholder="" name='glass_delivery_eta' defaultValue={scproject.glass_delivery_eta}></input>
                  
                     </span>    
                     </Form.Group>
             </Card.Body>
            
           </Card>
         </Col>



         <Col md="6">
   
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Design Fabrication & Installation</u></Card.Title>
             </>
            <Table>
              <thead>
              <tr><th style={{width:'12%'}}>Title</th>
              <th style={{width:'38%'}}>Status</th>
              <th style={{width:'10%'}}>Total</th>
              <th style={{width:'10%'}}>Executed</th>
              <th style={{width:'10%'}}>Balance</th>
              <th>Rejected</th>
              <th>Total Balance</th>
              </tr>
              </thead>
            </Table>
             <Card.Body style={{}}>
             {/* <Table>
                        <thead>
                    
                            <th>A</th><th>B</th>
                            <th colSpan={4}>Total</th>
                  
                         
                        </thead>
                        <tbody>
                          <tr>
                          <td>Total</td>
                          </tr>
                        </tbody>
                      </Table> */}
                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Site Readiness</p> &nbsp;&nbsp;&nbsp;

                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Site Readiness'){
                                          if(scproject.site_readiness==parameter.paravalue){
                                            siteready=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:siteready}} class="form-select form-select-sm drop-menu-width" aria-label=".form-select-sm example" name='site_readiness' >
                    <option></option>

                            
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Site Readiness'){
                                          return(
                                            <>
                                            { scproject.site_readiness==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                
                        </select>&nbsp;
            
                    <input type="text" onhov  class="short-text-box" id="exampleFormControlInput1" placeholder="Total" name='site_ready_progress' defaultValue={
                   scproject.site_ready_progress}></input>
                     <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released" name='site_ready_release' defaultValue={
                   scproject.site_ready_release}></input>
                   
                     <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' defaultValue={
                  parseInt(scproject.site_ready_progress-scproject.site_ready_release) }></input>

                  <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                  parseInt(getsiteready) }></input>

                  <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                  parseInt((scproject.site_ready_progress-scproject.site_ready_release)+parseInt(getsiteready))}></input>
                     </span>    
                     
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Site Measure</p> &nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Site Measurements Status'){
                                          if(scproject.site_measurements_status==parameter.paravalue){
                                            sitemeasure=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:sitemeasure}} 
                     class="form-select form-select-sm drop-menu-width" aria-label=".form-select-sm example" name='site_measurements_status' >
                    <option></option>
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Site Measurements Status'){
                                          return(
                                            <>
                                            { scproject.site_measurements_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                        </select>
                        &nbsp;
                        <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="Total" readOnly name='site_measurement_progress' defaultValue={
                   scproject.site_ready_release}></input>
                       <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="Released"  name='site_measurement_release' defaultValue={
                   scproject.site_measurement_release}></input>
                       <input type="text" class="short-text-box" id="exampleFormControlInput1" readonly placeholder="000/000"  name='' defaultValue={
                   parseInt(scproject.site_ready_release-scproject.site_measurement_release)}></input>
                    
                   <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='SiteMeasureRejection' defaultValue={scproject.SiteMeasureRejection==null ? zerodefaultvalue :scproject.SiteMeasureRejection} ></input>
                    
                  <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled  defaultValue={
                  parseInt((scproject.site_ready_progress-scproject.site_ready_release)+parseInt(getsiteready))+parseInt(scproject.site_ready_release-scproject.site_measurement_release)+parseInt(scproject.SiteMeasureRejection==null ? zerodefaultvalue :scproject.SiteMeasureRejection)
                  //parseInt((scproject.site_ready_progress-scproject.site_ready_release)+parseInt(getsiteready)+(scproject.site_ready_release-scproject.site_measurement_release)+(scproject.SiteMeasureRejectionteready==null? zerodefaultvalue :parseInt(scproject.SiteMeasureRejectionteready)))
                  }></input>
                     </span>    
                     </Form.Group>
                     <Form.Group className="mb-3 form-inline " controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Alu orders</p> &nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Aluminium orders release Status'){
                                          if(scproject.aluminium_order_release_status==parameter.paravalue){
                                            aorderrelease=parameter.paracolor
                                          }                                  
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:aorderrelease}} class="form-select form-select-sm drop-menu-width" aria-label=".form-select-sm example" name='aluminium_order_release_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Aluminium orders release Status'){
                                          return(
                                            <>
                                            { scproject.aluminium_order_release_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                        </select>
                        &nbsp;
                        <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total" name='aluminium_order_release_progress' defaultValue={
                   scproject.site_measurement_release}></input>
                   <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released" name='alu_order_release' defaultValue={
                   scproject.alu_order_release}></input>
                   <input disabled type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" name='' defaultValue={
                   parseInt(scproject.site_measurement_release-scproject.alu_order_release)}></input>

                    <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='AluOrderRejection' defaultValue={scproject.AluOrderRejection==null ? zerodefaultvalue :scproject.AluOrderRejection}></input>
                    <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                       parseInt((scproject.site_ready_progress-scproject.site_ready_release)+parseInt(getsiteready))+parseInt(scproject.site_measurement_release-scproject.alu_order_release)+parseInt(scproject.AluOrderRejection==null ? zerodefaultvalue :scproject.AluOrderRejection)}
                       //+ parseInt(scproject.site_measurement_release-scproject.alu_order_release)+(scproject.SiteMeasureRejectionteready==null? zerodefaultvalue :parseInt(scproject.SiteMeasureRejectionteready))+parseInt((scproject.site_measurement_release-scproject.alu_order_release)+(scproject.AluOrderRejection==null ? zerodefaultvalue :scproject.AluOrderRejection)))
                    ></input>                    
                      </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Glass Released-site</p> &nbsp;&nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Order release Status'){
                                          if(scproject.glass_order_release_status==parameter.paravalue){
                                            glassorderrelease=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:glassorderrelease}}  class="form-select form-select-sm drop-menu-width" aria-label=".form-select-sm example" name='glass_order_release_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Order release Status'){
                                          return(
                                            <>
                                            { scproject.glass_order_release_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                 
                                    
                        </select>
                        &nbsp;
                        <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total" name='glass_order_release_progress' defaultValue={
                   scproject.glass_order_release_progress}></input>
                            <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released" name='glass_order_release' defaultValue={
                   scproject.glass_order_release}></input>
                            <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" name='' defaultValue={
                   parseInt(scproject.glass_order_release_progress-scproject.glass_order_release)}></input>

                        <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='GlassReleaseRejection' defaultValue={scproject.GlassReleaseRejection==null ? zerodefaultvalue :scproject.GlassReleaseRejection}></input>
                    <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                       parseInt((scproject.glass_order_release_progress-scproject.glass_order_release))}
                      //  +(scproject.GlassReleaseRejection==null? zerodefaultvalue :parseInt(scproject.GlassReleaseRejection))
                    ></input>    
                     </span>    
                     </Form.Group>



                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Glass Released-Fact</p> &nbsp;&nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Order release Status'){
                                          if(scproject.glass_order_release_status==parameter.paravalue){
                                            glassorderreleasefactory=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:glassorderreleasefactory}}  class="form-select form-select-sm" aria-label=".form-select-sm example" name='GlassRelFactoryOpt' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Order release Status'){
                                          return(
                                            <>
                                            { scproject.glass_order_release_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                 
                                    
                        </select>
                        &nbsp;
                        <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total" name='GlassRelFactoryTotal' defaultValue={
                   scproject.GlassRelFactoryTotal}></input>
                            <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released" name='GlassRelFactoryExecu' defaultValue={
                   scproject.GlassRelFactoryExecu}></input>
                            <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" name='' defaultValue={
                   parseInt(scproject.GlassRelFactoryTotal-scproject.GlassRelFactoryExecu)}></input>

                        <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='GlassRelFactoryRej' defaultValue={scproject.GlassRelFactoryRej==null ? zerodefaultvalue :scproject.GlassRelFactoryRej}></input>
                    <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                       parseInt(scproject.GlassRelFactoryTotal-scproject.GlassRelFactoryExecu)}
                      //  +(scproject.GlassReleaseRejection==null? zerodefaultvalue :parseInt(scproject.GlassReleaseRejection))
                    ></input>    
                     </span>    
                     </Form.Group>
  

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Fabrication</p> &nbsp;&nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Fabrication Status'){
                                          if(scproject.fabrication_status==parameter.paravalue){
                                            fabrications=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:fabrications}}  class="form-select form-select-sm" aria-label=".form-select-sm example" name='fabrication_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Fabrication Status'){
                                          return(
                                            <>
                                            { scproject.fabrication_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                                    
                        </select>
                        &nbsp;
                        <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total" readOnly name='fabrication_progress' defaultValue={
                   scproject.alu_order_release}></input>
                                  <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released" name='fabrication_release' defaultValue={
                   scproject.fabrication_release}></input>
                                  <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' defaultValue={
                   parseInt(scproject.alu_order_release-scproject.fabrication_release)}></input>

                    <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='FabricationRejection' defaultValue={scproject.FabricationRejection==null ? zerodefaultvalue :scproject.FabricationRejection}></input>
                    <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                      (parseInt((scproject.site_ready_progress-scproject.site_ready_release)+parseInt(getsiteready))+parseInt(scproject.site_measurement_release-scproject.alu_order_release)+parseInt(scproject.AluOrderRejection==null ? zerodefaultvalue :scproject.AluOrderRejection))+(parseInt(scproject.alu_order_release-scproject.fabrication_release))+(parseInt(scproject.FabricationRejection==null ? zerodefaultvalue :scproject.FabricationRejection))
                      //parseInt((scproject.site_ready_progress-scproject.site_ready_release)+parseInt(getsiteready)+(scproject.site_ready_release-scproject.site_measurement_release)+(scproject.SiteMeasureRejectionteready==null? zerodefaultvalue :parseInt(scproject.SiteMeasureRejectionteready))+parseInt((scproject.site_measurement_release-scproject.alu_order_release)+(scproject.AluOrderRejection==null ? zerodefaultvalue :scproject.AluOrderRejection)))+parseInt(scproject.alu_order_release-scproject.fabrication_release)+parseInt(scproject.FabricationRejection==null ? zerodefaultvalue :scproject.FabricationRejection)
                      //  parseInt((scproject.alu_order_release-scproject.fabrication_release)+(scproject.FabricationRejection==null? zerodefaultvalue :parseInt(scproject.FabricationRejection)))
                    }
                    ></input> 
                     </span>    
                     </Form.Group>




                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Installation</p> &nbsp;&nbsp;&nbsp;
                   
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Installation Status'){
                                          if(scproject.installation_status==parameter.paravalue){
                                            installations=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:installations}} class="form-select form-select-sm" aria-label=".form-select-sm example" name='installation_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Installation Status'){
                                          return(
                                            <>
                                            { scproject.installation_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }                                 
                        </select>
                        &nbsp;
                        <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total" name='installation_progress' defaultValue={
                   scproject.fabrication_release}></input>
                          <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released" name='installation_release' defaultValue={
                   scproject.installation_release}></input>
                          <input  type="text" readOnly class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" name='' defaultValue={
                    parseInt(scproject.fabrication_release-scproject.installation_release)}></input>

                      <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='InstallationRejection' defaultValue={scproject.InstallationRejection==null ? zerodefaultvalue :scproject.InstallationRejection}></input>
                    <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                        parseInt(scproject.InstallationRejection==null ? zerodefaultvalue :scproject.InstallationRejection)+parseInt(scproject.fabrication_release-scproject.installation_release)+(parseInt((scproject.site_ready_progress-scproject.site_ready_release)+parseInt(getsiteready))+parseInt(scproject.site_measurement_release-scproject.alu_order_release)+parseInt(scproject.AluOrderRejection==null ? zerodefaultvalue :scproject.AluOrderRejection))+(parseInt(scproject.alu_order_release-scproject.fabrication_release))+(parseInt(scproject.FabricationRejection==null ? zerodefaultvalue :scproject.FabricationRejection))
                        //parseInt((scproject.site_ready_progress-scproject.site_ready_release)+parseInt(getsiteready)+(scproject.site_ready_release-scproject.site_measurement_release)+(scproject.SiteMeasureRejectionteready==null? zerodefaultvalue :parseInt(scproject.SiteMeasureRejectionteready))+parseInt((scproject.site_measurement_release-scproject.alu_order_release)+(scproject.AluOrderRejection==null ? zerodefaultvalue :scproject.AluOrderRejection)))+parseInt(scproject.alu_order_release-scproject.fabrication_release)+parseInt(scproject.FabricationRejection==null ? zerodefaultvalue :scproject.FabricationRejection)+parseInt((scproject.fabrication_release-scproject.installation_release)+(scproject.FabricationRejection==null? zerodefaultvalue :parseInt(scproject.InstallationRejection)))
                      }
                    ></input> 
                     </span>    
                     </Form.Group>
                      <h6><strong><u>Glass</u></strong></h6>

                      <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                      <span className='form-inline input-group'>                      
                      <p className='drop-menu-title-width'>Ready at Glass Factory</p> &nbsp;&nbsp;&nbsp;
                      
                      {
                                          parameters.map((parameter,i)=>{
                                            if(parameter.paracontrol=='ReadyAtFactory'){
                                              if(scproject.glass_delivery_status==parameter.paravalue){
                                                glassdeliverystatus=parameter.paracolor
                                              }
                                        
                                            }
                                          })
                            }
                        <select  style={{backgroundColor:glassdeliverystatus}} class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_delivery_status' >
                        <option></option>

                        {
                                          parameters.map((parameter,i)=>{
                                            if(parameter.paracontrol=='ReadyAtFactory'){
                                              return(
                                                <>
                                                { scproject.glass_delivery_status==parameter.paravalue ? 
                                                  <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                : 
                                                  <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                }
                                              </>
                                              )
                                            }
                                          })
                            }                                        
                            </select>
                            &nbsp;
                            <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total" name='glass_delivery_progress' defaultValue={
                      parseInt(scproject.glass_order_release)+parseInt(scproject.GlassRelFactoryExecu)} readOnly></input>
                          <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released" name='glass_delivery_release' defaultValue={
                      scproject.glass_delivery_release}></input>
                          <input  type="text" readOnly class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" name='' defaultValue={
                      (parseInt(scproject.glass_order_release)+parseInt(scproject.GlassRelFactoryExecu))-parseInt(scproject.glass_delivery_release)}></input>

                      
                    <input type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='TofactoryRejection' defaultValue={scproject.TofactoryRejection==null ? zerodefaultvalue :scproject.TofactoryRejection}></input>
                    <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                       parseInt((parseInt(scproject.glass_order_release)+parseInt(scproject.GlassRelFactoryExecu))-parseInt(scproject.glass_delivery_release)+parseInt(scproject.TofactoryRejection==null ? zerodefaultvalue :scproject.TofactoryRejection)+parseInt((scproject.glass_order_release_progress-scproject.glass_order_release))+parseInt(scproject.GlassRelFactoryTotal-scproject.GlassRelFactoryExecu))}
                    ></input> 
                         </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                      <span className='form-inline input-group'>  
                          
                      <p className='drop-menu-title-width'>Recieved at NLG</p> &nbsp;&nbsp;&nbsp;
                      
                      {
                                          parameters.map((parameter,i)=>{
                                            if(parameter.paracontrol=='Glass Delivery Status'){
                                              if(scproject.glass_delivery_status==parameter.paravalue){
                                                glassdeliverystatus=parameter.paracolor
                                              }
                                        
                                            }
                                          })
                            }
                        <select   class="form-select form-select-sm" aria-label=".form-select-sm example" name='GlasstoSiteLabel' >
                        <option></option>

                        {
                                          parameters.map((parameter,i)=>{
                                            if(parameter.paracontrol=='Glass Delivery Status'){
                                              return(
                                                <>
                                                { scproject.GlasstoSiteLabel==parameter.paravalue ? 
                                                  <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                : 
                                                  <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                }
                                              </>
                                              )
                                            }
                                          })
                            }
                                        
                            </select>
                            &nbsp;
                            <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total" name='' defaultValue={
                      scproject.glass_delivery_release}></input>
                          <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released" name='GlassRecievedatNLG' defaultValue={
                      scproject.GlassRecievedatNLG}></input>
                          <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" name='' defaultValue={
                      parseInt(scproject.glass_delivery_release-scproject.GlassRecievedatNLG)}></input>
                      <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='' defaultValue={parseInt(recatnlg)}></input>
                    <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                      //  parseInt((scproject.glass_delivery_progress-scproject.GlassRecievedatNLG)+(parseInt(recatnlg)))
                       parseInt((parseInt(scproject.glass_order_release)+parseInt(scproject.GlassRelFactoryExecu))-parseInt(scproject.glass_delivery_release)+parseInt(scproject.TofactoryRejection==null ? zerodefaultvalue :scproject.TofactoryRejection)+parseInt((scproject.glass_order_release_progress-scproject.glass_order_release))+parseInt(scproject.GlassRelFactoryTotal-scproject.GlassRelFactoryExecu))
                       +parseInt(scproject.glass_delivery_release-scproject.GlassRecievedatNLG)+(parseInt(recatnlg))
                      }
                    ></input> 
                            {/* {ncrdata.Rat?
                          ncrdata.Rat
                        :
                        <>0</> } */}
                        </span>    
                     </Form.Group>

                     <Table>
                          <thead>
                          <tr><td style={{width:'20%'}}>Title</td>
                          <td style={{width:'10%'}}>Status</td>
                          <td style={{width:'10%'}}>Total</td>
                          <td style={{width:'10%'}}>Executed</td>
                          <td style={{width:'10%'}}>Balance</td>
                          <td  style={{width:'10%'}}>Rejected</td>
                          <td>Total Bal</td>
                          <td>Installed</td>
                          <td>Balance</td>
                          </tr>
                          </thead>
                        </Table>

            
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Glass Shutter-Factory</p> &nbsp;&nbsp;&nbsp;
                   
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Delivery Status'){
                                          if(scproject.GlassShutterToSite==parameter.paravalue){
                                            glassshutterstatus=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='ShuttertoFactLabel' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Delivery Status'){
                                          return(
                                            <>
                                            { scproject.ShuttertoFactLabel==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                                    
                        </select>
                        &nbsp;
                        <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total"  name='GlassShutterToSiteTotal' defaultValue={
                   scproject.GlassShutterToSiteTotal}></input>
                      <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released"  name='GlassShutterToSiteRelease' defaultValue={
                   scproject.GlassShutterToSiteRelease}></input>
                      <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1" placeholder=""  name='' defaultValue={
                   parseInt(scproject.GlassShutterToSiteTotal-scproject.GlassShutterToSiteRelease)}></input>
                          <input type="text" readOnly class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='' defaultValue={parseInt(shutterfact)}></input>
                    <input disabled type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000"  name=''  defaultValue={
                       parseInt(scproject.GlassRelFactoryTotal-scproject.GlassRelFactoryExecu)+parseInt(scproject.GlassShutterToSiteTotal-scproject.GlassShutterToSiteRelease)+parseInt(shutterfact)+parseInt((scproject.glass_order_release_progress-scproject.glass_order_release))
                      }
                    ></input> 
                           <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Installed"  name='install_factory' defaultValue={scproject.install_factory} ></input>
                           <input  type="text" readOnly class="short-text-box" id="exampleFormControlInput1" placeholder="Balance"  name='balance_fact'  defaultValue={scproject.GlassShutterToSiteRelease-scproject.install_factory} ></input>
                        {/* {ncrdata.GSF?
                          ncrdata.GSF
                        :
                        <>0</> } */}
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p className='drop-menu-title-width'>Glass to Site</p> &nbsp;&nbsp;&nbsp;
                   
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Delivery Status'){
                                          if(scproject.GlassShutterToSite==parameter.paravalue){
                                            glassshutterstatus=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select  style={{backgroundColor:glassshutterstatus}} class="form-select form-select-sm" aria-label=".form-select-sm example" name='GlassShutterToSite' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Delivery Status'){
                                          return(
                                            <>
                                            { scproject.GlassShutterToSite==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                                    
                        </select>
                        &nbsp;
                        <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Total" readOnly name='' defaultValue={
                   (scproject.GlassRecievedatNLG-scproject.GlassShutterToSiteTotal)}></input>
                      <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Released"  name='ShuttertoSiteExecuted' defaultValue={
                   scproject.ShuttertoSiteExecuted}></input>
                      <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1" placeholder=""  name='' defaultValue={
                   parseInt(((scproject.GlassRecievedatNLG-scproject.GlassShutterToSiteTotal))-scproject.ShuttertoSiteExecuted)}></input>
                              <input readOnly type="text" class="short-text-box" id="exampleFormControlInput1"  placeholder="user"  name='' defaultValue={parseInt(glasssite)}></input>
                    <input type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="000/000" readOnly name='' disabled defaultValue={
                       parseInt((scproject.GlassRecievedatNLG-scproject.GlassShutterToSiteTotal)-scproject.ShuttertoSiteExecuted)+(parseInt(glasssite))+parseInt(scproject.GlassRelFactoryTotal-scproject.GlassRelFactoryExecu)+parseInt((scproject.glass_order_release_progress-scproject.glass_order_release))}
                    ></input> 
                            <input  type="text" class="short-text-box" id="exampleFormControlInput1" placeholder="Installed"  name='installed_site' defaultValue={scproject.installed_site}  ></input>
                           <input  type="text" readOnly class="short-text-box" id="exampleFormControlInput1" placeholder="Balance" defaultValue={(scproject.ShuttertoSiteExecuted)-(scproject.installed_site)} name='balance_site'></input>
                        {/* {ncrdata.GTS?
                          ncrdata.GTS
                        :
                        <>0</> } */}

                     </span>    
                     </Form.Group>
             </Card.Body>
            
           </Card>
         </Col>



         
                 
         <Col md="2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Handover Docs</u></Card.Title>
             </>
             <Card.Body style={{}}>
                
             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><>Drawings Prep</></p> &nbsp;&nbsp;

                   
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='As built Drawings Preparation Status'){
                                          if(scproject.as_built_drawings_preparation_status==parameter.paravalue){
                                            dpreprationstatus=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select style={{backgroundColor:dpreprationstatus}} 

                     class="form-select form-select-sm" aria-label=".form-select-sm example" name='as_built_drawings_preparation_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='As built Drawings Preparation Status'){
                                          return(
                                            <>
                                            { scproject.as_built_drawings_preparation_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                    
                        </select>
                     </span>    
                     </Form.Group>


   
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><>Dr Submission</></p> &nbsp;&nbsp;

                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='AS built Drawings Submission Status'){
                                          if(scproject.as_built_drawings_submission_status==parameter.paravalue){
                                            dsubmissionstatus=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select style={{backgroundColor:dsubmissionstatus}} 

                      class="form-select form-select-sm" aria-label=".form-select-sm example" name='as_built_drawings_submission_status' >
                    <option></option>


                    {
                      
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='AS built Drawings Submission Status'){
                                          return(
                                            <>
                                            { scproject.as_built_drawings_submission_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                    
                        </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><>Submission Date</></p> &nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='as_built_drawings_submission_date' defaultValue={scproject.as_built_drawings_submission_date}></input>
                  
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><>Doc Preparation</></p> &nbsp;&nbsp;&nbsp;

                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='handover Documents Preparation'){
                                          if(scproject.handover_documents_preparation==parameter.paravalue){
                                            handoverdocumentprep=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select style={{backgroundColor:handoverdocumentprep}} 
                     class="form-select form-select-sm" aria-label=".form-select-sm example" name='handover_documents_preparation' >
                    <option></option>


                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='handover Documents Preparation'){
                                          return(
                                            <>
                                            { scproject.handover_documents_preparation==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                        </select>
                     </span>    
                     </Form.Group>



   
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><>Doc Submission</></p> &nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='handover Documents Submission status'){
                                          if(scproject.handover_documents_submission_status==parameter.paravalue){
                                            handoverdocumentprep=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select style={{backgroundColor:handoverdocumentprep}}  class="form-select form-select-sm" aria-label=".form-select-sm example" name='handover_documents_submission_status' >
                    <option></option>
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='handover Documents Submission status'){
                                          return(
                                            <>
                                            { scproject.handover_documents_submission_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }

                                    
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><>Submission date</></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='handover_documents_submission_date' defaultValue={scproject.handover_documents_submission_date}></input>
                  
                     </span>    
                     </Form.Group>


             </Card.Body>
            
           </Card>
         </Col>


         <Col md="2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Snagging & TOC</u></Card.Title>
             </>
             <Card.Body style={{}}>
                
                
             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Est Start Date</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='snagging_desnags_esd' defaultValue={scproject.snagging_desnags_esd}></input>
                  
                     </span>    
                     </Form.Group>

                           
             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>Est End Date</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='snagging_desnags_efd' defaultValue={scproject.snagging_desnags_efd}></input>
                  
                     </span>    
                     </Form.Group>

                     
   
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>TOC issuance</p> &nbsp;&nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='TOC issuance Status'){
                                          if(scproject.toc_issuance_status==parameter.paravalue){
                                            tocissuance=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }
                    <select style={{backgroundColor:tocissuance}} 
                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='toc_issuance_status' >
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='TOC issuance Status'){
                                          return(
                                            <>
                                            { scproject.toc_issuance_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }


                        </select>
                     </span>    
                     </Form.Group>

                     
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p>TOC Date</p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='toc_date' defaultValue={scproject.toc_date}></input>
                  
                     </span>    
                     </Form.Group>
                     
             </Card.Body>
            
           </Card>
           <span className='mt-4' style={{display:'grid'}}><button type='submit' form="main" className='btn btn-danger'>Update Records</button> </span>
         </Col>
       </Row>

       

       </form>

<Row className='mb-5'>
  <Col sm='5'>

  </Col>
  <Col sm='2'>             

  </Col>
</Row>
   

    </Row>
        )
    })
}

 

              <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Non System items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
          
          nonsystemsd?
          <form onSubmit={UpdateIndividualNSSD}>
          <Table striped bordered hover>
            <tbody>
              {
              GETSDNON.map((sd,i)=>{
                
                if(sdid==sd.id){
                  return(
                    <tr>
                        {/* <tbody>
                            <tr> */}
                            <td>Type:
                                <select  
                                  style={{}}
                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_type' >
                                {/* <option>Canopy</option>
                                <option>Parabola</option>
                                <option>Balustrade</option> */}
  
                                  {
                                                    parameters.map((parameter,i)=>{
                                                      if(parameter.paracontrol=='NonSystemSD'){
                                                        return(
                                                          <>
                                                          { sd.type==parameter.paravalue ? 
                                                            <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                          : 
                                                            <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                          }
                                                        </>
                                                        )
                                                      }
                                                    })
                                      }
                                   </select>
                                </td>
                            <td>Scheduled Status:
                                <select  
                                  style={{}}
                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_status' >
                                  
                                  <option></option>
  
                                  {
                                                    parameters.map((parameter,i)=>{
                                                      if(parameter.paracontrol=='SD Schedule Status'){
                                                        return(
                                                          <>
                                                          { sd.sd_status==parameter.paravalue ? 
                                                            <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                          : 
                                                            <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                          }
                                                        </>
                                                        )
                                                      }
                                                    })
                                      }
                                   </select>
                                </td>
                              
                                <td>Start Date
                                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_start_date'  defaultValue={sd.sd_start_date} ></input>
                                 
                                </td>
                              
                                <td>End Date
                                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_end_date'  defaultValue={sd.sd_end_date} ></input>
                                </td>
  
                                <td>Submission Status:
                                <select  
                                  style={{}}
                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_submission_status' >
                                <option></option>
  
                                  {
                                                    parameters.map((parameter,i)=>{
                                                      if(parameter.paracontrol=='SD Submission Status'){
                                                        return(
                                                          <>
                                                          { sd.sd_submission_status==parameter.paravalue ? 
                                                            <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                          : 
                                                            <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                          }
                                                        </>
                                                        )
                                                      }
                                                    })
                                      }
                                   </select>
                                </td>
  
                                <td>Approval Status:
                                <select  
                                  style={{}}
                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_approval_status' >
                                 
                                      {
                                              parameters.map((parameter,i)=>{
                                                if(parameter.paracontrol=='SD Approval Status'){
                                                  return(
                                                    <>
                                                    { sd.sd_approval_status==parameter.paravalue ? 
                                                      <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                    : 
                                                      <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                    }
                                                  </>
                                                  )
                                                }
                                              })
                                }
                                   </select>
                                </td>
  
                                <td>Revision:
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_revision'  defaultValue={sd.sd_revision} ></input>                     
                                </td>
  
                                <td>Approval Date
                                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_approval_date'  defaultValue={sd.sd_approval_date}></input>
                                </td>
                                 <input type="hidden" value={'18'} name='sd_desiginer'></input>
                                 <input type="hidden" value={sd.id} name='id'></input>
                                 <td>
                                  <button type='submit' className='mt-4 btn btn-success'>
                                    <i className='fa fa-upload'></i>
                                  </button>
                                 </td>
                    </tr>
                  )
                }

              })
              }
          
            </tbody>
          </Table>
          </form>
          :
          <form  onSubmit={UpdateNonSystemSD}>
            <Table striped bordered hover>
            <thead className='mt-4'>
                            <tr>
                              <th colSpan={3}> Shop Drawings</th>
                            </tr>
                          </thead>
                          <tbody>
                          <tr>
                          <td>Type:
                              <select  
                                style={{}}
                                class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_type' >
                     
                                {
                                                  parameters.map((parameter,i)=>{
                                                    if(parameter.paracontrol=='NonSystemSD'){
                                                      return(
                                                        
                                                          <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                        
                                                      )
                                                    }
                                                  })
                                    }
                                 </select>
                              </td>
                          <td>Scheduled Status:
                              <select  
                                style={{}}
                                class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_status' >
                                
                                <option></option>

                                {
                                                  parameters.map((parameter,i)=>{
                                                    if(parameter.paracontrol=='SD Schedule Status'){
                                                      return(
                                                        <>
                                                        { nsi.sd_status==parameter.paravalue ? 
                                                          <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                        : 
                                                          <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                        }
                                                      </>
                                                      )
                                                    }
                                                  })
                                    }
                                 </select>
                              </td>
                            
                              <td>Start Date
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_start_date'  defaultValue={nsi.sd_start_date} ></input>
                               
                              </td>
                            
                              <td>End Date
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_end_date'  defaultValue={nsi.sd_end_date} ></input>
                              </td>

                              <td>Submission Status:
                              <select  
                                style={{}}
                                class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_submission_status' >
                              <option></option>

                                {
                                                  parameters.map((parameter,i)=>{
                                                    if(parameter.paracontrol=='SD Submission Status'){
                                                      return(
                                                        <>
                                                        { nsi.sd_submission_status==parameter.paravalue ? 
                                                          <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                        : 
                                                          <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                        }
                                                      </>
                                                      )
                                                    }
                                                  })
                                    }
                                 </select>
                              </td>

                              <td>Approval Status:
                              <select  
                                style={{}}
                                class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_approval_status' >
                               
                                    {
                                            parameters.map((parameter,i)=>{
                                              if(parameter.paracontrol=='SD Approval Status'){
                                                return(
                                                  <>
                                                  { nsi.sd_approval_status==parameter.paravalue ? 
                                                    <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                  : 
                                                    <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                  }
                                                </>
                                                )
                                              }
                                            })
                              }
                                 </select>
                              </td>

                              <td>Revision:
                              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_revision'  defaultValue={nsi.sd_revision} ></input>                     
                              </td>

                              <td>Approval Date
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_approval_date'  defaultValue={nsi.sd_approval_date}></input>
                              </td>
                               <input type="hidden" value={'18'} name='sd_desiginer'></input>
                               
                               <td>
                                <button className='mt-4 btn btn-success'>
                                  <i className='fa fa-plus'></i>
                                </button>
                               </td>
                            </tr>
                          </tbody>
                          <br></br>
            </Table>
          </form>

                }
              {GETSDNON.length==0?
              null
                :
                <>
                <h6><strong>List of Shop Drawings</strong></h6>
          <form>
          <Table striped bordered hover>
            <thead>
              <th>Type</th>
              <th>Scheduled Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Submission Status</th>
              <th>Approval Status</th>
              <th>Revision</th>
              <th>Approval Date</th>

            </thead>
            <tbody>
              {
              GETSDNON.map((sd,i)=>{
                
                return(
                  <tr>
                    {/* <td>{sd.id}</td> */}
                    <td>{sd.type}</td>  
                    <td>{sd.sd_status}</td>  
                    <td>{sd.sd_start_date}</td>  
                    <td>{sd.sd_end_date}</td>  
                    <td>{sd.sd_submission_status}</td>                     

                    <td>{sd.sd_approval_status}</td>  
                    <td>{sd.sd_revision}</td>  
                    <td>{sd.sd_approval_date}</td>  
                    <input type="hidden" class="form-control" placeholder=""  name="id" value={sd.id}></input>       

                              {/* <td>Approval Date
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_approval_date'  defaultValue={nsi.sd_approval_date}></input>
                              </td>
                               <input type="hidden" value={'18'} name='sd_desiginer'></input>

                    <td>{sd.type}</td>
                    <td>{sd.sd_status}</td>
                    <td>{sd.sd_start_date}</td>
                    <td>{sd.sd_end_date}</td>
                    <td>{sd.sd_submission_status}</td>
                    <td>{sd.sd_approval_status}</td>
                    <td>{sd.sd_revision}</td> */}
                    <td><button  onClick={(e)=> AddIndividualSD(e,sd.id)} className='btn btn-success'><i className='fa fa-pencil'></i></button> &nbsp;
                    
                    </td>
                  </tr>
                )
              })
              }
          
            </tbody>
          </Table>
          </form>
          </>
          }
          <hr></hr>
          <br></br>
        {
          nonSystemidStatus?
          <form onSubmit={UpdateNonSystem}>
          <Table striped bordered hover>
                                 <br></br>
  
                            <thead className='mt-4'>
                       
                            </thead>
                          <tbody>
                            <tr>
                                <th colSpan={3}>Edit MTO Taking</th>
                              </tr>
                    {
                      

                      nsi.map((non,i)=>{
                        if(nonSystemid==non.id){
                          console.log(non.mto_taking)
                          return(
                            <tr>
                              <td>Type: 
                                <select  
                                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='type' >
                                  <option></option>
                                  {
                                                  parameters.map((parameter,i)=>{
                                                    if(parameter.paracontrol=='NonSystemMisc'){
                                                      return(
                                                        <>

                                                          {non.type==parameter.paravalue ? 
                                                                          <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                                        : 
                                                                          <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                                        }
                                                      </>
                                                      )
                                                    }
                                                  })
                                    }
                                    </select>             
                                  </td>

                                  <td>MTO Taking:
                                <select  
                                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='mto_taking' >
                                  <option></option>
                                  {
                                                  parameters.map((parameter,i)=>{
                                                    if(parameter.paracontrol=='MTO Taking'){
                                                      return(
                                                        <>

                                                          {non.mto_taking==parameter.paravalue ? 
                                                                          <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                                        : 
                                                                          <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                                        }
                                                      </>
                                                      )
                                                    }
                                                  })
                                    }
                                    </select>             
                                  </td>


                                  <td>Order Status:
                                <select  
                                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='order_status' >
                                  <option></option>
                                  {
                                                  parameters.map((parameter,i)=>{
                                                    if(parameter.paracontrol=='Aluminium Order Status'){
                                                      return(
                                                        <>

                                                          {non.order_status==parameter.paravalue ? 
                                                                          <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                                        : 
                                                                          <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                                        }
                                                      </>
                                                      )
                                                    }
                                                  })
                                    }
                                    </select>             
                                  </td>
                                  <td>ETA
                                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={non.eta} name='eta' ></input>
                                </td>
                                <input type='hidden' name='non_id' value={non.id}></input>
                                <td><button className='btn btn-success mt-4' ><i className='fa fa-arrow-up'></i></button></td>
                              {/* <td>{i+1}</td>
                              <td>{non.type}</td>
                              <td>{non.mto_taking}</td>
                              <td>{non.order_status}</td>
                              <td>{non.eta}</td> */}
                              </tr>
                              )
                        }
                  
                          })
                    }
                            </tbody>
                            
                                 <br></br>
                          </Table>
                          </form>
          :
        <form onSubmit={AddNonSystem}>
        <Table striped bordered hover>
       
                          {/* <thead>
                            <tr>
                              <th colSpan={3}>Aluminum Box</th>
                           
                            </tr>
                          </thead>
                          <tbody>
                          <tr>
                          <td>MTO Taking:
             
                                    <select  

                                        class="form-select form-select-sm" aria-label=".form-select-sm example" name='al_mto_taking' >
                                      <option></option>
                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='MTO Taking'){
                                                          return(
                                                            <>
                                                            { nsi.al_mto_taking==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                        </select>             
                              </td>
                              <td>Order Status:
                         
                                    <select  

                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='al_order_status' >
                                      <option></option>

                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='Aluminium Order Status'){
                                                          return(
                                                            <>
                                                            { nsi.al_order_status==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                
                                        </select>
                              </td>
                              <td>ETA
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='al_eta' defaultValue={nsi.al_eta} ></input>
                               
                              </td>
                              <td>Fabrication

                       
                                <select   class="form-select form-select-sm" aria-label=".form-select-sm example" name='al_fabrication_status' >
                                <option></option>

                                {
                                                  parameters.map((parameter,i)=>{
                                                    if(parameter.paracontrol=='Fabrication Status'){
                                                      return(
                                                        <>
                                                        { nsi.al_fabrication_status==parameter.paravalue ? 
                                                          <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                        : 
                                                          <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                        }
                                                      </>
                                                      )
                                                    }
                                                  })
                                    }
                                                
                                    </select>
                              </td>
                             
                              <td>Assembly & Delivery

                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={nsi.al_ass_del_status} name='al_ass_del_status' ></input>  
                                
                              </td>

                            </tr>
                          </tbody>
                          <br></br>
                          <thead className='mt-4'>
                            <tr>
                              <th colSpan={3}>Aluminum Sheet</th>
                       
                            </tr>
                          </thead>
                          <tbody>
                          <tr>
                         
                         
                              <td>MTO Taking:
           
                                    <select  
                                        class="form-select form-select-sm" aria-label=".form-select-sm example" name='sheet_mto_taking' >
                                      <option></option>
                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='MTO Taking'){
                                                          return(
                                                            <>
                                                            { nsi.sheet_mto_taking==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                        </select>             
                              </td>
                              <td>Order Status:

                                    <select  
                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='sheet_order_status' >
                                      <option></option>

                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='Aluminium Order Status'){
                                                          return(
                                                            <>
                                                            { nsi.sheet_order_status==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                
                                        </select>


                              </td>
                              <td>ETA
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={nsi.sheet_eta}  name='sheet_eta' ></input>
                               
                              </td>
                              <td>Fabrication



                                <select    class="form-select form-select-sm" aria-label=".form-select-sm example" name='sheet_fabrication_status' >
                                <option></option>

                                {
                                                  parameters.map((parameter,i)=>{
                                                    if(parameter.paracontrol=='Fabrication Status'){
                                                      return(
                                                        <>
                                                        { nsi.sheet_fabrication_status==parameter.paravalue ? 
                                                          <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                        : 
                                                          <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                        }
                                                      </>
                                                      )
                                                    }
                                                  })
                                    }
                                                
                                    </select>
                              </td>
                             
                            
                            </tr>
                          </tbody> */}
                        
                               <br></br>

                          <thead className='mt-4'>
                     
                          </thead>
                          {/* // const[nonSystemid,setnonSystemid]=useState(0);
  // const[nonSystemidStatus,setnonSystemidStatus]=useState(false); */}
                       
                            
                          
                          <tbody>
                          <tr>
                              <th colSpan={3}>Add MTO</th>
                            </tr>
                          <tr>
                         
                          <td>Type:
                    
                    <select  
                        class="form-select form-select-sm" aria-label=".form-select-sm example" name='type' >
                      <option></option>
                      {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='NonSystemMisc'){
                                          return(
                                            <>
                                       
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            
                                          </>
                                          )
                                        }
                                      })
                        }
                        </select>             
                         </td>

                              <td>MTO Taking:
                    
                                    <select  
                                        class="form-select form-select-sm" aria-label=".form-select-sm example" name='mto_taking' >
                                      <option></option>
                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='MTO Taking'){
                                                          return(
                                                            <>
                                                            { nsi.steel_mto_taking==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                        </select>             
                              </td>
                              <td>Order Status:
                          
                                    <select  

                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='order_status' >
                                      <option></option>

                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='Aluminium Order Status'){
                                                          return(
                                                            <>
                                                            { nsi.steel_order_status==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                
                                        </select>
                              </td>
                              <td>ETA
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={nsi.steel_eta} name='eta' ></input>
                               
                              </td>
                                        <td><button className='btn btn-success mt-4'><i className='fa fa-plus'></i></button></td>
                            </tr>
                          </tbody>
                          
                          {/* <br></br>
                        
                          <thead className='mt-4'>
                            <tr>
                              <th colSpan={3}>Powder</th>
                            </tr>
                          </thead>
                          <tbody>
                          <tr>
                        

                              <td>MTO Taking:
   
                                    <select  

                                        class="form-select form-select-sm" aria-label=".form-select-sm example" name='powder_mto_taking' >
                                      <option></option>
                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='MTO Taking'){
                                                          return(
                                                            <>
                                                            { nsi.powder_mto_taking==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                        </select>             
                              </td>
                              <td>Order Status:
                            
                                    <select  

                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='powder_order_status' >
                                      <option></option>

                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='Aluminium Order Status'){
                                                          return(
                                                            <>
                                                            { nsi.powder_order_status==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                
                                        </select>


                              </td>
                              
                              <td>ETA
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder=""  defaultValue={nsi.powder_eta}  name='powder_eta' ></input>
                               
                              </td>
                            
                             
                            </tr>
                          </tbody> */}
                          
                               <br></br>
                        
                          
                        </Table>

                       
                 
                      
                        {/* <button className='btn btn-success' type='sbmit'>Update Records</button> */}
                        </form>

                        
                     

                          }

                        {
                            nsi.length>0?
                             <Table striped bordered hover>
                             <thead>
                                 <th>Sr#</th>
                                 <th>Type</th>
                                 <th>MTO Taking</th>
                                 <th>Order Status</th>
                                 <th>ETA</th>
                             </thead>
                             <tbody>
                            {
                            nsi.map((non,i)=>{
                              return(
                                <tr>
                                  <td>{i+1}</td>
                                  <td>{non.type}</td>
                                  <td>{non.mto_taking}</td>
                                  <td>{non.order_status}</td>
                                  <td>{non.eta}</td>
                                  {/* <input type='hidden' value={non.id} name='non_id'></input> */}
                                  <td><button  className='btn btn-success'  onClick={(e)=> setNONID(e,non.id)} > <i className='fa fa-pencil' ></i></button> &nbsp;
                                   <button className='btn btn-danger' disabled><i className='fa fa-trash'></i></button></td>
                                  {/* <td><button disabled className='btn btn-danger'> <i className='fa fa-trash'></i></button></td> */}
                                </tr>
                              )
                            })
                          }
                                  <tr></tr>
                          </tbody>
                        </Table>

                            :null
                          }
<br></br>
<hr></hr>
                          {

<form  onSubmit={UpdateNonSystemMS}>
<Table striped bordered hover>
<thead className='mt-4'>
                <tr>
                  <th colSpan={3}>Material Submission (MUT - Report Errors)</th>
                  
                </tr>
              </thead>
              <tbody>
              <tr>
              <td>Type:
                  <select  
                    style={{}}
                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='ms_type' >
         
                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='NonSystemSD'){
                                          return(
                                            
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            
                                          )
                                        }
                                      })
                        }
                     </select>
                  </td>
              <td>Scheduled Status:
                  <select  
                    style={{}}
                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='ms_status' >
                    
                    <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='SD Schedule Status'){
                                          return(
                                            <>
                                            { nsi.ms_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                     </select>
                  </td>
                
                  <td>Start Date
                  <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='ms_start_date'  defaultValue={nsi.ms_start_date} ></input>
                   
                  </td>
                
                  <td>End Date
                  <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='ms_end_date'  defaultValue={nsi.ms_end_date} ></input>
                  </td>

                  <td>Submission Status:
                  <select  
                    style={{}}
                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='ms_submission_status' >
                  <option></option>

                    {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='SD Submission Status'){
                                          return(
                                            <>
                                            { nsi.ms_submission_status==parameter.paravalue ? 
                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                            : 
                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                            }
                                          </>
                                          )
                                        }
                                      })
                        }
                     </select>
                  </td>

                  <td>Approval Status:
                  <select  
                    style={{}}
                    class="form-select form-select-sm" aria-label=".form-select-sm example" name='ms_approval_status' >
                   
                        {
                                parameters.map((parameter,i)=>{
                                  if(parameter.paracontrol=='SD Approval Status'){
                                    return(
                                      <>
                                      { nsi.ms_approval_status==parameter.paravalue ? 
                                        <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                      : 
                                        <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                      }
                                    </>
                                    )
                                  }
                                })
                  }
                     </select>
                  </td>

                  <td>Revision:
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='ms_revision'  defaultValue={nsi.ms_revision} ></input>                     
                  </td>

                  <td>Approval Date
                  <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='ms_approval_date'  defaultValue={nsi.ms_approval_date}></input>
                  </td>
                   <input type="hidden" value={'18'} name='ms_desiginer'></input>
                   
                   <td>
                    <button className='mt-4 btn btn-success'>
                      <i className='fa fa-plus'></i>
                    </button>
                   </td>
                </tr>
              </tbody>
              <br></br>
</Table>
</form>




// GETNSIMS
                          }

{GETNSIMS.length==0?
              null
                :
                <>
                <h6><strong>List of Material Submission</strong></h6>
          <form>
          <Table striped bordered hover>
            <thead>
              <th>Type</th>
              <th>Scheduled Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Submission Status</th>
              <th>Approval Status</th>
              <th>Revision</th>
              <th>Approval Date</th>

            </thead>
            <tbody>
              {
              GETNSIMS.map((ms,i)=>{
                console.log(ms)
                return(
                  <tr>
                    {/* <td>{ms.id}</td> */}
                    <td>{ms.type}</td>  
                    <td>{ms.ms_status}</td>  
                    <td>{ms.ms_start_date}</td>  
                    <td>{ms.ms_end_date}</td>  
                    <td>{ms.ms_submission_status}</td>                     
                
                    <td>{ms.ms_approval_status}</td>  
                    <td>{ms.ms_revision}</td>  
                    <td>{ms.ms_approval_date}</td>  
                    <input type="hidden" class="form-control" placeholder=""  name="id" value={ms.id}></input>       
                
                              {/* <td>Approval Date
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='ms_approval_date'  defaultValue={nsi.ms_approval_date}></input>
                              </td>
                               <input type="hidden" value={'18'} name='ms_desiginer'></input>
                
                    <td>{ms.type}</td>
                    <td>{ms.ms_status}</td>
                    <td>{ms.ms_start_date}</td>
                    <td>{ms.ms_end_date}</td>
                    <td>{ms.ms_submission_status}</td>
                    <td>{ms.ms_approval_status}</td>
                    <td>{ms.ms_revision}</td> */}
                     {/* onClick={(e)=> AddIndividualms(e,ms.id)} */}
                    <td><button disabled className='btn btn-success'><i className='fa fa-pencil'></i></button> &nbsp;
                    
                    </td>
                  </tr>
                )
              })
              }
          
            </tbody>
          </Table>
          </form>
          </>
          }
                        
        </Modal.Body>
        </Modal>


     


     
        <Modal show={damageshow} fullscreen={fullscreen} onHide={() => setdamageshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>NCR's</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
          damageedit?
          <></>
        //   <form onSubmit={UpdateIndividualDamageItems}>
        //   <Table striped bordered hover className='mt-2'>
        //   <thead>
        //       <th>Type</th>
        //       <th>Refrence</th>
        //       <th>Quantity</th>
        //       <th>Reason</th>
        //       <th>Replacement Status</th>
        //       <th>Order Date</th>
        //       <th>Recieved Status</th>
        //       <th>Action</th>
            
        //   </thead>
        //   <tbody>
         
        //     {
        //       getdamagelist.map((damag,i)=>{
        //         console.log(damag)
        //         if(damag.id==damageid){
        //         return(
                  
        //           <tr>
        //             <td>{damag.type}</td>
        //             <td>{damag.refrence}</td>
        //             <td>
        //             <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='qty' defaultValue={damag.qty} ></input>
              
        //             </td>
        //             <td>{damag.reason}</td>
        //             <td>
        //             <select  
        //           class="form-select form-select-sm" aria-label=".form-select-sm example" name='replacement_status' >
        //               <option></option>
        //               {
        //                               parameters.map((parameter,i)=>{
        //                                 if(parameter.paracontrol=='Damage Glass Recieved'){
        //                                   return(
        //                                     <>
        //                                     { damag.replacement_status==parameter.paravalue ? 
        //                                       <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
        //                                     : 
        //                                       <option value={parameter.paravalue}>{parameter.paravalue}</option>
        //                                     }
        //                                   </>
        //                                   )
        //                                 }
        //                               })
        //                 }
                
        //                 </select></td>
        //                 <input type="hidden" class="form-control" id="exampleFormControlInput1" placeholder="" name='id' defaultValue={damag.id} ></input>
                   
        //             <td>
        //             <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='order_date' defaultValue={damag.order_date} ></input>
        //             </td>
        //             <td>
                    
        //             <select  
        //           class="form-select form-select-sm" aria-label=".form-select-sm example" name='recieved_status' >
        //               <option></option>
        //               {
        //                               parameters.map((parameter,i)=>{
        //                                 if(parameter.paracontrol=='Damage Glass Recieved'){
        //                                   return(
        //                                     <>
        //                                     { damag.recieved_status==parameter.paravalue ? 
        //                                       <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
        //                                     : 
        //                                       <option value={parameter.paravalue}>{parameter.paravalue}</option>
        //                                     }
        //                                   </>
        //                                   )
        //                                 }
        //                               })
        //                 }                             
        //                 </select>
        //             </td>
        //             {/* onClick={(e)=> UpdateIndividualDamageItems(e,damag.id)} */}
        //             <td><button type='submit' className='btn btn-success'><i className='fa fa-upload'></i></button></td>
        //           </tr>
               
        //         )
                
        //               }
        //       })
        //     }
             
        //   </tbody>
        // </Table>
        // </form>
        
              :<form onSubmit={AdddamageItem}>
              {/* <Table striped bordered hover>
       
                          <thead>
                            <tr>
                              <th colSpan={3}>Glass / Frame Damage</th>
                       
                            </tr>
                          </thead>
                          <tbody>
                          <tr>
                          <td>Item Type:
                      
                      <select  

                          class="form-select form-select-sm" aria-label=".form-select-sm example" name='type' >
                        <option>Glass</option>
                        <option>Aluminium Frame</option>
                        
                          </select>             
                </td>
                          <td>Defect Location:                      
                                    <select  
                                        class="form-select form-select-sm" aria-label=".form-select-sm example" name='refrence' >
                                      <option></option>
                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='Glass Damage'){
                                                          return(
                                                            <>
                                                            { nsi.al_mto_taking==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                        </select>             
                              </td>

                              <td>Total Qty
                                     <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={nsi.al_ass_del_status} name='qty' ></input>  
  
                              </td>
                                      
                              <td>Recieved
                                     <input disabled type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={nsi.al_ass_del_status} name='qty' ></input>  
  
                              </td>
                              <td>Balance
                                     <input disabled type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={nsi.al_ass_del_status} name='qty' ></input>  
  
                              </td>
                              <td>Reason:
                                    <select  
                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='reason'  >
                                      <option></option>

                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='Glass Damage Reason'){
                                                          return(
                                                            <>
                                                            { nsi.al_order_status==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                
                                        </select>
                              </td>
                              

                              <td>Cause(How its Damage):
                              <input disabled type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={nsi.al_ass_del_status} name='cause' ></input>  
                              </td>
                              <td>Charge To:
                                    <select  disabled
                                  class="form-select form-select-sm" aria-label=".form-select-sm example"  name='replacement_status' >
                                      <option></option>
                   
                                
                                        </select>
                              </td>
                              
                              <td>Replacement Status:
                                    <select  
                                  class="form-select form-select-sm" aria-label=".form-select-sm example"  name='replacement_status' >
                                      <option></option>
                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='Glass Replacement'){
                                                          return(
                                                            <>
                                                            { nsi.al_order_status==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                
                                        </select>
                              </td>
                              <td>Order Place Date
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='order_date' defaultValue={nsi.al_eta} ></input>
                               
                              </td>
                              <td>Recieved Status:
                                    <select  
                                  class="form-select form-select-sm" aria-label=".form-select-sm example" name='recieved_status' >
                                      <option></option>
                                      {
                                                      parameters.map((parameter,i)=>{
                                                        if(parameter.paracontrol=='Damage Glass Recieved'){
                                                          return(
                                                            <>
                                                            { nsi.al_order_status==parameter.paravalue ? 
                                                              <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                                            : 
                                                              <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                                            }
                                                          </>
                                                          )
                                                        }
                                                      })
                                        }
                                
                                        </select>
                              </td>
                  
                                        <td> <button  className='btn btn-success mt-4' type='sbmit'>ADD</button></td>
                            </tr>
                          </tbody>
              
                        </Table> */}

                        

                        </form>
                   
                      }
                        <Table striped bordered hover className='mt-2'>
                          {/* <thead>
                              <th>Type</th>
                              <th>Refrence</th>
                              <th>Quantity</th>
                              <th>Reason</th>
                              <th>Replacement Status</th>
                              <th>Order Date</th>
                              <th>Recieved Status</th>
                              <th>Action</th>
                            
                          </thead> */}
                             <thead>
                                  <tr>
                                  <th>Type</th>
                                    <th>Refrence</th>
                                    <th>Date</th>
                                  </tr>
                                  
                                  </thead>
                            {

                            //NCRByProject.map((ncr,i)=>{
                              NCRByProject && NCRByProject.map && NCRByProject.map((ncr, i) => {
                              return(
                             <tbody>
                             <tr>
                                  <td>{ncr.Type}</td>
                                    <td>{ncr.refrence}</td>
                                    <td>{ncr.date}</td>
                                    <td><button className='btn btn-success'   onClick={(e)=> GetNcrItems(e,ncr.id)}>Details</button></td>
                                  </tr>
                                
                               </tbody>
                              // NCRItemByProject.map((ncritem,i)=>{
                              //   if(ncr.id==ncritem.NCRId){
                              //     return(
                              //       <tr>
                              //         <td>{i+1}</td>
                              //       </tr>
                              //     )
                              //   }
                              // })
                             // )
                              )
                            })
                          

                              // getdamagelist.map((damag,i)=>{
                              //   console.log(damag)
                              //   return(
                              //     <tr>
                              //       <td>{damag.type}</td>
                              //       <td>{damag.refrence}</td>
                              //       <td>
                              //       <input type="text" readOnly class="form-control" id="exampleFormControlInput1" placeholder="" name='order_date' defaultValue={damag.qty} ></input>
                              
                              //       </td>
                              //       <td>{damag.reason}</td>
                              //       <td>
                              //       <select  
                              //     class="form-select form-select-sm" aria-label=".form-select-sm example" name='recieved_status' disabled >
                              //         <option></option>
                              //         {
                              //                         parameters.map((parameter,i)=>{
                              //                           if(parameter.paracontrol=='Damage Glass Recieved'){
                              //                             return(
                              //                               <>
                              //                               { damag.replacement_status==parameter.paravalue ? 
                              //                                 <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                              //                               : 
                              //                                 <option value={parameter.paravalue}>{parameter.paravalue}</option>
                              //                               }
                              //                             </>
                              //                             )
                              //                           }
                              //                         })
                              //           }
                                
                              //           </select></td>

                              //       <td>
                              //       <input readOnly type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='order_date' defaultValue={damag.order_date} ></input>
                              //       </td>
                              //       <td>
                                    
                              //       <select  
                              //     class="form-select form-select-sm" aria-label=".form-select-sm example" name='recieved_status' disabled >
                              //         <option></option>
                              //         {
                              //                         parameters.map((parameter,i)=>{
                              //                           if(parameter.paracontrol=='Damage Glass Recieved'){
                              //                             return(
                              //                               <>
                              //                               { damag.recieved_status==parameter.paravalue ? 
                              //                                 <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                              //                               : 
                              //                                 <option value={parameter.paravalue}>{parameter.paravalue}</option>
                              //                               }
                              //                             </>
                              //                             )
                              //                           }
                              //                         })
                              //           }                             
                              //           </select>
                              //       </td>
                              //       <td><button  onClick={(e)=> UpdateDamageItems(e,damag.id)}className='btn btn-success'><i className='fa fa-pencil'></i></button></td>
                              //     </tr>
                              //   )
                              // })
                            }
                            <Table striped bordered hover className='mt-5'>
                            <thead>
                                  <tr>
                                       <th>Item Type</th>
                                          <th>Defect Location</th>
                                          <th>Description</th>
                                          <th>Reason</th>
                                          <th>Cause (How?)</th>
                                          <th>total Quantity</th>
                                          <th>Recieved</th>
                                          <th>Balance</th>
                                          
                                        </tr>
                                      
                                    </thead>
                    {
                          //setncrid(id)
                          ncritemdetail?
                      
                              NCRItemByProject.map((ncritem,i)=>{
                                if(ncrid==ncritem.NCRId){
                                  return(
                                    
                                  <tr>
                                    <td>{ncritem.title}</td>
                                    <td>{ncritem.location}</td>
                                    <td>{ncritem.description}</td>
                                    <td>{ncritem.status}</td>
                                    <td>{ncritem.remarks}</td>
                                    <td>{ncritem.qty}</td>
                                    <td>{ncritem.qty-ncritem.balance}</td>
                                    <td>{ncritem.balance}</td>
                                  </tr>
                                   
                                  )
                                }
                          })
                            // NCRItemByProject.map((ncritem,i)=>{
                            //   if(ncr.id==ncritem.NCRId){
                            //     return(
                            //       <tr>
                            //         <td>{i+1}</td>
                            //       </tr>
                            //     )
                            //   }
                            // })
                           // )
                          
                          :
                          <>Click on Details To view more information...</>

                    }
                     </Table>
                        </Table>
                        
        </Modal.Body>
        </Modal>
                                     </div>
                                     </div>
                                     </Fragment>
                                )
                        })
                //})


                
                

            )

 
            
                        }
}

export default ProjectDetails