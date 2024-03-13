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


function RSS(){
    const location = useLocation();
    const[loading,setloading]=useState(true);
    const[item,setItem]=useState([]);
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
 
    

useEffect(()=>{
          axios.get(AppURL.RevokeSubmittedData).then(response=>{
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
                status:e.target.status.value,
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
             This option can be used to revoke or Borrow items from projects that are no longer needed or that must be issued to another project for an emergency purpose. However, once you take this step, it cannot be undone for completed Projects.
             
        </Alert>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>sr</th>
          <th>Code</th>
          <th>Name</th>
          <th>P.Name</th>
          <th>P.Refrence</th>
          <th>Length</th>
          <th>Color</th>
          <th>Reserved</th>
          <th>Actual</th>
          <th>Used</th>
          <th>Balance</th>
          <th className='btn-coloumn-revoke'>Action</th>
        </tr>
      </thead>
      <tbody>

        {
            item.map((singleitem,i)=>{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem.Issued_item['itemcode']}</td>
                        <td>{singleitem.Issued_item['name']}</td>
                        <td>{singleitem.project['name']}</td>
                        <td>{singleitem.project['refrence_no']}</td>
                        <td>{singleitem.Issued_item['length']}</td>
                        <td>{singleitem.finishing}</td>
                        <td>{singleitem.quantity}</td>
                        <td>{singleitem.actual_quantity}</td>
                        <td>{singleitem.quantity-singleitem.balance}</td>
                        <td>{singleitem.balance}</td>
                        <td className=''>
                            <Form onSubmit={handleRevoke}>
                          
                            <Form.Group className="form-inline input-group" controlId="formBasicEmail">
                                <Form.Control  type="text" class="form-control " name='balance' defaultValue={singleitem.balance}  ></Form.Control >
                                <Form.Control  type="hidden" class="form-control " name='check_balance' defaultValue={singleitem.balance}  ></Form.Control >
                                <input type="hidden" name='item_id' defaultValue={singleitem.Issued_item['id']} readOnly ></input>
                                <input type="hidden" name='status' defaultValue={singleitem.project['status']} readOnly ></input>
                                <input type="hidden" name='issue_id' defaultValue={singleitem.id} readOnly ></input>
                            <button type="submit" disabled className='btn btn-danger'>Revoke-Borrow</button>
                            </Form.Group>
                            
                            </Form>
                            </td>
                    </tr>
                )
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
export default RSS
