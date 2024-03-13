import React, { Component, useEffect,useReducer} from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, redirect, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';

import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import AppURL from '../../../api/AppURL';
import NavMenu from '../../Common/NavMenu';
import Form from 'react-bootstrap/Form';
import cogoToast from 'cogo-toast';
import Button from 'react-bootstrap/Button';
import CreateWindow from '../CreateWindow';

function WindowData(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredCountries,setFilteredCountries]=useState([]);
    const [loading,setLoading]=useState(true);
    const[profile,setProfile]=useState(true);
    const location = useLocation();
    const project=1;
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const handleSubmit=(e)=>{
        e.preventDefault();
       let name=e.target.name.value;
       let type=e.target.type.value;
       let wd=e.target.wd.value;

        // axios.delete(AppURL.CartItemDelete(mtoitemid)).then(response=>{
        //     thisClicked.closest("tr").remove();
        //     cogoToast.success("Item Deleted Successfully",{position:'top-right'});
                    
        //     })

        const data={
            name:name,
            type:type,
            wd:wd,
            status:'0'
        }

        axios.post(AppURL.SaveCorWindow,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response=>{
            
            cogoToast.success("Window Added Successfully...",{position:'top-right'});
            //new data will be reloaded
            //navigate('/windows-data');
            //forceUpdate();
            e.target.reset()
            getCountries();
            
          })
        
        }

        
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      
      const WindowPage=(e,window)=>{
        e.preventDefault();
        navigate('/single-window-data',{state:{window_id:window}});
         }


    const getCountries = async()=>{
        try{
            const response= await axios.get(AppURL.AllCorWindows)
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
            name:"Window Title",
            selector:(row) => row.name,
            sortable:true
        }  ,  
        {
            name:"Type",
            selector:(row) => row.type,
            sortable:true
        }  ,  

        {
            name:"Shutter",
            selector:(row) => row.wd,
            sortable:true
        }  ,  
        {
            name:"Image",
            selector:(row) => <img height="30px" width="30px" src={`http://192.168.168.26:8000${row.image}`} alt="Image NA"  />,
            sortable:true
        }  ,  
        {
            name:"Action",
            cell:(row)=>
            <>


            <button className='btn btn-danger'><a className='white-text' target="_blank" href={'http://192.168.168.26:8000/admin/store/corvision/'+row.id+'/change/'}><i className="fa-solid fa-pencil"></i></a></button>
           &nbsp;
           <button className='btn btn-danger'><a className='white-text' target="_blank" href={'http://192.168.168.26:8000/admin/store/corvisiondim/add/'}><i className="fa-solid fa-gear"></i></a></button>
           &nbsp;
            <button className='btn btn-danger'  onClick={(e)=>WindowPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
          
            </>
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
              if(status==='COR'|| status==='SI'){
                
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
            return country.name.toLowerCase().match(search.toLowerCase()) || country.type.toLowerCase().match(search.toLowerCase());
        });
        setFilteredCountries(result);
    },[search])
            
if(loading){
    return<>
    <div class="hello hello-text">
        <h4>Please Wait .....</h4>
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
    title="Windows" 
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

<Form onSubmit={handleSubmit}>
            <div className='row col-md-12 mt-4'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Add New Window</Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Window Title" name='name' required  /> &nbsp;&nbsp;
                  <Form.Control type="text" placeholder="Window Type" name='type' required  /> &nbsp;&nbsp;
                  <Form.Control type="text" placeholder="Shutter" name='wd' required  /> 
            

                  <Button variant="primary"  type="submit" name='add'>Add New Window</Button>
                    </span>
                </Form.Group>
            </div>
        </div>
    </Form>
    </div>


    </>
)

}

export default WindowData