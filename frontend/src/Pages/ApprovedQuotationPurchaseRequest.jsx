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


function ApprovedQuotationPurchaseRequest(){

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
  
              

            axios.get(AppURL.ApprovedQuotationOrderItem).then(response=>{
              setCart(response.data);

              })

              axios.get(AppURL.PurchaseOrderListLimit).then(response=>{
                setpurchase(response.data);
  
                })

                axios.get(AppURL.AccountsHead).then(response=>{
                  setaccounts(response.data);
    
                  })
                
        }    
 
    },[ignored]);

    const HideItems=(e,mtoitemid)=>{
      e.preventDefault();
      const thisClicked=e.currentTarget;
      thisClicked.innerText="Hiding";
          //alert(response.data.message);
      thisClicked.closest("tr").remove();
    
      }
  

const handleSubmit=(e)=>{
    e.preventDefault();
    let pr_item_id=e.target.item_id.value
        const data={
        quot_item_pono:e.target.po.value,
        quotaccountshead:e.target.account.value,
        price:e.target.price.value,
        po_item_project:e.target.project.value,
        quantity:e.target.quantity.value,
        vat:e.target.vat.value,
        weight:e.target.weight.value,
        POQItemorderno:e.target.order_id.value,
        qpouom:e.target.unit.value,  
        quotitemdn:e.target.dn.value,  
        po_item_title:e.target.title.value,
    }
console.log(data);
  
const data_dummy={
    id:'1',
}
    //cogoToast.success("Item Added to PO Successfully");

     axios.post(AppURL.POQItemSave,data,{
         headers:{
             "content-Type":"application/json",
             "Authorization":"Token "+sessionStorage.getItem("token"),
         }
          }).then(response=>{
           
         axios.post(AppURL.UpdatePRQItems(pr_item_id),data_dummy,{ 
             headers: {
            "Content-Type": "application/json",
             "Authorization": "Token "+sessionStorage.getItem("token"),
           },}
           ).then(response =>{  
          
             if(response.status=='200'){
                cogoToast.success("Item added to PO Successfully ...");
            }
             forceUpdate();
    
         })
      
        
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
          <th className='d-print-none'>Sr.</th>
        <th className='d-print-none'>Item</th>
          <th>Date</th>
          

          <th  className='d-print-none'>Q-Refrence</th>
          <th className='d-print-none'>Project</th>        
     

          <th>UOM</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Weight</th>

          <th>VAT</th>
          <th>Total Price</th>
       
          <th  className='d-print-none'>Action</th>
        </tr>
      </thead>
      
      <tbody>
           
          {
    
        cart.map((cartitem,sr)=>{
          //  let data = [...inputFields];
           // data[sr]['quantity'] = cartitem.quantity;
            //setInputFields(data);
        
        return(
            <tr key={sr}>
              <td className='d-print-none'> <button className='btn btn-danger'  onClick={(e)=>HideItems(e)}>{sr+1}</button></td>
            <td className='col-xs-3 p-3 d-print-none'>
            {cartitem.title} 
            </td>
            <td className='col-xs-3 p-3'>
            {cartitem.assigned_date} 
            </td>
         
            <td className='col-xs-3 p-3 d-print-none'>{cartitem.QuotationorderNo['description']}</td>
    
            <td className='col-xs-3 p-3 d-print-none'>
            {cartitem.projectorderquotation['refrence_no']} - 
             {cartitem.projectorderquotation['name'] }
             
            </td>

       
       
      
            <td className='col-xs-3 p-3'>
        
            {
              unit.map((uname,i)=>{
               if( cartitem.quotationuom['id'] == uname.id){
                return(
                  <>{uname.name}</>
                )
               }
              })
            }
            </td>
            <td className='col-xs-3 p-3'> 
            {cartitem.quantity}            
            </td>
            <td className='col-xs-3 p-3'>{cartitem.amount}</td>
            <td className='col-xs-3 p-3'>{cartitem.weight}</td>
     
            <td  className='col-xs-3 p-3'>{cartitem.vat}%</td>
            <td  className='col-xs-3 p-3'>{((cartitem.amount*cartitem.weight)*cartitem.quantity).toFixed(2)}</td>
            <td className='d-print-none'>
              {
                  <Form onSubmit={handleSubmit}>
                    <div className='row col-md-12'>
       
                    <div className='col-md-5'>
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

                    <div className='col-md-5'>
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
                        <div className='col-md-2'>            
                        <Form.Control type="hidden" placeholder="50" name='title' defaultValue={cartitem.title} />  
                        <Form.Control type="hidden" placeholder="50" name='quantity' defaultValue={cartitem.quantity} />
                        <Form.Control type="hidden" placeholder="50" name='price' defaultValue={cartitem.amount} />
                        <Form.Control type="hidden" placeholder="50" name='vat' defaultValue={cartitem.vat} />
                        <Form.Control type="hidden" placeholder="50" name='weight' defaultValue={cartitem.weight} />
                        <Form.Control type="hidden" placeholder="50" name='unit' defaultValue={cartitem.quotationuom['id']} />
                        <Form.Control type="hidden" placeholder="50" name='dn' defaultValue={cartitem.Quotationdno['id']} />
                        <Form.Control type="hidden" placeholder="50" name='order_id' defaultValue={cartitem.id} />
                        <Form.Control type="hidden" placeholder="50" name='project' defaultValue={cartitem.projectorderquotation['id']} />
                        <Form.Control type="hidden" placeholder="50" name='item_id' defaultValue={cartitem.id} />
                        
                        
                        {/* 
                        <Form.Control type="hidden" placeholder="50" name='quantity' defaultValue={cartitem.quantity} />
                        <Form.Control type="hidden" placeholder="50" name='project' defaultValue={cartitem.forprojectorder['id']} />
                        <Form.Control type="hidden" placeholder="50" name='pr_item_id' defaultValue={cartitem.id} />
                        <Form.Control type="hidden" placeholder="50" name='order_no' defaultValue={cartitem.orderNo['id']} /> */}


{/* 
        quot_item_pono = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='quot_item_pono', null=True, blank=True,default='1')
        po_item_title = models.CharField(max_length=100, null=True)
        po_item_project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='po_item_project', null=True, blank=True,default='1')
        POQItemorderno = models.ForeignKey(
        OrderItemQuotation, on_delete=models.CASCADE, related_name='POQItemorderno', null=True, blank=True,default='1')
        quotitemdn = models.ForeignKey(PowderCoating, on_delete=models.CASCADE, related_name='quotitemdn',  null=True, blank=True, default='1')
        qpouom = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='qpouom', null=True, blank=True,default='16')
        assigned_date = models.DateField(auto_now_add=True)
        price = models.CharField(max_length=100, null=True, default='0')
        quotaccountshead=models.ForeignKey(AccountsHead, on_delete=models.CASCADE, related_name='quotaccountshead', blank=True,default='78')
        quantity=models.CharField(max_length=100, default='1')
        balance=models.CharField(max_length=100, default='0')
        weight=models.CharField(max_length=100,default='0')
        vat=models.CharField(max_length=100,default='0')
        status=models.CharField(max_length=100,null=True, default='1') */}
                        
                        <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                            <Form.Label></Form.Label>
        
                          <span className='form-inline input-group'>  
                
               
                          {
                           <Button  variant="primary" type="submit">+</Button>
                    
                
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
export default ApprovedQuotationPurchaseRequest
