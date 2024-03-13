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


function MTOForPIDetails(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[stock,setStock]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const POId=location.state.POID;
    const status=sessionStorage.getItem('code');

    const [po, setPO]=useState([]);
    const [unit, setUnit]=useState([]);
    const [color,setColor]=useState([]);
    const [type,setType]=useState([]);
    const [loading,setLoading]=useState(true);
// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

let total_price=0;
let total_tax=0;
let currency='';

    useEffect(()=>{
      
      getCountries();

        axios.get(AppURL.POITEMByPO(POId)).then(response=>{
        setItem(response.data);
        //alert(item.is_both);
        })
        axios.get(AppURL.GetFinishing).then(response=>{
            setColor(response.data);
            //alert(item.is_both);
            })

            axios.get(AppURL.GetItemType).then(response=>{
                setType(response.data);
                //alert(item.is_both);
                })
        
        axios.get(AppURL.UnitOfMeasure).then(response=>{
          setUnit(response.data);
          //alert(item.is_both);
          })
     
        
        console.log(item);
        axios.get(AppURL.SinglePO(POId)).then(response=>{
          setPO(response.data);
          
          setLoading(false);
          })
     // console.log(po)
    },[ignored]);
    //.log(type)
  const [region, setRegion] = useState("");
  
  const getCountries = async()=>{
    try{
        const response= await axios.get(AppURL.StockList)
        setCountries(response.data);

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
const handleupdate=(e)=>{
    e.preventDefault()
  
    const data={
        quantity:e.target.quantity.value,
        remarks:e.target.remarks.value,
        item_id:e.target.po_item.value
      }
      axios.patch(AppURL.UpdateItemPI,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response =>{  
        if(response.status===202){
             cogoToast.success("Item Updated Successfully...",{position:'top-right'});
                forceUpdate();
             }
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
 currency=po.currency['symbol'];
 if(status=='AC'){
  return(
    <>
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
                <p>{po.projectpo['refrence_no']} - {po.projectpo['name']}</p>
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
     <th>Length</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Tax</th>
      <th>Amount</th>

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
  total_price=total_price+(single.price*single.quantity)  
  let single_vat=0
  if(single.vat >0){
    single_vat=((single.price/100)*single.quantity)*single.vat
    total_tax=total_tax+single_vat
  }
            return(

                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{single.po_item['itemcode']}</td>
                    <td>{single.po_item['name']}</td>
                      <td>{single.po_item['length']}</td>
                      <td>{single.quantity}</td> 
                      <td>{single.price}</td> 
                      <td>{single.vat}%</td>                     
                      <td>{new Intl.NumberFormat().format(single.price*single.quantity)}</td>
          
                 
                   
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
    <td>{ new Intl.NumberFormat().format(total_price) }</td>

    </tr>

    <tr>
    <td><>Total VAT 5%</></td>
    <td>
    { new Intl.NumberFormat().format(total_tax) }
    </td>    
    </tr>


    <tr>
    <td>Total <b> {currency}</b></td>
    
    
   <td>{ new Intl.NumberFormat().format(total_price+total_tax) }</td>
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

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
         
            <Nav.Item>
              <Nav.Link eventKey="second">Add PO Item</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
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


    else if(status=='PI'){

        return(
            <>
             <NavMenu className='d-print-none'></NavMenu>
             
                 <div className='container-fluid'>
    
                  <Tab.Container id="left-tabs-example" defaultActiveKey="second">
                  <Row>
                    <Col sm={12}>
                      <Tab.Content>
                      
                        <Tab.Pane eventKey="second">
              <div className='row col-sm-12'>
            
                     <div className='col-sm-6 delivery-note-fs'>
                     
                      <h3>Material List</h3>
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
                        <p>{po.projectpo['refrence_no']} - {po.projectpo['name']}</p>
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
             <th>Color</th>
             <th>Type</th>
             <th>Length</th>
             <th>UOM</th>
            
            <th>Quantity</th>
            <th>Remarks</th>
      
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
          total_price=total_price+(single.price*single.quantity)  
          let single_vat=0
          if(single.vat >0){
            single_vat=((single.price/100)*single.quantity)*single.vat
            total_tax=total_tax+single_vat
          }
                    return(
    
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td>{single.po_item['itemcode']}</td>
                            <td>{single.po_item['name']}</td>
                            {
                            type.map((itype,i)=>{
                                if(itype.id===single.po_item['type']){
                                    return(
                                        <td>{itype.name}</td>
                                    )
                                }
                        
                            })
                        }
                        

                        {
                            color.map((fcolor,i)=>{
                               if(fcolor.id===single.po_item['finishing']){
                                    return(
                                        <td>{fcolor.name}</td>
                                    )
                                }
                        
                            })
                        }
                        
                              <td>{single.po_item['length']}</td>
                              <td>{
                                    unit.map((units,i)=>{
                                      if(units.id===single.po_item['unit']){
                                     // avqty=SStock.quantity;
                                      return (units.name)
                                      }
                                  
                                      
                                    })
                              }</td>
                      
                       <td> {single.quantity} </td>
                       <td> {single.remarks} </td>
                         
                           
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
    
    
            </div>
        
            {(po.local =='1' && po.accounts_submital =='0')?
                
                  <> &nbsp;&nbsp;&nbsp;<button  onClick={(e)=> ApprovalSubmital(e,po.id)} className='btn btn-success'>Submit For Approval</button> </>
              :
               null
              
              }
    
          {(po.local =='1' && po.accounts_submital =='1' && po.accounts_approval =='0')?
                
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
    else{
      return(
        <>
         <NavMenu className='d-print-none'></NavMenu>
         
             <div className='container-fluid'>

              <Tab.Container id="left-tabs-example" defaultActiveKey="second">
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                  
                    <Tab.Pane eventKey="second">
          <div className='row col-sm-12'>
        
                 <div className='col-sm-6 delivery-note-fs'>
                 
                  <h3>Material List</h3>
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
                    <p>{po.projectpo['refrence_no']} - {po.projectpo['name']}</p>
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
         <th>Type</th>
         <th>Finishing</th>
         <th>Length</th>
         <th>UOM</th>
        
  <th>Quantity and Remarks</th>
  
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
      total_price=total_price+(single.price*single.quantity)  
      let single_vat=0
      if(single.vat >0){
        single_vat=((single.price/100)*single.quantity)*single.vat
        total_tax=total_tax+single_vat
      }
                return(

                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{single.po_item['itemcode']}</td>
                        <td>{single.po_item['name']}</td>
                        {
                            type.map((itype,i)=>{
                                if(itype.id===single.po_item['type']){
                                    return(
                                        <td>{itype.name}</td>
                                    )
                                }
                        
                            })
                        }
                        

                        {
                            color.map((fcolor,i)=>{
                               if(fcolor.id===single.po_item['finishing']){
                                    return(
                                        <td>{fcolor.name}</td>
                                    )
                                }
                        
                            })
                        }
                        
                          
                          <td>{single.po_item['length']}</td>
                          <td>{
                                unit.map((units,i)=>{
                                  if(units.id===single.po_item['unit']){
                                 // avqty=SStock.quantity;
                                  return (units.name)
                                  }
                              
                                  
                                })
                          }</td>
                  
                   <td>
                   <Form onSubmit={handleupdate} className=''>
            <div className='row col-md-12'>
       
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
            
                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Quantity" required name='quantity' defaultValue={single.quantity} />            
                  <Form.Control type="text" placeholder="Remarks" name='remarks' defaultValue={single.remarks} />
                  <Form.Control type="hidden" name='po_item' defaultValue={single.id} />
                  <Button variant="primary" type="submit"><i className="fa-solid fa-upload"></i> Update</Button>

              
                  
                    </span>    

                    </Form.Group>

                    </div>

                </div>
             </Form>

                   </td>
                     
                       
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


        </div>
    <br></br>
        {(po.pi_approval =='0')?
            
              <> &nbsp;&nbsp;&nbsp;<button  disabled onClick={(e)=> ApprovalSubmital(e,po.id)} className='btn btn-success'>Confirm changes and Submit</button> </>
          :
           <>Confirmed</>
          
          }

        </>

        
      )
    }
}
export default MTOForPIDetails
