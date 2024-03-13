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
function EditPO(){

    const navigate =useNavigate();
    const[mto,setMTO]=useState([]);
    const[projects,setProjects]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredproject,setfilteredproject]=useState([]);
  const [region, setRegion] = useState("");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const[supplier,setsupplier]=useState([]);
  const[cur,setCur]=useState([]);
  const[currency,setcurrency]=useState([]);
  const location = useLocation();
  const poid=location.state.POID;
  
  const [loading,setLoading]=useState(true);

  //const poid=1;
const handleSubmit = (e) => {
    let note=''
    e.preventDefault();
    //alert("this service is not available yet");
     if(e.target.note.value===''){
        note='NA'
    }
    else{
        note=e.target.note.value
    }
    if(e.target.porefrence.value==='' || e.target.qorefrence.value===''){
        cogoToast.error("PO and Quotation refrences required",{position:'top-right'});   
    }

    else if(e.target.currencey.value===''){
        cogoToast.error("Please Select Currency",{position:'top-right'});   
    }

  

    else if(e.target.deliverydate.value===''){
        cogoToast.error("Please Select Date",{position:'top-right'});   
    }

    else if(e.target.supplier.value===''){
        cogoToast.error("Please Select Supplier",{position:'top-right'});   
    }
else{
   const po_data={
        po_id:poid,
        refrence:e.target.porefrence.value,
        quotationRefrence:e.target.qorefrence.value,
        currency:e.target.currencey.value,
        payment_term:e.target.paymentterms.value,
        note:note,
        PurchaseSupplier:e.target.supplier.value,
        delivery_date:e.target.deliverydate.value,
        local:e.target.local.value,
        PerformaInvoice:e.target.performainvoice.value,
        serviceQuotation:e.target.servicequotation.value,
        
    }
    axios.post(AppURL.EditPO,po_data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response =>{  
        if(response.status===201){
             cogoToast.success("PO Updated Successfully ...",{position:'top-right'});
            navigate('/approved-purchase-request')
       
        }
            
    })

}

    
};


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
const POEdit=(e,POId)=>{
        e.preventDefault();
        alert("this service is not available yet...")
        //navigate('/po-detail',{state:{POID:POId}});
         }

const POView=(e,POId)=>{
        e.preventDefault();
        navigate('/po-detail',{state:{POID:POId}});
        }

        
    const getProjects = async()=>{
        try{
            const response= await axios.get(AppURL.SinglePO(poid))
            setProjects(response.data);
            //setfilteredproject(response.data)
            //console.log(response.data)
            setLoading(false)
        }catch(error){
            console.log(error);
        }
    }

    const getCurrency = async()=>{
        try{
            const response= await axios.get(AppURL.CurrencyList)
            setcurrency(response.data);
          //  setfilteredproject(response.data)
            //console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }




    useEffect(()=>{
        //getMTO()
        getProjects()
        getCurrency()
        
        getsupplier()
        
    },[ignored]);
//console.log(projects)

if(loading){
    return(
        <>Please wait</>
    )
}
   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Edit PO</Nav.Link>
            </Nav.Item>
         
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <Form onSubmit={handleSubmit}>
            <div className='col-md-12 row'>
            <div className='col-md-5'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>PO Refrence </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder="PO Refrence "  name='porefrence'  defaultValue={projects.refrence} />
                  
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-5'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Quotation Refrence </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder="PO Refrence "  name='qorefrence' defaultValue={projects.quotationRefrence} />
                  
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-2'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Currency</Form.Label>
                    <>
             
             
             <select class="form-select" aria-label="Default select example" name="currencey">
                                {currency.map((guest, index) => {
                                                   // totalCartPrice += item.unit_price*item.quantity;
                                        if(guest.id==projects.currency['id']){
                                            return(         
                                                <option selected key={index} value={guest.id} 
                                              >{ guest.name} </option>      
                                            )
                                        }
                                        else{
                                            return(         
                                                <option  key={index} value={guest.id} 
                                              >{ guest.name} </option>  
                                            )
                                        }
                                         }
                                               )
                                               }
                                        </select>

                    </>

                </Form.Group>
            </div>
            </div>
<br></br>
            <div className='col-md-12 row'>
            <div className='col-md-4'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Payment Terms </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder=" "  name='paymentterms' defaultValue={projects.payment_term} />
                  
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-4'>
                    <Form.Group className="mb-3 form-inline" controlId="note">
                    <Form.Label>Note </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder=" "  name='note' defaultValue={projects.note} />
                  
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-4'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Supplier</Form.Label>
               
             <>
             <select class="form-select" aria-label="Default select example" name="supplier">
                                {supplier.map((guest, index) => {
                                                   // totalCartPrice += item.unit_price*item.quantity;
                                        if(guest.id==projects.PurchaseSupplier['id']){
                                            return(         
                                                <option selected key={index} value={guest.id} 
                                              >{ guest.name} </option>      
                                            )
                                        }
                                        else{
                                            return(         
                                                <option  key={index} value={guest.id} 
                                              >{ guest.name} </option>  
                                            )
                                        }
                                         }
                                               )
                                               }
                                        </select>

                    </>

                </Form.Group>
            </div>
            </div>
<br></br>
            <div className='col-md-12 row'>
            <div className='col-md-3'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Delivery Date </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="date" placeholder="PO Refrence "  name='deliverydate' defaultValue={projects.delivery_date} />
                  
                    </span>
                    </Form.Group>

            </div>
            <div className='col-md-3'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Local</Form.Label>
       

                    <>
                  
                        <select class="form-select" aria-label="Default select example"  name="local">   
                        {
                            (projects.local=='0')?
                            <option  value='0' selected="selected"  >NO</option> 
                            :
                            <option  value='0'  >NO</option> 
                        }                   
                     
                      {
                        (projects.local=='1')?
                            <option  value='1' selected="selected" >Yes</option>   
                        :
                        <option  value='1'>Yes</option>   
                      }              
                        </select> 
       
                    </>

                    </Form.Group>

                    

            </div>

            <div className='col-md-3'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Performa Invoice</Form.Label>
                  <span className='form-inline input-group'>  
                  <>              
                  <select autocomplete="off" class="form-select" aria-label="Default select example"  name="performainvoice" >   

                        {
                            (projects.PerformaInvoice=='0')?
                            <option  value='0' selected="selected">NO</option> 
                            :
                            <option  value='0'  >NO</option> 
                        }                               
                      {
                        (projects.PerformaInvoice=='1')?
                            <option  value='1' selected="selected" >Yes</option>   
                        :
                        <option  value='1'>Yes</option>   
                      } 
                                  
                  </select> 
 
              </>
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-3'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Service Quotation</Form.Label>
                    <span className='form-inline input-group'>  
                  <>
                  
                  <select class="form-select" aria-label="Default select example"  name="servicequotation">   
                                                  
                  {
                            (projects.serviceQuotation=='0')?
                            <option  value='0' selected="selected"  >NO</option> 
                            :
                            <option  value='0'  >NO</option> 
                        }                   
                      {
                        (projects.serviceQuotation=='1')?
                            <option  value='1' selected="selected" >Yes</option>   
                        :
                        <option  value='1'>Yes</option>   
                      }           
                  </select> 
 
              </>
                    </span>

                </Form.Group>
            </div>
            </div>

                <Button variant="primary" type="submit" >
                    Update PO
                </Button>
             </Form>
             
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>




     
      </div>
      </>

    )
}
export default EditPO
