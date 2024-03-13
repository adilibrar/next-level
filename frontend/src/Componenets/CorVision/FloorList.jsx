import React, { Component, useEffect,useReducer} from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, redirect, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ItemPage from '../../Pages/ItemPage';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import NavMenu from '../Common/NavMenu';
import Form from 'react-bootstrap/Form';
import cogoToast from 'cogo-toast';
import Button from 'react-bootstrap/Button';

function FloorList(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredCountries,setFilteredCountries]=useState([]);
    const [loading,setLoading]=useState(true);
    const location = useLocation();
    const project=location.state.id;
    const pagetype=location.state.type;
    const[codevalidating,setcodevalidating]=useState(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const handleSubmit=(e)=>{
        e.preventDefault();
       let title=e.target.title.value;
        // axios.delete(AppURL.CartItemDelete(mtoitemid)).then(response=>{
        //     thisClicked.closest("tr").remove();
        //     cogoToast.success("Item Deleted Successfully",{position:'top-right'});
                    
        //     })

        const data={
            title:title,
            projectfloor:project
        }

        axios.post(AppURL.SaveFloor,data,{ 
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+sessionStorage.getItem("token"),
          },}).then(response=>{
            
            cogoToast.success("Floor Added Successfully...",{position:'top-right'});
            //new data will be reloaded
            //navigate('/cor-project');
            getCountries();
            
          })
        
        }

        
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      
      const WindowPage=(e,elevation)=>{
        e.preventDefault();
        navigate('/floor-windows',{state:{project_id:project,elevation_id:elevation}});
         }

      const ElevationPage=(e,elevation)=>{
        e.preventDefault();
        navigate('/create-window',{state:{project_id:project,elevation_id:elevation}});
         }

         
      const ElevationPageCustom=(e,elevation)=>{
        e.preventDefault();
        navigate('/create-custom-window',{state:{project_id:project,elevation_id:elevation}});
         }

         
    const getCountries = async()=>{
        try{
            const response= await axios.get(AppURL.GetFloors(project))
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
            name:"Floor Title",
            selector:(row) => row.title,
            sortable:true
        }  ,  
        
        {
            name:"Action",
            cell:(row)=>
          <>
            {
                pagetype =='2'?
                <>
                <button className='btn btn-danger'  onClick={(e)=>ElevationPage(e,row.id)}>Quick Windows</button>&nbsp;&nbsp;&nbsp;
                <button className='btn btn-danger'  onClick={(e)=>ElevationPageCustom(e,row.id)}>Custom Windows</button>
                </>
                :
                <button className='btn btn-danger'  onClick={(e)=>WindowPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
            }
            
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
              if(status==='COR'|| status==='SI' || status==='DI' || status==='CORDI' || status==='TT'){
                if(status=='CORDI'){
                    setcodevalidating(true)
                }
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
        <h4>Fetching Data Please Wait .....</h4>
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
    title="Project Floor" 
    fixedHeader 
    fixedHeaderScrollHeight="590px"
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
  
    //subHeaderAlign="center"
    ></DataTable>

{
    codevalidating?
        <p className='mt-5'>End of Page...</p>
    :
    <Form onSubmit={handleSubmit}>
            <div className='row col-md-12 mt-4'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label></Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="text" placeholder="Floor Title" name='title' required  /> 
            

                  <Button variant="primary"  type="submit" name='add'>Add New Floor</Button>
                    </span>
                </Form.Group>

             
            </div>


        </div>
    </Form>
}


    </div>


    </>
)

}

export default FloorList