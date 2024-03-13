import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'

import NavMenu from '../../Common/NavMenu';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import AppURL from '../../../api/AppURL';
import cogoToast from 'cogo-toast';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import Async, { useAsync } from 'react-select/async';
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Alert from 'react-bootstrap/Alert';


function AddWindowData(){


    const navigate =useNavigate();
    const location = useLocation();
    const[loading,setloading]=useState(true);
    
    const[Allitem,setAllItem]=useState([]);
    const [region, setRegion] = useState("");
    const [regionip, setRegionip] = useState("");
    const [regiona, setRegiona] = useState("");
    const [regiong, setRegiong] = useState("");
    const [regions, setRegions] = useState("");
    const [regionp, setRegionp] = useState("");
    const [regionpro, setRegionpro] = useState("");
    const [regionacc, setRegionacc] = useState("");
    const [corprofile, setCorprofile] = useState("");
    const [corinterprofile, setCorinterprofile] = useState("");
    const [CorAccprofile, setCorAccprofile] = useState("");

    const[gasket,setgasket]=useState([]);
    const[screw,setScrew]=useState([]);
    const[packing,setPacking]=useState([]);
    const[glass,setGlass]=useState([]);
    const[interlockAcc,setinterlockAcc]=useState([]);

    const[floor,setFloor]=useState([]);
    const[locks,setlock]=useState([]);
    
    const[lockdata,SetLockData]=useState([]);
    
    const[AllCor,setAllCor]=useState([]);
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   
   const window=location.state.window_id;


const state = {
    button: 1
  };

  const DeleteProfile=(e,profile)=>{

    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DeleteCorProfileData(profile)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Profile Deleted Successfully",{position:'top-right'});                
        })
  }


  const EditProfile=(e,record)=>{
    e.preventDefault();
    navigate('/edit-cutting-data',{state:{item:record,status:'profile',window:window}})
    // const thisClicked=e.currentTarget;
    // thisClicked.innerText="Removing";
    // axios.delete(AppURL.DeleteCorProfileData(profile)).then(response=>{
    //     //alert(response.data.message);
    //     thisClicked.closest("tr").remove();
    //     cogoToast.success("Profile Deleted Successfully",{position:'top-right'});                
    //     })
  }


  

  const DeleteInterProfile=(e,profile)=>{

    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DeleteCorInterProfileData(profile)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("InterLock Profile Deleted Successfully",{position:'top-right'});
                            
        })

  }


  
  const DeleteInterAcc=(e,acc)=>{

    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DeleteCorInterAccData(acc)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("InterLock Accessory Deleted Successfully",{position:'top-right'});
                            
        })

  }
  

  const DeleteAccData=(e,acc)=>{

    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DeleteCorAccData(acc)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Accessory Deleted Successfully",{position:'top-right'});
                            
        })
  }
  


  const DeleteGasket=(e,profile)=>{

    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DeleteCorGasketData(profile)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Gasket Deleted Successfully",{position:'top-right'});                
        })
  }


  
  const DeleteScrew=(e,profile)=>{

    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DeleteCorScrewData(profile)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Screw Deleted Successfully",{position:'top-right'});                
        })
  }
  


  
  const DeletePacking=(e,profile)=>{

    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DeleteCorPackingData(profile)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Packing Material Deleted Successfully",{position:'top-right'});                
        })
  }


    
  const DeleteGlass=(e,profile)=>{

    const thisClicked=e.currentTarget;
    thisClicked.innerText="Removing";
    axios.delete(AppURL.DeleteCorGlassData(profile)).then(response=>{
        //alert(response.data.message);
        thisClicked.closest("tr").remove();
        cogoToast.success("Glass Deleted Successfully",{position:'top-right'});                
        })
  }



  const SaveWindowProfile=(e)=>{
    e.preventDefault();

    if(e.target.itempr.value==''){
      cogoToast.error("Please Select window type...")
    }
    else{

      //setstock(true)
      //alert("in button 3")
      //alert(elevation)
      const data={
        title:e.target.title.value,
        CorVisionItem:e.target.itempr.value,
        CorVision:window,    
        formula:e.target.formula.value,
        quantity:e.target.quantity.value,
        cutting:e.target.cutting.value,
        coating:e.target.coating.value,
        remark:e.target.remark.value,
      }
      axios.post(AppURL.SaveWindowProfileData,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
      //GetCorvision
      
      if(proresponse.status=='201'){
    
        cogoToast.success("New Profile Added Successfully ...");
        forceUpdate();
      }
    })

        }
}



const SaveInterLockWindowProfile=(e)=>{
    e.preventDefault();

    if(e.target.itemip.value==''){
      cogoToast.error("Please Select window type...")
    }
    else{
      const data={
        title:e.target.title.value,
        CorVisionItem:e.target.itemip.value,
        CorVision:window,    
        formula:e.target.formula.value,
        profileFormula:e.target.profileFormula.value,
        maximum:e.target.maximum.value,
        minimum:e.target.minimum.value,
        quantity:e.target.quantity.value,
        cutting:e.target.cutting.value,
        coating:e.target.coating.value,
        remark:e.target.remark.value,
        pair:e.target.pair.value,
        
      }
      axios.post(AppURL.SaveCorVisionInterLockProfile,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
      //GetCorvision
      
      if(proresponse.status=='201'){
    
        cogoToast.success("InterLock Profile Added Successfully ...");
        forceUpdate();
      }
    })

        }
}






const SaveInterLockWindowAcc=(e)=>{
    e.preventDefault();

    if(e.target.CorVisionItemProfile.value==''){
      cogoToast.error("Please Select type...")
    }
    else{
      const data={
        title:e.target.title.value,
        CorVisionItemProfile:e.target.CorVisionItemProfile.value,
        CorVisionItemAcc:e.target.CorVisionItemAcc.value,
        CorVision:window,    
        formula:e.target.formula.value,
        quantity:e.target.quantity.value,
        cutting:e.target.cutting.value,
        coating:e.target.coating.value,
        remark:e.target.remark.value,
        pair:e.target.pair.value,
        
      }
      axios.post(AppURL.SaveCorVisionInterLockAcc,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
      //GetCorvision
      
      if(proresponse.status=='201'){
    
        cogoToast.success("InterLock Profile Added Successfully ...");
        forceUpdate();
      }
    })

        }
}

const SaveWindowAcc=(e)=>{
    e.preventDefault();

    if(e.target.itema.value==''){
      cogoToast.error("Please Select  type...")
    }
    else{

      const data={
        title:e.target.title.value,
        CorVisionItem:e.target.itema.value,
        CorVision:window,    
        formula:e.target.formula.value,
        quantity:e.target.quantity.value,
        cutting:e.target.cutting.value,
        coating:e.target.coating.value,
        remark:e.target.remark.value,
      }
      axios.post(AppURL.SaveWindowAccData,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
     
      if(proresponse.status=='201'){
    
        cogoToast.success("New Accessory Added Successfully ...");
        forceUpdate();
      }
    })

        }
}



const SaveWindowGasket=(e)=>{
    e.preventDefault();

    if(e.target.itemg.value==''){
      cogoToast.error("Please Select  type...")
    }
    else{

      const data={
        title:e.target.title.value,
        CorVisionItem:e.target.itemg.value,
        CorVision:window,    
        formula:e.target.formula.value,
        quantity:e.target.quantity.value,
        cutting:e.target.cutting.value,
        coating:e.target.coating.value,
        remark:e.target.remark.value,
      }
      axios.post(AppURL.SaveWindowGasketData,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
     
      if(proresponse.status=='201'){
    
        cogoToast.success("New Gasket Added Successfully ...");
        forceUpdate();
      }
    })

        }
}



const SaveWindowScrew=(e)=>{
    e.preventDefault();

    if(e.target.items.value==''){
      cogoToast.error("Please Select  type...")
    }
    else{

      const data={
        title:e.target.title.value,
        CorVisionItem:e.target.items.value,
        CorVision:window,    
        formula:e.target.formula.value,
        quantity:e.target.quantity.value,
        cutting:e.target.cutting.value,
        coating:e.target.coating.value,
        remark:e.target.remark.value,
      }
      axios.post(AppURL.SaveWindowScrewData,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
     
      if(proresponse.status=='201'){
    
        cogoToast.success("New Screw Added Successfully ...");
        forceUpdate();
      }
    })

        }
}



const SaveWindowPacking=(e)=>{
    e.preventDefault();

    if(e.target.itemp.value==''){
      cogoToast.error("Please Select  type...")
    }
    else{

      const data={
        title:e.target.title.value,
        CorVisionItem:e.target.itemp.value,
        CorVision:window,    
        formula:e.target.formula.value,
        quantity:e.target.quantity.value,
        cutting:e.target.cutting.value,
        coating:e.target.coating.value,
        remark:e.target.remark.value,
      }
      axios.post(AppURL.SaveWindowPackingData,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
     
      if(proresponse.status=='201'){
    
        cogoToast.success("Packing Material Added Successfully ...");
        forceUpdate();
      }
    })

        }
}



const SaveWindowGlass=(e)=>{
    e.preventDefault();

    if(e.target.CodeName.value==''){
      cogoToast.error("Please Select  type...")
    }
    else{

      const data={
        CorVision:window,    
        title:e.target.title.value,
        CodeName:e.target.CodeName.value,
        Widthformula:e.target.Widthformula.value,
        Heightformula:e.target.Heightformula.value,
      }
      axios.post(AppURL.SaveWindowGlassData,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
     
      if(proresponse.status=='201'){
    
        cogoToast.success("New Glass Added Successfully ...");
        forceUpdate();
      }
    })

        }
}

const getCorProfile = async()=>{
    try{
        const response= await axios.get(AppURL.GetCorProfileData(window))
        setCorprofile(response.data);

        

        const iresponse= await axios.get(AppURL.GetCorInterLockProfileData(window))
        setCorinterprofile(iresponse.data);

        const aresponse= await axios.get(AppURL.GetCorAccData(window))
        setCorAccprofile(aresponse.data);

        const gresponse= await axios.get(AppURL.GetCorGasketData(window))
        setgasket(gresponse.data);


        const sresponse= await axios.get(AppURL.GetCorScrewData(window))
        setScrew(sresponse.data);

        const presponse= await axios.get(AppURL.GetCorPackingData(window))
        setPacking(presponse.data);


        const glresponse= await axios.get(AppURL.GetCorGlassData(window))
        setGlass(glresponse.data);


        const iaresponse= await axios.get(AppURL.GetCorIAccData(window))
        setinterlockAcc(iaresponse.data);

        
        setloading(false)
    }catch(error){
        console.log(error);
    }
    console.log(corprofile)
}


useEffect(()=>{
  axios.get(AppURL.GetLocks).then(response=>{
    setlock(response.data);

    axios.get(AppURL.AllCorWindows).then(response=>{
      setAllCor(response.data);
      //setLoading(false);
    })
  })

  axios.get(AppURL.NewStock).then(response=>{
    setAllItem(response.data);
    //setLoading(false);
  })
  getCorProfile();
  
    },[ignored]);

    if(loading){
        return(
            <p>Loading ...</p>
        )
    }

    return(

        <>
                 <NavMenu></NavMenu>
               
               <div className='container-fluid'>
         
               <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>
             
            <Col sm={12}>
        
            
             <div className='container-fluid'>
    <Alert variant="primary" className='d-print-none mt-3'>
    Add Profiles  
     
     <br>
     </br>

     <Form onSubmit={SaveWindowProfile}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Title, e.g Frame Cover" name='title'  required  /> &nbsp;
                 
                  <>
                    <Select className='selectwidth'
                        name='itempr'
                        rules={{ required: true }}
                        value={region}            
                        required={true}
                        onChange={(itempr) => {
                       // console.log(item);
                        setRegion(itempr);
                        
                        }}
                        options={Allitem.map((guest, index) => {
                        return {
                            label:guest.itemcode,
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                        };
                        })}
                    />

                  
             
                    </>
                  &nbsp;  <Form.Control type="text" placeholder="Formula , e.g (w-151)/2" name='formula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Quantity . e.g 1" name='quantity' required />
                  &nbsp;  <Form.Control type="text" placeholder="Cutting , 45° * 45°" name='cutting' required defaultValue={'90° * 90°'} />
                  &nbsp;  <Form.Control type="text" placeholder="Coating" name='coating' required defaultValue={'AC'} />
                  &nbsp;  <Form.Control type="text" placeholder="Remarks" name='remark' required defaultValue={'NA'} />
                  <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'><i className='fa fa-plus'></i></Button>
                  
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>
     </Alert>

     
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
            <th>Sr</th>
            <th>Title</th>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Formula</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>
          <th>Action</th>


        </tr>
      </thead>
      <tbody>

        {
            corprofile.map((singleitem,i)=>{
                return(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{singleitem.title}</td>

                        <td>{singleitem.CorVisionItem['itemcode']}</td>
                        <td>{singleitem.CorVisionItem['name']}</td>
                      
                        <td>{singleitem.formula}</td>
                        <td>{singleitem.quantity}</td>
                        <td>{singleitem.cutting}</td>
                        <td>{singleitem.coating}</td>
                        <td>{singleitem.remark}</td>
                        <td><button  className='btn btn-danger' onClick={(e)=>DeleteProfile(e,singleitem.id)}><i className='fa fa-trash'></i></button>
                        &nbsp;&nbsp;<button  className='btn btn-danger' onClick={(e)=>EditProfile(e,singleitem.id)} ><i className='fa fa-pencil'></i></button></td>
                    </tr>
                )
                
            })
      
      }

      


      </tbody>
    </Table>

             </div>
             </Col>
             </Row>
             </Tab.Container>



             {/* interlock data */}


    <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>
             
            <Col sm={12}>
        
            
             <div className='container-fluid'>
    <Alert variant="success" className='d-print-none mt-3'>
    Add InterLock Profile 
     
     <br>
     </br>

     <Form onSubmit={SaveInterLockWindowProfile}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Title, e.g Cover" name='title'  required  /> &nbsp;
                 
                  <>
                    <Select className='selectwidth selectwidth-per'
                        name='itemip'
                        rules={{ required: true }}
                        value={regionip}
                       
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegionip(item);
                        
                        }}
                        options={Allitem.map((guest, index) => {
                        return {
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                        };
                        })}
                    />
             
                    </>
                    &nbsp;  <Form.Control type="text" placeholder="Minimum" name='minimum' required />
                    &nbsp;  <Form.Control type="text" placeholder="Maximum" name='maximum' required />
                    &nbsp;  <Form.Control type="text" className='text-width-per' placeholder="InterLock Formula" name='formula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Formula , e.g (w-151)/2" name='profileFormula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Quantity . e.g 1" name='quantity' required />
                  &nbsp;  <Form.Control type="text" placeholder="Cutting , 45° * 45°" name='cutting' required />
                  &nbsp;  <Form.Control type="text" placeholder="Coating" name='coating' required />
                  &nbsp;  <Form.Control type="text" placeholder="Remarks" name='remark' required />
                  &nbsp;  <Form.Control type="text" placeholder="Pair" name='pair' required />
                  <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'><i className='fa fa-plus'></i></Button>
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>
     </Alert>

     
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
        <th>Sr</th>
            <th>Title</th>
          <th>I-Code</th>
          <th>Item Name</th>
          <th>Minimum</th>
          <th>Maximum</th>
          <th>P-Formula</th>
          <th>Formula</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>
          <th>Pair</th>
          <th>Action</th>


        </tr>
      </thead>
      <tbody>

        {
            corinterprofile.map((singleitem,i)=>{
                return(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{singleitem.title}</td>

                        <td>{singleitem.CorVisionItem['itemcode']}</td>
                        <td>{singleitem.CorVisionItem['name']}</td>
                      
                        <td>{singleitem.minimum}</td>
                        <td>{singleitem.maximum}</td>
                        <td>{singleitem.profileFormula}</td>

                        <td>{singleitem.formula}</td>
                        <td>{singleitem.quantity}</td>
                        <td>{singleitem.cutting}</td>
                        <td>{singleitem.coating}</td>
                        <td>{singleitem.remark}</td>
                        <td>{singleitem.pair}</td>
                        <td><button  className='btn btn-danger' onClick={(e)=>DeleteInterProfile(e,singleitem.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                )
                
            })
      
      }

   

      
      </tbody>
    </Table>

             </div>
             </Col>
             </Row>
             </Tab.Container>


    { /* Accessory Data */ }




    
    <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>
             
            <Col sm={12}>
        
            
             <div className='container-fluid'>
    <Alert variant="info" className='d-print-none mt-3'>
    Add Accessories  
     
     <br>
     </br>

     <Form onSubmit={SaveWindowAcc}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Title, e.g Cover" name='title'  required  /> &nbsp;
                 
                  <>
                    <Select className='selectwidth'
                        name='itema'
                        rules={{ required: true }}
                        value={regiona}
                       
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegiona(item);
                        
                        }}
                        options={Allitem.map((guest, index) => {
                        return {
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                        };
                        })}
                    />
             
                    </>
                  &nbsp;  <Form.Control type="text" placeholder="Formula" name='formula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Quantity" name='quantity' required />
                  &nbsp;  <Form.Control type="text" placeholder="Cutting , 45° * 45°" name='cutting' required />
                  &nbsp;  <Form.Control type="text" placeholder="Coating" name='coating' required />
                  &nbsp;  <Form.Control type="text" placeholder="Remarks" name='remark' required />

                  <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'><i className='fa fa-plus'></i></Button>
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>
     </Alert>

     
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
        <th>Sr</th>
            <th>Title</th>
          <th>I-Code</th>
          <th>Item Name</th>
          <th>Formula</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>
        
          <th>Action</th>


        </tr>
      </thead>
      <tbody>

        {
            CorAccprofile.map((singleitem,i)=>{
                return(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{singleitem.title}</td>

                        <td>{singleitem.CorVisionItem['itemcode']}</td>
                        <td>{singleitem.CorVisionItem['name']}</td>
                      
                        <td>{singleitem.formula}</td>
                        <td>{singleitem.quantity}</td>
                        <td>{singleitem.cutting}</td>
                        <td>{singleitem.coating}</td>
                        <td>{singleitem.remark}</td>
                        <td><button  className='btn btn-danger' onClick={(e)=>DeleteAccData(e,singleitem.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                )
                
            })
      
      }

   
      </tbody>
    </Table>

             </div>
             </Col>
             </Row>
             </Tab.Container>






         {/* interlock data */}


         <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>
             
            <Col sm={12}>
        
            
             <div className='container-fluid'>
    <Alert variant="success" className='d-print-none mt-3'>
    Add InterLock Accessory <b>&nbsp;&nbsp;(First textbox for title,second option is to select accessory, and third for compatible profile with previous selected accessory) </b>
     
     <br>
     </br>

     <Form onSubmit={SaveInterLockWindowAcc}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Title, e.g Cover" name='title'  required  /> &nbsp;
                  <>
                    <Select className='selectwidth selectwidth-per'
                        name='CorVisionItemAcc'
                        rules={{ required: true }}
                        value={regionacc}
                        defaultValue="test"
                        required={true}
                        label='Test'
                        onChange={(item) => {
                       // console.log(item);
                        setRegionacc(item);
                        
                        }}
                        

                        options={Allitem.map((guest, index) => {
                        
                        return {
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                        };
                        })}
                    />
             
                    </>
                    &nbsp;

                  <>
             
                    <Select className='selectwidth selectwidth-per'
                        name='CorVisionItemProfile'
                        rules={{ required: true }}
                        value={regionpro}
                       
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegionpro(item);
                        
                        }}
                        options={Allitem.map((guest, index) => {
                        return {
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                        };
                        })}
                    />
             
                    </>

                  
               
                  &nbsp;  <Form.Control type="text" placeholder="Formula , e.g (w-151)/2" name='formula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Quantity . e.g 1" name='quantity' required />
                  &nbsp;  <Form.Control type="text" placeholder="Cutting , 45° * 45°" name='cutting' required />
                  &nbsp;  <Form.Control type="text" placeholder="Coating" name='coating' required />
                  &nbsp;  <Form.Control type="text" placeholder="Remarks" name='remark' required />
                  &nbsp;  <Form.Control type="text" placeholder="Pair" name='pair' required />
                  <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'><i className='fa fa-plus'></i></Button>
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>
     </Alert>

     
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
        <th>Sr</th>
            <th>Title</th>
          <th>Acc Code</th>
          <th>Acc Name</th>
          <th>Profile Code</th>
          <th>Profile Name</th>
 
          <th>Formula</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>
          <th>Pair</th>
          <th>Action</th>


        </tr>
      </thead>
      <tbody>

        {
            interlockAcc.map((singleitem,i)=>{
                return(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{singleitem.title}</td>

                        <td>{singleitem.CorVisionItemAcc['itemcode']}</td>
                        <td>{singleitem.CorVisionItemAcc['name']}</td>


                        <td>{singleitem.CorVisionItemProfile['itemcode']}</td>
                        <td>{singleitem.CorVisionItemProfile['name']}</td>
 
                        <td>{singleitem.formula}</td>
                        <td>{singleitem.quantity}</td>
                        <td>{singleitem.cutting}</td>
                        <td>{singleitem.coating}</td>
                        <td>{singleitem.remark}</td>
                        <td>{singleitem.pair}</td>
                        <td><button  className='btn btn-danger' onClick={(e)=>DeleteInterAcc(e,singleitem.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                )
                
            })
      
      }

   

      
      </tbody>
    </Table>

             </div>
             </Col>
             </Row>
             </Tab.Container>


             { /* gasket data */}


             

    
    <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>
             
            <Col sm={12}>
        
            
             <div className='container-fluid'>
    <Alert variant="dark" className='d-print-none mt-3'>
    Add Gasket  
     
     <br>
     </br>

     <Form onSubmit={SaveWindowGasket}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Title, e.g Cover" name='title'  required  /> &nbsp;
                 
                  <>
                    <Select className='selectwidth'
                        name='itemg'
                        rules={{ required: true }}
                        value={regiong}
                       
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegiong(item);
                        
                        }}
                        options={Allitem.map((guest, index) => {
                        return {
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                        };
                        })}
                    />
             
                    </>
                  &nbsp;  <Form.Control type="text" placeholder="Formula" name='formula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Quantity" name='quantity' required />
                  &nbsp;  <Form.Control type="text" placeholder="Cutting , 45° * 45°" name='cutting' required />
                  &nbsp;  <Form.Control type="text" placeholder="Coating" name='coating' required />
                  &nbsp;  <Form.Control type="text" placeholder="Remarks" name='remark' required />

                  <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'><i className='fa fa-plus'></i></Button>
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>
     </Alert>

     
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
        <th>Sr</th>
            <th>Title</th>
          <th>I-Code</th>
          <th>Item Name</th>
          <th>Formula</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>
        
          <th>Action</th>


        </tr>
      </thead>
      <tbody>

        {
            gasket.map((singleitem,i)=>{
                return(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{singleitem.title}</td>

                        <td>{singleitem.CorVisionItem['itemcode']}</td>
                        <td>{singleitem.CorVisionItem['name']}</td>
                      
                        <td>{singleitem.formula}</td>
                        <td>{singleitem.quantity}</td>
                        <td>{singleitem.cutting}</td>
                        <td>{singleitem.coating}</td>
                        <td>{singleitem.remark}</td>
                        <td><button  className='btn btn-danger' onClick={(e)=>DeleteGasket(e,singleitem.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                )
                
            })
      
      }

   


      </tbody>
    </Table>

             </div>
             </Col>
             </Row>
             </Tab.Container>



             { /* Screw data */ }


             
    
    <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>
             
            <Col sm={12}>
        
            
             <div className='container-fluid'>
    <Alert variant="primary" className='d-print-none mt-3'>
    Add Screw  
     
     <br>
     </br>

     <Form onSubmit={SaveWindowScrew}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Title, e.g Cover" name='title'  required  /> &nbsp;
                 
                  <>
                    <Select className='selectwidth'
                        name='items'
                        rules={{ required: true }}
                        value={regions}
                       
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegions(item);
                        
                        }}
                        options={Allitem.map((guest, index) => {
                        return {
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                        };
                        })}
                    />
             
                    </>
                  &nbsp;  <Form.Control type="text" placeholder="Formula" name='formula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Quantity" name='quantity' required />
                  &nbsp;  <Form.Control type="text" placeholder="Cutting , 45° * 45°" name='cutting' required />
                  &nbsp;  <Form.Control type="text" placeholder="Coating" name='coating' required />
                  &nbsp;  <Form.Control type="text" placeholder="Remarks" name='remark' required />

                  <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'><i className='fa fa-plus'></i></Button>
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>
     </Alert>

     
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
        <th>Sr</th>
            <th>Title</th>
          <th>I-Code</th>
          <th>Item Name</th>
          <th>Formula</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>
        
          <th>Action</th>


        </tr>
      </thead>
      <tbody>

        {
            screw.map((singleitem,i)=>{
                return(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{singleitem.title}</td>

                        <td>{singleitem.CorVisionItem['itemcode']}</td>
                        <td>{singleitem.CorVisionItem['name']}</td>
                      
                        <td>{singleitem.formula}</td>
                        <td>{singleitem.quantity}</td>
                        <td>{singleitem.cutting}</td>
                        <td>{singleitem.coating}</td>
                        <td>{singleitem.remark}</td>
                        <td><button  className='btn btn-danger' onClick={(e)=>DeleteScrew(e,singleitem.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                )
                
            })
      
      }

   


      </tbody>
    </Table>

             </div>
             </Col>
             </Row>
             </Tab.Container>


             { /* packing data */}


             
    
    <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>
             
            <Col sm={12}>
        
            
             <div className='container-fluid'>
    <Alert variant="info" className='d-print-none mt-3'>
    Add Packing Material  
     
     <br>
     </br>

     <Form onSubmit={SaveWindowPacking}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Title, e.g Cover" name='title'  required  /> &nbsp;
                 
                  <>
                    <Select className='selectwidth'
                        name='itemp'
                        rules={{ required: true }}
                        value={regionp}
                       
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegionp(item);
                        
                        }}
                        options={Allitem.map((guest, index) => {
                        return {
                            label: guest.itemcode+" - "+guest.item+" - "+guest.supplier+" - "+guest.length+" - "+guest.finishing,
                            value: guest.itemid,
                            key: index,
                        };
                        })}
                    />
             
                    </>
                  &nbsp;  <Form.Control type="text" placeholder="Formula" name='formula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Quantity" name='quantity' required />
                  &nbsp;  <Form.Control type="text" placeholder="Cutting , 45° * 45°" name='cutting' required />
                  &nbsp;  <Form.Control type="text" placeholder="Coating" name='coating' required />
                  &nbsp;  <Form.Control type="text" placeholder="Remarks" name='remark' required />

                  <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'><i className='fa fa-plus'></i></Button>
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>
     </Alert>

     
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
        <th>Sr</th>
            <th>Title</th>
          <th>I-Code</th>
          <th>Item Name</th>
          <th>Formula</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>
        
          <th>Action</th>


        </tr>
      </thead>
      <tbody>

        {
            packing.map((singleitem,i)=>{
                return(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{singleitem.title}</td>

                        <td>{singleitem.CorVisionItem['itemcode']}</td>
                        <td>{singleitem.CorVisionItem['name']}</td>
                      
                        <td>{singleitem.formula}</td>
                        <td>{singleitem.quantity}</td>
                        <td>{singleitem.cutting}</td>
                        <td>{singleitem.coating}</td>
                        <td>{singleitem.remark}</td>
                        <td><button  className='btn btn-danger' onClick={(e)=>DeletePacking(e,singleitem.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                )
                
            })
      
      }

   

   
      </tbody>
    </Table>

             </div>
             </Col>
             </Row>
             </Tab.Container>


             { /* Add Glass */}


             
    
    <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>
             
            <Col sm={12}>
        
            
             <div className='container-fluid'>
    <Alert variant="success" className='d-print-none mt-3'>
    Add Glass  
     
     <br>
     </br>

     <Form onSubmit={SaveWindowGlass}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Sliding Glass" name='title'  required  /> &nbsp;
                 
                 
                  &nbsp;  <Form.Control type="text" placeholder="gls1" name='CodeName' required />
                  &nbsp;  <Form.Control type="text" placeholder="Width formula" name='Widthformula' required />
                  &nbsp;  <Form.Control type="text" placeholder="Height formula" name='Heightformula' required />

                  <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'><i className='fa fa-plus'></i></Button>
                    </span>    
                    </Form.Group>

                    </div>

                </div>
             </Form>
     </Alert>

     
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
        <th>Sr</th>
            <th>Title</th>
          <th>Code</th>
          <th>Width Formula</th>
          <th>Height Formula</th>
    
          <th>Action</th>


        </tr>
      </thead>
      <tbody>

        {
            glass.map((singleitem,i)=>{
                return(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{singleitem.title}</td>

                 
                      
                        <td>{singleitem.CodeName}</td>
                        <td>{singleitem.Widthformula}</td>
                        <td>{singleitem.Heightformula}</td>
                        <td><button  className='btn btn-danger' onClick={(e)=>DeleteGlass(e,singleitem.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                )
                
            })
      
      }

      </tbody>
    </Table>

             </div>
             </Col>
             </Row>
             </Tab.Container>
             </div>
        </>

    )

}
export default AddWindowData
