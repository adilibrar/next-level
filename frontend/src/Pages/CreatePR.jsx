import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import NavMenu from '../Componenets/Common/NavMenu';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Item from '../Componenets/Stock/Item'
import axios from 'axios';
import AppURL from '../api/AppURL';
import cogoToast from 'cogo-toast';
import SelectSearch from 'react-select-search';
import { useRef } from "react";
import 'react-select-search/style.css'
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import Async, { useAsync } from 'react-select/async';
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
function CreatePR(){

    const navigate =useNavigate();
    const[mto,setMTO]=useState([]);
    const[po,setpo]=useState([]);
    const[project,setproject]=useState([]);
    const[supplier,setsupplier]=useState([]);
    
    const[search,setSearch]=useState([]);
    const[filteredproject,setfilteredproject]=useState([]);
  const [region, setRegion] = useState("");
  const [supv, setsupv] = useState("");
  const [projv, setprojv] = useState("");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const check_login=sessionStorage.getItem('login');
  const status=sessionStorage.getItem('code');
const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.description.value===''){
        cogoToast.error("Please add refrence",{position:'top-right'});   
    }

else{
        const data={
            description:e.target.description.value,
            quotation:1,
          

        }
        axios.post(AppURL.CreateOrderQuotation,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
            if(response.status===201){
                 cogoToast.success("PR Created Sucessfully ...",{position:'top-right'});
                 navigate('/purchase-request');
   

            }
                
        })
    

}
    
};


const handleSubmitSiteDN = (e) => {
    e.preventDefault();
   
    if(e.target.prsrno.value===''){
        cogoToast.error("Please add refrence",{position:'top-right'});   
    }

    else if(e.target.project.value===''){
        cogoToast.error("Please select Project",{position:'top-right'});   
    }
    
else{
        const data_DN={
            issue_project:e.target.project.value,
            prsrno:e.target.prsrno.value,

        }
        axios.post(AppURL.SaveSiteDN,data_DN,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
            if(response.status===201){
                 cogoToast.success("Site Delivery Note Created Sucessfully ...",{position:'top-right'});
                 navigate('/site-delivery-note');
            }
                
        })
}
    
};
         

const handleSubmitSDN = (e) => {
    e.preventDefault();
   
    if(e.target.refrence.value===''){
        cogoToast.error("Please add refrence",{position:'top-right'});   
    }

    else if(e.target.po.value===''){
        cogoToast.error("Please select Purchase Order",{position:'top-right'});   
    }

    
    else if(e.target.supplier_n.value===''){
        cogoToast.error("Please select Supplier",{position:'top-right'});   
    }

else{
        const site_data_DN={
            orderno:e.target.refrence.value,
               DNFromsupplierName:e.target.supplier_n.value,
            DNINPurchaseOrder:e.target.po.value,

        }
        axios.post(AppURL.SupplierDNSAve,site_data_DN,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
            if(response.status===201){
                 cogoToast.success("Supplier Delivery Note Created Sucessfully ...",{position:'top-right'});
                 navigate('/recieve-item');
            }
                
        })
}
    
};


    const getpo = async()=>{
        try{
            const response= await axios.get(AppURL.POLIST)
            setpo(response.data);
            //setfilteredproject(response.data)
            //console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }

    const getsupplier = async()=>{
        try{
            const response= await axios.get(AppURL.SupplierList)
            setsupplier(response.data);
            //setfilteredproject(response.data)
            //console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }

    
    const getproject = async()=>{
        try{
            const response= await axios.get(AppURL.ProjectList)
            setproject(response.data);
            //setfilteredproject(response.data)
            //console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }
    
    useEffect(()=>{
        //getMTO()

        if(!check_login){
            navigate('/login')
          }
          else if(check_login){
            if(status=='SI' || status =='SA'){

             // getCountries()
             getpo();
             getproject();
             getsupplier();
            }
            
            else{
              navigate('/');
              alert('you are not allowed to access , your action will be reported');
            }
             }
       

      
  
    },[ignored]);
if(status=='SI'){

    return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Create Purchase Request</Nav.Link>
            </Nav.Item>
            
          </Nav>
        </Col>
        
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <>
            <Form onSubmit={handleSubmit}>
            <div className='col-md-12 row mt-2'>

            <h4>Create Purchase Request</h4>

                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                <Form.Label>PR / Quotation Refrence </Form.Label>
            <span className='form-inline input-group'>  
            <Form.Control type="text" placeholder="Refrence"  name='description' required />
            
                </span>
                </Form.Group>

                </div>
            </div>
            <Button variant="primary" type="submit">
                Create
            </Button>
            </Form>

            <br></br><br></br><br></br>
            <h4>Create Site Delivery Note </h4>

            <Form onSubmit={handleSubmitSiteDN}>

            <div className='col-md-12 row'>

                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                <Form.Label>Request No </Form.Label>
            <span className='form-inline input-group'>  
            <Form.Control type="text" placeholder="Refrence"  name='prsrno' required />
            
                </span>
                </Form.Group>

                <Form.Label>Select the Project </Form.Label>
                                <>
                                <Select
                                    name='project'
                                    rules={{ required: true }}
                                    value={projv}
                                    required={true}
                                    onChange={(item) => {
                                // console.log(item);
                                    setprojv(item);
                                    
                                    }}
                                    options={project.map((guest, index) => {
                                    return {
                                        label: guest.name+" ("+guest.refrence_no+")",
                                        value: guest.id,
                                        key: index,
                                    };
                                    })}
                                />
                        
                        </>

                                <Form.Text className="text-muted">
                                
                                </Form.Text>
                </div>
            </div>
            <br></br>
            <Button  variant="primary" type="submit">
                Create 
            </Button>
        </Form>


<br></br><br></br><br></br>
<h4>Create Supplier Delivery Note/Quotation </h4>

<Form onSubmit={handleSubmitSDN}>

<div className='col-md-12 row'>
    <div className='col-md-12'>
    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
    <Form.Label>Quotation / Delivery Note Refrence </Form.Label>
  <span className='form-inline input-group'>  
<Form.Control type="text" placeholder="Refrence"  name='refrence' required />
  
    </span>
    </Form.Group>

            <Form.Label>Select the PO </Form.Label>
                    <>
                    <Select
                        name='po'
                        rules={{ required: true }}
                        value={region}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegion(item);
                        
                        }}
                        options={po.map((guest, index) => {
                        return {
                            label: guest.refrence,
                            value: guest.id,
                            key: index,
                        };
                        })}
                    />
             
             
                    </>

                <br></br>
                    <Form.Label>Select Supplier </Form.Label>
                    <>
                    <Select
                        name='supplier_n'
                        rules={{ required: true }}
                        value={supv}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                       setsupv(item);
                        
                        }}
                        options={supplier.map((guest, index) => {
                        return {
                            label: guest.name,
                            value: guest.id,
                            key: index,
                        };
                        })}
                    />
             
                  </>

                    <Form.Text className="text-muted">
                       
                    </Form.Text>
    </div>
</div>
<br></br>
<Button  variant="primary" type="submit">
    Create 
</Button>
</Form>

            </>
        
            </Tab.Pane>
          
          </Tab.Content>
        </Col>
 
      </Row>
    </Tab.Container>




     
      </div>
      </>

    )
                    }
    else{
        return(
            <>
                    <NavMenu></NavMenu>
                   
          <div className='container-fluid'>
    
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Create Purchase Request</Nav.Link>
                </Nav.Item>
                
              </Nav>
            </Col>
            
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                <>
     
    
                <h4>Create Site Delivery Note </h4>
    
                <Form onSubmit={handleSubmitSiteDN}>
    
                <div className='col-md-12 row'>
    
                    <div className='col-md-12'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Request No </Form.Label>
                <span className='form-inline input-group'>  
                <Form.Control type="text" placeholder="Refrence"  name='prsrno' required />
                
                    </span>
                    </Form.Group>
    
                    <Form.Label>Select the Project </Form.Label>
                                    <>
                                    <Select
                                        name='project'
                                        rules={{ required: true }}
                                        value={projv}
                                        required={true}
                                        onChange={(item) => {
                                    // console.log(item);
                                        setprojv(item);
                                        
                                        }}
                                        options={project.map((guest, index) => {
                                        return {
                                            label: guest.name+" ("+guest.refrence_no+")",
                                            value: guest.id,
                                            key: index,
                                        };
                                        })}
                                    />
                            
                            </>
    
                                    <Form.Text className="text-muted">
                                    
                                    </Form.Text>
                    </div>
                </div>
                <br></br>
                <Button  variant="primary" type="submit">
                    Create 
                </Button>
            </Form>
    
    
   
                </>
            
                </Tab.Pane>
              
              </Tab.Content>
            </Col>
     
          </Row>
        </Tab.Container>
    
    
    
    
         
          </div>
          </>
    
        )
    
}


}
export default CreatePR
