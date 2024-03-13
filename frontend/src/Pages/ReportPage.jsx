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


function ReportPage(){
    const location = useLocation();
    const[loading,setloading]=useState(true);
    const[item,setItem]=useState([]);
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
 
    

useEffect(()=>{
          axios.get(AppURL.LowStock).then(response=>{
            setItem(response.data);
           
            if(response.data){
                setloading(false)
              //  console.log(item)
            }
            })

        
    },[ignored]);


const handleRevoke=(e)=>{

  e.preventDefault();

  
  let result = window.confirm("This action can not be Reversed, Are you sure you want to revoke this Item ?");
  if (result == true) {
    if(e.target.balance.value > e.target.check_balance.value){
        cogoToast.error("your entered number should be less than balance",{position:'top-right'});   
        }
        else{
            const data={
                item_id:e.target.item_id.value,
                issue_id:e.target.issue_id.value,
                balance:e.target.balance.value,
            }
            
            axios.post(AppURL.UpdateRevokedData,data,{ 
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+sessionStorage.getItem("token"),
              },}).then(re=>{
                if(re.status=='201'){
                  
                    cogoToast.success("added successfully to stock...")
                }

        
                e.target.reset();
                forceUpdate();
            })

        }
 } else {
    cogoToast.info("Cancelled Successfully")
}

}

if(loading){
    return(
        <h1>Loading</h1>
    )
}

   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
    
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="second">
         
             <div className='mt-5'></div>

             <Alert variant="danger" className='d-print-none'>
          Out of Stock, Cortizo        </Alert>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
            <th>Sr</th>
          <th>Code</th>
          <th>Name</th>
          <th>length</th>
            <th>Finishing</th>
            <th>Qty</th>

        </tr>
      </thead>
      <tbody>

        {
            item.map((singleitem,i)=>{
                if(singleitem.supplier=='CORTIZO'){
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem.itemcode}</td>
                        <td>{singleitem.item}</td>
                        <td>{singleitem.length}</td>
                        <td>{singleitem.finishing}</td>
                        <td>{singleitem.quantity}</td>
                    </tr>
                )
                }
            })
      
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
export default ReportPage
