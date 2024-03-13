import React, { Component, Fragment ,useEffect,useState} from 'react'
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

function ManageItemIssuing(){

    const[countries,setCountries]=useState([]);
    const[status,setStatus]=useState([]);
    const [error,setError]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);

   const ItemIDStock=location.state.Id;
   const StockID=location.state.Sid;
   
   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });


    useEffect(()=>{
        getCountries();
        axios.get(AppURL.ItemList(ItemIDStock),{
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Token "+sessionStorage.getItem("token"),
            },
          }).then(response=>{
        setItem(response.data);
        //alert(item.is_both);
        })
        //console.log(getCountries())
    },[]);

  const [region, setRegion] = useState("");
  
  const getCountries = async()=>{
    try{
        const response= await axios.get(AppURL.ProjectList,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },})
        setCountries(response.data);


        const status_response= await axios.get(AppURL.StatusList,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },})
        setStatus(status_response.data);
       // console.log(countries);
    }catch(error){
        console.log(error);
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
if(e.target.project.value===''){
    cogoToast.error("Please select Project to assign the item",{position:'top-right'});   
}

else{
        const data={
            project:e.target.project.value,
            Issued_item:ItemIDStock,
            quantity:e.target.Quantity.value,
            status:e.target.status.value,

        }
       const quantity=e.target.Quantity.value;
        const payload="sub"
        const payload_data={
            quantity:quantity,
            payload:payload,
        }
        axios.post(AppURL.StockValueUpdate(StockID),payload_data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(re=>{
            if(re.data.message==='200'){

               axios.post(AppURL.IssueStock,data,{ 
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+sessionStorage.getItem("token"),
              },}).then(response =>{  
                // cogoToast.success("Order Placed Successfully",{position:'top-right'});
               
                 if(response.status===201){
                  cogoToast.success("Item has been Reserved",{position:'top-right'});
                  console.log(response.data);
                  
                  //need to send for production


                  const data={
                    Issuingproject:e.target.project.value,
                    issuedmto:'1',
                    Production_Issued_item:ItemIDStock,
                    Issued_item_reserved:response.data['id'],
                    quantity:quantity,
                   
                  }
                const balance_data={
                    id:response.data['id'],
                    balance:'0' ,
                }
                e.target.reset();
                  axios.post(AppURL.IssuetoProduction,data,{ 
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+sessionStorage.getItem("token"),
                  },}).then(response=>{  
                    axios.patch(AppURL.IssuedBalance,balance_data,{ 
                        headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+sessionStorage.getItem("token"),
                      },}).then(re=>{
                       // console.log("ok");
                      })
                      
                    cogoToast.success("Item Issued to Production",{position:'top-right'});
                    //new data will be reloaded
                   // forceUpdate();
                  })

                    // cogoToast.success("Item has been Issued",{position:'top-right'});
                    // thisClicked.closest("tr").remove();
                    setError([]);
                   // navigate.push('/thank you');
                    
                }
         
                else if(response.status===400){
                        cogoToast.error("All Fields are Mandatory...",{position:'top-right'});
                        //thisClicked.innerText="Remove";
                        setError(response.data.errors);
                        console.log(error);
                    }
                     // thisClicked.closest("tr").remove();
            })
            }

            else if(re.data.message==='401'){
                cogoToast.error("Quantity to assign should be less than total available quantity...",{position:'top-right'});   
            }
            e.target.reset();
        })





}
    
};





const handleSubmitDamage = (e) => {
  
    e.preventDefault();
if(e.target.title.value===''){
    cogoToast.error("title is required",{position:'top-right'});   
}


else{
    const data={
        title:e.target.title.value,
        Item_Damage:ItemIDStock,
        quantity:e.target.Quantity.value,
        status:e.target.status.value,

    }
   const quantity=e.target.Quantity.value;
    const payload="sub"
    const payload_data={
        quantity:quantity,
        payload:payload,
    }
    axios.post(AppURL.StockValueUpdate(StockID),payload_data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(re=>{
        if(re.data.message==='200'){

           axios.post(AppURL.DamageStock,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
            // cogoToast.success("Order Placed Successfully",{position:'top-right'});
            // console.log(response);
             if(response.status===201){
                 cogoToast.success("Item Moved to Damaged Successfully",{position:'top-right'});
                // thisClicked.closest("tr").remove();
                setError([]);
               // navigate.push('/thank you');
                
            }
     
            else if(response.status===400){
                    cogoToast.error("All Fields are Mandatory...",{position:'top-right'});
                    //thisClicked.innerText="Remove";
                    setError(response.data.errors);
                    console.log(error);
                }
                 // thisClicked.closest("tr").remove();
        })
        }

        else if(re.data.message==='401'){
            cogoToast.error("Quantity to assign should be less than total available quantity...",{position:'top-right'});   
        }
        e.target.reset();
    })





}
    
};
  
const deleteIssuedItem=(e,issuing_id,quantity,item_id)=>{
    e.preventDefault();
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.StockIssuingDelete(issuing_id),{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response=>{
        //alert(response.data.message);
        if(response.data.message==200){                
             axios.patch(AppURL.StockValueUpdate(item_id),{quantity},{ 
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+sessionStorage.getItem("token"),
              },}).then(response=>{
                               // cogoToast.success("Total items are Released",{position:'top-right'});
                cogoToast.success("Items has been Released ...",{position:'top-right'});
            
                thisClicked.closest("tr").remove();
             })

        }
    })



}
  
   const handleInput=(e)=>{
   // alert("i am in change");
        e.persist();
        SetCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
       // alert(checkoutInput.status);
      //  alert("perfect");
    }


   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Add Damage / Return / Issued</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Assign Item</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <Form onSubmit={handleSubmitDamage}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="" onChange={handleInput} name='title'  required />
                <Form.Text className="text-muted">
                Please enter title / reason or type of damage .
                </Form.Text>
                </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="" onChange={handleInput} name='Quantity' required />
                <Form.Text className="text-muted">
                please enter number of items to assign .
                </Form.Text>
                </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Status</Form.Label>
                <select  class="form-select" aria-label="Default select example"  required onChange={handleInput} name="status">
                        {status.map((item,sr)=>{
                        // totalCartPrice += item.unit_price*item.quantity;
                        return(         
                            
                        <option key={sr} value={item.id}  >{item.title}</option>
                        
                    )}
                    )
                    }

                </select>
            </Form.Group>


<Button variant="primary" type="submit">
    Submit
</Button>
</Form>
                
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Project Name</Form.Label>
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
                        options={countries.map((guest, index) => {
                        return {
                            label: guest.name+" - "+guest.refrence_no,
                            value: guest.id,
                            key: index,
                        };
                        })}
                    />
             
                 {region.value}
                    </>

                    <Form.Text className="text-muted">
                        Please select the project to assign item.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="" name='Quantity'  />
                    <Form.Text className="text-muted">
                    please enter number of items to assign .
                    </Form.Text>
                    </Form.Group>


                <Form.Group className="mb-3 hidetextbox" controlId="formBasicPassword">
                    <Form.Label>Status</Form.Label>
                    <select  class="form-select" aria-label="Default select example"   onChange={handleInput} name="status">
                            {status.map((item,sr)=>{
                            // totalCartPrice += item.unit_price*item.quantity;
                            return(         
                                
                            <option key={sr} value={item.id}  >{item.title}</option>
                            
                        )}
                        )
                        }
      
                    </select>
                </Form.Group>
    

                <Button variant="primary" type="submit">
                    Submit
                </Button>
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
export default ManageItemIssuing
