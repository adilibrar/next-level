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


function SavedWindow(){
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
    const[wdata2,setwdata2]=useState([]);
    const[unit,setUnit]=useState([]);
    const[sproject,setsproject]=useState([]);
    const[Tprofile,setTProfile]=useState([]);
    const[profile,setProfile]=useState([]);
    //const project=location.state.project_id;
    const window=location.state.window_id;
    const[floor,setFloor]=useState([]);
    const[locks,setlock]=useState([]);
    

   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   
    
let id=2

const state = {
    button: 1
  };

  

  const handleBack=()=>{
        setform(true)     
        setstock(false)
        setassembly(false)
  }


useEffect(()=>{



    axios.get(AppURL.SingleWindowData(window)).then(response=>{
        setwdata(response.data);
        axios.get(AppURL.WindowProfileDetail(window)).then(response=>{
            setProfile(response.data);
            
            axios.get(AppURL.UnitOfMeasure).then(response=>{
                setUnit(response.data);


                axios.get(AppURL.WindowInterLockDetail(window)).then(response=>{
                    setinterlockitem(response.data);
                    
                
                    axios.get(AppURL.WindowAccDetail(window)).then(response=>{
                        setaccess(response.data);
                        //setloading(false);
                    
                        axios.get(AppURL.WindowDataAccInterlock(window)).then(response=>{
                            setinterlockAcc(response.data);
                            //setloading(false);
                        
                            

                            axios.get(AppURL.WindowDataScrew(window)).then(response=>{
                                setScrew(response.data);
                                //setloading(false);
                                axios.get(AppURL.WindowDataGasket(window)).then(response=>{
                                    setgasket(response.data);
                                    //setloading(false);
                                    axios.get(AppURL.WindowDataGlass(window)).then(response=>{
                                        setGlass(response.data);
                                        //setloading(false);
                                        axios.get(AppURL.WindowDataPacking(window)).then(wresponse=>{
                                            setPacking(wresponse.data);
                                            setloading(false);
                                           
                                        
                                          })
                                      })
                                  })
                              })
                          })
                      })

                      
                    
                  })
                
        })
          })
    })


        
    },[ignored]);



if(loading){
    return(
        <>Loading Please Wait...</>
    )
}

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
  
    <div className='col-sm-9'>
    <Table bordered className='delivery-note-fs dntable-border'>
            <thead>
     
            </thead>
            <tbody>
        
        <tr>
        <th>Type</th>
        <td>{wdata.Window['name']}</td>
      
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
                    <td>{wdata.title}</td>
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
                    <td>{wdata.Windowproject['name']}</td>
                    <td>{wdata.Windowfloor['title']}</td>
                    <td>{wdata.elevation}</td>

                   
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
                    <td>{wdata.WindowLock.lockitem['name']}</td>
                    <td>{wdata.LockFinishing}</td>
                    <td>{wdata.LockHeight}</td>

                   
                </tr>


                
        <tr>
        <th>Approved Glass</th>
        <th>Wind Load</th>
        <th>Quantity</th>
        </tr>
                <tr>
                    <td>{wdata.GlassColor}</td>
                    <td>{wdata.windload}</td>
                    <td>{wdata.quantity}</td>

                   
                </tr>
            </tbody>
        </Table>
    </div>

  
      <div className='col-sm-3'>
      {<img style={{width:'75%'}} src={`http://192.168.168.236:8000${wdata.Window['image']}`} alt="Image NA"  /> }
      </div>
  </div>

  <div className='container-fluid'>
    <Alert variant="success" className='d-print-none mt-3'>
     Profiles for {wdata.title} ({wdata.Window['name']})</Alert>
    <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
            <th>Sr</th>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Description</th>
          <th>UOM</th>
          <th>Length</th>
          <th>Quantity</th>
          <th>Cutting</th>
          <th>Coating</th>
          <th>Remark</th>


        </tr>
      </thead>
      <tbody>

        {
            profile.map((singleitem,i)=>{
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem.ReleasedWindowPItem['itemcode']}</td>
                        <td>{singleitem.ReleasedWindowPItem['name']}</td>
                        <td>{singleitem['description']}</td>

                        <td>
                          {

                          unit.map((un,index)=>{
                                                            
                            if(parseInt(singleitem.ReleasedWindowPItem['unit']) == un.id){
                           
                                //if(singleitem[8] == un.id){
                         
                                    return(
                                        <td>  {un.name} </td>
                                    )
                                    
                                }
                           
                          })
                          }
                        </td>
                        <td>{parseFloat(singleitem['cutlength'])} MM</td>
                        <td>{singleitem['quantity']*wdata.quantity}</td>
                        <td>{singleitem['cutting']}</td>
                        <td>{singleitem['coating']}</td>
                        <td>{singleitem['remark']}</td>
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
                    <td>{singleitem.ReleasedWindowInterProfile['itemcode']}</td>
                    <td>{singleitem.ReleasedWindowInterProfile['name']}</td>
                    <td>{singleitem['description']}</td>

                    <td>
                      {

                      unit.map((un,index)=>{
                                                        
                        if(parseInt(singleitem.ReleasedWindowInterProfile['unit']) == un.id){
                       
                            //if(singleitem[8] == un.id){
                     
                                return(
                                    <td>  {un.name} </td>
                                )
                                
                            }
                       
                      })
                      }
                    </td>
                    <td>{parseFloat(singleitem['cutlength'])} MM</td>
                    <td>{singleitem['quantity']*wdata.quantity}</td>
                    <td>{singleitem['cutting']}</td>
                    <td>{singleitem['coating']}</td>
                    <td>{singleitem['remark']}</td>
                </tr>
            )
              
          })
    
    }
      </tbody>
    </Table>



    <Alert variant="success" className='d-print-none'>
     <strong>Accessories</strong> for {wdata.title} ({wdata.Window['name']})</Alert>
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
                        <td>{singleitem.ReleasedWindowAcc['itemcode']}</td>
                        <td>{singleitem.ReleasedWindowAcc['name']}</td>
                        <td>{singleitem['description']}</td>
                        
                        <td>
                          {

                        unit.map((un,index)=>{
                                                                                
                            if(parseInt(singleitem.ReleasedWindowAcc['unit']) == un.id){
                        
                                //if(singleitem[8] == un.id){
                        
                                    return(
                                        <td>  {un.name} </td>
                                    )
                                    
                                }
                        
                        })
                          }
                        </td>



                        <td>
                            
                        <td>{singleitem['quantity']*wdata.quantity}</td>
                            </td>
                        {/* <td>{singleitem[4]}</td> */}
                        <td>{singleitem['cutting']}</td>
                    <td>{singleitem['coating']}</td>
                    <td>{singleitem['remark']}</td>
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
    console.log(interlockitem)
    return(
        <tr>
            <td>{i+1}</td>
            <td>{singleitem.ReleasedWindowInterAcc['itemcode']}</td>
            <td>{singleitem.ReleasedWindowInterAcc['name']}</td>
            <td>{singleitem['description']}</td>
            
            <td>
              {

            unit.map((un,index)=>{
                                                                    
                if(parseInt(singleitem.ReleasedWindowInterAcc['unit']) == un.id){
            
                    //if(singleitem[8] == un.id){
            
                        return(
                            <td>  {un.name} </td>
                        )
                        
                    }
            
            })
              }
            </td>



            <td>
                
            <td>{singleitem['quantity']*wdata.quantity}</td>
                </td>
            {/* <td>{singleitem[4]}</td> */}
            <td>{singleitem['cutting']}</td>
        <td>{singleitem['coating']}</td>
        <td>{singleitem['remark']}</td>
        </tr>
    )
      
  })

}
      
      </tbody>
    </Table>
   
    <Alert variant="success" className='d-print-none'>
     <strong>Gasket</strong> for {wdata.title} ({wdata.Window['name']})  </Alert>
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
                        <td>{singleitem.ReleasedWindowGasket['itemcode']}</td>
                        <td>{singleitem.ReleasedWindowGasket['name']}</td>
                        <td>{singleitem['description']}</td>
                        <td>{parseFloat(singleitem['cutlength'])} MTR</td>
                        <td>{singleitem['quantity']*wdata.quantity}</td>          
                        <td>{singleitem['cutting']}</td>
                        <td>{singleitem['coating']}</td>
                        <td>{singleitem['remark']}</td> 
                    </tr>
                )
                
            })
      
      }
      </tbody>
    </Table>


    <Alert variant="success" className='d-print-none'>
     <strong>Screws</strong> for {wdata.title} ({wdata.Window['name']})</Alert>
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
                        <td>{singleitem.ReleasedWindowSc['itemcode']}</td>
                        <td>{singleitem.ReleasedWindowSc['name']}</td>
                        <td>{singleitem['description']}</td>
                        <td>{singleitem['quantity']*wdata.quantity}</td>        
                        <td>{singleitem['coating']}</td>
                        <td>{singleitem['remark']}</td> 
                    </tr>
                )
                
            })
      
      }
      </tbody>
    </Table>


    

    <Alert variant="success" className='d-print-none'>
     <strong>Packing Material</strong> for {wdata.title} ({wdata.Window['name']}) </Alert>
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
                        <td>{singleitem.ReleasedWindowPac['itemcode']}</td>
                        <td>{singleitem.ReleasedWindowPac['name']}</td>
                        <td>{singleitem['description']}</td>
                       
                        <td>{singleitem['quantity']*wdata.quantity}</td>        
                        <td>{singleitem['coating']}</td>
                        <td>{singleitem['remark']}</td> 
                    </tr>
                )
                
            })
      
      }
      </tbody>
    </Table>




    <Alert variant="success" className='d-print-none'>
     <strong>Glass Material</strong> for {wdata.title} ({wdata.Window['name']}) </Alert>
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
                        <td>{singleitem.title}</td>
                        <td>{singleitem.width}</td>
                        <td>{singleitem.height}</td>
                       
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
    
    </div>
    
</>
    )



}
export default SavedWindow
