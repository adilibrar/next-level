import React, { Component, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ItemPage from '../../Pages/ItemPage';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import NavMenu from '../Common/NavMenu';

function Elevation(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredCountries,setFilteredCountries]=useState([]);
    const [loading,setLoading]=useState(true);
    const location = useLocation();
    const project=location.state.project_id;
    const elevation=location.state.elevation_id;
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };


      const ElevationPage=(e,elevation)=>{
        e.preventDefault();
        navigate('/project-elevation',{state:{project_id:project,elevation_id:elevation}});
         }
    const getCountries = async()=>{
        try{
            const response= await axios.get(AppURL.GetElevation(project,elevation))
            setCountries(response.data);
            setFilteredCountries(response.data)
           // console.log(countries);
           setLoading(false); 
        }catch(error){
            console.log(error);
        }
    }
    
     
    const columns =[
  

        {
            name:"Sr.",
            selector:(row) => row.id,
            sortable:true
        }  ,  
        {
            name:"Elevation Title",
            selector:(row) => row.title,
            sortable:true
        }  ,  
        
        {
            name:"Action",
            cell:(row)=>
            <button className='btn btn-danger'  onClick={(e)=>ElevationPage(e,row.id)}><i className="fa-solid fa-share"></i></button>
            //<button className='btn btn-danger' onClick={(e)=> ItemPage()}><i class="fa-solid fa-share"></i></button>
            
        }
    ]

    useEffect(()=>{
        const check_login=sessionStorage.getItem('login');
        const status=sessionStorage.getItem('code');
          if(!check_login){
              navigate('/login')
            }
            else if(check_login){
              if(status==='DI'|| status==='SI'){
                
              }
              else{
                navigate('/');
                alert('you are not allowed to access , your action will be reported');
              }

            }    
        getCountries()
        //console.log(getCountries())
    },[]);

    useEffect(()=> {
        const result=countries.filter(country=>{
            return country.itemcode.toLowerCase().match(search.toLowerCase()) || country.item.toLowerCase().match(search.toLowerCase());
        });
        setFilteredCountries(result);
    },[search])
            
if(loading){
    return<>
    <div class="hello hello-text">
        <h4> .....</h4>
    </div>
    </>
} 

return(
    <>
    <NavMenu></NavMenu>
    <div className="d-flex flex-column align-items-center">

    <DataTable 
    columns={columns} 
    data={filteredCountries} 
    title="Elevation Title" 
    fixedHeader 
    fixedHeaderScrollHeight="590px"
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
  
    //subHeaderAlign="center"
    ></DataTable>
    </div>
    </>
)

}

export default Elevation