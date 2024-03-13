import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import NavMenu from '../Common/NavMenu';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import AppURL from '../../api/AppURL';
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
//import Select from 'react-select';


function CreateWindow(){
    const location = useLocation();
    const[loading,setloading]=useState(true);
    const[stock,setstock]=useState(false);
    const[assembly,setassembly]=useState(false);
    
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
    const[wdata,setwdata]=useState([]);
    const[unit,setUnit]=useState([]);
    const[sproject,setsproject]=useState([]);
    const[Tprofile,setTProfile]=useState([]);
    const [region, setRegion] = useState("");
    const [dimstatus, setDimstatus] = useState();
    const [status, setstatus] = useState(false);
    const project=location.state.project_id;
    const elevation=location.state.elevation_id;
    const[floor,setFloor]=useState([]);
    const[locks,setlock]=useState([]);
    
    const[lockdata,SetLockData]=useState([]);
    
    const[AllCor,setAllCor]=useState([]);
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   
    
let id=2

const state = {
    button: 1
  };

  const CustomDium=()=>{
    setstatus(true)
  }

  const handleBack=()=>{
        setform(true)     
        setstock(false)
        setassembly(false)
  }
const handleSubmit=(e)=>{
    e.preventDefault();

    if(e.target.window.value==''){
      cogoToast.error("Please Select window type...")
    }

    else{

    if(state.button===3){
      //setstock(true)
      //alert("in button 3")
      //alert(elevation)
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
      dim1:e.target.dim1.value,
      dim2:e.target.dim2.value,
      dim3:e.target.dim3.value
      }


      axios.post(AppURL.ReleaseWindow,windowdata,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(proresponse =>{ 
        console.log(proresponse.data['id'])
      //GetCorvision
      if(proresponse.status=='201'){
        if(e.target.dim1.value!='0' && e.target.dim2.value!='0')
        {
          
          const dimdata={
            ReleasedWindowCDim:proresponse.data['id'],
            dim1:e.target.dim1.value,
            dim2:e.target.dim2.value,
            dim3:e.target.dim3.value
            }

            axios.post(AppURL.ReleaseWindowCustomDim,dimdata,{ 
              headers: {
              "Content-Type": "application/json",
              "Authorization": "Token "+sessionStorage.getItem("token"),
            },}).then(proresponse =>{ 
              console.log("Custom Shutters")
            })
        }

        const data={
          width:e.target.width.value,
          height:e.target.height.value,
          wp:e.target.wp.value,
          id:proresponse.data['Window'],
          released:proresponse.data['id'],
          status:'1',
          project:project,
          dim1:e.target.dim1.value,
          dim2:e.target.dim2.value,
          dim3:e.target.dim3.value,  
          d1s1w:e.target.d1s1w.value,
          d1s1h:e.target.d1s1h.value,
          d1s2w:e.target.d1s2w.value,
          d1s2h:e.target.d1s2h.value,
          d2s1w:e.target.d2s1w.value,
          d2s1h:e.target.d2s1h.value
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
                          //setLoading(false);
                         axios.get(AppURL.GetCorvision(e.target.window.value)).then(response=>{
                          setCor(response.data);
                          //setLoading(false);
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
    

 //test
    
    }) 
    }
    else {
        cogoToast.error("Something went wrong...")
       } 
    })

      
    }


    else{

    const data={
        width:e.target.width.value,
        height:e.target.height.value,
        wp:e.target.wp.value,
        id:e.target.window.value,
        status:'0',
        project:project
    }


    setwdata(
      //width=e.target.width.value,
      {
      "width":e.target.width.value,
      "height":e.target.height.value,
      "wind":e.target.wp.value,
      "Finishing":e.target.finishing.value,
      "HandleHeight":e.target.handleheight.value,
      "Lock":e.target.lock.value,
      "LockFinishing":e.target.lockfinishing.value,
      "Glass":e.target.glass.value,
      "Title":e.target.title.value,
      "Quantity":e.target.quantity.value,
      "Elevation":e.target.elevation.value,
      'project':project 
    }
    )

// console.log(setwdata)


    axios.get(AppURL.ProjectDetail(project)).then(response=>{
        setsproject(response.data);
    })

    axios.get(AppURL.GetSingleFloor(elevation)).then(response=>{
      setFloor(response.data);
  })

  axios.get(AppURL.SingleLock(parseInt(e.target.lock.value))).then(response=>{
    SetLockData(response.data);
    setloading(false)
  })
 

  
    //let window=e.target.window.value;
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
                        console.log(packetresponse.data);
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
                            //setLoading(false);
                           axios.get(AppURL.GetCorvision(e.target.window.value)).then(response=>{
                            setCor(response.data);
                            //setLoading(false);
                            
                          //   axios.post(AppURL.GetProfileData,data,{ 
                          //     headers: {
                          //     "Content-Type": "application/json",
                          //     "Authorization": "Token "+sessionStorage.getItem("token"),
                          //   },}).then(proresponse =>{ 
                          //   //GetCorvision
                          //     setTProfile(proresponse.data);
                              
                              
                          // })
                   
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
      
        
        forceUpdate();
        setloading(false);
        setform(false)
        
        if(state.button===2){
            setstock(true)
        }

        if(state.button===1){
            

            setassembly(true)
        }
      
      }) 
    }
  }
    // axios.get(AppURL.GetCutingProfile,data).then(response=>{
    //     setItem(response.data);
        
    //     if(response.data){
    //         //setloading(false)
    //       //  console.log(item)
    //     }
    //     forceUpdate();
    //     })
         //console.log(issue)
        // setLoading(false)
}
// useEffect(()=>{
//           axios.get(AppURL.GetCutingProfile(id)).then(response=>{
//             setItem(response.data);
           
//             if(response.data){
//                 setloading(false)
                
//               //  console.log(item)
//             }
           
//             })

        
//     },[ignored]);


useEffect(()=>{
  axios.get(AppURL.GetLocks).then(response=>{
    setlock(response.data);

    axios.get(AppURL.AllCorWindows).then(response=>{
      setAllCor(response.data);
      //setLoading(false);
    })
  })
        
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
                  {/* <Select
                        name='item'
                        rules={{ required: true }}
                        value={itemvalue}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setItemValue(item);
                        }}
                        options={item.map((guest, index) => {
                        return {
                            label: guest.item['itemcode']+" - "+guest.item['name']+" - "+guest.item['description']+" - "+guest.item['length']+" - "+guest.item['finishing']['name'],
                            value: guest.item['id'],
                            key: index,
                        };
                        })}
                    />
 */}
{/* +"-" +<><img height="30px" width="30px" src={`http://192.168.168.26:8000${guest.image}`} alt="Image NA"  /></>  */}
{/* label:guest.name+ "-" +<div><img height="30px" width="30px" src={`http://192.168.168.26:8000${guest.image}`} alt="Image NA"  /></div>, */}
                         
{/* <div>{guest.name}<img height="30px" width="30px" src={`http://192.168.168.26:8000${guest.image}`} alt="Image NA"  /></div> */}
                  <>
                    <Select className='selectwidth'
                        name='window'
                        rules={{ required: true }}
                        value={region}
                        // key={status}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                       
                        //setDimstatus(region['status'])
                        setRegion(item);
                        //console.log(region['status'])
 
                        //setstatus(status)
                        //console.log(item)

                        }}
                        options={AllCor.map((guest, index) => {
                        return {
                            label:
                            // <div className="country-option">
                            // <img  height="50px" width="50px"  src={`http://192.168.168.26:8000${guest.image}`} alt="country-image" />
                            guest.name
                          // </div>
                            ,
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
                                                   // totalCartPrice += item.unit_price*item.quantity;
                                  return(         
                                                       
                                          <option key={index} value={guest.id}  >{guest.lockitem['itemcode']} - {guest.lockitem['name']}</option>
                                                   
                                         )}
                                         )
                                         }
                           
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
                      <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                          <Form.Label>Custom Shutters</Form.Label>
      
                        <span className='form-inline input-group'>  
                        <Form.Control type="text" placeholder="Shutter 1" defaultValue={'0'} name='dim1' required  />
                        <Form.Control type="text" placeholder="Shutter 2"  defaultValue={'0'}  name='dim2' required  />
                        <Form.Control type="text" placeholder="Shutter 3"  defaultValue={'0'}  name='dim3'/>
                          </span>    
      
                          </Form.Group>
      
                          </div>
                      :
              
  
                    <span className='form-inline input-group'>  
                    <Form.Control type="hidden" placeholder="Shutter 1" defaultValue={'0'} name='dim1' required  />
                    <Form.Control type="hidden" placeholder="Shutter 2"  defaultValue={'0'}  name='dim2' required  />
                    <Form.Control type="hidden" placeholder="Shutter 3"  defaultValue={'0'}  name='dim3'/>
                      </span>    
                    
                    }

                    <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
       
            
               <Button variant="primary" onClick={() => (state.button = 1)} type="submit" name='gal'>Preview Assembly List</Button>
            <span>&nbsp; </span>
               {/* <Button variant="primary" type="submit"  onClick={() => (state.button = 2)} name='gsl'>Preview Stock List</Button>
               &nbsp;&nbsp; */}

               <Button variant="danger" onClick={() => (state.button = 3)} type="submit" name='gal'>Save and Release Assembly List</Button>
                <span>&nbsp; </span>
               {/* <Button variant="danger" type="submit" disabled onClick={() => (state.button = 4)} name='gsl'>Save Stock List</Button>
             */}


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

if(stock){
    return(
        
        <>
        <NavMenu></NavMenu>
      
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
    
        <Col sm={12}>

        <div className='row'>
      <h4>Stock List</h4>
        <div className='col-sm-4'>
        <Table bordered className='delivery-note-fs dntable-border'>
                <thead>
         
                </thead>
                <tbody>
            
            <tr>
            <th>Type</th>
            <td>{Cor.name}</td>
          
            </tr>
               

                </tbody>
            </Table>


            <Table bordered className='delivery-note-fs dntable-border'>
                <thead>
         
                </thead>
                <tbody>
            
            <tr>
            <th>Title</th>
            <th>Width</th>
            <th>Height</th>
            </tr>
                    <tr>
                        <td>{wdata.Title}</td>
                        <td>{wdata.width} MM</td>
                        <td>{wdata.height} MM</td>
                    </tr>
                </tbody>
            </Table>

          

            <Table bordered className='delivery-note-fs dntable-border'>
                <thead>
         
                </thead>
                <tbody>
            
            <tr>
            <th>Project</th>
            <th>Floor</th>
            <th>Elevation</th>
            </tr>
                    <tr>
                        <td>{sproject.name}</td>
                        <td>{floor.title}</td>
                        <td>{wdata.Elevation}</td>

                       
                    </tr>
                </tbody>
            </Table>

            
            <Table bordered className='delivery-note-fs dntable-border'>
                <thead>
         
                </thead>
                <tbody>
            


            <tr>
            <th>Lock Type</th>
            <th>Lock Finish</th>
            <th>Handle Height</th>
            </tr>
                    <tr>
                        <td></td>
                        <td>{wdata.LockFinishing}</td>
                        <td>{wdata.HandleHeight}</td>

                       
                    </tr>


                    
            <tr>
            <th>Approved Glass</th>
            <th>Wind Load</th>
            <th>Quantity</th>
            </tr>
                    <tr>
                        <td>{wdata.Glass}</td>
                        <td>{wdata.wind}</td>
                        <td>{wdata.Quantity}</td>

                       
                    </tr>
                </tbody>
            </Table>
        </div>

        <div className='col-sm-5'>
        <Table bordered className='delivery-note-fs dntable-border'>
                <thead>
                <tr>
                <th>Sr</th>
            <th>Item Code</th>
            <th>Description</th>
            <th>Length</th>

            <th>Qty</th>
            </tr>
                </thead>
                <tbody>
            
                {
            Tprofile.map((singleitem,i)=>{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem[0]}</td>
                        <td>{singleitem[1]}</td>
                        <td>{singleitem[2]}</td>

                      
                        <td>{singleitem[4]}</td>
          
                    </tr>
                )
                
            })
      
      }

               
                </tbody>
            </Table>


        </div>
        <div className='col-sm-3'>
        {<img src={`http://192.168.168.26:8000${Cor.image}`} alt="Image NA"  /> }
        </div>
    </div>
    
   
        </Col>
    </Row>
    </Tab.Container>

    <Button variant="danger" type="submit"  onClick={(e)=>handleBack(e)} name='gsl'>Dismiss</Button>
    </div>
</>
    )
}


if(assembly){

  if(loading){
    return(
      <>Loading Please wait...</>
    )
  }else{
    return(

        <>




        
        <NavMenu></NavMenu>
      
      <div className='container-fluid'>


      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
    
        <Col sm={12}>

        <div className='row'>
        <h4 className='mt-3'>Assembly List</h4>
       


        <div className='row'>
  
    <div className='col-sm-10'>
    <Table bordered className='delivery-note-fs dntable-border'>
            <thead>
     
            </thead>
            <tbody>
        
        <tr>
        <th>Type</th>
        <td>{Cor.name}</td>
      
        </tr>
           

            </tbody>
        </Table>


        <Table bordered className='delivery-note-fs dntable-border'>
            <thead>
     
            </thead>
            <tbody>
        
        <tr>
        <th>Title</th>
        <th>Width</th>
        <th>Height</th>
        </tr>
                <tr>
                    <td>{wdata.Title}</td>
                    <td>{wdata.width} MM</td>
                    <td>{wdata.height} MM</td>
                </tr>
            </tbody>
        </Table>

      

        <Table bordered className='delivery-note-fs dntable-border'>
            <thead>
     
            </thead>
            <tbody>
        
        <tr>
        <th>Project</th>
        <th>Floor</th>
        <th>Elevation</th>
        </tr>
                <tr>
                    <td>{sproject.name}</td>
                    <td>{floor.title}</td>
                    <td>{wdata.Elevation}</td>

                   
                </tr>
            </tbody>
        </Table>

        
        <Table bordered className='delivery-note-fs dntable-border'>
            <thead>
     
            </thead>
            <tbody>
        


        <tr>
        <th>Lock Type</th>
        <th>Lock Finish</th>
        <th>Handle Height</th>
        </tr>
                <tr>
                <td>{lockdata.lockitem['name']}</td>
                    <td>{wdata.LockFinishing}</td>
                    <td>{wdata.HandleHeight}</td>

                   
                </tr>


                
        <tr>
        <th>Approved Glass</th>
        <th>Wind Load</th>
        <th>Quantity</th>
        </tr>
                <tr>
                    <td>{wdata.Glass}</td>
                    <td>{wdata.wind}</td>
                    <td>{wdata.Quantity}</td>

                   
                </tr>
            </tbody>
        </Table>
    </div>

  
      <div className='col-sm-2'>
      {<img src={`http://192.168.168.26:8000${Cor.image}`} alt="Image NA"  /> }
      </div>
  </div>

  <div className='container-fluid'>
    <Alert variant="success" className='d-print-none mt-3'>
     Profiles for {Cor.name} </Alert>
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
            <th>Sr</th>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Description</th>
          <th>UOM</th>
          <th>Cut Length</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>


        </tr>
      </thead>
      <tbody>

        {
            item.map((singleitem,i)=>{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem[0]}</td>
                        <td>{singleitem[1]}</td>
                        <td>{singleitem[2]}</td>

                        <td>
                          {

                          unit.map((un,index)=>{
                                                            
                            if(singleitem[8] == un.id){
                           
                                return(
                                    <td>  {un.name} </td>
                                )
                                
                            }
                          })
                          }
                        </td>
                        <td>{parseFloat(singleitem[3])} MM</td>
                        <td>{singleitem[4]}</td>
                        <td>{singleitem[5]}</td>
                        <td>{singleitem[6]}</td>
                        <td>{singleitem[7]}</td>
                    </tr>
                )
                
            })
      
      }

      

      {
        interlockitem.length > 0?
        <th>Inter Lock Profiles</th>
        :null
      }

      {
          
          interlockitem.map((singleitem,i)=>{
              return(
                  <tr>
                      <td>{i+1}</td>
                      <td>{singleitem[0]}</td>
                      <td>{singleitem[1]}</td>
                      <td>{singleitem[2]}</td>
                      <td>
                        {

                        unit.map((un,index)=>{
                                                          
                          if(singleitem[8] == un.id){
                         
                              return(
                                  <td>  {un.name} </td>
                              )
                              
                          }
                        })
                        }
                      </td>
                      <td>{parseFloat(singleitem[3])} MM</td>
                      <td>{singleitem[4]}</td>
                      <td>{singleitem[5]}</td>
                      <td>{singleitem[6]}</td>
                      <td>{singleitem[7]}</td>
                  </tr>
              )
              
          })
    
    }
      </tbody>
    </Table>



    <Alert variant="success" className='d-print-none'>
     <strong>Accessories</strong> for {Cor.name} </Alert>
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
            <th>Sr</th>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Description</th>
          {/* <th>Cut Length</th> */}
          <th>UOM</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>


        </tr>
      </thead>
      <tbody>

        {
            access.map((singleitem,i)=>{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem[0]}</td>
                        <td>{singleitem[1]}</td>
                        <td>{singleitem[2]}</td>
                        
                        <td>
                          {

                          unit.map((un,index)=>{
                                                            
                            if(singleitem[8] == un.id){
                           
                                return(
                                    <td>  {un.name} </td>
                                )
                                
                            }
                          })
                          }
                        </td>



                        <td>
                            
                            {parseFloat(singleitem[3])}
                            </td>
                        {/* <td>{singleitem[4]}</td> */}
                        <td>{singleitem[5]}</td>
                        <td>{singleitem[6]}</td>
                        <td>{singleitem[7]}</td>
                    </tr>
                )
                
            })
      
      }
      {
        interlockAcc.length > 0?
        <th>Inter Lock Accessories</th>
        :null
      }

      

{
          
  interlockAcc.map((singleitem,i)=>{
      return(
          <tr>
              <td>{i+1}</td>
              <td>{singleitem[0]}</td>
              <td>{singleitem[1]}</td>
              <td>{singleitem[2]}</td>
              <td>
                {

                unit.map((un,index)=>{
                                                  
                  if(singleitem[8] == un.id){
                 
                      return(
                          <td>  {un.name} </td>
                      )
                      
                  }
                })
                }
              </td>
              <td>{parseFloat(singleitem[3])} </td>
             
              <td>{singleitem[5]}</td>
              <td>{singleitem[6]}</td>
              <td>{singleitem[7]}</td>
          </tr>
      )
      
  })

}
      
      </tbody>
    </Table>
   
    <Alert variant="success" className='d-print-none'>
     <strong>Gasket / Weather Strips</strong> for {Cor.name}  </Alert>
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
            <th>Sr</th>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Description</th>
          <th>Cut Length</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>


        </tr>
      </thead>
      <tbody>

        {
            gasket.map((singleitem,i)=>{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem[0]}</td>
                        <td>{singleitem[1]}</td>
                        <td>{singleitem[2]}</td>
                        <td>{parseFloat(singleitem[3])} MTR</td>
                        <td>{singleitem[4]}</td>
                        <td>{singleitem[5]}</td>
                        <td>{singleitem[6]}</td>
                        <td>{singleitem[7]}</td>
                    </tr>
                )
                
            })
      
      }
      </tbody>
    </Table>


    <Alert variant="success" className='d-print-none'>
     <strong>Screws</strong> for {Cor.name} </Alert>
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
            <th>Sr</th>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Description</th>
        
          <th>Quantity</th>
       
          <th>Coating</th>
          <th>Remark</th>


        </tr>
      </thead>
      <tbody>

        {
            screw.map((singleitem,i)=>{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem[0]}</td>
                        <td>{singleitem[1]}</td>
                        <td>{singleitem[2]}</td>
                      
                        <td>{(singleitem[4]*singleitem[3])}</td>
                  
                        <td>{singleitem[6]}</td>
                        <td>{singleitem[7]}</td>
                    </tr>
                )
                
            })
      
      }
      </tbody>
    </Table>


    

    <Alert variant="success" className='d-print-none'>
     <strong>Packing Material</strong> for {Cor.name} </Alert>
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
            <th>Sr</th>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Description</th>
         
          <th>Quantity</th>
        
          <th>Coating</th>
          <th>Remark</th>


        </tr>
      </thead>
      <tbody>

        {
            packing.map((singleitem,i)=>{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem[0]}</td>
                        <td>{singleitem[1]}</td>
                        <td>{singleitem[2]}</td>
                       
                        <td>{singleitem[4]}</td>
                      
                        <td>{singleitem[6]}</td>
                        <td>{singleitem[7]}</td>
                    </tr>
                )
                
            })
      
      }
      </tbody>
    </Table>




    <Alert variant="success" className='d-print-none'>
     <strong>Glass Material</strong> for {Cor.name} </Alert>
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
          <td>Sr.</td>
          <th>Title</th>
          <th>Width</th>
          <th>Height</th>

        </tr>
      </thead>
      <tbody>

{
       glass.map((singleitem,i)=>{
        
        return(
            <tr>
                <td>{i+1}</td>
                <td>{singleitem['0']}</td>
                <td>{singleitem['1']}</td>
                <td>{singleitem['2']}</td>
               
            </tr>
        )
        
    })
}
         
      
      </tbody>
    </Table>
    </div>

        </div>
    
   
        </Col>
    </Row>
    </Tab.Container>
    
    <Button variant="danger" type="submit" className='mb-1' onClick={(e)=>handleBack(e)} name='gsl'>Dismiss</Button>
    </div>
    
</>
    )
}}


}
export default CreateWindow
