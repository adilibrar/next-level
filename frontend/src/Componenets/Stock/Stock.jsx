import React, { Component, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ItemPage from '../../Pages/ItemPage';
import { Navigate } from 'react-router-dom';
import AppURL from '../../api/AppURL';


function Stock(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredCountries,setFilteredCountries]=useState([]);
    const [loading,setLoading]=useState(true);
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };


      const ItemPage=(e,Itemid)=>{
        e.preventDefault();
        navigate('/item-detail',{state:{id:Itemid}});
      
         }
    const getCountries = async()=>{
        try{
            const response= await axios.get(AppURL.NewStock)
            setCountries(response.data);
            setFilteredCountries(response.data)
            setLoading(false); 
        }catch(error){
            console.log(error);
        }
    }

    console.log(countries)
    
    const columns =[
        {
            name:"Item Code",
            selector:(row) => row.itemcode,
            sortable:true
        }  ,  
    
        {
            name:"Name",
            selector:(row) =><span data-toggle="tooltip" data-placement="top" title={row.item}>{row.item}</span> ,
            sortable:true
        }  ,  

        {
            name:"Length",
            selector:(row) => row.length,
            sortable:true
        }  ,  

        {
            name:"Size",
            selector:(row) => row.width,
            sortable:true
        }  , 

        {
            name:"Supplier",
            selector:(row) => row.supplier,
            sortable:true
        }  ,  

        {
            name:"Finishing",
            selector:(row) => row.finishing,
            sortable:true
        }  ,  
        
        {
            name:"Quantity",
            selector:(row) => row.quantity,
            sortable:true
        }  ,  
        
        {
            name:"Action",
            cell:(row)=>
            <button className='btn btn-danger'  onClick={(e)=>ItemPage(e,row.id)}><i className="fa-solid fa-share"></i></button>
            //<button className='btn btn-danger' onClick={(e)=> ItemPage()}><i class="fa-solid fa-share"></i></button>
            
        }
    ]

    useEffect(()=>{
        getCountries()
        
    },[]);

    useEffect(()=> {
        const result=countries.filter(country=>{
            return country.itemcode.toLowerCase().match(search.toLowerCase()) || country.item.toLowerCase().match(search.toLowerCase());
        });
        setFilteredCountries(result);
        //setLoading(false); 
    },[search])

        
if(loading){
        return<>
        <div class="hello hello-text">
            <h4>Preparing All Stock Please Wait .....</h4>
        </div>
        </>
   } 

return(
    <>
    <div className="d-flex flex-column align-items-center">

    <DataTable 
    columns={columns} 
    data={filteredCountries} 
    pagination title="Stock List" 
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
    //subHeaderAlign="center"
    ></DataTable>
    </div>
    </>
)

}

export default Stock