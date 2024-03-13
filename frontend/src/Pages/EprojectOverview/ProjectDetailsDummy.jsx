import React, { Component, Fragment ,useEffect,useState,useReducer,useRef} from 'react'
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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//  components
import { redirect, useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import {
  Card,

  Button,
} from 'react-bootstrap';
// core components


import {Link, useNavigate} from 'react-router-dom';
function ProjectDetailsDummy() {
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
     else{
      return(
              <div className='p-3'>
        <Fragment>   
        
          <h4>Dashboard 2.0</h4>

        <Row>
        <Col className='testing-row' xs={2}>Offers & Contract</Col> &nbsp;
        <Col >
          <Row>
          <Col className='testing-row' xs={2}>IFC Drawings</Col> &nbsp;
          <Col className='testing-row' xs={6}>Shop Drawings</Col> &nbsp;
          <Col className='testing-row'>Procurment</Col> &nbsp;
          </Row>
         
          <Row>
            <Row>
              <span style={{textAlign:'center'}}>Material Submittal</span></Row>
          <Col className='testing-row' xs={8}>Frame</Col> &nbsp;
          <Col className='testing-row' >Glass</Col> &nbsp;
          </Row>
        </Col>
      </Row>
<br></br>
      <h3>Layout</h3>
        <Row>
          <Col className='testing-row'>1 of 2</Col>
          <Col >2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>

        <Row>
        <Col>1 of 3</Col>
        <Col xs={6}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col xs={5}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>

      <Row>
        <Col xs={12} md={8}>
          xs=12 md=8
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
      </Row>

      {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      <Row>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
      </Row>

      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row>
        <Col xs={6}>xs=6</Col>
        <Col xs={6}>xs=6</Col>
      </Row>

      <Row>
        <Col  className='testing-row' md={4}>md=4</Col>
        <Col  className='testing-row' md={{ span: 4, offset: 4 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
      </Row>
      <Row>
        <Col  className='testing-row' md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
        <Col  className='testing-row' md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
      </Row>
      <Row>
        <Col  className='testing-row' md={{ span: 6, offset: 3 }}>{`md={{ span: 6, offset: 3 }}`}</Col>
      </Row>
    
      </Fragment>
      </div>
        )
     }
    
  

 
            
                        
}

export default ProjectDetailsDummy