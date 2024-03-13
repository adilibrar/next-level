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
function NewProject() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[divshow,setdivshow]=useState(false);
  const[variationform,setvariationform]=useState(false);
  const[singleProject,setsingleProject]=useState([]);
  const[edit,setedit]=useState(false);
  const[manager,setmanager]=useState([]);
  const[singleProjectclone,setsingleProjectclone]=useState([]);
  //const project_id=location.state.project;
  //let project_id=0
  const varid=1;
  const check_login=sessionStorage.getItem('login');
  const [partialloading,setpartialloading]=useState(true);
  const [loading,setLoading]=useState(true);
  
  const[Cities,setCities]=useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [dirty, setDirty] = React.useState(false);
  const [buttonClicked, setButtonClicked] = useState(true);
  const markFormDirty = () => setDirty(true);
  const [customers, setCustomers] = useState(true);
  const [show, setShow] = useState(true);
  const project_id=location.state.id;

  const handleClose = () => setShow(false);
 
  const [fullscreen, setFullscreen] = useState(true);
  const[paymentdiv,setpaymentshow]=useState(false);
  //alert(location.state.id)
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
      navigate('/');
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    navigate('/');
  }
 
}



const mainpage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}
const UpdateProject=(e)=>{
  e.preventDefault();
  alert("Update it")
  if(isNaN(e.target.customer.value)){
    cogoToast.error("Please Select Customer ...")
  }
  else if(isNaN(e.target.manager.value)){
    cogoToast.error("Please Select Project Manager...")
  }
  else{
  const data={
    project_name:e.target.title.value,
    project_area:e.target.area.value,
    project_cityid:e.target.city.value,
    projectvalue:e.target.budget.value,
    customerid:e.target.customer.value,
    projectmanagerid:e.target.manager.value,
    projectstatus:e.target.status.value,
    paymentstatus:e.target.payment.value,
    mainid:e.target.mainid.value,
  }
  console.log(data)
  axios.post(AppURL.UpdateProject,data,{
        
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}
    ).then(response =>{  
      if(response.status===200){
        cogoToast.success('Project Updated Successfully...')
       navigate('/projects')
        forceUpdate();
        setDirty(false)
      }
      else{
        cogoToast.error('Something Went Wrong...')
      }

  })
}
}


const createproject=(e)=>{
    e.preventDefault();
    const data={
      project_name:e.target.title.value,
      project_area:e.target.area.value,
      project_cityid:e.target.city.value,
      projectvalue:e.target.budget.value,
      customerid:e.target.customer.value,
      projectmanagerid:e.target.manager.value,
      projectstatus:e.target.status.value,
      paymentstatus:e.target.payment.value,
    }
    axios.post(AppURL.CreateNewProject,data,{
          
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}
      ).then(response =>{  
        if(response.status===200){
          cogoToast.success('Project Added Successfully...')
         
          forceUpdate();
          setDirty(false)
        }
        else{
          cogoToast.error('Something Went Wrong...')
        }

    })
  }
        // e.target.reset();
        // forceUpdate();
        // setvariationform(false)
        // setdivshow(true)
    const UpdateVariation=(e,varid,voamount,vodescription,voapprovalstatus,voapprovalform,voapprovaldate)=>{

      navigate('/edit-variation',{state:{project:project_id,vid:varid}})
   }

    

      const ProjectDetails = async()=>{
        try{
    
    
          // const projectvariation = await axios.get(AppURL.GetVariationList(project_id))
          // setvariation(projectvariation.data);
          if(project_id !='0'){
            const projectlist=await axios.get(AppURL.ESingleProjectMain(project_id))
            setsingleProject(projectlist.data)
            
            if(projectlist.data.length>0){
              //console.log(projectlist.data)
              setedit(true)
            }
            else{
              console.log("No Value")
            }
          }

          const projectCities = await axios.get(AppURL.GetCities)
          setCities(projectCities.data);
            
          
          const projectmanagers = await axios.get(AppURL.ExternalProjectManagerList)
          setmanager(projectmanagers.data);
            
          
          // const payments = await axios.get(AppURL.GetProjectPayments(project_id))
          // setProjectPayments(payments.data);
        
          const customers = await axios.get(AppURL.GetCustomerList)
          setCustomers(customers.data);
          
          
          setLoading(false);
//console.log(manager)
        }catch(error){
            console.log(error);
        }
    }
    
   
        

        if(loading){
        return(
            <>Loading</>
            )
        }
else if(edit){
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
           <h3 className=''>Edit Project </h3>
           </Col>
        
           </Row>
</Modal.Title>
</Modal.Header>

<Modal.Body>
<div className='container-fluid dashboard-background-color mt-2'>
         
         <div className="content ">
    
           <hr></hr>
  {
  singleProject.map((sing,i)=>{
    return(
    <div className='mt-3'>
                <form onSubmit={UpdateProject} onChange={markFormDirty}>
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <td>Project Name</td>                
                    <td>Area</td>
                    <td>City</td>
                    <td>Project Value</td>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Next Level Group" name='title' defaultValue={sing.project_name} required></input>
                  <input type="hidden" class="form-control" id="exampleFormControlInput1" placeholder="Next Level Group" name='mainid' defaultValue={sing.mainid} required></input>
                 
                  </td>
                  <td>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Dubai Marina" defaultValue={sing.project_area} name='area'required></input>
                  </td>
                  <td>
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='city' title='Offer'>
                     {
                      Cities.map((city,i)=>{
                        return(
                          
                          city.customerarea_id==sing.project_cityid?
                            <option value={city.customerarea_id} selected>{city.city}</option>
                           :
                           <option value={city.customerarea_id}>{city.city}</option>
                          
               
                        )
                      })
                     }
                    </select>
                  </td>
                  <td>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="1000000"  defaultValue={sing.projectvalue} name='budget'></input>
                  </td>
                </tr>
                <tr>
                    <td>Customer</td>                
                    <td>Manager</td>
                    <td>Status</td>
                    <td>Payment</td>
                  </tr>
                <tr>
                  <td>
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" required name='customer' title='Offer'>
                    <option selected disabled >Please Select Customer</option>
                  {
                      customers.map((customer,i)=>{
                        return(
                        <option value={customer.customer_id}>{customer.customer_name}</option>
                        )
                      })
                     }
                    </select>
                  </td>
                  <td>
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='manager' title='Offer'>
                  <option selected disabled >Select Project Manager</option>
                    {
                      manager.map((man,i)=>{
                        return(
                            <option value={man.projectmid} >{man.pmname}</option>
                        )
                      })
                    }
                        
                    </select>
                  </td>
                  <td>
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='status' title='Offer'>
                        <option value='Active' selected>Active</option>
                        <option value='Completed'>Completed</option>
                        <option value='Cancelled' >Cancelled</option>
                        <option value='ON Hold'>ON Hold</option>  
                        <option value='Fully Paid'>Fully Paid</option>  
                    </select>
                  </td>
                  <td>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={sing.paymentstatus} name='payment'></input>
                  </td>
                </tr>
                 
                </tbody>
            </Table>
            <Row>
            <Col md="10">
            <button className='btn btn-danger'  onClick={(e)=> goback(e)} ><i className='fa fa-arrow-left'></i> Back</button> &nbsp;&nbsp;
           {/* <button className='btn btn-danger'  onClick={(e)=> mainpage(e)} ><i className='fa fa-arrow-left'></i> Homepage</button> */}
            </Col>
       <Col md="2">
            <Button variant="primary" type='submit' >Update Project</Button>
            </Col>
            </Row>
            </form>
            
  
             
   </div>
  
    )
                  })
  }
   </div></div>
</Modal.Body>

<Modal.Footer>

           

</Modal.Footer>
</Modal>
</div>
 

   


</Fragment>
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
                       <h3 className=''>Add Project </h3>
                       </Col>
                    
                       </Row>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <div className='container-fluid dashboard-background-color mt-2'>
                     
                     <div className="content ">
                
                       <hr></hr>

                <div className='mt-3'>
                            <form onSubmit={createproject} onChange={markFormDirty}>
                            <Table striped bordered hover>
                            <thead>
                              <tr>
                                <td>Project Name</td>                
                                <td>Area</td>
                                <td>City</td>
                                <td>Project Value</td>
                              </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <td>
                              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Next Level Group" name='title'required></input>
                              </td>
                              <td>
                              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Dubai Marina" name='area'required></input>
                              </td>
                              <td>
                              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='city' title='Offer'>
                                 {
                                  Cities.map((city,i)=>{
                                    return(
                                      
                                      city.customerarea_id=='3889'?
                                        <option value={city.customerarea_id} selected>{city.city}</option>
                                       :
                                       <option value={city.customerarea_id}>{city.city}</option>
                                      
                           
                                    )
                                  })
                                 }
                                </select>
                              </td>
                              <td>
                              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="1000000" name='budget'></input>
                              </td>
                            </tr>
                            <tr>
                                <td>Customer</td>                
                                <td>Manager</td>
                                <td>Status</td>
                                <td>Payment</td>
                              </tr>
                            <tr>
                              <td>
                              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='customer' title='Offer'>
                              {
                                  customers.map((customer,i)=>{
                                    return(
                                    <option value={customer.customer_id}>{customer.customer_name}</option>
                                    )
                                  })
                                 }
                                </select>
                              </td>
                              <td>
                              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='manager' title='Offer'>
                                {
                                  manager.map((man,i)=>{
                                    return(
                                        <option value={man.projectmid} selected>{man.pmname}</option>
                                    )
                                  })
                                }
                                    
                                </select>
                              </td>
                              <td>
                              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='status' title='Offer'>
                                    <option value='Active' selected>Active</option>
                                    <option value='Completed'>Completed</option>
                                    <option value='Cancelled' >Cancelled</option>
                                    <option value='ON Hold'>ON Hold</option>  
                                    <option value='Fully Paid'>Fully Paid</option>  
                                </select>
                              </td>
                              <td>
                              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" defaultValue={'NA'} name='payment'></input>
                              </td>
                            </tr>
                             
                            </tbody>
                        </Table>
                        <Row>
                        <Col md="10">
                        <button className='btn btn-danger'  onClick={(e)=> goback(e)} ><i className='fa fa-arrow-left'></i> Back</button> &nbsp;&nbsp;
                       {/* <button className='btn btn-danger'  onClick={(e)=> mainpage(e)} ><i className='fa fa-arrow-left'></i> Homepage</button> */}
                        </Col>
                   <Col md="2">
                        <Button variant="primary" type='submit' >Add New Project</Button>
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

export default NewProject