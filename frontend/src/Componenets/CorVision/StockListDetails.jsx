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


function StockListDetails(){
    const location = useLocation();
    const[loading,setloading]=useState(false);
    const[stock,setstock]=useState(true);
    const[color,setColor]=useState(false);
    
    const[projects,setProject]=useState(false);
    const[stocklistdata,setStockListData]=useState([]);
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
    const[stocklist,setStocklist]=useState([]);
    
    const[lockdata,SetLockData]=useState([]);
    const[notes,setnotes]=useState([]);
    
    
    const[AllCor,setAllCor]=useState([]);
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   const project=location.state.project;
   const stockid=location.state.stock;
   const[validatemto,Setvalidatemto]=useState(false); 
   const navigate =useNavigate();
    
let id=2

const state = {
    button: 1
  };

  
function validateData(){
    Setvalidatemto(true)
    axios.get(AppURL.ValidateStockList(stockid,project)).then(response=>{
        setnotes(response.data)
    })

    console.log(notes)
}
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
    axios.get(AppURL.GetFinishing).then(cresponse=>{

        setColor(cresponse.data);

        axios.get(AppURL.GetSingleStockList(stockid)).then(response=>{
            setStocklist(response.data);

        axios.get(AppURL.ProjectDetail(project)).then(presponse=>{

            setProject(presponse.data);

            axios.get(AppURL.GetSingleStockListDetail(stockid)).then(sresponse=>{

                setStockListData(sresponse.data);
    
                setloading(true);
                
              })
            console.log(stocklistdata)
          })
        //setLoading(false);
      })
    
    // axios.get(AppURL.GetProfileData(project),{ 
    //     headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Token "+sessionStorage.getItem("token"),
    //   },}).then(proresponse =>{ 
    
    // })

      


  })
        
    },[ignored]);

if(loading){
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
                 <td>Refrence No</td>
                 <td>{projects.refrence_no} - {stocklistdata.id}</td>
             
                 </tr>
                 <tr>
                 <td>Project Name</td>
                 <td>{projects.name}</td>
             
                 </tr>
                 <tr>
                 <td>Date</td>
                 {/* <td>{new Date().toISOString().slice(0, 10)} </td> */}
                 <td>{stocklistdata.created_at}</td>
             
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
            stocklist.map((singleitem,i)=>{
              
                return(
                    <tr>
                        <td>{i+1}</td>
                        <td>{singleitem.StockListItem['itemcode']}</td>
                        <td>{singleitem.StockListItem['description']}</td>
                        {
                            color.map((finish,i)=>{
                                if(finish.id==singleitem.StockListItem['finishing']){
                                    return(
                                        <td>{finish.name}</td>
                                    )
                                    
                                }
                            })
                        }
                        
                        <td>{singleitem.StockListItem['length']}</td>
                        <td>{singleitem.quantity}</td>
                        {/* <td>{singleitem[2]}</td>

                      
                        <td>{singleitem[4]}</td> */}
          
                    </tr>
                )
                
            })
      
      }

               
                </tbody>
            </Table>
            {/* <div className='row'>
                <div className='col-md-12'>
                    <div className='col-md-5'>
                    <button className='btn btn-danger'><i className='fa fa-print'></i> Print</button> &nbsp;&nbsp; 
                  </div>

                </div>
                
            </div>
             */}


            <div></div>
            <br></br>
        </div>
        
    </div>
    {
        validatemto?

            <p>The Technical Department has verified and approved this document at&nbsp; 
            {
                Date()
            }
            {
            notes.length>0?
                <p>The items listed below are either missing or insufficient:<b> {notes} </b>Requires action.</p>
            
            :null
    }

            </p>
        :
        <button onClick={validateData} className='btn btn-success'>Validate Stock List</button>
    }
   
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
export default StockListDetails
