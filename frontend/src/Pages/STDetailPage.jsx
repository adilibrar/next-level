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


function STDetailPage(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[stock,setStock]=useState([]);
    const [error,setError]=useState([]);
    const [loading,setLoading]=useState(true);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[unit,setUnit]=useState([]);
    const STID=location.state.STID;
    let total_weight=0;
    let total_sqm=0;
    let total_set=0;
    const[dndata,setDNData]=useState([]);
    const [pdffile, setPdffile] = useState("");
    const [avq, setAvq]=useState([]);

// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });
    


    useEffect(()=>{
        getCountries();
      axios.get(AppURL.SingleST(STID)).then(response=>{
        setDNData(response.data);
        axios.get(AppURL.ItemByST(STID)).then(response=>{
            setItem(response.data)
           // console.log(item);
           // axios.get(AppURL.UnitOfMeasure).then(response=>{
             //   setUnit(response.data);
               // setLoading(false);
          //  })
           
            })
        })

     
      
           
  
    },[ignored]);

  const [region, setRegion] = useState("");
  
  
const UpdateSTItem=(e)=>{
    e.preventDefault();
    alert("Test");
}
const handleNote=(e)=>{
  e.preventDefault();
  if(e.target.desc.value===''){
 
      cogoToast.error("Please enter something...",{position:'top-right'});   
  }
  else{
    const data={
      id:e.target.dnid.value,
      note:e.target.desc.value,
      description:e.target.description.value,
    }
   // UpdateDNNote
    //alert(e.target.dnid.value);
    axios.patch(AppURL.UpdateSTNote,data,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}).then(response =>{  
        if(response.status===201){
          forceUpdate();
             cogoToast.success("Information Updated Successfully...",{position:'top-right'});
            // const  newitem =  response.data;
            // setItem(oldItem=>[...oldItem,newitem])
            //   forceUpdate();
        }
        
    })
  }
}

const handleSubmit = (e) => {
    e.preventDefault();
if(e.target.quantity.value===''){
    cogoToast.error("Please enter quantity",{position:'top-right'});   
}

else if(e.target.item.value===''){
    cogoToast.error("Please Select Item",{position:'top-right'});   
}
else{
    
    const data={
        stno:STID,
        sitem:e.target.item.value,
        quantity:e.target.quantity.value,

    }
   const quantity=e.target.quantity.value;
    const payload="sub"
    const payload_data={
        quantity:quantity,
        payload:payload,
    }

    axios.post(AppURL.StockValueUpdate(e.target.item.value),payload_data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(re=>{
        if(re.data.message==='200'){

           axios.post(AppURL.AddSTItem,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
            // cogoToast.success("Order Placed Successfully",{position:'top-right'});
            // console.log(response);
             if(response.status===201){
                 cogoToast.success("Item Moved to Striping Successfully",{position:'top-right'});
                // thisClicked.closest("tr").remove();
                setError([]);
               // navigate.push('/thank you');               
            }
     
            else if(response.status===400){
                    cogoToast.error("Sonething is wrong...",{position:'top-right'});
                    //thisClicked.innerText="Remove";
                    setError(response.data.errors);
                    console.log(error);
                }
                 // thisClicked.closest("tr").remove();
        })
        }
        forceUpdate();

})

}

}
    
const HandleStrip=(e)=>{
      e.preventDefault();
    
      const data={
        'striping_id':e.target.stripped_id.value,
        'quantity':e.target.quantity.value,
        'id':e.target.item_id.value,   
        'item_code':e.target.item_code.value,
        'length':e.target.length.value,
        'supplier':e.target.supplier.value,
        'old_qty':e.target.old_quantity.value,
      }
      //console.log(data);
  
      console.log(data)

      axios.post(AppURL.UpdateSTItemQty,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response=>{
        console.log(response.data.message)
            if(response.data.message==='200'){
                cogoToast.success("Item Updated Successfully...",{position:'top-right'})
            }
    
            else{
                cogoToast.error("something went wront...",{position:'top-right'})
            }
    
            forceUpdate();
        })
    
  }
   //   )}


const DeleteDNItem=(e,mtoitemid)=>{
    e.preventDefault();
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DNItemDelete(mtoitemid)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Item Deleted Successfully",{position:'top-right'});
                
        })
    }

      
const UpdateStripItem=(e,striping_id,qty,item_id,itemcode,length,supplier)=>{
    e.preventDefault();
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Adding";
    const data={
        'striping_id':striping_id,
        'quantity':qty,
        'id':item_id,
        'item_code':itemcode,
        'length':length,
        'supplier':supplier
    }
    //console.log(data);

    axios.post(AppURL.UpdateSTItemQty,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response=>{
        //console.log(response.data.message)
            if(response.data.message==='200'){
                cogoToast.success("Item Updated Successfully...",{position:'top-right'})
            }

            else{
                cogoToast.error("something went wront...",{position:'top-right'})
            }

            forceUpdate();
        })
        //alert(response.data.message);
      //  thisClicked.closest("tr").remove();
       // cogoToast.success("Item Deleted Successfully",{position:'top-right'});
                
        //})
    }

  const getCountries = async()=>{
    try{
        const response= await axios.get(AppURL.StockList)
        setCountries(response.data);

    }catch(error){
        console.log(error);
    }
}



    //if(loading){
       // return <h4>Loading .....</h4>
   //} 

   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={12}>
          <Tab.Content>
            <div className='row d-print-none'>
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
                    </>

                    <Form.Text className="text-muted">
                        Please select the item ,add quantity and then click on + button .
                    </Form.Text>
                </Form.Group>
                </div>
                <div className='col-md-4'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Quantity</Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="50" name='quantity'  />
                  
                 <Button variant="primary" type="submit">+</Button>

                    </span>    

                    </Form.Group>

                    </div>

                </div>
             </Form>
          </div>
          <br></br><br></br>
            <Tab.Pane eventKey="second">
            <div className='row col-sm-12'>
            <div className='col-sm-5'>
            
            <img src="https://slimwindows.ae/wp-content/uploads/2021/09/Next-Level-Group-horisontal.jpg" alt="Admin" className="rounded-circle" width="265" />
                    
          </div>
                <div className='col-sm-7 delivery-note-fs'>
                <Table bordered size="sm" className=' dntable-border'>
            
                <tbody>
                <tr>
                <td>Refrence</td>
                <td></td>
            
                </tr>

                <tr>
                <td>Date</td>
                <td> {dndata.created_at}</td>
            
                </tr>
            
                <tr>
                <td>DN#</td>
                <td>ST-{dndata.id}</td>
        
                </tr>
                    </tbody>
                </Table>
                    </div>

                </div>
           
                <div className='row col-sm-12'>
            <div className='col-sm-12'>
                <h4 className='text-center'><strong className='delivery-note-fs'>Delivery Note</strong></h4>
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
        <th>Length</th>
        <th>QTY</th>
          <th>Weight</th>
          <th className='d-print-none'>Remarks</th>
          <th className='d-print-none'>Action / Damaged</th>
       
        </tr>
      </thead>
      <tbody>
      {
     
     item.map((single,i)=>{
        if(!(single.sitem['weight']=='NA')){
            total_weight=(parseFloat(total_weight)+((parseFloat(single.sitem['weight'])*parseInt(single.quantity))*single.sitem['length'])/1000);
        }

        if(!((single.sitem['length']=='NA') && (single.sitem['width']=='NA') )){
            total_sqm=((parseFloat(single.sitem['length'])*parseFloat(single.sitem['width']))*parseInt(single.quantity)+total_sqm);          
           }

           if(((single.sitem['length']=='NA') && (single.sitem['width']=='NA') && (single.sitem['weight']=='NA'))){
            total_set=parseInt(total_set)+parseInt(single.quantity);
           }
        }
         )
        
       }
        {

    item.map((single,i)=>{
      let avqty=0;
        
      //console.log(single);
         // stock.map((SStock,si)=>{
           // if(SStock.item===single.itemname['id']){
            //avqty=SStock.quantity;
            //}
          //})
                  
                    return(
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td>{
                                 single.sitem['weight']=='NA'?
                                    single.sitem['itemcode']
                                 :
                                    single.sitem['itemcode']+" ("+single.sitem['weight'] +" KG/MTR)"
                                
                                }</td>


                            <td>{
                              (single.sitem['length']=='NA')?
                                null
                              :
                                single.sitem['length']
                                
                                }
                              
                                </td>


                            <td>{
                                     (single.remark=='NA')?
                                     null
                                   :
                                     single.quantity
                                     
                                     }</td>
                         
                       
                              <td>{
                                     (single.sitem['weight']=='NA')?
                                     null
                                   :
                                     (((single.sitem['weight']*single.quantity)*single.sitem['length'])/1000).toFixed(2)
                                     
                                     }
                                </td>
                                
                    
                              <td className='d-print-none'>{single.remark}</td>
                              <td className='d-print-none text-width'> 
                             { (single.status=='1')?
                              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                                <Form onSubmit={HandleStrip}>    
                                <span className='form-inline input-group text-width'>  
                               
                                <Form.Control type='hidden' value={single.id} name='stripped_id'></Form.Control>
                                <Form.Control className='text-width' type="text" placeholder="50" name='quantity' defaultValue={single.quantity} />                             
                                <Form.Control type='hidden' value={single.sitem['id']} name='item_id'></Form.Control>
                                <Form.Control type='hidden' value={single.sitem['itemcode']} name='item_code'></Form.Control>
                                <Form.Control type='hidden' value={single.sitem['length']} name='length'></Form.Control>  
                                <Form.Control type='hidden' value={single.sitem['Supplier']} name='supplier'></Form.Control>  
                                <Form.Control type='hidden' value={single.quantity} name='old_quantity'></Form.Control>  

                                <Button variant="primary" type="submit">Recieve Item</Button>
                            
                                    </span>    
                                     </Form>
                                </Form.Group>
                                :
                                single.wastage
                                    }
                              </td>
                              {
                              (single.revision==='1')?
                              <td className='d-print-none'>
                               <button onClick={(e)=>DeleteDNItem(e,single.id)}> <i className='fa-solid fa-trash'></i></button>
                                </td>
                              :
                                null
                                
                                }
                                               
                          </tr>
                          
                      )
                      

        }
      )





    }

      </tbody>
    </Table>

    <div className='row mt-5 col-sm-12'>
            <div className='col-sm-6'>
            <Table bordered className='delivery-note-fs dntable-border'>
                <thead>
                <tr>
            <td>Total weight</td>
            <td> Total Sqm</td>
            <td>Total Set</td>
        
        </tr>
                </thead>
                <tbody>
            
                    <tr>
                        <td>{total_weight.toFixed(2)}</td>
                        <td>{total_sqm.toFixed(2)}</td>
                        <td>{total_set}</td>
                    </tr>
                </tbody>
            </Table>
            <br></br>
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


    <div className='col-md-8'>
    <Form onSubmit={handleNote}>                                                             
            <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
              <Form.Label >Note :</Form.Label>
                <span className='form-inline input-group'>  
                 <Form.Control type="text" placeholder="Description" name='desc' defaultValue={dndata.note}/>&nbsp;&nbsp;
                 <Form.Control className='d-print-none' type="text" placeholder="Description" name='description' defaultValue={dndata.description}/> &nbsp;<span className='d-print-none'>(For internal purpose only)</span>
                 <Form.Control type='hidden' value={STID} name='dnid'></Form.Control>        
                    </span>
                  </Form.Group>
                  <button type="submit" className='btn btn-success btn-sm d-print-none'><i class="fa-solid fa-upload"></i> Update</button>
      </Form>
      </div>
      </div>
      </>

    )
}
export default STDetailPage
