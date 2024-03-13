
import NavMenu from '../Componenets/Common/NavMenu'
import React, { Component, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Navigate } from 'react-router-dom';
import AppURL from '../api/AppURL';


function CorProject(){
  
    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredCountries,setFilteredCountries]=useState([]);
    


      const ProjectPageDetail=(e,projectId)=>{
        e.preventDefault();
        navigate('/project-floor',{state:{id:projectId}});
      
        //thisClicked.closest("tr").remove();
        //console.log(email);
         }

         
      const ProjectStock=(e,projectId)=>{
        e.preventDefault();
        navigate('/stock-list',{state:{id:projectId}});
      
        //thisClicked.closest("tr").remove();
        //console.log(email);
         }
    const getCountries = async()=>{
        try{
            const response= await axios.get(AppURL.ProjectList)
            setCountries(response.data);
            setFilteredCountries(response.data)
           // console.log(countries);
        }catch(error){
            console.log(error);
        }
    }
    
    const columns =[
        {
            name:"Refrence No",
            selector:(row) => row.refrence_no,
            sortable:true
        }  ,  
        {
            name:"Project Name",
            selector:(row) => row.name,
            sortable:true
        }  ,  

        {
            name:"Starting Date",
            selector:(row) => row.created_at,
            sortable:true
        }  ,  

        {
            name:"Completion Date",
            selector:(row) => row.completed_at,
            sortable:true
        }  ,  

        {
            name:"Status",
            selector:(row) => row.status,
            sortable:true
        }  ,  

        {
            name:"Action",
            cell:(row)=>
            <><button className='btn btn-danger'  onClick={(e)=>ProjectStock(e,row.id)}>Generate Stock List</button>  &nbsp;&nbsp;<button className='btn btn-danger'  onClick={(e)=>ProjectPageDetail(e,row.id)}><i className="fa-solid fa-share"></i></button>  </>
            
        }
    ]

    useEffect(()=>{
        getCountries()
    },[]);

    useEffect(()=> {
        const result=countries.filter(country=>{
            return country.refrence_no.toLowerCase().match(search.toLowerCase());
        });
        setFilteredCountries(result);
    },[search])
return(

    <>
    <NavMenu></NavMenu>
    <div className="d-flex flex-column align-items-center">

    <DataTable 
    columns={columns} 
    data={filteredCountries} 
    pagination title="Projects" 
    fixedHeader 
    fixedHeaderScrollHeight="590px"
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    actions={
        <button className='btn btn-info'>Export</button>
    }
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
    ></DataTable>
    </div>
    </>
)

}

export default CorProject