import React, { Component, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ItemPage from '../../Pages/ItemPage';
import { Navigate } from 'react-router-dom';
import AppURL from '../../api/AppURL';
import NavMenu from '../Common/NavMenu';

function AccStock(){

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
            const response= await axios.get(AppURL.AccStock)
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
            name:"Item Code",
            selector:(row) => row.itemcode,
            sortable:true
        }  ,  
    
        {
            name:"Name",
            selector:(row) => <span data-toggle="tooltip" data-placement="top" title={row.item}>{row.item}</span> ,
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
        <h4>Fetching Low Stock Please Wait .....</h4>
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
    pagination title="Available Stock" 
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
)

}

export default AccStock