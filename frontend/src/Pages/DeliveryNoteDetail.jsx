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


function DeliveryNoteDetail(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[stock,setStock]=useState([]);
    const [error,setError]=useState([]);
    const [loading,setLoading]=useState(true);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[unit,setUnit]=useState([]);
    const MTOid=location.state.MTOid;
    
    let total_weight=0;
    let total_sqm=0;
    let total_set=0;
    const[dndata,setDNData]=useState([]);
    const [pdffile, setPdffile] = useState("");
    const [orders, setorders]=useState([]);

// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   const status=sessionStorage.getItem('code');
   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });
    
    

    useEffect(()=>{

      getCountries()
      axios.get(AppURL.SingleDN(MTOid)).then(response=>{
        setDNData(response.data);
        axios.get(AppURL.ItemByDN(MTOid)).then(response=>{
            setItem(response.data);
            axios.get(AppURL.UnitOfMeasure).then(response=>{
                setUnit(response.data);
                //setLoading(false);
                axios.get(AppURL.OrderListLimit).then(response=>{
                  setorders(response.data);
                  setLoading(false);
              })
            })
           
            })
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



  function handleQuotationItem(e){
    e.preventDefault();
    const data={
      title:e.target.title.value,
      QuotationorderNo:e.target.order.value,
      quotationuom:e.target.unit.value,
      quantity:e.target.qty.value,
      amount:e.target.amount.value,
      vat:e.target.vat.value,
      Quotationdno:e.target.dnid.value,
      projectorderquotation:e.target.project.value,
      weight:e.target.weight.value,
    }
    
    axios.post(AppURL.CreatOrderQItem,data,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}).then(response =>{  
      if(response.status===201){
           cogoToast.success("Item Added Successfully...",{position:'top-right'});
           e.target.reset();
  
      }
  })
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
    axios.patch(AppURL.UpdateDNNote,data,{ 
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


  

const IssueForPowderCoating=(e)=>{
  e.preventDefault();
//quantityforpc
//alert("here to submit")
if(!parseInt(e.target.quantity.value)){
  cogoToast.error("Please Enter Quantity",{position:'top-right'});
}

else if(e.target.color.value ===''){
   cogoToast.error("Color is required...",{position:'top-right'});
}

else{
  const issue_stock={
    quantity:e.target.quantity.value,
    balance:0,
    Issued_item:e.target.item.value,
    project:dndata.dnproject['id'],
    status:1,
    assigned:1,
    issuingmto:1,
    color:e.target.color.value,
    remark:e.target.remark.value,
  
  }

  axios.post(AppURL.IssueStock,issue_stock,{ 
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}).then(response =>{  
     if(response.status===201){
      console.log(response);
      console.log(response.data.id);
         cogoToast.success("Item has been Reserved",{position:'top-right'});

         const data={
              dno:MTOid,
              dnitem:e.target.item.value,
              quantity:e.target.quantity.value,
              custom:1,
              length:e.target.length.value,
              quantity:e.target.quantity.value,
              Issued_item_PC:response.data.id,
              projectPC:dndata.dnproject['id'],
              description:"NA",
              status:1,
              priority:1,
              pcissuedmto:1,
              color:e.target.color.value,
              remark:e.target.remark.value,
        }
      

      axios.post(AppURL.AddDNITEM,data,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response=>{  
            
          cogoToast.success("Item Added for Delivery Note",{position:'top-right'});
          //new data will be reloaded
          forceUpdate();
        })
        //forceUpdate();
    }
    })
}


}


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


    const DeleteCustomDNItem=(e,mtoitemid,IssueID)=>{
      e.preventDefault();
      const thisClicked=e.currentTarget;
      thisClicked.innerText="Removing";
      axios.delete(AppURL.DNItemCustomDelete(mtoitemid,IssueID)).then(response=>{
          //alert(response.data.message);
          thisClicked.closest("tr").remove();
          cogoToast.success("Item Deleted Successfully",{position:'top-right'});
                  
          })
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
        <Col sm={12}>
          <Tab.Content>
          
            <Tab.Pane eventKey="second">
            <div className='col d-print-none'>
        {status=='SA'?
            null
          :

          <Form onSubmit={IssueForPowderCoating}>
          <div className='row col-md-12'>
          <div className='col-md-8'>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Select Item (only for OffCut and Buffing)</Form.Label>
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
                <Form.Label>Details</Form.Label>
                <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Quantity" name='quantity'  />                
                  <Form.Control type="text" placeholder="Length" name='length'  />     
                  <Form.Control type="text" placeholder="Color" name='color' />
                  <Form.Control type="text" placeholder="Remarks" name='remark' defaultValue={'NA'}  />
                  <Button variant="primary" type="submit">+</Button>           
                </span>    
                </Form.Group>

                  </div>

              </div>
           </Form>
        }
          
         
            </div>
            <div className='row col-sm-12'>
             
            <div className='col-sm-5'>
            
            <img src="https://slimwindows.ae/wp-content/uploads/2021/09/Next-Level-Group-horisontal.jpg" alt="Admin" className="rounded-circle" width="265" />
                    
          </div>
                <div className='col-sm-7 delivery-note-fs'>
                <Table bordered size="sm" className=' dntable-border'>
            
                <tbody>
                <tr>
                <td>Job No</td>
                <td>J-{dndata.dnproject['refrence_no']}</td>
            
                </tr>
                <tr>
                <td>Project Name</td>
                <td>{dndata.dnproject['name']}</td>
            
                </tr>
                <tr>
                <td>Date</td>
                <td> {dndata.created_at}</td>
            
                </tr>
            
                <tr>
                <td>DN#</td>
                <td>DN-{dndata.id}</td>
        
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
         
          <th>Width</th>
          <th>Length</th>
          <th>Weight</th>
          <th>UOM</th>
          <th>QTY</th>
          <th>PC Color</th>
          <th>Remarks</th>
    
        </tr>
      </thead>
      <tbody>
      {
     
     item.map((single,i)=>{
      //console.log(single.dnitem['weight']);
      let item_length=0;
      // || !(single.dnitem['id']==262) || !(single.dnitem['id']==263) || !(single.dnitem['id']==264)
        if((single.dnitem['weight'])){
          //console.log(single.dnitem['id']);
            if(single.custom=='1'){
              //console.log(single.dnitem['weight']);
              if((single.dnitem['id']==262) || (single.dnitem['id']==263) || (single.dnitem['id']==264)){
                total_weight=total_weight+0;
              }
              else{
              total_weight=(parseFloat(total_weight)+((parseFloat(single.dnitem['weight'])*parseInt(single.quantity))*single.length)/1000)
              }
              //console.log(total_weight);

              //console.log('if');
            } 
            else{
              total_weight=(parseFloat(total_weight)+((parseFloat(single.dnitem['weight'])*parseInt(single.quantity))*single.dnitem['length'])/1000)
              //console.log(total_weight);
              //console.log('else');
            }
                
           // total_weight=(parseFloat(total_weight)+parseFloat(single.dnitem['weight'])*parseInt(single.quantity));
          
        }

        if(!((single.dnitem['length']=='NA') && (single.dnitem['width']=='NA') )){
          
            total_sqm=(((parseFloat(single.dnitem['length'])*parseFloat(single.dnitem['width']))/1000)*parseInt(single.quantity)+total_sqm);          
           }

           if(((single.dnitem['length']=='NA') && (single.dnitem['width']=='NA') && (!single.dnitem['weight'])) || (single.dnitem['id']==262) || (single.dnitem['id']==263) || (single.dnitem['id']==264) ){
            if(single.dnitem['type']=='4'){

            }
            else{
            total_set=parseInt(total_set)+parseInt(single.quantity);
            }
           }
        }
         )
        
       }
        {

    item.map((single,i)=>{
      let avqty=0;
      let length=0
      console.log(item)
         // stock.map((SStock,si)=>{
           // if(SStock.item===single.itemname['id']){
            //avqty=SStock.quantity;
            //}
          //})
                  
                    return(
                            <tr key={i}>

                            <td>{i+1}
                            </td>
                            <td>{
                                 single.dnitem['weight']=='NA'?
                                    single.dnitem['itemcode']
                                 :
                                    (!single.dnitem['weight']) || ((single.dnitem['id']==262) || (single.dnitem['id']==263) || (single.dnitem['id']==264))?
                                      
                                      single.dnitem['itemcode']+"-"+single.dnitem['name']
                                    :
                                    single.dnitem['itemcode']+" ("+single.dnitem['weight'] +" KG/MTR)"
                                
                                }</td>

                              <td>{
                                     (single.dnitem['width']=='NA')?
                                     null
                                   :
                                     single.dnitem['width']
                                     
                                     }</td>
                              <td>{
                              (single.dnitem['length']=='NA')?
                                null
                              :
                                (single.custom=='1')?

                                  length=single.length
                                :
                                  length=single.dnitem['length']
                                }
                              
                                </td>
                              <td>{
                                     (!single.dnitem['weight'])?
                                     null
                                   :
                                   (!((single.dnitem['id']==262) || (single.dnitem['id']==263) || (single.dnitem['id']==264)))?

                                     ((single.dnitem['weight']*single.quantity)*(length/1000)).toFixed(2)
                                    :
                                    null
                                     
                                     }
                                </td>
                              
                              {
                                          
                                    unit.map((un,index)=>{
                                   
                                        if(single.dnitem['unit'] == un.id){
                                          if(((single.dnitem['id']==262) || (single.dnitem['id']==263) || (single.dnitem['id']==264))){
                                            return(
                                            <td>NOS </td>
                                            )
                                          }else{
                                            return(
                                                <td>  {un.name} </td>
                                            )
                                            }
                                        }
                                    })
                                }
                            
                              <td>{single.quantity}</td>
                              <td>{single.color}</td>
                              
                            <td>{
                                     (single.remark=='NA')?
                                     null
                                   :
                                     single.remark
                                     
                                     }</td>

                                  
                              {
                              (single.revision==='1')?
                              <td className='d-print-none'>
                                {
                                  status=='SA'?
                                    null
                                  :<button onClick={(e)=>DeleteDNItem(e,single.id)}> <i className='fa-solid fa-trash'></i></button>
                                }
                                
                                </td>
                              :
                                null
                                
                                }


                          {
                              (single.custom==='1')?
                              <td className='d-print-none'>
                                  {
                                  status=='SA'?
                                    null
                                    :
                                    <button onClick={(e)=>DeleteCustomDNItem(e,single.id,single.Issued_item_PC['id'])}> <i className='fa-solid fa-trash'></i></button>
                                  }
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
                        <td>{
                          (total_sqm.toFixed(2)=='NaN')?
                           null
                          :
                          total_sqm.toFixed(2)
                        }</td>
                        <td>{
                        
                        
                        (total_set==0)?
                        null
                       :
                       total_set
                      
                      }</td>
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

{ status=='SA'?
  null
  :
  <>
    <div className='col-md-12 row'>
    <div className='col-md-7'>
    <Form onSubmit={handleNote}>                                                             
            <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
              <Form.Label >Note :</Form.Label>
                <span className='form-inline input-group'>  
                 <Form.Control type="text" placeholder="Description" name='desc' defaultValue={dndata.note}/>&nbsp;&nbsp;
                 <Form.Control className='d-print-none' type="text" placeholder="Description" name='description' defaultValue={dndata.description}/> &nbsp;<span className='d-print-none'>(For internal purpose only)</span>
                 <Form.Control type='hidden' value={MTOid} name='dnid'></Form.Control>        
                    </span>
                  </Form.Group>
                  <button type="submit" className='btn btn-success btn-sm d-print-none'><i class="fa-solid fa-upload"></i> Update</button>
      </Form>
      </div>
      <div className='col-md-1 mt-4'></div>
      <div className='col-md-4 mt-4'>

      
      </div></div>


      <div className='col-md-12 row mb-2 d-print-none'>
    <div className='col-md-12'>
    <Form onSubmit={handleQuotationItem}>                                                             
            <Form.Group className="mb-3 form-inline mt-5" controlId="formBasicEmail">
              <Form.Label >Purchase Request :</Form.Label>
                <span className='form-inline input-group'>  
                 <Form.Control type="text" placeholder="Title" name='title' required/>&nbsp;&nbsp;
                 
                 <select class="form-select" aria-label="Default select example"  name="order" required>
                           {orders.map((guest, index) => {
                                                   // totalCartPrice += item.unit_price*item.quantity;
                                  return(         
                                                       
                                          <option key={index} value={guest.id}  >{guest.description}</option>
                                                   
                                         )}
                                         )
                                         }
                           
                 </select>     
                 &nbsp;&nbsp;
                 <select class="form-select" aria-label="Default select example"  name="unit">
                           {unit.map((guest, index) => {
                                                   // totalCartPrice += item.unit_price*item.quantity;
                                  return(         
                                                       
                                          <option key={index} value={guest.id}  >{guest.name}</option>
                                                   
                                         )}
                                         )
                                         }
                           
                 </select>     
                 &nbsp;&nbsp;
                 <Form.Control type="text" placeholder="Weight" name='weight' required/>&nbsp;&nbsp;
                 <Form.Control type="text" placeholder="QTY" name='qty' required/>&nbsp;&nbsp;
                 <Form.Control type="text" placeholder="Amount" name='amount' required/>&nbsp;&nbsp;
                 <Form.Control type="text" placeholder="Vat" name='vat' required/>&nbsp;&nbsp;
                 
                 <Form.Control type='hidden' value={dndata.dnproject['id']} name='project'></Form.Control>
                 <Form.Control type='hidden' value={dndata.id} name='dnid'></Form.Control>        
                    </span>
                  </Form.Group>
                  <button type="submit" className='btn btn-success btn-sm d-print-none'><i class="fa-solid fa-upload"></i> Add to Purchase Request</button>
      </Form>
      </div>
     </div>
     </>
}
      </div>
      </>

    )
}
export default DeliveryNoteDetail
