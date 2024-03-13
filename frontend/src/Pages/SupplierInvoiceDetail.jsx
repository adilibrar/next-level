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


function SupplierInvoiceDetail(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[stock,setStock]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[qitem,setQItem]=useState([]);
    const POId=1;
    const status=sessionStorage.getItem('code');

    const [po, setPO]=useState([]);
    const [dn, setdn]=useState([]);
    const [unit, setUnit]=useState([]);
    const [type, settype]=useState([]);
    const [DNList, setDNList]=useState([]);
    const [DNData, setDnData]=useState([]);
    const [DNDataproject, setDnDataProject]=useState([]);
    
    
    const [loading,setLoading]=useState(true);
    //const [islength,setLength]=useState(false);
    //const [discount,setDiscount]=useState(false);
    let discount=false;
    let islength=false;
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

        axios.get(AppURL.SupplierDNINList).then(response=>{
            setDNList(response.data);
            //alert(item.is_both);
            })
        

        axios.get(AppURL.POQITEMByPO(POId)).then(response=>{
          setQItem(response.data);
          //alert(item.is_both);
          })
          console.log(qitem)

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
            setLoading(false)
       

              })

   
           // console.log(item.length)
     // console.log(po)
    },[ignored]);

  const [region, setRegion] = useState("");
  
  const getCountries = async()=>{
    try{

      {

        
  }
       
  //const response= await axios.get(AppURL.StockList)
    //    setCountries(response.data);

    }catch(error){
        console.log(error);
    }
}
const ApprovalSubmital=(e,po_id)=>{
  e.preventDefault();

const data={
  id:po_id
}
  
  axios.post(AppURL.UpdateAccountsPO,data
    ,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },
  }).then(response=>{
  //alert(response.status);

    if(response.status == '200'){
      cogoToast.success("PO Submitted for Approval Successfully",{position:'top-right'});
    }   
    forceUpdate();
  })
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

const handleSubmitRecieve =(e)=>{
  e.preventDefault();
  if(e.target.quantity.value==''){
    cogoToast.error("Quantity is required...")
  }
  else{
  
  const data={
    id:e.target.po_item_id.value,
    quantity:e.target.quantity.value,
    item_id:e.target.item_id.value,
    supplierpo:e.target.supdeliverynote.value,
  }
  
  const dn_data={
    orderitemid:e.target.po_item_id.value,
    quantity:e.target.quantity.value,
    recievedItem:e.target.item_id.value,
    DNINFromsupplierNo:e.target.supdeliverynote.value,
  }



  axios.post(AppURL.POItemRecieve,data
    ,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },
  }).then(response=>{
  //alert(response.status);
    if(response.status == '202'){

      axios.post(AppURL.DNINSupplierItem,dn_data
        ,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },
      }).then(response=>{
      //alert(response.status);
        if(response.status == '201'){
          cogoToast.success("Item Recieved Successfully",{position:'top-right'});
        }   
   
      })
    }   
e.target.reset();
    forceUpdate();
  })
}
}

const handleSubmit = (e) => {
    e.preventDefault();
   // alert("wel");
  // alert(POId);
if(parseInt(e.target.balance.value)>parseInt(e.target.quantity.value)){
    cogoToast.error("Recieved Quantity should be less than Ordered Quantity",{position:'top-right'});   
}

else if(e.target.quantity.value===''){
    cogoToast.error("Please enter quantity",{position:'top-right'});   
}

else if(e.target.balance.value===''){
  cogoToast.error("Please enter Balance Quantity",{position:'top-right'});   
}


else if(e.target.item.value===''){
    cogoToast.error("Please Select Item",{position:'top-right'});   
}


else{
        const data={
            po_item:e.target.item.value,
            quantity:e.target.quantity.value,
            balance:e.target.balance.value,
            pono:POId,
        }
        
        const stock_data={
          po_item:e.target.item.value,
          quantity:e.target.quantity.value,
          }

      axios.post(AppURL.POItemSave,data
        ,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },
      }).then(response=>{
      //alert(response.status);
        if(response.status == '201'){
          cogoToast.success("Item Recieved Successfully",{position:'top-right'});

          axios.post(AppURL.UpdatePOItem,stock_data
            ,{ 
              headers: {
              "Content-Type": "application/json",
              "Authorization": "Token "+sessionStorage.getItem("token"),
            },
          }).then(response=>{
            cogoToast.success("Stock Updated Successfully",{position:'top-right'});

          })
        }   
        forceUpdate();
      })




}
    
};

const ViewInvoice=(e)=>{
    e.preventDefault();

    axios.get(AppURL.SupplierInvoice(e.target.dn.value)).then(response=>{
        //alert(response.data.message);
        setDnData(response.data)
        //cogoToast.success("Item Deleted Successfully",{position:'top-right'});             
        forceUpdate()
        })
}

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
    
    if(loading){
      return <h4>Loading .....</h4>
 } 

if(po.serviceQuotation=='1'){

    return(
      <>Nothing to recieve</>
    )
  }

  if(status=='SI'){

   return(
        <>
        <NavMenu></NavMenu>
                
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example d-print-none" defaultActiveKey="second">
      <Row>
 
        <Col sm={12}>
          <Tab.Content>
           <Tab.Pane eventKey="second">
            <Form onSubmit={ViewInvoice}  className='d-print-none'>
            <div className='row col-md-12'>
            <div className='col-md-10'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Select Item</Form.Label>
                    <>
                    <Select
                        name='dn'
                        rules={{ required: true }}
                        value={region}
                        required={true}
                        onChange={(dn) => {
                       // console.log(item);
                        setRegion(dn);
                        
                        }}
                        options={DNList.map((guest, index) => {
                        return {
                          label: guest.orderno+" ("+guest.DNINPurchaseOrder['refrence']+")",
                          value: guest.id,
                            key: index,
                        };
                        })}
                    />
                    </>

                    

           
                </Form.Group>
                </div>
                <div className='col-md-2'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="hidden" placeholder="Ordered Quantity" name='quantity'  />
                  
                  <Form.Control type="hidden" placeholder="Recieved Quantity" name='balance'  />
                  
                   <Button variant="primary" type="submit" className='mt-2'>View Inovice Items</Button>
         
                    </span>    

                    </Form.Group>

                    </div>

                </div>
             </Form>
             <div className='mt-5'></div>

    {
        (DNData.length > 0)?
            <Table striped bordered hover size="sm" className='sortable'>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Code</th>
               
        
                <th>Recieved</th>
                <th>Date</th>
      
              </tr>
            </thead>
            <tbody>
      
              {
      
      DNData.map((single,i)=>{
            let avqty=0;
                stock.map((SStock,si)=>{
                  if(SStock.item===single.po_item['id']){
                  avqty=SStock.quantity;
                  }
                })
                        
                          return(
      
                                  <tr key={i}>
                                  
                                    <td>{i+1}</td>
                                    <td>{single.recievedItem['name']}</td>
                                    <td>{single.recievedItem['itemcode']}</td>
                           
                                    <td>{single.quantity}</td>                     
                                    <td>{single.created_at}</td>
                             
                           
                                   
                               
                                 
                                </tr>
                            )       
              }
            )
            }
            </tbody>
          </Table>
        :
        <>No Data</>
    }
    

    <br></br>

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
export default SupplierInvoiceDetail
