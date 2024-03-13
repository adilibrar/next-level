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


function StockList(){
    const location = useLocation();
    const[loading,setloading]=useState(true);
    const[stock,setstock]=useState(true);
    const[color,setColor]=useState(false);
    
    const[projects,setProject]=useState(false);
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
    //const project=location.state.project_id;
    
    //const elevation=location.state.elevation_id;
    let elevation=1
    const[floor,setFloor]=useState([]);
    const[locks,setlock]=useState([]);
    
    const[lockdata,SetLockData]=useState([]);
    
    const[AllCor,setAllCor]=useState([]);
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   const project=location.state.id;
   const mtostatus=location.state.status;
   const navigate =useNavigate();
    
let id=2

const state = {
    button: 1
  };

  

  const handleBack=()=>{
        
        setstock(true)
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

    axios.get(AppURL.GetFinishing).then(response=>{
        setColor(response.data);
        //setLoading(false);
        
      })
    
    // axios.get(AppURL.GetProfileData(project),{ 
    //     headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Token "+sessionStorage.getItem("token"),
    //   },}).then(proresponse =>{ 
    
    // })
    axios.get(AppURL.GetProfileData(project,mtostatus)).then(response=>{
        //setAllCor(response.data);
        //setLoading(false);
        
            if(response.status=='201'){
            //     //window.location.reload();
                cogoToast.success("MTO Generated Successfully");
                navigate(-1);
            }
            else if(response.status=='202'){
                cogoToast.error("Data not available to create MTO");
                navigate(-1);
                
            }
            else if(response.status=='203'){
                cogoToast.error("Data not available to create Stock List");
                navigate(-1);
            }
            else if(response.status=='204'){
                cogoToast.success("StockList Generated Successfully");
                navigate(-1);
            }
            else{
                setTProfile(response.data);
            }
      })


      
    axios.get(AppURL.ProjectDetail(project)).then(response=>{
        setProject(response.data);
      })
      


  })
        
    },[ignored]);




if(stock){
    return(
        
        <>
        <div className='row col-sm-12'>  
             <div className='col-sm-5'>       
             <img src="https://slimwindows.ae/wp-content/uploads/2021/09/Next-Level-Group-horisontal.jpg" alt="Admin" className="rounded-circle" width="265" />                   
           </div>
                 <div className='col-sm-7 delivery-note-fs'>
                 <Table bordered size="sm" className=' dntable-border'>
             
                 <tbody>
                 <tr>
                 <td>Project No</td>
                 <td>{projects.refrence_no}</td>
             
                 </tr>
                 <tr>
                 <td>Project Name</td>
                 <td>{projects.name}</td>
             
                 </tr>
                 <tr>
                 <td>Date</td>
                 <td>{new Date().toISOString().slice(0, 10)} </td>
             
                 </tr>
             
                 <tr>
         
                 </tr>
                     </tbody>
                 </Table>
                     </div>
 
                 </div>
            
               <div className='row col-sm-12'>
             <div className='col-sm-12'>
                 {/* <h6 className='delivery-note-fs text-center'>Pioneer Metal Industries LLC   Tel: +971-4 8833221,&nbsp;&nbsp;&nbsp;Fax: +971 - 8833224&nbsp;&nbsp;&nbsp;Email: info@pioneer-mi.com</h6> */}
                </div>
                 <div className='col-sm-5'>
              
                     </div>
 
                 </div>
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
    
        <Col sm={12}>

        <div className='row'>
      <h5  className='text-center'>Stock List</h5>
      

        <div className='col-sm-12'>
        <Table bordered className='delivery-note-fs dntable-border'>
                <thead>
                <tr>
                <th>Sr</th>
            <th>Item Code</th>
            <th>Description</th>
            <th>Color</th>
            <th>Length</th>

            <th>Qty</th>
            </tr>
                </thead>
                <tbody>
            
                {
            Tprofile.map((singleitem,i)=>{
                console.log(singleitem)
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem[0]}</td>
                        <td>{singleitem[1]}</td>
                        {
                            color.map((finish,i)=>{
                                if(finish.id==singleitem[4]){
                                    return(
                                        <td>{finish.name}</td>
                                    )
                                    
                                }
                            })
                        }
                        
                        <td>{singleitem[2]}</td>
                        <td>{singleitem[3]}</td>
                        {/* <td>{singleitem[2]}</td>

                      
                        <td>{singleitem[4]}</td> */}
          
                    </tr>
                )
                
            })
      
      }

               
                </tbody>
            </Table>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='col-md-5'>
                    <button className='btn btn-danger'><i className='fa fa-save'></i> Confirm and Release Stock List </button> &nbsp;&nbsp; 
                  </div>

                </div>
                
            </div>
            


            <div></div>
            <br></br>
        </div>
        
    </div>
    
   
        </Col>
    </Row>
    </Tab.Container>
{/* 
    <Button variant="danger" type="submit"  onClick={(e)=>handleBack(e)} name='gsl'>Dismiss</Button> */}
    </div>
</>
    )
}




}
export default StockList
