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


function MTOQtyAdjustment(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[productionstock,setproductionstock]=useState([]);
    const[stock,setStock]=useState([]);
    const [alternative,setAlternative]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const MTOid=location.state.MTOid;
    
    const[finishing,setFinishing]=useState([]);
    const[mtodata,setMTOData]=useState([]);
    const [pdffile, setPdffile] = useState("");
    const [avq, setAvq]=useState([]);

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

        axios.get(AppURL.GetReservedItemMTO(MTOid)).then(response=>{
        setItem(response.data);
        })

        axios.get(AppURL.GetFinishing).then(response=>{
            setFinishing(response.data);
            })
    
        axios.get(AppURL.SingleStockQTY).then(response=>{
          setStock(response.data);
          })

          axios.get(AppURL.getAlternative).then(response=>{
            setAlternative(response.data);
            
            })

            
          axios.get(AppURL.getProductionStock).then(response=>{
            setproductionstock(response.data);
            //console.log(response.data)
           
            })
    },[ignored]);

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
    //alert(response.status);
    if(response.status=='203'){
        //alert(response.data);
        //alert(response.status);
        cogoToast.error("Failed! Please Check the Item With Code "+response.data,{position:'top-center',hideAfter:10});
         //cogoToast.success("Item Added To MTO",{position:'top-right'});
        // const  newitem =  response.data;
        // setItem(oldItem=>[...oldItem,newitem])
        //navigate('/project-mto');
    //}
    }

    else{
      cogoToast.success("MTO Imported Successfully",{position:'top-center',hideAfter:3});
      //cogoToast.success("Item Added To MTO",{position:'top-right'});
     // const  newitem =  response.data;
     // setItem(oldItem=>[...oldItem,newitem])
     navigate('/project-mto');
    }

        
})
}
const UpdateSubmittedMTOQty=(e)=>{
    e.preventDefault();
    if( parseInt(e.target.quantity.value) > parseInt(e.target.balance.value)){
        cogoToast.error("Quantity should be less than balance quantity...");   
    }

    else{


        const data={
            item_id:e.target.item_id.value,
            item_issued_id:e.target.item_issuing_id.value,
            balance:parseInt(e.target.balance.value),
            quantity:parseInt(e.target.quantity.value),
            mto:MTOid,
            color:e.target.color.value,
            total:e.target.total_qty.value
        }
        axios.post(AppURL.UpdateStockReservedMTO,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
              if(response.status===202){
                forceUpdate();
                   cogoToast.success("Stock Updated Successfully...",{position:'top-right'});
                   e.target.reset()
              }        
              else{
                cogoToast.error("Something Went Wrong ",{position:'top-right'});
              }
          })
    }

}


const handleQtyUpdate=(e)=>{
  e.preventDefault()
}
const handleColorUpdate=(e)=>{

  e.preventDefault();
  if(e.target.old_color.value===''){
      cogoToast.error("Please enter Current Color",{position:'top-right'});   
  }
  
  if(e.target.new_color.value===''){
    cogoToast.error("Please enter new Color",{position:'top-right'});   
  }
  
  
  else{ 
       // cogoToast.error("Please Select Item",{position:'top-right'});   
      const data={
        mto:MTOid,
        old_color:e.target.old_color.value,
        new_color:e.target.new_color.value,
      }

      axios.patch(AppURL.MTOItemColorUpdate,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response =>{  
          if(response.status===201){
            forceUpdate();
               cogoToast.success("All Colors Update Successfully",{position:'top-right'});
          }        
          else{
            cogoToast.error("Something Went Wrong ",{position:'top-right'});
          }
      })
  }
  

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
            remarks:e.target.remark.value,
            mto:MTOid,
        }
        const data_check={
          itemname:parseInt(e.target.item.value),
          revision:'1',
          mto:MTOid,
          color:e.target.color.value,
      }

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
                forceUpdate();
                   cogoToast.success("Item Added To MTO",{position:'top-right'});
                  // const  newitem =  response.data;
                  // setItem(oldItem=>[...oldItem,newitem])
                  //   forceUpdate();
              }
              
          })
         
        }
        forceUpdate();
      })




}
    
};



   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
       
            <Nav.Item>
              <Nav.Link eventKey="second">MTO Item Adjustemt</Nav.Link>
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
                          label: guest.item['barcode']+" - "+guest.item['itemcode']+" - "+guest.item['name']+" - "+guest.item['Supplier']['name']+" - "+guest.item['length']+" - "+guest.item['finishing']['name']+" ( "+guest.quantity+" )",
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
                  
                  <Form.Control type="text" placeholder="3" name='extra_quantity'  />
                  
                  <Form.Control type="text" placeholder="" name='color' Value="MF"  />
                  <Form.Control type="text" placeholder="Remarks" name='remark' defaultValue={'NA'}  />
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
             This option only allows you to temporarily roll back reserved quantity. 
        </Alert>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>sr</th>
       
          <th>Name</th>
          <th>Code</th>
         
          <th>Base Color</th>
          <th>Legth</th>
          <th>Req Color</th>
    
          <th>Remarks</th>
          <th>Res QTY</th>
          <th>Balance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

        {

    item.map((single,i)=>{
        console.log(single)
      let avqty=0;
          stock.map((SStock,si)=>{
            if(SStock.item===single.Issued_item['id']){
            avqty=SStock.quantity;
            }
          })
                  
                    return(
                     
                            
                            <tr key={i} >
                            <td>{i+1}</td>
                    
                            <td>{single.Issued_item['name'] }
                            </td>
                            <td>{single.Issued_item['itemcode']}</td>
                         
                         <td>

                            {
                                finishing.map((finish,i)=>{

                                    if(single.Issued_item['finishing']==finish['id']){
                                        return(
                                            <>{finish['name']}</>
                                            )
                                    }
                                   
                              
                                })
                            }
                         </td>
                            <td>{single.Issued_item['length']}</td>
                            <td>{single.color}</td>
                      
                              <td>{single.remarks}</td>
                              <td>{single.quantity}</td>
                            <td>{single.balance}</td>
                            
                            <td>
                                <Form onSubmit={UpdateSubmittedMTOQty}>
                                <>

                                 <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
            
                                    <span className='form-inline input-group'>  
                                    <Form.Control type="text" placeholder="Quantity" name='quantity' required />            
                                    <Form.Control type="hidden" value={single.balance} name='balance' />
                                    <Form.Control type="hidden" value={single.Issued_item['id']} name='item_id' />
                                    <Form.Control type="hidden" value={single.id} name='item_issuing_id' />
                                    <Form.Control type="hidden" value={single.color} name='color' />
                                    <Form.Control type="hidden" value={single.quantity} name='total_qty' />
                            
                                    <Button  variant="danger" type="submit"><i className="fa-solid fa-upload"></i> Roll Back</Button>
                                    </span>    

                                    </Form.Group>
                                </>
                                </Form>
                              </td>
                        </tr>
      

                            
                      )


                
        }
      )
      }
      </tbody>
    </Table>

    {
            mtodata.submital==='0' ?  <button className='btn btn-success' onClick={(e)=>SubmitMTO(e,MTOid)}>Submit MTO</button>
            
            : 
            <><p>MTO Already Submitted</p>

<Form onSubmit={handleColorUpdate}>
            <div className='row col-md-12'>
       
                <div className='col-md-4'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
            
                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Existing Color" name='old_color'  />            
                  <Form.Control type="text" placeholder="New Color" name='new_color'  />
                  <Button variant="primary" type="submit"><i className="fa-solid fa-upload"></i> Update</Button>

              
                  
                    </span>    

                    </Form.Group>

                    </div>

                </div>
             </Form>

             <Form onSubmit={handleQtyUpdate}>
            <div className='row col-md-12'>    
                <div className='col-md-4'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
            
           

                    </Form.Group>

                    </div>

                </div>
             </Form>

            </>
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
export default MTOQtyAdjustment
