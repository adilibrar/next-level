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


function NCRDetailspage(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[stock,setStock]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[qitem,setQItem]=useState([]);
    const[gitem,setGItem]=useState([]);
    const NCRId=location.state.id;
    const project_id=location.state.pid;
    const status=sessionStorage.getItem('code');

    const [po, setPO]=useState([]);
    const [dn, setdn]=useState([]);
    const [unit, setUnit]=useState([]);
    const [type, settype]=useState([]);
    const[parameters,setparameters]=useState([]);
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
      
      //getCountries();

        axios.get(AppURL.GetNCRItemList(NCRId)).then(response=>{
        setItem(response.data);
        console.log("Break")
        axios.get(AppURL.AllParameters).then(presponse=>{
          setparameters(presponse.data);
          console.log("Break 2")
          setLoading(false)
        })
        
        
        //alert(item.is_both);
        })

  

        // axios.get(AppURL.POQITEMByPO(POId)).then(response=>{
        //   setQItem(response.data);
        //   //alert(item.is_both);
        //   })

        // axios.get(AppURL.GlassPOItem(POId)).then(response=>{
        //     setGItem(response.data);
        //     //alert(item.is_both);
        //     })
          

        // axios.get(AppURL.UnitOfMeasure).then(response=>{
        //   setUnit(response.data);
        //   //alert(item.is_both);
        //   })

        //   axios.get(AppURL.SupplierDNINList).then(response=>{
        //     setdn(response.data);
        //     //alert(item.is_both);
        //     })
            
        //     axios.get(AppURL.GetItemType).then(response=>{
        //       settype(response.data);
        //       //alert(item.is_both);
        //       })
        //     axios.get(AppURL.SinglePO(POId)).then(response=>{
        //       setPO(response.data);
        //       //setLoading(false)
        //       console.log(response.data)
            
       

             // })

   
           // console.log(item.length)
     // console.log(po)
    },[ignored]);

  const [region, setRegion] = useState("");
  
//   const getCountries = async()=>{
//     try{

//       {

        
//   }
       
//   //const response= await axios.get(AppURL.StockList)
//     //    setCountries(response.data);

//     }catch(error){
//         console.log(error);
//     }
// }
function SaveNCRItems(e){
  e.preventDefault();
  const data={
    NCRItemProject:project_id,
    NCRId:NCRId,
    title:e.target.type.value,
    description:e.target.description.value,
    location:e.target.location.value,
    qty:e.target.qty.value,
    remarks:e.target.remarks.value,
    balance:e.target.qty.value,
    status:e.target.reason.value
  }
  axios.post(AppURL.SaveNCRItems,data,{
    headers:{
        "content-Type":"application/json",
        "Authorization":"Token "+sessionStorage.getItem("token"),
    }
     }).then(response=>{
      if(response.status=='201'){
        // e.reset();
        
         cogoToast.success("NCR Created Successfully...",{position:'top-right'});
         forceUpdate();        
         //setdamageshow(false)     
     }
     else{
         cogoToast.error("Something Went Wrong...",{position:'top-right'});
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
  if(e.target.qty.value==''){
    cogoToast.error("Quantity is required...")
  }
   else if(parseInt(e.target.qty.value)>parseInt(e.target.check_bal.value)){
    cogoToast.error("Something Went wrong...")
   }
   else{
    const data={
        id:e.target.item_id.value,
        balance:e.target.check_bal.value,
        qty:e.target.qty.value,
    }

      axios.post(AppURL.UpdateNcrItem,data
    ,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },
    }).then(response=>{
        if(response.data['message']=='200'){
            cogoToast.success("Updated successfully...")
            e.target.reset()
            forceUpdate();
          }
          else{
            cogoToast.error("Something went wrong...")
          }
    })
   }
//   else{
  
//   const data={
//     id:e.target.po_item_id.value,
//     quantity:e.target.quantity.value,
//     item_id:e.target.item_id.value,
//     supplierpo:e.target.supdeliverynote.value,
//   }
  
//   const dn_data={
//     orderitemid:e.target.po_item_id.value,
//     quantity:e.target.quantity.value,
//     recievedItem:e.target.item_id.value,
//     DNINFromsupplierNo:e.target.supdeliverynote.value,
//   }



//   axios.post(AppURL.POItemRecieve,data
//     ,{ 
//       headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Token "+sessionStorage.getItem("token"),
//     },
//   }).then(response=>{
//   //alert(response.status);
//     if(response.status == '202'){

//       axios.post(AppURL.DNINSupplierItem,dn_data
//         ,{ 
//           headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Token "+sessionStorage.getItem("token"),
//         },
//       }).then(response=>{
//       //alert(response.status);
//         if(response.status == '201'){
//           cogoToast.success("Item Recieved Successfully",{position:'top-right'});
//         }   
   
//       })
//     }   
// e.target.reset();
//     forceUpdate();
//   })
// }
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
            pono:NCRId,
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


 
if(status=='SI' || status=='PI'){

   return(
        <>
        <NavMenu></NavMenu>
                
        <form onSubmit={SaveNCRItems}>   
        <Table striped bordered hover>
       
       <thead>
         <tr>
           <th colSpan={3}>Glass / Frame Damage</th>
    
         </tr>
       </thead>
       <tbody>
       <tr>
       <td>Item Type:
   
   <select  

       class="form-select form-select-sm" aria-label=".form-select-sm example" name='type' >
     <option>Glass</option>
     <option>Aluminium Frame</option>
     
       </select>             
</td>
       <td>Defect Location:                      
                 <select  
                     class="form-select form-select-sm" aria-label=".form-select-sm example" name='location' required >
                   <option></option>
                   {
                                   parameters.map((parameter,i)=>{
                                     if(parameter.paracontrol=='Glass Damage'){
                                       return(
                                        
                           
                                           <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                    
                                       )
                                     }
                                   })
                     }
                     </select>             
           </td>

           <td>Description:
           <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" required name='description' ></input>  
           </td>
           <td>Total Qty
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" required name='qty' ></input>  

           </td>
                   
                     <td>Reason:
                 <select  
               class="form-select form-select-sm" aria-label=".form-select-sm example" name='reason'  >
                   <option></option>

                   {
                                   parameters.map((parameter,i)=>{
                                     if(parameter.paracontrol=='Glass Damage Reason'){
                                       return(
                                         <>
                                    
                                           <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                         
                                       </>
                                       )
                                     }
                                   })
                     }
             
                     </select>
           </td>
           

           <td>Cause(How its Damage):
           <input  type="text" class="form-control" id="exampleFormControlInput1" placeholder=""  name='remarks' ></input>  
           </td>
           <td>Charge To:
                 <select disabled
               class="form-select form-select-sm" aria-label=".form-select-sm example"  name='replacement_status' >
                <option>Select Option</option>
                   <option>NLG</option>
                   <option>Glass Provider</option>

             
                     </select>
           </td>
           
           {/* <td>Replacement Status:
                 <select  
               class="form-select form-select-sm" aria-label=".form-select-sm example"  name='replacement_status' >
                   <option></option> */}
                   {/* {
                                   parameters.map((parameter,i)=>{
                                     if(parameter.paracontrol=='Glass Replacement'){
                                       return(
                                         <>
                                         { nsi.al_order_status==parameter.paravalue ? 
                                           <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                         : 
                                           <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                         }
                                       </>
                                       )
                                     }
                                   })
                     } */}
{/*              
                     </select>
           </td> */}
           {/* <td>Order Place Date
           <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='order_date'  ></input>
            
           </td> */}
           {/* <td>Recieved Status:
                 <select  
               class="form-select form-select-sm" aria-label=".form-select-sm example" name='recieved_status' >
                   <option></option> */}
                   {/* {
                                   parameters.map((parameter,i)=>{
                                     if(parameter.paracontrol=='Damage Glass Recieved'){
                                       return(
                                         <>
                                         { nsi.al_order_status==parameter.paravalue ? 
                                           <option value={parameter.paravalue} selected >{parameter.paravalue}</option>
                                         : 
                                           <option value={parameter.paravalue}>{parameter.paravalue}</option>
                                         }
                                       </>
                                       )
                                     }
                                   })
                     } */}
             
                     {/* </select>
           </td> */}

                     <td> <button  className='btn btn-success mt-4' type='sbmit'>ADD</button></td>
         </tr>
       </tbody>

     </Table>
     </form>
<br></br>
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example d-print-none" defaultActiveKey="second">
      <Row>

        <Col sm={12}>
          <Tab.Content>
           <Tab.Pane eventKey="second">
           
    <Table striped bordered hover size="sm" className='sortable'>
      <thead>
        <tr>
          <th>Sr</th>
          <th>Item Type</th>
          <th>Defect Location</th>
          <th>Description</th>
          <th>Reason</th>
          <th>Cause (How)</th>
          <th>Total Qty</th>
          
          <th>Recieved</th>
          <th>Balance</th>
          <th className='d-print-none'>Action</th>

        </tr>
      </thead>
      <tbody>

        {

    item.map((single,i)=>{
      let avqty=0;
      console.log(single)
        //   stock.map((SStock,si)=>{
        //     if(SStock.item===single.po_item['id']){
        //     avqty=SStock.quantity;
        //     }
        //   })
                  
                    return(

                            <tr key={i}>
                            
                              <td>{i+1}</td>
                              
                              <td>{single.title}</td>
                              <td>{single.location}</td>
                              <td>{single.description}</td>
                              <td>{single.status}</td>
                              <td>{single.remarks}</td>
                              <td>{single.qty}</td>
                              <td>{parseInt(single.qty)-parseInt(single.balance)}</td>                           
                            {(single.balance)=='0'?
                                <td className='balance-equal'>{single.balance}</td>
                              :(single.balance==single.qty)?
                               <> {corder=false}
                              <td className='balance-low'>{single.balance}
                              
                              </td>
                              </>
                              :
                              <td className='balance-access'>{single.balance}</td>}
                              {/* {
                              <td>{single.po_item['itemcode']}</td>
                              <td>{single.po_item['length']}</td>
                              <td>{single.quantity}</td>                     
                              <td>{ (single.quantity)-(single.balance)}</td>
    } */}
                               {/* {
                              
                              (single.balance)=='0'?
                                <td className='balance-equal'>{single.balance}</td>
                              :(single.balance==single.quantity)?
                               <> {corder=false}
                              <td className='balance-low'>{single.balance}
                              
                              </td>
                              </>
                              :
                              <td className='balance-access'>{single.balance}</td>
                              } */}
                              <td  className='d-print-none'>

                               
                                <>
                                <Form onSubmit={handleSubmitRecieve}>
                                <div className='row col-md-12'>
                          
                                    <div className='col-md-12'>
                                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                                    
                                  
                                      <span className='form-inline input-group'> 
                                    

                                              {/* <select class="form-select" aria-label="Default select example"  name="supdeliverynote">
                                                      {dn.map((guest, index) => {
                                                      // totalCartPrice += item.unit_price*item.quantity;
                                                      return(         
                                                          
                                                      <option key={index} value={guest.id}  >{guest.orderno}</option>
                                                      
                                                  )}
                                                  )
                                                  }

                                              </select>       */}
                                      <Form.Control type="hidden" placeholder="Recieve Quantity" defaultValue={single.id} name='item_id'  />
                                      <Form.Control type="hidden" placeholder="Recieve Quantity" defaultValue={single.balance} name='check_bal'  />
                                    
                                      {/* <Form.Control type="hidden" placeholder="Recieve Quantity" defaultValue={single.po_item['id']} name='item_id'  /> */}
                                      
                                      <Form.Control type="text" placeholder="Recieve Quantity" name='qty' required/>
                                      
                              
                                      
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
export default NCRDetailspage
