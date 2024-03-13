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
import Alert from 'react-bootstrap/Alert';

import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

function ReturnIssueStock(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[status,setStatus]=useState([]);
    const [error,setError]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[qty,SetQty]=useState([]);
    const[DNLIST,setDNLIST]=useState([]);
    const [visible, setVisible] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, enableButton] = useState("");
    const MTOid=location.state.MTOid;
    const[mtodata,setMTOData]=useState([]);
    
    const [loading,setLoading]=useState(true);
    const[issue,setIssue]=useState([]);

    
    const [show, setShow] = useState(false);
    const [pdffile, setPdffile] = useState("");

// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

   const [checkoutInput,SetCheckoutInput]=useState({
   // status:'',

    });
    


    useEffect(()=>{
      const check_login=sessionStorage.getItem('login');
      const status=sessionStorage.getItem('code');
      setStatus(sessionStorage.getItem('code'))
        if(!check_login){
            navigate('/login')
          }
          else if(check_login){
        
            if(status==='SI'|| status==='SA'){

            }
            else{
              navigate('/');
              alert('you are not allowed to access , your action will be reported');
            }
          }    
   
        axios.get(AppURL.IssuedItemByMto(MTOid)).then(response=>{
        setItem(response.data);
        //alert(item.is_both);
        setLoading(false);
        })


    
    },[ignored]);

const ReturnIssuedStock=(e)=>{
    e.preventDefault();
    const balance_data={
        id:e.target.issue_id.value,
        balance:parseInt(e.target.balance.value),
        returned:parseInt(e.target.quantity.value),
    }
     axios.patch(AppURL.ReturnIssue,balance_data,{ 
         headers: {
         "Content-Type": "application/json",
         "Authorization": "Token "+sessionStorage.getItem("token"),
       },}).then(re=>{
        if(re.status=='200'){
                  
            cogoToast.success("added successfully to Project balance...")
        }

       })
}



if(loading){
    return <h4>Loading .....</h4>
} 

else{
if(status=='SI' || status=='SA'){
   return(
        <>
                <NavMenu></NavMenu>
               
            
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            
            <Nav.Item>
              <Nav.Link eventKey="second">Reserved Items</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>

            <Tab.Pane eventKey="second">
             <div className='mt-5'></div>

             <Alert variant="primary">
          Here is the list of Reserved items.
        </Alert>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
            <th></th>

        <th>Item Code</th>
          <th>Description</th>
          <th>Length</th>
          <th>Color</th>
          <th>Res-Qty</th>
          <th>Actual-Qty</th>
          <th>Issued</th>
          <th>Revoked</th>
          <th>Returned</th>
          <th>Balance</th>
          <th>Remarks</th>
          <th className='btn-coloumn'>Action</th>
        </tr>
      </thead>
      <tbody>

                          
        {
        item.map((single,i)=>{
            console.log(single);
            //alert(single.project['id']);
            let mtoitemid=single.id;
            let balanceqty=single.balance;
                  return(
                    <>
                    <tr key={i}>
                        <td>
                            <button className='btn btn-danger btn-sm' >{i+1}</button></td>
                          
                            <td>{single.Issued_item['itemcode']}</td>                         
                            <td>{single.Issued_item['name']}</td>
                            <td>{single.Issued_item['length']}</td>
                            <td>{single.color}</td>
                            <td>{parseInt(single.quantity)}</td>
                            <td>{parseInt(single.actual_quantity)}</td>
                            <td>{parseInt(single.quantity)-parseInt(single.balance)}</td>
                            <td>{single.revoke}</td>
                            <td>{single.returned}</td>
                            <td>{parseInt(single.balance)}</td>
                            <td>{single.remarks}</td> 
                            <td>
                              {
                              (parseInt(single.quantity)-parseInt(single.balance)<=0)?
                                null  
                              :
                                   <form onSubmit={ReturnIssuedStock}>
                                   <Form.Group className="mb-2 mt-2 form-inline" controlId="formBasicEmail">
                                   <span className='form-inline input-group text-width-reserved'> 
                                       <Form.Control  className='resizedTextbox' type="number" placeholder=""  name='quantity' />
                                       <Form.Control type="hidden"name='balance' value={parseInt(balanceqty)} required />  
                                        <Form.Control type="hidden" placeholder=""  name='issue_id' value={single.id} required />                                   
                                        <button  className='btn btn-success' >Return</button>
                                   </span>
                                   </Form.Group>
                                   </form>
                            }
                            </td>
                            </tr>
                             </>
                    )
                })
                
                //.then(galleries => {
                   // dispatch({ type: FETCH_GALLERIES_SUCCESS, payload: galleries });
                  // console.log(galleries);
                //})
        }
      
      </tbody>
    </Table>



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
      
}
export default ReturnIssueStock
