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


function RecieveItemDetail(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[stock,setStock]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[qitem,setQItem]=useState([]);
    const[gitem,setGItem]=useState([]);
    const POId=location.state.POID;
    const status=sessionStorage.getItem('code');

    const [po, setPO]=useState([]);
    const [dn, setdn]=useState([]);
    const [unit, setUnit]=useState([]);
    const [type, settype]=useState([]);
    
    const [loading,setLoading]=useState(true);
    //const [islength,setLength]=useState(false);
    //const [discount,setDiscount]=useState(false);
    let discount=false;
    let islength=false;
    let po_total=0;
   let vatdetail=0
   let corder=true
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

        axios.get(AppURL.POQITEMByPO(POId)).then(response=>{
          setQItem(response.data);
          //alert(item.is_both);
          })

        axios.get(AppURL.GlassPOItem(POId)).then(response=>{
            setGItem(response.data);
            //alert(item.is_both);
            })
          

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
              console.log(response.data)
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
function OrderCompleted(e){
  e.preventDefault();
  //alert(POId);
  
  axios.get(AppURL.RecieveInvoice(POId)).then(response=>{
    //setCart(response.data);

    if(response.data['message']=='200'){
      cogoToast.success("Updated successfully, Invoice Generated Successfully...")
      forceUpdate();
    }
    else{
      cogoToast.error("Something went wrong...")
    }
    })

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

const handleUpdate =(e)=>{
  e.preventDefault();
  //alert(e.target.item_id.value)
  if(e.target.price.value==''){
    cogoToast.error("Price is required...")
  }

  else{
    const data={
      id:e.target.item_id.value,
      price:e.target.price.value
    }

     axios.post(AppURL.EditPOItem,data,{ 
       headers: {
       "Content-Type": "application/json",
       "Authorization": "Token "+sessionStorage.getItem("token"),
     },}).then(response =>{  
       if(response.status===201){
            cogoToast.success("Price Updated Successfully ...",{position:'top-right'});
            forceUpdate()
       }
          
   })
  }
  
}


const handleUpdateQuot =(e)=>{
  e.preventDefault();
  //alert(e.target.item_id.value)
  if(e.target.price.value==''){
    cogoToast.error("Price is required...")
  }

  else{
    const data={
      id:e.target.item_id.value,
      price:e.target.price.value
    }

     axios.post(AppURL.EditQPOItem,data,{ 
       headers: {
       "Content-Type": "application/json",
       "Authorization": "Token "+sessionStorage.getItem("token"),
     },}).then(response =>{  
       if(response.status===201){
            cogoToast.success("Price Updated Successfully ...",{position:'top-right'});
            forceUpdate()
       }         
   })
  }  
}

const handleSubmitRecieve =(e)=>{
  e.preventDefault();
  if(e.target.quantity.value==''){
    cogoToast.error("Quantity is required...")
  }
   else if(parseInt(e.target.quantity.value)>parseInt(e.target.check_bal.value)){
    cogoToast.error("Something Went wrong...")
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


 
if(po.glass=='1'){
  if(status=='PI'){
  return(
    <div className='container-fluid'>
    <Row>
  <Col sm={12}>

<div className='row col-sm-12'>

   <div className='col-sm-6 delivery-note-fs'>
   
    <h3>Purchase Order</h3>
    <h6> {po.PurchaseSupplier['name']} </h6>
    <h6> {po.PurchaseSupplier['address']} </h6>
    <h7> {po.PurchaseSupplier['contact']} , </h7>
    <h7> {po.PurchaseSupplier['email']} </h7><br></br>
    <h7>TRN: {po.PurchaseSupplier['vat_number']}</h7>
       </div>

       <div className='col-sm-6'>
          <img src="https://gcdnb.pbrd.co/images/DJc4pg0y9SyZ.jpg?o=1" alt="Admin" className="" width="265" />
          <div className='col-sm-12 row'>
              <div className='col-sm-3 delivery-note-fs'>
                <h7><b>PO #</b></h7>
                <p>{po.refrence}</p>
                <h7><b>Dated</b></h7>
                <p>{po.creation_date}</p>
              
              </div>
              <div className='col-sm-9 delivery-note-fs'>
              <h7><b>Refrence</b></h7>
                <p>{po.quotationRefrence}</p>
                <h7><b>TRN</b></h7>
                <p>100073339200003</p>
              </div>
            </div>

          </div>
       </div>

       <div className='row col-sm-12'>
<div className='col-sm-12'>
  <h6 className='delivery-note-fs text-center'>Next Level Innovative Glass Metals LLC Jebel Ali Industrial Area 1 Lehbab Road, P.O Box:413717, Dubai UAE</h6>
  <h6 className='delivery-note-fs text-center'> Tel: +971 4 8812343,&nbsp;&nbsp;&nbsp;Fax: +971 4 8812345&nbsp;&nbsp;&nbsp;Email: info@nlc-me.com</h6>
 
 </div>
  <div className='col-sm-5'>

      </div>

  </div>

  <div className='mt-2'></div>

    
   
    
    <Table striped bordered hover size="sm" className='delivery-note-fs dntable-border'>
         <thead>
        <tr>
          <th>S.N</th>
          <th>Glass</th>
          <th>Description</th>
          <th>U-Insert</th>
          <th>Quantity</th>
          {/* <th>Balance</th> */}
          <th>Price</th>
          <th>Vat</th>
          {/* <th>Width</th>
          <th>Height</th> */}
          <th>Area</th>
          <th>Amount</th>
          <th>Remarks</th>
   
        </tr>
      </thead>
      <tbody>
        

      {
            gitem.map((single,i)=>{
             let item_total= single.area*single.quantity
               po_total=item_total+po_total
               vatdetail=single.vat
             })}


      {
         
         gitem.map((single,i)=>{
      
          return(
          <tr key={i}>
              <td>{i+1}</td>
              <td>{single.POGlassType['title']}</td>
              <td>{single.POGlassType['description']}</td>
              <td>{single.uinsert}</td>
              <td>{single.quantity}</td>
              <td>{single.price}</td>
              <td>{single.vat} %</td>
              <td>{single.area}</td>
              <td>{single.area*single.quantity}</td>
              <td>{single.remarks}</td>
          </tr>
          )
          
        })
    }
        </tbody>

        </Table>
       </Col>
       </Row>

       <div className='row col-sm-12'>
        
        <div className='col-sm-7 delivery-note-fs'>
                  <div className='col-sm-12'>
                  <div className='col-sm-2'></div>
                  <div className='col-sm-8'>
                  <h7><strong>Payment Terms: </strong>{po.payment_term}</h7><br></br>
                  <h7><strong>Note: </strong>{po.note}</h7>
                  </div>
                  <div className='col-sm-2'></div>
                  </div>
   
            </div>


     <div className='col-sm-5 delivery-note-fs'>
    
          
        <Table bordered size="sm" className=' dntable-border'>
    
        <tbody>

          
        <tr>
        <td><>Sub Total</></td>
        <td>{ new Intl.NumberFormat().format(po_total.toFixed(2)) }</td>
    
        </tr>

        <tr>
        <td><>Total VAT {vatdetail}%</></td>
        <td>
        { new Intl.NumberFormat().format(((po_total/100)*vatdetail).toFixed(2)) }
        </td>    
        </tr>

    
        <tr>
        <td>Total <b> {currency}</b></td>
        
        
       <td>{ new Intl.NumberFormat().format(((po_total/100)*vatdetail)+po_total) }</td>
        </tr>
            </tbody>
        </Table>
  </div>
        </div>

        {( po.accounts_submital =='0')?
            
            <> &nbsp;&nbsp;&nbsp;<button  onClick={(e)=> ApprovalSubmital(e,po.id)} className='btn btn-success' >Submit For Approval</button> </>
        :
         null
        
        }
{/* po.local =='1' &&  */}
    {(po.accounts_submital =='1' && po.accounts_approval =='0')?
          
          <> &nbsp;&nbsp;&nbsp;<button disabled onClick={(e)=> ApprovalSubmital(e,po.id)} className='btn btn-success'>Approval Pending</button> </>
      :
      null
      
      }
    {(po.accounts_approval =='1')?
          
          <> &nbsp;&nbsp;&nbsp;<button className='btn btn-success d-print-none' disabled>Approved</button> </>
          
      :
      null
      
      }

       </div>
    )
  }}
if(po.serviceQuotation=='1'){
  if(status=='PI'){
  return(
    <>
           <div className='container-fluid'>

<Tab.Container id="left-tabs-example" defaultActiveKey="second">
<Row>
  <Col sm={12}>
    <Tab.Content>
    
      <Tab.Pane eventKey="second">
<div className='row col-sm-12'>

   <div className='col-sm-6 delivery-note-fs'>
   
    <h3>Purchase Order</h3>
    <h6> {po.PurchaseSupplier['name']} </h6>
    <h6> {po.PurchaseSupplier['address']} </h6>
    <h7> {po.PurchaseSupplier['contact']} , </h7>
    <h7> {po.PurchaseSupplier['email']} </h7><br></br>
    <h7>TRN: {po.PurchaseSupplier['vat_number']}</h7>
   

    

       </div>

<div className='col-sm-6'>

<img src="https://gcdnb.pbrd.co/images/DJc4pg0y9SyZ.jpg?o=1" alt="Admin" className="" width="265" />
<div className='col-sm-12 row'>
    <div className='col-sm-3 delivery-note-fs'>
      <h7><b>PO #</b></h7>
      <p>{po.refrence}</p>
      <h7><b>Dated</b></h7>
      <p>{po.creation_date}</p>
    
    </div>
    <div className='col-sm-9 delivery-note-fs'>
    <h7><b>Refrence</b></h7>
      <p>{po.quotationRefrence}</p>
      <h7><b>TRN</b></h7>
      <p>100073339200003</p>
    </div>
  </div>

</div>
   </div>

</Tab.Pane>
</Tab.Content>
</Col>
</Row>
</Tab.Container>
</div>
<div className='row col-sm-12'>
<div className='col-sm-12'>
  <h6 className='delivery-note-fs text-center'>Next Level Innovative Glass Metals LLC Jebel Ali Industrial Area 1 Lehbab Road, P.O Box:413717, Dubai UAE</h6>
  <h6 className='delivery-note-fs text-center'> Tel: +971 4 8812343,&nbsp;&nbsp;&nbsp;Fax: +971 4 8812345&nbsp;&nbsp;&nbsp;Email: info@nlc-me.com</h6>
 
 </div>
  <div className='col-sm-5'>

      </div>

  </div>
<div className='mt-2'></div>

    
   
    
    <Table striped bordered hover size="sm" className='delivery-note-fs dntable-border'>
         <thead>
        <tr>
          <th>S.N</th>
          <th>Item</th>
          <th>Project</th>
          <th>Account</th>
          <th>Unit</th>
          <th>Quantity</th>
          <th>Weight</th>
          <th>Price</th>
          <th>Vat</th>
          <th>Amount</th>
          {/* {
            (po.accounts_submital=='0')?
              <th className='d-print-none'>Edit</th>
            :null
          } */}
        </tr>
      </thead>
      <tbody>
        
      {
         
         qitem.map((single,i)=>{
          currency=po.currency['symbol'];
          let single_vat=0;
          total_price=(total_price+((single.price*single.weight)*single.quantity))
          if(single.vat >0){
       
              single_vat=(((single.price/100)*single.weight)*single.quantity)*single.vat
              total_tax=total_tax+single_vat
            
          }
         // console.log("i am in else")
        if(po.accounts_submital=='0'){
          return(
            <tr key={i}>
                <td>{i+1}</td>
                <td>{single.po_item_title}</td>
                <td>{single.po_item_project['refrence_no']} - {single.po_item_project['name']}</td>
                <td>{single.quotaccountshead['title']}</td>
                <td>{single.qpouom['name']}</td>
                <td>{single.quantity}</td>
                <td>{single.weight}</td>
                <td>
                <Form onSubmit={handleUpdateQuot}>
                <span className='form-inline input-group'>  
                   <Form.Control className='text-width' type="text" placeholder="Price"  name='price' defaultValue={single.price} />
                   <Form.Control className='text-width' type="hidden" placeholder="item_id"  name='item_id' Value={single.id} />
                 <button  className='btn btn-danger'>Update</button>
          </span>
                    </Form>
              
                </td>
                <td>{single.vat}%</td>
                <td>{((single.weight*single.price)*single.quantity).toFixed(2)}</td>
          </tr>
            )
        }
          else{
          return(
          <tr key={i}>
              <td>{i+1}</td>
              <td>{single.po_item_title}</td>
              <td>{single.po_item_project['refrence_no']} - {single.po_item_project['name']}</td>
              <td>{single.quotaccountshead['title']}</td>
              <td>{single.qpouom['name']}</td>
              <td>{single.quantity}</td>
              <td>{single.weight}</td>
              <td>{single.price}</td>
              <td>{single.vat}%</td>
              <td>{((single.weight*single.price)*single.quantity).toFixed(2)}</td>
              
          </tr>
          )
          }
        })
    }
        </tbody>

        </Table>

        <div className='row col-sm-12'>
        
        <div className='col-sm-7 delivery-note-fs'>
                  <div className='col-sm-12'>
                  <div className='col-sm-2'></div>
                  <div className='col-sm-8'>
                  <h7><strong>Payment Terms: </strong>{po.payment_term}</h7><br></br>
                  <h7><strong>Note: </strong>{po.note}</h7>
                  </div>
                  <div className='col-sm-2'></div>
                  </div>
   
            </div>


     <div className='col-sm-5 delivery-note-fs'>
    
          
        <Table bordered size="sm" className=' dntable-border'>
    
        <tbody>

          
        <tr>
        <td><>Sub Total</></td>
        <td>{ new Intl.NumberFormat().format(total_price.toFixed(2)) }</td>
    
        </tr>

        <tr>
        <td><>Total VAT</></td>
        <td>
        { new Intl.NumberFormat().format(total_tax.toFixed(2)) }
        </td>    
        </tr>

    
        <tr>
        <td>Total <b> {currency}</b></td>
        
        
       <td>{ new Intl.NumberFormat().format(((total_price)+total_tax).toFixed(2)) }</td>
        </tr>
            </tbody>
        </Table>
  </div>
        </div>


        {
          (po.PerformaInvoice =='1')?
           <> &nbsp;&nbsp;&nbsp;<button disabled className='btn btn-success d-print-none'>Generate Performa Invoice</button> </>
          :null

          
        }
        {/* po.local =='1' && */}
        {( po.accounts_submital =='0')?
            
              <> &nbsp;&nbsp;&nbsp;<button  onClick={(e)=> ApprovalSubmital(e,po.id)} className='btn btn-success' >Submit For Approval</button> </>
          :
           null
          
          }
{/* po.local =='1' &&  */}
      {(po.accounts_submital =='1' && po.accounts_approval =='0')?
            
            <> &nbsp;&nbsp;&nbsp;<button disabled onClick={(e)=> ApprovalSubmital(e,po.id)} className='btn btn-success'>Approval Pending</button> </>
        :
        null
        
        }
      {(po.accounts_approval =='1')?
            
            <> &nbsp;&nbsp;&nbsp;<button className='btn btn-success d-print-none' disabled>Approved</button> </>
            
        :
        null
        
        }
    </>
  )
      }
  else if(status=='AC'){
    return(<>
    
    <div className='container-fluid'>

<Tab.Container id="left-tabs-example" defaultActiveKey="second">
<Row>
  <Col sm={12}>
    <Tab.Content>
    
      <Tab.Pane eventKey="second">
<div className='row col-sm-12'>

   <div className='col-sm-6 delivery-note-fs'>
   
    <h3>Purchase Order</h3>
    <h6> {po.PurchaseSupplier['name']} </h6>
    <h6> {po.PurchaseSupplier['address']} </h6>
    <h7> {po.PurchaseSupplier['contact']} , </h7>
    <h7> {po.PurchaseSupplier['email']} </h7><br></br>
    <h7>TRN: {po.PurchaseSupplier['vat_number']}</h7>

       </div>

<div className='col-sm-6'>

<img src="https://gcdnb.pbrd.co/images/DJc4pg0y9SyZ.jpg?o=1" alt="Admin" className="" width="265" />
<div className='col-sm-12 row'>
    <div className='col-sm-3 delivery-note-fs'>
      <h7><b>PO #</b></h7>
      <p>{po.refrence}</p>
      <h7><b>Dated</b></h7>
      <p>{po.creation_date}</p>
    
    </div>
    <div className='col-sm-9 delivery-note-fs'>
    <h7><b>Refrence</b></h7>
      <p>{po.quotationRefrence}</p>
      <h7><b>TRN</b></h7>
      <p>100073339200003</p>
    </div>
  </div>

</div>
   </div>

</Tab.Pane>
</Tab.Content>
</Col>
</Row>
</Tab.Container>
</div>
<div className='row col-sm-12'>
<div className='col-sm-12'>
  <h6 className='delivery-note-fs text-center'>Next Level Innovative Glass Metals LLC Jebel Ali Industrial Area 1 Lehbab Road, P.O Box:413717, Dubai UAE</h6>
  <h6 className='delivery-note-fs text-center'> Tel: +971 4 8812343,&nbsp;&nbsp;&nbsp;Fax: +971 4 8812345&nbsp;&nbsp;&nbsp;Email: info@nlc-me.com</h6>
 
 </div>
  <div className='col-sm-5'>

      </div>

  </div>
<div className='mt-2'></div>

    
   
    
    <Table striped bordered hover size="sm" className='delivery-note-fs dntable-border'>
         <thead>
        <tr>
          <th>S.N</th>
          <th>Item</th>
          <th>Project</th>
          <th>Account</th>
          <th>Unit</th>
          <th>Quantity</th>
          <th>Weight</th>
          <th>Price</th>
          <th>Vat</th>
          <th>Amount</th>
  
        </tr>
      </thead>
      <tbody>
        
      {
         
         qitem.map((single,i)=>{
          currency=po.currency['symbol'];
          let single_vat=0;
          total_price=(total_price+((single.price*single.weight)*single.quantity))
          if(single.vat >0){
       
              single_vat=(((single.price/100)*single.weight)*single.quantity)*single.vat
              total_tax=total_tax+single_vat
            
          }
          return(
          <tr key={i}>
              <td>{i+1}</td>
              <td>{single.po_item_title}</td>
              <td>{single.po_item_project['refrence_no']} - {single.po_item_project['name']}</td>
              <td>{single.quotaccountshead['title']}</td>
              <td>{single.qpouom['name']}</td>
              <td>{single.quantity}</td>
              <td>{single.weight}</td>
              <td>{single.price}</td>
              <td>{single.vat}%</td>
              <td>{((single.weight*single.price)*single.quantity).toFixed(2)}</td>
          </tr>
          )
        })
    }
        </tbody>

      
     
        </Table>

        <div className='row col-sm-12'>
        
        <div className='col-sm-7 delivery-note-fs'>
                  <div className='col-sm-12'>
                  <div className='col-sm-2'></div>
                  <div className='col-sm-8'>
                  <h7><strong>Payment Terms: </strong>{po.payment_term}</h7><br></br>
                  <h7><strong>Note: </strong>{po.note}</h7>
                  </div>
                  <div className='col-sm-2'></div>
                  </div>
   
            </div>


     <div className='col-sm-5 delivery-note-fs'>
    
          
        <Table bordered size="sm" className=' dntable-border'>
    
        <tbody>

          
        <tr>
        <td><>Sub Total</></td>
        <td>{ new Intl.NumberFormat().format(total_price.toFixed(2)) }</td>
    
        </tr>
      {
        discount?
                  
        <tr>
        <td><>Discount</></td>
        <td>{ new Intl.NumberFormat().format(total_discount.toFixed(2)) }</td>
    
        </tr>
        :null

      }
        <tr>
        <td><>Total VAT</></td>
        <td>
        { new Intl.NumberFormat().format(total_tax.toFixed(2)) }
        </td>    
        </tr>

    
        <tr>
        <td>Total <b> {currency}</b></td>
        
        
       <td>{ new Intl.NumberFormat().format(((total_price)+total_tax).toFixed(2)) }</td>
        </tr>
            </tbody>
        </Table>
  </div>
        </div>


        

  {( po.accounts_approval =='0')?
        
        <> &nbsp;&nbsp;&nbsp;<button  onClick={(e)=> ApprovePO(e,po.id)} className='btn btn-success'>Approve PO</button> </>
    :
    <> &nbsp;&nbsp;&nbsp;<button disabled  className='btn btn-success'>Approved</button> </>
    
    }
    </>
    
    
    )
  }

  else{
    return(
      <>Nothing to recieve</>
    )
  }
}
 currency=po.currency['symbol'];
 if(status=='AC'){
  return(
    
    <>
    {
  
  item.map((single,i, arr)=>{
    //setLoading(true)
    //console.log(arr.length)
    if(single.po_item['type']=='1'){
      //avqty=SStock.quantity;
      islength=true
      //setLength(true)
      }
    // console.log(single.discount)
      if(single.discount!=''){
        //avqty=SStock.quantity;
        discount=true
      //setDiscount(true)
      }
      
      if (arr.length  === i) {
        // Last one.
        //console.log("last")
        
      }
      //setLoading(false)
    })
}
     <NavMenu className='d-print-none'></NavMenu>
     
         <div className='container-fluid'>

          <Tab.Container id="left-tabs-example" defaultActiveKey="second">
          <Row>
            <Col sm={12}>
              <Tab.Content>
              
                <Tab.Pane eventKey="second">
      <div className='row col-sm-12'>
    
             <div className='col-sm-6 delivery-note-fs'>
             
              <h3>Purchase Order</h3>
              <h6> {po.PurchaseSupplier['name']} </h6>
              <h6> {po.PurchaseSupplier['address']} </h6>
              <h7> {po.PurchaseSupplier['contact']} , </h7>
              <h7> {po.PurchaseSupplier['email']} </h7><br></br>
              <h7>TRN: {po.PurchaseSupplier['vat_number']}</h7>
             
    
              
        
                 </div>

          <div className='col-sm-6'>
         
         <img src="https://gcdnb.pbrd.co/images/DJc4pg0y9SyZ.jpg?o=1" alt="Admin" className="" width="265" />
         <div className='col-sm-12 row'>
              <div className='col-sm-3 delivery-note-fs'>
                <h7><b>PO #</b></h7>
                <p>{po.refrence}</p>
                <h7><b>Dated</b></h7>
                <p>{po.creation_date}</p>
              
              </div>
              <div className='col-sm-9 delivery-note-fs'>
              <h7><b>Refrence</b></h7>
                <p>{po.quotationRefrence}</p>
                <h7><b>TRN</b></h7>
                <p>100073339200003</p>
              </div>
            </div>

       </div>
             </div>

      </Tab.Pane>
      </Tab.Content>
      </Col>
      </Row>
      </Tab.Container>
      </div>
      <div className='row col-sm-12'>
        <div className='col-sm-12'>
            <h6 className='delivery-note-fs text-center'>Next Level Innovative Glass Metals LLC Jebel Ali Industrial Area 1 Lehbab Road, P.O Box:413717, Dubai UAE</h6>
            <h6 className='delivery-note-fs text-center'> Tel: +971 4 8812343,&nbsp;&nbsp;&nbsp;Fax: +971 4 8812345&nbsp;&nbsp;&nbsp;Email: info@nlc-me.com</h6>
           
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

         <th>Description</th>
          <th>Item Type</th>
          <th>Account</th>
         {

          islength?
          <th>Length</th>
            :null
         }
         <th>UOM</th>
         <th>Project</th>
          <th>Quantity</th>
          <th>Unit Price</th>
  
          {
          discount?
          <th>Discount</th>
          :null
         }
         
          <th>Tax</th>
          <th>Amount</th>
  
        </tr>
      </thead>
      <tbody>
    
      {

item.map((single,i)=>{
 
//console.log("dfsfd")
      //total_price=total_price+(single.price*single.quantity)  
      let single_vat=0

      //console.log(single.pouom['id'])
      if(single.po_item['unit'] != single.pouom['id']){
     
        total_price=total_price+((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price);
        if(single.vat >0){

          if(single.discount !=''){
            single_vat=(((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat)-((((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat)*single.discount)/100;
          
            total_tax=total_tax+single_vat
          }
         else{ 
          single_vat=((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat;
          
          total_tax=total_tax+single_vat
        }
        }

        if(single.discount !=''){
          total_discount=total_discount+((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)*single.discount)/100)
        }
       
      }
      else{
        total_price=(total_price+(single.price*single.quantity))
        if(single.vat >0){
          if(single.discount!=''){
            single_vat=(((single.price/100)*single.quantity)*single.vat)-(((((single.price/100)*single.quantity)*single.vat)*single.discount)/100)
            
            total_tax=total_tax+(single_vat)
          }
          else{
            single_vat=((single.price/100)*single.quantity)*single.vat
            total_tax=total_tax+single_vat
          }
       
       
        }
       // console.log("i am in else")
        if(single.discount !=''){
          total_discount=total_discount+((((single.price*single.quantity))*single.discount)/100)
          //console.log(total_discount)
        }
      }
                return(

                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{single.po_item['itemcode']}</td>
                        <td>{single.po_item['name']}
                        
                        {
                             single.remarks!=''?
                             <> - {single.remarks}</>
                             :null
                        }
                        
                        </td>
                        <td>{
                        
                        type.map((ntype,i)=>{
                            if(ntype['id']==single.po_item['type']){
                                return(
                                  <>
                                  {ntype['name']}
                                  </>
                                )
                              }
                            })
                        }</td>
                                                <td  className='d-print-none'>{single.accountshead['title']}</td>
                          {
                            islength?
                            <td>{single.po_item['length']}</td>
                            :null
                          }
                          
                          {
                            single.po_item['unit'] != single.pouom['id']?
                            <>
                            <td>{
                              unit.map((units,i)=>{
                                if(units.id==single.pouom['id']){
                               // avqty=SStock.quantity;
                                return (units.name)
                                }
                           
                              })
                            }</td>
                            <td>{single.forprojectpo['refrence_no']} - {single.forprojectpo['name']}</td>
                            <td>{(((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000)).toFixed(2)} ({
                            
                                    unit.map((units,i)=>{
                                      if(units.id==single.po_item['unit']){
                                     // avqty=SStock.quantity;
                                      return (
                                        <>{single.quantity}-{units.name}</>
                                        )
                                      }
                                 
                                    })
                            })</td>
                            
                            
                            <td>{single.price}</td>
                            <td>{single.vat}%</td>
                            <td>{((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price).toFixed(2)}</td>
                           </>
                            :
                            <>
                            <td>{
                              unit.map((units,i)=>{
                                if(units.id===single.po_item['unit']){
                               // avqty=SStock.quantity;
                                return (units.name)
                                }
                            
                              })
                        }</td>
                        <td>{single.forprojectpo['refrence_no']} - {single.forprojectpo['name']}</td>
                        <td>{single.quantity}</td> 
                        <td>{single.price}</td> 
                        {
                            discount?
                            <td>{single.discount}%</td>
                            :null
                          }
                          
                      
                        <td>{single.vat}%</td>                     
                        <td>{new Intl.NumberFormat().format(single.price*single.quantity)}</td>
            </>
                          }
          
                     
                       
                      </tr>
                  )       
    })
  }
        </tbody>
        </Table>


    <div className='row col-sm-12'>
    
    <div className='col-sm-7 delivery-note-fs'>
              <div className='col-sm-12'>
              <div className='col-sm-2'></div>
              <div className='col-sm-8'>
              <h7><strong>Payment Terms: </strong>{po.payment_term}</h7><br></br>
              <h7><strong>Note: </strong>{po.note}</h7>
              </div>
              <div className='col-sm-2'></div>
              </div>

        </div>


 <div className='col-sm-5 delivery-note-fs'>

      
    <Table bordered size="sm" className=' dntable-border'>

    <tbody>

      
    <tr>
    <td><>Sub Total</></td>
    <td>{ new Intl.NumberFormat().format(total_price.toFixed(2)) }</td>

    </tr>
    {
        discount?
                  
        <tr>
        <td><>Discount</></td>
        <td>{ new Intl.NumberFormat().format(total_discount.toFixed(2)) }</td>
    
        </tr>
        :null

      }
    <tr>
    <td><>Total VAT</></td>
    <td>
    { new Intl.NumberFormat().format(total_tax.toFixed(2)) }
    </td>    
    </tr>


    <tr>
    <td>Total <b> {currency}</b></td>
    
   <td>{ new Intl.NumberFormat().format(((total_price-total_discount)+total_tax).toFixed(2)) }</td>
    </tr>
        </tbody>
    </Table>
</div>
    </div>
    


  {( po.accounts_approval =='0')?
        
        <> &nbsp;&nbsp;&nbsp;<button  onClick={(e)=> ApprovePO(e,po.id)} className='btn btn-success'>Approve PO</button> </>
    :
    <> &nbsp;&nbsp;&nbsp;<button disabled  className='btn btn-success'>Approved</button> </>
    
    }

    </>

    
  )
 }
  else if(status=='SI'){

   return(
        <>
        <NavMenu></NavMenu>
                
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example d-print-none" defaultActiveKey="second">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column d-print-none">
         
            <Nav.Item>
              <Nav.Link eventKey="second">Add PO Item</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
           <Tab.Pane eventKey="second">
            <Form onSubmit={handleSubmit}  className='d-print-none'>
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
                    <Form.Label>Ordered and Recieved Quantity</Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Ordered Quantity" name='quantity'  />
                  
                  <Form.Control type="text" placeholder="Recieved Quantity" name='balance'  />
                  
                   <Button variant="primary" type="submit">+</Button>
         
                    </span>    

                    </Form.Group>

                    </div>

                </div>
             </Form>
             <div className='mt-5'></div>

           
    <Table striped bordered hover size="sm" className='sortable'>
      <thead>
        <tr>
          <th>Sr</th>
          <th>Name</th>
          <th>Code</th>
          <th>Length</th>
          <th>Ordered</th>
          <th>Recieved</th>
          <th>Balance</th>
          <th className='d-print-none'>Action</th>

        </tr>
      </thead>
      <tbody>

        {

    item.map((single,i)=>{
      let avqty=0;
          stock.map((SStock,si)=>{
            if(SStock.item===single.po_item['id']){
            avqty=SStock.quantity;
            }
          })
                  
                    return(

                            <tr key={i}>
                            
                              <td>{i+1}</td>
                              <td>{single.po_item['name']}</td>
                              <td>{single.po_item['itemcode']}</td>
                              <td>{single.po_item['length']}</td>
                              <td>{single.quantity}</td>                     
                              <td>{ (single.quantity)-(single.balance)}</td>
                               {
                              
                              (single.balance)=='0'?
                                <td className='balance-equal'>{single.balance}</td>
                              :(single.balance==single.quantity)?
                               <> {corder=false}
                              <td className='balance-low'>{single.balance}
                              
                              </td>
                              </>
                              :
                              <td className='balance-access'>{single.balance}</td>
                              }
                              <td  className='d-print-none'>

                               
                                <>
                                <Form onSubmit={handleSubmitRecieve}>
                                <div className='row col-md-12'>
                          
                                    <div className='col-md-12'>
                                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                                    
                                  
                                      <span className='form-inline input-group'> 
                                    

                                              <select class="form-select" aria-label="Default select example"  name="supdeliverynote">
                                                      {dn.map((guest, index) => {
                                                      // totalCartPrice += item.unit_price*item.quantity;
                                                      return(         
                                                          
                                                      <option key={index} value={guest.id}  >{guest.orderno}</option>
                                                      
                                                  )}
                                                  )
                                                  }

                                              </select>      
                                      <Form.Control type="hidden" placeholder="Recieve Quantity" defaultValue={single.id} name='po_item_id'  />
                                      <Form.Control type="hidden" placeholder="Recieve Quantity" defaultValue={single.balance} name='check_bal'  />
                                    
                                      <Form.Control type="hidden" placeholder="Recieve Quantity" defaultValue={single.po_item['id']} name='item_id'  />
                                      
                                      <Form.Control type="text" placeholder="Recieve Quantity" name='quantity' required/>
                                      
                              
                                      
                                      <Button  variant="primary" type="submit">+</Button>
                            
                                        </span>    

                                        </Form.Group>

                                        </div>

                                    </div>
                                   </Form>
                                  </>
                              </td>
                             
                         
                           
                          </tr>
                      )       
        }
      )
      }
      </tbody>
    </Table>
    <br></br>
    {

      corder && po.status=='1'?
      <Button  className='d-print-none'  onClick={(e)=>OrderCompleted(e)} >Order Completed</Button>
      : null
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

    else if(status=='SII'){

      return(
           <>
           <NavMenu></NavMenu>
                   
                  
         <div className='container-fluid'>
   
         <Tab.Container id="left-tabs-example " defaultActiveKey="second">
         <Row>
           <Col sm={2}  className='d-print-none'>
             <Nav variant="pills" className="flex-column">
            
               <Nav.Item>
                 <Nav.Link eventKey="second">Add PO Item</Nav.Link>
               </Nav.Item>
             </Nav>
           </Col>
           <Col sm={10}>
             <Tab.Content>
              <Tab.Pane eventKey="second">
               <Form onSubmit={handleSubmit}  className='d-print-none'>
               <div className='row col-md-12 d-print-none'>
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
                       <Form.Label>Ordered and Recieved Quantity</Form.Label>
   
                     <span className='form-inline input-group'>  
                     <Form.Control type="text" placeholder="Ordered Quantity" name='quantity'  />
                     
                     <Form.Control type="text" placeholder="Recieved Quantity" name='balance'  />
                     
                      <Button variant="primary" type="submit">+</Button>
            
                       </span>    
   
                       </Form.Group>
   
                       </div>
   
                   </div>
                </Form>
                <div className='mt-5'></div>
   
              
       <Table striped bordered hover size="sm" className='sortable'>
         <thead>
           <tr>
             <th>Barcode</th>
             <th>Name</th>
             <th>Code</th>
             <th>Length</th>
             <th>Ordered</th>
             <th>Recieved</th>
             <th>Balance</th>
   
           </tr>
         </thead>
         <tbody>
   
           {
   
       item.map((single,i)=>{
         let avqty=0;
             stock.map((SStock,si)=>{
               if(SStock.item===single.po_item['id']){
               avqty=SStock.quantity;
               }
             })
                     
                       return(
   
                               <tr key={i}>
                               
                                 <td>{single.po_item['barcode']}</td>
                                 <td>{single.po_item['name']}</td>
                                 <td>{single.po_item['itemcode']}</td>
                                 <td>{single.po_item['length']}</td>
                                 <td>{single.quantity}</td>                     
                                 <td>{ (single.quantity)-(single.balance)}</td>
                                 
                                 {
                                   (single.balance)>0 ?
                                 <td className=''>
   
                                    { (single.balance) } &nbsp;
                                       <>
                                       <Form onSubmit={handleSubmit}>
               <div className='row col-md-12'>
               <div className='col-md-6'>
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
                             label: guest.item['barcode']+" - "+guest.item['itemcode'],
                             value: guest.item['id'],
                               key: index,
                           };
                           })}
                       />
                       </>
   
                       <Form.Text className="text-muted">
             
                       </Form.Text>
                   </Form.Group>
                   </div>
                   <div className='col-md-4'>
                   <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                       <Form.Label>Recieved Quantity</Form.Label>
   
                     <span className='form-inline input-group'>  
                     <Form.Control type="text" placeholder="Ordered Quantity" name='quantity'  />
                     
              
                     
                      <Button variant="primary" type="submit">+</Button>
            
                       </span>    
   
                       </Form.Group>
   
                       </div>
   
                   </div>
                </Form>
                                       </>
                                 </td>
                                      :<td>0</td>
                               }
                            
                              
                             </tr>
                         )       
           }
         )
         }
         </tbody>
       </Table>
       <br></br>
   <Button disabled>Send Detail Via Email</Button>
   
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
    
{
  
  item.map((single,i, arr)=>{
    //setLoading(true)
    //console.log(arr.length)
    if(single.po_item['type']=='1'){
      //avqty=SStock.quantity;
      islength=true
      //setLength(true)
      }
    // console.log(single.discount)
      if(single.discount!=''){
        //avqty=SStock.quantity;
      //setDiscount(true)
      discount=true
      }
      else{
        discount=false
      }
      
      if (arr.length  === i) {
        // Last one.
        //console.log("last")
        
      }
      //setLoading(false)
    })
}
        
         <NavMenu className='d-print-none'></NavMenu>
         
             <div className='container-fluid'>

              <Tab.Container id="left-tabs-example" defaultActiveKey="second">
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                  
                    <Tab.Pane eventKey="second">
          <div className='row col-sm-12'>
        
                 <div className='col-sm-6 delivery-note-fs'>
                 
                  <h3>Purchase Order</h3>
                  <h6> {po.PurchaseSupplier['name']} </h6>
                  <h6> {po.PurchaseSupplier['address']} </h6>
                  <h7> {po.PurchaseSupplier['contact']} , </h7>
                  <h7> {po.PurchaseSupplier['email']} </h7><br></br>
                  <h7>TRN: {po.PurchaseSupplier['vat_number']}</h7>
                 
        
                  
            
                     </div>
 
              <div className='col-sm-6'>
             
             <img src="https://gcdnb.pbrd.co/images/DJc4pg0y9SyZ.jpg?o=1" alt="Admin" className="" width="265" />
             <div className='col-sm-12 row'>
                  <div className='col-sm-3 delivery-note-fs'>
                    <h7><b>PO #</b></h7>
                    <p>{po.refrence}</p>
                    <h7><b>Dated</b></h7>
                    <p>{po.creation_date}</p>
                  
                  </div>
                  <div className='col-sm-9 delivery-note-fs'>
                  <h7><b>Refrence</b></h7>
                    <p>{po.quotationRefrence}</p>
                    <h7><b>TRN</b></h7>
                    <p>100073339200003</p>
                  </div>
                </div>
    
           </div>
                 </div>

          </Tab.Pane>
          </Tab.Content>
          </Col>
          </Row>
          </Tab.Container>
          </div>
          <div className='row col-sm-12'>
            <div className='col-sm-12'>
                <h6 className='delivery-note-fs text-center'>Next Level Innovative Glass Metals LLC Jebel Ali Industrial Area 1 Lehbab Road, P.O Box:413717, Dubai UAE</h6>
                <h6 className='delivery-note-fs text-center'> Tel: +971 4 8812343,&nbsp;&nbsp;&nbsp;Fax: +971 4 8812345&nbsp;&nbsp;&nbsp;Email: info@nlc-me.com</h6>
               
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
         <th>Description</th>
         <th className='d-print-none'>Project</th>
        <th className='d-print-none'>Account</th>
         {

          islength?
          <th>Length</th>
            :null
         }
         <th>UOM</th>
          <th>Quantity</th>
          <th>Unit Price</th>
         {
          discount !=='' ?
          <th>Discount</th>
          :null
         }
         
          <th>Tax</th>
          <th>Amount</th>
  
        </tr>
      </thead>
      <tbody>
    
      {

item.map((single,i)=>{
      console.log(item)

      //total_price=total_price+(single.price*single.quantity)  
      let single_vat=0

      //console.log(single.pouom['id'])
      if(single.po_item['unit'] != single.pouom['id']){
     
        total_price=total_price+((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price);
        if(single.vat >0){

          if(single.discount !=''){
            discount=true
            single_vat=(((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat)-((((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat)*single.discount)/100;
          
            total_tax=total_tax+single_vat
          }
         else{ 
          single_vat=((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)/100))*single.vat;
          
          total_tax=total_tax+single_vat
        }
        }

        if(single.discount !=''){
          discount=true
          total_discount=total_discount+((((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price)*single.discount)/100)
        }
       
      }
      else{
        total_price=(total_price+(single.price*single.quantity))
        if(single.vat >0){
          if(single.discount!=''){
            single_vat=(((single.price/100)*single.quantity)*single.vat)-(((((single.price/100)*single.quantity)*single.vat)*single.discount)/100)
            
            total_tax=total_tax+(single_vat)
          }
          else{
            single_vat=((single.price/100)*single.quantity)*single.vat
            total_tax=total_tax+single_vat
          }
       
       
        }
       // console.log("i am in else")
        if(single.discount !=''){
          discount=true
          total_discount=total_discount+((((single.price*single.quantity))*single.discount)/100)
          //console.log(total_discount)
        }
      }
//       <td>
//       <Form onSubmit={handleUpdate}>
//       <span className='form-inline input-group'>  
//          <Form.Control className='text-width' type="text" placeholder="Price"  name='price' defaultValue={single.price} />
//        <button  className='btn btn-danger'>Update</button>
// </span>
//           </Form>
    
//       </td>
if(po.accounts_submital=='0'){
  return(
    <tr key={i}>
    <td>{i+1}</td>
    <td>{single.po_item['itemcode']}</td>
    <td>{single.po_item['name'] }

    {
         single.remarks!=''?
         <> - {single.remarks}</>
         :null
    }
    </td>
    <td className='d-print-none'>{single.forprojectpo['refrence_no']} - {single.forprojectpo['name']}</td>
    <td  className='d-print-none'>{single.accountshead['title']}</td>
      {
        islength?
        <td>{single.po_item['length']}</td>
        :null
      }
      
      {
        single.po_item['unit'] != single.pouom['id']?
        <>
        <td>{
          unit.map((units,i)=>{
            if(units.id==single.pouom['id']){
           // avqty=SStock.quantity;
            return (units.name)
            }
       
          })
        }</td>
        <td>{(((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000)).toFixed(2)} ({
        
                unit.map((units,i)=>{
                  if(units.id==single.po_item['unit']){
                 // avqty=SStock.quantity;
                  return (
                    <>{single.quantity}-{units.name}</>
                    )
                  }
             
                })
        })</td>
        <td>{single.price}</td>
        <td>{single.vat}%</td>
        <td>{((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price).toFixed(2)}</td>
       </>
        :
        <>
        <td>{
          unit.map((units,i)=>{
            if(units.id===single.po_item['unit']){
           // avqty=SStock.quantity;
            return (units.name)
            }
        
          })
    }</td>
    <td>{single.quantity}</td> 
           <td>
      <Form onSubmit={handleUpdate}>
      <span className='form-inline input-group'>  
          <Form.Control className='text-width' type="text" placeholder="Price"  name='price' defaultValue={single.price} />
          <Form.Control className='text-width' type="hidden" placeholder="item_id"  name='item_id' Value={single.id} />
          
        <button  className='btn btn-danger'>Update</button>
 </span>
           </Form>
    
       </td>
    {
        discount !=='' ?
        <td>{
          single.discount?
            single.discount+"%"
            :
            null
          
          }</td>
        :null
      }
      
  
    <td>{single.vat}%</td>                     
    <td>{new Intl.NumberFormat().format(single.price*single.quantity-(((single.price*single.quantity)/100)*single.discount))}</td>
    
</>
      }

 
   
  </tr>
)
}
    else{
                return(
                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{single.po_item['itemcode']}</td>
                        <td>{single.po_item['name'] }

                        {
                             single.remarks!=''?
                             <> - {single.remarks}</>
                             :null
                        }
                        </td>
                        <td className='d-print-none'>{single.forprojectpo['refrence_no']} - {single.forprojectpo['name']}</td>
                        <td  className='d-print-none'>{single.accountshead['title']}</td>
                          {
                            islength?
                            <td>{single.po_item['length']}</td>
                            :null
                          }
                          
                          {
                            single.po_item['unit'] != single.pouom['id']?
                            <>
                            <td>{
                              unit.map((units,i)=>{
                                if(units.id==single.pouom['id']){
                               // avqty=SStock.quantity;
                                return (units.name)
                                }
                           
                              })
                            }</td>
                            <td>{(((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000)).toFixed(2)} ({
                            
                                    unit.map((units,i)=>{
                                      if(units.id==single.po_item['unit']){
                                     // avqty=SStock.quantity;
                                      return (
                                        <>{single.quantity}-{units.name}</>
                                        )
                                      }
                                 
                                    })
                            })</td>
                            <td>{single.price}</td>
                            <td>{single.vat}%</td>
                            <td>{((((single.po_item['weight']*single.quantity))*(single.po_item['length']/1000))*single.price).toFixed(2)}</td>
                           </>
                            :
                            <>
                            <td>{
                              unit.map((units,i)=>{
                                if(units.id===single.po_item['unit']){
                               // avqty=SStock.quantity;
                                return (units.name)
                                }
                            
                              })
                        }</td>
                        <td>{single.quantity}</td> 
                        <td>{single.price}</td> 
                        {
                            discount !=='' ?
                            <td>{
                              single.discount?
                                single.discount+"%"
                                :
                                null
                              
                              }</td>
                            :null
                          }
                          
                      
                        <td>{single.vat}%</td>                     
                        <td>{new Intl.NumberFormat().format(single.price*single.quantity-(((single.price*single.quantity)/100)*single.discount))}</td>
                        
            </>
                          }
          
                     
                       
                      </tr>
                  )     
                        }  
    })
  }
        </tbody>
        </Table>


        <div className='row col-sm-12'>
        
        <div className='col-sm-7 delivery-note-fs'>
                  <div className='col-sm-12'>
                  <div className='col-sm-2'></div>
                  <div className='col-sm-8'>
                  <h7><strong>Payment Terms: </strong>{po.payment_term}</h7><br></br>
                  <h7><strong>Note: </strong>{po.note}</h7>
                  </div>
                  <div className='col-sm-2'></div>
                  </div>
   
            </div>


     <div className='col-sm-5 delivery-note-fs'>
    
          
        <Table bordered size="sm" className=' dntable-border'>
    
        <tbody>

          
        <tr>
        <td><>Sub Total</></td>
        <td>{ new Intl.NumberFormat().format(total_price.toFixed(2)) }</td>
    
        </tr>
      {
        discount==true?
                  
        <tr>
        <td><>Discount</></td>
        <td>{ new Intl.NumberFormat().format(total_discount.toFixed(2)) }</td>
    
        </tr>
        :null

      }
        <tr>
        <td><>Total VAT</></td>
        <td>
        { new Intl.NumberFormat().format(total_tax.toFixed(2)) }
        </td>    
        </tr>

    
        <tr>
        <td>Total <b> {currency}</b></td>
        
        
       <td>{ new Intl.NumberFormat().format(((total_price-total_discount)+total_tax).toFixed(2)) }</td>
        </tr>
            </tbody>
        </Table>
  </div>
        </div>
        
        {
          (po.PerformaInvoice =='1')?
           <> &nbsp;&nbsp;&nbsp;<button disabled className='btn btn-success d-print-none'>Generate Performa Invoice</button> </>
          :null

          
        }
        {/* po.local =='1' && */}
        {(po.accounts_submital =='0')?
            
              <> &nbsp;&nbsp;&nbsp;<button  onClick={(e)=> ApprovalSubmital(e,po.id)} className='btn btn-success'>Confirm Details</button> </>
          :
           null
          
          }
{/* po.local =='1' &&  */}
      {(po.accounts_submital =='1' && po.accounts_approval =='0')?
            
            <> &nbsp;&nbsp;&nbsp;<button disabled onClick={(e)=> ApprovalSubmital(e,po.id)} className='btn btn-success'>Approval Pending</button> </>
        :
        null
        
        }
      {(po.accounts_approval =='1')?
            
            <> &nbsp;&nbsp;&nbsp;<button className='btn btn-success d-print-none' disabled>Approved</button> </>
            
        :
        null
        
        }
        </>

        
      )
    }
}
export default RecieveItemDetail
