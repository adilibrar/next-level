
import NavMenu from '../Componenets/Common/NavMenu'
import React, { Component, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import AppURL from '../api/AppURL';


function ProjectMTOs(){
  
    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const location = useLocation();
    const status=sessionStorage.getItem('code');
    const[filteredCountries,setFilteredCountries]=useState([]);
  

      const GetMtoDetail=(e,projectId)=>{
        e.preventDefault();
        navigate('/project-mto',{state:{id:projectId}});
      
        //thisClicked.closest("tr").remove();
        //console.log(email);
         }

         const GetAllMtoDetail=(e,projectId)=>{
            e.preventDefault();
            navigate('/all-mto-items',{state:{id:projectId}});
          
            //thisClicked.closest("tr").remove();
            //console.log(email);
             }

             const GetAllMtoData=(e,projectId)=>{
                e.preventDefault();
                navigate('/all-mto-site-issue',{state:{id:projectId}});
              
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
            name:"Sr",
            selector:(row) => row.id,
            sortable:true
        }  ,  
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
            name:"Status",
            selector:(row) => row.status,
            sortable:true
        }  ,  
        {
            name:"Action",
            cell:(row)=>
            <>
            {
            status=='SA' || status=='SI'?   
            <>
            <button className='btn btn-danger'  onClick={(e)=>GetAllMtoData(e,row.id)} ><i className="fa-solid fa-digging"></i> Issue Stock</button>&nbsp;&nbsp;
            </>
            :
            <> <button className='btn btn-danger'  onClick={(e)=>GetAllMtoDetail(e,row.id)} ><i className="fa-solid fa-database"></i> All Items</button>&nbsp;&nbsp;
            <button className='btn btn-danger'  onClick={(e)=>GetMtoDetail(e,row.id)} ><i className="fa-solid fa-share"></i> MTO's</button>
            </>
            }
                
            
            
           
            </>
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
    pagination title="Select Project" 
    fixedHeader 
    fixedHeaderScrollHeight="590px"
    selectableRows
    selectableRowsHighlight
    highlightOnHover
   //</div> actions={
     //   <button className='btn btn-info'>Export</button>
   // }
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

export default ProjectMTOs