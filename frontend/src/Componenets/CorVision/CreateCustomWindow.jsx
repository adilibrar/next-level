import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import { useLocation } from 'react-router-dom'
import NavMenu from '../Common/NavMenu';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import cogoToast from 'cogo-toast';
import 'react-select-search/style.css'
import Select from 'react-select'
import Alert from 'react-bootstrap/Alert';
//import Select from 'react-select';


function CreateCustomWindow(){
    const location = useLocation();
    const[loading,setloading]=useState(true);
    const[form,setform]=useState(true);
    const[item,setItem]=useState([]);
    const[interlockitem,setinterlockitem]=useState([]);
    const[access,setaccess]=useState([]);
    const[gasket,setgasket]=useState([]);
    const[screw,setScrew]=useState([]);
    const[packing,setPacking]=useState([]);
    const[glass,setGlass]=useState([]);
    const[interlockAcc,setinterlockAcc]=useState([]);
    const[Cor,setCor]=useState([]);
    const[unit,setUnit]=useState([]);
    const [region, setRegion] = useState("");
    const [status, setstatus] = useState(false);
    const project=location.state.project_id;
    const elevation=location.state.elevation_id;
    const[locks,setlock]=useState([]);
    const[AllCor,setAllCor]=useState([]);
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

   const [d1s1w, setd1s1w] = useState(0);
   const [d1s1h, setd1s1h] = useState(0);
   const [d2s1w, setd2s1w] = useState(0);
   const [d2s1h, setd2s1h] = useState(0);
   const [d3s1w, setd3s1w] = useState(0);
   const [d3s1h, setd3s1h] = useState(0);
   const [d4s1w, setd4s1w] = useState(0);
   const [d4s1h, setd4s1h] = useState(0);
   const [d5s1w, setd5s1w] = useState(0);
   const [d5s1h, setd5s1h] = useState(0);
   const [d6s1w, setd6s1w] = useState(0);
   const [d6s1h, setd6s1h] = useState(0);
      
   const [d1s2w, setd1s2w] = useState(0);
   const [d1s2h, setd1s2h] = useState(0);
   const [d2s2w, setd2s2w] = useState(0);
   const [d2s2h, setd2s2h] = useState(0);
   const [d3s2w, setd3s2w] = useState(0);
   const [d3s2h, setd3s2h] = useState(0);
   const [d4s2w, setd4s2w] = useState(0);
   const [d4s2h, setd4s2h] = useState(0);
   const [d5s2w, setd5s2w] = useState(0);
   const [d5s2h, setd5s2h] = useState(0);
   const [d6s2w, setd6s2w] = useState(0);
   const [d6s2h, setd6s2h] = useState(0);
      
   const [d1s3w, setd1s3w] = useState(0);
   const [d1s3h, setd1s3h] = useState(0);
   const [d2s3w, setd2s3w] = useState(0);
   const [d2s3h, setd2s3h] = useState(0);
   const [d3s3w, setd3s3w] = useState(0);
   const [d3s3h, setd3s3h] = useState(0);
   const [d4s3w, setd4s3w] = useState(0);
   const [d4s3h, setd4s3h] = useState(0);
   const [d5s3w, setd5s3w] = useState(0);
   const [d5s3h, setd5s3h] = useState(0);
   const [d6s3w, setd6s3w] = useState(0);
   const [d6s3h, setd6s3h] = useState(0); 
   
  const [d1s4w, setd1s4w] = useState(0);
  const [d1s4h, setd1s4h] = useState(0);
  const [d2s4w, setd2s4w] = useState(0);
  const [d2s4h, setd2s4h] = useState(0);
  const [d3s4w, setd3s4w] = useState(0);
  const [d3s4h, setd3s4h] = useState(0);
  const [d4s4w, setd4s4w] = useState(0);
  const [d4s4h, setd4s4h] = useState(0);
  const [d5s4w, setd5s4w] = useState(0);
  const [d5s4h, setd5s4h] = useState(0);
  const [d6s4w, setd6s4w] = useState(0);
  const [d6s4h, setd6s4h] = useState(0); 


  const [d1s5w, setd1s5w] = useState(0);
  const [d1s5h, setd1s5h] = useState(0);
  const [d2s5w, setd2s5w] = useState(0);
  const [d2s5h, setd2s5h] = useState(0);
  const [d3s5w, setd3s5w] = useState(0);
  const [d3s5h, setd3s5h] = useState(0);
  const [d4s5w, setd4s5w] = useState(0);
  const [d4s5h, setd4s5h] = useState(0);
  const [d5s5w, setd5s5w] = useState(0);
  const [d5s5h, setd5s5h] = useState(0);
  const [d6s5w, setd6s5w] = useState(0);
  const [d6s5h, setd6s5h] = useState(0); 


  const [d1s6w, setd1s6w] = useState(0);
  const [d1s6h, setd1s6h] = useState(0);
  const [d2s6w, setd2s6w] = useState(0);
  const [d2s6h, setd2s6h] = useState(0);
  const [d3s6w, setd3s6w] = useState(0);
  const [d3s6h, setd3s6h] = useState(0);
  const [d4s6w, setd4s6w] = useState(0);
  const [d4s6h, setd4s6h] = useState(0);
  const [d5s6w, setd5s6w] = useState(0);
  const [d5s6h, setd5s6h] = useState(0);
  const [d6s6w, setd6s6w] = useState(0);
  const [d6s6h, setd6s6h] = useState(0); 


let id=2
const state = {
    button: 1
  };
  const CustomDium=()=>{
    setstatus(true)
  }

const handleSubmit=(e)=>{
    e.preventDefault();

    if(e.target.window.value==''){
      cogoToast.error("Please Select window type...")
    }

    else{

    if(state.button===3){
      const windowdata={
      width:e.target.width.value,
      height:e.target.height.value,
      windload:e.target.wp.value,
      ProfileFinishing:e.target.finishing.value,
      LockHeight:e.target.handleheight.value,
      WindowLock:e.target.lock.value,
      LockFinishing:e.target.lockfinishing.value,
      GlassColor:e.target.glass.value,
      title:e.target.title.value,
      quantity:e.target.quantity.value,
      elevation:e.target.elevation.value,
      Window:e.target.window.value,
      Windowproject:project,
      Windowfloor:elevation,
      }


      axios.post(AppURL.ReleaseWindow,windowdata,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
        console.log(proresponse.data['id'])
      //GetCorvision
      if(proresponse.status=='201'){
        // if(e.target.dim1.value!='0' && e.target.dim2.value!='0')
        // {
          
          // const dimdata={
          //   ReleasedWindowCDim:proresponse.data['id'],
          //   dim1:e.target.dim1.value,
          //   dim2:e.target.dim2.value,
          //   dim3:e.target.dim3.value
          //   }

          
      const shutter_data={
        ReleasedWindowCS:proresponse.data['id'],
        d1s1w :d1s1w,
        d1s1h :d1s1h,
        d2s1w :d2s1w,
        d2s1h :d2s1h,
        d3s1w :d3s1w,
        d3s1h :d3s1h,
        d4s1w :d4s1w,
        d4s1h :d4s1h,
        d5s1w :d5s1w,
        d5s1h :d5s1h,
        d6s1w :d6s1w,
        d6s1h :d6s1h,
          
        d1s2w :d1s2w,
        d1s2h :d1s2h,
        d2s2w :d2s2w,
        d2s2h :d2s2h,
        d3s2w :d3s2w,
        d3s2h :d3s2h,
        d4s2w :d4s2w,
        d4s2h :d4s2h,
        d5s2w :d5s2w,
        d5s2h :d5s2h,
        d6s2w :d6s2w,
        d6s2h :d6s2h,
          
        d1s3w :d1s3w,
        d1s3h :d1s3h,
        d2s3w :d2s3w,
        d2s3h :d2s3h,
        d3s3w :d3s3w,
        d3s3h :d3s3h,
        d4s3w :d4s3w,
        d4s3h :d4s3h,
        d5s3w :d5s3w,
        d5s3h :d5s3h,
        d6s3w :d6s3w,
        d6s3h :d6s3h, 
        
        d1s4w :d1s4w,
        d1s4h :d1s4h,
        d2s4w :d2s4w,
        d2s4h :d2s4h,
        d3s4w :d3s4w,
        d3s4h :d3s4h,
        d4s4w :d4s4w,
        d4s4h :d4s4h,
        d5s4w :d5s4w,
        d5s4h :d5s4h,
        d6s4w :d6s4w,
        d6s4h :d6s4h, 
        
        d1s5w :d1s5w,
        d1s5h :d1s5h,
        d2s5w :d2s5w,
        d2s5h :d2s5h,
        d3s5w :d3s5w,
        d3s5h :d3s5h,
        d4s5w :d4s5w,
        d4s5h :d4s5h,
        d5s5w :d5s5w,
        d5s5h :d5s5h,
        d6s5w :d6s5w,
        d6s5h :d6s5h, 
          
        d1s6w :d1s6w,
        d1s6h :d1s6h,
        d2s6w :d2s6w,
        d2s6h :d2s6h,
        d3s6w :d3s6w,
        d3s6h :d3s6h,
        d4s6w :d4s6w,
        d4s6h :d4s6h,
        d5s6w :d5s6w,
        d5s6h :d5s6h,
        d6s6w :d6s6w,
        d6s6h :d6s6h, 
          
      }

            axios.post(AppURL.ReleaseWindowCustomShuter,shutter_data,{ 
              headers: {
              "Content-Type": "application/json",
              "Authorization": "Token "+sessionStorage.getItem("token"),
            },}).then(proresponse =>{ 
              console.log("Custom Shutters")
            })
        //}

        const data={
          width:e.target.width.value,
          height:e.target.height.value,
          wp:e.target.wp.value,
          id:proresponse.data['Window'],
          released:proresponse.data['id'],
          status:'1',
          project:project,
          // dim1:e.target.dim1.value,
          // dim2:e.target.dim2.value,
          // dim3:e.target.dim3.value,  
          // d1s1w:e.target.d1s1w.value,
          // d1s1h:e.target.d1s1h.value,
          // d1s2w:e.target.d1s2w.value,
          // d1s2h:e.target.d1s2h.value,
          // d2s1w:e.target.d2s1w.value,
          // d2s1h:e.target.d2s1h.value

          d1s1w :d1s1w,
          d1s1h :d1s1h,
          d2s1w :d2s1w,
          d2s1h :d2s1h,
          d3s1w :d3s1w,
          d3s1h :d3s1h,
          d4s1w :d4s1w,
          d4s1h :d4s1h,
          d5s1w :d5s1w,
          d5s1h :d5s1h,
          d6s1w :d6s1w,
          d6s1h :d6s1h,
            
          d1s2w :d1s2w,
          d1s2h :d1s2h,
          d2s2w :d2s2w,
          d2s2h :d2s2h,
          d3s2w :d3s2w,
          d3s2h :d3s2h,
          d4s2w :d4s2w,
          d4s2h :d4s2h,
          d5s2w :d5s2w,
          d5s2h :d5s2h,
          d6s2w :d6s2w,
          d6s2h :d6s2h,
            
          d1s3w :d1s3w,
          d1s3h :d1s3h,
          d2s3w :d2s3w,
          d2s3h :d2s3h,
          d3s3w :d3s3w,
          d3s3h :d3s3h,
          d4s3w :d4s3w,
          d4s3h :d4s3h,
          d5s3w :d5s3w,
          d5s3h :d5s3h,
          d6s3w :d6s3w,
          d6s3h :d6s3h, 
          
          d1s4w :d1s4w,
          d1s4h :d1s4h,
          d2s4w :d2s4w,
          d2s4h :d2s4h,
          d3s4w :d3s4w,
          d3s4h :d3s4h,
          d4s4w :d4s4w,
          d4s4h :d4s4h,
          d5s4w :d5s4w,
          d5s4h :d5s4h,
          d6s4w :d6s4w,
          d6s4h :d6s4h, 
          
          d1s5w :d1s5w,
          d1s5h :d1s5h,
          d2s5w :d2s5w,
          d2s5h :d2s5h,
          d3s5w :d3s5w,
          d3s5h :d3s5h,
          d4s5w :d4s5w,
          d4s5h :d4s5h,
          d5s5w :d5s5w,
          d5s5h :d5s5h,
          d6s5w :d6s5w,
          d6s5h :d6s5h, 
            
          d1s6w :d1s6w,
          d1s6h :d1s6h,
          d2s6w :d2s6w,
          d2s6h :d2s6h,
          d3s6w :d3s6w,
          d3s6h :d3s6h,
          d4s6w :d4s6w,
          d4s6h :d4s6h,
          d5s6w :d5s6w,
          d5s6h :d5s6h,
          d6s6w :d6s6w,
          d6s6h :d6s6h, 
            }


    axios.post(AppURL.GetCutingProfile,data,{ 
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}).then(response =>{ 
      setItem(response.data);
      if(response.data){
          axios.post(AppURL.GetCutingAcc,data,{ 
              headers: {
              "Content-Type": "application/json",
              "Authorization": "Token "+sessionStorage.getItem("token"),
            },}).then(accresponse =>{ 
              setaccess(accresponse.data)
              axios.post(AppURL.GetCutingGasket,data,{ 
                  headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Token "+sessionStorage.getItem("token"),
                },}).then(gasketresponse =>{ 
                  setgasket(gasketresponse.data)

                  
                  axios.post(AppURL.GetCutingScrew,data,{ 
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+sessionStorage.getItem("token"),
                  },}).then(screwresponse =>{ 
                    setScrew(screwresponse.data)
                          
                  axios.post(AppURL.GetCuttingScrew,data,{ 
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+sessionStorage.getItem("token"),
                  },}).then(packetresponse =>{ 
                    setPacking(packetresponse.data)
             
                    axios.post(AppURL.GetCuttingGlass,data,{ 
                      headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Token "+sessionStorage.getItem("token"),
                    },}).then(packetresponse =>{ 
                      setGlass(packetresponse.data)
                      console.log(packetresponse.data)
                      axios.post(AppURL.GetCutingInterlockProfile,data,{ 
                        headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+sessionStorage.getItem("token"),
                      },}).then(packetresponse =>{ 
                        setinterlockitem(packetresponse.data)
                         axios.post(AppURL.GetCutingInterlockAcc,data,{ 
                        headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+sessionStorage.getItem("token"),
                      },}).then(packetresponse =>{ 
                        setinterlockAcc(packetresponse.data)
                        axios.get(AppURL.UnitOfMeasure).then(response=>{
                          setUnit(response.data);
                         axios.get(AppURL.GetCorvision(e.target.window.value)).then(response=>{
                          setCor(response.data);
                          cogoToast.success("A new window Released Successfully...");
                          e.target.reset()
                       })
                    })
                    }) 
                       }) 
                      }) 
                  }) 
                  }) 
                 }) 
            })                 
      }
    }) 
    }
    else {
        cogoToast.error("Something went wrong...")
       } 
    })   
    } }
}

useEffect(()=>{
  axios.get(AppURL.GetLocks).then(response=>{
    setlock(response.data);
    axios.get(AppURL.AllCorWindows).then(response=>{
      setAllCor(response.data);
      
    })})       
    },[ignored]);

if(form){
    return(
        <>
            <NavMenu></NavMenu>           
               <div className='container-fluid'>       
               <Tab.Container id="left-tabs-example" defaultActiveKey="second">
               <Row>          
            <Col sm={12}>
           <Form onSubmit={handleSubmit}>
            <div className='row col-md-12'>       
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Actual Width and Height</Form.Label>
                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Window Title" name='title' defaultValue={'W-'} required  /> 
                  <Form.Control type="text" placeholder="Width" name='width' required  /> 
                  <Form.Control type="text" placeholder="Height" name='height' required />    
                  <Form.Control type="hidden" placeholder="Shutter 1" defaultValue={'452.50'} name='d1s1w' required  />
                      <Form.Control type="hidden" placeholder="Shutter 1" defaultValue={'654'} name='d1s1h' required  />
                      <Form.Control type="hidden" placeholder="Shutter 1" defaultValue={'233'} name='d1s2w' required  />
                      <Form.Control type="hidden" placeholder="Shutter 1" defaultValue={'450'} name='d1s2h' required  />
                      <Form.Control type="hidden" placeholder="Shutter 1" defaultValue={'733'} name='d2s1w' required  />
                      <Form.Control type="hidden" placeholder="Shutter 1" defaultValue={'764'} name='d2s1h' required  />
                  <>
                    <Select className='selectwidth'
                        name='window'
                        rules={{ required: true }}
                        value={region}
                        // key={status}
                        required={true}
                        onChange={(item) => {
                        setRegion(item);
                        }}
                        options={AllCor.map((guest, index) => {
                        return {
                            label:
                            guest.name,
                            value: guest.id,
                            key: index,
                            status:guest.status,
                        };
                        })}
                    />
                </>
                    </span>    
                    </Form.Group>
                    </div>

                  <div className='col-md-12'>
                  <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Wind Load(N/m<sup>2</sup>) Glass and Elevation</Form.Label>
                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Wind Load" name='wp' defaultValue={'1.1'}t required />
                  
                  <Form.Control type="text" placeholder="Approved Glass" name='glass' required defaultValue={'AG'} />
                  <Form.Control type="text" placeholder="Quantity" name='quantity' defaultValue={'1'} required />
                  <Form.Control type="text" placeholder="Elevation" name='elevation' defaultValue={'Front'} required />
                    </span>       
                    </Form.Group>
                    </div>

                    <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Finishing and Locks</Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Profile Finishing" defaultValue={'AC'} name='finishing' required  />
                  <Form.Control type="text" placeholder="handle Height" defaultValue={'1050'} name='handleheight' required  />
              
                  <select class="form-select" aria-label="Default select example"  name="lock" required>
                           {locks.map((guest, index) => {                  
                                  return(         
                                                       
                                          <option key={index} value={guest.id}  >{guest.lockitem['itemcode']} - {guest.lockitem['name']}</option>
                                                   
                                         )} )}
                
                 </select>     

                <Form.Control type="text" placeholder="Lock Finishing" name='lockfinishing' required defaultValue={'AC'}/>
                          
                    </span>                    
                       <Button variant="link" onClick={(e)=>CustomDium(e)} name='gal'>ADD Custom Shutters</Button>
                    </Form.Group>
 
                    <br></br>
                    </div>
                    {
                      status?
                      <div className='col-md-12'>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <th colSpan={2}>Dim1</th>
                                <th colSpan={2}>Dim2</th>
                                <th colSpan={2}>Dim3</th>
                                <th colSpan={2}>Dim4</th>
                                <th colSpan={2}>Dim5</th>
                                <th colSpan={2}>Dim6</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td><Form.Control type="text" placeholder="Shutter Width"  onChange={(e)=> setd1s1w(e.target.value)} name='d1s1w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd1s1h(e.target.value)} name='d1s1h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd2s1w(e.target.value)} name='d2s1w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd2s1h(e.target.value)} name='d2s1h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd3s1w(e.target.value)}  name='d3s1w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd3s1h(e.target.value)} name='d3s1h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd4s1w(e.target.value)} name='d4s1w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd4s1h(e.target.value)}  name='d4s1h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd5s1w(e.target.value)} name='d5s1w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd5s1h(e.target.value)}  name='d5s1h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd6s1w(e.target.value)} name='d6s1w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd6s1h(e.target.value)} name='d6s1h'   /></td>                       
                                </tr>
                  
                                <tr>
                                <td><Form.Control type="text" placeholder="Shutter Width"  onChange={(e)=> setd1s2w(e.target.value)} name='d1s2w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd1s2h(e.target.value)} name='d1s2h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd2s2w(e.target.value)} name='d2s2w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd2s2h(e.target.value)} name='d2s2h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd3s2w(e.target.value)}  name='d3s2w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd3s2h(e.target.value)} name='d3s2h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd4s2w(e.target.value)} name='d4s2w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd4s2h(e.target.value)}  name='d4s2h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd5s2w(e.target.value)} name='d5s2w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd5s2h(e.target.value)}  name='d5s2h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd6s2w(e.target.value)} name='d6s2w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd6s2h(e.target.value)} name='d6s2h'   /></td>  
                                </tr>
                  
                                <tr>
                                <td><Form.Control type="text" placeholder="Shutter Width"  onChange={(e)=> setd1s3w(e.target.value)} name='d1s3w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd1s3h(e.target.value)} name='d1s3h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd2s3w(e.target.value)} name='d2s3w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd2s3h(e.target.value)} name='d2s3h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd3s3w(e.target.value)}  name='d3s3w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd3s3h(e.target.value)} name='d3s3h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd4s3w(e.target.value)} name='d4s3w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd4s3h(e.target.value)}  name='d4s3h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd5s3w(e.target.value)} name='d5s3w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd5s3h(e.target.value)}  name='d5s3h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd6s3w(e.target.value)} name='d6s3w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd6s3h(e.target.value)} name='d6s3h'   /></td> 
                                </tr>
                  
                                <tr>
                                <td><Form.Control type="text" placeholder="Shutter Width"  onChange={(e)=> setd1s4w(e.target.value)} name='d1s4w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd1s4h(e.target.value)} name='d1s4h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd2s4w(e.target.value)} name='d2s4w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd2s4h(e.target.value)} name='d2s4h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd3s4w(e.target.value)}  name='d3s4w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd3s4h(e.target.value)} name='d3s4h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd4s4w(e.target.value)} name='d4s4w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd4s4h(e.target.value)}  name='d4s4h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd5s4w(e.target.value)} name='d5s4w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd5s4h(e.target.value)}  name='d5s4h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd6s4w(e.target.value)} name='d6s4w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd6s4h(e.target.value)} name='d6s4h'   /></td> 
                                </tr>
                  
                                <tr>
                                <td><Form.Control type="text" placeholder="Shutter Width"  onChange={(e)=> setd1s5w(e.target.value)} name='d1s5w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd1s5h(e.target.value)} name='d1s5h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd2s5w(e.target.value)} name='d2s5w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd2s5h(e.target.value)} name='d2s5h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd3s5w(e.target.value)}  name='d3s5w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd3s5h(e.target.value)} name='d3s5h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd4s5w(e.target.value)} name='d4s5w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd4s5h(e.target.value)}  name='d4s5h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd5s5w(e.target.value)} name='d5s5w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd5s5h(e.target.value)}  name='d5s5h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd6s5w(e.target.value)} name='d6s5w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd6s5h(e.target.value)} name='d6s5h'   /></td> 
                                </tr>
                  
                                <tr>
                                <td><Form.Control type="text" placeholder="Shutter Width"  onChange={(e)=> setd1s6w(e.target.value)} name='d1s6w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd1s6h(e.target.value)} name='d1s6h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd2s6w(e.target.value)} name='d2s6w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd2s6h(e.target.value)} name='d2s6h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd3s6w(e.target.value)}  name='d3s6w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd3s6h(e.target.value)} name='d3s6h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd4s6w(e.target.value)} name='d4s6w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd4s6h(e.target.value)}  name='d4s6h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd5s6w(e.target.value)} name='d5s6w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd5s6h(e.target.value)}  name='d5s6h'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Width" onChange={(e)=> setd6s6w(e.target.value)} name='d6s6w'   /></td>
                                <td><Form.Control type="text" placeholder="Shutter Height" onChange={(e)=> setd6s6h(e.target.value)} name='d6s6h'   /></td> 
                                </tr>
                            </tbody>
                        </Table>
            
                          </div>
                      : 
               null                 
                    }
                    <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
               <Button variant="primary" onClick={() => (state.button = 1)} type="submit" name='gal' disabled>Preview Assembly List</Button>
            <span>&nbsp; </span>         
               <Button variant="danger"  onClick={() => (state.button = 3)} type="submit" name='gal'>Save and Release Assembly List</Button>
                <span>&nbsp; </span>         
                    </Form.Group>
                    </div>
                </div>
             </Form>      
             </Col>
             </Row>
             </Tab.Container>
             </div>
        </>

    )

}




}
export default CreateCustomWindow
