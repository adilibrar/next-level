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


function MTODetailPage(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[status,setStatus]=useState([]);
    const [error,setError]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const MTOid=location.state.MTOid;
    const[mtodata,setMTOData]=useState([]);
    const [pdffile, setPdffile] = useState("");

// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });
    


    useEffect(()=>{
      axios.get(AppURL.SingleMTO(MTOid)).then(response=>{
        setMTOData(response.data);
        })

      getCountries();

        axios.get(AppURL.ItemByMto(MTOid)).then(response=>{
        setItem(response.data);
        //alert(item.is_both);
        })
    },[ignored]);
console.log(item);
  const [region, setRegion] = useState("");
  
  const getCountries = async()=>{
    try{
        const response= await axios.get(AppURL.StockList)
        setCountries(response.data);

    }catch(error){
        console.log(error);
    }
}


function SubmitMTO(e,MTO){
  e.preventDefault();
 const data={
    mto:MTO,
    submital:'1'
  }
  axios.patch(AppURL.UpdateMTOStatus,data,{ 
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}).then(response =>{  
    if(response.status===201){
         cogoToast.success("MTO Submitted Successfully...",{position:'top-right'});

         navigate('/project-mto');
    }
})
}

function handleFileChange(e) {
    const files = e.target.files[0];
     setPdffile(files);
     //console.log("Guru4666", pdffile);
 }

const handleImport = (e) => {
    e.preventDefault();
    //alert(pdffile.type);
    //console.log(pdffile.type);
    const formData = new FormData();
    //console.log(formData);
    formData.append("file", pdffile);
   axios.post(AppURL.MTOImport(MTOid),formData,{ 
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response.status===200){
         cogoToast.success("Item Added To MTO",{position:'top-right'});
        // const  newitem =  response.data;
        // setItem(oldItem=>[...oldItem,newitem])
        navigate('/project-mto');
    }
        
})
}




const handleSubmit = (e) => {
    e.preventDefault();
if(e.target.quantity.value===''){
    cogoToast.error("Please enter quantity",{position:'top-right'});   
}

if(e.target.extra_quantity.value===''){
  cogoToast.error("Please enter quantity",{position:'top-right'});   
}


else if(e.target.item.value===''){
    cogoToast.error("Please Select Item",{position:'top-right'});   
}

else if(e.target.color.value===''){
    cogoToast.error("Color Field can not be empty",{position:'top-right'});   
}

else{
        const data={
            itemname:e.target.item.value,
            //Issued_item:1,
            quantity:e.target.quantity.value,
            extra_quantity:e.target.extra_quantity.value,
            color:e.target.color.value,
            revision:'1',
            mto:MTOid,
        }
        const data_check={
          itemname:parseInt(e.target.item.value),
          revision:'1',
          mto:MTOid,
      }

      console.log(data_check);

      axios.post(AppURL.GetMTOITEMDetail,data_check
        ,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },
      }).then(response=>{
        
        if(response.data.message == '200'){
          cogoToast.error("Item already exist in MTO",{position:'top-right'});
        }   
        else{
          axios.post(AppURL.AddMTOItem,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
              if(response.status===201){
                forceUpdate(2);
                   cogoToast.success("Item Added To MTO",{position:'top-right'});
                  // const  newitem =  response.data;
                  // setItem(oldItem=>[...oldItem,newitem])
                  //   forceUpdate();
              }
                  
          })
  
        }
      })


     


}
    
};


const DeleteMTOItem=(e,mtoitemid)=>{
    e.preventDefault();
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.MTOItemDelete(mtoitemid)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Item Deleted Successfully",{position:'top-right'});
                
        
        })
    }




   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Import MTO Item</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Add MTO Item</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <Form onSubmit={handleImport}>
            <div className='row col-md-12 mt-3'>
        
                <Form.Group className="mb-3 form-inline " controlId="formBasicEmail">
                    <Form.Label>Select File to Import MTO(supported file .xlxs)</Form.Label>
                  <Form.Control type="file" placeholder="" name='file'
      onChange={handleFileChange} />
                   <Button  className='mt-2' variant="primary" type="submit">Import</Button>
                    </Form.Group>


                </div>
             </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <Form onSubmit={handleSubmit}>
            <div className='row col-md-12'>
            <div className='col-md-8'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Select Item</Form.Label>
                    <>
                    <Select
                        name='item'
                        rules={{ required: true }}
                        value={region}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegion(item);
                        
                        }}
                        options={countries.map((guest, index) => {
                        return {
                            label: guest.item['itemcode']+" - "+guest.item['name']+" - "+guest.item['Supplier']['name']+" - "+guest.item['length']+" - "+guest.item['finishing']['name'],
                            value: guest.item['id'],
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
                <div className='col-md-4'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Actual and Margin quantity</Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="50" name='quantity'  />
                  
                  <Form.Control type="text" placeholder="53" name='extra_quantity'  />
                  
                  <Form.Control type="text" placeholder="" name='color' Value="MF"  />
                  {
                  mtodata.submital==='0' ? <Button variant="primary" type="submit">+</Button>
            
            : <p></p>
                  }
                    </span>
                    </Form.Group>

                    </div>

                </div>
             </Form>
             <div className='mt-5'></div>

             <Alert variant="primary">
          Here is the list of MTO items you added.
        </Alert>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Name</th>
          <th>Code</th>
          <th>AQ</th>
          <th>MQ</th>
          <th>Length</th>
          <th>Finishing</th>
          <th>Supplier</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

        {

                item.map((single,i)=>{
                    return(

                        <tr key={i}>

                            <td>{single.itemname['barcode']}</td>
                            <td>{single.itemname['name']}</td>
                            <td>{single.itemname['itemcode']}</td>
                            <td>{single.quantity}</td>
                            <td>{single.extra_quantity}</td>
                            <td>{single.itemname['length']}</td>
                            <td>{single.itemname.finishing['name']}</td>
                            <td>{single.itemname.Supplier['name']}</td>
                            
                            <td>
                            {
                                mtodata.submital==='0' ?  <button className='btn btn-danger'  onClick={(e)=>DeleteMTOItem(e,single.id)}><i className="fa-solid fa-trash"></i></button>
                                
                                : <p>NA</p>
                            } 
                              
                              
                              
                              </td>
                        </tr>
                    )
                })
        }
      
      </tbody>
    </Table>

    {
            mtodata.submital==='0' ?  <button className='btn btn-success' onClick={(e)=>SubmitMTO(e,MTOid)}>Submit MTO</button>
            
            : <p>MTO Already Submitted</p>
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
export default MTODetailPage
