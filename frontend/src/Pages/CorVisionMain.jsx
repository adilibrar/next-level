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


function CorVisionMain(){
    const location = useLocation();
    const[loading,setloading]=useState(true);
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
    
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   
    
let id=2


const handleSubmit=(e)=>{
    e.preventDefault();
    const data={
        width:e.target.width.value,
        height:e.target.height.value,
        wp:e.target.wp.value,
        id:e.target.window.value,
    }


    setwdata(
      //width=e.target.width.value,
      {"width":e.target.width.value,
      "height":e.target.height.value
    }
    )

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

                            //GetCorvision
                   
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
      }) 
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




// if(loading){
//     return(
//         <h1>Loading</h1>
//     )
// }

   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
    
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="second">

            <Form onSubmit={handleSubmit}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Actual Width and Height</Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Width" name='width' required  />
                  <Form.Control type="text" placeholder="Height" name='height' required />
                  <Form.Control type="text" placeholder="Wind Power" name='wp' required />
                  <select name='window'>
                    <option value="2" >CORVision Plus Slide + Fix Integrated</option>
                    <option value="3" >CORVision Plus Slide + Fix Exposed</option>
                  </select>
            
               <Button variant="primary" type="submit">Generate Cutting List</Button>
            
           
                    </span>    

                    </Form.Group>

                    </div>


                    <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Actual Width and Height</Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Width" name='width' required  />
                  <Form.Control type="text" placeholder="Height" name='height' required />
                  <Form.Control type="text" placeholder="Wind Power" name='wp' required />
                  <select name='window'>
                    <option value="2" >CORVision Plus Slide + Fix Integrated</option>
                    <option value="3" >CORVision Plus Slide + Fix Exposed</option>
                  </select>
            
               <Button variant="primary" type="submit">Generate Cutting List</Button>
            
           
                    </span>    

                    </Form.Group>

                    </div>

                </div>
             </Form>






    <div className='mt-5'>


    </div>

    <div className='row'>
      <h4>Cutting List</h4>
        <div className='col-sm-6'>
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
                        <td>W-01</td>
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
                        <td>KSA-Guest House</td>
                        <td>Ground Floor</td>
                        <td>Front</td>

                       
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
                        <td>NA</td>
                        <td>Black Anodized</td>
                        <td>Front</td>

                       
                    </tr>
                </tbody>
            </Table>
        </div>
        <div className='col-sm-6'>
        {<img src={`http://192.168.168.26:8000${Cor.image}`} alt="Image NA"  /> }
        </div>
    </div>
    <Alert variant="success" className='d-print-none'>
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
            console.log(interlockitem)
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
     <strong>Accessories</strong> for CorVision Plus Integrated 1Fix + 1Sliding </Alert>
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
    console.log(interlockitem)
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
     <strong>Gasket</strong> for CorVision Plus Integrated 1Fix + 1Sliding </Alert>
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
     <strong>Screws</strong> for CorVision Plus Integrated 1Fix + 1Sliding </Alert>
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
     <strong>Packing Material</strong> for CorVision Plus Integrated 1Fix + 1Sliding </Alert>
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
     <strong>Glass Material</strong> for CorVision Plus Integrated 1Fix + 1Sliding </Alert>
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

      <>
<tr>
<td>1</td>
          <td>{glass[0]}</td>
          <td>{glass[1]}</td>
          <td>{glass[2]}</td>
          </tr>


          <tr>
<td>2</td>
          <td>{glass[3]}</td>
          <td>{glass[4]}</td>
          <td>{glass[5]}</td>
          </tr>
          </>
         
      
      </tbody>
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
export default CorVisionMain
