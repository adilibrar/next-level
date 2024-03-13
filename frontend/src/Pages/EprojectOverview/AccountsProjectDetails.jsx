import React, { Component, Fragment ,useEffect,useState,useReducer,useRef} from 'react'
import NavMenu from '../../Componenets/Common/NavMenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import AppURL from '../../api/AppURL';

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
function AccountsProjectDetails() {
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
  const check_login=sessionStorage.getItem('login');
  const [loading,setLoading]=useState(true);
  const[parameters,setparameters]=useState([]);
  const[certifiedpayment,setCertifiedPayment]=useState([]);
  const[certifiedpaymenttotal,setCertifiedPaymentTotal]=useState([]);
  
  const [rerender, setRerender] = useState(false);
  const[totalvari,settotalvari]=useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [dirty, setDirty] = React.useState(false);
  const markFormDirty = () => setDirty(true);
  const [projectpayments, setProjectPayments] = useState(true);
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
  let fabrications=0
  let installations=0


    pays=location.state.payreturn;
  let vars=0
     vars=location.state.varreturn;
  let scrollpage=0
  scrollpage=location.state.scrollpage;
  const [varshow, setvarshow] = useState(vars);
  const [paysshow, setpaysshow] = useState(pays);

  const[paymentdiv,setpaymentshow]=useState(false);

  const[certified,setcertified]=useState(false);
  const[clientinvoice,setclientinvoice]=useState(false);
  const[transaction,settransaction]=useState(false);
  const[getglass,setgetglass]=useState([]);
  const[finishinglist,setfinishinglist]=useState([]);
  
  //let divRef=React.useRef(null)
  const divRef = React.useRef<HTMLDivElement>(null);
  useEffect(()=>{
     //bottomRef = React.useRef<HTMLDivElement>(null);
     
      if(!check_login){
          navigate('/login')
        }
     

        
        getstockDetails();
//  window.addEventListener('popstate', (event) => {
//           //event.preventDefault();
     
//             cogoToast.error("You Can not use this button to go back, Please use designated button to go back ,your unsaved data will be Lost ...",{hideAfter:10});
       
          
//             window.removeEventListener('popstate')
//       });
        
    
      },[ignored])


    
  // if(dirty){
  //   window.addEventListener("beforeunload", function (e) {
  //     var confirmationMessage = "\o/";
    
  //     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  //     return confirmationMessage;                            //Webkit, Safari, Chrome
      
  //   });  

  // }

const savepayment=(e)=>{
  e.preventDefault();
const data={
  note:e.target.note.value,
  paymentpercentage:e.target.paymentpercentage.value,
  paymenttermid:e.target.paymenttermid.value,
  projectid:project_id
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


const UpdateRecords = (e) => {
  e.preventDefault();
  const data={
    projectid:project_id,
    offer_approval_method:e.target.offer_approval_method.value,
    draft_contract_issuance:e.target.draft_contract_issuance.value,
    draft_contract_negotiation_status:e.target.draft_contract_negotiation_status.value,
    original_contract_receipt:e.target.original_contract_receipt.value,
    original_contract_signature_by_nlg:e.target.original_contract_signature_by_nlg.value,
    original_contract_countersigned_receipt:e.target.original_contract_countersigned_receipt.value,
    facadearea:e.target.facadearea.value,
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
    powder_eta:e.target.powder_eta.value,

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
  }

  axios.post(AppURL.UpdateRecords,data,{ 
          
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===201){
      cogoToast.success('Record Updated Successfully...')
     
      //forceUpdate();
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
          // getstockDetails();
          // forceUpdate();
        
          //setRerender(!rerender);   
         
          setvariationform(false)
            setdivshow(true)
        
      })
      
      }
    const UpdateVariation=(e,varid,voamount,vodescription,voapprovalstatus,voapprovalform,voapprovaldate)=>{

      navigate('/edit-variation',{state:{project:project_id,vid:varid}})
   }

   const UpdatePayment=(e,paid)=>{

    navigate('/edit-payment',{state:{project:project_id,pa:paid}})
 }

 const ProjectLog=(e)=>{

  navigate('/project-event-log',{state:{project:project_id}})
}
 
const ProjectInvoicing=(e)=>{

  navigate('/project-invoicing',{state:{project:project_id}})
}
   
const ProjectCollection=(e)=>{

  navigate('/project-collection',{state:{project:project_id}})
}



const ProjectAttachments=(e)=>{

  navigate('/project-attachments',{state:{project:project_id}})
}

      const showdiv=(e)=>{
        e.preventDefault();
        if(varshow){
          setvarshow(false)
          setcertified(false)
          settransaction(false)
          setclientinvoice(false)
        }
        else{
        if(divshow){
          
          setvariationform(false)   
          setpaysshow(false)
          setpaymentshow(false)
          setcertified(false)
          settransaction(false)
          setdivshow(false)
          setclientinvoice(false)
        }
        else{      
          setvariationform(false)   
          setpaysshow(false)
          setpaymentshow(false)
          settransaction(false)
          setcertified(false)
          setclientinvoice(false)
          setdivshow(true)  
        }
      }
      }  
    


      const InvoiceToClient=(e)=>{
        e.preventDefault();
        if(varshow){
          setvarshow(false)
          setcertified(false)
          settransaction(false)
          setclientinvoice(false)
        }
        else{
        if(clientinvoice){
          
          setvariationform(false)   
          setpaysshow(false)
          setpaymentshow(false)
          setcertified(false)
          settransaction(false)
          setdivshow(false)
          setclientinvoice(false)
        }
        else{      
          setvariationform(false)   
          setpaysshow(false)
          setpaymentshow(false)
          settransaction(false)
          setcertified(false)
          setdivshow(false) 
          setclientinvoice(true)

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
          setclientinvoice(false)
          setpaysshow(false)
        }
        else{
          
          setvariationform(false)
          setdivshow(false)
          setpaysshow(false)
          setpaymentshow(false)
          settransaction(false)
          setclientinvoice(false)
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
        singleProject.map((single,sr)=>{
          manager=single.projectmanagerid
        })

        const data={
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
        navigate('/edit-certified-payment',{state:{id:id,project_id:project_id}});
      } 

      const getstockDetailsNew = async()=>{
        try{
    
            
          const totalvariation = await axios.get(AppURL.GetVariationTotalAmount(project_id))
          settotalvari(totalvariation.data);
         
          setLoading(false);
    
        }catch(error){
            console.log(error);
        }
         //unit_short=item.unit['Short'];
    }

      const getstockDetails = async()=>{
        try{
    
           const response= await axios.get(AppURL.ESingleProjectOverView(project_id))
           setprojectsOverview(response.data);
          const issue_response = await axios.get(AppURL.ESingleProject(project_id))
          setsingleProject(issue_response.data);
    
          const projectmanager = await axios.get(AppURL.ExternalProjectManagerList)
          setmanager(projectmanager.data);
            
          
          const projectvariation = await axios.get(AppURL.GetVariationList(project_id))
          setvariation(projectvariation.data);
            
          const totalvariation = await axios.get(AppURL.GetVariationTotalAmount(project_id))
          settotalvari(totalvariation.data);
          
          const payments = await axios.get(AppURL.GetProjectPayments(project_id))
          setProjectPayments(payments.data);
          
          const terms = await axios.get(AppURL.PaymentTerms)
          setpaymentterms(terms.data);
          
          
          const parameters = await axios.get(AppURL.AllParameters)
          setparameters(parameters.data);
          

          const cer = await axios.get(AppURL.GetCertified(project_id))
          setCertifiedPayment(cer.data);

          const certoal = await axios.get(AppURL.GetCertifiedTotalAmount(project_id))
          setCertifiedPaymentTotal(certoal.data);
          const finish = await axios.get(AppURL.GetFinishingList)
          setfinishinglist(finish.data);   
          const getglass = await axios.get(AppURL.GetGlassType)
          setgetglass(getglass.data);

          
          
          if(scrollpage=='1'){
  // // bottomRef.current.scrollIntoView();
             //divRef.current?.scrollIntoView();
            //divRef.current.scrollIntoView({ behavior: "smooth" });
    //        divRef.current?.scrollIntoView({behavior: 'smooth'});
        window.focus();
        //window.scrollTo(0,800);
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                  });
              }
          

         
          setLoading(false);
    
        

            //   singleProject.map((scproject,sr)=>{
            //         setsingleProjectclone(scproject)
            //       })
            //       projects.map((sproject,sr)=>{
            //         setprojectsclone(sproject)
            //       })
                  
                  
           // alert("all done");
            //setFilteredCountries(response.data)
          
           // console.log(countries);
        }catch(error){
            console.log(error);
        }
         //unit_short=item.unit['Short'];
    }
    

        
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
                                  <Col md="8">
                                   <h3 className=''>Project Dashboard </h3>
                                   </Col>
                                   <Col md="4">
       
                                   {/* <button onClick={(e)=> ProjectLog(e)}  disabled className='btn btn-success'>Project Logs</button>&nbsp;&nbsp;
                                   <button onClick={(e)=> showPaymentdiv(e)}   className='btn btn-success '>Project Payments</button>&nbsp;&nbsp; */}
                                   <button onClick={(e)=> showdiv(e)} className='btn btn-success'>VO Details </button>&nbsp;&nbsp;

                                    <button onClick={(e)=> showCertifieddiv(e)}   className='btn btn-success'>Certified Payments</button>&nbsp;&nbsp;
                                    {/* <button onClick={(e)=> showtransationdiv(e)}   className='btn btn-success mt-3'>Transactions</button>&nbsp;&nbsp; */}
                                    <button onClick={(e)=> ProjectInvoicing(e)}   className='btn btn-success '>Invoice</button>&nbsp;&nbsp;

                                    <button onClick={(e)=> ProjectCollection(e)}   className='btn btn-success'>Collections</button>&nbsp;&nbsp;
                                    <button onClick={(e)=> InvoiceToClient(e)}  className='btn btn-success'>New Invoice</button>&nbsp;&nbsp;
                                    {/* <button onClick={(e)=> ProjectAttachments(e)}   className='btn btn-success'>Attachments</button>&nbsp;&nbsp;
                                    <button className='btn btn-danger'  onClick={(e)=> goback(e,single.projectstatus)} ><i className='fa fa-arrow-left'></i> Go Back</button>&nbsp;&nbsp;
                                   <button className='btn btn-danger'  onClick={(e)=> mainpage(e,single.projectstatus)} ><i className='fa fa-arrow-left'></i> Homepage</button>&nbsp;&nbsp; */}

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
                            <th></th>
                       
                          </tr>
                      )
                })
                }   
                  {/* <button className='btn btn-danger'  onClick={(e)=> UpdateVariation(e,vari.void,vari.voamount,vari.vodescription,vari.voapprovalstatus,vari.voapprovalform,vari.voapprovaldate)}>Edit</button> */}
                             
                                
                             {/* <button className='btn btn-warning mt-3' onClick={(e)=> showVariationForm(e)}>Add New Variation</button>&nbsp;&nbsp; */}

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
                  {/* <Row>
                    
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
          
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                  <Button className='btn btn-success' type='submit' form='payment' style={{marginLeft:'10px'}}>Add Certified Amount</Button>
                     </span>    
                    
                     </Form.Group>
                     </Col>
                    

                      </form> 
                      </Row> */}
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

{
    clientinvoice?
       
        <Row className='mt-5'>
                    
                   <form className='form-inline input-group' onSubmit={savecertify} id='payment' onChange={markFormDirty}>
                   <Col md="3">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Invoice Date</strong></p> &nbsp;&nbsp;&nbsp;
                   
                  
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationid' defaultValue={'PC-'} ></input>

                     </span>    
                     </Form.Group>
                 
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   
                   <p><strong>Offer Approval Method</strong></p> &nbsp;&nbsp;&nbsp;
                   
 
                     <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='offer_approval_method' title='Offer'>
                       <option value={'Receivable'}>Receivable</option>
                       <option value={'Payable'}>Payable</option>
                       <option value={'STL'}>STL</option>
                       

                     </select>
 
            </span>    
 
                     </Form.Group>
      
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
          
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                  <Button disabled className='btn btn-success' type='submit' form='payment' style={{marginLeft:'10px'}}>Add Certified Amount</Button>
                     </span>    
                    
                     </Form.Group>
                     </Col>
                    

                      </form> 
                      </Row> 
                    
    :
    null
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
               <Card.Title tag="h5" className='p-3'><u >Offer & Contract</u></Card.Title>
             </>
             <Card.Body style={{ padding:5 }}>
             <div className="legend">
             <Row>
              <Col md="6 mb-2">

              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   
                   <p><strong>Project Name & Refrence </strong></p> &nbsp;&nbsp;&nbsp;
                   
 
                     <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='' disabled title='Offer'>
                  <option value="Via email" selected >{single.project_id} - {single.project_name}</option>
                   
 
                     </select>
 
                     </span>    
 
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   
                   <p><strong>Project Manager Name</strong></p> &nbsp;&nbsp;&nbsp;
                   
 
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
                  
                  <p><strong>Offer Approval Method</strong></p> &nbsp;&nbsp;&nbsp;
                  

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
 
                   <p><strong>Draft Contract issuance</strong></p> &nbsp;&nbsp;&nbsp;
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
  
                     <p><strong>Draft Contract Negotiation Status</strong></p> &nbsp;&nbsp;&nbsp;
              
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
 
                    <p><strong>Original Contract Receipt</strong></p> &nbsp;&nbsp;&nbsp;
 

                  
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
 
                   <p><strong>Original Contract signature by NLG</strong></p> &nbsp;&nbsp;&nbsp;
               
                    
                  
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
 
                   <p><strong>Original Contract countersigned receipt</strong></p> &nbsp;&nbsp;&nbsp;
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
                  


                     <Col md="6 mb-2"
                        style={{
                          backgroundColor: '#e0eaf2',
                        }}
                        
                     >
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
  
                     <p><strong>Facade Area(SQM)</strong></p> &nbsp;&nbsp;&nbsp;
                     <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='facadearea' defaultValue={scproject.facadearea}></input>
                       </span>    
 
                     </Form.Group>
 
                <Form.Group className="mb-4 form-inline" controlId="formBasicEmail">
                   
                <span className='form-inline input-group'>  
 
                  <p><strong>Contract Amount(AED)</strong></p> &nbsp;&nbsp;&nbsp;
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='contractamount' defaultValue={
                   currencyFormat(scproject.contractamount)}></input>
                    </span>   

                    </Form.Group>
               

                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Total VOs Amount</strong></p> &nbsp;&nbsp;&nbsp;
           
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={currencyFormat(totalvari) } disabled name='TotalVOsAmount'></input>
                      
                     </span>    
 
 
                     </Form.Group>


                     
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Accumulated Offer Amount(AED)</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='accumulated_offer_amount' disabled defaultValue={currencyFormat(totalvari+scproject.contractamount)}></input>
                     </span>    
 
 
                     </Form.Group>

                     <Form.Group className=" form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   
                     </span>    
 
                     {(1.05*scproject.accumulatedcertamount) > ((totalvari+scproject.contractamount))?
                      <p style={{color:'red'}}>Accumulated Certified Amount :&nbsp; <strong style={{color:'red'}}>{currencyFormat((1.05*scproject.accumulatedcertamount))}</strong></p>
                      
                    
                     :
                     <p>Accumulated Certified Amount :&nbsp; <strong>{currencyFormat((1.05*scproject.accumulatedcertamount))}</strong></p>
                     
                     
                    }
 
                     </Form.Group>

                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Balance to Certify: </p> &nbsp;&nbsp; <strong>{currencyFormat(scproject.balance2certify)}</strong>&nbsp;&nbsp;&nbsp;
                     </span>    
 
 
                     </Form.Group>
                     
                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
                   {(scproject.accumulatedinvamount) > ((1.05*scproject.accumulatedcertamount))?
                    
                   <><p  style={{color:'red'}}>Accumulated Invoice Amount: </p> &nbsp;&nbsp; <strong style={{color:'red'}}>{currencyFormat(scproject.accumulatedinvamount)}</strong>&nbsp;&nbsp;&nbsp;</> 
                    
                   
                    :
                    <>  <p>Accumulated Invoice Amount: </p> &nbsp;&nbsp; <strong>{currencyFormat(scproject.accumulatedinvamount)}</strong>&nbsp;&nbsp;&nbsp;</>
                    
                   }
                    </span>    
 
 
                     </Form.Group>

                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Balance to Invoice: </p> &nbsp;&nbsp; <strong>{currencyFormat(scproject.balance2invoice)}</strong>&nbsp;&nbsp;&nbsp;
                   </span>    
 
 
                     </Form.Group>

                     
                     <Form.Group className="form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Accumulated Collected Amount: </p> &nbsp;&nbsp; <strong>{currencyFormat(scproject.accumulatedcollectedamount)}</strong>&nbsp;&nbsp;&nbsp;
                   </span>    
 
                     </Form.Group>

                     
                     <Form.Group className=" form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p>Balance to Collect: </p> &nbsp;&nbsp; <strong>{currencyFormat(scproject.balance2collect)}</strong>&nbsp;&nbsp;&nbsp;
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
               <Card.Title tag="h5" className='p-3'><u>Required IFC</u></Card.Title>
             </>
             <Card.Body style={{padding:5}}>


                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>IFC Drawings</strong></p> &nbsp;&nbsp;&nbsp;
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


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Structural Drawings</strong></p> &nbsp;&nbsp;&nbsp;
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
                 
                   <p><strong>Architectural Drawings</strong></p> &nbsp;&nbsp;&nbsp;
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
 
                   <p><strong>ID Drawings</strong></p> &nbsp;&nbsp;&nbsp;
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




         <Col md="2 mb-2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Shop Drawings</u></Card.Title>
             </>
             <Card.Body style={{padding:13}}>


                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>SD Schedule Status</strong></p> &nbsp;&nbsp;&nbsp;
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
 
                   <p><strong>SD Scheduled Startup Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_scheduled_startup_date' defaultValue={scproject.sd_scheduled_startup_date}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>SD Scheduled Endup Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_scheduled_endup_date' defaultValue={scproject.sd_scheduled_endup_date}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>SD Preparation Status</strong></p> &nbsp;&nbsp;&nbsp;

               

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
                     
                     
                   <p><strong>SD Submission Status</strong></p> &nbsp;&nbsp;&nbsp;

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
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>SD Approval Status</strong></p> &nbsp;&nbsp;&nbsp;
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
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Latest SD Revision</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='latest_sd_revision' defaultValue={scproject.latest_sd_revision}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>SD Approval Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='sd_approval_date' defaultValue={scproject.sd_approval_date}></input>
                  
                     </span>    
                     </Form.Group>
             </Card.Body>
            
           </Card>
         </Col>



  

         <Col md="3 mb-2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Material Submittal</u></Card.Title>
             </>
             <Card.Body style={{padding:5}}>


                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Glass Sample Preparation Status</strong></p> &nbsp;&nbsp;&nbsp;
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
 
                   <p><strong>Frame color Preparation Status</strong></p> &nbsp;&nbsp;&nbsp;
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
 
                   <p><strong>Material Submission Status</strong></p> &nbsp;&nbsp;&nbsp;
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
 
                   <p><strong>Glass Approval Status</strong></p> &nbsp;&nbsp;&nbsp;

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
 
                   <p><strong>Approved Glass Type</strong></p> &nbsp;&nbsp;&nbsp;
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
                                        
                   <p><strong>Frame Finishing Approval</strong></p> &nbsp;&nbsp;&nbsp;

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
 
                   <p><strong>AC</strong></p> &nbsp;&nbsp;&nbsp;
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
 
                   <p><strong>Glass Approval Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='glass_approval_date' defaultValue={scproject.glass_approval_date}></input>
                  
                     </span>    
                     </Form.Group>


                     
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Color Approval Date</strong></p> &nbsp;&nbsp;&nbsp;
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
                  
                  
                   <p><strong>MTO Taking</strong></p> &nbsp;&nbsp;&nbsp;
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
                   <p><strong>Aluminium Order Status</strong></p> &nbsp;&nbsp;&nbsp;

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
 
                   <p><strong>Aluminium System ETA</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='aluminium_system_eta' defaultValue={scproject.aluminium_system_eta}></input>
                  
                     </span>    
                     </Form.Group>
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Glass booking Status</strong></p> &nbsp;&nbsp;&nbsp;


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
 
                   <p><strong>Glass Sheet ETA</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='glass_sheets_eta' defaultValue={scproject.glass_sheets_eta}></input>
                  
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Powder MTO Taking</strong></p> &nbsp;&nbsp;&nbsp;

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
 
                   <p><strong>Powder Order Status</strong></p> &nbsp;&nbsp;&nbsp;
                   
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
 
                   <p><strong>Powder ETA</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='powder_eta' defaultValue={scproject.powder_eta}></input>
                  
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
             <Card.Body style={{}}>
                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Site Readiness</strong></p> &nbsp;&nbsp;&nbsp;

                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Site Readiness'){
                                          if(scproject.site_readiness==parameter.paravalue){
                                            siteready=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:siteready}} class="form-select form-select-sm" aria-label=".form-select-sm example" name='site_readiness' >
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

                 
                        </select>
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Site Measurements Status</strong></p> &nbsp;&nbsp;&nbsp;
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
                     class="form-select form-select-sm" aria-label=".form-select-sm example" name='site_measurements_status' >
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
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Aluminium orders release Status</strong></p> &nbsp;&nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Aluminium orders release Status'){
                                          if(scproject.aluminium_order_release_status==parameter.paravalue){
                                            aorderrelease=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:aorderrelease}} class="form-select form-select-sm" aria-label=".form-select-sm example" name='aluminium_order_release_status' >
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
                     </span>    
                     </Form.Group>


                     

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Glass orders release Status</strong></p> &nbsp;&nbsp;&nbsp;
                   {
                                      parameters.map((parameter,i)=>{
                                        if(parameter.paracontrol=='Glass Order release Status'){
                                          if(scproject.glass_order_release_status==parameter.paravalue){
                                            glassorderrelease=parameter.paracolor
                                          }
                                    
                                        }
                                      })
                        }


                    <select  style={{backgroundColor:glassorderrelease}}  class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_order_release_status' >
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
                     </span>    
                     </Form.Group>


  

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Fabrication Status</strong></p> &nbsp;&nbsp;&nbsp;
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
                     </span>    
                     </Form.Group>




                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Installation Status</strong></p> &nbsp;&nbsp;&nbsp;
                   
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
 
                   <p><>Drawings Preparation Status</></p> &nbsp;&nbsp;&nbsp;

                   
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
 
                   <p><>Drawings Submission Status</></p> &nbsp;&nbsp;&nbsp;

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
 
                   <p><>Drawings Submission Date</></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='as_built_drawings_submission_date' defaultValue={scproject.as_built_drawings_submission_date}></input>
                  
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><>Documents Preparation</></p> &nbsp;&nbsp;&nbsp;

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
 
                   <p><>Documents Submission</></p> &nbsp;&nbsp;&nbsp;
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
 
                   <p><strong>Estimated Startup Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='snagging_desnags_esd' defaultValue={scproject.snagging_desnags_esd}></input>
                  
                     </span>    
                     </Form.Group>

                           
             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Estimated End Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='snagging_desnags_efd' defaultValue={scproject.snagging_desnags_efd}></input>
                  
                     </span>    
                     </Form.Group>

                     
   
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>TOC issuance Status</strong></p> &nbsp;&nbsp;&nbsp;
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
 
                   <p><strong>TOC Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='toc_date' defaultValue={scproject.toc_date}></input>
                  
                     </span>    
                     </Form.Group>
                     
             </Card.Body>
            
           </Card>
           {/* <span className='mt-4' style={{display:'grid'}}><button disabled type='submit' form="main" className='btn btn-danger'>Update Records</button> </span> */}
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

 



     
                                     </div>
                                     </div>
                                     </Fragment>
                                )
                        })
                //})


                
                

            )

 
            
                        }
}

export default AccountsProjectDetails