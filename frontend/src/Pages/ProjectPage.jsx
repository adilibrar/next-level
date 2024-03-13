
import NavMenu from '../Componenets/Common/NavMenu'
import React, { Component, useEffect,useReducer} from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Navigate } from 'react-router-dom';
import AppURL from '../api/AppURL';
import cogoToast from 'cogo-toast';
import axios from 'axios';
function ProjectPage(){
  
    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const[filteredCountries,setFilteredCountries]=useState([]);
    
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   // const check_login=sessionStorage.getItem('login');
    const status=sessionStorage.getItem('code');
    //   if(!check_login){
    //       navigate('/login')
    //     }
    //     else if(check_login){
    //       if(status=='SI' || status=='DI'){

    //       }
    //       else{
    //         navigate('/');
    //         alert('you are not allowed to access , your action will be reported');
    //       }
    //     }    
      const ProjectPageDetail=(e,projectId)=>{
        e.preventDefault();
        navigate('/project-detail',{state:{id:projectId}});
         }

         const AccountsProjectDetail=(e,projectId)=>{
            e.preventDefault();
            navigate('/project-accounts',{state:{id:projectId}});
             }

             const ProjectEdit=(e,projectId)=>{
                e.preventDefault();
                navigate('/new-project',{state:{id:projectId}});
                 }

             
             const ProjectCopy=(e,projectId,main,total,phase)=>{
                e.preventDefault();
                //navigate('/project-accounts',{state:{id:projectId}});

                const data={
                    projectcode:projectId,
                    mainid:main,
                    total:total,
                    phase:phase
                }
                axios.post(AppURL.ProjectCopy,data,{
          
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+sessionStorage.getItem("token"),
                  },}
                  ).then(response =>{  
                    if(response.status===200){
                      cogoToast.success('Project Copied Successfully...')
                       forceUpdate();
                    //   setDirty(false)
                    //   seteditdate("");
                      e.target.reset();

                    }
                    else{
                      cogoToast.error('Something Went Wrong...')
                    }

                })

                 }

             
            
         const EditProjectAccounts=(e,projectId)=>{
            e.preventDefault();
            navigate('/project-budget-accounts',{state:{id:projectId}});
             }
             
         const AllMTOItems=(e,projectId)=>{
            e.preventDefault();
            navigate('/mto-all-items',{state:{id:projectId}});
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
            selector:(row) =>
            row.phase> 0 ?
                row.refrence_no+'-'+row.phase
            :row.refrence_no,
            sortable:true
        }  ,  
        {
            name:"Project Name",
            selector:(row) => 
            row.phase> 0 ?
                <>
                <span data-toggle="tooltip" data-placement="top" title={row.name}>{row.name}</span> (Phase-
                <span data-toggle="tooltip" data-placement="top" title={row.name}>{row.phase}</span>
                )
                </>
            :<span data-toggle="tooltip" data-placement="top" title={row.name}>{row.name}</span>,
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
            <>
          {
                status=='AC'?
                    row.total>1?
                        <>
                        <button className='btn btn-danger'  onClick={(e)=>ProjectEdit(e,row.id)}><i className="fa fa-edit"></i></button>&nbsp;&nbsp;
                        <button className='btn btn-danger'  onClick={(e)=>AccountsProjectDetail(e,row.refrence_no)}><i className="fa fa-eye"></i></button>
                        </>
                    :
                        <>
                        <button className='btn btn-danger'  onClick={(e)=>ProjectEdit(e,row.id)}><i className="fa fa-edit"></i></button>&nbsp;&nbsp;
                        <button className='btn btn-danger'  onClick={(e)=>ProjectCopy(e,row.refrence_no,row.id,row.total,row.phase)}><i className="fa fa-copy"></i></button>&nbsp;&nbsp;
                        <button className='btn btn-danger'  onClick={(e)=>AccountsProjectDetail(e,row.refrence_no)}><i className="fa fa-eye"></i></button>
                        </>
                :status=='ES'?
                <button className='btn btn-danger'  onClick={(e)=>EditProjectAccounts(e,row.id)}><i className="fa fa-edit"></i></button> 
                 
                :
               
                
                <>
                  <button className='btn btn-danger'  onClick={(e)=>ProjectPageDetail(e,row.id)}><i className="fa-solid fa-share"></i></button> &nbsp;
                  <button className='btn btn-danger'  onClick={(e)=>AllMTOItems(e,row.id)}><i className="fa fa-eye"></i></button>
                </>
                
            }
            
            </>
        }
    ]

    useEffect(()=>{
        const status=sessionStorage.getItem('code');
        getCountries()
    },[ignored]);

    useEffect(()=> {
        const result=countries.filter(country=>{
            return country.name.toLowerCase().match(search.toLowerCase());
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

export default ProjectPage