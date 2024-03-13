import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import NavMenu from '../../Componenets/Common/NavMenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import AppURL from '../../api/AppURL';
import Badge from 'react-bootstrap/Badge';
import cogoToast from 'cogo-toast';
//  components
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import { Container,
  Card,

  Row,
  Col,
  Button,
  Modal,
} from 'react-bootstrap';
// core components

import {Link, useNavigate} from 'react-router-dom';
function ProjectInvoices() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[divshow,setdivshow]=useState(false);
  const[variationform,setvariationform]=useState(false);
  const[singleProject,setsingleProject]=useState([]);
  const[invoices,setProjectInvoices]=useState([]);
  const[manager,setmanager]=useState([]);
  const[singleProjectclone,setsingleProjectclone]=useState([]);
  const project_id=location.state.project;
  const main_id=location.state.mainid;
  const paid=location.state.pa;
  const check_login=sessionStorage.getItem('login');
  const [partialloading,setpartialloading]=useState(true);
  const [loading,setLoading]=useState(true);
  const[pterms,setpaymentterms]=useState([]);
  const[totalvari,settotalvari]=useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [dirty, setDirty] = React.useState(false);
  const [buttonClicked, setButtonClicked] = useState(true);
  const markFormDirty = () => setDirty(true);
  const [projectevent, setProjectEvent] = useState(true);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
 
  const [fullscreen, setFullscreen] = useState(true);
  const[paymentdiv,setpaymentshow]=useState(false);
  
  useEffect(()=>{
      if(!check_login){
          navigate('/login')
        }

        handleShow();
        ProjectDetails();
        window.addEventListener('popstate', (event) => {
          cogoToast.error("You Can not use this button to go back, Please use designated button to go back ,your unsaved data will be Lost ...",{hideAfter:10});
       
          
            window.removeEventListener('popstate')
      });
        
      },[ignored])

      
    function currencyFormat(num) {
      return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

  if(dirty){
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
    
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage;                            //Webkit, Safari, Chrome
      
    });  

  }
    
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

const goback=(e)=>{
    e.preventDefault()
  if(dirty){
    let result = window.confirm("You have unsaved changes, are you sure you want to leave this page ?")
    if (result == true) {
      e.preventDefault();
      navigate('/single-project-details',{state:{mainid:main_id,varreturn:false,scrollpage:'1'}});
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    
    navigate('/single-project-details',{state:{mainid:main_id,payreturn:false,varreturn:false,scrollpage:'1'}});
  }
 
}



const mainpage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}


const updateProjectLog=(e)=>{
    e.preventDefault();
      
    const data={
        // void:varid,
        eventdate:e.target.eventdate.value,
        eventdescription:e.target.eventdescription.value,
        eventimpact:e.target.eventimpact.value,
        projectid:project_id
    }

    axios.post(AppURL.UpdateProjectEvents,data,{
          
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}
      ).then(response =>{  
        if(response.status===201){
          cogoToast.success('Project Log Updated Successfully...')
          forceUpdate();
          setDirty(false)
          e.target.reset();
        }
        else{
          cogoToast.error('Something Went Wrong...')
        }
        // 
        // forceUpdate();
        // setvariationform(false)
        // setdivshow(true)
    })
  }


      const ProjectDetails = async()=>{
        try{
          const invoices = await axios.get(AppURL.GetProjectInvoices(main_id))
          setProjectInvoices(invoices.data);
      
          setLoading(false);

        }catch(error){
            console.log(error);
        }
    }
    
   
        

        if(loading){
        return(
            <>Loading</>
            )
        }

        else{
            console.log(invoices)
            return(

                <Fragment>
 <div
      className="modal show"
      style={{ display: 'block', position: 'initial',size: "lg" }}
    >
      <Modal size="xl" show={show} fullscreen={fullscreen}>
        <Modal.Header >
          <Modal.Title>

          <Row className=''>
                      <Col md="12">
                       <h3 className=''>Project Invoices</h3>
                       </Col>
                    
                       </Row>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <div className='container-fluid dashboard-background-color mt-2'>
                     
                     <div className="content ">
                
                       <hr></hr>

                <div className='mt-3'>
           
                 
                               
                                 
      
                            <Table>
                                <thead>
                                          
                                </thead>
                                   
                <tbody>
                                    
        
                        </tbody>    
                            </Table>
                      
                
                  {/* <button className='btn btn-danger'  onClick={(e)=> UpdateVariation(e,vari.void,vari.voamount,vari.vodescription,vari.voapprovalstatus,vari.voapprovalform,vari.voapprovaldate)}>Edit</button> */}
                             
                                
                            <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Refrence</th>
                                <th>Related To</th>
                          
                                <th>Invoice Value</th>
                                <th>Payment Due Date</th>
                                <th>Transaction Date</th>
                              </tr>
                            </thead>
                            <tbody>
                                {
                            invoices.map((invoice,sr)=>{
                                if(invoices.length < 1){
                                  return(
                                    <p>No Data Found...</p>
                                  )
                                }
                                else{
                                return(
                                    <tr>
                                      <td>{invoice.paymentreference}</td>                            
                                    <td>
                                    {invoice.invoicenb}
                          
                                    </td>
                                    <td>
                                        {currencyFormat(invoice.transactionvalue)}
                                     </td>
                                     <td>
                                        {invoice.paymentduedate}
                                     </td>
                                 
                                     <td>
                                        {invoice.transaction_date}
                                     </td>

                                
                                    
                            
                                   
                                  </tr>
                                    )
                        
                                }
                             })
                            
                            
                            } 
                
                            </tbody>
                        </Table>
                        <Row>
                        <Col md="10">
                        <button className='btn btn-danger'  onClick={(e)=> goback(e)} ><i className='fa fa-arrow-left'></i> Back</button> &nbsp;&nbsp;
                       <button className='btn btn-danger'  onClick={(e)=> mainpage(e)} ><i className='fa fa-arrow-left'></i> Homepage</button>
                   </Col>
            
                        </Row>
                        
               </div></div></div>
        </Modal.Body>

        <Modal.Footer>
     
                       
          
        </Modal.Footer>
      </Modal>
    </div>
             

               
           

     </Fragment>
            )
        }
     

}

export default ProjectInvoices