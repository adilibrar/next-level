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

function SubmittedMTODetail(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[status,setStatus]=useState([]);
    const [error,setError]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[qty,SetQty]=useState([]);
    const [visible, setVisible] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, enableButton] = useState("");
    const MTOid=location.state.MTOid;
    const[mtodata,setMTOData]=useState([]);
    const[IssuedMTOData,setIssuedMTOData]=useState([]);
    
    const [loading,setLoading]=useState(true);
    const[issue,setIssue]=useState([]);
    const[productionstock,setproductionstock]=useState([]);
    
    const [show, setShow] = useState(false);
    const [pdffile, setPdffile] = useState("");

// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });
    


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
          }    
      axios.get(AppURL.SingleMTO(MTOid)).then(response=>{
        setMTOData(response.data);

          axios.get(AppURL.item_list_by_mto(MTOid)).then(response=>{
            setIssuedMTOData(response.data);
            })
  
        })


        
      //getCountries();

        axios.get(AppURL.ItemByMto(MTOid)).then(response=>{
        setItem(response.data);
        //alert(item.is_both);
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


                        
          axios.get(AppURL.getProductionStock).then(response=>{
            setproductionstock(response.data);
            //console.log(response.data)
            setLoading(false);
          
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



const SubmitAddtoCart=(e)=>{
  e.preventDefault();
const data={
  item_cart:e.target.item_id.value,
  forproject:mtodata.projectmto['id'],
  quantity:e.target.required_quantity.value,
  description:"NA",
  status:1,
  priority:1,
  Supplier:e.target.supplier_id.value,
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






  //item_cart:e.target.item_id.value,
  //fromproject:e.target.old_project_id.value,
  //forproject:mtodata.projectmto['id'],
  //quantity:e.target.assign.value,
  //description:"NA",
  //status:1,
  //priority:1,
  //mtocart:MTOid,
}


const handleIssuing=(e)=>{
    e.preventDefault();
    if(parseInt(e.target.assign.value) > parseInt(e.target.balance.value)){
         cogoToast.error("Quantity Should be less than Balance",{position:'top-right'});   
        // var numberAsInt = parseInt(number, 10);
    }
    else{
        const old_data={
            project:e.target.old_project_id.value,
            quantity:e.target.assign.value,
            issued_item:e.target.item_id.value,
            old_quantity:e.target.issued.value,
            balance:e.target.balance.value,
            
        }

    const data={
        Issued_item:e.target.item_id.value,
        quantity:e.target.assign.value,
        status:1,
        color:e.target.color.value,
        // project:e.target.new_project_id.value
        project:mtodata.projectmto['id'],
        balance:e.target.assign.value,
        //project:'5'
        issuingmto:mtodata.id,
        color:e.target.color_b.value,
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
                cogoToast.success("Item assigned successfully...",{position:'top-right'});
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
                  cogoToast.success("Item is free to use",{position:'top-right'});
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



const IssueItemProduction=(e,remark,color,itemid,quantity,item_id,mto_id)=>{
  setDisabled(true);
  const thisClicked=e.currentTarget;
  thisClicked.innerText="Reserving";
  e.preventDefault();
  //enableButton(e.target.value);
  if(parseInt(quantity)===0){
    cogoToast.error("Item should be more than 1 to reserve",{position:'top-right'});
  }
  else{
const data={
      quantity:quantity,
      balance:quantity,
      Issued_item:item_id,
      project:mto_id,
      status:1,
      //Supplier:e.target.supplier_id.value,
      assigned:1,
      issuingmto:MTOid,
      color:color,
      remarks:remark,

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

     axios.post(AppURL.IssueStock,data,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}).then(response =>{  
       if(response.status===201){
           cogoToast.success("Item has been Reserved",{position:'top-right'});
          setError([]);
          forceUpdate();
    
      }

      else if(response.status===400){
              cogoToast.error("All Fields are Mandatory...",{position:'top-right'});
              setError(response.data.errors);
              
          }

      })

      thisClicked.innerText="Reserved";
}
setDisabled(false);
}



const IssueItem=(e,remark,color,itemid,quantity,actual_qty,item_id,mto_id,total_check)=>{
   let data={}
    setDisabled(true);
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Reserving";
    e.preventDefault();
    enableButton(e.target.value);
    if(parseInt(quantity)===0){
      cogoToast.error("Item should be more than 1 to reserve",{position:'top-right'});
    }
    else{
      if(total_check>quantity){

         data={
          quantity:quantity,
          balance:quantity,
          Issued_item:item_id,
          project:mto_id,
          status:1,
          //Supplier:e.target.supplier_id.value,
          assigned:1,
          issuingmto:MTOid,
          color:color,
          remarks:remark,
          actual_quantity:actual_qty,
          total:total_check-quantity
  
      }
      }
      else{
         data={
          quantity:quantity,
          balance:quantity,
          Issued_item:item_id,
          project:mto_id,
          status:1,
          //Supplier:e.target.supplier_id.value,
          assigned:1,
          issuingmto:MTOid,
          color:color,
          remarks:remark,
          actual_quantity:actual_qty,
          total:0
      }
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
              //  forceUpdate();
            
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









const IssueItemBar=(e,remark,color,itemid,quantity,item_id,mto_id)=>{

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
    balance:quantity,
    Issued_item:item_id,
    project:mto_id,
    status:1,
    //Supplier:e.target.supplier_id.value,
    assigned:1,
    issuingmto:MTOid,
    color:color,
    remarks:remark,

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
          //  forceUpdate();
          thisClicked.innerText="Reserved";
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
  //setDisabled(true);
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




   return(
        <>
                <NavMenu></NavMenu>
               
            
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            
            <Nav.Item>
              <Nav.Link eventKey="second">Add MTO Item</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>

            <Tab.Pane eventKey="second">
             <div className='mt-5'></div>

             <Alert variant="primary">
          Here is the list of MTO items you added.
        </Alert>
    <Table  bordered hover size="sm">
      <thead>
        <tr>
            <th></th>

          <th>Item Code</th>
          <th>Description</th>
          <th>Remarks</th>
          <th>Length</th>
         
          <th>Req-Qty</th>
          <th>Reserved</th>
          <th>Ava-Qty</th>

          <th className='btn-coloumn'>Action</th>
        </tr>
      </thead>
      <tbody>

                          
        {
        item.map((single,i)=>{
            //console.log(single.project['id']);
            //alert(single.project['id']);
            console.log(single)
            let reserved=0;
            //console.log(single.mto.projectmto['id']);
            IssuedMTOData.map((ritem,i)=>{
              console.table(ritem)
              if(ritem.Issued_item['id']==single.itemname['id'] && (ritem.color == single.color))
              {
                
               return(
                reserved=ritem.quantity
               ) 
              }
            })

            let mtoitemid=single.id;
                    return(
                    <>
                    <tr key={i}>
                        <td>
                         <button className='btn btn-danger btn-sm' onClick={()=> toggleShown(single.itemname['id'])}>{i+1} <i class="fa-solid fa-caret-down"></i></button></td>
                            
                            <td>{single.itemname['itemcode']}</td>
                            <td>{single.itemname['name']}</td>
                           <td>{single.remarks}</td>

                            <td>{single.itemname['length']}</td>
                            
                            <td>{parseInt(single.quantity) + parseInt(single.extra_quantity)}</td>
                        
                           
                            {
                                qty.map((q,ii)=>{
                                    if ( q.item==single.itemname['id']) {
                                        if(!((single.itemname['id']==262) || (single.itemname['id']==263) || (single.itemname['id']==264))){
                                        return (
                                            <>
                                            <td>{reserved}</td>
                                          <td key={i}>{q.quantity}</td>
                                          
                                          <td >

                                          {
                                            single.assigned ==='1'?
                                              null
                                            :

                                              parseInt(parseInt(single.quantity) + parseInt(single.extra_quantity)) <= parseInt(q.quantity) ?  
                                              <button className='btn btn-success'  onClick={(e)=>IssueItem(e,single.remarks,single.color,mtoitemid,parseInt(single.quantity) + parseInt(single.extra_quantity),parseInt(single.quantity),single.itemname['id'],single.mto['projectmto'].id,parseInt(single.quantity) + parseInt(single.extra_quantity))} disabled={disabled} >Reserve Stock</button>
                                              :
                                              q.quantity > 0 ?
                                                    <span className='form-inline input-group'>
                                                    <button className='btn btn-success button-height' onClick={(e)=>IssueItem(e,single.remarks,single.color,mtoitemid,q.quantity,parseInt(single.quantity),single.itemname['id'],single.mto['projectmto'].id,parseInt(single.quantity) + parseInt(single.extra_quantity))} disabled={disabled} >Reserve Available Stock</button>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                             
                                                   </span>
                                                   :null

                                        
                                          } 
                                          <br></br>
                                          {
                                          parseInt(parseInt(single.quantity) + parseInt(single.extra_quantity) <= parseInt(q.quantity))?
                                          null
                                          :
                                          (single.cart ==='0' && single.assigned==='0' && ((parseInt(single.quantity) + parseInt(single.extra_quantity)) > parseInt(q.quantity)))?
                                          <form onSubmit={SubmitAddtoCart}>
                                          <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">

                                          <span className='form-inline input-group text-width'> 
                                            <Form.Control  className='resizedTextbox' type="number" placeholder=""  name='required_quantity' defaultValue={((parseInt(single.quantity) + parseInt(single.extra_quantity))-q.quantity)} required />
                                            <Form.Control type="hidden" placeholder=""  name='item_id' value={single.itemname['id']} required />   
                                            <Form.Control type="hidden" placeholder=""  name='supplier_id' value={single.itemname['Supplier']['id']} required />  
                                            <Form.Control type="hidden" placeholder=""  name='mto_item_id' value={mtoitemid} required />                                              
                                          <button className='btn btn-success'>Add to Basket</button>
                                          </span>
                                          </Form.Group>
                                          </form>
                                          :

                                            (single.cart ==='0' && single.assigned==='1' && ((parseInt(single.quantity) + parseInt(single.extra_quantity)) > parseInt(q.quantity)))?
                                          
                                            <form onSubmit={SubmitAddtoCart}>
                                            <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">

                                            <span className='form-inline input-group text-width'> 
                                              <Form.Control  className='resizedTextbox' type="number" placeholder=""  name='required_quantity' defaultValue={((parseInt(single.quantity) + parseInt(single.extra_quantity))-q.quantity)} required />
                                              <Form.Control type="hidden" placeholder=""  name='item_id' value={single.itemname['id']} required />   
                                              <Form.Control type="hidden" placeholder=""  name='supplier_id' value={single.itemname['Supplier']['id']} required />  
                                              <Form.Control type="hidden" placeholder=""  name='mto_item_id' value={mtoitemid} required />                                              
                                            <button className='btn btn-success'>Add to Basket</button>
                                            </span>
                                            </Form.Group>
                                            </form>
                                           
                                              :
                                              null

                                            
                                          }

                                     
                                            </td>

                                            
                                            </>
                                        )
                                        }
                                        else{
                                          return(
                                            <>
                                                                                        <td>{reserved}</td>
                                            <td key={i}>{q.quantity}</td>

                                              {
                                           
                                                productionstock.map((pstock,sr)=>{
                                                  let production_stock=0;
                                                  if(single.itemname['id']==pstock.Pitem['id']){
                                                    production_stock=pstock.quantity
                                                  
                                                  return(
                                                    <> 
                                                    <td> <span className='btn btn-danger btn-sm'>PS-{pstock.quantity}</span> &nbsp;
                                                    <button  className='btn btn-danger btn-sm'  onClick={(e)=>IssueItemProduction(e,single.remarks,single.color,mtoitemid,parseInt(single.quantity) + parseInt(single.extra_quantity),single.itemname['id'],single.mto['projectmto'].id)}  disabled={disabled}  >Use Production Stock</button>&nbsp;
                                                    <button  className='btn btn-success'  onClick={(e)=>IssueItemBar(e,single.remarks,single.color,mtoitemid,1,single.itemname['id'],single.mto['projectmto'].id)}  disabled={disabled}  >Reserve 1 bar</button>
                                                    
                                                    </td>
                                                    </>
                                                  )
                                                  }
                                                })
                                                
                                              }
                                            
                                            </>
                                          )
                                        }
                                    }
                          
                                })
                                }
                                
                            </tr>
                           
                            {visible.includes(single.itemname['id']) && (
                            
                                    issue.map((issues,sr)=>{
                                        console.log('test')
                                    
                                        if(issues.Issued_item['id']==single.itemname['id'] && issues.balance > 0){

                                        return(
                                            
                                            <tr key={sr} className="additional-info row-background-issue">                                             
                                            <td className='white-text-issue'>{issues.project['refrence_no']}</td>
                                            <td  className='white-text-issue' colSpan={3}>{issues.project['name']}</td>
                                            <td  className='white-text-issue'>{issues.quantity}</td>
                                            <td  className='white-text-issue'>{issues.balance}</td>
                                            <td >
                                            {(issues.project['id'] == single.mto.projectmto['id'] || (issues.balance <= 0) )?
                                              null
                                              :
                                              <Form onSubmit={handleIssuing}>                                
                                              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                                              <span className='form-inline input-group'> 
                                                
                                                  <Form.Control type="number" className='resizedTextbox' placeholder=""  name='assign'  required />
                                                  <Form.Control type="text" className='resizedTextbox' placeholder="Color for Powder Coating or Anodized"  name='color_b'  required />

                                                  <Form.Control type="hidden" placeholder=""  name='stock_issue_id' value={issues.id} required />
                                                  <Form.Control type="hidden" placeholder=""  name='old_project_id' value={issues.project['id']} required />
                                                  <Form.Control type="hidden" placeholder=""  name='item_id' value={single.itemname['id']} required />
                                                  <Form.Control type="hidden" placeholder=""  name='issued' value={issues.quantity} required />
                                                  <Form.Control type="hidden" placeholder=""  name='issue_id' value={issues.id} required />
                                                  <Form.Control type="hidden" placeholder=""  name='balance' value={issues.balance} required />
                                                  <Form.Control type="hidden" placeholder=""  name='color' value={issues.color} required />
                                                  
                                                  <button type="submit" className='btn btn-danger btn-sm'><i class="fa-solid fa-upload"></i> Assign</button>
                                                 </span>
                                                  </Form.Group>
                                                  </Form>
                                          }
                                           
                                            </td>

                                           
                                        </tr>

                                        )

                                        }
                                    })

                                
                                   

                            )}
                         
                            </>
                    )
                })
                
                //.then(galleries => {
                   // dispatch({ type: FETCH_GALLERIES_SUCCESS, payload: galleries });
                  // console.log(galleries);
                //})
        }
      
      </tbody>
      <button type="submit" className='btn btn-danger btn-sm mt-5' disabled>Reserve All and Fill Basket </button>
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
export default SubmittedMTODetail
