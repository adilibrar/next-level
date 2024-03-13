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
import Select from 'react-select'

import Alert from 'react-bootstrap/Alert';


function ApprovedPurchaseRequest(){

    const navigate =useNavigate();
    const location = useLocation();
    //const Order_id=location.state.id;
    const[countries,setCountries]=useState([]);
    //const order_status=location.state.status;
    const[item,setItems]=useState([]);
    const[unit,setUnit]=useState([]);
    const[accounts,setaccounts]=useState([]);
    const[itemvalue,setItemValue]=useState([])
    const[purchase,setpurchase]=useState([])
    const [loading,setLoading]=useState(false);
    const[cart,setCart]=useState([]);
    const [region, setRegion] = useState("");
    const [inputFields, setInputFields] = useState([
    ]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const status=sessionStorage.getItem('code');
      
    useEffect(()=>{
    const status_First=sessionStorage.getItem('code');
    const check_login=sessionStorage.getItem('login');
       if(!check_login){
          navigate('/login')
        }
        else if(check_login){
         
            axios.get(AppURL.StockList).then(response=>{
              setItems(response.data);
              })

              axios.get(AppURL.UnitOfMeasure).then(response=>{
                setUnit(response.data);
                })
  
              

            axios.get(AppURL.ApprovedOrderItem).then(response=>{
              setCart(response.data);

              })

              axios.get(AppURL.PurchaseOrderListLimit).then(response=>{
                setpurchase(response.data);
  
                })

                axios.get(AppURL.AccountsHead).then(response=>{
                  setaccounts(response.data);
    
                  })
                  console.log(accounts)
        }    
 
    },[ignored]);

    const HideItems=(e,mtoitemid)=>{
      e.preventDefault();
      const thisClicked=e.currentTarget;
      thisClicked.innerText="Hiding";
          //alert(response.data.message);
      thisClicked.closest("tr").remove();
    
      }
     
    const SentEmail=(e,id,itemcode,itemname,length,quantity,project,pr_no,mto)=>{
      e.preventDefault();
      // const thisClicked=e.currentTarget;
      // thisClicked.innerText="Hiding";

      // thisClicked.closest("tr").remove();
      const data={
        id:id,
        itemcode:itemcode,
        itemname:itemname,
        length:length,
        quantity:quantity,
        project:project,
        pr_no:pr_no,
        mto:mto,
        req:0
    }
      
        //cogoToast.success("Item Added to PO Successfully");
      setLoading(true);
        axios.post(AppURL.NAEmail,data,{
            headers:{
                "content-Type":"application/json",
                "Authorization":"Token "+sessionStorage.getItem("token"),
            }
             }).then(response=>{
               cogoToast.success('Email Sent Successfully...')        
                 
               forceUpdate();
               setLoading(false)
        })
        //forceUpdate();
      }
  
           
    const SentDeleteEmail=(e,id,itemcode,itemname,length,quantity,project,pr_no,mto)=>{
      e.preventDefault();
      // const thisClicked=e.currentTarget;
      // thisClicked.innerText="Hiding";

      // thisClicked.closest("tr").remove();
      const data={
        id:id,
        itemcode:itemcode,
        itemname:itemname,
        length:length,
        quantity:quantity,
        project:project,
        pr_no:pr_no,
        mto:mto,
        req:1
    }
      
        //cogoToast.success("Item Added to PO Successfully");
      setLoading(true);
        axios.post(AppURL.NAEmail,data,{
            headers:{
                "content-Type":"application/json",
                "Authorization":"Token "+sessionStorage.getItem("token"),
            }
             }).then(response=>{
               cogoToast.success('Item has been Removed and ,Email Sent Successfully...')        
                 
               forceUpdate();
               setLoading(false)
        })
        //forceUpdate();
      }
  
      
const handleSubmit=(e)=>{
    e.preventDefault();
    let pr_item_id=e.target.pr_item_id.value;
    let item_id=e.target.item_id.value;
    let price=e.target.price.value;
    const data={
        pono:e.target.po.value,
        price:e.target.price.value,
        po_item:e.target.item_id.value,
        forprojectpo:e.target.project.value,
        quantity:e.target.quantity.value,
        balance:e.target.quantity.value,
        vat:e.target.vat.value,
        POItemorderno:e.target.order_no.value,
        pouom:e.target.itemuom.value,
        discount:e.target.discount.value,
        remarks:e.target.remarks.value,
        accountshead:e.target.account.value,
    }

const data_dummy={
    id:'1',

}

    axios.post(AppURL.POItemSave,data,{
        headers:{
            "content-Type":"application/json",
            "Authorization":"Token "+sessionStorage.getItem("token"),
        }
         }).then(response=>{
           console.log(response)
           if(response.data['message']=='204'){
            cogoToast.error("selected account does not comes under this project budget....")
           }
          else if(response.data['message']=='203'){
            cogoToast.error("Not enough Budget, available for selected account....")
           }
          else if(response.data['message']=='201'){
            axios.post(AppURL.UpdatePRItems(pr_item_id),data_dummy,{ 
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+sessionStorage.getItem("token"),
              },}
              ).then(response =>{  
              
                if(response.status=='200'){
                    cogoToast.success("Item added to PO Successfully ...");
                }
                axios.get(AppURL.ApprovedOrderItem).then(response=>{
                  setCart(response.data);
                  })

                  e.target.reset()
                  forceUpdate()
            })

           }

      else{
          cogoToast.error("Something went Wrong...")
         
      }
        
    })
    
   
   
}

const handleOrder = (e) => {
    e.preventDefault();
    axios.get(AppURL.ApprovedOrderItem).then(response=>{
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

if(loading){
  return(
    <h5>Sending email, please wait...</h5>
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

             <Alert variant="primary d-print-none">
          Here is the list of All Approved Items.
        </Alert>
  
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th >Sr.</th>
          <th></th>
        <th >Item Code</th>
          <th>Item Name</th>
          <th>Size</th>
          <th className='d-print-none'>Date</th>
          <th  className='d-print-none'>Project</th>
          <th  className='d-print-none'>Supplier</th>
          <th>Quantity</th>
          <th>UOM</th>
          <th  className='d-print-none' >PP</th>
          <th>PR#</th>
          <th  className='d-print-none'>Action</th>
        </tr>
      </thead>
      
      <tbody>
          {
        cart.map((cartitem,sr)=>{
        return(
            <tr key={sr}>
              
              <td >
                 <button className='btn btn-danger'  onClick={(e)=>HideItems(e)}>{sr+1}</button>
             </td>
             <td>
              <button className='btn btn-danger'  onClick={(e)=>SentEmail(e,cartitem.id,cartitem.order_item['itemcode'],cartitem.order_item['name'],cartitem.order_item['length'],cartitem.quantity,cartitem.forprojectorder['name'],cartitem.orderNo['id'],cartitem.mtocartorder['id'])}><i className='fa fa-envelope'></i></button>&nbsp;
              <button className='btn btn-danger'  onClick={(e)=>SentDeleteEmail(e,cartitem.id,cartitem.order_item['itemcode'],cartitem.order_item['name'],cartitem.order_item['length'],cartitem.quantity,cartitem.forprojectorder['name'],cartitem.orderNo['id'],cartitem.mtocartorder['id'])}><i className='fa fa-trash'></i></button>
              </td>
            <td className='col-xs-3 p-3'>
            {cartitem.order_item['itemcode']} 
            </td>
            <td className='col-xs-3 p-3'>
            {cartitem.order_item['name']} 
            </td>
            <td className='col-xs-3 p-3'>
            {cartitem.order_item['length']} 
            </td>
            <td className='col-xs-3 p-3 d-print-none'>{cartitem.assigned_date}</td>
            <td className='col-xs-3 p-3 d-print-none'>
            {cartitem.forprojectorder['refrence_no']} - 
             {cartitem.forprojectorder['name'] }
            </td>
            <td className='col-xs-3 p-3 d-print-none'>
             {cartitem.Supplier['name'] }
            </td>
            <td className='col-xs-3 p-3'> 
            {cartitem.quantity}            
            </td>
            <td className='col-xs-3 p-3'>
        
            {
              unit.map((uname,i)=>{
               if( cartitem.order_item['unit'] == uname.id){
                return(
                  <>{uname.name}</>
                )
               }
              })
            }
            </td>
            <td className='d-print-none'>{cartitem.order_item['previous_price']}</td>
            <td className='d-print-none'>{cartitem.orderNo['id']}</td>
            <td className='d-print-none'>
              {
                  <Form onSubmit={handleSubmit}>
                    <div className='row col-md-12'>
       
                    <div className='col-md-3'>
                        <Form.Group className="mb-8" controlId="formBasicPassword">
                            <Form.Label>Account</Form.Label>
                         <>
                         <select class="form-select" aria-label="Default select example"  name="account">
                         {accounts.map((account, index) => {
                         return(         
                             <option key={index} value={account.id}  >{account.title}</option>
                            )}
                            )
                            }
                            </select> 
                            </>
                        </Form.Group>
                        </div>

                    <div className='col-md-3'>
                        <Form.Group className="mb-8" controlId="formBasicPassword">
                            <Form.Label>Select P-O</Form.Label>
                         <>
                         <select class="form-select" aria-label="Default select example"  name="po">
                         {purchase.map((purchase, index) => {
                         return(         
                             <option key={index} value={purchase.id}  >{purchase.refrence+" - "+purchase.projectpo['name']+" - "+purchase.PurchaseSupplier['name']}</option>
                            )}
                            )
                            }
                            </select> 
                            </>
                        </Form.Group>                      
                        </div>
                        <div className='col-md-6'>                     
                        <Form.Control type="hidden" placeholder="50" name='item_id' defaultValue={cartitem.order_item['id']} />
                        <Form.Control type="hidden" placeholder="50" name='quantity' defaultValue={cartitem.quantity} />
                        <Form.Control type="hidden" placeholder="50" name='project' defaultValue={cartitem.forprojectorder['id']} />
                        <Form.Control type="hidden" placeholder="50" name='pr_item_id' defaultValue={cartitem.id} />
                        <Form.Control type="hidden" placeholder="50" name='order_no' defaultValue={cartitem.orderNo['id']} />
                        <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                            <Form.Label>Unit Price & VAT</Form.Label>
        
                          <span className='form-inline input-group'>  
                          <select class="form-select" aria-label="Default select example"  name="itemuom">
                          {
                            unit.map((uname,i)=>{
                              if( cartitem.order_item['unit'] == uname.id){
                                  return(
                                    <option key={i} value={uname.id} selected>{uname.name}</option>
                                  )
                               }
                               else{
                                return(
                                  <option key={i} value={uname.id}>{uname.name}</option>
                                )
                              }                            })
                          }
                            </select> 
                            <Form.Control type="text" placeholder="Remarks" name='remarks'  /> 
                            <Form.Control type="text" placeholder="Disc"  name='discount'  /> 
                          <Form.Control type="text" placeholder="Rate" name='price' defaultValue={0} required />
                          <Form.Control type="text" required defaultValue={5} name='vat' />
               
                          {
                           <Button variant="primary" type="submit">+</Button>
                          }
                            </span>    
        
                            </Form.Group>
                         
                            </div>
        
                        </div>
                      </Form>
            }
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
export default ApprovedPurchaseRequest
