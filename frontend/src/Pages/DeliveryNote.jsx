import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import { Container } from 'react-bootstrap';
import { redirect, useLocation } from 'react-router-dom'
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
function DeliveryNote(){

    const navigate =useNavigate();
    const[mto,setMTO]=useState([]);
    const[projects,setProjects]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredMto,setfilteredMto]=useState([]);
  const [region, setRegion] = useState("");
  const[checkstatus,setcheckstatus]=useState(false)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.project.value===''){
        cogoToast.error("Please select Project",{position:'top-right'});   
    }

else{
        const data={
            dnproject:e.target.project.value,
            description:e.target.description.value,
            deliveredto:e.target.deliveredto.value,
            revision:e.target.revision.value,
            copy:e.target.revision.value,

        }
        axios.post(AppURL.AddDN,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
            if(response.status===201){
                 cogoToast.success("Delivery Note Created Sucessfully ...",{position:'top-right'});

//                 const response= axios.get(AppURL.MTOList)
            axios.get(AppURL.MTOList).then(response=>{
                 setMTO(response.data);
                 setfilteredMto(response.data)

            })
           
                navigate('/submitted-mto');
                // const  newitem =  response.data;
                // setItem(oldItem=>[...oldItem,newitem])
              //forceUpdate();

            }
               
        })
}
    
};
const MTOCopy=(e,DnID,projectdn,revision,deliverto,projectname,copy)=>{
    e.preventDefault();
    if(copy=='1'){
        cogoToast.error("Please use latest copy of Revised Delivery Note...",{position:'top-right'});
    }
    else{
    const data={
        dnproject:projectdn,
        revision:(parseInt(revision)+1),
        deliveredto:deliverto,
        note:"Copy of "+projectname,
        description:"This is "+(parseInt(revision)+1)+" revision of "+projectname,

    }

    const data_copied={
        id:DnID,
        copy:'1'
      }



    axios.post(AppURL.AddDN,data,{ 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}).then(response =>{  

        axios.patch(AppURL.UpdateDNStatus,data_copied,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response =>{  
            if(response.status===201){
                 cogoToast.success("Delivery Note Copied Successfully...",{position:'top-right'});
        
            }
        })

    
        //console.log(response.data.id);
        if(response.status===201){

            axios.get(AppURL.DNItemCopy(response.data.id,DnID),{ 
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+sessionStorage.getItem("token"),
              },}).then(response =>{ 
                cogoToast.success("Copy of Delivery Note Generated Sucessfully ...",{position:'top-right'});
                forceUpdate(); 

              })
        }
        
    })
}
}


const MTODetail=(e,MtoId)=>{
        e.preventDefault();
        navigate('/dn-detail',{state:{MTOid:MtoId}});
         }
const getMTO = async()=>{
        try{
            const response= await axios.get(AppURL.DNList)
            setMTO(response.data);
            setfilteredMto(response.data)
        }catch(error){
            console.log(error);
        }
    }

    const getProjects = async()=>{
        try{
            const response= await axios.get(AppURL.ProjectList)
            setProjects(response.data);
        }catch(error){
            console.log(error);
        }
    }

    const columns =[
        {
            name:"DN.no",
            selector:(row) => row.id,
            sortable:true
        }  ,  
        {
            name:"Project",
            selector:(row) => row.dnproject['name'],
            sortable:true
        }  ,  

        {
            name:"Refrence No",
            selector:(row) => row.dnproject['refrence_no'],
            sortable:true
        }  ,  

        {
            name:"Revision",
            selector:(row) => row.revision,
            sortable:true
        }  ,  

        {
            name:"DN.For",
            selector:(row) => row.deliveredto,
            sortable:true
        }  ,  

        {
            name:"Date",
            selector:(row) => row.created_at,
            sortable:true
        }  ,  
        {
            name:"Action",
            cell:(row)=>
            <>
            <button  className='btn btn-danger'  onClick={(e)=>MTODetail(e,row.id)}><i className="fa-solid fa-eye"></i></button>
            &nbsp;&nbsp;
            <button  className='btn btn-danger' disabled onClick={(e)=>MTOCopy(e,row.id,row.dnproject['id'],row.revision,row.deliveredto,row.dnproject['name'],row.copy)}><i className="fa-solid fa-copy"></i></button>
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
              if(status==='SI' || status==='SA'){
                if(status==='SA'){
                    setcheckstatus(true)
                    getMTO()
                    getProjects()     
                }
                   else{
                    getMTO()
                    getProjects() 
                   }  
              }
              else{
                navigate('/')
              }
            }

    },[ignored]);

    useEffect(()=> {
        const result=mto.filter(country=>{
            return country.dnproject['name'].toLowerCase().match(search.toLowerCase());
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
              <Nav.Link eventKey="first">Delivery Note</Nav.Link>
            </Nav.Item>
            {
                checkstatus?
                null
                :
                    <Nav.Item>
                    <Nav.Link eventKey="second">Create Delivery Note</Nav.Link>
                </Nav.Item>
            }
        
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
            <Tab.Pane eventKey="second">
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Project Name</Form.Label>
                    <>
                    <Select
                        name='project'
                        rules={{ required: true }}
                        value={region}
                        required={true}
                        onChange={(item) => {
                       // console.log(item);
                        setRegion(item);
                        
                        }}
                        options={projects.map((guest, index) => {
                        return {
                            label: guest.name,
                            value: guest.id,
                            key: index,
                        };
                        })}
                    />
             
                 {region.value}
                    </>

                    <Form.Text className="text-muted">
                        Please select the project to create MTO.
                    </Form.Text>
                </Form.Group>

     

            <div className='col-md-12 row'>
                        <div className='col-md-3'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Delivered To  </Form.Label>
                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Company or Person Name" name='deliveredto'  />
                    </span>
                    </Form.Group>

                    </div>


                    <div className='col-md-1'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Copy</Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="number" placeholder="Review" defaultValue={'1'} name='revision'  />
                  
                    </span>
                    </Form.Group>

                    </div>


                    <div className='col-md-8'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Note</Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder="Description"  name='description' defaultValue={'NA'} />
                  
                    </span>
                    </Form.Group>

                    </div>
        </div>
                <Button variant="primary" type="submit">
                    Create Delivery Note
                </Button>
             </Form>
             
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>




     
      </div>
      </>

    )
}
export default DeliveryNote
