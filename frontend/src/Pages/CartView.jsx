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
import Select from 'react-select'
import {Link, useNavigate} from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';


function CartView(){

    const navigate =useNavigate();
    const location = useLocation();
    const[item,setItems]=useState([]);
    const[projects,setProjects]=useState([]);
    const[itemvalue,setItemValue]=useState([]);
    const [region, setRegion] = useState("");
    const[cart,setCart]=useState([]);
    const[finishing,setFinishing]=useState([]);
    
    const [inputFields, setInputFields] = useState([
    ]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const getProjects = async()=>{
      try{
          const response= await axios.get(AppURL.ProjectList)
          setProjects(response.data);
          //setfilteredproject(response.data)
          //console.log(response.data)
      }catch(error){
          console.log(error);
      }
  }

    useEffect(()=>{
      const check_login=sessionStorage.getItem('login');
      const status=sessionStorage.getItem('code');
        if(!check_login){
            navigate('/login')
          }
          else if(check_login){
            if(status!='SI'){
              navigate('/');
              alert('you are not allowed to access , your action will be reported');
            }

             
             else{
              getProjects();
              axios.get(AppURL.StockList).then(response=>{
                setItems(response.data);
            
                })
              axios.get(AppURL.CartList).then(response=>{
                setCart(response.data);
                })
                axios.get(AppURL.GetFinishing).then(response=>{
                  setFinishing(response.data);
                  console.log(response.data)
                  })

                
             }
            }
    },[ignored]);




const handleSubmit = (e) => {
    e.preventDefault();

    if(e.target.quantity.value===''){
        cogoToast.error("Please enter quantity",{position:'top-right'});   
    }
    
    
    else if(e.target.item.value===''){
        cogoToast.error("Please Select Item",{position:'top-right'});   
    }

    else if(e.target.project.value===''){
      cogoToast.error("Please Select Project",{position:'top-right'});   
  }

    else{
      
    const data={
        itemname:e.target.item.value,
        quantity:e.target.quantity.value,
    
    }

    let supplier_id=0
    item.map((guest, index) => {
          if(guest.item['id']==e.target.item.value){
            supplier_id=guest.item['Supplier'];
          }
      })

    //console.log(data);

    const cart_data={
        item_cart:e.target.item.value,
        quantity:e.target.quantity.value,
        description:"NA",
        status:1,
        Supplier:supplier_id['id'],
        priority:1,
        forproject:e.target.project.value,
        basket:1,
      }
     
      axios.post(AppURL.ADDToCart,cart_data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response=>{
        cogoToast.success("Item Added to Cart",{position:'top-right'});
        //new data will be reloaded
    
       // e.target.quantity.value="";
        //e.reset();
        e.target.reset()
      
          //e.target.quantity.value="";
          forceUpdate();
      })
     
}
};


const handleOrder = (e) => {
  const data={

  }
    e.preventDefault();
    //CreateOrder
    axios.post(AppURL.CreateOrder,data,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}).then(response=>{
      cogoToast.success("Order Placed Successfully...",{position:'top-right'});
      //new data will be reloaded
      forceUpdate();
    })
};


const DeleteCartItem=(e,mtoitemid)=>{
    e.preventDefault();
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.CartItemDelete(mtoitemid)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Item Deleted Successfully",{position:'top-right'});
                
        
        })
    }


    const handleFormChange = (sr, event) => {
        let data = [...inputFields];
        data[sr][event.target.quantity] = event.target.value;
        setInputFields(data);
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
            <Form onSubmit={handleSubmit}>
            <div className='row col-md-12'>
            <div className='col-md-7'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Select Item</Form.Label>
                    <>
                    <Select
                        name='item'
                        rules={{ required: true }}
                        value={itemvalue}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setItemValue(item);
                        }}
                        options={item.map((guest, index) => {
                        return {
                            label: guest.item['itemcode']+" - "+guest.item['name']+" - "+guest.item['description']+" - "+guest.item['length']+" - "+guest.item['finishing']['name'],
                            value: guest.item['id'],
                            key: index,
                        };
                        })}
                    />
                
                    </>

                    <Form.Text className="text-muted">
                        Please select the item ,add quantity and then click on + button .
                    </Form.Text>
                </Form.Group>
                </div>


                <div className='col-md-3'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  
                    <Form.Label>Project</Form.Label>
                    <>
                    <Select
                    
                        name='project'
                        rules={{ required: true }}
                        value={region}
                        required={true}
                        
                        onChange={(item) => {
                       // console.log(item);
                        setRegion(item);
                        
                        }}
                        options={projects.map((guest, index) => {
                        return {
                            label: guest.name,
                            value: guest.id,
                            key: index,
                        };
                        })}
                    />
                      {region.value}
             
                   
                    </>

                    <Form.Text className="text-muted">
                        Please select the item ,add quantity and then click on + button .
                    </Form.Text>
                </Form.Group>
                </div>
                <div className='col-md-2'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Qty</Form.Label>
                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="" name='quantity' required />
                    <Button variant="primary" type="submit">+</Button>
                    </span>
                    </Form.Group>

                    </div>

                </div>
             </Form>
             <div className='mt-5'></div>

             <Alert variant="primary">
          Here is the list of All the Items to order.
        </Alert>
        <Form onSubmit={handleOrder}>
       
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Size</th>
          <th>Finishing</th>
          <th>Date</th>

          <th>Borrowed From</th>
          <th>Ordering For</th>
        <th>MTO ID</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      
      <tbody>
           
          {

        cart.map((cartitem,sr)=>{
          //  let data = [...inputFields];
           // data[sr]['quantity'] = cartitem.quantity;
            //setInputFields(data);
            console.log(cartitem)
            return(
            <tr key={sr}>

<td className='col-xs-3 p-3'>
            {cartitem.item_cart['itemcode']} 
            </td>
            <td className='col-xs-3 p-3'>
            {cartitem.item_cart['name']} 
            </td>
            <td className='col-xs-3 p-3'>
            {cartitem.item_cart['length']} 
            </td>
            <td className='col-xs-3 p-3'>
            {
            
            finishing.map((finsih,sr)=>{
              if(finsih['id']==cartitem.item_cart['finishing']){
                return(
                  finsih['name']
                )
              }
            })
            } 
            </td>
            <td>{cartitem.assigned_date}</td>
    


            <td className='col-xs-3 p-3'>
             {cartitem.fromproject['name'] } 
            </td>

            <td className='col-xs-3 p-3'>
             {cartitem.forproject['name'] }
            </td>
            <td className='col-xs-3 p-3'>
                {cartitem.mtocart['id'] } 
            </td>
              <td className='col-xs-3 p-3'>{cartitem.quantity}</td>

         

          
            <td>
              {
            parseInt(cartitem.basket)=='1' ?
              <button className='btn btn-danger'  onClick={(e)=>DeleteCartItem(e,cartitem.id)}><i className="fa-solid fa-trash"></i></button>
                                
                : null

              }
            </td>
            </tr>   
            )
        })
      
    }
    
      </tbody>

    </Table>
    {
      cart.length > 0?
     <> <button type="submit"
      className='mt-5 btn btn-success' >Place Order</button> <p className='text-danger'>Please Note This action can not be reversed</p></>
:
      <p>Your Cart is Empty ...</p>
    }

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
export default CartView
