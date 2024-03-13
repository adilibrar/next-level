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



function ItemIssuedEditPage(){
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue,setValue]=useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const[countries,setCountries]=useState([]);
    const[status,setStatus]=useState([]);
    const [error,setError]=useState([]);
    const location = useLocation();
  
    const[item,setItem]=useState([]);

    const ItemIDStock=location.state.ItemIDStock;
   const Itemid=location.state.Id;
   const Quantity=location.state.Quantity;
   const ProjectName=location.state.Pname;
   const Status_rec=location.state.Status;
   //const Status_label=location.state.label;
   const  Reserved="Reserved";
   const  Issued="Issued";
   const  Damage="Damage";

   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });


    useEffect(()=>{
        getCountries();
        axios.get(AppURL.ItemList(ItemIDStock)).then(response=>{
        setItem(response.data);
        //alert(item.is_both);
        })
        //console.log(getCountries())
    },[]);

var item_HTML='';
if(item.is_quantity==='1'){
   // alert("qty");
    item_HTML=                <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Quantity</Form.Label>
    <Form.Control type="text" placeholder="" name='Quantity' required />
    <Form.Control type="hidden" placeholder="" name='Length' value='-1' />
    <Form.Text className="text-muted">
    you can not edit Quantity here,if you wanna change Quantity Go Back , release the item and re assign new quantity.
    </Form.Text>
</Form.Group>
}

else if(item.is_length==='1'){
   // alert("length");
    item_HTML=                <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Length</Form.Label>
    <Form.Control type="text" placeholder="" name='Length' reqired />
    <Form.Control type="hidden" placeholder="" name='Quantity' value='-1' />
    <Form.Text className="text-muted">
    you can not edit Quantity here,if you wanna change Quantity Go Back , release the item and re assign new quantity.
    </Form.Text>
</Form.Group>
}

else if(item.is_both==='1'){
    //alert("both");
    item_HTML=    <>            
    
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="text" placeholder="" name='Quantity'  />
        <Form.Text className="text-muted">
        please enter number of items to assign .
        </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Length</Form.Label>
        <Form.Control type="text" placeholder="" name='Length'  />
        <Form.Text className="text-muted">
        please enter length of items to assign .
        </Form.Text>
        </Form.Group>
</>
}


  const [region, setRegion] = useState("");
  
  const getCountries = async()=>{
    try{
        const response= await axios.get(AppURL.ProjectList)
        setCountries(response.data);


        const status_response= await axios.get(AppURL.StatusList)
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
    if (e.target.Length.value !='-1' && e.target.Quantity.value!='-1' )
    {
        const data={
        project:e.target.project.value,
        Issued_item:ItemIDStock,
        quantity:e.target.Quantity.value,
        length:e.target.Length.value,
        status:e.target.status.value,
        }


        axios.post(AppURL.IssueStock,data,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response =>{  
            // cogoToast.success("Order Placed Successfully",{position:'top-right'});
             if(response.status===201){
                 cogoToast.success("Item has been Issued",{position:'top-right'});
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
    else if(e.target.Quantity.value !='-1'){
        const data={
            project:e.target.project.value,
            Issued_item:ItemIDStock,
            quantity:e.target.Quantity.value,
            status:e.target.status.value,

        }

        axios.post(AppURL.IssueStock,data,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response =>{  
            // cogoToast.success("Order Placed Successfully",{position:'top-right'});
             console.log(response);
             if(response.status===201){
                 cogoToast.success("Item has been Issued",{position:'top-right'});
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

    else if(e.target.Length.value  !='-1'){
        const data={
            project:e.target.project.value,
            Issued_item:ItemIDStock,
            length:e.target.Length.value,
            status:e.target.status.value,

        }


        axios.post(AppURL.IssueStock,data,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response =>{  
            // cogoToast.success("Order Placed Successfully",{position:'top-right'});
             console.log(response);
             if(response.status===201){
                 cogoToast.success("Item has been Issued",{position:'top-right'});
                // thisClicked.closest("tr").remove();
                e.target.Length.value='';
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

        e.target.reset();
    }

}
    
    
    //alert(data.Issued_item);

  

   //    {
    //    headers: {
      //      'Content-Type': 'application/json'
    //}}
   
      //  axios.patch(AppURL.StockIssuedStatus(item_id),{status:data.status}).then(response=>{
        //    cogoToast.success("Item has been assigned to Project ...",{position:'top-right'});

        //})
};

  

  
   const handleInput=(e)=>{
   // alert("i am in change");
        e.persist();
        SetCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
       // alert(checkoutInput.status);
      //  alert("perfect");
    }




    const submitOrder=(e,item_id)=>{
        e.preventDefault();
        const data={
            status:checkoutInput.status,

        }
        axios.patch(AppURL.StockIssuedStatus(item_id),{status:data.status},{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response=>{
            cogoToast.success("Project Status has been updated Successfully ...",{position:'top-right'});
    
        })
        } 



   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Edit Item</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Assign Item</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Project Name</Form.Label>
        <Form.Control type="text" placeholder="" value={ProjectName} disabled/>
        <Form.Text className="text-muted" >
          you can not edit Project here,if you wanna change Project Go Back , release the item and assign to new Project.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="text" placeholder="" value={Quantity} disabled/>
        <Form.Text className="text-muted">
        you can not edit Quantity here,if you wanna change Quantity Go Back , release the item and re assign new quantity.
        </Form.Text>
      </Form.Group>
        
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Status</Form.Label>
        <select class="form-select" aria-label="Default select example"  onChange={handleInput} name="status">

            {status.map((item,sr)=>{
            // totalCartPrice += item.unit_price*item.quantity;
            return(         

                
            <option key={sr} value={item.id} selected={item.id===Status_rec}>{item.title}</option>
             
            )}
            )
            }
      
        </select>
      </Form.Group>
   
        <Button variant="primary" type="submit" onClick={(e)=>submitOrder(e,Itemid)}>
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
                        console.log(item);
                        setRegion(item);
                        
                        }}
                        options={countries.map((guest, index) => {
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
                        Please select the project to assign item.
                    </Form.Text>
                </Form.Group>

                    {item_HTML}
                    


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Status</Form.Label>
                    <select class="form-select" aria-label="Default select example"   onChange={handleInput} name="status">
                            {status.map((item,sr)=>{
                            // totalCartPrice += item.unit_price*item.quantity;
                            return(         
                                
                            <option value={item.id}  >{item.title}</option>
                            
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
export default ItemIssuedEditPage