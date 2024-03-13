import React, { Component, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Navigate } from 'react-router-dom';
import AppURL from '../api/AppURL';


function OrderPage(){
    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredCountries,setFilteredCountries]=useState([]);
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };


      const ItemPage=(e,order_id,status)=>{
        e.preventDefault();
        navigate('/pr-detail',{state:{id:order_id,status:status}});
      
        //thisClicked.closest("tr").remove();
        //console.log(email);
         }
    const getCountries = async()=>{
        try{
            const response= await axios.get(AppURL.OrderList)
            setCountries(response.data);
            setFilteredCountries(response.data)
           // console.log(countries);
        }catch(error){
            console.log(error);
        }
    }
    
    const columns =[
        {
            name:"Order ID",
            selector:(row) => row.id,
            sortable:true
        }  ,  

        {
            name:"Created at",
            selector:(row) => row.created_at,
            sortable:true
        }  ,  
    
        {
            name:"Refrence",
            selector:(row) => row.description,
            sortable:true
        }  ,  

        {
            name:"Action",
            cell:(row)=>
            <button className='btn btn-danger'  onClick={(e)=>ItemPage(e,row.id,row.status)}><i class="fa-solid fa-arrow-right"></i></button>
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
              if(status=='SI'||status=='FI' ||status=='PI'){

                getCountries()
              }
              
              else{
                navigate('/');
                alert('you are not allowed to access , your action will be reported');
              }
               }
        
    },[]);

    useEffect(()=> {
        const result=countries.filter(country=>{
            return country.item['name'].toLowerCase().match(search.toLowerCase());
        });
        setFilteredCountries(result);
    },[search])
return(
    <>
    <div className="d-flex flex-column align-items-center">

    <DataTable 
    columns={columns} 
    data={filteredCountries} 
    pagination title="Orders List" 
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

export default OrderPage