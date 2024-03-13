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


function DeliveryNoteDetail(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[stock,setStock]=useState([]);
    const [error,setError]=useState([]);
    const [loading,setLoading]=useState(true);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[unit,setUnit]=useState([]);
    
    const[allitem,setAllItem]=useState([]);    

    const POId=location.state.id;
    let total_weight=0;
    let total_sqm=0;
    let total_set=0;
    const[dndata,setDNData]=useState([]);
    const [pdffile, setPdffile] = useState("");
    const [orders, setorders]=useState([]);
    const[uom,setUOM]=useState([]);
// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });
    
    

    useEffect(()=>{
      getCountries()
        //console.log(item)
      axios.get(AppURL.SiteDNDetail(POId)).then(response=>{
        setDNData(response.data);
        //alert(item.is_both);
        axios.get(AppURL.UnitOfMeasure).then(response=>{
            setUOM(response.data);
            setLoading(false);
        
        })
        //setLoading(false);
        })
        
      
    
    },[ignored]);

    const [region, setRegion] = useState("");
  
    const getCountries = async()=>{
      try{
          const response= await axios.get(AppURL.SiteDNItem(POId))
          setItem(response.data);
        
          const responseitem= await axios.get(AppURL.StockList)
          setAllItem(responseitem.data);
          
      }catch(error){
          console.log(error);
      }
  }




const handleSubmit = (e) => {
    e.preventDefault();
    
    let qty=parseInt(e.target.quantity.value);
    if(stock<qty){
      cogoToast.error("Something went wrong...")
    }
    else{

    
    const issuig_data={
        project:dndata.issue_project['id'],
        Issued_item:e.target.item.value,
        quantity:e.target.quantity.value,
        balance:0,
        mto:1,
        remarks:'Site Request',
        color:'NA',
        actual_quantity:0,
        revoke:0,
        returned:0,
        issuingmto:1,
        status:4
        }

  

    const payload="sub"
    const payload_data={
        quantity:e.target.quantity.value,
        payload:payload,
    }
    axios.post(AppURL.StockValueUpdateBYItem(e.target.item.value),payload_data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(re=>{

        axios.post(AppURL.IssueStock,issuig_data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response =>{  
            if(response.status===201){
                cogoToast.success("Item has been Reserved",{position:'top-right'});
                console.log(response.data)
                const datasite={
                    Issuingproject:dndata.issue_project['id'],
                    sitedeliverymto:1,
                    SiteItem:e.target.item.value,
                    site_issuing_id:response.data['id'],
                    remarks:e.target.remark.value,
                    quantity:qty,   
                    site_delivery_note_no:POId
                  }

                axios.post(AppURL.SaveSiteItem,datasite,{
                    headers: {
                             "Content-Type": "application/json",
                             "Authorization": "Token "+sessionStorage.getItem("token"),
                           },}).then(res=>{
                                if(response.status===201){
                                    cogoToast.success("Item has been Issued",{position:'top-right'});
                                    }
                                    forceUpdate();
                           })
                }
                
           })   
        })
      
      
    e.target.reset();
  }
}
 

    if(loading){
        return <h4>Loading .....</h4>
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
            <div className='col d-print-none'>

            <Form  onSubmit={handleSubmit}>
            <div className='row col-md-12'>
            <div className='col-md-8'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Please Select Items</Form.Label>
                    <Form.Label></Form.Label>
                    <>
                    <Select
                        name='item'
                        rules={{ required: true }}
                        value={region}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegion(item); 
                        setStock(item.key2)
                        //console.log(item.key2)
                        }}
                        options={allitem.map((guest, index) => {
                        return {
                          label: guest.item['barcode']+" - "+guest.item['itemcode']+" - "+guest.item['name']+" - "+guest.item['Supplier']['name']+" - "+guest.item['length']+" - "+guest.item['finishing']['name']+" ( "+guest.quantity+" )",
                          value: guest.item['id'],
                            key: index,
                            key2: guest.quantity,
                        };
                        })}
                    />
                    </>

                <Form.Text className="text-muted">
                        Please select the item ,add quantity and then click on + button .
                    </Form.Text>
                </Form.Group>
                </div>
                <div className='col-md-4'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                  <Form.Label>Quantity and Remarks</Form.Label>
                  <span className='form-inline input-group'>  
                    <Form.Control type="text" placeholder="Quantity" name='quantity'  />                
                    <Form.Control type="text" placeholder="Remarks" name='remark'  />
                    <Button  variant="primary" type="submit">+</Button>           
                  </span>    
                  </Form.Group>

                    </div>

                </div>
             </Form>
            </div>
            <div className='row col-sm-12'>
             
            <div className='col-sm-5'>
            
            <img src="https://slimwindows.ae/wp-content/uploads/2021/09/Next-Level-Group-horisontal.jpg" alt="Admin" className="rounded-circle" width="265" />
                    
          </div>
                <div className='col-sm-7 delivery-note-fs'>
                <Table bordered size="sm" className=' dntable-border'>
            
                <tbody>
                <tr>
                <td>Job No</td>
                <td>J-{dndata.issue_project['refrence_no']} - {dndata.issue_project['name']}</td>
            
                </tr>
                
                <tr>
                <td>Date</td>
                <td> {dndata.created_at}</td>
            
                </tr>
            
                <tr>
                <td>DN#</td>
                <td>SDN-{dndata.id} ({dndata.prsrno})</td>
        
                </tr>
              
                    </tbody>
                </Table>
                    </div>

                </div>
           
              <div className='row col-sm-12'>
            <div className='col-sm-12'>
                <h4 className='text-center'><strong className='delivery-note-fs'>Site Delivery Note</strong></h4>
                <h6 className='delivery-note-fs text-center'>Pioneer Metal Industries LLC   Tel: +971-4 8833221,&nbsp;&nbsp;&nbsp;Fax: +971 - 8833224&nbsp;&nbsp;&nbsp;Email: info@pioneer-mi.com</h6>
               </div>
                <div className='col-sm-5'>
             
                    </div>

                </div>
             <div className='mt-2'></div>

    <Table striped bordered hover size="sm" className='delivery-note-fs dntable-border'>
      <thead>
        <tr>
          <th>S.N</th>
          <th>Item Code</th>       
          <th>Description</th>
              
          <th>Unit</th>
          <th>Quantity</th>
          <th>Remarks</th>

        </tr>
      </thead>
      <tbody>
      {
     
     item.map((single,i)=>{
      //console.log(single.SiteItem['weight']);
      let item_length=0;
      // || !(single.SiteItem['id']==262) || !(single.SiteItem['id']==263) || !(single.SiteItem['id']==264)
        if((single.SiteItem['weight'])){
          //console.log(single.SiteItem['id']);
            if(single.custom=='1'){
              //console.log(single.SiteItem['weight']);
              if((single.SiteItem['id']==262) || (single.SiteItem['id']==263) || (single.SiteItem['id']==264)){
                total_weight=total_weight+0;
              }
              else{
              total_weight=(parseFloat(total_weight)+((parseFloat(single.SiteItem['weight'])*parseInt(single.quantity))*single.length)/1000)
              }
              //console.log(total_weight);

              //console.log('if');
            } 
            else{
              total_weight=(parseFloat(total_weight)+((parseFloat(single.SiteItem['weight'])*parseInt(single.quantity))*single.SiteItem['length'])/1000)
              //console.log(total_weight);
              //console.log('else');
            }
                
           // total_weight=(parseFloat(total_weight)+parseFloat(single.SiteItem['weight'])*parseInt(single.quantity));
          
        }

        if(!((single.SiteItem['length']=='NA') && (single.SiteItem['width']=='NA') )){
          
            total_sqm=(((parseFloat(single.SiteItem['length'])*parseFloat(single.SiteItem['width']))/1000)*parseInt(single.quantity)+total_sqm);          
           }

           if(((single.SiteItem['length']=='NA') && (single.SiteItem['width']=='NA') && (!single.SiteItem['weight'])) || (single.SiteItem['id']==262) || (single.SiteItem['id']==263) || (single.SiteItem['id']==264) ){
            if(single.SiteItem['type']=='4'){

            }
            else{
            total_set=parseInt(total_set)+parseInt(single.quantity);
            }
           }
        }
         )
        
       }
        {

    item.map((single,i)=>{
      let avqty=0;
      let length=0
         // stock.map((SStock,si)=>{
           // if(SStock.item===single.itemname['id']){
            //avqty=SStock.quantity;
            //}
          //})
                  
                    return(
                            <tr key={i}>

                            <td>{i+1}
                            </td>
                            <td>{single.SiteItem['itemcode']}</td>
                            <td>{single.SiteItem['name']}</td>
                            {
                                          
                                          uom.map((un,index)=>{
                                            
                                              if(un.id == parseInt(single.SiteItem['unit'])){
                                                return(
                                                      <td>  {un.name} </td>                                               
                                              
                                          )
                                                }
                                          })
                                      }
                            <td>{single.quantity}</td>
                              <td>{single.remarks}</td>
                          </tr>
                          
                      )
                      

        }
      )





    }

      </tbody>
    </Table>

    <div className='row mt-5 col-sm-12'>
            <div className='col-sm-6'>
      
             <h6> Aproved BY: __________________</h6>
            </div>
            <div className='col-sm-1'>
               
                    </div>

                <div className='col-sm-5'>
                <h6 className='delivery-note-fs'> Delivered To: {dndata.deliveredto}</h6>
                <h6 className='delivery-note-fs'> Received By: __________________</h6>
                
                <h6 className='delivery-note-fs'> Signature:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__________________</h6>
                
                <h6 className='delivery-note-fs'> Contact No:&nbsp;&nbsp;__________________</h6>
                    </div>

                </div>


            </Tab.Pane>
            
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>





      </div>
      </>

    )
}
export default DeliveryNoteDetail
