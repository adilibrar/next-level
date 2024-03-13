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
import 'react-select-search/style.css'
import {Link, useNavigate} from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';


function OrderDetailPage(){

    const navigate =useNavigate();
    const location = useLocation();
    const Order_id=location.state.id;
    const order_status=location.state.status;
    const[po,setPO]=useState([]);
    const[itemvalue,setItemValue]=useState([])
    const[cart,setCart]=useState([]);
    const[qcart,setQuotationCart]=useState([]);
    const [inputFields, setInputFields] = useState([
    ]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const status=sessionStorage.getItem('code');
    const OrderID=location.state.id;
    useEffect(()=>{
    const status_First=sessionStorage.getItem('code');
    const check_login=sessionStorage.getItem('login');
       if(!check_login){
          navigate('/login')
        }
        else if(check_login){
          if(status=='SI'||status=='FI' ||status=='PI'){
            axios.get(AppURL.OrderDetail(OrderID)).then(response=>{
              setPO(response.data);
              })
            axios.get(AppURL.OrderItems(Order_id)).then(response=>{
              setCart(response.data);
              })
              axios.get(AppURL.QuotationOrderItem(Order_id)).then(response=>{
                setQuotationCart(response.data);
                })
  
              
          }
          else{ 
            navigate('/');
            alert('you are not allowed to access , your action will be reported');
                }
        }    
 
    },[ignored]);

const HandleApproveAll=(e,order_id)=>{
  e.preventDefault();
  //alert("This service is not available at the moment");
  axios.get(AppURL.ApproveOrderAndItem(order_id)).then(response=>{
    if(response.data){
      cogoToast.success("Order Approved Successfully",{position:'top-right'});
      //navigate('/purchase-request')
      navigate('/purchase-request')
    }   
  })
}

const handleOrder = (e) => {
    e.preventDefault();
    axios.get(AppURL.ApproveOrder(Order_id)).then(response=>{
      if(response.data){
        cogoToast.success("Order Approved Successfully",{position:'top-right'});
        navigate('/orders')
      }   
    })
    
};

const HandleItem=(e,id)=>{
  e.preventDefault();
  axios.get(AppURL.ApproveOrder(id)).then(response=>{
    if(response.data){
      cogoToast.success("Order Approved Successfully",{position:'top-right'});
      //navigate('/orders')
      forceUpdate();
    }   
  })

}



const HandleItemQuotation=(e,id)=>{
  e.preventDefault();
  axios.get(AppURL.QuotationOrderItemUpdate(id)).then(response=>{
    if(response.data){
      cogoToast.success("Order Approved Successfully",{position:'top-right'});
      //navigate('/orders')
      forceUpdate();
    }   
  })

}
console.log(po.quotation);
if(po.quotation=='1'){
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

           <Alert variant="primary">
        Here is the list of All the Items to Approve.
        
      </Alert>
      <Form onSubmit={handleOrder}>
     
  <Table striped bordered hover size="sm">
    <thead>
      <tr>
      <th>Sr.</th>
        <th>Item Name</th>
        <th>Date</th>
        <th>Project Name</th>
         <th>Unit</th>
        <th>Quantity</th>
        <th>Weight</th>
        <th>Price</th>
        <th>VAT</th>
        <th>Total Price</th>
        <th>Action</th>
      </tr>
    </thead>
    
    <tbody>
         
        {
  
      qcart.map((cartitem,sr)=>{
        //  let data = [...inputFields];
         // data[sr]['quantity'] = cartitem.quantity;
          //setInputFields(data);
          
          if(status==='FI'){
          return(
          <tr key={sr}>
            <td>{sr+1}</td>
          <td className='col-xs-3 p-3'>
          {cartitem.title} 
          </td>

          
      
          <td className='col-xs-3 p-3'>{cartitem.assigned_date}</td>
  
          <td className='col-xs-3 p-3'>
           {cartitem.projectorderquotation['refrence_no'] } - {cartitem.projectorderquotation['name'] }
          </td>
          <td className='col-xs-3 p-3'>
           {cartitem.quotationuom['name']} 
          </td>

          <td className='col-xs-3 p-3'>
           {cartitem.quantity } 
          </td>
          <td className='col-xs-3 p-3'>
               {
               (cartitem.weight=='1')?
                null 
               :cartitem.weight
               } 
              </td>
          <td className='col-xs-3 p-3'>
              {cartitem.amount } 
          </td>
          <td className='col-xs-3 p-3'> 
          {cartitem.vat}            
          </td>


          <td className='col-xs-3 p-3'> 
              {                  ((cartitem.weight*cartitem.amount)*cartitem.quantity).toFixed(2)}            
              </td>
    
          <td>
            {
            status==='FI'?
              cartitem.status==='1'?
              <button className='btn btn-success' onClick={(e) => HandleItemQuotation(e,cartitem.id)} >Approve</button>
              :
              <p>Approved</p>
            :null
            }
            </td>
         
          </tr>   
          )

          }

          if(status==='SI'){
           // if(cartitem.Supplier['id']=='1'){
            return(
              <tr key={sr}>
                <td>{sr+1}</td>
              <td className='col-xs-3 p-3'>
              {cartitem.title} 
              </td>
              
              <td className='col-xs-3 p-3'>
              {cartitem.assigned_date} 
              </td>
      
              <td className='col-xs-3 p-3'>
               {cartitem.projectorderquotation['refrence_no'] } - {cartitem.projectorderquotation['name'] }
              </td>
              <td className='col-xs-3 p-3'>
                {cartitem.quotationuom['name']} 
                </td>
              <td className='col-xs-3 p-3'>
               {cartitem.quantity } 
              </td>
              <td className='col-xs-3 p-3'>
               {
               (cartitem.weight=='1')?
                null 
               :cartitem.weight
               } 
              </td>
              <td className='col-xs-3 p-3'>
                  {cartitem.amount } 
              </td>
              <td className='col-xs-3 p-3'> 
              {cartitem.vat}            
              </td>
              <td className='col-xs-3 p-3'> 
                {
                  ((cartitem.weight*cartitem.amount)*cartitem.quantity).toFixed(2)
                }            
              </td>
    
           
              <td className='col-xs-3 p-3'>
          
  
            {
                status==='SI'?
                  cartitem.status==='1'?
                  <p>Pending</p>
                  :
                  <p>Approved</p>
                :null
                }
                </td>
              {
                  status==='PI'?        
                    <button>+</button>
                  :
                  null
                   }
              </tr>   
              )
 //}
            }

           else if(status==='FI'){
              
            }

})    
  }
      

   
  
    </tbody>
  </Table>
  
  </Form>
  {

  }
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

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
    
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="second">
        
             <div className='mt-5'></div>

             <Alert variant="primary">
          Here is the list of All the Items to Approve.
          
        </Alert>
        <Form onSubmit={handleOrder}>
       
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
        <th>Item Code</th>
          <th>Item Name</th>
          
          <th>Date</th>
          <th>Ordering For</th>
          <th>Borrowed / Reason</th>
         
           <th>MTO ID</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
      </thead>
      
      <tbody>
           
          {
    
        cart.map((cartitem,sr)=>{
          //  let data = [...inputFields];
           // data[sr]['quantity'] = cartitem.quantity;
            //setInputFields(data);
            console.log(cartitem)
            if(status==='FI'){
            if(cartitem.Supplier['id']=='1'){
            return(
            <tr key={sr}>
            <td className='col-xs-3 p-3'>
            {cartitem.order_item['itemcode']} 
            </td>
            <td className='col-xs-3 p-3'>
            {cartitem.order_item['name']} 
            </td>
            
            <td className='col-xs-3 p-3'>{cartitem.assigned_date}</td>
    
            <td className='col-xs-3 p-3'>
             {cartitem.forprojectorder['name'] }
            </td>

            <td className='col-xs-3 p-3'>
             {cartitem.fromprojectorder['name'] } 
            </td>


            <td className='col-xs-3 p-3'>
                {cartitem.mtocartorder['id'] } 
            </td>
            <td className='col-xs-3 p-3'> 
            {cartitem.quantity}            
            </td>

            <td className='col-xs-3 p-3'>
              {
              status==='FI'?
                cartitem.status==='1'?
                <button className='btn btn-success' onClick={(e) => HandleItem(e,cartitem.id)}>Approve</button>
                :
                <p>Approved</p>
              :null
              }
              </td>
                 {
                  status==='PI'?        
                  <button>+</button>
                :
                null
                 }
            </tr>   
            )
 }
            }

            if(status==='SI'){
             // if(cartitem.Supplier['id']=='1'){
              return(
              <tr key={sr}>
              <td className='col-xs-3 p-3'>
              {cartitem.order_item['itemcode']} 
              </td>
              <td className='col-xs-3 p-3'>
              {cartitem.order_item['name']+" - "+cartitem.order_item['length']} 
              </td>

   
              <td className='col-xs-3 p-3'>{cartitem.assigned_date}</td>
      
              <td className='col-xs-3 p-3'>
               {cartitem.forprojectorder['name'] }
              </td>
  
              <td className='col-xs-3 p-3'>
               {cartitem.fromprojectorder['name'] } 
              </td>
  
  
              <td className='col-xs-3 p-3'>
                  {cartitem.mtocartorder['id'] } 
              </td>
              <td className='col-xs-3 p-3'> 
              {cartitem.quantity}            
              </td>
  
              <td className='col-xs-3 p-3'>
          
  
            {
                status==='SI'?
                  cartitem.status==='1'?
                  <p>Pending</p>
                  :
                  <p>Approved</p>
                :null
                }
                </td>
                   {
                    status==='PI'?        
                    <button>+</button>
                  :
                  null
                   }
              </tr>   
              )
   //}
              }
  
})    
    }
        

     
    
      </tbody>
    </Table>
    
    </Form>
    {
    (status==='FI')?
      (po.status=='1')?
        <button  onClick={(e)=>HandleApproveAll(e,Order_id)}  className='btn btn-danger mb-3'>Approve all</button>
      :
        <span>Approved</span>
      :null
    }
   
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
export default OrderDetailPage
