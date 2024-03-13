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
function ProjectAccountsHead() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[divshow,setdivshow]=useState(false);
  const[variationform,setvariationform]=useState(false);
  const[singleProject,setsingleProject]=useState([]);
  const[BudgetList,setBudgetList]=useState([]);
  const[manager,setmanager]=useState([]);
  const[singleProjectclone,setsingleProjectclone]=useState([]);
  //const project_id=location.state.project;
  const project_id=location.state.id;
  const varid=1;
  const check_login=sessionStorage.getItem('login');
  const [partialloading,setpartialloading]=useState(true);
  const [loading,setLoading]=useState(true);
  
  const[accounts,setAccounts]=useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [dirty, setDirty] = React.useState(false);
  const [buttonClicked, setButtonClicked] = useState(true);
  const markFormDirty = () => setDirty(true);
  const [customers, setCustomers] = useState(true);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
 
  const [fullscreen, setFullscreen] = useState(true);
  const[paymentdiv,setpaymentshow]=useState(false);
  var date;
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
      navigate('/projects');
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    navigate('/projects');
  }
 
}


function DeleteBudget(e,id,status){
    e.preventDefault()
    axios.get(AppURL.DeleteBudget(id)).then(response=>{
        if(response.status=='200'){

            forceUpdate()
            cogoToast.success("Selected Budget Deleted Successfully...")
        }
    
    })
}

const mainpage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}


const createproject=(e)=>{
    e.preventDefault();
    const data={
      BudgetHead:e.target.account.value,
      amount:e.target.amount.value,
      balance:e.target.amount.value,
      remarks:e.target.remarks.value,
      ProjectBudget:project_id,
      created_by:parseInt(sessionStorage.getItem('login')) 
    }

    axios.post(AppURL.AddProjectBudget,data,{
          
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}
      ).then(response =>{  
        if(response.status===201){
          cogoToast.success('Budget Added Successfully...')
         
          forceUpdate();
          setDirty(false)
          e.target.reset();
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
        
          const Accountshead = await axios.get(AppURL.AccountsHead)
          setAccounts(Accountshead.data);
            
          
          const projectmanagers = await axios.get(AppURL.ExternalProjectManagerList)
          setmanager(projectmanagers.data);
            
          
           const Getbudget = await axios.get(AppURL.GetBudgetList(project_id))
          setBudgetList(Getbudget.data);
        
          const customers = await axios.get(AppURL.GetCustomerList)
          setCustomers(customers.data);
          
          
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
                       <h3 className=''>Add Budget </h3>
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
                                <td>Type</td>                
                      
                                <td>Amount</td>
                                
                                <td>Remarks</td>
                              </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <td>
                              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='account' title='Offer'>
                              {
                                  accounts.map((acc,i)=>{
                                    
                                    return(
                                     <option value={acc.id}>{acc.title}</option>
                                    
                                    )
                                  })
                                 }
                                </select>
                              </td>
                           
                            
                              <td>
                              <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="50000"  name='amount'></input>
                              </td>

                              <td>
                              <input type="text" class="form-control" id="exampleFormControlInput1" name='remarks' defaultValue={'NA'}></input>
                              </td>
                            </tr>
                             
                            </tbody>
                        </Table>
                        <Row>
                        <Col md="10">
                        <button className='btn btn-danger'  onClick={(e)=> goback(e)} ><i className='fa fa-arrow-left'></i> Back</button> &nbsp;&nbsp;
                      </Col>
                   <Col md="2">
                        <Button variant="primary" type='submit' >ADD Budget</Button>
                        </Col>
                        </Row>
                        </form>
                        <br></br>
                        <Table striped bordered hover>
                            <thead>
                              <tr>
                                <td>Type</td>                
                                <td>Amount</td>
                                <td>Balance</td>
                                <td>Created at</td>
                                <td>Remarks</td>
                              </tr>
                            </thead>
                            <tbody>
                        {
                            BudgetList.map((list,i)=>{
                                //console.log(list)
                                date = new Date(list.created_date);
                                var seconds = date.getTime() / 1000;
                                console.log(seconds)
                                return(
                                <tr>
                                <td>
                                {list.BudgetHead.title}
                               </td>
                                <td>
                                {list.amount}
                                </td>
                                <td>
                                {list.balance}
                                </td>
                                <td>
                                
                                  {list.created_date    }
                             </td>
                                <td>
                                    {list.remarks}
                               </td>
                               <td>
                                {
                                    new Date().toISOString().slice(0, 10) > list.created_date?
                                    null
                                    :
                                    <>
                                  {/* //<button className='btn btn-danger' disabled  onClick={(e)=> goback(e)} ><i className='fa fa-pencil'></i></button> */}
                                    <button className='btn btn-danger'  onClick={(e)=> DeleteBudget(e,list.id,'d')} ><i className='fa fa-trash'></i> </button> </>
                                }
                                </td>
                              </tr>
                                )
                            })
                          
                  
                        }
                            </tbody>
                        </Table>
                         
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

export default ProjectAccountsHead