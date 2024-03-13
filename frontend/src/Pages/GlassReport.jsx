import React, {useRef,Component, Fragment ,useEffect,useState,useReducer} from 'react'
import NavMenu from '../Componenets/Common/NavMenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import AppURL from '../api/AppURL';
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
function GlassReport() {
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
  const paid=location.state.pa;
  const check_login=sessionStorage.getItem('login');
  const [partialloading,setpartialloading]=useState(true);
  const [loading,setLoading]=useState(true);
  const[pterms,setpaymentterms]=useState([]);
  const[searchimpactresult,Setsearchimpactresult]=useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [dirty, setDirty] = React.useState(false);
  const [buttonClicked, setButtonClicked] = useState(true);
  const [showdetails, setshowdetails] = useState(false);
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
  
  const[details,setdetails]=useState(false);
  const[editlink,seteditlink]=useState([]);
  const[glass,setglass]=useState([]);

  const[searchdate1,setsearchdate1]=useState([]);
  const[glassbooking,setglassbooking]=useState([]);
  const [value, setValue] = useState('');
  const [glasssummary, setglasssummary] = useState('');
  const textAreaRef = useRef(null);
  const status=sessionStorage.getItem('code');
  
  const[countries,setCountries]=useState([]);
  const[search,setSearch]=useState([]);
  const[filteredCountries,setFilteredCountries]=useState([]);
  let total_order=0
  let total_rec=0
  useEffect(()=>{
      if(!check_login){
          navigate('/login')
        }
        axios.get(AppURL.GetGlassProjectSummary(project_id)).then(response=>{
            
            axios.get(AppURL.GetGlassBookingDetails(parseInt(response.data))).then(bresponse=>{
                setglassbooking(bresponse.data)
                //alert(response.data)
                console.log(bresponse.data)
                axios.get(AppURL.GetGlassSummaryDetails(response.data)).then(gresponse=>{
                    setglasssummary(gresponse.data)
                    axios.get(AppURL.GetGlassType).then(glassresponse=>{
                        setglass(glassresponse.data)
                        console.log(glassresponse.data)
                        setLoading(false)
                    })
                })
            })
            //alert(item.is_both);
            })
            if(status=='SI' || status=='PI'){

            }
            else{
                window.addEventListener('popstate', (event) => {
                    cogoToast.error("You Can not use this button to go back, Please use designated button to go back ,your unsaved data will be Lost ...",{hideAfter:10});
                 
                    
                      window.removeEventListener('popstate')
                });
            }
    
        
      },[ignored])


  if(dirty){
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
    
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage;                            //Webkit, Safari, Chrome
      
    });  

  }
   
  function seedetails() {
    setshowdetails(true);
  }

const goback=(e)=>{
    e.preventDefault()
  if(dirty){
    let result = window.confirm("You have unsaved changes, are you sure you want to leave this page ?")
    if (result == true) {
      e.preventDefault();
      navigate('/single-project-details',{state:{id:project_id,varreturn:false,}});
    }
    else{
      cogoToast.info("Please update records before leaving the page... ")
    }
  }
  else{
    e.preventDefault();
    navigate('/single-project-details',{state:{id:project_id,payreturn:false,varreturn:false}});
  }
 
}


useEffect(()=> {
  const result=countries.filter(project=>{
     // return project.project_name.toLowerCase().match(search.toLowerCase()) || project.project_id.toLowerCase().match(search.toLowerCase());
      return  project.eventdescription.toString().match(search.toLowerCase());
  });
  setFilteredCountries(result);
},[search])



const mainpage=(e)=>{
  e.preventDefault();
    navigate('/project-list');
     
}



const updateProjectLog=(e)=>{
    e.preventDefault();
      
    const data={
        // void:varid,
        eventdate:e.target.eventdate.value,
        eventdescription:e.target.eventdescription.value,
        eventimpact:e.target.eventimpact.value,
        link:e.target.link.value,
        category:e.target.category.value,
        projectid:project_id
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


        if(loading){
        return(
            <>Loading</>
            )
        }

      else{
            return(

                <Fragment>
             
 <div   >
       
      
                      <Col md="12">
                      <Row className='p-3' >
                      <Col md="2"> <h3 className=''>Glass Summary</h3></Col>
               
                        </Row>
                       </Col>
                    
        <div className='container-fluid dashboard-background-color mt-2'>
                     
                     <div className="content ">
               {
                      glasssummary.map((single,i)=>{
                        total_order=single.quantity+total_order
                        total_rec=single.recieved+total_rec
             })
               }
                <div className=''>
                  <form className='mt-3 d-print-none' onSubmit={updateProjectLog} onChange={markFormDirty} >
                            <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Inquired at</th>
                                <th>Quotation Date</th>
                                <th>Status</th>
                                <th>Booking Date</th>
                                <th>ETA</th>
                                <th>PO</th>
                                <th>QRF</th>
                                <th>Glass Type</th>
                                <th>Area</th>
                                <th>Glass Processor</th>
                              </tr>
                            </thead>
                            <tbody>

                              {                          
                            <tr>
                              <td>
                                {glassbooking.inquiry_date}
                              </td>
                              <td>
                                {glassbooking.quotation_receiving_date}
                              </td>
                              <td>
                                {glassbooking.status}
                              </td>
                              <td>
                                {glassbooking.booking_cofirmation_date}
                              </td>
                              <td>
                                {glassbooking.eta}
                              </td>

                              <td>
                                {glassbooking.purchaseRef}
                              </td>

                              <td>
                                {glassbooking.QuotationRef}
                              </td>
                              <td>
                                {
                                glass.map((gl,i)=>{
                                    if(glassbooking.GlassType==gl.glassid){
                                        return(
                                            gl.glasstype
                                        )
                                    }
                                })
                                }
                              </td>
                              <td>
                                {glassbooking.area}
                              </td>

                              
                              <td>
                                {glassbooking.GlassProcessor['title']}
                              </td>
                            </tr>
                             }
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th colSpan={5}>Short Glass Summary</th>
                                <th>Ordered</th>
                                <th>Recieved</th>
                                <th>Balance</th>
                                <th>Action</th>
                          
                              </tr>
                            </thead>
                            <tbody>

                              {                          
                            <tr>
                              <td>
                                
                              </td>
                              <td>
                               
                              </td>
                              <td>
                               
                              </td>
                              <td>
                              
                              </td>
                              <td>
                             
                              </td>

                              <td>
                                {total_order}
                              </td>

                              <td>
                                {total_rec}
                              </td>

                              <td>
                                {total_order-total_rec}
                              </td>
                                <td><Button className='btn btn-success' onClick={seedetails}>Details</Button></td>
                            
                            </tr>
                             }
                            </tbody>
                        </Table>
                      
                        {
                            showdetails?
                            
                        
                        <Table striped bordered hover>
                            <thead>
                              <tr>
                              <th>S.N</th>
                                <th>Barcode</th> 
                            
                                <th>Refrence</th>
                                
                                {/* <th>Glass Type</th> */}
                                <th>Glass refrence</th>
                                <th>OP Width</th>
                                <th>OP Height</th>
                                <th>IP Width</th>
                                <th>IP Height</th>
                                <th>Ordered Qty</th>
                                <th>Recieved</th>
                                <th>Balance</th>
                                <th>Area</th> 
                                <th>System</th>
                                <th>Uinsert</th>
                                <th>Location</th>
                                <th>Remarks</th>
                              </tr>
                            </thead>
                            <tbody>

                              {           
                            glasssummary.map((single,i)=>{
                                // total_order=single.quantity+total_order
                                // total_rec=single.recieved+total_rec
                                return(
                                    <tr>
                        <td>{i+1}
                            </td>
           
                                <td>{single.barcode}</td>
                         
                            
                              <td>{single.WindowRef}</td>
                              {/* <td>{
                              GlassType.map((glass,sr)=>{
                                if(single.FinalTentaiveGlassType==glass.id){
                                    return(
                                        glass.title
                                    )
                                }})
                         
                                }</td> */}
                                {/* <td></td> */}
                                <td>{single.GlassRef}</td>
                              <td>{single.ipwidth}</td>

                              <td>{single.ipheight}</td>
                              <td>{single.opwidth}</td>
                              <td>{single.opheight}</td>
                              <td>{single.quantity}</td>
                              <td>{single.recieved}</td>
                            <td >{(single.quantity-single.recieved)>0?
                                    <span className='red-text'>{single.quantity-single.recieved}</span>
                                    :
                                    single.quantity-single.recieved
                                    }</td>
                              {/* <td>{single.area}</td> */}
                
                                <td>{single.area}</td>
                      
                              <td>{single.system}</td>
                              <td>{single.uinsert}</td>
                              <td>{single.location}</td>
                              <td>{single.remarks}</td>
                                </tr>
                                )
                            })         
                           
                             }
                            </tbody>
                        </Table>
                    :
                    null
                }
                   
                   {
                    status=='SI' || status=='PI'?
                    null
                    :
                    <Row  className='d-print-none'>
                    <Col md="10">
                    <button className='btn btn-danger'  onClick={(e)=> goback(e)} ><i className='fa fa-arrow-left'></i> Back</button> &nbsp;&nbsp;
                   <button className='btn btn-danger'  onClick={(e)=> mainpage(e)} ><i className='fa fa-arrow-left'></i> Homepage</button>
               </Col>
               
              
                </Row>
                   }
                       

                    
                    </form>     
               </div></div></div>

       
    </div>
             

               
           

     </Fragment>
            )
        }
     

}

export default GlassReport