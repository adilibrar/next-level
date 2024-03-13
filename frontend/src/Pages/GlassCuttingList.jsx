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


function GlassCuttingList(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[stock,setStock]=useState([]);
    const[glassitem,setglassitem]=useState([]);
    const [error,setError]=useState([]);
    const [dn, setdn]=useState([]);
    const [loading,setLoading]=useState(true);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[unit,setUnit]=useState([]);
    const [type, setType] = useState('text');
    const MTOid=location.state.id;

    let quantity=0;
    let total_area=0;
 
    let ponum=0
    const[purchaseorder,setpurchaseorder]=useState([]);
    const [glassdata, setglassdata] = useState("");
    const [gp, setgp] = useState("");
    const [GlassType, setGlassType]=useState([]);
    const [CuttingList, setCuttingList]=useState([]);
    const [CuttingGlassData, setCuttingGlassData]=useState([]);
    const [GlassList, setGlassList]=useState([]);
    const [ProcessorList, setProcessorList]=useState([]);
    const [unique, setunique]=useState([]);
    const [insertunique, setinsertunique]=useState([]);
    const [uniquedetail, setuniquedetail]=useState([]);
    const [SuplierGlassType, setSuplierGlassType]=useState([]);
    const [GlassBooking, setGlassBooking]=useState([]);
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   const status=sessionStorage.getItem('code');
   const[accounts,setaccounts]=useState([]);
   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });
    
    

    const handleSubmitRecieve =(e)=>{
        e.preventDefault();
        if(e.target.recieved.value==''){
          cogoToast.error("Quantity is required...")
        }
        else{
        
        const data={
          id:e.target.po_item_id.value,
          recieved:e.target.recieved.value,
        //   item_id:e.target.item_id.value,
        //   supplierpo:e.target.supdeliverynote.value,
        }
        
        // DNINFromsupplierNoGlass=models.ForeignKey(DeliveryNoteFromSupplier,on_delete=models.CASCADE,related_name='DNINFromsupplierNoGlass',default='1')
        // quantity=models.CharField(max_length=100)
        // SupplierglassType=models.ForeignKey(
        //     TentativeGlassFinalItem, on_delete=models.CASCADE, related_name='SupplierglassType')
        // glassPurchaseOrder=models.ForeignKey(
        //      PurchaseOrder, on_delete=models.CASCADE, related_name='glassPurchaseOrder')
        // created_at = models.DateField(auto_now_add=True)

        const dn_data={
            DNINFromsupplierNoGlass:e.target.supdeliverynote.value,
            SupplierglassType:e.target.po_item_id.value,
            quantity:e.target.recieved.value,

            glassCuttingsupplier:e.target.cuttingid.value,
        }
        // const dn_data={
        //   orderitemid:e.target.po_item_id.value,
        //   quantity:e.target.quantity.value,
        //   recievedItem:e.target.item_id.value,
        //   DNINFromsupplierNo:e.target.supdeliverynote.value,
        // }
      
      
      
        axios.post(AppURL.GlasssPOItemRecieve,data
          ,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },
        }).then(response=>{
        //alert(response.status);
          if(response.status == '200'){
            cogoToast.loading("Please wait...",{position:'top-right'});
            axios.post(AppURL.GlassDNINSupplier,dn_data
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

    useEffect(()=>{

        axios.get(AppURL.GetCuttingGlassData(MTOid)).then(response=>{
            setCuttingGlassData(response.data);
        
            axios.get(AppURL.GetGlassTypeList).then(response=>{
            setGlassType(response.data);
            
            axios.get(AppURL.GetCuttingGlassList(MTOid)).then(response=>{
                setCuttingList(response.data);
                //console.log(response.data)
                axios.get(AppURL.GetCuttingGlassListPO(MTOid)).then(uresponse=>{
                    setunique([...new Set(uresponse.data.map(item => item.FinalTentaiveGlassType))])

                    axios.get(AppURL.GetCuttingGlassListPOInsert(MTOid)).then(uinsertresponse=>{  

                        setinsertunique([...new Set(uinsertresponse.data.map(item => item.FinalTentaiveGlassType))])
                axios.get(AppURL.POListDepthNoLimit).then(response=>{
                    setpurchaseorder(response.data);
                    
                    axios.get(AppURL.AccountsHead).then(response=>{
                        setaccounts(response.data);
                        axios.get(AppURL.SupplierDNINList).then(response=>{
                            setdn(response.data);
                            //alert(item.is_both);
                            setLoading(false)
                            })
                        
                        })
                    }) 
                })
            })
  
            })
            })
            
        })
 
        
    },[ignored]);


function SubmitTentativeGlass(e){
    e.preventDefault()
    axios.get(AppURL.SubmitCuttingGlass(MTOid)).then(response=>{
        //setglassdata(response.data);
        if(response.status===200){
            cogoToast.success("Submitted Successfully...",{position:'top-right'});
            //navigate('/project-details');
            forceUpdate();
        }
    })
}


function DeleteGlass(e,id){
    e.preventDefault()
    axios.get(AppURL.DeleteCuttingGlass(id)).then(response=>{
        //setglassdata(response.data);
        if(response.status===200){
            cogoToast.success("Deleted Successfully...",{position:'top-right'});
            //navigate('/project-details');
            forceUpdate();
        }
    })
}

function SaveGlassCuttingSize(e){
    e.preventDefault()
    const data={
        GlassCuttingID:MTOid,
        system:e.target.System.value,
        location:e.target.Location.value,
        GlassRef:e.target.Refrence.value,
        FinalTentaiveGlassType:e.target.gtype.value,
        opwidth:e.target.opwidth.value,
        opheight:e.target.opheight.value,
        ipwidth:e.target.ipwidth.value,
        ipheight:e.target.ipheight.value,
        quantity:e.target.qty.value,
        uinsert:e.target.uinsert.value,
        WindowRef:e.target.wref.value,  
        remarks:e.target.remarks.value,  
  }
  
        axios.post(AppURL.SaveCuttingGlass,data,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response=>{  
            console.log(response)
            console.log(response.status)
            if(response.status=='201'){
               // e.reset();
               e.target.reset()
                cogoToast.success("Added Successfully...",{position:'top-right'});

                forceUpdate();             
            }
            else{
                cogoToast.error("Something Went Wrong...",{position:'top-right'});
            }
          
          //new data will be reloaded
          
        })
        //forceUpdate();
    
}



  

const AddToPurcahseOrder=(e)=>{
  e.preventDefault();
  //alert("Ready")

    const data={
        project:CuttingGlassData.TentaiveGlassCuttingProject['id'],
        glasscutting:MTOid,
        glass_id:e.target.glassid.value,
        po:e.target.purchaseorder.value,
        price:e.target.price.value,
        remarks:e.target.remarks.value,
        account:e.target.account.value,
        uchannel:e.target.uchannel.value
  }

        axios.post(AppURL.AddPurchaseOrderGlassItem,data,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response=>{  
            
          cogoToast.success("Updated Successfully...",{position:'top-right'});
          //new data will be reloaded
          forceUpdate();
        })
    
        console.log(data)


}


    if(loading){
        return <h4>Loading .....</h4>
   } 

   return(
        <>
                <NavMenu></NavMenu>

        { CuttingGlassData.status=='1'?
                <Form onSubmit={SaveGlassCuttingSize} >
          <div className='row col-md-12 p-2'>

              
              <div className='col-md-12'>
              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                <Form.Label>Add Glass Cutting List</Form.Label>
                <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="System" name='System'  />                
                  <Form.Control type="text" placeholder="Location" name='Location'  />     
                  <Form.Control type="text" placeholder="Glass Refrence" name='Refrence' />
              
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='gtype'>
                      <option selected disabled>Glass Type</option>                   
                                {
                                      GlassType.map((parameter,i)=>{
                                       
                                          return(
                                           
                                                    <option value={parameter.id}>{parameter.title}</option>
                                       
                                          )
                                        
                                      })
                                    }

                    </select>
                  <Form.Control type="text" placeholder="OP Width" name='opwidth'  />  
                  <Form.Control type="text" placeholder="OP Height" name='opheight'  />  
                  <Form.Control type="text" placeholder="IP Width" defaultValue={0} name='ipwidth'  />  
                  <Form.Control type="text" placeholder="IP Height" defaultValue={0}  name='ipheight'  />  
                  <Form.Control type="text" placeholder="Qty" name='qty'  /> 
                  <Form.Control type="text" placeholder="U-Insert" name='uinsert'  />  
                 
                  <Form.Control type="text" placeholder="Window Ref" name='wref'  /> 
                   <Form.Control type="text" placeholder="Remarks" name='remarks' defaultValue={'NA'}  />  
                  <Button variant="primary" type="submit">+</Button>           
                </span>    
                </Form.Group>

                  </div>

              </div>
           </Form>
           :null
           }
               
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
            <></>
        
        }
          
         
            </div>
            <div className='row col-sm-12'>
             
            <div className='col-sm-5'>
            
            <img src="https://slimwindows.ae/wp-content/uploads/2021/09/Next-Level-Group-horisontal.jpg" alt="Admin" className="rounded-circle" width="265" />
                    
          </div>
                <div className='col-sm-7 delivery-note-fs'>
                <Table bordered size="sm" className=' dntable-border mt-2'>
            
                <tbody>
                <tr>
                <td>Project</td>
                <td>{CuttingGlassData.TentaiveGlassCuttingProject['refrence_no']} - {CuttingGlassData.TentaiveGlassCuttingProject['name']}
                </td>
                </tr>
                <tr>
                <td>Revision</td>
                <td>{CuttingGlassData.revision}
                </td>
                </tr>
                {

                CuttingGlassData.status=='2' && CuttingGlassData=='PI'?
                    <tr>
                    <td>Date</td>
                    <td>{CuttingGlassData.submitted_at}
                    </td>
                    </tr>
                :null
                }
         
              
               
                    </tbody>
                </Table>
                    </div>

                </div>
           {
            status=='PI'?
                
           
              <div className='row col-sm-12 mt-2'>
            <div className='col-sm-6'>
                <h4 className='text-center'><strong className='delivery-note-fs'>Tentative Glass</strong></h4>
                <h6 className='delivery-note-fs text-center'>Pioneer Metal Industries LLC   Tel: +971-4 8833221,&nbsp;&nbsp;&nbsp;Fax: +971 - 8833224&nbsp;&nbsp;&nbsp;Email: info@pioneer-mi.com</h6>
               </div>
                <div className='col-sm-5'>
             

                <Table bordered className='delivery-note-fs dntable-border'>
                            <thead>
                        
                            {
                            GlassList.map((single,i)=>{
                                //console.log(single)
                                return(
                                GlassType.map((glass,sr)=>{
                              
                                    if(single===glass.id){
                                       
                                        return(
                                           <tr>
                                            <th>{glass.title}</th>
                                            <td>{glass.description}</td>
                                           </tr> 
                                        )
                                        
                                    }})
                                )
                              
                            })
                        }
                    
               
                            </thead>
                        
                        </Table>
                    </div>

                </div>
                :
                
                <div className='row col-sm-12 mt-2'>
                <div className='col-sm-12'>
                    <h4 className='text-center'><strong className='delivery-note-fs'>Tentative Glass</strong></h4>
                    <h6 className='delivery-note-fs text-center'>Pioneer Metal Industries LLC   Tel: +971-4 8833221,&nbsp;&nbsp;&nbsp;Fax: +971 - 8833224&nbsp;&nbsp;&nbsp;Email: info@pioneer-mi.com</h6>
                   </div>
            
    
                    </div>


                    }
             <div className='mt-2'></div>
            {
            CuttingList.map((single,i)=>{
               quantity= parseInt(single.quantity)+parseInt(quantity)
               //total_area=parseInt(single.area)+parseInt(total_area)
               const op=(((single.opwidth/1000)*(single.opheight/1000))*single.quantity)
               const ip=(((single.ipwidth/1000)*(single.ipheight/1000))*single.quantity)
                total_area=total_area+Math.max(op,ip)
             })}

    <Table striped bordered hover size="sm" className='delivery-note-fs dntable-border'>
      <thead>
        <tr>
          <th>S.N</th>
          {
            status=='PI'?
                <th>Barcode</th> 
            :null
            }
          <th>Refrence</th>
         
          <th>Glass Type</th>
          <th>Glass refrence</th>
          <th>OP Width</th>
          <th>OP Height</th>
          <th>IP Width</th>
          <th>IP Height</th>
          {  status=='SI'?
         <>
          <th>Ordered Qty</th>
          <th>Recieved</th>
          <th>Balance</th>
          </>
            : <th>Qty</th>
                       }
          {
            status=='PI'?
                <th>Area</th> 
            :null
            }
          <th>System</th>
          <th>Uinsert</th>
          <th>Location</th>
          <th>Remarks</th>
          {
            status=='PI'?
            null
            :
            <th className='d-print-none'>Action</th>
          }
          
          
    
        </tr>
      </thead>
      <tbody>

        {

CuttingList.map((single,i)=>{

      let avqty=0;
      let length=0
                    return(
                        <>
                            <tr key={i}>

                            <td>{i+1}
                            </td>
                            {
                            status=='PI'?
                                <td>{single.barcode}</td>
                            :null
                             }
                            
                              <td>{single.WindowRef}</td>
                              <td>{
                              GlassType.map((glass,sr)=>{
                                if(single.FinalTentaiveGlassType==glass.id){
                                    return(
                                        glass.title
                                    )
                                }})
                         
                                }</td>
                                <td>{single.GlassRef}</td>
                                <td>{single.opwidth}</td>
                              <td>{single.opheight}</td>
                              <td>{single.ipwidth}</td>

                              <td>{single.ipheight}</td>
                       {  status=='SI'?
                       <>
                              <td>{single.quantity}</td>
                              <td>{single.recieved}</td>
                            <td>{single.quantity-single.recieved}</td>
                            </>
                            : <td>{single.quantity}</td>
                       }
                              {
                            status=='PI'?
                                <td>{single.area}</td>
                            :null
                             }
                              <td>{single.system}</td>
                              <td>{single.uinsert}</td>
                              <td>{single.location}</td>
                              <td>{single.remarks}</td>
                             <td>
                              {
                                    status=='PI'?
                                    null
                                    :status=='SI'?
                              
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
                                          {/* <Form.Control type="hidden" placeholder="Recieve Quantity" defaultValue={single.po_item['id']} name='item_id'  /> */}
                                          <Form.Control type="hidden" placeholder="Recieve Quantity" defaultValue={single.GlassCuttingID} name='cuttingid'  />
                                          <Form.Control type="text" placeholder="Recieve Quantity" name='recieved' required/>
                                          
                                  
                                          
                                          <Button  variant="primary" type="submit" >+</Button>
                                
                                            </span>    
    
                                            </Form.Group>
    
                                            </div>
    
                                        </div>
                                       </Form>
                                    :CuttingGlassData.status=='1'?
                                    
                                    <td  onClick={(e)=>DeleteGlass(e,single.id)}  className='d-print-none'><i className='fa fa-trash btn btn-danger'></i></td>
                                    :null
                                }
                                </td>
                              
                              {/* <td><button onClick={(e)=>DeleteGlass(e,single.id)} className='btn btn-success'><i className='fa fa-trash'> </i></button> </td> */}
                          </tr>
        
                          </>
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
            <td><strong>Total Quantity: </strong>{quantity}</td>
            <td><strong>Total Area: </strong>{total_area.toFixed(2)}</td>
            
            {/* <Form.Control type="text" placeholder="Area" name='area'  />   */}
        </tr>
                </thead>
            
            </Table>
            <br></br>
             {/* <h6> Aproved BY: __________________</h6> */}


                    {
                        status=='PI'?
                            null
                            :
                            CuttingGlassData.status=='1'?
                            
                        <><span className='red-text'>Before you submit, please review the information you've entered to ensure its accuracy. Once submitted, the information cannot be changed. Are you sure you want to proceed with the submission?</span><button onClick={(e)=>SubmitTentativeGlass(e)} className='btn btn-link'>Submit</button></>
                            :
                            <p>Submited at : {CuttingGlassData.submitted_at}</p>
                      }
             
            </div>
            <div className='col-sm-1'>
               
                    </div>
    

   
             <></>
                 
                       {
                        status=='PI'?
                            insertunique.map((single,i)=>{
                          
                            let isTrue=true
                            return(
                            CuttingList.map((csingle,i)=>{
                                
                                if(isTrue){
                                //console.log(single.id)
                                if(csingle.FinalTentaiveGlassType==single && csingle.uinsert>0){
                                    isTrue=false
                                    return(
                                        GlassType.map((glass,sr)=>{
                                            //console.log(glass)   
                                         if(csingle.FinalTentaiveGlassType===glass.id){
                                             console.log(glass)
                                             return(
                                           
                                        <Form onSubmit={AddToPurcahseOrder}>
                                           
                                        <div className='col-md-12'>
                                        <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                                          {/* <Form.Label>Details</Form.Label> */}
                                          <span className='form-inline input-group'>  
                                        
                
                                           <Form.Control type="text" placeholder="POB No" name='po' data-toggle="tooltip" data-placement="top" title='POB No' value={glass.title+' - '+glass.description+' With U-Insert'}
                                             />
                                            <Form.Control type="hidden" placeholder="Quotation Refrence" name='glassid' data-toggle="tooltip" data-placement="top" title='Quotation Refrence'value={glass.id}
                                             />
                                             <Form.Control type="hidden" placeholder="Quotation Refrence" name='uchannel' data-toggle="tooltip" data-placement="top" title='Quotation Refrence'value={'1'}
                                             />

                                        
                       
                                              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='purchaseorder'>
                                                 <option selected disabled>Purchase Order</option>                   
                                                             {
                                                                 purchaseorder.map((parameter,i)=>{
                                                                 
                                                                     return(
                                                                         <>
                                                                             { ponum==parameter.id ? 
                                                                                 <option value={parameter.id} selected>{parameter.refrence}</option>
                                                                                 : 
                                                                                 <option value={parameter.id}>{parameter.refrence}</option>
                                                                                 }


                                                                         
                                                                         
                                                                     </>
                                                                     )
                                                                     
                                                                 })
                                                                 }

                                                 </select>


                                                 <select class="form-select" aria-label="Default select example"  name="account">
                                                     <option disabled selected>Select Account Head</option>
                                                     {accounts.map((account, index) => {
                                                     return(         
                                                                                 
                                                         <option key={index} value={account.id}  >{account.title}</option>
                                                         
                                                         )}
                                                         )
                                                         }
                                                         </select> 
                                            <Form.Control type="text" placeholder="Price" name='price' defaultValue={GlassBooking.area} data-toggle="tooltip" data-placement="top" title='Price'/>
                             
                       
                                            <Form.Control type="text" placeholder="Remarks" name='remarks'  data-toggle="tooltip" data-placement="top" title='Remarks'/>
                             
                       
                                
                                            
                                            <Button variant="primary" type="submit"><i className='fa fa-save'></i></Button>           
                                          </span>    
                                          </Form.Group>
                          
                                            </div>
                          
                                     </Form>
                                             )
                                                        }
                                                        })
                                    )
                                }
                            }
                            })
                            )
                                // return(
                                //     GlassType.map((glass,sr)=>{
                                //         //console.log(glass)   
                                     
                                         
                                //      })
                                // )
                                    })
                        :
                        null
                            }

                        {
                            status=='PI'?
                        unique.map((single,i)=>{
                           
                            let isTrue=true
                            return(
                            CuttingList.map((csingle,i)=>{
                                if(isTrue){
                                //console.log(single.id)
                                if(csingle.FinalTentaiveGlassType==single && csingle.uinsert<=0){
                                    isTrue=false
                                    return(
                                        GlassType.map((glass,sr)=>{
                                            //console.log(glass)   
                                         if(csingle.FinalTentaiveGlassType===glass.id){
                                             console.log(glass)
                                             return(
                                           
                                        <Form onSubmit={AddToPurcahseOrder}>
                                           
                                        <div className='col-md-12'>
                                        <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                                       
                                          <span className='form-inline input-group'>  
                                        
                
                                           <Form.Control type="text" placeholder="POB No" name='po' data-toggle="tooltip" data-placement="top" title='POB No' value={glass.title+' - '+glass.description}
                                             />
                                            <Form.Control type="hidden" placeholder="Quotation Refrence" name='glassid' data-toggle="tooltip" data-placement="top" title='Quotation Refrence'value={glass.id}
                                             />

                                                <Form.Control type="hidden" placeholder="Quotation Refrence" name='uchannel' data-toggle="tooltip" data-placement="top" title='Quotation Refrence'value={'0'}
                                             />
                       
                                              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='purchaseorder'>
                                                 <option selected disabled>Purchase Order</option>                   
                                                             {
                                                                 purchaseorder.map((parameter,i)=>{
                                                                 
                                                                     return(
                                                                         <>
                                                                             { ponum==parameter.id ? 
                                                                                 <option value={parameter.id} selected>{parameter.refrence}</option>
                                                                                 : 
                                                                                 <option value={parameter.id}>{parameter.refrence}</option>
                                                                                 }
                                                                         
                                                                     </>
                                                                     )
                                                                     
                                                                 })
                                                                 }

                                                 </select>


                                                 <select class="form-select" aria-label="Default select example"  name="account">
                                                     <option disabled selected>Select Account Head</option>
                                                     {accounts.map((account, index) => {
                                                     return(         
                                                                                 
                                                         <option key={index} value={account.id}  >{account.title}</option>
                                                         
                                                         )}
                                                         )
                                                         }
                                                         </select> 
                                            <Form.Control type="text" placeholder="Price" name='price' defaultValue={GlassBooking.area} data-toggle="tooltip" data-placement="top" title='Price'/>
                             
                       
                                            <Form.Control type="text" placeholder="Remarks" name='remarks'  data-toggle="tooltip" data-placement="top" title='Remarks'/>
                             
                       
                                
                                            
                                            <Button variant="primary" type="submit"><i className='fa fa-save'></i></Button>           
                                          </span>    
                                          </Form.Group>
                          
                                            </div>
                          
                                     </Form>
                                             )
                                                        }
                                                        })
                                    )
                                    
                                }
                            }
                                
                            })
                            )
                                
                                    })
                                :null
                            }

    </div>
            </Tab.Pane>
            
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>


      </div>
      </>

    )
}
export default GlassCuttingList
