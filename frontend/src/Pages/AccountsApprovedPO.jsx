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
function AccountsApprovedPO(){

    const navigate =useNavigate();
    const[mto,setMTO]=useState([]);
    const[projects,setProjects]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredproject,setfilteredproject]=useState([]);
  const [region, setRegion] = useState("");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
const handleSubmit = (e) => {
}


const PODetail=(e,POId)=>{
        e.preventDefault();
        navigate('/po-detail',{state:{POID:POId}});
         }

    const getProjects = async()=>{
        try{
            const response= await axios.get(AppURL.GETAccountsApprovedPO)
            setProjects(response.data);
            setfilteredproject(response.data)
            console.log(response.data)
        }catch(error){
          //  console.log(error);
        }
    }

    const columns =[
        {
            name:"Refrence No",
            selector:(row) => row.id,
            sortable:true
        }  ,  
        {
            name:"Project Name",
            selector:(row) => row.refrence,
            sortable:true
        }  ,  

        {
            name:"Date",
            selector:(row) => row.delivery_date,
            sortable:true
        }  ,  
        {
            name:"Action",
            cell:(row)=>
            <>
            <button className='btn btn-danger'  onClick={(e)=>PODetail(e,row.id)}><i className="fa-solid fa-plus"></i></button>
         </>
        }
    ]



    useEffect(()=>{
        //getMTO()
        getProjects()
    },[ignored]);

    useEffect(()=> {
        const result=projects.filter(po=>{
            return po.refrence.toLowerCase().match(search.toLowerCase());
        });
        setfilteredproject(result);
    },[search])



   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Approved Purchase Orders</Nav.Link>
            </Nav.Item>
        
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <>
                <div className="d-flex flex-column align-items-center">

                <DataTable 
                columns={columns} 
                data={filteredproject} 
                pagination 
                fixedHeader 
                fixedHeaderScrollHeight="590px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input 
                    type="text" 
                    placeholder='Search here' 
                    className='w-25 form-control' 
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}>
                    </input>
                }
                //subHeaderAlign="center"
                ></DataTable>
                </div>
            </>
        
            </Tab.Pane>
            <Tab.Pane eventKey="second">
  
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>




     
      </div>
      </>

    )
}
export default AccountsApprovedPO
