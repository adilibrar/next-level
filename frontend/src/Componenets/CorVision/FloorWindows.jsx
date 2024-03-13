import React, { Component, useEffect,useReducer } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ItemPage from '../../Pages/ItemPage';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import AppURL from '../../api/AppURL';
import NavMenu from '../Common/NavMenu';
import cogoToast from 'cogo-toast';
import Alert from 'react-bootstrap/Alert';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
function FloorWindows(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[Fcountries,setFCountries]=useState([]);
    const[search,setSearch]=useState([]);
    const[windowupdate,setwindowupdate]=useState([]);
    const[filteredCountries,setFilteredCountries]=useState([]);
    const[FfilteredCountries,setFFilteredCountries]=useState([]);
    const [loading,setLoading]=useState(true);
    const [edit,setEdit]=useState(false);
    const [customshutter,setcustomshutter]=useState(false);
    const[width,setwidth]=useState([])
    const[detect,SetDetect]=useState([])
    const[dimdata,Setdimdata]=useState([])
    const[dim1,Setdim1]=useState([])
    const[dim2,Setdim2]=useState([])
    const[dim3,Setdim3]=useState([])
    const[dimvalidate,setdimvalidate]=useState(false)
    const[height,setHeight]=useState([])
    const[customshuttervalue,Setcustomshuttervalue]=useState([])
    
    const[usercheck,setusercheck]=useState(false)
    const location = useLocation();


    
   const [d1s1w, setd1s1w] = useState(0);
   const [d1s1h, setd1s1h] = useState(0);
   const [d2s1w, setd2s1w] = useState(0);
   const [d2s1h, setd2s1h] = useState(0);
   const [d3s1w, setd3s1w] = useState(0);
   const [d3s1h, setd3s1h] = useState(0);
   const [d4s1w, setd4s1w] = useState(0);
   const [d4s1h, setd4s1h] = useState(0);
   const [d5s1w, setd5s1w] = useState(0);
   const [d5s1h, setd5s1h] = useState(0);
   const [d6s1w, setd6s1w] = useState(0);
   const [d6s1h, setd6s1h] = useState(0);
      
   const [d1s2w, setd1s2w] = useState(0);
   const [d1s2h, setd1s2h] = useState(0);
   const [d2s2w, setd2s2w] = useState(0);
   const [d2s2h, setd2s2h] = useState(0);
   const [d3s2w, setd3s2w] = useState(0);
   const [d3s2h, setd3s2h] = useState(0);
   const [d4s2w, setd4s2w] = useState(0);
   const [d4s2h, setd4s2h] = useState(0);
   const [d5s2w, setd5s2w] = useState(0);
   const [d5s2h, setd5s2h] = useState(0);
   const [d6s2w, setd6s2w] = useState(0);
   const [d6s2h, setd6s2h] = useState(0);
      
   const [d1s3w, setd1s3w] = useState(0);
   const [d1s3h, setd1s3h] = useState(0);
   const [d2s3w, setd2s3w] = useState(0);
   const [d2s3h, setd2s3h] = useState(0);
   const [d3s3w, setd3s3w] = useState(0);
   const [d3s3h, setd3s3h] = useState(0);
   const [d4s3w, setd4s3w] = useState(0);
   const [d4s3h, setd4s3h] = useState(0);
   const [d5s3w, setd5s3w] = useState(0);
   const [d5s3h, setd5s3h] = useState(0);
   const [d6s3w, setd6s3w] = useState(0);
   const [d6s3h, setd6s3h] = useState(0); 
   
  const [d1s4w, setd1s4w] = useState(0);
  const [d1s4h, setd1s4h] = useState(0);
  const [d2s4w, setd2s4w] = useState(0);
  const [d2s4h, setd2s4h] = useState(0);
  const [d3s4w, setd3s4w] = useState(0);
  const [d3s4h, setd3s4h] = useState(0);
  const [d4s4w, setd4s4w] = useState(0);
  const [d4s4h, setd4s4h] = useState(0);
  const [d5s4w, setd5s4w] = useState(0);
  const [d5s4h, setd5s4h] = useState(0);
  const [d6s4w, setd6s4w] = useState(0);
  const [d6s4h, setd6s4h] = useState(0); 


  const [d1s5w, setd1s5w] = useState(0);
  const [d1s5h, setd1s5h] = useState(0);
  const [d2s5w, setd2s5w] = useState(0);
  const [d2s5h, setd2s5h] = useState(0);
  const [d3s5w, setd3s5w] = useState(0);
  const [d3s5h, setd3s5h] = useState(0);
  const [d4s5w, setd4s5w] = useState(0);
  const [d4s5h, setd4s5h] = useState(0);
  const [d5s5w, setd5s5w] = useState(0);
  const [d5s5h, setd5s5h] = useState(0);
  const [d6s5w, setd6s5w] = useState(0);
  const [d6s5h, setd6s5h] = useState(0); 


  const [d1s6w, setd1s6w] = useState(0);
  const [d1s6h, setd1s6h] = useState(0);
  const [d2s6w, setd2s6w] = useState(0);
  const [d2s6h, setd2s6h] = useState(0);
  const [d3s6w, setd3s6w] = useState(0);
  const [d3s6h, setd3s6h] = useState(0);
  const [d4s6w, setd4s6w] = useState(0);
  const [d4s6h, setd4s6h] = useState(0);
  const [d5s6w, setd5s6w] = useState(0);
  const [d5s6h, setd5s6h] = useState(0);
  const [d6s6w, setd6s6w] = useState(0);
  const [d6s6h, setd6s6h] = useState(0); 




    let columns=[]
    let Fcolumns=[]
    let Submittedcolumns=[]
    const project=location.state.project_id;
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const elevation=location.state.elevation_id;
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };

      useEffect(()=>{
        const check_login=sessionStorage.getItem('login');
        const status=sessionStorage.getItem('code');
          if(!check_login){
              navigate('/login')
            }
            else if(check_login){
              if(status==='COR'|| status==='DI' || status==='SI' || status==='CORDI' || status==='TT'){
                
                if(status==='CORDI'){
                    
                    setusercheck(true)
                    FgetCountries()
                }
                else{
                    
                    getCountries()
                }
                
              }
              else{
                navigate('/');
                alert('you are not allowed to access , your action will be reported');
              }

            }    
    },[ignored]);


const ActiveWindowEdit=(e,id,status)=>{
    e.preventDefault();
        SetDetect(id)
        setEdit(true);
        
        if(status==3){
            
            axios.get(AppURL.ReleaseWindowCustomDimData(id)).then(response=>{
                setdimvalidate(true)
                Setdimdata(response.data)
            })
        }
        if(status==4){
            setcustomshutter(true)
             axios.get(AppURL.ReleaseWindowCustomShutterData(id)).then(response=>{
                setcustomshutter(true)
                 Setcustomshuttervalue(response.data)
            //     Setdimdata(response.data)
                console.log(response.data)
           // console.table
             })
        }
      }

      

const ActiveCustomWindowEdit=(e,id,status)=>{
        e.preventDefault();
            SetDetect(id)
            setcustomshutter(true)
            //setEdit(true);
            // if(status==3){
                
            //     axios.get(AppURL.ReleaseWindowCustomDimData(id)).then(response=>{
            //         setdimvalidate(true)
            //         Setdimdata(response.data)
            //     })
            // }
        alert("Custom Window")
          }

      const MoveToFolder=(e,id,status)=>{
        e.preventDefault();
        let data={}

        axios.get(AppURL.SingleWindowData(id)).then(response=>{
            
            if(response.data){
             const windowdata={
                width:width,
                height:height,
                windload:response.data.windload,
                ProfileFinishing:response.data.ProfileFinishing,
                LockHeight:response.data.LockHeight,
                FWindowLock:response.data.WindowLock.id,
                LockFinishing:response.data.LockFinishing,
                GlassColor:response.data.GlassColor,
                title:response.data.title,
                quantity:response.data.quantity,
                elevation:response.data.elevation,
                FWindow:response.data.Window.id,
                FWindowproject:response.data.Windowproject.id,
                FWindowfloor:response.data.Windowfloor.id,
                Fstatus:'4',
                dim1:dim1,
                dim2:dim2,
                dim3:dim3
                }

            axios.post(AppURL.FReleaseWindow,windowdata,{ 
                  headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Token "+sessionStorage.getItem("token"),
                },}).then(proresponse =>{ 
                //GetCorvision
                console.log(proresponse)
                if(proresponse.status=='201'){
                   
                if(dim1 !='0' && dim2 !='0')
                {
                  const dimdata={
                    FinalReleasedWindowCDim:proresponse.data['id'],
                    dim1:dim1,
                    dim2:dim2,
                    dim3:dim3
                    }
        
                    axios.post(AppURL.FReleaseWindowCustomDim,dimdata,{ 
                      headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Token "+sessionStorage.getItem("token"),
                    },}).then(poresponse =>{ 
                      console.log("Custom Shutters")
                    })
                }
                
            if(status=='4'){
               const shutter_data={
                    FinalReleasedWindowCS:proresponse.data['id'],
                    d1s1w :d1s1w,
                    d1s1h :d1s1h,
                    d2s1w :d2s1w,
                    d2s1h :d2s1h,
                    d3s1w :d3s1w,
                    d3s1h :d3s1h,
                    d4s1w :d4s1w,
                    d4s1h :d4s1h,
                    d5s1w :d5s1w,
                    d5s1h :d5s1h,
                    d6s1w :d6s1w,
                    d6s1h :d6s1h,
                      
                    d1s2w :d1s2w,
                    d1s2h :d1s2h,
                    d2s2w :d2s2w,
                    d2s2h :d2s2h,
                    d3s2w :d3s2w,
                    d3s2h :d3s2h,
                    d4s2w :d4s2w,
                    d4s2h :d4s2h,
                    d5s2w :d5s2w,
                    d5s2h :d5s2h,
                    d6s2w :d6s2w,
                    d6s2h :d6s2h,
                      
                    d1s3w :d1s3w,
                    d1s3h :d1s3h,
                    d2s3w :d2s3w,
                    d2s3h :d2s3h,
                    d3s3w :d3s3w,
                    d3s3h :d3s3h,
                    d4s3w :d4s3w,
                    d4s3h :d4s3h,
                    d5s3w :d5s3w,
                    d5s3h :d5s3h,
                    d6s3w :d6s3w,
                    d6s3h :d6s3h, 
                    
                    d1s4w :d1s4w,
                    d1s4h :d1s4h,
                    d2s4w :d2s4w,
                    d2s4h :d2s4h,
                    d3s4w :d3s4w,
                    d3s4h :d3s4h,
                    d4s4w :d4s4w,
                    d4s4h :d4s4h,
                    d5s4w :d5s4w,
                    d5s4h :d5s4h,
                    d6s4w :d6s4w,
                    d6s4h :d6s4h, 
                    
                    d1s5w :d1s5w,
                    d1s5h :d1s5h,
                    d2s5w :d2s5w,
                    d2s5h :d2s5h,
                    d3s5w :d3s5w,
                    d3s5h :d3s5h,
                    d4s5w :d4s5w,
                    d4s5h :d4s5h,
                    d5s5w :d5s5w,
                    d5s5h :d5s5h,
                    d6s5w :d6s5w,
                    d6s5h :d6s5h, 
                      
                    d1s6w :d1s6w,
                    d1s6h :d1s6h,
                    d2s6w :d2s6w,
                    d2s6h :d2s6h,
                    d3s6w :d3s6w,
                    d3s6h :d3s6h,
                    d4s6w :d4s6w,
                    d4s6h :d4s6h,
                    d5s6w :d5s6w,
                    d5s6h :d5s6h,
                    d6s6w :d6s6w,
                    d6s6h :d6s6h, 
                      
                  }
            axios.post(AppURL.FinalReleaseWindowCustomShuter,shutter_data,{ 
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+sessionStorage.getItem("token"),
              },}).then(sroresponse =>{ 
                if(sroresponse.status=='201'){
                    console.log("Shutter Saved")
                }
              })

              data={
                width:width,
                height:height,
                wp:proresponse.data['windload'],
                id:proresponse.data['FWindow'],
                released:proresponse.data['id'],
                status:'1',
                project:response.data.Windowproject.id,
                d1s1w :d1s1w,
                d1s1h :d1s1h,
                d2s1w :d2s1w,
                d2s1h :d2s1h,
                d3s1w :d3s1w,
                d3s1h :d3s1h,
                d4s1w :d4s1w,
                d4s1h :d4s1h,
                d5s1w :d5s1w,
                d5s1h :d5s1h,
                d6s1w :d6s1w,
                d6s1h :d6s1h,
                  
                d1s2w :d1s2w,
                d1s2h :d1s2h,
                d2s2w :d2s2w,
                d2s2h :d2s2h,
                d3s2w :d3s2w,
                d3s2h :d3s2h,
                d4s2w :d4s2w,
                d4s2h :d4s2h,
                d5s2w :d5s2w,
                d5s2h :d5s2h,
                d6s2w :d6s2w,
                d6s2h :d6s2h,
                  
                d1s3w :d1s3w,
                d1s3h :d1s3h,
                d2s3w :d2s3w,
                d2s3h :d2s3h,
                d3s3w :d3s3w,
                d3s3h :d3s3h,
                d4s3w :d4s3w,
                d4s3h :d4s3h,
                d5s3w :d5s3w,
                d5s3h :d5s3h,
                d6s3w :d6s3w,
                d6s3h :d6s3h, 
                
                d1s4w :d1s4w,
                d1s4h :d1s4h,
                d2s4w :d2s4w,
                d2s4h :d2s4h,
                d3s4w :d3s4w,
                d3s4h :d3s4h,
                d4s4w :d4s4w,
                d4s4h :d4s4h,
                d5s4w :d5s4w,
                d5s4h :d5s4h,
                d6s4w :d6s4w,
                d6s4h :d6s4h, 
                
                d1s5w :d1s5w,
                d1s5h :d1s5h,
                d2s5w :d2s5w,
                d2s5h :d2s5h,
                d3s5w :d3s5w,
                d3s5h :d3s5h,
                d4s5w :d4s5w,
                d4s5h :d4s5h,
                d5s5w :d5s5w,
                d5s5h :d5s5h,
                d6s5w :d6s5w,
                d6s5h :d6s5h, 
                  
                d1s6w :d1s6w,
                d1s6h :d1s6h,
                d2s6w :d2s6w,
                d2s6h :d2s6h,
                d3s6w :d3s6w,
                d3s6h :d3s6h,
                d4s6w :d4s6w,
                d4s6h :d4s6h,
                d5s6w :d5s6w,
                d5s6h :d5s6h,
                d6s6w :d6s6w,
                d6s6h :d6s6h, 
                  
           } 
                }
            else{
                data={
                        width:width,
                        height:height,
                        wp:proresponse.data['windload'],
                        id:proresponse.data['FWindow'],
                        released:proresponse.data['id'],
                        status:'1',
                        project:response.data.Windowproject.id,
                        dim1:dim1,
                        dim2:dim2,
                        dim3:dim3
                             } 
                }
                    axios.post(AppURL.FGetCutingProfile,data,{ 
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+sessionStorage.getItem("token"),
                    },}).then(pcresponse =>{
                    if(pcresponse.data){                   
                            axios.post(AppURL.FinalGetCutingAcc,data,{ 
                            headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token "+sessionStorage.getItem("token"),
                            },}).then(accresponse =>{ 
                                if(accresponse.data){
                                axios.post(AppURL.FGetCutingGasket,data,{ 
                                headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token "+sessionStorage.getItem("token"),
                                },}).then(gasketresponse =>{
                                    if(gasketresponse.data){
                                    axios.post(AppURL.FGetCutingScrew,data,{ 
                                       headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": "Token "+sessionStorage.getItem("token"),
                                        },}).then(screwresponse =>{ 
                                        if(screwresponse.data){
                                        axios.post(AppURL.FGetCuttingPacking,data,{ 
                                            headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": "Token "+sessionStorage.getItem("token"),
                                            },}).then(packetresponse =>{ 

                                                if(packetresponse.data){
                                                    axios.post(AppURL.FGetCuttingGlass,data,{ 
                                                        headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": "Token "+sessionStorage.getItem("token"),
                                                        },}).then(glassresponse =>{
                                                            if(glassresponse.data){
                                                                axios.post(AppURL.FGetCutingInterlockAcc,data,{ 
                                                                   headers: {
                                                                    "Content-Type": "application/json",
                                                                    "Authorization": "Token "+sessionStorage.getItem("token"),
                                                                    },}).then(interlockaccresponse =>{ 
                                                                        if(interlockaccresponse.data){
                                                                        axios.post(AppURL.FGetCutingInterlockProfile,data,{ 
                                                                            headers: {
                                                                            "Content-Type": "application/json",
                                                                            "Authorization": "Token "+sessionStorage.getItem("token"),
                                                                            },}).then(profileresponse =>{ 
                                                                                if(profileresponse){
                                                                                    const stat=4
                                                                                    axios.get(AppURL.UpdateWindowStatusWNum(id,stat)).then(response=>{
                                                                                        if(response.status=='201'){
                                                                                            cogoToast.success("Window Moved to finalize Successfully...");
                                                                                            setHeight('');
                                                                                            setwidth('');
                                                                                            forceUpdate();
                                                                                            setEdit(false)
                                                                                            setcustomshutter(false)
                                                                                            Setcustomshuttervalue([''])
                                                                                            FgetCountries();
                                                                                        }
                                                                                    })
                                                                                   
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                }
                                            })
                                        }
                                        })
                                    }
                                })                  
                                  }             
                      })                       
                    }
                })
            }
                })
            }
         
                })         
          
           }

      const ElevationPage=(e,window)=>{
        e.preventDefault();
            navigate('/window-detail',{state:{window_id:window}});
         }
         const FElevationPage=(e,window)=>{
            e.preventDefault();
                navigate('/final-window-detail',{state:{window_id:window}});
             }
         const ReadyToFabricate=(e,window)=>{
            e.preventDefault();
            
                axios.get(AppURL.UpdateWindowStatus(window)).then(response=>{
                    if(response.status=='201'){
                        cogoToast.success("A Selected unit has submitted for final revision.");
                        getCountries();
                    }
                })
             }

        const HoldWindow=(e,window)=>{
                e.preventDefault();
                const data={
                    id:window,
                    status:6
                }
                axios.post(AppURL.UpdateHoldWindowStatus,data,{ 
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+sessionStorage.getItem("token"),
                    },}).then(response =>{ 
                        if(response.status=='201'){
                            cogoToast.success("A Selected unit is set to Hold.");
                            getCountries();
                        }
                    })
                 }

                 const UnHoldWindow=(e,window)=>{
                    e.preventDefault();
                    const data={
                        id:window,
                        status:1
                    }
                    axios.post(AppURL.UpdateHoldWindowStatus,data,{ 
                        headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+sessionStorage.getItem("token"),
                        },}).then(response =>{ 
                            if(response.status=='201'){
                                cogoToast.success("A Selected unit is set to active.");
                                getCountries();
                            }
                        })
                     }

    const getCountries = async()=>{
        try{
                const response= await axios.get(AppURL.FloorWindows(project,elevation))
                setCountries(response.data);
               
                setFilteredCountries(response.data)
                
               setLoading(false);      
        }catch(error){
            console.log(error);
        }
    }


    const FgetCountries = async()=>{
        try{
            const Fresponse= await axios.get(AppURL.FFloorWindows(project,elevation))
            setFCountries(Fresponse.data);
            setFFilteredCountries(Fresponse.data)
            setLoading(false); 
            
            const response= await axios.get(AppURL.FloorWindows(project,elevation))
            setCountries(response.data);
            console.log(response.data)
            setFilteredCountries(response.data)
        }catch(error){
            console.log(error);
        }
    }
    
     if(usercheck){
         columns =[
  
            {
                name:"Window Title",
                selector:(row) => row.title,
                sortable:true
            }  ,  
    
            {
                name:"Dimensions",
                cell:(row)=>
                edit && row.id==detect?
                <>
                <span style={{width:'100%'}}>
                   {
                    row.width+" * "+row.height
                   }
                    </span>&nbsp;
                         <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Width" name='width'onChange={(e) => {setwidth(e.target.value)}}></input>&nbsp;&nbsp;
                         <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Height" name='height' onChange={(e) => {setHeight(e.target.value)}} ></input>
                    </> 
                    :row.width+" * "+row.height
                   },
    
            {
                name:"Type",
                cell:(row)=>
                edit && row.id==detect && dimvalidate ?
                <>
                <span style={{width:'100%'}}>
                   {
                    dimdata.dim1
                   }
                    </span>&nbsp;
                         <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Shutter 1" name='dim1'onChange={(e) => {Setdim1(e.target.value)}}></input>&nbsp;&nbsp;
                    </> 
                    :row.Window['name']
            }  ,  

            {
                name:"Elevation",
                cell:(row)=>
                edit && row.id==detect && dimvalidate ?
                <>
                <span style={{width:'100%'}}>
                   {
                    dimdata.dim2
                   }
                    </span>&nbsp;
                         <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Shutter 2" name='dim1'onChange={(e) => {Setdim2(e.target.value)}}></input>&nbsp;&nbsp;
                    </> 
                    :row.elevation
            }  ,  

            {
                name:"Finishing",
                cell:(row)=>
                dimdata.dim3 !='0'?
                edit && row.id==detect && dimvalidate ?
                <>
                <span style={{width:'100%'}}>
                   {
                    dimdata.dim3
                   }
                    </span>&nbsp;
                         <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Shutter 3" name='dim1'onChange={(e) => {Setdim3(e.target.value)}}></input>&nbsp;&nbsp;
                    </> 
                    :row.elevation
                :row.elevation
            }  ,  
    
            {
                name:"Glass",
                selector:(row) => row.GlassColor,
                sortable:true
            }  ,  
    
            {
                name:"Quantity",
                selector:(row) => row.quantity,
                sortable:true
            }  ,  
    
            {
                name:"Status",
                selector:(row) =>
                
                <span class="alert alert-info ">
                    {row.status['title']}
                </span>
    
            }  ,  

            
            {
                name:"Action",
                cell:(row)=>
           
                edit && row.id==detect?
                // row.status['Window']['id']==4?
                //     null
                // :
                <>
                {/* <input type='hidden' name='WindowType'></input> */}
                <button className='btn btn-danger'  onClick={(e)=>MoveToFolder(e,row.id,row.Window['status'])}><i className='fa fa-arrow-right'></i> Move to Finalized</button>
                </>
                :
                    row.status['id']==2?
                        <>
                            <button className='btn btn-danger'  onClick={(e)=>ElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
                        </> 
                        :row.status['id']==3?
                        <>
                        <button className='btn btn-danger'  onClick={(e)=>ActiveWindowEdit(e,row.id,row.Window['status'])}><i className="fa-solid fa-edit"></i></button>&nbsp;&nbsp;
                        {/* <button className='btn btn-danger'  onClick={(e)=>ActiveCustomWindowEdit(e,row.id,row.Window['status'])}><i className="fa-solid fa-comment"></i></button>&nbsp;&nbsp; */}
                        <button className='btn btn-danger'  onClick={(e)=>ElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
                        </>
                        :
                        null
                    
                   }
            
        ]

         Fcolumns =[
  

            {
                name:"Window Title",
                selector:(row) => row.title,
                sortable:true
            }  ,    
            {
                name:"Dimensions",
                cell:(row)=>
                edit && row.id==detect?
                <>
                <span style={{width:'100%'}}>
                   {
                    row.width+" * "+row.height
                   }
                    </span>&nbsp;
                         <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Width" name='width'onChange={(e) => {setwidth(e.target.value)}}></input>&nbsp;&nbsp;
                         <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Height" name='height' onChange={(e) => {setHeight(e.target.value)}} ></input>
                    </> 
                    :row.width+" * "+row.height
                   },
    
            {
                name:"Type",
                selector:(row) =>row.FWindow['name'],
                sortable:true
            }  ,  
             {
                name:"Elevation",
                selector:(row) => row.elevation,
                sortable:true
            }  ,  
    
            {
                name:"Finishing",
                selector:(row) => row.ProfileFinishing,
                sortable:true
            }  ,  
    
            {
                name:"Glass",
                selector:(row) => row.GlassColor,
                sortable:true
            }  ,  
    
            {
                name:"Quantity",
                selector:(row) => row.quantity,
                sortable:true
            }  ,  
    
            {
                name:"Status",
                selector:(row) =>
                
                <span class="alert alert-info ">
                    {row.Fstatus['title']}
                </span>
    
            }  ,  
            
            {
                name:"Action",
                cell:(row)=>
                
                edit && row.id==detect?
                <button className='btn btn-danger'  onClick={(e)=>MoveToFolder(e,row.id)}><i className='fa fa-arrow-right'></i> Move to Finalized</button>
                :
                row.Fstatus['id']==2?
                    <>
                        <button className='btn btn-danger'  onClick={(e)=>FElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
                     </> 
                    :row.Fstatus['id']==3?
                    <>
                    <button className='btn btn-danger'  onClick={(e)=>ActiveWindowEdit(e,row.id,row.Window['status'])}><i className="fa-solid fa-edit"></i></button>
                    <button className='btn btn-danger'  onClick={(e)=>FElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
                    </>
                    :
                    <button className='btn btn-danger'  onClick={(e)=>FElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
            }
        ]
     }else{
     Submittedcolumns =[
        {
            name:"Window Title",
            selector:(row) => row.title,
            sortable:true
        }  ,  

        {
            name:"Dimensions",
            cell:(row)=>
            edit && row.id==detect?
            <>
            <span style={{width:'100%'}}>
               {
                row.width+" * "+row.height
               }
                </span>&nbsp;
                     <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Width" name='width'onChange={(e) => {setwidth(e.target.value)}}></input>&nbsp;&nbsp;
                     <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="Height" name='height' onChange={(e) => {setHeight(e.target.value)}} ></input>
                </> 
                :row.width+" * "+row.height
               },

        {
            name:"Type",
            selector:(row) => usercheck? row.FWindow['name']: row.Window['name'],
            sortable:true
        }  ,  
         {
            name:"Elevation",
            selector:(row) => row.elevation,
            sortable:true
        }  ,  

        {
            name:"Finishing",
            selector:(row) => row.ProfileFinishing,
            sortable:true
        }  ,  

        {
            name:"Glass",
            selector:(row) => row.GlassColor,
            sortable:true
        }  ,  

        {
            name:"Quantity",
            selector:(row) => row.quantity,
            sortable:true
        }  ,  

        {
            name:"Status",
            selector:(row) =>
            
            <span class="alert alert-info ">
                {row.status['title']}
            </span>
        }  ,  
        
        {
            name:"Action",
            cell:(row)=>
    
            edit && row.id==detect?
            <button className='btn btn-danger'  onClick={(e)=>MoveToFolder(e,row.id)}><i className='fa fa-arrow-right'></i> Move to Finalized</button>
            :
            row.status['id']==2?
                <>
                    <button className='btn btn-danger'  onClick={(e)=>ReadyToFabricate(e,row.id)} title='Submit to Technical Department'><i class="fa-solid fa-screwdriver-wrench"></i></button> &nbsp;&nbsp;&nbsp;
                    <button className='btn btn-danger'  onClick={(e)=>ElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
                 </> 
                :row.status['id']==3?

                <button className='btn btn-danger'  onClick={(e)=>ElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
                :
                    row.status['id']==6?
                    <>
                    
                    <button className='btn btn-danger'  onClick={(e)=>UnHoldWindow(e,row.id)}><i className="fa-solid fa-arrow-up"></i></button> &nbsp;
                    <button className='btn btn-danger'  onClick={(e)=>ElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
                    </>
                    :
                    <>
                    
                        <button className='btn btn-danger'  onClick={(e)=>HoldWindow(e,row.id)}><i className="fa-solid fa-ban"></i></button> &nbsp;
                        <button className='btn btn-danger'  onClick={(e)=>ElevationPage(e,row.id)}><i className="fa-solid fa-eye"></i></button>
                    </>
               }
        
    ]
     }

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

        { usercheck?

            <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3 mt-5"
            fill
            >
            <Tab eventKey="home" title="Submitted Windows">
            <div className="d-flex flex-column align-items-center">
        {
            edit?
            <Alert variant="danger" className='mt-5'>
            Please provide the required sizes in the corresponding fields to confirm, and then move the unit to the finalize folder.
                </Alert>
            :null
        }
  
        </div>
            <DataTable 
                columns={columns} 
                data={filteredCountries} 
                fixedHeader 
                fixedHeaderScrollHeight="590px"
                selectableRowsHighlight
                highlightOnHover
                subHeader
                ></DataTable>

{
            
            customshutter?
                
            <div className='col-md-12 container-fluid'>
            
                <br></br>  <br></br>
               
            <Table striped bordered hover size="sm">
                <thead>
                    <th colSpan={2}>Dim1</th>
                    <th colSpan={2}>Dim2</th>
                    <th colSpan={2}>Dim3</th>
                    <th colSpan={2}>Dim4</th>
                    <th colSpan={2}>Dim5</th>
                    <th colSpan={2}>Dim6</th>
                </thead>
                <tbody>
             
                
                <tr> 
                <td><Form.Control type="text"  placeholder={"W ="+' '+customshuttervalue.d1s1w} onChange={(e)=> setd1s1w(e.target.value)} name='d1s1w'  /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d1s1h} onChange={(e)=> setd1s1h(e.target.value)} name='d1s1h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d2s1w} onChange={(e)=> setd2s1w(e.target.value)} name='d2s1w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d2s1h} onChange={(e)=> setd2s1h(e.target.value)} name='d2s1h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d3s1w} onChange={(e)=> setd3s1w(e.target.value)}  name='d3s1w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d3s1h} onChange={(e)=> setd3s1h(e.target.value)} name='d3s1h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d4s1w} onChange={(e)=> setd4s1w(e.target.value)} name='d4s1w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d4s1h} onChange={(e)=> setd4s1h(e.target.value)}  name='d4s1h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d5s1w} onChange={(e)=> setd5s1w(e.target.value)} name='d5s1w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d5s1h} onChange={(e)=> setd5s1h(e.target.value)}  name='d5s1h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d6s1w} onChange={(e)=> setd6s1w(e.target.value)} name='d6s1w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d6s1h} onChange={(e)=> setd6s1h(e.target.value)} name='d6s1h'   /></td>                       
                    </tr>
      
                    <tr>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d1s2w}  onChange={(e)=> setd1s2w(e.target.value)} name='d1s2w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d1s2h} onChange={(e)=> setd1s2h(e.target.value)} name='d1s2h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d2s2w} onChange={(e)=> setd2s2w(e.target.value)} name='d2s2w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d2s2h} onChange={(e)=> setd2s2h(e.target.value)} name='d2s2h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d3s2w} onChange={(e)=> setd3s2w(e.target.value)}  name='d3s2w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d3s2h} onChange={(e)=> setd3s2h(e.target.value)} name='d3s2h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d4s2w} onChange={(e)=> setd4s2w(e.target.value)} name='d4s2w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d4s2h} onChange={(e)=> setd4s2h(e.target.value)}  name='d4s2h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d5s2w} onChange={(e)=> setd5s2w(e.target.value)} name='d5s2w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d5s2h} onChange={(e)=> setd5s2h(e.target.value)}  name='d5s2h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d6s2w} onChange={(e)=> setd6s2w(e.target.value)} name='d6s2w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d6s2h} onChange={(e)=> setd6s2h(e.target.value)} name='d6s2h'   /></td>  
                    </tr>
      
                    <tr>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d1s3w}  onChange={(e)=> setd1s3w(e.target.value)} name='d1s3w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d1s3h} onChange={(e)=> setd1s3h(e.target.value)} name='d1s3h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d2s3w} onChange={(e)=> setd2s3w(e.target.value)} name='d2s3w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d2s3h} onChange={(e)=> setd2s3h(e.target.value)} name='d2s3h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d3s3w} onChange={(e)=> setd3s3w(e.target.value)}  name='d3s3w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d3s3h} onChange={(e)=> setd3s3h(e.target.value)} name='d3s3h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d4s3w} onChange={(e)=> setd4s3w(e.target.value)} name='d4s3w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d4s3h} onChange={(e)=> setd4s3h(e.target.value)}  name='d4s3h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d5s3w} onChange={(e)=> setd5s3w(e.target.value)} name='d5s3w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d5s3h} onChange={(e)=> setd5s3h(e.target.value)}  name='d5s3h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d6s3w} onChange={(e)=> setd6s3w(e.target.value)} name='d6s3w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d6s3h} onChange={(e)=> setd6s3h(e.target.value)} name='d6s3h'   /></td> 
                    </tr>
      
                    <tr>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d1s4w}  onChange={(e)=> setd1s4w(e.target.value)} name='d1s4w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d1s4h} onChange={(e)=> setd1s4h(e.target.value)} name='d1s4h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d2s4w} onChange={(e)=> setd2s4w(e.target.value)} name='d2s4w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d2s4h} onChange={(e)=> setd2s4h(e.target.value)} name='d2s4h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d3s4w} onChange={(e)=> setd3s4w(e.target.value)}  name='d3s4w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d3s4h} onChange={(e)=> setd3s4h(e.target.value)} name='d3s4h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d4s4w} onChange={(e)=> setd4s4w(e.target.value)} name='d4s4w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d4s4h} onChange={(e)=> setd4s4h(e.target.value)}  name='d4s4h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d5s4w} onChange={(e)=> setd5s4w(e.target.value)} name='d5s4w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d5s4h} onChange={(e)=> setd5s4h(e.target.value)}  name='d5s4h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d6s4w} onChange={(e)=> setd6s4w(e.target.value)} name='d6s4w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d6s4h} onChange={(e)=> setd6s4h(e.target.value)} name='d6s4h'   /></td> 
                    </tr>
      
                    <tr>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d1s5w}  onChange={(e)=> setd1s5w(e.target.value)} name='d1s5w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d1s5h} onChange={(e)=> setd1s5h(e.target.value)} name='d1s5h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d2s5w} onChange={(e)=> setd2s5w(e.target.value)} name='d2s5w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d2s5h} onChange={(e)=> setd2s5h(e.target.value)} name='d2s5h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d3s5w} onChange={(e)=> setd3s5w(e.target.value)}  name='d3s5w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d3s5h} onChange={(e)=> setd3s5h(e.target.value)} name='d3s5h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d4s5w} onChange={(e)=> setd4s5w(e.target.value)} name='d4s5w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d4s5h} onChange={(e)=> setd4s5h(e.target.value)}  name='d4s5h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d5s5w} onChange={(e)=> setd5s5w(e.target.value)} name='d5s5w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d5s5h} onChange={(e)=> setd5s5h(e.target.value)}  name='d5s5h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d6s5w} onChange={(e)=> setd6s5w(e.target.value)} name='d6s5w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d6s5h} onChange={(e)=> setd6s5h(e.target.value)} name='d6s5h'   /></td> 
                    </tr>
      
                    <tr>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d1s6w}  onChange={(e)=> setd1s6w(e.target.value)} name='d1s6w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d1s6h} onChange={(e)=> setd1s6h(e.target.value)} name='d1s6h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d2s6w} onChange={(e)=> setd2s6w(e.target.value)} name='d2s6w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d2s6h} onChange={(e)=> setd2s6h(e.target.value)} name='d2s6h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d3s6w} onChange={(e)=> setd3s6w(e.target.value)}  name='d3s6w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d3s6h} onChange={(e)=> setd3s6h(e.target.value)} name='d3s6h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d4s6w} onChange={(e)=> setd4s6w(e.target.value)} name='d4s6w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d4s6h} onChange={(e)=> setd4s6h(e.target.value)}  name='d4s6h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d5s6w} onChange={(e)=> setd5s6w(e.target.value)} name='d5s6w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d5s6h} onChange={(e)=> setd5s6h(e.target.value)}  name='d5s6h'   /></td>
                    <td><Form.Control type="text" placeholder={"W ="+' '+customshuttervalue.d6s6w} onChange={(e)=> setd6s6w(e.target.value)} name='d6s6w'   /></td>
                    <td><Form.Control type="text" placeholder={"H ="+' '+customshuttervalue.d6s6h} onChange={(e)=> setd6s6h(e.target.value)} name='d6s6h'   /></td> 
                    </tr>
                </tbody>
            </Table>

            {/* <button className='btn btn-danger'  onClick={(e)=>MoveToFolder(e)}><i className='fa fa-arrow-right'></i> Move to Finalized</button> */}

              </div>
            :null
        }
            </Tab>
            <Tab eventKey="profile" title="Finalized Windows">
            <DataTable 
                columns={Fcolumns} 
                data={FfilteredCountries} 
                title="Windows" 
                fixedHeader 
                fixedHeaderScrollHeight="590px"
                selectableRowsHighlight
                highlightOnHover
                subHeader
                ></DataTable>
            </Tab>

            <Tab eventKey="contact" title="More" className='blur' disabled>
            Tab content for Contact
            </Tab>

   
            </Tabs>
        
        :
            <DataTable 
            columns={Submittedcolumns} 
            data={filteredCountries} 
            title="Windows" 
            fixedHeader 
            fixedHeaderScrollHeight="590px"
            selectableRowsHighlight
            highlightOnHover
            subHeader
            ></DataTable>
        }
 
        </>
    )
}

export default FloorWindows