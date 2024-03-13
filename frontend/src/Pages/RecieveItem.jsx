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
function RecieveItem(){


    const navigate =useNavigate();
    const location = useLocation();
    const[mto,setMTO]=useState([]);
    const[projects,setProjects]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredproject,setfilteredproject]=useState([]);
  const [region, setRegion] = useState("");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const[supplier,setsupplier]=useState([]);
  let project_po=0;
  let ctype=''
  if (location.state===null) {
     project_po=1;
     ctype='first';
  }
  else{
     project_po=location.state.id;
     ctype='second';
  }

  const[cur,setCur]=useState([]);
  
  const[currency,setcurrency]=useState([]);
  const status=sessionStorage.getItem('code');
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
        glass:e.target.glass.value,
        projectpo:e.target.project.value,
        
    }
    axios.post(AppURL.ADDPO,po_data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response =>{  
        if(response.status===201){
             cogoToast.success("PO Created Successfully ...",{position:'top-right'});
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
    ///alert(POId)
        e.preventDefault();
        navigate('/edit-po',{state:{POID:POId}});
         }

const POView=(e,POId)=>{
        e.preventDefault();
        navigate('/po-detail',{state:{POID:POId}});
        }

        
    const getProjects = async()=>{
        try{
            const response= await axios.get(AppURL.POLIST)
            setProjects(response.data);
            setfilteredproject(response.data)
            //console.log(response.data)
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

    const columns =[
        {
            name:"Refrence No",
            selector:(row) => row.id,
            sortable:true
        }  ,  
        {
            name:"PO No",
            selector:(row) => row.refrence,
            sortable:true
        }  ,  

        {
            name:"Q-Refrence",
            selector:(row) => row.quotationRefrence,
            sortable:true
        }  ,  
        {
            name:"Supplier",
            selector:(row) => row.PurchaseSupplier['name'],
            sortable:true
        }  ,  
        

        {
            name:"Date",
            selector:(row) => row.delivery_date,
            sortable:true
        }  ,  
        {
            name:"Action",
            cell:(row)=>
            <>
            <button className='btn btn-danger'  onClick={(e)=>POView(e,row.id)}><i className="fa-solid fa-eye"></i></button>
           { 
           (status=='PI')?

            (row.accounts_submital=='1')?
                    null
                    :
                    <>
                    &nbsp;&nbsp;&nbsp;
                    <button className='btn btn-danger'  onClick={(e)=>POEdit(e,row.id)}><i className="fa-solid fa-pencil"></i></button>
                    </>
                :null
                }
          
         </>
        }
    ]



    useEffect(()=>{
        //getMTO()
        getCurrency()
        getProjects()
        getsupplier()
    },[ignored]);

    useEffect(()=> {
        const result=projects.filter(po=>{
            return po.refrence.toLowerCase().match(search.toLowerCase());
        });
        setfilteredproject(result);
    },[search])



   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey={ctype}>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Purchase Order</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second"  >Create PO</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <>
                <div className="d-flex flex-column align-items-center">

                <DataTable 
                columns={columns} 
                data={filteredproject} 
                pagination 
                fixedHeader 
                fixedHeaderScrollHeight="590px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input 
                    type="text" 
                    placeholder='Search here' 
                    className='w-25 form-control' 
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}>
                    </input>
                }
                //subHeaderAlign="center"
                ></DataTable>
                </div>
            </>
        
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <Form onSubmit={handleSubmit}>
            <div className='col-md-12 row'>
            <div className='col-md-5'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>PO Refrence </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder="PO Refrence "  name='porefrence' />
              <Form.Control type="hidden" placeholder="PO Refrence " value={project_po} name='project' />
                  
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-5'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Quotation Refrence </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder="PO Refrence "  name='qorefrence' />
                  
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-2'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Currency</Form.Label>
                    <>
                    <Select
                        name='currencey'
                        rules={{ required: true }}
                        value={region}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegion(item);
                        
                        }}
                        options={currency.map((guest, index) => {
                        return {
                            label: guest.name,
                            value: guest.id,
                            key: index,
                        };
                        })}
                    />
             
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
              <Form.Control type="text" placeholder=" "  name='paymentterms' />
                  
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-4'>
                    <Form.Group className="mb-3 form-inline" controlId="note">
                    <Form.Label>Note </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder=" "  name='note' />
                  
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-4'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Supplier</Form.Label>
                    <>
                    <Select
                        name='supplier'
                        rules={{ required: true }}
                        value={cur}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setCur(item);
                        
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

                </Form.Group>
            </div>
            </div>
<br></br>
            <div className='col-md-12 row'>
            <div className='col-md-2'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Delivery Date </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="date" placeholder="PO Refrence "  name='deliverydate' />
                  
                    </span>
                    </Form.Group>

            </div>
            <div className='col-md-2'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Local</Form.Label>
                  {/* <span className='form-inline input-group'>  
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                    </span> */}

                    <>
                  
                        <select class="form-select" aria-label="Default select example"  name="local">   
                            <option  value='1'  >Yes</option>                               
                            <option  value='0'  >NO</option>               
                        </select> 
       
                    </>

                    </Form.Group>

                    

            </div>

            <div className='col-md-2'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Performa Invoice</Form.Label>
                  <span className='form-inline input-group'>  
                  <>              
                  <select class="form-select" aria-label="Default select example"  name="performainvoice">   
                                                  
                      <option  value='0'  >NO</option>  
                      <option  value='1'  >Yes</option>               
                  </select> 
 
              </>
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-2'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Glass</Form.Label>
                  <span className='form-inline input-group'>  
                  <>              
                  <select class="form-select" aria-label="Default select example"  name="glass">   
                                                  
                      <option  value='0'  >NO</option>  
                      <option  value='1'  >Yes</option>               
                  </select> 
 
              </>
                    </span>
                    </Form.Group>

            </div>

            <div className='col-md-4'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Service Quotation</Form.Label>
                    <span className='form-inline input-group'>  
                  <>
                  
                  <select class="form-select" aria-label="Default select example"  name="servicequotation">   
                                                  
                      <option  value='0'  >NO</option>  
                      <option  value='1'  >Yes</option>               
                  </select> 
 
              </>
                    </span>

                </Form.Group>
            </div>
            </div>

                <Button variant="primary" type="submit" >
                    Create PO
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
export default RecieveItem
