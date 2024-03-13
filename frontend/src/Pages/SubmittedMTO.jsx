import React, { Component, Fragment ,useEffect,useState} from 'react'
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
function SubmittedMTO(){

    const navigate =useNavigate();
    const[mto,setMTO]=useState([]);
    const[projects,setProjects]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredMto,setfilteredMto]=useState([]);
  const [region, setRegion] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.project.value===''){
        cogoToast.error("Please select Project",{position:'top-right'});   
    }

else{
        const data={
            projectmto:e.target.project.value,
            title:e.target.description.value,
            description:e.target.description.value,
            revision:e.target.revision.value,
            extra:e.target.extra.value,

        }
        axios.post(AppURL.AddMTO,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
            if(response.status===201){
                 cogoToast.success("MTO Added Sucessfully ...",{position:'top-right'});

//                 const response= axios.get(AppURL.MTOList)
            axios.get(AppURL.MTOList).then(response=>{
                 setMTO(response.data);
                 setfilteredMto(response.data)

            })

            }
                
        })
    

}
    
};


const MTODetailForDeliveryNote=(e,MtoId)=>{
  e.preventDefault();
  navigate('/issue-reserve-stock',{state:{MTOid:MtoId}});
   }

  const MTODetailReturn=(e,MtoId)=>{
    e.preventDefault();
    navigate('/return-issue-stock',{state:{MTOid:MtoId}});
  }

  
  const MTOIssueSite=(e,MtoId)=>{
    e.preventDefault();
    navigate('/site-issue-item',{state:{MTOid:MtoId}});
  }
  

  
   

const MTODetail=(e,MtoId)=>{
        e.preventDefault();
        navigate('/submitted-mto-detail',{state:{MTOid:MtoId}});
         }
const getMTO = async()=>{
        try{
            const response= await axios.get(AppURL.MTOListSubmitted)
            setMTO(response.data);
            setfilteredMto(response.data)
        }catch(error){
            console.log(error);
        }
    }

    

    const columns =[
        {
            name:"Sr.no",
            selector:(row) => row.id,
            sortable:true
        }  ,  
        {
            name:"Project",
            selector:(row) => row.projectmto['name'],
            sortable:true
        }  ,  

        {
            name:"Refrence No",
            selector:(row) => row.projectmto['refrence_no'],
            sortable:true
        }  ,  

        {
            name:"Revision",
            selector:(row) => row.revision,
            sortable:true
        }  ,  

        {
            name:"Extra",
            selector:(row) => row.extra,
            sortable:true
        }  ,  

        {
            name:"Action",
            cell:(row)=>
            <>
            <button className='btn btn-danger'  onClick={(e)=>MTODetail(e,row.id)}><i className="fa-solid fa-folder-open"></i></button>
            &nbsp;&nbsp;
            <button className='btn btn-danger'  onClick={(e)=>MTODetailForDeliveryNote(e,row.id)}><i class="fa-sharp fa-solid fa-truck"></i></button>
            &nbsp;&nbsp;
            <button className='btn btn-danger'  onClick={(e)=>MTODetailReturn(e,row.id)}><i className="fa-solid fa-rotate-left"></i></button>
            &nbsp;&nbsp;
            <button className='btn btn-danger'  onClick={(e)=>MTOIssueSite(e,row.id)}><i class="fa-sharp fa-solid fa-person-digging"></i></button>     
            </>
            
        }
    ]



    useEffect(()=>{
        const check_login=sessionStorage.getItem('login');
        const status=sessionStorage.getItem('code');
          if(!check_login){
              navigate('/login')
            }
            else if(check_login){
            
              if(status==='SI'|| status==='SA'){

              }
              else{
                navigate('/');
                alert('you are not allowed to access , your action will be reported');
              }
            }    
        getMTO()

    },[]);

    useEffect(()=> {
        const result=mto.filter(country=>{
            return country.projectmto['name'].toLowerCase().match(search.toLowerCase());
        });
        setfilteredMto(result);
    },[search])



   return(
        <>
                <NavMenu></NavMenu>
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Submitted MTO</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <>
                <div className="d-flex flex-column align-items-center">

                <DataTable 
                columns={columns} 
                data={filteredMto} 
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
            </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>




     
      </div>
      </>

    )
}
export default SubmittedMTO
