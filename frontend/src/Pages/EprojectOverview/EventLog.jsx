import React, {useRef,Component, Fragment ,useEffect,useState,useReducer} from 'react'
import NavMenu from '../../Componenets/Common/NavMenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import AppURL from '../../api/AppURL';
import Badge from 'react-bootstrap/Badge';
import cogoToast from 'cogo-toast';
import {CopyToClipboard} from 'react-copy-to-clipboard';
//  components
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { Container,
  Card,

  Row,
  Col,
  Button,
  Modal,
} from 'react-bootstrap';
// core components

import {Link, useNavigate} from 'react-router-dom';
function EventLog() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[divshow,setdivshow]=useState(false);
  const[variationform,setvariationform]=useState(false);
  const[singleProject,setsingleProject]=useState([]);
  const[variation,setvariation]=useState([]);
  const[manager,setmanager]=useState([]);
  const[singleProjectclone,setsingleProjectclone]=useState([]);
  const project_id=location.state.project;
  const main_id=location.state.mainid;
  const paid=location.state.pa;
  const check_login=sessionStorage.getItem('login');
  const [partialloading,setpartialloading]=useState(true);
  const [loading,setLoading]=useState(true);
  const[pterms,setpaymentterms]=useState([]);
  const[searchimpactresult,Setsearchimpactresult]=useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [dirty, setDirty] = React.useState(false);
  const [buttonClicked, setButtonClicked] = useState(true);
  const [showedit, setShowEdit] = useState(false);
  const markFormDirty = () => setDirty(true);
  const [projectevent, setProjectEvent] = useState(true);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
 
  const [fullscreen, setFullscreen] = useState(true);
  const[paymentdiv,setpaymentshow]=useState(false);
  const[editdescription,seteditdescription]=useState([]);
  const[editdate,seteditdate]=useState([]);
  const[editimpact,seteditimpact]=useState([]);
  const[catimpact,setcatimpact]=useState([]);
  
  const[searchimpactDiv,SetsearchimpactDiv]=useState(false);
  const[editlink,seteditlink]=useState([]);
  const[editid,seteditid]=useState([]);

  const[searchdate1,setsearchdate1]=useState([]);
  const[searchdate2,setsearchdate2]=useState([]);
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState('');
  const textAreaRef = useRef(null);
  
  const[countries,setCountries]=useState([]);
  const[search,setSearch]=useState([]);
  const[filteredCountries,setFilteredCountries]=useState([]);
  let d =  new Date()
  useEffect(()=>{
      if(!check_login){
          navigate('/login')
        }
        
        handleShow();
        ProjectDetails();
        window.addEventListener('popstate', (event) => {
          cogoToast.error("You Can not use this button to go back, Please use designated button to go back ,your unsaved data will be Lost ...",{hideAfter:10});
       
          
            window.removeEventListener('popstate')
      });
        
      },[ignored])


  if(dirty){
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
    
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage;                            //Webkit, Safari, Chrome
      
    });  

  }
   


  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

const goback=(e)=>{
    e.preventDefault()
  if(dirty){
    let result = window.confirm("You have unsaved changes, are you sure you want to leave this page ?")
    if (result == true) {
      e.preventDefault();
      navigate('/single-project-details',{state:{mainid:main_id,varreturn:false,}});
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    navigate('/single-project-details',{state:{mainid:main_id,payreturn:false,varreturn:false}});
  }
 
}


useEffect(()=> {
  const result=countries.filter(project=>{
     // return project.project_name.toLowerCase().match(search.toLowerCase()) || project.project_id.toLowerCase().match(search.toLowerCase());
      return  project.eventdescription.toString().match(search.toLowerCase());
  });
  setFilteredCountries(result);
},[search])
const columns =[

{
name:<h6><strong>Date</strong></h6>,
width:"300px",
selector:(row) =>   
<Badge bg="success" className='p-3 mt-2 mb-2'><h6>{new Date(row.eventdate).toLocaleString('en-us',{day:'numeric',month:'short', year:'numeric'})}</h6>
<h6>{row.category}</h6>
<h6>{row.eventimpact}</h6>
</Badge>
}  ,
{
  name:<h6><strong>Description</strong></h6>,
  selector:(row) =>
  // <h6 style={{ maxWidth: '100%', overflow: 'hidden', wordBreak: 'break-all' }}>{row.eventdescription}</h6>
  <textarea style={{ maxWidth: '200%',resize:'horizontal',resize:'vertical' }} readOnly>{row.eventdescription}</textarea> ,
  sortable:true
}  ,


{
  name:<h6><strong>Link</strong></h6>,
  selector:(row) =>  <textarea readOnly>{row.link}</textarea>,
 
}  ,  

{
  cell:(row)=>
  <>
          
          <CopyToClipboard text={row.link}
                                       onCopy={()=>setCopied(true)}
                                     >
                                       <button className='btn btn-danger'><i className='fa fa-copy'></i></button>
                                     </CopyToClipboard>
                                                                  &nbsp;
                                  {
                                    
                                  showedit?
                                  <>
                                  <Button disabled onClick={(e)=> UpdateLog(e,row.eventid,row.eventdate,row.eventimpact,row.eventdescription,row.link,row.category)}  variant="danger" type='submit'><i className='fa fa-pencil'></i></Button>&nbsp;
                                  <Button disabled onClick={(e)=> DeleteLog(e,row.eventid)}  variant="danger" type='submit'><i className='fa fa-trash'></i></Button>
                                 </>
                                  :
                                    <>
                                    <Button onClick={(e)=> UpdateLog(e,row.eventid,row.eventdate,row.eventimpact,row.eventdescription,row.link,row.category)}  variant="danger" type='submit'><i className='fa fa-pencil'></i></Button>&nbsp;
                                    <Button  onClick={(e)=> DeleteLog(e,row.eventid)}  variant="danger" type='submit'><i className='fa fa-trash'></i></Button>
                                </>
                                }
                                
  </>
}
]



const UpdateLog=(e,id,date,impact,desc,link,cat)=>{
  e.preventDefault();
  
  seteditdescription(desc);
  seteditdate('')
  seteditdate(date);
  seteditimpact(impact);
  setcatimpact(cat)
  seteditlink(link);
  seteditid(id)
  setShowEdit(true)
  SetsearchimpactDiv(false)
    //navigate('/project-list');
     
}



const DeleteLog=(e,id)=>{
  e.preventDefault();
  

  axios.get(AppURL.DeleteEventLog(id),{ 
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}).then(response =>{ 
    cogoToast.success("Event Log deleted successfully...",{position:'top-right'});
    forceUpdate(); 

  })
  // seteditdescription(desc);
  // seteditdate(date);
  // seteditimpact(impact);
  // seteditlink(link);
  // seteditid(id)
  // setShowEdit(true)
  // SetsearchimpactDiv(false)
    //navigate('/project-list');
     
}
const searchimpact=(e,value)=>{
  e.preventDefault();
  setLoading(true)
  const data={
    projectid:project_id,
    eventimpact:value
  }

  axios.post(AppURL.SearchEventByImpact,data,{
          
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Token "+sessionStorage.getItem("token"),
  },}
  ).then(response =>{  
    if(response){
    Setsearchimpactresult(response.data);
    SetsearchimpactDiv(true);
    setLoading(false);
    forceUpdate();
    }
    })
  
    
  }

  const searchcategory=(e,value)=>{
    e.preventDefault();
    setLoading(true)
    const data={
      projectid:project_id,
      category:value
    }
  
    axios.post(AppURL.SearchEventByCAT,data,{
            
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}
    ).then(response =>{  
      if(response){
      Setsearchimpactresult(response.data);
      SetsearchimpactDiv(true);
      setLoading(false);
      forceUpdate();
      }
      })
    
      
    }
  
  const searchdate=(e,date2)=>{
    e.preventDefault();
    //setLoading(true)
    const data={
      projectid:project_id,
      date1:searchdate1,
      date2:date2
    }
  console.log(data)
    axios.post(AppURL.SearchEventByDate,data,{
            
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Token "+sessionStorage.getItem("token"),
    },}
    ).then(response =>{  
      if(response){
      Setsearchimpactresult(response.data);
      SetsearchimpactDiv(true);
      setLoading(false);
      forceUpdate();
      }
      })
    
      
    }
const mainpage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}


const savelogedit=(e)=>{
  e.preventDefault();
  //alert('not available');
  const data={
    // void:varid,
    editid:editid,
    editdescription:editdescription,
    editdate:editdate,
    editimpact:editimpact,
    editlink:editlink,
    category:catimpact
}


axios.post(AppURL.EditProjectEvents,data,{
          
  headers: {
  "Content-Type": "application/json",
  "Authorization": "Token "+sessionStorage.getItem("token"),
},}
).then(response =>{  
  if(response.status===201){
    cogoToast.success('Project Log Updated Successfully...')
    // seteditdescription("");
    
     seteditdate('');
    // seteditimpact("");
    // seteditlink("");
    // seteditid("")
    // setcatimpact("")
    setShowEdit(false)
    forceUpdate();
    setDirty(false);
    //e.currentTarget.reset();
    //forceUpdate()
  
  }
  else{
    cogoToast.error('Something Went Wrong...')
  }
  // 
  // forceUpdate();
  // setvariationform(false)
  // setdivshow(true)
})
    //navigate('/project-list');
     
}
const exportExcel = () => {
  // import('xlsx').then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(products);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //     const excelBuffer = xlsx.write(workbook, {
  //         bookType: 'xlsx',
  //         type: 'array'
  //     });

  //     saveAsExcelFile(excelBuffer, 'products');
  // });
};

const updateProjectLog=(e)=>{
    e.preventDefault();
     // alert(main_id)
    const data={
        // void:varid,
        eventdate:e.target.eventdate.value,
        eventdescription:e.target.eventdescription.value,
        eventimpact:e.target.eventimpact.value,
        link:e.target.link.value,
        category:e.target.category.value,
        projectid:project_id,
        mainid:main_id,
    }

    axios.post(AppURL.UpdateProjectEvents,data,{
          
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+sessionStorage.getItem("token"),
      },}
      ).then(response =>{  
        if(response.status===201){
          cogoToast.success('Project Log Updated Successfully...')
          forceUpdate();
          setDirty(false)
          seteditdate("");
          e.target.reset();
        }
        else{
          cogoToast.error('Something Went Wrong...')
        }
        // 
        // forceUpdate();
        // setvariationform(false)
        // setdivshow(true)
    })
  }


    const UpdateVariation=(e,varid,voamount,vodescription,voapprovalstatus,voapprovalform,voapprovaldate)=>{

      navigate('/edit-variation',{state:{project:project_id,vid:varid}})
   }

    

      const ProjectDetails = async()=>{
        try{
    
    
    
          
          const events = await axios.get(AppURL.GetProjectEvents(main_id))
          //if(events.data.length>0){
            setProjectEvent(events.data);
            setCountries(events.data);
            setFilteredCountries(events.data)
            setLoading(false);
          //}


        //   const terms = await axios.get(AppURL.PaymentTerms)
        //   setpaymentterms(terms.data);
          
         

        }catch(error){
            console.log(error);
        }
        console.log(filteredCountries)
    }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
        function convertArrayOfObjectsToCSV(array) {
          
          let result;
          console.log(countries)
          const columnDelimiter = ',';
          const lineDelimiter = '\n';
          const keys = Object.keys(array[0]);
          //console.log(keys)
          result = '';
          result += keys.join(columnDelimiter);
          result += lineDelimiter;

          array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
              if (ctr > 0) result += columnDelimiter;

              result += item[key];
              
              ctr++;
            });
            result += lineDelimiter;
          });

          return result;
        }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
      function downloadCSV(array) {
        
        const events =  axios.get(AppURL.GetProjectEvents(main_id))
        axios.get(AppURL.GetProjectEvents(main_id)).then(response=>{
          if(response.data.length>0){
            //console.log(response.data)
            const link = document.createElement('a');
            let csv = convertArrayOfObjectsToCSV(response.data);
            if (csv == null) return;

            const filename = 'export.csv';

            if (!csv.match(/^data:text\/csv/i)) {
              csv = `data:text/csv;charset=utf-8,${csv}`;
            }

            link.setAttribute('href', encodeURI(csv));
            link.setAttribute('download', filename);
            link.click();
          }
        })
       
      }

    const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredCountries)} />, []);

        if(loading){
        return(
            <>Loading please wait...</>
            )
        }

      else{
            return(

                <Fragment>
             
 <div
      
      
    >
       
      <div size="xl" show={show} fullscreen={fullscreen}>
      
                      <Col md="12">
                      <Row className='p-2' >
                      <Col md="2"> <h3 className=''>Event Logs</h3></Col>
                        <Col md="8"  className='d-print-none'> 


                        <tr  style={{display:'flex' }} >
                        
                        <td>
                          <input type="date" onChange={(e)=>setsearchdate1(e.currentTarget.value)} class="form-control" id="exampleFormControlInput1" placeholder="" name='eventdate' required ></input>

                          </td>
                          &nbsp;&nbsp;
                          <td>
                          <input type="date" class="form-control" id="exampleFormControlInput1"  onChange={(e)=>searchdate(e,e.currentTarget.value)} placeholder="" name='eventdate' required></input>

                          </td>
                          &nbsp;
                          <td>

                          <select   onChange={(e)=>searchimpact(e,e.currentTarget.value)} style={{padding:'7px',width:'120%' }} class="form-select form-select-sm" aria-label=".form-select-sm example" name='eventimpact' title='Offer' >
                            <option disabled selected>Select option to filter</option>
                            <option value={'No Change'}>No Change</option>
                            <option value={'Follow Up'}>Follow Up</option>
                            <option value={'Delayed'}>Delay</option>

                          </select>    </td>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <td>
                              
                              <select onChange={(e)=>searchcategory(e,e.currentTarget.value)}   class="form-select form-select-sm" style={{padding:'7px',width:'120%' }} aria-label=".form-select-sm example" name='category' title='category' >
                              <option disabled selected>Select Category to filter</option>
                                <option value={'NA'}>NA</option>
                                <option value={'Site Meaurement'}>Site Meaurement</option>
                                <option value={'Shop Drawings'}>Shop Drawings</option>
                                <option value={'Fabrication'}>Fabrication</option>
                                <option value={'Installation'}>Installation</option>
                                <option value={'Material Submission'}>Material Submission</option>
                                <option value={'Payment'}>Payment</option>
                                <option value={'Photo Shoot'}>Photo Shoot</option>
                                <option value={'Mockup'}>Mockup</option>
                                <option value={'Procurement'}>Procurement</option>
                                <option value={'Variations'}>Variations</option>


                                

               
                              </select>    </td>
                      
                          </tr>
                           </Col>
                           <Col md="2">
                        <button className='btn btn-danger'  onClick={(e)=> goback(e)} ><i className='fa fa-arrow-left'></i> Back</button> &nbsp;&nbsp;
                       <button className='btn btn-danger'  onClick={(e)=> mainpage(e)} ><i className='fa fa-arrow-left'></i> Homepage</button>
                   </Col>
                        </Row>
                       </Col>
                    
                       
        <Modal.Header >
          <Modal.Title>

          {/* <Row className=''>
                      <Col md="12">
                       
                       <h3 className=''>Event Logs</h3>
                      
                       </Col>
                    
                       </Row> */}

                       
    
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <div className='container-fluid dashboard-background-color mt-2'>
                     
                     <div className="content ">

                <div className=''>
           
                 
                               
                                 
{/*       
                            <Table>
                                <thead>
                                          
                                </thead>
                                   
                <tbody>
                                    {
                projectevent.map((vari,sr)=>{
                      console.log(vari);
                        return(
                            <tr className=''>
                                <td>
                                <Badge bg="success" className='p-3'>{vari.eventdate}
                                <br></br>
                                <p className='mt-2'>
                               
                                {vari.eventimpact}
                                </p>
                                
                                </Badge>
                                </td>

                                <td>
                                    { vari.eventdescription}
                                </td>
                                <td onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}>
                                    { vari.link}
                                </td>
        
                                <td>
                                  
                                <CopyToClipboard text={vari.link}
                                       onCopy={()=>setCopied(true)}
                                     >
                                       <button className='btn btn-primary'><i className='fa fa-copy'></i></button>
                                     </CopyToClipboard>
                                                                  &nbsp;
                                  {
                                    
                                  showedit?
                                  <Button disabled onClick={(e)=> UpdateLog(e,vari.eventid,vari.eventdate,vari.eventimpact,vari.eventdescription,vari.link)}  variant="danger" type='submit'>edit</Button>
                                    :
                                    <Button onClick={(e)=> UpdateLog(e,vari.eventid,vari.eventdate,vari.eventimpact,vari.eventdescription,vari.link)}  variant="danger" type='submit'>edit</Button>
                                }
                                
                                </td>

                            </tr>

                            )
                
                    
                    })
    
                    
                    }  
                        </tbody>    
                            </Table> */}
                
                  {/* <button className='btn btn-danger'  onClick={(e)=> UpdateVariation(e,vari.void,vari.voamount,vari.vodescription,vari.voapprovalstatus,vari.voapprovalform,vari.voapprovaldate)}>Edit</button> */}
                  <Row>
          <Col md="12">
            <Card className=''>
              <>

              {searchimpactDiv?

                     <Table>
                     <thead>
                               
                     </thead>
                        
     <tbody>
                         {
                          searchimpactresult.length=='0'?
                            <p>Data not found...</p>
                            :
     searchimpactresult.map((vari,sr)=>{
           console.log(vari);
             return(
                 <tr className=''>
                     <td>
                     <Badge bg="success" className='p-3 mt-2 mb-2'><h6>{vari.eventdate}</h6>
                        <h6>{vari.category}</h6>
                        <h6>{vari.eventimpact}</h6>
                        </Badge>
                     </td>

                     <td>
                         { vari.eventdescription}
                     </td>
                     <td onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}  className='d-print-none'>
                         { vari.link}
                     </td>

                     <td  className='d-print-none'>
                       
                     <CopyToClipboard text={vari.link}
                            onCopy={()=>setCopied(true)}
                          >
                            <button className='btn btn-primary'><i className='fa fa-copy'></i></button>
                          </CopyToClipboard>
                                                       &nbsp;
                       {
                         
                       showedit?
                       <Button disabled onClick={(e)=> UpdateLog(e,vari.eventid,vari.eventdate,vari.eventimpact,vari.eventdescription,vari.link,vari.category)}  variant="danger" type='submit'>edit</Button>
                         :
                         <Button onClick={(e)=> UpdateLog(e,vari.eventid,vari.eventdate,vari.eventimpact,vari.eventdescription,vari.link,vari.category)}  variant="danger" type='submit'>edit</Button>
                     }
                     
                     </td>

                 </tr>

                 )
     
         
         })

         
         }  
             </tbody>    
                 </Table> 
     
      
                :  
                <>
                
                <DataTable 
                columns={columns} 
                data={filteredCountries} 
                actions={actionsMemo} 
                fixedHeader
                //  pagination title="Event Logs" 
                pagination
                fixedHeaderScrollHeight="590px"
                paginationRowsPerPageOptions={[10, 30, 50, 100]}
                
                selectableRowsHighlight
                // expandableRows
                highlightOnHover
                subHeader
                // buttons =
                //   {
                //        extend= 'excel',
                //        text= 'Save current page',
                //        fileName=  "data.xlsx",
                //        exportOptions= {
                //        modifier= {
                //                page= 'current'
                //                    }
                //          }
                //       }
                 
                subHeaderComponent={
                  
                  <>
                    <input style={{marginBottom:'-10px'}}
                    type="text" 
                    placeholder='Search here' 
                    className='w-25 form-control' 
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}>
                    </input>
                    </>
                }
            ></DataTable>
            </>
              }
           
                {/* <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Title</th>
                              <th>Location</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody> */}
                            {/* {
                              
                              projects.map((project,sr)=>{
                                return(
                             
                                )
                              })
                            } */}

                          {/* </tbody>
                        </Table> */}
              </>
              <Card.Body>
               
              </Card.Body>
             
            </Card>
          </Col>
        </Row>
                         
                  <form className='mt-3 d-print-none' onSubmit={updateProjectLog} onChange={markFormDirty} >
                            <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Impact</th>
                                <th>Description</th>
                                <th>Link</th>
                              </tr>
                            </thead>
                            <tbody>

                              {

                                showedit?
                                <tr>

                            
                                <td>
                                <input type="date" class="form-control" id="exampleFormControlInput1"  onChange={(e)=>seteditdate(e.currentTarget.value)} placeholder="" name='eventdate1' required defaultValue={editdate}></input>
                      
                                </td>

                                <td>
                                
                                <select  class="form-select form-select-sm" aria-label=".form-select-sm example"  onChange={(e)=>setcatimpact(e.currentTarget.value)} name='eventcat1' title='Offer' >
                   

                                {
                                    (catimpact=='NA')?
                                    <option value={'NA'} selected>NA</option>
                                    :
                                    <option value={'NA'}>NA</option>
                                  }

                                  {
                                    (catimpact=='Site Meaurement')?
                                    <option value={'Site Meaurement'} selected>Site Meaurement</option>
                                    :
                                    <option value={'Site Meaurement'}>Site Meaurement</option>
                                  }

                                  {
                                    (catimpact=='Shop Drawings')?
                                    <option value={'Shop Drawings'} selected>Shop Drawings</option>
                                    :
                                    <option value={'Shop Drawings'}>Shop Drawings</option>
                                  }

                                      {
                                    (catimpact=='Fabrication')?
                                    <option value={'Fabrication'} selected>Fabrication</option>
                                    :
                                    <option value={'Fabrication'}>Fabrication</option>
                                  }

                                {
                                    (catimpact=='Installation')?
                                    <option value={'Installation'} selected>Installation</option>
                                    :
                                    <option value={'Installation'}>Installation</option>
                                  }

                              {
                                    (catimpact=='Material Submission')?
                                    <option value={'Material Submission'} selected>Material Submission</option>
                                    :
                                    <option value={'Material Submission'}>Material Submission</option>
                                  }
                                  

                                    {/* {
                                    (catimpact=='')?
                                    <option value={''} selected></option>
                                    :
                                    <option value={''}></option>
                                  } */}

                    {/* 
                                <option value={'NA'}>NA</option>
                                <option value={'Site Meaurement'}>Site Meaurement</option>
                                <option value={'Shop Drawings'}>Shop Drawings</option>
                                <option value={'Fabrication'}>Fabrication</option>
                                <option value={'Installation'}>Installation</option>                     */}
                                </select>    </td>
                             
                                <td>
                                
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example"  onChange={(e)=>seteditimpact(e.currentTarget.value)} name='eventimpact1' title='Offer' >
                                {
                                    (editimpact=='No Change')?
                                    <option value={'No Change'} selected>No Change</option>
                                    :
                                    <option value={'No Change'}>No Change</option>
                                  }

                                {
                                  (editimpact=='Follow Up')?
                                    <option value={'Follow Up'} selected>Follow Up</option>
                                    :
                                    <option value={'Follow Up'}>Follow Up</option>
                                  }

                                {
                                  (editimpact=='Delayed')?
                                    <option value={'Delayed'} selected>Delay</option>
                                    :
                                    <option value={'Delayed'}>Delay</option>
                                  }


                 
                                </select>    </td>
                             
                                <td>
                                <textarea type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='eventdescription1' onChange={(e)=>seteditdescription(e.currentTarget.value)} defaultValue={editdescription} ></textarea>
                                </td>
  
                                <td>
                                <input type="text" class="form-control" id="exampleFormControlInput1" onChange={(e)=>seteditlink(e.currentTarget.value)} placeholder="" name='link1' defaultValue={editlink} required></input>                 
                                </td>
                                
                                <td>
                                <Button  onClick={(e)=> savelogedit(e)}   variant="primary" type='submit'>Update</Button>
                                </td>
                               
                              </tr>
                             :
                              
                            <tr>

                            
                              <td>
                              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" name='eventdate' required></input>
                    
                              </td>
                              <td>
                              
                              <select  class="form-select form-select-sm" aria-label=".form-select-sm example" name='category' title='category' >
                                <option value={'NA'}>NA</option>
                                <option value={'Site Meaurement'}>Site Meaurement</option>
                                <option value={'Shop Drawings'}>Shop Drawings</option>
                                <option value={'Fabrication'}>Fabrication</option>
                                <option value={'Installation'}>Installation</option>

                                <option value={'Material Submission'}>Material Submission</option>

                                <option value={'Payment'}>Payment</option>
                                <option value={'Photo Shoot'}>Photo Shoot</option>
                                <option value={'Mockup'}>Mockup</option>
                                <option value={'Procurement'}>Procurement</option>
                                <option value={'Variation'}>Variation</option>

                              </select>    </td>
                              <td>
                              
                              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name='eventimpact' title='Offer' >

                                <option value={'No Change'}>No Change</option>
                                <option value={'Follow Up'}>Follow Up</option>
                                <option value={'Delayed'}>Delay</option>
               
                              </select>    </td>
                           
                              <td>
                              <textarea type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='eventdescription'  ></textarea>
                              </td>

                              <td>
                              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" name='link' ></input>                 
                              </td>
                              
                      
                             
                            </tr>
                             }
                            </tbody>
                        </Table>
                        <Row  className='d-print-none'>
                        <Col md="10">
                        {/* <button className='btn btn-danger'  onClick={(e)=> goback(e)} ><i className='fa fa-arrow-left'></i> Back</button> &nbsp;&nbsp;
                       <button className='btn btn-danger'  onClick={(e)=> mainpage(e)} ><i className='fa fa-arrow-left'></i> Homepage</button> */}
                   </Col>
                   <Col md="2">
                    {
                      showedit?
                        null
                      :<Button variant="success" type='submit'>Add New</Button>
                    }
                        
                        </Col>
                        </Row>
                        </form>
                        
               </div></div></div>

            
        </Modal.Body>

        <Modal.Footer>
     
                       
          
        </Modal.Footer>
      </div>
    </div>
             

               
           

     </Fragment>
            )
        }
     

}

export default EventLog