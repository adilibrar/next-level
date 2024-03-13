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
function UpdateProjectStatus() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[divshow,setdivshow]=useState(false);
  const[variationform,setvariationform]=useState(false);
  const[singleProject,setsingleProject]=useState([]);
  const[invoices,setProjectInvoices]=useState([]);
  const[manager,setmanager]=useState([]);
  const[singleProjectclone,setsingleProjectclone]=useState([]);
  const project_id=location.state.id;
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
  const [terms, setTerms] = useState(true);
  const [show, setShow] = useState(true);
  const [warning, setwarning] = useState(false);
  const handleClose = () => setShow(false);
 
  const [fullscreen, setFullscreen] = useState(true);
  const[paymentdiv,setpaymentshow]=useState(false);
  let tota_coll=0;
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
      navigate('/project-list',{state:{id:project_id,varreturn:false,scrollpage:'1'}});
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    navigate('/project-list',{state:{id:project_id,payreturn:false,varreturn:false,scrollpage:'1'}});
  }
 
}



const mainpage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}


const updateproject=(e)=>{
    e.preventDefault();
      //navigate('/project-list');
      const data={
        id:project_id,
        projectstatus:e.target.projectstatus.value
      }

      axios.post(AppURL.UpdateProjectStatus,data,{
          
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}
      ).then(response =>{  
        if(response.status===201){
          cogoToast.success('Project Status Updated Successfully...')
          forceUpdate();
          setDirty(false)
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
        //   const invoices = await axios.get(AppURL.GetProjectCollection(project_id))
        //   setProjectInvoices(invoices.data);
      

          const paymentterms = await axios.get(AppURL.PaymentTypeall)
          setTerms(paymentterms.data);
          setLoading(false);


          
        }catch(error){
            console.log(error);
        }
    }
    
   
    const shownote=(e)=>{
        e.preventDefault();
            //e.preventDefault();
            setwarning(true);
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
                       <h3 className=''>Update Project Status</h3>
                       </Col>
                    
                       </Row>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <div className='container-fluid dashboard-background-color mt-2'>
                     
                     <div className="content ">
                

                <div className='mt-3'>
                <p>Please Select Project Status to update from List below :</p> &nbsp;&nbsp;&nbsp;
                   
                  
                <Form className='mb-5' onSubmit={updateproject}>

                    
                   <select onChange={shownote} class="form-select form-select-sm" aria-label=".form-select-sm example" name='projectstatus'  title='Offer'>
                       <option disabled selected></option>
                       <option value={'Completed'}>Completed</option>
                       <option value={'ON Hold'}>ON Hold</option>
                       <option value={'Cancelled'}>Cancelled</option>
                       <option value={'Active'}>Active</option> 

                        <option value={'Fully Paid'}>Fully Paid</option> 
                       
                   </select>

                   <Row className='mt-5'>
                        <Col md="10">
                        <button className='btn btn-danger'  onClick={(e)=> mainpage(e)} ><i className='fa fa-arrow-left'></i> Close</button>&nbsp;&nbsp;
                  
                        <button className='btn btn-info'  type='submit'><i className='fa fa-save'></i> Update</button> 
                   </Col>
            
                        </Row>
                </Form>
                 {
                    warning?
                        <p style={{color:'red'}}>Please select carefully; some options may be missing depending on the project status.</p>
                    :null
                 }
                  {/* <button className='btn btn-danger'  onClick={(e)=> UpdateVariation(e,vari.void,vari.voamount,vari.vodescription,vari.voapprovalstatus,vari.voapprovalform,vari.voapprovaldate)}>Edit</button> */}
                             
                                
                            {/* <Table striped bordered hover>
                            <thead>
                              <tr>
                              <th>Transaction Date</th>
                              <th>Transaction Value</th>
                                <th>Paid For</th>
                          
                                
                                <th>Payment Type</th>
                                <th>Payment Due Date</th>

                              </tr>
                            </thead>
                            <tbody>
                                {
                            invoices.map((invoice,sr)=>{
                                tota_coll=invoice.transactionvalue+tota_coll
                                return(
                                    <tr>                            
                                    <td>
                                    {invoice.invoicenb}
                          
                                    </td>
                                    <td>
                                        {
                                        currencyFormat(invoice.transactionvalue)
                            }
                                     </td>
                                     <td>{
                                        terms.map((term,sr)=>{
                                            if(invoice.paymenttypeid==term.payment_id){
                                            return(
                                                <>
                                                {term.payment_type}
                                                </>
                                            )
                                            }
                                        })
                                       

                                     }</td>
                                     <td>
                                        {invoice.paymentduedate}
                                     </td>
                                 
                                     <td>
                                        {invoice.transaction_date}
                                     </td>

                                   </tr>
                                   
                                    )

                            
                             })

                            
                            } 
                                                <tr>
                                                  <td>No of Collections: <strong>  {invoices.length} </strong></td>
                                                  <td>Total Collections <strong>{currencyFormat(tota_coll)}</strong></td>
                                                </tr>
                            </tbody>
                        </Table> */}
                   
                        
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

export default UpdateProjectStatus