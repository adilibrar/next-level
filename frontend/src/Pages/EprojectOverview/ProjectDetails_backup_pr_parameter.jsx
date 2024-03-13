import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
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
import { useHistory } from "react-router-dom";
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
  const check_login=sessionStorage.getItem('login');
  const [loading,setLoading]=useState(true);
  const[parameters,setparameters]=useState([]);
  
  
  const[totalvari,settotalvari]=useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [dirty, setDirty] = React.useState(false);
  const markFormDirty = () => setDirty(true);
  const [projectpayments, setProjectPayments] = useState(true);
  let pays=0
    pays=location.state.payreturn;
  let vars=0
     vars=location.state.varreturn;
  const [varshow, setvarshow] = useState(vars);
  const [paysshow, setpaysshow] = useState(pays);

  const[paymentdiv,setpaymentshow]=useState(false);

  const[certified,setcertified]=useState(false);
  const[transaction,settransaction]=useState(false);
  useEffect(()=>{
      if(!check_login){
          navigate('/login')
        }
     
        getstockDetails();
 window.addEventListener('popstate', (event) => {
          //event.preventDefault();
     
            cogoToast.error("You Can not use this button to go back, Please use designated button to go back ,your unsaved data will be Lost ...",{hideAfter:10});
       
          
            window.removeEventListener('popstate')
      });
        
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
    contractamount:e.target.contractamount.value,
    accumulated_offer_amount:e.target.accumulated_offer_amount.value,
    ifc_drawings:e.target.ifc_drawings.value,
    structural_drawings:e.target.accumulated_offer_amount.value,
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
           
            //forceUpdate();
          }
          else{
            cogoToast.error('Something Went Wrong...')
          }
          e.target.reset();
          forceUpdate();
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
        singleProject.map((single,sr)=>{
          manager=single.projectmanagerid
        })

        const data={
          projectid:project_id,
          pmid:manager,
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
                                   <Col md="4"><button className='btn btn-danger'  onClick={(e)=> goback(e,single.projectstatus)} ><i className='fa fa-arrow-left'></i> Go Back</button>&nbsp;&nbsp;&nbsp;
                                   <button className='btn btn-danger'  onClick={(e)=> mainpage(e,single.projectstatus)} ><i className='fa fa-arrow-left'></i> Homepage</button>
                                   </Col>
                                   
                                   </Row>
                                   <hr></hr>
          

{

  
    projects.map((scproject,sr)=>{
        return(
           
    <Row>
      <form  onSubmit={UpdateRecords} onChange={markFormDirty} id='main'>
    <Row  className='mt-2'>
         <Col md="12 mb-2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u >Offer & Contract</u></Card.Title>
             </>
             <Card.Body style={{  }}>
             <div className="legend">
             <Row>
              <Col md="4 mb-2">

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
                   { scproject.offer_approval_method=='Via email' ? 
                   <option value="Via email" selected >Via email</option>
                   : 
                   <option value="Via email">Via email</option>
                   }

                  { scproject.offer_approval_method=='Verbally' ? 
                   <option value="Verbally" selected >Verbally</option>
                   : 
                   <option value="Verbally" >Verbally</option>
                   }
                    
                    { scproject.offer_approval_method=='Via PO' ? 
                   <option value="Via PO" selected >Via PO</option>
                   : 
                   <option value="Via PO" >Via PO</option>
                   }

                    </select>



               

                    </span>    

                    </Form.Group>

                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Draft Contract issuance</strong></p> &nbsp;&nbsp;&nbsp;
                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='draft_contract_issuance' title='Offer'>
                   <option></option>
                   { scproject.draft_contract_issuance=='Issued' ? 
                   <option value="Issued" selected >Issued</option>
                   : 
                   <option value="Issued">Issued</option>
                   }

                  { scproject.draft_contract_issuance=='NO' ? 
                   <option value="No" selected >No</option>
                   : 
                   <option value="No" >No</option>
                   }
                    
                    { scproject.draft_contract_issuance=='PO' ? 
                   <option value="PO" selected >PO</option>
                   : 
                   <option value="PO" >PO</option>
                   }

                    </select>
                     </span>    
                 
                     </Form.Group>


                     </Col>
                     <Col md="4 mb-2">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
  
                     <p><strong>Draft Contract Negotiation Status</strong></p> &nbsp;&nbsp;&nbsp;
              

                     
                  


{/* 
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
 */}





                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='draft_contract_negotiation_status' title='Offer'>
                    <option></option>
                   { scproject.draft_contract_negotiation_status=='Approved' ? 
                   <option value="Approved" selected >Approved</option>
                   : 
                   <option value="Approved">Approved</option>
                   }

                  { scproject.draft_contract_negotiation_status=='Under Revision' ? 
                   <option value="Under Revision" selected >Under Revision</option>
                   : 
                   <option value="Under Revision" >Under Revision</option>
                   }

                   
                  { scproject.draft_contract_negotiation_status=='Under Negotiation' ? 
                   <option value="Under Negotiation" selected >Under Negotiation</option>
                   : 
                   <option value="Under Negotiation" >Under Negotiation</option>
                   }
                    
                    { scproject.draft_contract_negotiation_status=='NA' ? 
                   <option value="NA" selected >NA</option>
                   : 
                   <option value="NA" >NA</option>
                   }

                    </select>



                       </span>    
 
                     </Form.Group>
 
                <Form.Group className="mb-4 form-inline" controlId="formBasicEmail">
                   
                  <span className='form-inline input-group'>  
 
                    <p><strong>Original Contract Receipt</strong></p> &nbsp;&nbsp;&nbsp;
 

                  
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='original_contract_receipt' title='Offer'>
                    <option></option>
                   { scproject.original_contract_receipt=='Received' ? 
                   <option value="Received" selected >Received</option>
                   : 
                   <option value="Received">Received</option>
                   }

                  { scproject.original_contract_receipt=='No' ? 
                   <option value="No" selected >No</option>
                   : 
                   <option value="No" >No</option>
                   }
                    
                    { scproject.original_contract_receipt=='NA' ? 
                   <option value="NA" selected >NA</option>
                   : 
                   <option value="NA" >NA</option>
                   }

                    </select>

                      </span>    

                    </Form.Group>

                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Original Contract signature by NLG</strong></p> &nbsp;&nbsp;&nbsp;
               
                    
                  
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='original_contract_signature_by_nlg' title='Offer'>
                    <option></option>
                   { scproject.original_contract_signature_by_nlg=='Done' ? 
                   <option value="Done" selected >Done</option>
                   : 
                   <option value="Done">Done</option>
                   }

                  { scproject.original_contract_signature_by_nlg=='Not Yet' ? 
                   <option value="Not Yet" selected >Not Yet</option>
                   : 
                   <option value="Not Yet" >Not Yet</option>
                   }
                    
                    { scproject.original_contract_signature_by_nlg=='NA' ? 
                   <option value="NA" selected >NA</option>
                   : 
                   <option value="NA" >NA</option>
                   }

                    </select>
                     </span>    
 
 

                     </Form.Group>

                     
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Original Contract countersigned receipt</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='original_contract_countersigned_receipt' title='Offer'>
                    <option></option>
                      { scproject.original_contract_countersigned_receipt=='Received' ? 
                      <option value="Received" selected >Received</option>
                      : 
                      <option value="Received">Received</option>
                      }

                      { scproject.original_contract_countersigned_receipt=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
                      }
                        
                        { scproject.original_contract_countersigned_receipt=='NA' ? 
                      <option value="NA" selected >NA</option>
                      : 
                      <option value="NA" >NA</option>
                      }

                        </select>
                     </span>    
 
 
                     </Form.Group>
                     </Col>


                     <Col md="4 mb-2">
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
  
                     <p><strong>Facade Area(SQM)</strong></p> &nbsp;&nbsp;&nbsp;
                     <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='facadearea' defaultValue={scproject.facadearea}></input>
                       </span>    
 
                     </Form.Group>
 
                <Form.Group className="mb-4 form-inline" controlId="formBasicEmail">
                   
                  <span className='form-inline input-group'>  
 
                    <p><strong>Contract Amount(AED)</strong></p> &nbsp;&nbsp;&nbsp;
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='contractamount' defaultValue={scproject.contractamount}></input>
                      </span>    

                    </Form.Group>
               

                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Total VOs Amount</strong></p> &nbsp;&nbsp;&nbsp;
           
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={totalvari} disabled name='TotalVOsAmount'></input>
                      
                     </span>    
 
 
                     </Form.Group>


                     
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   
                   <span className='form-inline input-group'>  
 
                   <p><strong>Accumulated Offer Amount(AED)</strong></p> &nbsp;&nbsp;&nbsp;
                   
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='accumulated_offer_amount' defaultValue={scproject.accumulated_offer_amount}></input>
                     </span>    
 
 
                     </Form.Group>
                     </Col>
             </Row>
  
               </div>
             </Card.Body>
            
           </Card>
         </Col>

         

         <Col md="6 mb-2 mt-4">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Requird IFC</u></Card.Title>
             </>
             <Card.Body style={{}}>


                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>IFC Drawings</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='ifc_drawings' title='Offer'>
                    <option></option>
                      { scproject.ifc_drawings=='Received' ? 
                      <option value="Received" selected >Received</option>
                      : 
                      <option value="Received">Received</option>
                      }

                      { scproject.ifc_drawings=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
                      }
                        
                        { scproject.ifc_drawings=='Not Available' ? 
                      <option value="Not Available" selected >Not Available</option>
                      : 
                      <option value="Not Available" >Not Available</option>
                      }

                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Structural Drawings</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='structural_drawings' title='Offer'>
                    <option></option>
                      { scproject.structural_drawings=='Received' ? 
                      <option value="Received" selected >Received</option>
                      : 
                      <option value="Received">Received</option>
                      }

                      { scproject.structural_drawings=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
                      }
                        
                        { scproject.structural_drawings=='Not Available' ? 
                      <option value="Not Available" selected >Not Available</option>
                      : 
                      <option value="Not Available" >Not Available</option>
                      }

                        </select>
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Architectural Drawings</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='architectural_drawings' title='Offer'>
                    <option></option>
                      { scproject.architectural_drawings=='Received' ? 
                      <option value="Received" selected >Received</option>
                      : 
                      <option value="Received">Received</option>
                      }

                      { scproject.architectural_drawings=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
                      }
                        
                        { scproject.architectural_drawings=='Not Available' ? 
                      <option value="Not Available" selected >Not Available</option>
                      : 
                      <option value="Not Available" >Not Available</option>
                      }

                        </select>
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>ID Drawings</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='id_drawings' title='Offer'>
                    <option></option>
                      { scproject.id_drawings=='Received' ? 
                      <option value="Received" selected >Received</option>
                      : 
                      <option value="Received">Received</option>
                      }

                      { scproject.id_drawings=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
                      }
                        
                        { scproject.id_drawings=='Not Available' ? 
                      <option value="Not Available" selected >Not Available</option>
                      : 
                      <option value="Not Available" >Not Available</option>
                      }

                        </select>
                     </span>    
                     </Form.Group>
           
             </Card.Body>
            
           </Card>
         </Col>


         <Col md="6 mb-2 mt-4">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Remarks</u></Card.Title>
             </>
             <Card.Body style={{}}>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                 <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" name='remarks'>{scproject.remarks}</textarea>
                     </span>    
                     </Form.Group>
           
             </Card.Body>
            
           </Card>
         </Col>



         <Col md="4 mb-2 mt-4">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Shop Drawings</u></Card.Title>
             </>
             <Card.Body style={{}}>


                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>SD Schedule Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_schedule_status' >
                    <option></option>
                      { scproject.sd_schedule_status=='Scheduled' ? 
                      <option value="Scheduled" selected >Scheduled</option>
                      : 
                      <option value="Scheduled">Scheduled</option>
                      }

                      { scproject.sd_schedule_status=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
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
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_preparation_status' title='Offer'>
                    <option></option>
                      { scproject.sd_preparation_status=='Started' ? 
                      <option value="Started" selected >Started</option>
                      : 
                      <option value="Started">Started</option>
                      }

                      { scproject.sd_preparation_status=='Not Yet Started' ? 
                      <option value="Not Yet Started" selected >Not Yet Started</option>
                      : 
                      <option value="Not Yet Started" >Not Yet Started</option>
                      }
                        
                        { scproject.sd_preparation_status=='Completed' ? 
                      <option value="Completed" selected >Completed</option>
                      : 
                      <option value="Completed" >Completed</option>
                      }

                        </select>
                     </span>    
                     </Form.Group>
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
                     
                   <p><strong>SD Submission Status</strong></p> &nbsp;&nbsp;&nbsp;
                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_submission_status' title='Offer'>
                   <option></option>
                      { scproject.sd_submission_status=='Not yet' ? 
                      <option value="Not yet" selected >Started</option>
                      : 
                      <option value="Not yet">Not yet</option>
                      }

                      { scproject.sd_submission_status=='Partially Submitted' ? 
                      <option value="Partially Submitted" selected >Partially Submitted</option>
                      : 
                      <option value="Partially Submitted" >Partially Submitted</option>
                      }
                        
                        { scproject.sd_submission_status=='Fully Submitted' ? 
                      <option value="Fully Submitted" selected >Fully Submitted</option>
                      : 
                      <option value="Fully Submitted" >Fully Submitted</option>
                      }

                        </select>
                     </span>    
                     </Form.Group>

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>SD Approval Status</strong></p> &nbsp;&nbsp;&nbsp;
                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='sd_approval_status' title='Offer'>
                    <option></option>
                      { scproject.sd_preparation_status=='Approved' ? 
                      <option value="Approved" selected >Approved</option>
                      : 
                      <option value="Approved">Approved</option>
                      }
                      
                      { scproject.sd_approval_status=='Revise and resubmit' ? 
                      <option value="Revise and resubmit" selected >Revise and resubmit</option>
                      : 
                      <option value="Revise and resubmit">Revise and resubmit</option>
                      }

                      { scproject.sd_preparation_status=='Rejected' ? 
                      <option value="Rejected" selected >Rejected</option>
                      : 
                      <option value="Rejected">Rejected</option>
                      }

                      { scproject.sd_preparation_status=='Partially Approved' ? 
                      <option value="Partially Approved" selected >Partially Approved</option>
                      : 
                      <option value="Partially Approved">Partially Approved</option>
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



         <Col md="4 mb-2 mt-4">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Material Submittal</u></Card.Title>
             </>
             <Card.Body style={{}}>


                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Glass Sample Preparation Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_sample_preparation_status' >
                    <option></option>
                      { scproject.glass_sample_preparation_status=='Requested' ? 
                      <option value="Requested" selected >Requested</option>
                      : 
                      <option value="Requested">Requested</option>
                      }

                      { scproject.glass_sample_preparation_status=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
                      }
                 
                 
                    { scproject.glass_sample_preparation_status=='Received' ? 
                          <option value="Received" selected >Received</option>
                          : 
                          <option value="Received">Received</option>
                      }
                 
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Frame color Preparation Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='frame_color_preparation_status' >
                    <option></option>
                      { scproject.frame_color_preparation_status=='Requested' ? 
                      <option value="Requested" selected >Requested</option>
                      : 
                      <option value="Requested">Requested</option>
                      }

                      { scproject.frame_color_preparation_status=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
                      }
                 
                 
                    { scproject.frame_color_preparation_status=='Received' ? 
                          <option value="Received" selected >Received</option>
                          : 
                          <option value="Received">Received</option>
                      }
                 
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Material Submission Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='material_submission_status' >
                    <option></option>
                      { scproject.material_submission_status=='Prepared' ? 
                      <option value="Prepared" selected >Prepared</option>
                      : 
                      <option value="Prepared">Prepared</option>
                      }

                      { scproject.material_submission_status=='Not Yet' ? 
                      <option value="Not Yet" selected >Not Yet</option>
                      : 
                      <option value="Not Yet" >Not Yet</option>
                      }
                 
                 
                    { scproject.material_submission_status=='Submitted' ? 
                          <option value="Submitted" selected >Submitted</option>
                          : 
                          <option value="Submitted">Submitted</option>
                      }
                 
                        </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Glass Approval Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_approval_status' >
                    <option></option>
                      { scproject.glass_approval_status=='Approved' ? 
                      <option value="Approved" selected >Approved</option>
                      : 
                      <option value="Approved">Approved</option>
                      }

                 
                 
                    { scproject.glass_approval_status=='Undecided' ? 
                          <option value="Undecided" selected >Undecided</option>
                          : 
                          <option value="Undecided">Undecided</option>
                      }
                  { scproject.glass_approval_status=='Rejected' ? 
                          <option value="Rejected" selected >Rejected</option>
                          : 
                          <option value="Rejected">Rejected</option>
                      }
                        </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Approved Glass Type</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='approved_glass_type' defaultValue={scproject.approved_glass_type}></input>
                  
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Frame Finishing Approval</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='frame_finishing_approval' >
                    <option></option>
                      { scproject.frame_finishing_approval=='Approved' ? 
                      <option value="Approved" selected >Approved</option>
                      : 
                      <option value="Approved">Approved</option>
                      }

                 
                 
                    { scproject.frame_finishing_approval=='Undecided' ? 
                          <option value="Undecided" selected >Undecided</option>
                          : 
                          <option value="Undecided">Undecided</option>
                      }
                  { scproject.frame_finishing_approval=='Rejected' ? 
                          <option value="Rejected" selected >Rejected</option>
                          : 
                          <option value="Rejected">Rejected</option>
                      }
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Approved Color</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='approved_color' defaultValue={scproject.approved_color}></input>
                  
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


         
         <Col md="4 mb-2 mt-4">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Procurement</u></Card.Title>
             </>
             <Card.Body style={{}}>
                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
                  
                  
                   <p><strong>MTO Taking</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='mto_taking' >
                      <option></option>
                      { scproject.mto_taking=='Not Started' ? 
                      <option value="Not Started" selected >Not Started</option>
                      : 
                      <option value="Not Started">Not Started</option>
                      }

                    { scproject.mto_taking=='Ongoing' ? 
                          <option value="Ongoing" selected >Ongoing</option>
                          : 
                          <option value="Ongoing">Ongoing</option>
                      }

                    { scproject.mto_taking=='Completed' ? 
                          <option value="Completed" selected >Completed</option>
                          : 
                          <option value="Completed">Completed</option>
                      }
                 
                 
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
                        {scproject.alumunium_system_order_status}
                   <p><strong>Aluminium System Order Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='alumunium_system_order_status' >
                      <option></option>
                      { scproject.alumunium_system_order_status=='Order Partially Placed' ? 
                      <option value="Order Partially Placed" selected >Order Partially Placed</option>
                      : 
                      <option value="Order Partially Placed">Order Partially Placed</option>
                      }

                      { scproject.alumunium_system_order_status=='Not Yet Ordered' ? 
                      <option value="Not Yet Ordered" selected >Not Yet Ordered</option>
                      : 
                      <option value="Not Yet Ordered" >Not Yet Ordered</option>
                      }
                 
                 
                    { scproject.alumunium_system_order_status=='Order Fully Placed' ? 
                          <option value="Order Fully Placed" selected >Order Fully Placed</option>
                          : 
                          <option value="Order Fully Placed">Order Fully Placed</option>
                      }
                 

                 { scproject.alumunium_system_order_status=='Fully Available in Stock' ? 
                          <option value="Fully Available in Stock" selected >Fully Available in Stock</option>
                          : 
                          <option value="Fully Available in Stock">Fully Available in Stock</option>
                      }
                 

                 { scproject.alumunium_system_order_status=='Partially Available in Stock & balance Ordered' ? 
                          <option value="Partially Available in Stock & balance Ordered" selected >Partially Available in Stock & balance Ordered</option>
                          : 
                          <option value="Partially Available in Stock & balance Ordered">Partially Available in Stock & balance Ordered</option>
                      }

                  { scproject.alumunium_system_order_status=='Partially Available in Stock & Balance not yet Ordered' ? 
                          <option value="Partially Available in Stock & Balance not yet Ordered" selected >Partially Available in Stock & Balance not yet Ordered</option>
                          : 
                          <option value="Partially Available in Stock & Balance not yet Ordered">Partially Available in Stock & Balance not yet Ordered</option>
                      }

                      
                    { scproject.alumunium_system_order_status=='Fully Received' ? 
                                              <option value="Fully Received" selected >Fully Received</option>
                                              : 
                                              <option value="Fully Received">Fully Received</option>
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
 
                   <p><strong>Glass Sheet booking Status</strong></p> &nbsp;&nbsp;&nbsp;
                   <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_sheets_booking_status' >
                   <option></option>

                    { scproject.glass_sheets_booking_status=='Booked' ? 
                          <option value="Booked" selected >Booked</option>
                          : 
                          <option value="Booked">Booked</option>
                      }

                    { scproject.glass_sheets_booking_status=='Not Booked' ? 
                          <option value="Not Booked" selected >Not Booked</option>
                          : 
                          <option value="Not Booked">Not Booked</option>
                      }

                  { scproject.glass_sheets_booking_status=='Partially Available' ? 
                          <option value="Partially Available" selected >Partially Available</option>
                          : 
                          <option value="Partially Available">Partially Available</option>
                      }

                    { scproject.glass_sheets_booking_status=='Available in Stock' ? 
                          <option value="Available in Stock" selected >Available in Stock</option>
                          : 
                          <option value="Available in Stock">Available in Stock</option>
                      }

                    { scproject.glass_sheets_booking_status=='Fully Received' ? 
                          <option value="Fully Received" selected >Fully Received</option>
                          : 
                          <option value="Fully Received">Fully Received</option>
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
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='powder_mto_taking' >
                    <option></option>
                      { scproject.powder_mto_taking=='Not Yet Started' ? 
                      <option value="Not Yet Started" selected >Not Yet Started</option>
                      : 
                      <option value="Not Yet Started">Not Yet Started</option>
                      }

                    { scproject.powder_mto_taking=='Completed' ? 
                          <option value="Completed" selected >Completed</option>
                          : 
                          <option value="Completed">Completed</option>
                      }
                 
                 
                        </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Powder Order Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='powder_order_status' >
                    <option></option>
                      { scproject.powder_order_status=='Ordered' ? 
                      <option value="Ordered" selected >Ordered</option>
                      : 
                      <option value="Ordered">Ordered</option>
                      }

                   
                  { scproject.powder_order_status=='Available in Stock' ? 
                          <option value="Available in Stock" selected >Available in Stock</option>
                          : 
                          <option value="Available in Stock">Available in Stock</option>
                      }
                 
                 { scproject.powder_order_status=='Partially available & balance Ordered' ? 
                          <option value="Partially available & balance Ordered" selected >Partially available & balance Ordered</option>
                          : 
                          <option value="Partially available & balance Ordered">Partially available & balance Ordered</option>
                      }
                 

                 { scproject.powder_order_status=='Partially available & Balance not yet ordered' ? 
                          <option value="Partially available & Balance not yet ordered" selected >Partially available & Balance not yet ordered</option>
                          : 
                          <option value="Partially available & Balance not yet ordered">Partially available & Balance not yet ordered</option>
                      }
                 
                      
                    { scproject.powder_order_status=='Fully Received' ? 
                                              <option value="Fully Received" selected >Fully Received</option>
                                              : 
                                              <option value="Fully Received">Fully Received</option>
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


                 
         <Col md="4 mb-2 mt-4">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Design Fabrication & Installation</u></Card.Title>
             </>
             <Card.Body style={{}}>
                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Site Readiness</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='site_readiness' >
                    <option></option>
                      { scproject.site_readiness=='Not Ready' ? 
                      <option value="Not Ready" selected >Not Ready</option>
                      : 
                      <option value="Not Ready">Not Ready</option>
                      }

                    { scproject.site_readiness=='Partially Ready' ? 
                          <option value="Partially Ready" selected >Partially Ready</option>
                          : 
                          <option value="Partially Ready">Partially Ready</option>
                      }

                    { scproject.site_readiness=='Fully Ready' ? 
                          <option value="Fully Ready" selected >Fully Ready</option>
                          : 
                          <option value="Fully Ready">Fully Ready</option>
                      }
                 
                 
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Site Measurements Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='site_measurements_status' >
                    <option></option>
                    { scproject.glass_sheets_booking_status=='Not yet Taken' ? 
                          <option value="Not yet Taken" selected >Not yet Taken</option>
                          : 
                          <option value="Not yet Taken">Not yet Taken</option>
                      }

                

                           
                    { scproject.glass_sheets_booking_status=='partially Taken' ? 
                          <option value="partially Taken" selected >partially Taken</option>
                          : 
                          <option value="partially Taken">partially Taken</option>
                      }

                  
                      
                    { scproject.glass_sheets_booking_status=='partially Taken & Approved' ? 
                          <option value="partially Taken & Approved" selected >partially Taken & Approved</option>
                          : 
                          <option value="partially Taken & Approved">partially Taken & Approved</option>
                      }

                    { scproject.glass_sheets_booking_status=='Fully Taken' ? 
                          <option value="Fully Taken" selected >Fully Taken</option>
                          : 
                          <option value="Fully Taken">Fully Taken</option>
                      }

                      { scproject.glass_sheets_booking_status=='Fully Taken & Approved' ? 
                          <option value="Fully Taken & Approved" selected >Fully Taken & Approved</option>
                          : 
                          <option value="Fully Taken & Approved">Fully Taken & Approved</option>
                      }

                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Aluminium orders release Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='aluminium_order_release_status' >
                    <option></option>

                    { scproject.aluminium_order_release_status=='Not yet released' ? 
                          <option value="Not yet released" selected >Not yet released</option>
                          : 
                          <option value="Not yet released">Not yet released</option>
                      }
                       { scproject.aluminium_order_release_status=='Partially Released' ? 
                          <option value="Partially Released" selected >Partially Released</option>
                          : 
                          <option value="Partially Released">Partially Released</option>
                      }

                      { scproject.aluminium_order_release_status=='Fully Released' ? 
                          <option value="Fully Released" selected >Fully Released</option>
                          : 
                          <option value="Fully Released">Fully Released</option>
                      }

                { scproject.aluminium_order_release_status=='Completed' ? 
                          <option value="Completed" selected >Completed</option>
                          : 
                          <option value="Completed">Completed</option>
                      }
                                    
                        </select>
                     </span>    
                     </Form.Group>


                     

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Glass orders release Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='glass_order_release_status' >
                    <option></option>

                    { scproject.glass_order_release_status=='Not yet released' ? 
                          <option value="Not yet released" selected >Not yet released</option>
                          : 
                          <option value="Not yet released">Not yet released</option>
                      }
                       { scproject.glass_order_release_status=='Partially Released' ? 
                          <option value="Partially Released" selected >Partially Released</option>
                          : 
                          <option value="Partially Released">Partially Released</option>
                      }

                      { scproject.glass_order_release_status=='Fully Released' ? 
                          <option value="Fully Released" selected >Fully Released</option>
                          : 
                          <option value="Fully Released">Fully Released</option>
                      }

                { scproject.glass_order_release_status=='Completed' ? 
                          <option value="Completed" selected >Completed</option>
                          : 
                          <option value="Completed">Completed</option>
                      }
                                    
                        </select>
                     </span>    
                     </Form.Group>


  

                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Fabrication Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='fabrication_status' >
                    <option></option>


                      { scproject.fabrication_status=='Not Started' ? 
                          <option value="Not Started" selected >Not Started</option>
                          : 
                          <option value="Not Started">Not Started</option>
                      }
                      { scproject.fabrication_status=='On Going' ? 
                                <option value="On Going" selected >On Going</option>
                                : 
                                <option value="On Going">On Going</option>
                            }
                        { scproject.fabrication_status=='Completed' ? 
                          <option value="Completed" selected >Completed</option>
                          : 
                          <option value="Completed">Completed</option>
                      }
                                    
                        </select>
                     </span>    
                     </Form.Group>




                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Installation Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='installation_status' >
                    <option></option>


                      { scproject.installation_status=='Not Started' ? 
                          <option value="Not Started" selected >Not Started</option>
                          : 
                          <option value="Not Started">Not Started</option>
                      }
                      { scproject.installation_status=='On Going' ? 
                                <option value="On Going" selected >On Going</option>
                                : 
                                <option value="On Going">On Going</option>
                            }
                        { scproject.installation_status=='Completed' ? 
                          <option value="Completed" selected >Completed</option>
                          : 
                          <option value="Completed">Completed</option>
                      }
                                    
                        </select>
                     </span>    
                     </Form.Group>
             </Card.Body>
            
           </Card>
         </Col>



         
                 
         <Col md="4 mb-2 mt-4">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Handover Docs</u></Card.Title>
             </>
             <Card.Body style={{}}>
                
             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>As built Drawings Preparation Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='as_built_drawings_preparation_status' >
                    <option></option>


                      { scproject.as_built_drawings_preparation_status=='Not Started' ? 
                          <option value="Not Started" selected >Not Started</option>
                          : 
                          <option value="Not Started">Not Started</option>
                      }
                      { scproject.as_built_drawings_preparation_status=='On Going' ? 
                                <option value="On Going" selected >On Going</option>
                                : 
                                <option value="On Going">On Going</option>
                            }
                        { scproject.as_built_drawings_preparation_status=='Completed' ? 
                          <option value="Completed" selected >Completed</option>
                          : 
                          <option value="Completed">Completed</option>
                      }
                                    
                        </select>
                     </span>    
                     </Form.Group>


   
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>AS built Drawings Submission Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='as_built_drawings_submission_status' >
                    <option></option>
                      { scproject.as_built_drawings_submission_status=='Submitted' ? 
                          <option value="Submitted" selected >Submitted</option>
                          : 
                          <option value="Submitted">Submitted</option>
                      }

                      { scproject.as_built_drawings_submission_status=='Not Yet' ? 
                          <option value="Not Yet" selected >Not Yet</option>
                          : 
                          <option value="Not Yet">Not Yet</option>
                      }
                        { scproject.as_built_drawings_submission_status=='Revise & resubmit' ? 
                          <option value="Revise & resubmit" selected >Revise & resubmit</option>
                          : 
                          <option value="Revise & resubmit">Revise & resubmit</option>
                      }
                                    
                        </select>
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>AS built Drawings Submission Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='as_built_drawings_submission_date' defaultValue={scproject.as_built_drawings_submission_date}></input>
                  
                     </span>    
                     </Form.Group>



                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>handover Documents Preparation</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='handover_documents_preparation' >
                    <option></option>


                      { scproject.handover_documents_preparation=='Not Started' ? 
                          <option value="Not Started" selected >Not Started</option>
                          : 
                          <option value="Not Started">Not Started</option>
                      }
                      { scproject.handover_documents_preparation=='On Going' ? 
                                <option value="On Going" selected >On Going</option>
                                : 
                                <option value="On Going">On Going</option>
                            }
                        { scproject.handover_documents_preparation=='Completed' ? 
                          <option value="Completed" selected >Completed</option>
                          : 
                          <option value="Completed">Completed</option>
                      }
                                    
                        </select>
                     </span>    
                     </Form.Group>



   
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Handover Documents Submission status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='handover_documents_submission_status' >
                    <option></option>
                      { scproject.handover_documents_submission_status=='Submitted' ? 
                          <option value="Submitted" selected >Submitted</option>
                          : 
                          <option value="Submitted">Submitted</option>
                      }

                      { scproject.handover_documents_submission_status=='Not Yet' ? 
                          <option value="Not Yet" selected >Not Yet</option>
                          : 
                          <option value="Not Yet">Not Yet</option>
                      }
                        { scproject.handover_documents_submission_status=='Revise & resubmit' ? 
                          <option value="Revise & resubmit" selected >Revise & resubmit</option>
                          : 
                          <option value="Revise & resubmit">Revise & resubmit</option>
                      }
                                    
                        </select>
                     </span>    
                     </Form.Group>


                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Handover Documents Submission date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='handover_documents_submission_date' defaultValue={scproject.handover_documents_submission_date}></input>
                  
                     </span>    
                     </Form.Group>


             </Card.Body>
            
           </Card>
         </Col>


         <Col md="4 mb-2 mt-4">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u>Snagging & TOC</u></Card.Title>
             </>
             <Card.Body style={{}}>
                
                
             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Snagging Estimated Startup Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='snagging_desnags_esd' defaultValue={scproject.snagging_desnags_esd}></input>
                  
                     </span>    
                     </Form.Group>

                           
             <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>Snagging Estimated End Date</strong></p> &nbsp;&nbsp;&nbsp;
                   <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='snagging_desnags_efd' defaultValue={scproject.snagging_desnags_efd}></input>
                  
                     </span>    
                     </Form.Group>

                     
   
                     <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">                  
                   <span className='form-inline input-group'>  
 
                   <p><strong>TOC issuance Status</strong></p> &nbsp;&nbsp;&nbsp;
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='toc_issuance_status' >
                    <option></option>
                      { scproject.toc_issuance_status=='Received' ? 
                          <option value="Received" selected >Received</option>
                          : 
                          <option value="Received">Received</option>
                      }

                      { scproject.toc_issuance_status=='Not Yet' ? 
                          <option value="Not Yet" selected >Not Yet</option>
                          : 
                          <option value="Not Yet">Not Yet</option>
                      }
                        { scproject.toc_issuance_status=='Not Available' ? 
                          <option value="Not Available" selected >Not Available</option>
                          : 
                          <option value="Not Available">Not Available</option>
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
           <span className='mt-4' style={{display:'grid'}}><button type='submit' form="main" className='btn btn-danger'>Update Records</button> </span>
         </Col>
       </Row>

       

       </form>

<Row className='mb-5'>
  <Col sm='5'>
  <button onClick={(e)=> showdiv(e)} className='btn btn-success mt-3'>VO Details </button>&nbsp;&nbsp;
  <button onClick={(e)=> showPaymentdiv(e)}   className='btn btn-success mt-3'>Project Payments</button>&nbsp;&nbsp;
  <button onClick={(e)=> showCertifieddiv(e)}   className='btn btn-success mt-3'>Certified Payments</button>&nbsp;&nbsp;
  {/* <button onClick={(e)=> showtransationdiv(e)}   className='btn btn-success mt-3'>Transactions</button>&nbsp;&nbsp; */}
  <button onClick={(e)=> ProjectLog(e)}   className='btn btn-success mt-3'>Project Logs</button>&nbsp;&nbsp;
  <button onClick={(e)=> ProjectInvoicing(e)}   className='btn btn-success mt-3'>Invoices</button>&nbsp;&nbsp;

  <button onClick={(e)=> ProjectCollection(e)}   className='btn btn-success mt-3'>Collections</button>&nbsp;&nbsp;

  </Col>
  <Col sm='2'>             

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
                            {vari.voamount}
                  
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
                              <th>Certification ID</th>
                              <th>Certified Amount</th>
                                <th>Certification Date</th>
                              <th>Certification Remarks</th>
                              <th>Approved Amount</th>
                              <th>Approval Date</th>
                              <th>Acumulated Amount</th>
                              <th>Balance to Rectify</th>
                              <th>Old Certified Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                               
            {
                projectpayments.map((vari,sr)=>{
                    return(  
                          <tr key={sr}>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>           
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
                  
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='vonb' required></input>
                      
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

export default ProjectDetails