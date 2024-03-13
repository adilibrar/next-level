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

import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

function IssueReservedStock(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[status,setStatus]=useState([]);
    const [error,setError]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[qty,SetQty]=useState([]);
    const[DNLIST,setDNLIST]=useState([]);
    const [visible, setVisible] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, enableButton] = useState("");
    const MTOid=location.state.MTOid;
    const[mtodata,setMTOData]=useState([]);
    let[RequiredQty,setRequiredQty]=useState(0);
    
    
    const [loading,setLoading]=useState(true);
    const[issue,setIssue]=useState([]);

    
    const [show, setShow] = useState(false);
    const [pdffile, setPdffile] = useState("");

// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

   const [checkoutInput,SetCheckoutInput]=useState({
   // status:'',

    });
    


    useEffect(()=>{
      const check_login=sessionStorage.getItem('login');
      const status=sessionStorage.getItem('code');
      setStatus(sessionStorage.getItem('code'))
        if(!check_login){
            navigate('/login')
          }
          else if(check_login){
        
            if(status==='SI'|| status==='SA'){

            }
            else{
              navigate('/');
              alert('you are not allowed to access , your action will be reported');
            }
          }    
      axios.get(AppURL.SingleMTO(MTOid)).then(response=>{
        setMTOData(response.data);
        })

        axios.get(AppURL.DNListLimit).then(response=>{
            setDNLIST(response.data);
            })
    

        axios.get(AppURL.IssuedItemByMto(MTOid)).then(response=>{
        setItem(response.data);
        //alert(item.is_both);
        setLoading(false);
        })


        axios.get(AppURL.SingleStockQTY).then(response=>{
            SetQty(response.data)
            //console.log(response.data);
            //alert(item.is_both);
            });

            // axios.get(AppURL.IssuedStockList).then(response=>{
            //     setIssue(response.data);
            //     setLoading(false);
            //     });

    
    },[ignored]);

const PurchaseRequest=(e,item_id)=>{
    e.preventDefault();
    alert("Purchase Request");
  const data={
    item_cart:item_id,
    forproject:mtodata.projectmto['id'],
    quantity:2,
    description:"NA",
    status:1,
    priority:1,
    mtocart:MTOid,
  }

    //item_cart:e.target.item_id.value,
    //fromproject:e.target.old_project_id.value,
    //forproject:mtodata.projectmto['id'],
    //quantity:e.target.assign.value,
    //description:"NA",
    //status:1,
    //priority:1,
    //mtocart:MTOid,
}


const IssueForProduction=(e)=>{
    e.preventDefault();

    if(parseInt(e.target.balance.value)<parseInt(e.target.reserve_quantity.value)){
       cogoToast.error("Not Enough Balance",{position:'top-right'});
     }

    else if(e.target.reserve_quantity.value ===''){
        cogoToast.error("select the quantity ",{position:'top-right'});
    }
    else{
  const data={
    Issuingproject:e.target.project.value,
    issuedmto:MTOid,
    Production_Issued_item:e.target.item_id.value,
    Issued_item_reserved:e.target.mto_item_id.value,
    color:e.target.color.value,
    quantity:e.target.reserve_quantity.value,
    
  }
const balance_data={
    id:e.target.mto_item_id.value,
    balance:parseInt(e.target.balance.value)-parseInt(e.target.reserve_quantity.value) ,
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
    forceUpdate();
  })
}
  
  }

  
  

  const IssueForPowderCoating=(e)=>{
    e.preventDefault();
//quantityforpc
if(parseInt(e.target.balance.value)<parseInt(e.target.quantityforpc.value)){
    cogoToast.error("Not Enough Balance",{position:'top-right'});
  }

 else if(e.target.quantityforpc.value ===''){
     cogoToast.error("select the quantity ",{position:'top-right'});
 }
 else{
  const data={
    dno:e.target.deliverynote.value,
    dnitem:e.target.item_id.value,
    quantity:e.target.quantityforpc.value,
    Issued_item_PC:e.target.mto_item_id.value,
    projectPC:mtodata.projectmto['id'],
    description:"NA",
    status:1,
    priority:1,
    pcissuedmto:MTOid,
    color:e.target.color.value,
    remark:e.target.remark.value,
  }

  const balance_data={
    id:e.target.mto_item_id.value,
    balance:parseInt(e.target.balance.value)-parseInt(e.target.quantityforpc.value) ,
}
  e.target.reset();
  axios.post(AppURL.AddDNITEM,data,{ 
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
      
    cogoToast.success("Item Added for Delivery Note",{position:'top-right'});
    //new data will be reloaded
    forceUpdate();
  })
 }

  
  }




const SubmitAddtoCart=(e)=>{
  e.preventDefault();
const data={
  item_cart:e.target.item_id.value,
  forproject:mtodata.projectmto['id'],
  quantity:e.target.required_quantity.value,
  description:"NA",
  status:1,
  priority:1,
  mtocart:MTOid,
}
const MTOItemData={
id:e.target.mto_item_id.value,
cart:1
}


axios.post(AppURL.ADDToCart,data,{ 
  headers: {
  "Content-Type": "application/json",
  "Authorization": "Token "+sessionStorage.getItem("token"),
},}).then(response=>{
  axios.patch(AppURL.UpdateMTOItemStatus,MTOItemData,{ 
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}).then(re=>{
   // console.log("ok");
  })
  
  cogoToast.success("Item Added to Cart",{position:'top-right'});
  //new data will be reloaded
  forceUpdate();
})

}


const handleIssuing=(e)=>{
    e.preventDefault();
    if(parseInt(e.target.assign.value) > parseInt(e.target.issued.value)){
         cogoToast.error("Quantity Should be lesser than assigned",{position:'top-right'});   
        // var numberAsInt = parseInt(number, 10);
    }
    else{
        const old_data={
            project:e.target.old_project_id.value,
            quantity:e.target.assign.value,
            issued_item:e.target.item_id.value,
            old_quantity:e.target.issued.value
        }

    const data={
        Issued_item:e.target.item_id.value,
        quantity:e.target.assign.value,
        status:1,
        // project:e.target.new_project_id.value
        project:mtodata.projectmto['id'],
        //project:'5'
      }

    const cart_data={
      item_cart:e.target.item_id.value,
      fromproject:e.target.old_project_id.value,
      forproject:mtodata.projectmto['id'],
      quantity:e.target.assign.value,
      description:"NA",
      status:1,
      priority:1,
      mtocart:MTOid,
    }

    axios.post(AppURL.IssueStock,data,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}).then(response =>{  
         if(response.status===201){

          if(e.target.assign.value==e.target.issued.value){
            axios.delete(AppURL.StockIssuingDelete(e.target.issue_id.value)).then(response=>{
              //alert(response.data.message);
              if(response.data.message==200){     
                cogoToast.success("Item is free to use",{position:'top-right'});

                axios.post(AppURL.ADDToCart,cart_data,{ 
                  headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Token "+sessionStorage.getItem("token"),
                },}).then(response=>{
                  cogoToast.success("Item Added to Cart",{position:'top-right'});



                  //new data will be reloaded
                  forceUpdate();
                })
              }
            })
               }

  else{
            axios.post(AppURL.ChangeSingleQTY,old_data,{ 
              headers: {
              "Content-Type": "application/json",
              "Authorization": "Token "+sessionStorage.getItem("token"),
            },}).then(response=>{
                //SetQty(response.data)
                if(response.status===202){
                  cogoToast.success("Item has been Reserved for new Project",{position:'top-right'});
                  axios.post(AppURL.ADDToCart,cart_data,{ 
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+sessionStorage.getItem("token"),
                  },}).then(response=>{
                    cogoToast.success("Item Added to Cart",{position:'top-right'});



                    //new data will be reloaded
                    forceUpdate();
                  })
  
                }
                });
              }
            }

       })


}

}

const AdjustBalanceForm=(e)=>{
 let quant=0
 let RequiredQty=0
  e.preventDefault();
  const data={
    total:e.target.required_qty.value,
    //total:qty,
    issue_id:e.target.id.value,
    item_id:e.target.item_id.value
    //qty:e.target.total.value,
  }
  quant=e.target.total.value;
  RequiredQty=e.target.required_qty.value;




  if(RequiredQty <= 0){
    cogoToast.error("Something went wrong, please contact with system administrator");
  }

  else if(RequiredQty>quant){
    cogoToast.error("The value you entered should be lesser than max value");
  }
  else{

  axios.post(AppURL.AdjustBalance,data,{ 
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}).then(response =>{  
  
     if(response.status===201){
      
         cogoToast.success("Item has been Reserved",{position:'top-right'});
         e.target.reset();
        //  setRequiredQty('')
        // forceUpdate();
        //setRequiredQty(null)
        //e.target.reset
        //forceUpdate();
        
        

     }
     else{
      cogoToast.error("not enough stock or Something went wrong, please contact with system administrator");
     }

     forceUpdate();
     
    }
    
    )
    
    
  }
}
const AdjustBalance=(e,qty,issue_id,item)=>{
  e.preventDefault();
  const data={
    total:RequiredQty,
    //total:qty,
    issue_id:issue_id,
    item_id:item
  }
  alert(RequiredQty)
  if(RequiredQty <= 0){
    cogoToast.error("Something went wrong, please contact with system administrator");
  }

  else if(RequiredQty>qty){
    cogoToast.error("The value you entered should be lesser than max value");
  }
  else{

  axios.post(AppURL.AdjustBalance,data,{ 
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}).then(response =>{  
  
     if(response.status===201){
      
         cogoToast.success("Item has been Reserved",{position:'top-right'});
        // required_qty.target.reset();
        //  setRequiredQty('')
        // forceUpdate();
        //setRequiredQty(null)
        setRequiredQty('0');
         
        
        //forceUpdate();
        forceUpdate();
        

     }
     else{
      cogoToast.error("not enough stock or Something went wrong, please contact with system administrator");
     }

     
     
    }
    
    )
    
    
  }
  
  //
}


const IssueItem=(e,itemid,quantity,item_id,mto_id)=>{
    setDisabled(true);
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Reserving";
    e.preventDefault();
    enableButton(e.target.value);
    if(parseInt(quantity)===0){
      cogoToast.error("Item should be more than 1 to reserve",{position:'top-right'});
    }
    else{
  const data={
        quantity:quantity,
        Issued_item:item_id,
        project:mto_id,
        status:1,
        assigned:1
    }


    const updateMTO={
      id:itemid,
      assigned:1
    }

    const payload="sub"
    const payload_data={
        quantity:quantity,
        payload:payload,
    }


axios.post(AppURL.StockValueUpdateBYItem(item_id),payload_data,{ 
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
         if(response.status===201){
             cogoToast.success("Item has been Reserved",{position:'top-right'});
            setError([]);

            axios.get(AppURL.SingleStockQTY).then(response=>{
                SetQty(response.data)

                axios.patch(AppURL.UpdateMTOItemStatus,updateMTO,{ 
                  headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Token "+sessionStorage.getItem("token"),
                },}).then(re=>{
                  console.log("ok");
                })

                forceUpdate();
                });
          
            
        }
 
        else if(response.status===400){
                cogoToast.error("All Fields are Mandatory...",{position:'top-right'});
                setError(response.data.errors);
                console.log(error);
            }

        })
 }
 })
}
setDisabled(false);
}



const toggleShown=(item_id) =>{
    //slice method to return selected element as new array object
    const shownState=visible.slice();
    //indexOf to search array for specified item
    const index= shownState.indexOf(item_id);
    //if item found remove item
    if(index >= 0){
            //splice //adds //remove item
            //1 mean remove one item

            //remove one item if found
            shownState.splice(index,1)
            setVisible(shownState);
    }else{
        shownState.push(item_id);
        setVisible(shownState);
    }

}



if(loading){
    return <h4>Loading .....</h4>
} 

else{
if(status=='SI'){
   return(
        <>
                <NavMenu></NavMenu>
               
            
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            
            <Nav.Item>
              <Nav.Link eventKey="second">Reserved Items</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>

            <Tab.Pane eventKey="second">
             <div className='mt-5'></div>

             <Alert variant="primary">
          Here is the list of Reserved items.
        </Alert>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
            <th></th>

        <th>Item Code</th>
          <th>Description</th>
          <th>Length</th>
          <th>Color</th>
          <th>Res-Qty</th>
          <th>Actual-Qty</th>
          <th>Issued</th>
          <th>Revoked</th>
          <th>Returned</th>
          <th>Balance</th>
          <th>Remarks</th>
          <th className='btn-coloumn'>Action</th>
        </tr>
      </thead>
      <tbody>

                          
        {
        item.map((single,i)=>{
          
            //alert(single.project['id']);
            let mtoitemid=single.id;
            let balanceqty=single.balance;
                  return(
                    <>
                    <tr key={i}>
                        <td>
                            <button className='btn btn-danger btn-sm' >{i+1}</button></td>
                          
                            <td>{single.Issued_item['itemcode']}</td>                         
                            <td>{single.Issued_item['name']}</td>
                            <td>{single.Issued_item['length']}</td>
                            <td>{single.color}</td>
                            <td>{parseInt(single.quantity)}</td>
                            <td>{parseInt(single.actual_quantity)}</td>
                            <td>{(parseInt(single.quantity)-parseInt(single.revoke))-parseInt(single.balance)}</td>
                            <td>{single.revoke}</td>
                            <td>{parseInt(single.returned)}</td>
                            <td>{parseInt(single.balance)+parseInt(single.returned)}</td>
                            <td>{single.remarks}</td>
                            {
                                qty.map((q,ii)=>{
                                    if ( q.item==single.Issued_item['id']) {
                                        return (
                                        
                                          <td >
                              {
                                single.balance>0?
                                   <>
                                   {
                                  (single.color=='MF' || single.color=='NA' || single.remarks=='Arch')?
                                   <form onSubmit={IssueForProduction}>
                                   <Form.Group className="mb-2 mt-2 form-inline" controlId="formBasicEmail">
                                   <span className='form-inline input-group text-width-reserved'> 
                                       <Form.Control  className='resizedTextbox' type="number" placeholder=""  name='reserve_quantity' />
                                       <Form.Control type="hidden" placeholder=""  name='item_id' value={single.Issued_item['id']} required />   
                                       <Form.Control type="hidden" placeholder=""  name='project' value={single.project['id']} required />   
                                       <Form.Control type="hidden" placeholder=""  name='mto_item_id' value={mtoitemid} required />
                                       <Form.Control type="hidden" placeholder=""  name='balance' value={parseInt(balanceqty)} required />                 
                                       <Form.Control type="hidden" placeholder=""  name='color' value={single.color} required />    
                                                                              
                                      <button  className='btn btn-success'>Issue for Production</button>&nbsp;
                                  
                                   </span>
                                   </Form.Group>
                                   </form>
                                   :
                                   <form onSubmit={IssueForPowderCoating}>
                                   <Form.Group className="mb-2 mt-2 form-inline" controlId="formBasicEmail">
                                       <span className='form-inline input-group'> 

                                           <select class="form-select" aria-label="Default select example"  name="deliverynote">
                                                   {DNLIST.map((guest, index) => {
                                                   // totalCartPrice += item.unit_price*item.quantity;
                                                   return(         
                                                       
                                                   <option key={index} value={guest.id}  >{guest.id+" - "+guest.dnproject['refrence_no']+" - "+guest.dnproject['name']+" ("+guest.copy+") "}</option>
                                                   
                                               )}
                                               )
                                               }
                           
                                           </select>     
                                        <Form.Control type="hidden"name='balance' value={parseInt(balanceqty)} required />                                                    
                                        <Form.Control type="hidden" placeholder="Quantity"  name='color' value={single.color} required />    
                                       <Form.Control  className='resizedTextbox'  placeholder="Quantity"  type="number"  name='quantityforpc' required />
                                       <Form.Control  className='resizedTextbox'  placeholder="Remarks"  type="text"  name='remark' />
                                       <Form.Control type="hidden" placeholder=""  name='item_id' value={single.Issued_item['id']} required />   
                                       <Form.Control type="hidden" placeholder=""  name='mto_item_id' value={mtoitemid} required />                                              
                                       <button  className='btn btn-success'>Issue for Powder Coating</button>&nbsp;
                                       </span>
                                       </Form.Group>
                               </form>
                                    }
                         
              
                               

                                </>
                                            
                              
                                :
                                <span>NA </span>
                              }
                              
                                    &nbsp;
                                    {
                                      
                                        (parseInt(single.total)>0)?
                                        <>
                                            <form onSubmit={AdjustBalanceForm}>
                                          <Form.Group className="mt-2 form-inline" controlId="formBasicEmail">
                                          <span className='form-inline input-group text-width-reserved'> 


                                        <Form.Control type="hidden"name='total' value={parseInt(single.total)} required />                                                    
                                        <Form.Control type="hidden"  name='id' value={single.id} required />    
                                       <Form.Control type="hidden" placeholder=""  name='item_id' value={single.Issued_item['id']} required />   
                                        

                                        <Form.Control type="text" placeholder=""  name='required_qty'  required /> 
                                        {/* <Form.Control type="text" placeholder=""  name='required_qty' defaultValue={RequiredQty} onChange={(e)=> setRequiredQty(e.target.value)} required />  */}
                                        <button  className='btn btn-danger' type='submit' ><i className='fa fa-upload' > </i> Add More Max:  {single.total}</button> 
                                        {/* onClick={(e)=>AdjustBalance(e,single.total,single.id,single.Issued_item['id'])} */}
                                        </span>
                                        </Form.Group>
                                        </form>
                                        
                                        </>
                                        :
                                        null
                                      }     
                                     
                                            </td>
                                           
                                        )
                                    }
                          
                                })

                                
                                }
                            </tr>
                     
                         
                            </>
                    )
                })
                
                //.then(galleries => {
                   // dispatch({ type: FETCH_GALLERIES_SUCCESS, payload: galleries });
                  // console.log(galleries);
                //})
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
      else{
        return(
          <>
                  <NavMenu></NavMenu>
                 
              
                 
        <div className='container-fluid'>
  
        <Tab.Container id="left-tabs-example" defaultActiveKey="second">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              
              <Nav.Item>
                <Nav.Link eventKey="second">Reserved Items</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
  
              <Tab.Pane eventKey="second">
               <div className='mt-5'></div>
  
               <Alert variant="primary">
            Here is the list of Reserved items.
          </Alert>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
              <th></th>
              <th>Item Code</th>
          <th>Description</th>
          <th>Length</th>
          <th>Color</th>
          <th>Res-Qty</th>
          <th>Actual-Qty</th>
          <th>Issued</th>
          <th>Revoked</th>
          <th>Returned</th>
          <th>Balance</th>
          <th>Remarks</th>
          <th className='btn-coloumn'>Action</th>
          </tr>
        </thead>
        <tbody>
  
                            
          {
          item.map((single,i)=>{
              //alert(single.project['id']);
              let mtoitemid=single.id;
              let balanceqty=single.balance;
                    return(
                      <>
                      {



// <td>{single.Issued_item['itemcode']}</td>                         
// <td>{single.Issued_item['name']}</td>
// <td>{single.Issued_item['length']}</td>
// <td>{single.color}</td>
// <td>{parseInt(single.quantity)}</td>
// <td>{parseInt(single.actual_quantity)}</td>
// <td>{parseInt(single.quantity)-parseInt(single.balance)}</td>
// <td>{single.revoke}</td>
// <td>{parseInt(single.returned)}</td>
// <td>{parseInt(single.balance)+parseInt(single.returned)}</td>
// <td>{single.remarks}</td>


                        (single.Issued_item['type']=='2' && (single.color =='MF' || single.color =='NA'))?
                        <tr key={i}>
                        <td>
                            <button className='btn btn-danger btn-sm' >{i}</button></td>
                          
                            <td>{single.Issued_item['itemcode']}</td>   
                            <td>{single.Issued_item['name']}</td>                      
                            <td>{single.Issued_item['length']}</td>
                            <td>{single.color}</td>
                            <td>{parseInt(single.quantity)}</td>
                            <td>{parseInt(single.actual_quantity)}</td>
                            <td>{(parseInt(single.quantity)-parseInt(single.revoke))-parseInt(single.balance)}</td>
                            <td>{single.revoke}</td>
                            <td>{parseInt(single.returned)}</td>
                            <td>{parseInt(single.balance)+parseInt(single.returned)}</td>
                            
                            <td>{single.remarks}</td>
                            {
                                qty.map((q,ii)=>{
                                    if ( q.item==single.Issued_item['id']) {
                                        return (
                                        
                                          <td >

                              {
                                single.balance>0?
                                   <>
                                   {
                                  (single.color=='MF' || single.color=='NA' || single.remarks=='Arch')?
                                   <form onSubmit={IssueForProduction}>
                                   <Form.Group className="mb-2 mt-2 form-inline" controlId="formBasicEmail">
                                   <span className='form-inline input-group text-width-reserved'> 
                                       <Form.Control  className='resizedTextbox' type="number" placeholder=""  name='reserve_quantity' />
                                       <Form.Control type="hidden" placeholder=""  name='item_id' value={single.Issued_item['id']} required />   
                                       <Form.Control type="hidden" placeholder=""  name='project' value={single.project['id']} required />   
                                       <Form.Control type="hidden" placeholder=""  name='mto_item_id' value={mtoitemid} required />
                                       <Form.Control type="hidden" placeholder=""  name='balance' value={parseInt(balanceqty)} required />                 
                                       <Form.Control type="hidden" placeholder=""  name='color' value={single.color} required />      
                                                                              
                                      <button  className='btn btn-success'>Issue for Production</button>
                                      
                                     
                                   </span>
                                   </Form.Group>
                                   </form>
                                   :
                                   <form onSubmit={IssueForPowderCoating}>
                                   <Form.Group className="mb-2 mt-2 form-inline" controlId="formBasicEmail">
                                       <span className='form-inline input-group'> 

                                           <select class="form-select" aria-label="Default select example"  name="deliverynote">
                                                   {DNLIST.map((guest, index) => {
                                                   // totalCartPrice += item.unit_price*item.quantity;
                                                   return(         
                                                       
                                                   <option key={index} value={guest.id}  >{guest.dnproject['refrence_no']+" - "+guest.dnproject['name']+" ("+guest.copy+") "}</option>
                                                   
                                               )}
                                               )
                                               }
                           
                                           </select>     
                                        <Form.Control type="hidden"name='balance' value={parseInt(balanceqty)} required />                                                    
                                        <Form.Control type="hidden" placeholder="Quantity"  name='color' value={single.color} required />    
                                       <Form.Control  className='resizedTextbox'  placeholder="Quantity"  type="number"  name='quantityforpc' required />
                                       <Form.Control  className='resizedTextbox'  placeholder="Remarks"  type="text"  name='remark' />
                                       <Form.Control type="hidden" placeholder=""  name='item_id' value={single.Issued_item['id']} required />   
                                       <Form.Control type="hidden" placeholder=""  name='mto_item_id' value={mtoitemid} required />                                              
                                       <button  className='btn btn-success'>Issue for Powder Coating</button>
                                       </span>
                                       </Form.Group>
                               </form>
                                    }
                         
                     
                               

                                </>
                                            
                              
                                :
                                <span>NA</span>
                              }

                                     {/* {
                                        (parseInt(single.total) < (parseInt(single.quantity)+parseInt(single.actual_quantity)))?
                                        <button  className='btn btn-danger' onClick={(e)=>AdjustBalance(e,single.total,single.id,single.Issued_item['id'])}><i className='fa fa-upload' > </i> Add {single.total} More</button> 
                                       
                                        :
                                        null
                                      }    */}
                                                          
                                                          {
                                      
                                      (parseInt(single.total)>0)? <button  className='btn btn-danger' onClick={(e)=>AdjustBalance(e,single.total,single.id,single.Issued_item['id'])}><i className='fa fa-upload' > </i> Add {single.total} More</button> 
                
                                      :
                                      null
                                    }     

                                     
                                            </td>
                                           
                                        )
                                    }
                          
                                })

                                
                                }
                            </tr>
                     
                        :null
                      }

                           
                              </>
                      )
                  })
                  
                  //.then(galleries => {
                     // dispatch({ type: FETCH_GALLERIES_SUCCESS, payload: galleries });
                    // console.log(galleries);
                  //})
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

    }
      
}
export default IssueReservedStock
