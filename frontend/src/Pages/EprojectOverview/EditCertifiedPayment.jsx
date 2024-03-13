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
function EditCertifiedPayment() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[divshow,setdivshow]=useState(false);
  const[variationform,setvariationform]=useState(false);
  const[singleProject,setsingleProject]=useState([]);
  const[variation,setvariation]=useState([]);
  const[manager,setmanager]=useState([]);
  const[singleProjectclone,setsingleProjectclone]=useState([]);
  const project_id=location.state.project_id;
  const main_id=location.state.mainid;
  const id=location.state.id;
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
  const [certified, setProjectEvent] = useState(true);
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
      navigate('/single-project-details',{state:{mainid:main_id,id:project_id,varreturn:false,}});
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    navigate('/single-project-details',{state:{mainid:main_id,id:project_id,payreturn:false,varreturn:false}});
  }
 
}



const mainpage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}


const UpdateCertified=(e)=>{
    e.preventDefault();
      
    const data={
        // void:varid,
        serialnb:id,
        certificationremark:e.target.certificationremark.value,
        approvedcertifiedamount:e.target.approvedcertifiedamount.value,
        certificationdate:e.target.certificationdate.value, 
        certificationid:e.target.certificationid.value,   
        certifiedamount:e.target.certifiedamount.value,
        certificationapprovaldate:e.target.certificationapprovaldate.value,
    }

    axios.post(AppURL.UpdateProjectCertified,data,{
          
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}
      ).then(response =>{  
        if(response.status===201){
          cogoToast.success('Certified Amount Updated Successfully...')
          forceUpdate();
          setDirty(false)
          //e.target.reset();
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

    const UpdateVariation=(e,varid,voamount,vodescription,voapprovalstatus,voapprovalform,voapprovaldate)=>{

      navigate('/edit-variation',{state:{project:project_id,vid:varid}})
   }

    

      const ProjectDetails = async()=>{
        try{
    
    
    
          
          const payments = await axios.get(AppURL.GetCertifiedEdit(id))
          setProjectEvent(payments.data);
          

        //   const terms = await axios.get(AppURL.PaymentTerms)
        //   setpaymentterms(terms.data);
          
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
                       <h3 className=''>Edit Certified Payments</h3>
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
                             
                                
                  <form onSubmit={UpdateCertified} onChange={markFormDirty}>
                            <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Reference</th>
                                <th>Certified Amount</th>
                                <th>Date</th>
                                <th>Remarks</th>
                                <th>Approve Certified Amount</th>
                                <th>Approval Date</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                            <tr>

                            
                              <td>
                              <input type="text"  class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationid' defaultValue={certified.certificationid} ></input>
                    
                              </td>

                              <td>
                              <input type="text"  class="form-control" id="exampleFormControlInput1" placeholder="" name='certifiedamount' defaultValue={certified.certifiedamount} ></input>
                    
                              </td>
                              <td>
                              <input type="date"  class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationdate' defaultValue={certified.certificationdate} ></input>
                    
                              </td>
                              <td>
                              <input type="text"  class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationremark' defaultValue={certified.certificationremark} ></input>
                    
                              </td>

                              <td>
                              <input type="text"  class="form-control" id="exampleFormControlInput1" placeholder="" name='approvedcertifiedamount' defaultValue={certified.approvedcertifiedamount} required></input>
                    
                              </td>
                              <td>
                              <input type="date"  class="form-control" id="exampleFormControlInput1" placeholder="" name='certificationapprovaldate' defaultValue={certified.certificationapprovaldate} ></input>
                    
                              </td>
                            
                              
                      
                             
                            </tr>
                            </tbody>
                        </Table>
                        <Row>
                        <Col md="10">
                        <button className='btn btn-danger'  onClick={(e)=> goback(e)} ><i className='fa fa-arrow-left'></i> Back</button> &nbsp;&nbsp;
                       <button className='btn btn-danger'  onClick={(e)=> mainpage(e)} ><i className='fa fa-arrow-left'></i> Homepage</button>
                   </Col>
                   <Col md="2">
                        <Button variant="primary" type='submit'>Update</Button>
                        </Col>
                        </Row>
                        </form>
                        
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

export default EditCertifiedPayment