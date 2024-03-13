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


function MTODetailPage(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[productionstock,setproductionstock]=useState([]);
    const[stock,setStock]=useState([]);
    const [alternative,setAlternative]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[issueitem,setIssuedItemList]=useState([]);
    
    const MTOid=location.state.MTOid;
    const [visible, setVisible] = useState([]);
    const[issue,setIssue]=useState([]);
    const[mtodata,setMTOData]=useState([]);
    const [pdffile, setPdffile] = useState("");
    const [avq, setAvq]=useState([]);
    const[subdata,setsubdata]=useState(false);
    const[editmtoitem,seteditmtoitem]=useState(false);
    const[mitemid,setmitemid]=useState();
    const code=sessionStorage.getItem('code');
// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;

   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   let total_weight=0; 
   const [checkoutInput,SetCheckoutInput]=useState({
    status:'',

    });
    


    useEffect(()=>{
      axios.get(AppURL.SingleMTO(MTOid)).then(response=>{
        setMTOData(response.data);
        })


      getCountries();

        axios.get(AppURL.ItemByMto(MTOid)).then(response=>{
        setItem(response.data);
        })

        axios.get(AppURL.SingleStockQTY).then(response=>{
          setStock(response.data);
          })

          axios.get(AppURL.getAlternative).then(response=>{
            setAlternative(response.data);
            
            })

            
          axios.get(AppURL.getProductionStock).then(response=>{
            setproductionstock(response.data);
            //console.log(response.data)
           
            })
    },[ignored]);

  const [region, setRegion] = useState("");
  
  const getCountries = async()=>{
    try{
        const response= await axios.get(AppURL.NewStockByItem)
        setCountries(response.data);

    }catch(error){
        console.log(error);
    }
}





const BorrowItem=(e)=>{
  e.preventDefault();
   if(parseInt(e.target.balance.value) < parseInt(e.target.quantity.value)){
       cogoToast.error("Quantity should be less than availabe balance");   
      // var numberAsInt = parseInt(number, 10);
  
    }

   const data={
    item:e.target.item_id.value,
    issue_id:e.target.issue_id.value,
    balance:e.target.balance.value,
    quantity:e.target.quantity.value,
    }

  

    axios.post(AppURL.UpdateStockRevoke,data,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}).then(response =>{  
      if(response.status===201){
        cogoToast.success('Successfully Updated...')
        getCountries();
        //forceUpdate();
      }
  })
  forceUpdate();
}


function SubmitMTO(e,MTO){
  e.preventDefault();

  let result = window.confirm("are you sure you want to submit this MTO ?");
  if (result == true) {
  let yourDate = new Date()

 const data={
    mto:MTO,
    submital:'1',
    submitted_at:yourDate.toISOString().split('T')[0]
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
  else{
    cogoToast.info("Cancelled Successfully")
  }
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
    shownState.splice(index,1)
      shownState.push(item_id);

      axios.get(AppURL.IssuedDetailByItem(item_id)).then(response=>{
        setIssuedItemList(response.data);
        })


      setVisible(shownState);

  }

}


function handleFileChange(e) {
    const files = e.target.files[0];
     setPdffile(files);
     //console.log("Guru4666", pdffile);
 }

 function UpdateQty(event,id) {
  axios.get(AppURL.UpdateMIQty(mitemid,event.target.value)).then(response=>{
    //setIssuedItemList(response.data);
    if(response.status=='200'){
      seteditmtoitem(false)
      cogoToast.success("Quantity Updated Successfully...")
      forceUpdate()
    }
    else{
      cogoToast.error("Something Went Wrong...")
    }
    })

}


function UpdateColor(event,id) {
  axios.get(AppURL.UpdateMIColor(mitemid,event.target.value)).then(response=>{
    //setIssuedItemList(response.data);
    if(response.status=='200'){
      seteditmtoitem(false)
      cogoToast.success("Color Updated Successfully...")
    }
    else{
      cogoToast.error("Something Went Wrong...")
    }
    })


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
    //alert(response.status);
    if(response.status=='203'){
        //alert(response.data);
        //alert(response.status);
        cogoToast.error("Failed! Please Check the Item With Code "+response.data,{position:'top-center',hideAfter:10});
         //cogoToast.success("Item Added To MTO",{position:'top-right'});
        // const  newitem =  response.data;
        // setItem(oldItem=>[...oldItem,newitem])
        //navigate('/project-mto');
    //}
    }

    else{
      cogoToast.success("MTO Imported Successfully",{position:'top-center',hideAfter:3});
      //cogoToast.success("Item Added To MTO",{position:'top-right'});
     // const  newitem =  response.data;
     // setItem(oldItem=>[...oldItem,newitem])
     navigate('/project-mto');
    }

        
})
}




const handleQtyUpdate=(e)=>{
  e.preventDefault()
  //alert("we will adjust qty here")
  navigate('/mto-adjustments',{state:{MTOid:MTOid}});
}
const handleColorUpdate=(e)=>{
  e.preventDefault();
  if(e.target.old_color.value===''){
      cogoToast.error("Please enter Current Color",{position:'top-right'});   
  }
  
  if(e.target.new_color.value===''){
    cogoToast.error("Please enter new Color",{position:'top-right'});   
  }
  
  
  else{ 
      const data={
        mto:MTOid,
        old_color:e.target.old_color.value,
        new_color:e.target.new_color.value,
      }

      axios.patch(AppURL.MTOItemColorUpdate,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response =>{  
          if(response.status===201){
            forceUpdate();
               cogoToast.success("All Colors Update Successfully",{position:'top-right'});
          }        
          else{
            cogoToast.error("Something Went Wrong ",{position:'top-right'});
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
            remarks:e.target.remark.value,
            mto:MTOid,
        }
        const data_check={
          itemname:parseInt(e.target.item.value),
          revision:'1',
          mto:MTOid,
          color:e.target.color.value,
          remarks:e.target.remark.value
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
  const alternatehandle=(e,old_item,new_item,quantity,extra_quantity,color,remarks,revision)=>{
    e.preventDefault();
  

    const data={
      itemname:new_item,
      //Issued_item:1,
      quantity:quantity,
      extra_quantity:extra_quantity,
      color:color,
      revision:revision,
      remarks:remarks,
      mto:MTOid,
          }
          const data_check={
            itemname:parseInt(new_item),
            revision:revision,
            mto:MTOid,
            color:color,
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
  }
        )}
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

 const EditMTOItem=(e,mtoitemid)=>{
  e.preventDefault()
    setmitemid(mtoitemid)
    seteditmtoitem(true)
 }

    
    const GetItemDetail=(e,mtoitemid)=>{
      e.preventDefault();
      const thisClicked=e.currentTarget;
      setsubdata(true)

      // thisClicked.innerText="Removing";
      // axios.delete(AppURL.MTOItemDelete(mtoitemid)).then(response=>{
      //     //alert(response.data.message);
      //     thisClicked.closest("tr").remove();
      //     cogoToast.success("Item Deleted Successfully",{position:'top-right'});
                  
          
          //})
      }
    


   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={2} className='d-print-none'>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Import MTO Item</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Add MTO Item</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <Form onSubmit={handleImport}>
            <div className='row col-md-12 mt-3'>
        
                <Form.Group className="mb-3 form-inline " controlId="formBasicEmail">
                    <Form.Label>Select File to Import MTO(supported file .xlxs)</Form.Label>
                  <Form.Control type="file" placeholder="" name='file'
                  onChange={handleFileChange} />
                   <Button  className='mt-2' variant="primary" type="submit">Import</Button>
                    </Form.Group>
                </div>
             </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <Form onSubmit={handleSubmit} className='d-print-none'>
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
                          label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing+" - "+guest.type+" ( "+guest.quantity+" )",
                          value: guest.item_id,
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
                    <Form.Label>Actual and Margin quantity</Form.Label>
                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="50" name='quantity' autoComplete='off'/>
                  
                  <Form.Control type="text" placeholder="3" name='extra_quantity' autoComplete='off'  />
                  
                  <Form.Control type="text" placeholder="" name='color' Value="MF"  />
                  <Form.Control type="text" placeholder="Remarks" name='remark' defaultValue={'NA'}  />
                  {
                    code=='DI'?
                  mtodata.submital==='0' ? <Button variant="primary" type="submit">+</Button>
                  :null
            
            : <p></p>
                  }
                    </span>    

                    </Form.Group>

                    </div>

                </div>
             </Form>
             <div className='mt-5'></div>

             <Alert variant="primary" className='d-print-none'>
          Here is the list of MTO items you added.
        </Alert>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>sr</th>
          <th>Barcode</th>
          <th>Name</th>
          <th>Code</th>
          <th>Color</th>
          <th>QTY</th>
          <th>MQ</th>
          <th>Legth</th>
          <th>Req Color</th>
          <th>AV</th>
          <th>Remarks</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

        {

    item.map((single,i)=>{
      //console.log(single)
      if(parseFloat(single.itemname['weight'])){
        total_weight=total_weight+((parseFloat(single.itemname['weight'])*single.quantity));
      }
      
      //total_weight=1;
      let avqty=0;
          stock.map((SStock,si)=>{
            if(SStock.item===single.itemname['id']){
            avqty=SStock.quantity;
            }
          })
    
                    return(
                     
                                 
                      (single.itemname['alternate']=='1')?
                            
                            <tr key={i} className='less-qty-new'>
                            <td>{i+1}</td>
                            <td>{single.itemname['barcode']}</td>
                            <td>{single.itemname['name']}
                            <br></br>
                            {
                            !(mtodata.submital==='1') ?  
                              alternative.map((alt,a)=>{
                                let store_stock=0;
                                //console.log(alt.ParentItem['id']);
                                if(single.itemname['id']==alt.ParentItem['id']){
                                      productionstock.map((prs,p)=>{
                                        //console.log(alt.ChildItem['id'])
                                        if(prs.Pitem['id']==alt.ChildItem['id']){
                                          store_stock=prs.quantity
                                        
                                        }

                                        else{
                                          
                                        }
                                            
                                        })
                                
                                  return(
                                    <>
                                    {
                                      store_stock=='0'?
                                      <>
                                      <button className='btn btn-danger' onClick={(e)=> alternatehandle(e,single.itemname['id'],alt.ChildItem['id'],single.quantity,single.extra_quantity,single.color,single.remarks,single.revision)}>{alt.ChildItem['itemcode']}</button>&nbsp;</>
                                      :
                                     <>
                                      <button className='btn btn-danger' onClick={(e)=> alternatehandle(e,single.itemname['id'],alt.ChildItem['id'],single.quantity,single.extra_quantity,single.color,single.remarks,single.revision)}>{alt.ChildItem['itemcode']} PS({store_stock })</button>&nbsp;
                                      </>
                                      
                                    }
                                    </>

                                  )

                                
                                }
                                  
                              })
                            :
                            null
                            }
                 
                        
                            </td>
                            <td>{single.itemname['itemcode']}</td>
                            <td>{single.itemname['finishing']['name']}</td>
                            <td>{single.quantity}</td>
                            <td>{single.extra_quantity}</td>
                            <td>{single.itemname['length']}</td>
                            <td>{single.color}</td>
                        
                            {
                            parseInt(avqty)<parseInt(parseInt(single.quantity)+parseInt(single.extra_quantity))?
                            <td className='less-qty'>{avqty}</td>
                            :
                            <td>{avqty}</td>
                            
                            }
                              <td>{single.remarks}</td>
                            
                            
                            <td>
                            {
                                mtodata.submital==='0' ? 
                                <>
                                 <button className='btn btn-danger'   onClick={(e)=>DeleteMTOItem(e,single.id)}><i className="fa-solid fa-pencil"></i></button>
                                 <button className='btn btn-danger'  onClick={(e)=>DeleteMTOItem(e,single.id)}><i className="fa-solid fa-trash"></i></button>
                                 </>
                                : <p>NA</p>
                            } 
                              
                              
                              
                              </td>
                        </tr>
                        :
                        <>
                        <tr key={i}>
                        <td>
                     
                        <button className='btn btn-light' onClick={()=> toggleShown(single.itemname['id'])}>{i+1} <i class="fa-solid fa-caret-down"></i></button></td>
                        <td>{single.itemname['barcode']}</td>
                        <td>{single.itemname['name']}
                        </td>
                        <td>{single.itemname['itemcode']}</td>
                        <td>{single.itemname['finishing']['name']}</td>
                        {/* <td>{
                          editmtoitem?
                            mitemid==single.id?
                            <Form.Control type="text" placeholder="50" defaultValue={single.quantity} onDoubleClick={UpdateQty} name='qty' autoComplete='off'/>
                            :
                              single.quantity
                            :single.quantity
                        
                        }</td> */}
                {/* <td>{single.quantity}</td> */}
                    <td>{
                          editmtoitem?
                            mitemid==single.id?
                            <Form.Control type="text" placeholder="50" defaultValue={single.quantity} onDoubleClick={UpdateQty} name='qty' autoComplete='off'/>
                            :
                              single.quantity
                            :single.quantity
                        
                        }</td>  
                        <td>{single.extra_quantity}</td>
                        <td>{single.itemname['length']}</td>
                        <td>
                        
                        {
                          editmtoitem?
                            mitemid==single.id?
                            <Form.Control type="text" placeholder="50" defaultValue={single.color} onDoubleClick={UpdateColor} name='color' autoComplete='off'/>
                            :
                              single.color
                            :single.color
                        
                        }
                        </td>
                     
                        {
                        parseInt(avqty)<parseInt(parseInt(single.quantity)+parseInt(single.extra_quantity))?
                        <td className='less-qty'>{avqty}</td>
                        :
                        <td>{avqty}</td>
                        
                        }
                          <td>{single.remarks}</td>
                        
                        
                        <td>
                        {
                          code=='DI'?
                            mtodata.submital==='0' ? 
                            <> 
                              <button className='btn btn-danger'   onClick={(e)=>EditMTOItem(e,single.id)}><i className="fa-solid fa-pencil"></i></button>
                               &nbsp;
                            <button className='btn btn-danger'  onClick={(e)=>DeleteMTOItem(e,single.id)}><i className="fa-solid fa-trash"></i></button> 
                            {/* &nbsp;<button className='btn btn-danger'  onClick={(e)=>GetItemDetail(e,single.id)}><i className="fa-solid fa-arrow-down"></i></button>  */}
                           </>
                            : <p>NA</p>
                          :null
                        } 
                          
                          </td>
                  
                    </tr>
                         {

                         visible.includes(single.itemname['id']) && (
                         
                         
                            issueitem.map((issues,sr)=>{
                       
                          
                              return(

                                <tr key={sr} className="additional-info row-background-issue">      
                                <td>{sr+1}</td>                                       
                                <td className='white-text-issue'>{issues.project['refrence_no']}</td>
                                <td  className='white-text-issue' colSpan={2}>{issues.project['name']}</td>
                                <td  className='white-text-issue'>{issues.quantity}</td>
                                <td  className='white-text-issue'>{issues.balance}</td>
                                <td colSpan={2}>
                                <form onSubmit={BorrowItem}>

                              
                              <div className='input-group'>
                                  <Form.Control type="text" className='' placeholder="quantity to borrow"  name='quantity'  required />
                              <Form.Control type="hidden" className='' placeholder=""  name='issue_id' defaultValue={issues.id} required />
                              <Form.Control type="hidden" className='' placeholder=""  name='item_id' defaultValue={issues.Issued_item['id']} required />
                              <Form.Control type="hidden" className='' placeholder=""  name='balance' defaultValue={issues.balance} required />
                              &nbsp;
                                  <button type="submit" className='btn btn-danger btn-sm'  ><i class="fa-solid fa-upload" ></i> Borrow</button>
                                
                       
                                  </div>
                              
                              
                               
                                </form>
                                </td>
                                  </tr>
                              )
                          })

                     
                          

                  )}
               </>

                      )
                
        }
      )
      }
      </tbody>
    </Table>
    <p className='red-text text-decoration-line-through'>! Beginning on December 15, 2023, the ability to alter quantity will no longer be available. However, the extra quantity and color options can still be modified.</p>
      {
         <><p>Total Weight : <b>{total_weight.toFixed(2)}</b></p></>
      }
    {
        code=='DI'?
            mtodata.submital==='0' ? 
            
            <div class="row">
              <div class="col-sm-2">
            <button className='btn btn-success' onClick={(e)=>SubmitMTO(e,MTOid)}>Submit MTO</button>
            </div>
         
             </div>
            : 
              
            <>
            {/* <p className='d-print-none'>MTO Already Submitted</p> */}


            <div className='row col-md-12'>  
             <Form onSubmit={handleQtyUpdate} className='d-print-none'>
            
            <div className='col-md-3'>
 
             </div> 
                <div className='col-md-4 mt-2'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
            
                  <span className='form-inline input-group'>  
    
                  <Button variant="danger" type="submit" ><i className="fa-solid fa-upload" ></i> Adjustments</Button>
                  </span>    

                    </Form.Group>

                    </div>

                
             </Form>
             <div className='col-md-4 mt-2'></div>
             <Form onSubmit={handleColorUpdate} className='d-print-none mt-2'>
            
       
              
            <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
        
              <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder="Existing Color" name='old_color'  />            
              <Form.Control type="text" placeholder="New Color" name='new_color'  />
              <Button variant="primary" type="submit"><i className="fa-solid fa-upload"></i> Update</Button>

          
              
                </span>    

                </Form.Group>

                
                

           
         </Form>
         </div>
            </>
          :null
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
export default MTODetailPage
