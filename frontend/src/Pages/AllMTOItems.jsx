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


function AllMTOItems(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[productionstock,setproductionstock]=useState([]);
    const[stock,setStock]=useState([]);
    const [alternative,setAlternative]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const ProjectID=location.state.id;
    const MTOid=location.state.id;
    
    const[mtodata,setMTOData]=useState([]);
    const [pdffile, setPdffile] = useState("");
    const [avq, setAvq]=useState([]);

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


      //getCountries();

        axios.get(AppURL.ProjectAllItems(ProjectID)).then(response=>{
        setItem(response.data);
        })
        console.log(item)
  
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



   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
      
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
        
            </Tab.Pane>
            <Tab.Pane eventKey="second">
     
             <div className='mt-5'></div>

             <Alert variant="primary" className='d-print-none'>
          Here is the list of MTO items(Accessory) For Site.
        </Alert>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>sr</th>
          <th>Code</th>
          <th>Name</th>
         
          <th className='d-print-none'>Color</th>
          <th>QTY</th>
          <th className='d-print-none'>MQ</th>
          <th className='d-print-none'>Legth</th>
          <th className='d-print-none'>Color</th>
          <th className='d-print-none'>AV</th>
          <th className='d-print-none'>Remarks</th>
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
                  if(single.itemname['type']['id']=='2'){

                  
                    return(
                     
                                 
                          (single.itemname['alternate']=='1')?
                            
                            <tr key={i} className='less-qty-new'>
                            <td>{i+1}</td>
                            <td>{single.itemname['itemcode']}</td>
                            <td>{single.itemname['name']}
                            <br></br>
                          
                 
                        
                            </td>
                            
                            <td  className='d-print-none'>{single.itemname['finishing']['name']}</td>
                            <td>{single.quantity}</td>
                            <td  className='d-print-none'>{single.extra_quantity}</td>
                            <td  className='d-print-none'>{single.itemname['length']}</td>
                            <td>{single.color}</td>
                        
                            {
                            parseInt(avqty)<parseInt(parseInt(single.quantity)+parseInt(single.extra_quantity))?
                            <td className='less-qty d-print-none'>{avqty}</td>
                            :
                            <td>{avqty}</td>
                            
                            }
                              <td  className='d-print-none'>{single.remarks}</td>
                            
                     
                        </tr>
                        :
                        <tr key={i}>
                        <td>{i+1}</td>
                        <td >{single.itemname['itemcode']}</td>
                        <td>{single.itemname['name']}
                        </td>
                        
                        <td  className='d-print-none' >{single.itemname['finishing']['name']}</td>
                        <td>{single.quantity}</td>
                        <td className='d-print-none'>{single.extra_quantity}</td>
                        <td className='d-print-none'>{single.itemname['length']}</td>
                        <td className='d-print-none'>{single.color}</td>
                     
                        {
                        parseInt(avqty)<parseInt(parseInt(single.quantity)+parseInt(single.extra_quantity))?
                        <td className='d-print-none less-qty'>{avqty}</td>
                        :
                        <td className='d-print-none'>{avqty}</td>
                        
                        }
                          <td className='d-print-none'>{single.remarks}</td>
                        
                        
                     
                    </tr>

                            
                      )
                    }
        }
      )
      }
      </tbody>
    </Table>

            </Tab.Pane>
            This is a computer-generated Report; no signature is needed. If there are any missing or problematic items, please get in touch with the technical team immediately.
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>




     
      </div>
      </>

    )
}
export default AllMTOItems
