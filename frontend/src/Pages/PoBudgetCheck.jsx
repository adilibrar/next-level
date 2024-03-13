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


function PoBudgetCheck(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[budget,setBudget]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[qitem,setQItem]=useState([]);
    const[gitem,setGItem]=useState([]);

    const POId=location.state.POID;
    const status=sessionStorage.getItem('code');

    const [po, setPO]=useState([]);
    const [dn, setdn]=useState([]);
    const [unit, setUnit]=useState([]);
    const [type, settype]=useState([]);
    
    const [loading,setLoading]=useState(true);
    //const [islength,setLength]=useState(false);
    //const [discount,setDiscount]=useState(false);
    let discount=false;
    let islength=false;
    let po_total=0;
   let vatdetail=0
// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

let total_price=0;
let total_tax=0;
let total_discount=0
let currency='';

    useEffect(()=>{
      
      getCountries();
        axios.get(AppURL.POITEMByPO(POId)).then(response=>{
        setItem(response.data);
        //alert(item.is_both);
        })

        axios.get(AppURL.POQITEMByPO(POId)).then(response=>{
          setQItem(response.data);
          //alert(item.is_both);
          })

        axios.get(AppURL.GlassPOItem(POId)).then(response=>{
            setGItem(response.data);
            //alert(item.is_both);
            })
          

        axios.get(AppURL.UnitOfMeasure).then(response=>{
          setUnit(response.data);
          //alert(item.is_both);
          })

          axios.get(AppURL.SupplierDNINList).then(response=>{
            setdn(response.data);
            //alert(item.is_both);
            })
            
            axios.get(AppURL.GetItemType).then(response=>{
              settype(response.data);
              //alert(item.is_both);
              })
          axios.get(AppURL.SinglePO(POId)).then(response=>{
              setPO(response.data);
              //setLoading(false)
              if(response){
              //console.log(response.data)
              axios.get(AppURL.GetBudgetList(parseInt(response.data['projectpo']['id']))).then(response=>{
                setBudget(response.data);
                setLoading(false)
                })
                //console.log(response.data['projectpo']['id'])
                }

              })
    },[ignored]);

  const [region, setRegion] = useState("");
  
  const getCountries = async()=>{
    try{

      {

        
  }
    }catch(error){
        console.log(error);
    }
}


const ApprovePO=(e,po_id)=>{
  e.preventDefault();

const data={
  id:po_id
}
  
  axios.post(AppURL.ApproveSubmittedPO,data
    ,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },
  }).then(response=>{
  //alert(response.status);

    if(response.status == '200'){
      cogoToast.success("PO Approved Successfully",{position:'top-right'});
    }   
    forceUpdate();
  })
}


    
    if(loading){
      return <h4>Loading .....</h4>
 } 

if(po.serviceQuotation=='1'){

  if(status=='AC'){
    return(<>
    
    <div className='container-fluid'>

<Tab.Container id="left-tabs-example" defaultActiveKey="second">
<Row>
  <Col sm={12}>
    <Tab.Content>
    
      <Tab.Pane eventKey="second">
<div className='row col-sm-12'>

   <div className='col-sm-6 delivery-note-fs'>
   
    <h3>Purchase Order</h3>
    <h6> {po.PurchaseSupplier['name']} </h6>
    <h6> {po.PurchaseSupplier['address']} </h6>
    <h7> {po.PurchaseSupplier['contact']} , </h7>
    <h7> {po.PurchaseSupplier['email']} </h7><br></br>
    <h7>TRN: {po.PurchaseSupplier['vat_number']}</h7>

       </div>

<div className='col-sm-6'>

<img src="https://gcdnb.pbrd.co/images/DJc4pg0y9SyZ.jpg?o=1" alt="Admin" className="" width="265" />
<div className='col-sm-12 row'>
    <div className='col-sm-3 delivery-note-fs'>
      <h7><b>PO #</b></h7>
      <p>{po.refrence}</p>
      <h7><b>Dated</b></h7>
      <p>{po.creation_date}</p>
    
    </div>
    <div className='col-sm-9 delivery-note-fs'>
    <h7><b>Refrence</b></h7>
      <p>{po.quotationRefrence}</p>
      <h7><b>TRN</b></h7>
      <p>100073339200003</p>
    </div>
  </div>

</div>
   </div>

</Tab.Pane>
</Tab.Content>
</Col>
</Row>
</Tab.Container>
</div>
<div className='row container-fluid col-sm-12'>
<div className='col-sm-12'>
  <h6 className='delivery-note-fs text-center'>Next Level Innovative Glass Metals LLC Jebel Ali Industrial Area 1 Lehbab Road, P.O Box:413717, Dubai UAE</h6>
  <h6 className='delivery-note-fs text-center'> Tel: +971 4 8812343,&nbsp;&nbsp;&nbsp;Fax: +971 4 8812345&nbsp;&nbsp;&nbsp;Email: info@nlc-me.com</h6>
 
 </div>
  <div className='col-sm-5'>

      </div>

  </div>
<div className='mt-2'></div>
 <Table striped bordered hover size="sm" className='delivery-note-fs dntable-border '>
         <thead>
        <tr>
          <th>S.N</th>
          <th>Item</th>
          <th>Project</th>
          <th>Account</th>
          <th>Unit</th>
          <th>Quantity</th>
          <th>Weight</th>
          <th>Price</th>
          <th>Vat</th>
          <th>Amount</th>
  
        </tr>
      </thead>
      <tbody>
        
      {
         
         qitem.map((single,i)=>{
          currency=po.currency['symbol'];
          let single_vat=0;
          total_price=(total_price+((single.price*single.weight)*single.quantity))
          if(single.vat >0){
       
              single_vat=(((single.price/100)*single.weight)*single.quantity)*single.vat
              total_tax=total_tax+single_vat
            
          }
          return(
          <tr key={i}>
              <td>{i+1}</td>
              <td>{single.po_item_title}</td>
              <td>{single.po_item_project['refrence_no']} - {single.po_item_project['name']}</td>
              <td>{single.quotaccountshead['title']}</td>
              <td>{single.qpouom['name']}</td>
              <td>{single.quantity}</td>
              <td>{single.weight}</td>
              <td>{single.price}</td>
              <td>{single.vat}%</td>
              <td>{((single.weight*single.price)*single.quantity).toFixed(2)}</td>
          </tr>
          )
        })
    }
        </tbody>
        </Table>

        <div className='row col-sm-12'>
        
        <div className='col-sm-7 delivery-note-fs'>
                  <div className='col-sm-12'>
                  <div className='col-sm-2'></div>
                  <div className='col-sm-8'>
                  <h7><strong>Payment Terms: </strong>{po.payment_term}</h7><br></br>
                  <h7><strong>Note: </strong>{po.note}</h7>
                  </div>
                  <div className='col-sm-2'></div>
                  </div>
            </div>
     <div className='col-sm-5 delivery-note-fs'>
     <Table bordered size="sm" className=' dntable-border'>
        <tbody>
        <tr>
        <td><>Sub Total</></td>
        <td>{ new Intl.NumberFormat().format(total_price.toFixed(2)) }</td>
    
        </tr>
      {
        discount?
                  
        <tr>
        <td><>Discount</></td>
        <td>{ new Intl.NumberFormat().format(total_discount.toFixed(2)) }</td>
    
        </tr>
        :null

      }
        <tr>
        <td><>Total VAT</></td>
        <td>
        { new Intl.NumberFormat().format(total_tax.toFixed(2)) }
        </td>    
        </tr>

    
        <tr>
        <td>Total <b> {currency}</b></td>
        
        
       <td>{ new Intl.NumberFormat().format(((total_price)+total_tax).toFixed(2)) }</td>
        </tr>
            </tbody>
        </Table>
  </div>
        </div>
  {( po.accounts_approval =='0')?
        
        <> &nbsp;&nbsp;&nbsp;<button  onClick={(e)=> ApprovePO(e,po.id)} className='btn btn-success'>Approve PO</button> </>
    :
    <> &nbsp;&nbsp;&nbsp;<button disabled  className='btn btn-success'>Approved</button> </>
    }
    </>
    )
  }

  else{
    return(
      <>Nothing to recieve</>
    )
  }
}
 currency=po.currency['symbol'];
 if(status=='AC'){
  return(
    
    <>
    {
  
  item.map((single,i, arr)=>{
    //setLoading(true)
    //console.log(arr.length)
    if(single.po_item['type']=='1'){
      //avqty=SStock.quantity;
      islength=true
      //setLength(true)
      }
    // console.log(single.discount)
      if(single.discount!=''){
        //avqty=SStock.quantity;
        discount=true
      //setDiscount(true)
      }
      
      if (arr.length  === i) {
        // Last one.
        //console.log("last")
        
      }
      //setLoading(false)
    })
}
     <NavMenu className='d-print-none'></NavMenu>
     
         <div className='container-fluid'>

          <Tab.Container id="left-tabs-example" defaultActiveKey="second">
          <Row>
            <Col sm={12}>
              <Tab.Content>
              
                <Tab.Pane eventKey="second">
      <div className='row col-sm-12'>
    
             <div className='col-sm-6 delivery-note-fs'>
             
              <h3>Purchase Order</h3>
              <h6> {po.PurchaseSupplier['name']} </h6>
              <h6> {po.PurchaseSupplier['address']} </h6>
              <h7> {po.PurchaseSupplier['contact']} , </h7>
              <h7> {po.PurchaseSupplier['email']} </h7><br></br>
              <h7>TRN: {po.PurchaseSupplier['vat_number']}</h7>
             
    
              
        
                 </div>

          <div className='col-sm-6'>
         
         <img src="https://gcdnb.pbrd.co/images/DJc4pg0y9SyZ.jpg?o=1" alt="Admin" className="" width="265" />
         <div className='col-sm-12 row'>
              <div className='col-sm-3 delivery-note-fs'>
                <h7><b>PO #</b></h7>
                <p>{po.refrence}</p>
                <h7><b>Dated</b></h7>
                <p>{po.creation_date}</p>
              
              </div>
              <div className='col-sm-9 delivery-note-fs'>
              <h7><b>Refrence</b></h7>
                <p>{po.quotationRefrence}</p>
                <h7><b>TRN</b></h7>
                <p>100073339200003</p>
              </div>
            </div>

       </div>
             </div>

      </Tab.Pane>
      </Tab.Content>
      </Col>
      </Row>
      </Tab.Container>
      
      <div className='row col-sm-12  container-fluid'>
        <div className='col-sm-12'>
            <h6 className='delivery-note-fs text-center'>Next Level Innovative Glass Metals LLC Jebel Ali Industrial Area 1 Lehbab Road, P.O Box:413717, Dubai UAE</h6>
            <h6 className='delivery-note-fs text-center'> Tel: +971 4 8812343,&nbsp;&nbsp;&nbsp;Fax: +971 4 8812345&nbsp;&nbsp;&nbsp;Email: info@nlc-me.com</h6>
           
           </div>
            <div className='col-sm-5'>
         
                </div>

            </div>
         <div className='mt-2'></div>

   
         <Table striped bordered hover size="sm" className='delivery-note-fs dntable-border  container-fluid'>
         <thead>
        <tr>
          <th>S.N</th>
          <th>Item Code</th>

         <th>Description</th>
          <th>Item Type</th>
          <th>Account</th>
         {

          islength?
          <th>Length</th>
            :null
         }
         <th>UOM</th>
         <th>Project</th>
          <th>Quantity</th>
          <th>Unit Price</th>
  
          {
          discount?
          <th>Discount</th>
          :null
         }
         
          <th>Tax</th>
          <th>Amount</th>
  
        </tr>
      </thead>
      <tbody>
    
      {

item.map((single,i)=>{
 console.log(single)
//console.log("dfsfd")
      //total_price=total_price+(single.price*single.quantity)  
      let single_vat=0

      //console.log(single.pouom['id'])
      if(single.po_item['unit'] != single.pouom['id']){
     
        total_price=total_price+((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price);
        if(single.vat >0){

          if(single.discount !=''){
            single_vat=(((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat)-((((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat)*single.discount)/100;
          
            total_tax=total_tax+single_vat
          }
         else{ 
          single_vat=((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat;
          
          total_tax=total_tax+single_vat
        }
        }

        if(single.discount !=''){
          total_discount=total_discount+((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)*single.discount)/100)
        }
       
      }
      else{
        total_price=(total_price+(single.price*single.quantity))
        if(single.vat >0){
          if(single.discount!=''){
            single_vat=(((single.price/100)*single.quantity)*single.vat)-(((((single.price/100)*single.quantity)*single.vat)*single.discount)/100)
            
            total_tax=total_tax+(single_vat)
          }
          else{
            single_vat=((single.price/100)*single.quantity)*single.vat
            total_tax=total_tax+single_vat
          }
       
       
        }
       // console.log("i am in else")
        if(single.discount !=''){
          total_discount=total_discount+((((single.price*single.quantity))*single.discount)/100)
          //console.log(total_discount)
        }
      }
                return(

                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{single.po_item['itemcode']}</td>
                        <td>{single.po_item['name']}
                        
                        {
                             single.remarks!=''?
                             <> - {single.remarks}</>
                             :null
                        }
                        
                        </td>
                        <td>{
                        
                        type.map((ntype,i)=>{
                            if(ntype['id']==single.po_item['type']){
                                return(
                                  <>
                                  {ntype['name']}
                                  </>
                                )
                              }
                            })
                        }</td>
                                                <td  className='d-print-none'>{single.accountshead['title']}</td>
                          {
                            islength?
                            <td>{single.po_item['length']}</td>
                            :null
                          }
                          
                          {
                            single.po_item['unit'] != single.pouom['id']?
                            <>
                            <td>{
                              unit.map((units,i)=>{
                                if(units.id==single.pouom['id']){
                               // avqty=SStock.quantity;
                                return (units.name)
                                }
                           
                              })
                            }</td>
                            <td>{single.forprojectpo['refrence_no']} - {single.forprojectpo['name']}</td>
                            <td>{(((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000)).toFixed(2)} ({
                            
                                    unit.map((units,i)=>{
                                      if(units.id==single.po_item['unit']){
                                     // avqty=SStock.quantity;
                                      return (
                                        <>{single.quantity}-{units.name}</>
                                        )
                                      }
                                 
                                    })
                            })</td>
                            
                            
                            <td>{single.price}</td>
                            <td>{single.vat}%</td>
                            <td>{((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price).toFixed(2)}</td>
                           </>
                            :
                            <>
                            <td>{
                              unit.map((units,i)=>{
                                if(units.id===single.po_item['unit']){
                               // avqty=SStock.quantity;
                                return (units.name)
                                }
                            
                              })
                        }</td>
                        <td>{single.forprojectpo['refrence_no']} - {single.forprojectpo['name']}</td>
                        <td>{single.quantity}</td> 
                        <td>{single.price}</td> 
                        {
                            discount?
                            <td>{single.discount}%</td>
                            :null
                          }
                          
                      
                        <td>{single.vat}%</td>     
                        {
                          budget.map((balance,i)=>{
                            if(balance.BudgetHead['id']==single.accountshead['id'] ){
                              if(single.price*single.quantity<balance.amount){
                              return(
                                <td className='balance-equal'>{new Intl.NumberFormat().format(single.price*single.quantity)}</td> 
                              )}
                              else{
                                return(
                                  <td className='balance-low'>{new Intl.NumberFormat().format(single.price*single.quantity)}</td>
                                )
                               
                              }
                            }
                           
                          })
                        }                
                        
            </>
                          }
          
                     
                       
                      </tr>
                  )       
    })
  }
        </tbody>
        </Table>


    <div className='row col-sm-12'>
    
    <div className='col-sm-7 delivery-note-fs'>
              <div className='col-sm-12'>
              <div className='col-sm-2'></div>
              <div className='col-sm-8'>
              <h7><strong>Payment Terms: </strong>{po.payment_term}</h7><br></br>
              <h7><strong>Note: </strong>{po.note}</h7>
              </div>
              <div className='col-sm-2'></div>
              </div>

        </div>


 <div className='col-sm-5 delivery-note-fs'>

      
    <Table bordered size="sm" className=' dntable-border'>

    <tbody>

      
    <tr>
    <td><>Sub Total</></td>
    <td>{ new Intl.NumberFormat().format(total_price.toFixed(2)) }</td>

    </tr>
    {
        discount?
                  
        <tr>
        <td><>Discount</></td>
        <td>{ new Intl.NumberFormat().format(total_discount.toFixed(2)) }</td>
    
        </tr>
        :null

      }
    <tr>
    <td><>Total VAT</></td>
    <td>
    { new Intl.NumberFormat().format(total_tax.toFixed(2)) }
    </td>    
    </tr>


    <tr>
    <td>Total <b> {currency}</b></td>
    
   <td>{ new Intl.NumberFormat().format(((total_price-total_discount)+total_tax).toFixed(2)) }</td>
    </tr>
        </tbody>
    </Table>
</div>
    </div>
    


  {( po.accounts_approval =='0')?
        
        <> &nbsp;&nbsp;&nbsp;<button  onClick={(e)=> ApprovePO(e,po.id)} className='btn btn-success'>Approve PO</button> </>
    :
    <> &nbsp;&nbsp;&nbsp;<button disabled  className='btn btn-success'>Approved</button> </>
    
    }
</div>
    </>

    
  )
 }

}
export default PoBudgetCheck
