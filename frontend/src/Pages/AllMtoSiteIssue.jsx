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

function AllMtoSiteIssue(){

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
    const ProjectID=location.state.id;
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

       

        axios.get(AppURL.IssuedItemByProject(ProjectID)).then(response=>{
        setItem(response.data);

        
        axios.get(AppURL.SiteDNList).then(response=>{
            setDNLIST(response.data);
            setLoading(false);
            })
        //alert(item.is_both);
        
        })


        // axios.get(AppURL.SingleStockQTY).then(response=>{
        //     SetQty(response.data)
        //     //console.log(response.data);
        //     //alert(item.is_both);
        //     });

        

            // axios.get(AppURL.IssuedStockList).then(response=>{
            //     setIssue(response.data);
            //     setLoading(false);
            //     });

    
    },[ignored]);



const IssueForSite=(e)=>{
    e.preventDefault();
    if(parseInt(e.target.balance.value)<parseInt(e.target.quantity.value)){
        cogoToast.error("Not Enough Balance",{position:'top-right'});
      }
 
      else if(e.target.quantity.value ===''){
        cogoToast.error("add the quantity ",{position:'top-right'});
    }
    else{
        const data={
            Issuingproject:e.target.project.value,
            sitedeliverymto:e.target.mto_id.value,
            SiteItem:e.target.item_id.value,
            site_issuing_id:e.target.issue_id.value,
            remarks:e.target.remarks.value,
            quantity:e.target.quantity.value,
            site_delivery_note_no:e.target.deliverynote.value,
          }
    
          const balance_data={
            id:e.target.issue_id.value,
            balance:parseInt(e.target.balance.value)-parseInt(e.target.quantity.value),
        }

        e.target.reset();
        axios.post(AppURL.SaveSiteItem,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response=>{  
             axios.patch(AppURL.IssuedBalance,balance_data,{ 
                 headers: {
                "Content-Type": "application/json",
                 "Authorization": "Token "+sessionStorage.getItem("token"),
             },}).then(re=>{
            // // console.log("ok");
             })
            
            cogoToast.success("Item Issued to Site",{position:'top-right'});
            //new data will be reloaded
            forceUpdate();
        })
    }
   
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
              //alert(single.project['id']);
              console.log(item)
              let mtoitemid=single.id;
              let balanceqty=single.balance;
                    return(
                      <>
                      {



// <td>{single.Issued_item['itemcode']}</td>                         
// <td>{single.Issued_item['name']}</td>
// <td>{single.Issued_item['length']}</td>
// <td>{single.color}</td>
// <td>{parseInt(single.quantity)}</td>
// <td>{parseInt(single.actual_quantity)}</td>
// <td>{parseInt(single.quantity)-parseInt(single.balance)}</td>
// <td>{single.revoke}</td>
// <td>{parseInt(single.returned)}</td>
// <td>{parseInt(single.balance)+parseInt(single.returned)}</td>
// <td>{single.remarks}</td>


                        (single.Issued_item['type']=='2' && (single.color =='MF' || single.color =='NA'))?
                        <tr key={i}>
                        <td>
                            <button className='btn btn-danger btn-sm' >{i}</button></td>
                          
                            <td>{single.Issued_item['itemcode']}</td>   
                            <td>{single.Issued_item['name']}</td>                      
                            <td>{single.Issued_item['length']}</td>
                            <td>{single.color}</td>
                            <td>{parseInt(single.quantity)}</td>
                            <td>{parseInt(single.actual_quantity)}</td>
                            <td>{parseInt(single.quantity)-parseInt(single.balance)}</td>
                            <td>{single.revoke}</td>
                           
                            <td>{parseInt(single.returned)}</td>
                            <td>{parseInt(single.balance)+parseInt(single.returned)}</td>
                            
                            <td>{single.remarks}</td>
                             
                                          <td >
                              {
                                parseInt(single.balance)>0?
                                   <>
                                   {
                                  (single.color=='MF' || single.color=='NA')?
                                   <form onSubmit={IssueForSite}>
                                   <Form.Group className="mb-2 mt-2 form-inline" controlId="formBasicEmail">
                                   <span className='form-inline input-group text-width-reserved'> 
                                      <select class="form-select" aria-label="Default select example"  name="deliverynote">
                                                   {DNLIST.map((guest, index) => {
                                                   // totalCartPrice += item.unit_price*item.quantity;
                                                   return(         
                                                   <option key={index} value={guest.id}  >{ guest.issue_project['refrence_no']+" - "+guest.issue_project['name'] } ({guest.prsrno}) </option>
                                                   
                                               )}
                                               )
                                               }
                                        </select>
                                       <Form.Control  className='resizedTextbox' type="number" placeholder="quantity"  name='quantity' />
                                       <Form.Control  className='resizedTextbox' type="text" placeholder="remarks"  name='remarks' />
                                       <Form.Control type="hidden" placeholder=""  name='item_id' value={single.Issued_item['id']} required />   
                                       <Form.Control type="hidden" placeholder=""  name='project' value={single.project['id']} required />   
                                       <Form.Control type="hidden" placeholder=""  name='issue_id' value={single.id} required />  
                                       <Form.Control type="hidden" placeholder=""  name='balance' value={single.balance} required />    
                                       <Form.Control type="hidden" placeholder=""  name='mto_id' value={single.issuingmto['id']} required />                                       
                                      <button  className='btn btn-success'>Issue for Site</button>
                                   </span>
                                   </Form.Group>
                                   </form>
                                   :
                                   null
                                
                                    }
                         
                     
                               

                                </>
                                            
                              
                                :
                                <span>NA</span>
                              }
                                    
                                                        
                                          

                                     
                                            </td>
                                           
                                        
                                    
                          

                                
                                
                            </tr>
                     
                        :null
                      }

                           
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
export default AllMtoSiteIssue
