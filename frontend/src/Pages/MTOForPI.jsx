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
function MTOForPI(){

    const navigate =useNavigate();
    const[mto,setMTO]=useState([]);
    const[projects,setProjects]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredproject,setfilteredproject]=useState([]);
  const [region, setRegion] = useState("");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
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
            axios.get(AppURL.POLIST).then(response=>{
                 setProjects(response.data);
                 setfilteredproject(response.data)

            })
           
                // navigate('/project-mto');
                // const  newitem =  response.data;
                // setItem(oldItem=>[...oldItem,newitem])
                 //  forceUpdate();

            }
                
        })
    

}
    
};


const PODetail=(e,POId)=>{
        e.preventDefault();
        navigate('/mto-for-pi-details',{state:{POID:POId}});
         }

    const getProjects = async()=>{
        try{
            const response= await axios.get(AppURL.POLISTPI)
            setProjects(response.data);
            setfilteredproject(response.data)
            //console.log(response.data)
        }catch(error){
            console.log(error);
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
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Purchase Order</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" disabled>Create PO</Nav.Link>
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
                        <div className='col-md-2'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Margin  </Form.Label>
                  <span className='form-inline input-group'>  
                  <Form.Control type="number" placeholder="Margin Percentage" name='extra'  />
                    </span>
                    </Form.Group>

                    </div>



                    <div className='col-md-2'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Review </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="number" placeholder="Review" defaultValue={'1'} name='revision'  />
                  
                    </span>
                    </Form.Group>

                    </div>


                    <div className='col-md-8'>
                    <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Description </Form.Label>
                  <span className='form-inline input-group'>  
              <Form.Control type="text" placeholder="Description"  name='description' value={'NA'} />
                  
                    </span>
                    </Form.Group>

                    </div>
        </div>
                <Button variant="primary" type="submit">
                    Create MTO
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
export default MTOForPI
