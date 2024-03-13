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


function TentativeGlass(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[stock,setStock]=useState([]);
    const[glassitem,setglassitem]=useState([]);
    const [error,setError]=useState([]);
    
    const [loading,setLoading]=useState(true);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[unit,setUnit]=useState([]);
    const [type, setType] = useState('text');
    const MTOid=location.state.id;
    let newdata;
    let total_weight=0;
    let quantity=0;
    let total_area=0;
    let total_sqm=0;
    let total_set=0;
    //let gp=0
    let ponum=0
    const[purchaseorder,setpurchaseorder]=useState([]);
    const [glassdata, setglassdata] = useState("");
    const [gp, setgp] = useState("");
    const [GlassType, setGlassType]=useState([]);
    const [GlassList, setGlassList]=useState([]);
    const [ProcessorList, setProcessorList]=useState([]);
    const [SuplierGlassType, setSuplierGlassType]=useState([]);
    const [GlassBooking, setGlassBooking]=useState([]);

    
    
// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   const status=sessionStorage.getItem('code');
   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });
    
    

    useEffect(()=>{

      //getCountries()
      axios.get(AppURL.GetTentativeGlassItem(MTOid)).then(response=>{
        setglassitem(response.data);
        const unique = [...new Set(response.data.map(item => item.TentaiveGlassType))];

        setGlassList(unique);
        setglassitem(response.data);
        axios.get(AppURL.GetGlassTypeList).then(response=>{
            setGlassType(response.data);
            //console.log(response.data)
            axios.get(AppURL.GetTentativeGlassData(MTOid)).then(Gresponse=>{
                setglassdata(Gresponse.data);
                axios.get(AppURL.GetGlassType).then(response=>{
                    setSuplierGlassType(response.data);
                
               
                axios.get(AppURL.POListDepthNoLimit).then(response=>{
                    setpurchaseorder(response.data);
                    
                    axios.get(AppURL.GetGlassProcessorList).then(response=>{
                        setProcessorList(response.data);
                        //glassdata.TentaiveGlassProject['id'],
                        //console.log(Gresponse.data.TentaiveGlassProject['id'])
                        axios.get(AppURL.GetGlassBookingDetails(Gresponse.data.TentaiveGlassProject['id'])).then(glresponse=>{
                            console.log(glresponse.data)
                            
                            setGlassBooking(glresponse.data);
                            if(glresponse.data=='None'){
                                console.log("null")
                                setgp(0)
                                //ponum=0
                                setLoading(false);
                            }
                            else{
                         
                                //response.data['GlassProcessor']['id']?
                            
                                    
                                setgp(glresponse.data['GlassProcessor']['id'])
                                    //console.log(response.data['GlassProcessor']['id'])
                                    
                                    
                                // :
                                // console.log("wrong")
                            
                                setLoading(false);
                                //gp=GlassBooking.GlassProcessor['id']
                                //ponum=GlassBooking.purchaseRef['id']
                            }
                            
                            
                        })
                    })
                })

                
                // const test=glassitem.map(item => item.TentaiveGlassType)
                // .filter((value, index, self) => self.indexOf(value) === index)
                
                
                //console.log(purchaseorder)
                    
                })
            })
        })

        //     // axios.get(AppURL.UnitOfMeasure).then(response=>{
        //     //     setUnit(response.data);
        //     //     //setLoading(false);
        //     //     axios.get(AppURL.OrderListLimit).then(response=>{
        //     //       setorders(response.data);
     
         
        //     //   })
        //     // })
           
        //     })
        })

        //const code=sessionStorage.getItem('code');
        
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




  function DeleteGlass(e,id){
    e.preventDefault()
    axios.get(AppURL.DeleteTentativeGlass(id)).then(response=>{
        //setglassdata(response.data);
        if(response.status===200){
            cogoToast.success("Deleted Successfully...",{position:'top-right'});
            //navigate('/project-details');
            forceUpdate();
        }
    })
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
function SubmitTentativeGlass(e){
    e.preventDefault()
    axios.get(AppURL.SubmitTentativeGlass(MTOid)).then(response=>{
        //setglassdata(response.data);
        if(response.status===200){
            cogoToast.success("Submitted Successfully...",{position:'top-right'});
            //navigate('/project-details');
            forceUpdate();
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


  

const UpdateCreateBookingOrder=(e)=>{
  e.preventDefault();
  //alert("Ready")
    if(e.target.glasstype.value=='0'){
        cogoToast.error("Please Select Glass Type",{position:'top-right'});
    }
    else if(e.target.status.value=='0'){
        cogoToast.error("Please Select Status",{position:'top-right'});
    }

    else if(e.target.GlassProcessor.value=='0'){
        cogoToast.error("Please Select Glass Processor",{position:'top-right'});
    }
    else{
    const data={
        TentaiveGlassBookingProject:glassdata.TentaiveGlassProject['id'],
        inquiry_date:e.target.InqDate.value,
        quotation_receiving_date:e.target.QRDate.value,
        booking_cofirmation_date:e.target.podate.value,
        purchaseRef:e.target.po.value,
        QuotationRef:e.target.quotationRef.value,
        GlassType:e.target.glasstype.value,
        area:e.target.totalsqm.value,
        status:e.target.status.value,
        GlassProcessor:e.target.GlassProcessor.value,
        eta:e.target.expecteddd.value,  
 
  }

        axios.post(AppURL.SaveBoookingOrder,data,{ 
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+sessionStorage.getItem("token"),
        },}).then(response=>{  
            
          cogoToast.success("Updated Successfully...",{position:'top-right'});
          //new data will be reloaded
          forceUpdate();
        })
        //forceUpdate();
    
    }

}


function SaveGlassSize(e){
    e.preventDefault()
    const area=(((e.target.opwidth.value/1000)*(e.target.opheight.value/1000))*e.target.qty.value)
    const data={
        TentativeGlassID:MTOid,
        system:e.target.System.value,
        WindowRef:e.target.Refrence.value,
        TentaiveGlassType:e.target.gtype.value,
        width:e.target.opwidth.value,
        height:e.target.opheight.value,
        quantity:e.target.qty.value, 
        remarks:e.target.remarks.value,  
        area:area
  }
        axios.post(AppURL.SaveTentativeGlassItem,data,{ 
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

    if(loading){
        return <h4>Loading .....</h4>
   } 

   return(
        <>
                <NavMenu></NavMenu>
        { 
        //CuttingGlassData.status=='1'?
                <Form onSubmit={SaveGlassSize} >
          <div className='row col-md-12 p-2'>
          {/* <div className='col-md-8'>
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

        
              </Form.Group>
              </div> */}
              
              {
                            status=='PI'?
                                null
                            :
                            glassdata.status=='1'?
                                    
                           
              <div className='col-md-12'>
              <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                <Form.Label>Add Glass Cutting List</Form.Label>
                <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="System" name='System'  />                
              
                  <Form.Control type="text" placeholder=" Refrence" name='Refrence' />
              
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='gtype'>
                      <option selected disabled>Glass Type</option>                   
                                {
                                      GlassType.map((parameter,i)=>{
                                       
                                          return(
                                           
                                                    <option value={parameter.id}>{parameter.title}-{parameter.description}</option>
                                       
                                          )
                                        
                                      })
                                    }

                    </select>
                  <Form.Control type="text" placeholder="OP Width" name='opwidth'  />  
                  <Form.Control type="text" placeholder="OP Height" name='opheight'  />
                  {/* <Form.Control type="text" placeholder="U channel Value" name='uchannels'  />   */}
                  {/* <Form.Control type="text" placeholder="IP Width" name='ipwidth'  />  
                  <Form.Control type="text" placeholder="IP Height" name='ipheight'  />   */}
                  <Form.Control type="text" placeholder="Qty" name='qty'  />  
                  {/* <Form.Control type="text" placeholder="Area" name='area'  />   */}
                  {/* <Form.Control type="text" placeholder="Window Ref" name='wref'  />  */}
                   <Form.Control type="text" placeholder="Remarks" name='remarks'  />  
                  <Button variant="primary" type="submit">+</Button>           
                </span>    
                </Form.Group>

                  </div>
                    :null
                    }
              </div>
           </Form>
        //    :null
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
        //   <Form onSubmit={IssueForPowderCoating}>
        //   <div className='row col-md-12'>
        //   <div className='col-md-8'>
        //       <Form.Group className="mb-3" controlId="formBasicPassword">
        //           <Form.Label>Select Item (only for OffCut and Buffing)</Form.Label>
        //           <>
        //           <Select
        //               name='item'
        //               rules={{ required: true }}
        //               value={region}
        //               required={true}
        //               onChange={(item) => {
        //              // console.log(item);
        //               setRegion(item);   
        //               }}
        //               options={countries.map((guest, index) => {
        //               return {
        //                 label: guest.item['barcode']+" - "+guest.item['itemcode']+" - "+guest.item['name']+" - "+guest.item['Supplier']['name']+" - "+guest.item['length']+" - "+guest.item['finishing']['name']+" ( "+guest.quantity+" )",
        //                 value: guest.item['id'],
        //                   key: index,
        //               };
        //               })}
        //           />
        //             {region.value}
        //         </>

        //           <Form.Text className="text-muted">
        //               Please select the item ,add quantity and then click on + button .
        //           </Form.Text>
        //       </Form.Group>
        //       </div>
        //       <div className='col-md-4'>
        //       <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
        //         <Form.Label>Details</Form.Label>
        //         <span className='form-inline input-group'>  
        //           <Form.Control type="text" placeholder="Quantity" name='quantity'  />                
        //           <Form.Control type="text" placeholder="Length" name='length'  />     
        //           <Form.Control type="text" placeholder="Color" name='color' />
        //           <Form.Control type="text" placeholder="Remarks" name='remark' defaultValue={'NA'}  />
        //           <Button variant="primary" type="submit">+</Button>           
        //         </span>    
        //         </Form.Group>

        //           </div>

        //       </div>
        //    </Form>
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
                <td>{glassdata.TentaiveGlassProject['refrence_no']}-{glassdata.TentaiveGlassProject['name']}
                </td>
                </tr>
                <tr>
                <td>Revision</td>
                <td>{glassdata.revision}
                </td>
                </tr>
                {

                glassdata.status=='2' && status=='PI'?
                    <tr>
                    <td>Date</td>
                    <td>{glassdata.submitted_at}
                    </td>
                    </tr>
                :null
                }
         
                {/* <td>Job No</td>
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
         */}
               
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
            glassitem.map((single,i)=>{
               quantity= parseInt(single.quantity)+parseInt(quantity)
               total_area=(parseFloat(single.area)+parseFloat(total_area)).toFixed(2)
            
             })}

    <Table striped bordered hover size="sm" className='delivery-note-fs dntable-border'>
      <thead>
        <tr>
          <th>S.N</th>
          <th>Refrence</th>
         
          <th>Glass Type</th>
          <th>Width</th>
          <th>Height</th>
          <th>Qty</th>
          <th>Area</th>
          <th>System</th>
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

    glassitem.map((single,i)=>{

      let avqty=0;
      let length=0
         // stock.map((SStock,si)=>{
           // if(SStock.item===single.itemname['id']){
            //avqty=SStock.quantity;
            //}
          //})
        let area=single.area
                  
                    return(
                        <>
                            <tr key={i}>

                            <td>{i+1}
                            </td>
                  
                            
                              <td>{single.WindowRef}</td>
                              <td>{
                              GlassType.map((glass,sr)=>{
                                if(single.TentaiveGlassType==glass.id){
                                    return(
                                        glass.title
                                    )
                                }})
                         
                                }</td>
                              <td>{single.width}</td>
                              <td>{single.height}</td>
                              <td>{single.quantity}</td>
                              <td>{parseFloat(single.area).toFixed(2)}</td>
                              <td>{single.system}</td>
                              {
                                    status=='PI'?
                                    null
                                    :
                                    glassdata.status=='1'?
                                    
                                    <td  onClick={(e)=>DeleteGlass(e,single.id)}  className='d-print-none'><i className='fa fa-trash btn btn-danger'></i></td>
                                    :null
                                }
                          </tr>
                         
                          {/* <tr>
                            <td colSpan={'5'}>Total</td>
                            <td>342</td>
                            <td>342</td>
                          </tr> */}
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
            <td><strong>Total Area: </strong>{total_area}</td>
           
        </tr>
                </thead>
            
            </Table>
            <br></br>
             {/* <h6> Aproved BY: __________________</h6> */}


                    {
                        status=='PI'?
                            null
                            :
                            glassdata.status=='1'?
                            
                        <><span className='red-text'>Before you submit, please review the information you've entered to ensure its accuracy. Once submitted, the information cannot be changed. Are you sure you want to proceed with the submission?</span><button onClick={(e)=>SubmitTentativeGlass(e)} className='btn btn-link'>Submit</button></>
                            :
                            <p>Submited at : {glassdata.submitted_at}</p>
                      }
             
            </div>
            <div className='col-sm-1'>
               

        
                    </div>

                <div className='col-sm-5'>
                {/* <h6 className='delivery-note-fs'> Delivered To: {dndata.deliveredto}</h6>
                <h6 className='delivery-note-fs'> Received By: __________________</h6>
                
                <h6 className='delivery-note-fs'> Signature:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__________________</h6>
                
                <h6 className='delivery-note-fs'> Contact No:&nbsp;&nbsp;__________________</h6> */}

                
                       
                    </div>

                </div>
    {           status=='PI'?
                <div className='col-sm-12 d-print-none'>
               
                <p>Create/Update Booking Order</p>
               <Form onSubmit={UpdateCreateBookingOrder}>
              {/* <div className='row col-md-12'>
              <div className='col-md-2'>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Select Item (only for OffCut and Buffing)</Form.Label>
                      <> */}
                     {/* <Select
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
                     /> */}
                       {/* {region.value} */}
                   {/* </>
   
                     <Form.Text className="text-muted">
                         Please select the item ,add quantity and then click on + button .
                     </Form.Text>
                 </Form.Group> */}
                 {/* </div> */}
                 <div className='col-md-12'>
                 <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                   {/* <Form.Label>Details</Form.Label> */}
                   <span className='form-inline input-group'>  
                 

                    <Form.Control  placeholder="Inquiry Date" type={type} 
                        onFocus={() => setType('date')} 
                        required
                        onBlur={() => setType('text')}
                        data-toggle="tooltip" data-placement="top" title='Inquiry Date'
                        defaultValue={GlassBooking.inquiry_date}
                        name='InqDate'  />   


                     <Form.Control  placeholder="Quotation Receiving Date" type={type} 
                        onFocus={() => setType('date')} 
                        onBlur={() => setType('text')}
                        required
                        data-toggle="tooltip" data-placement="top" title='Quotation Receiving Date'
                        defaultValue={GlassBooking.quotation_receiving_date}
                        name='QRDate'  />   
                   
                   <Form.Control  placeholder="PO Confirmation Date"  type={type} 
                        onFocus={() => setType('date')} 
                        required
                        onBlur={() => setType('text')}
                        data-toggle="tooltip" data-placement="top" title='PO Confirmation Date'
                        defaultValue={GlassBooking.booking_cofirmation_date}
                        name='podate'  />   
                   
                    {/* <> 
                     <Select
                        placeholder='Select Purchase Order'
                         name='po'
                         rules={{ required: true }}
                         value={region}
                         required={true}
                         onChange={(item) => {
                        // console.log(item);
                         setRegion(item);   
                         }}
                         options={purchaseorder.map((guest, index) => {
                         return {
                           label: guest.refrence,
                           value: guest.id,
                             key: index,
                         };
                         })}
                     />
                    
                   </> */}
   
                
                   {/* <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='po'>
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

                    </select> */}

                    <Form.Control type="text" placeholder="POB No" name='po' data-toggle="tooltip" data-placement="top" title='POB No' required defaultValue={GlassBooking.purchaseRef}
                      />
                     <Form.Control type="text" placeholder="Quotation Refrence" name='quotationRef' data-toggle="tooltip" data-placement="top" required title='Quotation Refrence' defaultValue={GlassBooking.QuotationRef}
                      />
                 

                    
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='glasstype' required>
                      <option value={0} selected disabled>Glass Type</option>                   
                                {
                                      SuplierGlassType.map((parameter,i)=>{
                                       
                                          return(
                                            <>
                                                { GlassBooking.GlassType==parameter.glassid ? 
                                                    <option value={parameter.glassid} selected>{parameter.glasstype}</option>
                                                    : 
                                                    <option value={parameter.glassid}>{parameter.glasstype}</option>
                                                    }


                                              
                                            
                                          </>
                                          )
                                        
                                      })
                                    }

                    </select>
                     <Form.Control required type="text" placeholder="Total SQM" name='totalsqm' defaultValue={GlassBooking.area} data-toggle="tooltip" data-placement="top" title='Total Area'/>
                                
                     <select  class="form-select form-select-sm" aria-label=".form-select-sm example" name='status' required >
                        <option value={0} disabled selected>Status</option>
                        {
                            GlassBooking.status=='Booked' ? 
                            <option value="Booked" selected>Booked</option>
                            :
                            <option value="Booked">Booked</option>
                        }
                        
                        {
                            GlassBooking.status=='Not Booked' ? 
                            <option value="Not Booked" selected>Not Booked</option>
                            :
                            <option value="Not Booked">Not Booked</option>
                        }

                        
                        {
                            GlassBooking.status=='Partially Available' ? 
                            <option value="Partially Available" selected>Partially Available</option>
                            :
                            <option value="Partially Available">Partially Available</option>
                        }

                        {
                            GlassBooking.status=='Available in Stock' ? 
                            <option value="Available in Stock" selected>Available in Stock</option>
                            :
                            <option value="Available in Stock">Available in Stock</option>
                        }       

                        {
                            GlassBooking.status=='Fully Received' ? 
                            <option value="Fully Received" selected>Fully Received</option>
                            :
                            <option value="Fully Received">Fully Received</option>
                        }
                 
                    </select>
                     
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" title='Offer' name='GlassProcessor'>
                      <option value={0} selected disabled>Glass Processor</option>                   
                                {
                                      ProcessorList.map((parameter,i)=>{
                                        
                                        //let gp= GlassBooking.GlassProcessor['id']?GlassBooking.GlassProcessor['id']:null
                                          return(
                                            <>
                                           {
                                            gp==parameter.id ?
                                            <option value={parameter.id} selected>{parameter.title}</option>
                                            :
                                            <option value={parameter.id}>{parameter.title}</option>
                                           }
                                            </>
                                          )
                                        
                                      })
                                    }

                    </select>

         
                     <Form.Control  placeholder="Expected Delivery Date" type={type} 
                        onFocus={() => setType('date')} 
                        required
                        onBlur={() => setType('text')}
                        data-toggle="tooltip" data-placement="top" title='Expected Delivery Date'
                        name='expecteddd' defaultValue={GlassBooking.eta}  />   
                     <Button variant="primary" type="submit"><i className='fa fa-save'></i></Button>           
                   </span>    
                   </Form.Group>
   
                     </div>
   
              </Form>
                       </div>
                :
                <></>       }
            </Tab.Pane>
            
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>


      </div>
      </>

    )
}
export default TentativeGlass
