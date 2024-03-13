import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import NavMenu from '../../Componenets/Common/NavMenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import AppURL from '../../api/AppURL';
import Select from 'react-select'
import cogoToast from 'cogo-toast';
import Spinner from 'react-bootstrap/Spinner';
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
function EditCuttingList() {
    let oldvalueid
    let oldvaluelabel
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[divshow,setdivshow]=useState(false);
  const [region, setRegion] = useState("");
  const[variationform,setvariationform]=useState(false);
  const[singleProject,setsingleProject]=useState([]);
  const[variation,setvariation]=useState([]);
  const[coritem,setCoritem]=useState([]);
  const[allitem,setAllItem]=useState([]);
  
  const[singleProjectclone,setsingleProjectclone]=useState([]);
  const item=location.state.item;
  const status=location.state.status;
  const window_id=location.state.window;
  let project_id=0
  let varid=0
  const check_login=sessionStorage.getItem('login');
  const [partialloading,setpartialloading]=useState(true);
  const [loading,setLoading]=useState(true);
  
  const[totalvari,settotalvari]=useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [dirty, setDirty] = React.useState(false);
  const [buttonClicked, setButtonClicked] = useState(true);
  const markFormDirty = () => setDirty(true);
  const [projectpayments, setProjectPayments] = useState(true);
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
    //     window.addEventListener('popstate', (event) => {
    //       cogoToast.error("You Can not use this button to go back, Please use designated button to go back ,your unsaved data will be Lost ...",{hideAfter:10});
       
          
    //         window.removeEventListener('popstate')
    //   });
        
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

  const SaveWindowProfile=(e)=>{
    e.preventDefault()

    const data={
        id:item,
        itempr:e.target.itempr.value,
        title:e.target.title.value,
        formula:e.target.formula.value,
        quantity:e.target.quantity.value,
        cutting:e.target.cutting.value,
        coating:e.target.coating.value,
        remark:e.target.remark.value,

    }
    axios.post(AppURL.UpdateCorProfile,data,{
          
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}
      ).then(response =>{  
        if(response.status===201){
          cogoToast.success('Profile updated successfully...')
        
          forceUpdate();
          setDirty(false)
        }
        else{
          cogoToast.error('Something Went Wrong...')
        }
        // e.target.reset();
         forceUpdate();
        // setvariationform(false)
        // setdivshow(true)
    })


  }
  
const goback=(e)=>{
  e.preventDefault()
  if(dirty){
    let result = window.confirm("You have unsaved changes, are you sure you want to leave this page ?")
    if (result == true) {
      e.preventDefault();
      navigate('/single-project-details',{state:{id:project_id,varreturn:true}});
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    navigate('/single-project-details',{state:{id:project_id,varreturn:true,payreturn:false}});
  }
 
}



const mainpage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}


const updatevariationdata=(e)=>{
    e.preventDefault();
      
    const data={
        void:varid,
        voamount:e.target.voamount.value,
        vodate:e.target.vodate.value,
        vodescription:e.target.vodescription.value,
        voapprovalstatus:e.target.voapprovalstatus.value,
        voapprovalform:e.target.voapprovalform.value,
        voapprovaldate:e.target.voapprovaldate.value,
        
    }


    
      
    axios.post(AppURL.UpdateVariation,data,{
          
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}
      ).then(response =>{  
        if(response.status===201){
          cogoToast.success('Variation Updated Successfully...')
         
          forceUpdate();
          setDirty(false)
        }
        else{
          cogoToast.error('Something Went Wrong...')
        }
        // e.target.reset();
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
    
            
            
          
          const GetItemDetails = await axios.get(AppURL.GetSingleCorProfile(item))
          setCoritem(GetItemDetails.data);

           
          const GetStockItem = await axios.get(AppURL.NewStock)
          setAllItem(GetStockItem.data);
            
        
          
        //   const payments = await axios.get(AppURL.GetProjectPayments(project_id))
        //   setProjectPayments(payments.data);
          
          setLoading(false);

        }catch(error){
            console.log(error);
        }
    }
    
   
        

        if(loading){
        return(

            <div style={{textAlign:'center',marginTop:200}}>
                 <span className='form-inline'> 

            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
                                  
                 </span>

              </div>

            )
        }

        else{
            return(


                <Fragment>
 <div
      className="modal show"
      style={{ display: 'contents', position: 'initial',size: "lg" }}
    >
      <div size="xl" >
        <Modal.Header >
          <Modal.Title>

          <Row className=''>
                      <Col md="12">
                       <h3 className=''>Edit </h3>
                       </Col>
                    
                       </Row>
          </Modal.Title>
        </Modal.Header>

        <>
        <div className='container-fluid dashboard-background-color mt-2'>
                     
                     <div className="content ">
                
                       <hr></hr>

                <div className='mt-3'>
           
                 
        <Form onSubmit={SaveWindowProfile}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Title, e.g Frame Cover" name='title'  required  defaultValue={coritem.title}/> &nbsp;
                 
                 <>
                 <Select className='selectwidth' name='itempr'
                        rules={{ required: true }}
                        //value={region}            
                        required={true}
                        noOptionsMessage={()=>"Item not found"}
                        placeholder="Select item"
                        onChange={(itempr) => {
                        // console.log(item);
                        setRegion(itempr);
                        
                        }}
               
                 options={
                    allitem.map((guest, index) => {
                         
                            if(parseInt(guest.itemid) ==parseInt(coritem.CorVisionItem['id'])){
                                oldvalueid=guest.itemid
                                oldvaluelabel=guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing
                                console.log(oldvaluelabel)
                            }
                        return {
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                            
                        };
                    })
                 }
                 defaultValue={{ label: oldvaluelabel, value: oldvalueid }}
                 >
                
                </Select>
                 </>
                  
                  
             
                  &nbsp;  <Form.Control type="text" placeholder="Formula , e.g (w-151)/2" name='formula' defaultValue={coritem.formula} required />
                  &nbsp;  <Form.Control type="text" placeholder="Quantity . e.g 1" name='quantity' defaultValue={coritem.quantity}  required />
                  &nbsp;  <Form.Control type="text" placeholder="Cutting , 45° * 45°" name='cutting' defaultValue={coritem.cutting}  required />
                  &nbsp;  <Form.Control type="text" placeholder="Coating" name='coating' defaultValue={coritem.coating}  required />
                  &nbsp;  <Form.Control type="text" placeholder="Remarks" name='remark' defaultValue={coritem.remark}  required />

                  <Button  variant="danger"  type="submit" name='gal'><i className='fa fa-upload'></i> Update</Button>
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>             

                        
               </div></div></div>
        </>

        <Modal.Footer className='mt-50'>
     
                       
          
        </Modal.Footer>
      </div>
    </div>
             

               
           

     </Fragment>

            )
        }
     

}

export default EditCuttingList