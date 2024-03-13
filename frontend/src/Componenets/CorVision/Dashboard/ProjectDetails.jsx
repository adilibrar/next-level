import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import NavMenu from '../../Common/NavMenu';
import cogoToast from 'cogo-toast';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import AppURL from '../../../api/AppURL';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
//  components
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { Container,
  Card,

  Row,
  Button,
  Col,
} from 'react-bootstrap';
// core components

import {Link, useNavigate} from 'react-router-dom';
function ProjectDetails() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojects]=useState([]);
  const[projectref,setprojectref]=useState([]);
  const[tentativeglass,settentativeglass]=useState([]);
  const[stocklist,setstocklist]=useState([]);
  const[glassbooking,setglassbooking]=useState([]);
  const[glasscuttig,setglasscuttig]=useState([]);
  const[GlassPO,setGlassPO]=useState([]);
  
  const[codevalidating,setcodevalidating]=useState(false);
  const[glassstatus,setglassstatus]=useState(0);
  const[pcodevalidating,setpcodevalidating]=useState(false);
  const[testvalidating,settestvalidating]=useState(false);
  const[scodevalidating,setscodevalidating]=useState(false);
  const [loading,setLoading]=useState(true);
  const[cutingid,setcuttingid]=useState([]);
  const project_id=location.state.id;
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const check_login=sessionStorage.getItem('login');
  const [damageshow, setdamageshow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  //let glassstatus=0
  let gid=0
  //const code=''
  useEffect(()=>{
      if(!check_login){
          navigate('/login')
   
        }
        else{
         const code=sessionStorage.getItem('code');
          if(code=='CORDI'){
            setcodevalidating(true)
          }

          if(code=='PI'){
            setpcodevalidating(true)
          }
          
          if(code=='SI'){
            setscodevalidating(true)
          }

          if(code=='TT'){
            settestvalidating(true)
          }
        }

        axios.get(AppURL.MTOListByProject(project_id)).then(response=>{
          setprojects(response.data);
          //setLoading(false);
        })

        axios.get(AppURL.ProjectDetail(project_id)).then(response=>{
          setprojectref(response.data['refrence_no']);
          console.log(response.data['refrence_no'])
          //setLoading(false);
        })
        

        axios.get(AppURL.GetStockListAll(project_id)).then(response=>{
            setstocklist(response.data);
            //setLoading(false);
            //setprojectref
            
          })

          axios.get(AppURL.GetTentativeGlassList(project_id)).then(response=>{
            settentativeglass(response.data);
            //setLoading(false);
            //console.log(response.data['projectpo'])
            
          })
          
          axios.get(AppURL.GetGlassPO(project_id)).then(response=>{
            setGlassPO(response.data);
        
            //console.log(response.data)
            //setLoading(false);
          })
          
          
          axios.get(AppURL.GetGlassBookingShort(project_id)).then(response=>{
            setglassbooking(response.data);
           
            //setLoading(false);
            
            if(response.data !='0'){
              setglassstatus(1)
                 //console.log("Not 0")
              axios.get(AppURL.GetGlassCutting(project_id)).then(response=>{
                setglasscuttig(response.data);
                
                //setLoading(false);
              })
            }

            else{
              <></>
            }

            setLoading(false)
          })
          
        
      },[ignored])

      
const ProjectGlassReport=(e)=>{

  navigate('/project-glass-report',{state:{project:projectref}})
}

      
const CreateNCR=(e)=>{
  //alert(project_id)
  setdamageshow(true)
    //navigate('/project-glass-report',{state:{project:projectref}})
}

const SaveNCR=(e)=>{

  e.preventDefault()
  const data={
    refrence:e.target.refrence.value,
    Type:e.target.Type.value,
    Remarks:e.target.Remarks.value,
    NCRProject:project_id
  }

  axios.post(AppURL.SaveNCR,data,{
    headers:{
        "content-Type":"application/json",
        "Authorization":"Token "+sessionStorage.getItem("token"),
    }
     }).then(response=>{
      if(response.status=='201'){
        // e.reset();
        
         cogoToast.success("NCR Created Successfully...",{position:'top-right'});
         forceUpdate();        
         setdamageshow(false)     
     }
     else{
         cogoToast.error("Something Went Wrong...",{position:'top-right'});
     }
    })

}

<Form.Control type="text" placeholder="Remarks"  name='Remarks' required />


      const ProjectProfileStock=(e,projectId)=>{
        e.preventDefault();
        //alert(projectId)
        navigate('/stock-list',{state:{id:projectId,status:1}});
         }

         const GetTentativeGlass=(e,projectId)=>{
          e.preventDefault();
          navigate('/tentative-glass-item-list',{state:{id:projectId}});
           }
  

           const GetGlassCuttingListItem=(e,projectId)=>{
            e.preventDefault();
            navigate('/glass-cutting-list-item',{state:{id:projectId}});
             }
    
           
         
           function CreateTentativeGlass(e){
            e.preventDefault()
            const data={
              TentaiveGlassProject:project_id,
              created_by:sessionStorage.getItem('misc'),
              remarks:'NA'

            }
            
            axios.post(AppURL.TentativeGlassCreate,data,{
              headers:{
                  "content-Type":"application/json",
                  "Authorization":"Token "+sessionStorage.getItem("token"),
              }
               }).then(response=>{
                if(response.status=='201'){
                  // e.reset();
                  
                   cogoToast.success("Tentative Glass Order Created Successfully...",{position:'top-right'});
                   forceUpdate();             
               }
               else{
                   cogoToast.error("Something Went Wrong...",{position:'top-right'});
               }
              })
           }


           
           
         
           function CreateCuttingGlass(e){
            e.preventDefault()
            const data={
              TentaiveGlassCuttingProject:project_id,
              created_by:sessionStorage.getItem('misc'),
              remarks:'NA'

            }
            axios.post(AppURL.CuttingGlassCreate,data,{
              headers:{
                  "content-Type":"application/json",
                  "Authorization":"Token "+sessionStorage.getItem("token"),
              }
               }).then(response=>{
                if(response.status=='201'){
                  // e.reset();
                  
                   cogoToast.success("Tentative Glass Order Created Successfully...",{position:'top-right'});
                   forceUpdate();             
               }
               else{
                   cogoToast.error("Something Went Wrong...",{position:'top-right'});
               }
              })
           }




      const StockListDetail=(e,stock)=>{
        
        e.preventDefault();
        
        navigate('/stock-list-detail',{state:{stock:stock,project:project_id}});
       
         }

         const ProjectMTOProfileStock=(e,projectId)=>{
            e.preventDefault();
            navigate('/stock-list',{state:{id:projectId,status:2}});
             }

      const CorWindowsView=(e)=>{
        e.preventDefault();
        navigate('/project-floor',{state:{id:project_id,type:'1'}});
        
         }

         const CorWindowsAdd=(e)=>{
            e.preventDefault();
            navigate('/project-floor',{state:{id:project_id,type:'2'}});
            
             }

             
         const RevokedList=(e)=>{
            e.preventDefault();
            navigate('/project-revoke-list',{state:{id:project_id}});
            
             }
        const ADDPO=(e)=>{
              e.preventDefault();
              navigate('/recieve-item',{state:{id:project_id,status:1}});
              
               }
                          
         const CreateMTO=(e)=>{
            e.preventDefault();
            navigate('/project-mto',{state:{id:project_id,status:2}});
            
             }
             
 
        const MTODetail=(e,MtoId)=>{
            e.preventDefault();
            navigate('/mto-detail',{state:{MTOid:MtoId}});
            }

            const PODetail=(e,MtoId)=>{
              e.preventDefault();
              navigate('/po-detail',{state:{POID:MtoId}});
              }

              const POGlassDetail=(e,MtoId)=>{
                e.preventDefault();
                axios.get(AppURL.GetGlassCuttingID(MtoId)).then(response=>{
                  setcuttingid(response.data);
                    
                    if(!response.data['glasscutting']['id']==''){
                     gid=parseInt(response.data['glasscutting']['id'])
                      
                      navigate('/glass-cutting-list-item',{state:{id:gid}});
                    }
                    else{
                      console.log("ds")
                    }
                  })
                //navigate('/glass-cutting-list-item',{state:{id:MtoId}});
                }
  
              
            const ProjectPageDetail=(e,projectId)=>{
              e.preventDefault();
              navigate('/project-detail',{state:{id:projectId}});
               }
      
         
      
               const AllMTOItems=(e,projectId)=>{
                  e.preventDefault();
                  navigate('/mto-all-items',{state:{id:projectId}});
                   }

                   const GetAllMtoDetail=(e,projectId)=>{
                    e.preventDefault();
                    navigate('/all-mto-items',{state:{id:projectId}});
           
                     }

             {
              if(loading){
                return(
                  <>Loading...</>
                )
              }
              else{     
    return (

      <Fragment>

 <div className='container-fluid dashboard-background-color mt-2'>
      


      
     
 <Modal show={damageshow} fullscreen={fullscreen} onHide={() => setdamageshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create NCR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
                        <Table striped bordered hover className='mt-2'>
              
           
                  
                          <tbody>
      {/* <h4>Create NCR </h4> */}

      <div className='col-md-12'>
      <Form onSubmit={SaveNCR}>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                <Form.Label>Fill the Form to create NCR (Date and Project will be saved Automatically) </Form.Label>
            <span className='form-inline input-group'>  
            <Form.Control type="text" placeholder="Refrence"  name='refrence' required /> &nbsp;&nbsp;
           
            <select name='Type'>
              <option value='' disabled selected>Select Type of Material</option>
                <option>Glass</option>
                <option>Aluminium</option>
              </select>
            &nbsp;&nbsp;
            <Form.Control type="text" placeholder="Remarks"  name='Remarks' required />
            <Button  variant="primary" type="submit">
                  Create 
              </Button>
                </span>
                </Form.Group>
                </Form>
                </div>



                          </tbody>
                        </Table>
                        
        </Modal.Body>
        </Modal>


      <div className="content ">
        <h3 className=''>Project Dashboard</h3>
        <hr></hr>
        
        {
              pcodevalidating || scodevalidating?
               null
                
            :testvalidating?
            <Row className='mt-4'>
       
       
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats project-card-complete">
                <Card.Body>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                      <i class="fa-solid fa-person-digging  icon-size-lg"></i>
                  
                      </div>
                    </Col>
                    <Col md="8" xs="7">
  
                      <div className="numbers">
                        <p className="card-category">Released Window</p>
                        <h6 tag="p">Iniated, Created</h6>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                <div className="stats">
                 <a href='#' onClick={(e)=>CorWindowsView(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                
                  </div>
             
                </Card.Footer>
              </Card>
            </Col>
  
            <Col lg="3" md="6" sm="6">
              <Card className={"card-stats project-card-delayed"}>
                <Card.Body>
                  <Row >
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                      <i class="fa-solid fa-hourglass-start icon-size-lg"></i>
                  
                      </div>
                    </Col>
          
                        <Col md="8" xs="7">
                    
                        <div className="numbers"  >
                          <p className="card-category">Window's</p>
                          <h6 tag="p">Generate, Produce, Fabricate</h6>
                          <p />
                        </div>
                      </Col>  
                    
                   
                  </Row>
                </Card.Body>
                <Card.Footer>
                <div className="stats">
                  {codevalidating?
                      <a   className='dashboard-anchor-tag blur'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
                    :
                    <a href='#'  onClick={(e)=>CorWindowsAdd(e)}  className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
                }
                 
                  </div>
             
                </Card.Footer>
              </Card>
            </Col>
            </Row>
            :
        <Row className='mt-4'>
       
       
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats project-card-complete">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="fa-solid fa-person-digging  icon-size-lg"></i>
                
                    </div>
                  </Col>
                  <Col md="8" xs="7">

                    <div className="numbers">
                      <p className="card-category">Released Window</p>
                      <h6 tag="p">Iniated, Created</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
               <a href='#' onClick={(e)=>CorWindowsView(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
              
                </div>
           
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" md="6" sm="6">
            <Card className={"card-stats project-card-delayed"}>
              <Card.Body>
                <Row >
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="fa-solid fa-hourglass-start icon-size-lg"></i>
                
                    </div>
                  </Col>
        
                      <Col md="8" xs="7">
                  
                      <div className="numbers"  >
                        <p className="card-category">Window's</p>
                        <h6 tag="p">Generate, Produce, Fabricate</h6>
                        <p />
                      </div>
                    </Col>  
                  
                 
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
                {codevalidating?
                    <a   className='dashboard-anchor-tag blur'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
                  :
                  <a href='#'  onClick={(e)=>CorWindowsAdd(e)}  className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
              }
               
                </div>
           
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats project-card-halted">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="fa-sharp fa-regular fa-circle-stop icon-size-lg"></i>
                
                    </div>
                  </Col>
                  <Col md="8" xs="7">

                    <div className="numbers">
                      <p className="card-category">MTO's</p>
                      <h6 tag="p">Make, Generate, Plan </h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
              {codevalidating?
                <a   className='dashboard-anchor-tag blur'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
              : <a href='#' onClick={(e)=>CreateMTO(e)}  className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
              }
               </div>
           
              </Card.Footer>
            </Card>
          </Col>

          
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats project-card-running">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      
                      <i class="fa-solid fa-check icon-size-lg"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">

                    <div className="numbers">
                      <p className="card-category">Reversed Items</p>
                      {/* <h6 tag="p">Finish, achieve, Finalize, Fulfil</h6> */}
                      <h6 tag="p">Withdraw, Cancel, Abort, Reassigned</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
              {codevalidating?
                <a   className='dashboard-anchor-tag blur'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
              :
               <a href='#' onClick={(e)=>RevokedList(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
              }
               </div>
           
              </Card.Footer>
            </Card>
          </Col>
        </Row>
}
     <Row>

      {
        pcodevalidating?
        <Row>
                 <Col lg="2" md="6" sm="6">
            <Card className="card-stats project-card-halted">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      
                      <i class="fa-solid fa-check icon-size-lg"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">

                    <div className="numbers">
                      <p className="card-category">Create PO</p>
                      {/* <h6 tag="p">Finish, achieve, Finalize, Fulfil</h6> */}
                      <h6 tag="p">Make, Generate, Plan </h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats"> 
               <a href='#' onClick={(e)=>ADDPO(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Add Now</a> 
            
               </div>
           
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        :null
      }
     <Row  className='mt-5'>
          {
              (pcodevalidating || scodevalidating)?
              <>
              <Col md="8 mb-2">
              <Tabs
                  defaultActiveKey="glass"
                  id="fill-tab-example"
                  className="mb-3 mt-2"
                  fill
                  >
                  <Tab eventKey="Profiles" title="System Purchase Orders">
                  <Row>
                <Col md="12">
                  <Card className='mt-2'>
                    <>
                      <Card.Title tag="h5" className='p-3'>System Purchase Orders</Card.Title>
                      <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>PO ID</th>
                                    <th>PO Refrence</th>        
                                    <th>Created at</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    GlassPO.map((po,sr)=>{       
                                      return(
                                      <tr>
                                      <td>{sr+1}</td>
                                      <td>{ po.id }</td>
                                      <td>{ po.refrence }</td>
                                      <td>{ po['creation_date'] }</td>
                                      <td>{
                                          po.accounts_submital=='0'?  
                                          <button className='btn btn-danger'>On Hold</button>
                                          :
                                              <>Submitted</>
                                          }</td>
                                            {
                                            scodevalidating?
                                            <td><button onClick={(e)=>POGlassDetail(e,po.id)} disabled className='btn btn-success' >View Details</button>
                                             </td>
                                            :
                                            <td><button onClick={(e)=>PODetail(e,po.id)} disabled className='btn btn-success' >View Details</button></td>
                                          }
                                          
                                    </tr>
                                      )
                                      
                                    })
                                    
                                  }
      
                                </tbody>
                              </Table>
                    </>
                    <Card.Body>
                     
                    </Card.Body>
                    <Card.Footer>
                      <hr />
                      <div className="stats">
                        <i className="fa fa-history" /> Updated Just Now...
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
                  </Tab>
                  <Tab eventKey="glass" title="Glass Purchase Orders">
                  <Row>
                <Col md="12">
                  <Card className='mt-2'>
                    <>
                      <Card.Title tag="h5" className='p-3'>Glass Purchase Orders</Card.Title>
                      <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>PO ID</th>
                                    <th>PO Refrence</th>
                              
                                    <th>Created at</th>
                                    
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    GlassPO.map((po,sr)=>{
                                      //console.log(po)
                                      //setprojectref(po)
                                      return(
                                      <tr>
                                      <td>{sr+1}</td>
                                      <td>{ po.id }</td>
                                      <td>{ po.refrence }</td>
                                      <td>{ po['creation_date'] }</td>
                                      <td>{
                                          po.accounts_submital=='0'?
                                          
                                          <button className='btn btn-danger'>On Hold</button>
                                          :
                                              <>Submitted</>
                                          }</td>
                                          {
                                            
                                            scodevalidating?
                                            <td><button onClick={(e)=>POGlassDetail(e,po.id)} className='btn btn-success' >View Details</button>
                                             </td>
                                            :
                                            <td><button onClick={(e)=>PODetail(e,po.id)} className='btn btn-success' >View Details</button></td>
                                          }
                                      
                                          
                                    </tr>
                                      )
                                    })

                                  }
      
                                </tbody>
                              </Table>
                    </>
                    <Card.Body>
                     
                    </Card.Body>
                    <Card.Footer>
                      <hr />
                      <div className="stats">
                        <i className="fa fa-history" /> Updated Just Now...
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
                  </Tab>
            
               
                  </Tabs>
                  </Col>
                     {
            scodevalidating?
            <Col md="4 mb-2">
            <Card>
              <>
                <Card.Title tag="h5" className='p-3'>Misc...</Card.Title>
              </>
              <Card.Body style={{ height: "auto" }}>
              <div className="legend">
                  
                  <button className='btn btn-success' onClick={(e)=> ProjectGlassReport(e)} >View Glass Summary</button>
                  &nbsp;&nbsp;&nbsp;

                  <button className='btn btn-success' onClick={(e)=> CreateNCR(e)} >Create NCR</button>
                  &nbsp;&nbsp;&nbsp;
                </div>
              </Card.Body>
             
            </Card>
          </Col>
          :null
              }
                               
                  </>
                
               : 
            
            <Col md="9 mb-2">
        <h3 className='mt-1'>Project MTO's</h3>
        <Tabs
            defaultActiveKey="Profiles"
            id="fill-tab-example"
            className="mb-3 mt-2"
            fill
            >
            <Tab eventKey="Profiles" title="Profiles">
          <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Profile MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                              <th>Description</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='1'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto.description }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                    </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Accessories" title="Accessories">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Accessory MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='2'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                    </td>
                                    
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="packing" title="Packing Material">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Packing Material MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='3'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                    <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                        </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Gasket" title="Gasket">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Gasket MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='4'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                    <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                        </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Screws" title="Screws">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Screw's MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='5'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                    <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                        </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Glass" title="Glass">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Glass MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {                            
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='6'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                    <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                        </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            </Tabs>
            </Col>
            }

{
   pcodevalidating?
<Col md="3 mb-2">
            <Card>
              <>
                <Card.Title tag="h5" className='p-3'>Misc...</Card.Title>
              </>
              <Card.Body style={{ height: "auto" }}>
              <div className="legend">
{/*                   
                  <button className='btn btn-success' onClick={(e)=> ProjectGlassReport(e)} >View Glass Summary</button>
                  &nbsp;&nbsp;&nbsp; */}

                  <button className='btn btn-success' onClick={(e)=> CreateNCR(e)} >Create NCR</button>
                  &nbsp;&nbsp;&nbsp;
                </div>
              </Card.Body>
             
            </Card>
          </Col>
          :null
}

               <Col md="3 mt-5">
            <Card>
              {
                codevalidating?
                <>
                
                <>
                <Card.Title tag="h5" className='p-3'>Tentative Glass</Card.Title> 
              </>
              {
                  tentativeglass.length =='0'?
                   <> <h6 className='p-3'>No Glass Request Found.</h6> <button className='btn btn-success' onClick={(e)=>CreateTentativeGlass(e)}>Create One now</button></>
                  :   
                  <>
              <Card.Body style={{ height: "120px" }}>
                 
                
              <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Created at</th>
                        
                              <th>Submitted at</th>
                              <th>Revision</th>
                              
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {      
            
                              tentativeglass.map((tent,sr)=>{
                       
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{tent.created_at}</td>
                                <td>{
                                 tent.status=='1'?
                                 <></>
                                  :
                                  tent.submitted_at
                                
                                }</td>
                                <td>{tent.revision}</td>
                      
                                  <td><button className='btn btn-success'  onClick={(e)=>GetTentativeGlass(e,tent.id)} ><i className='fa fa-eye'></i></button></td>
                                {/* <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                    <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                        </td> */}
                              </tr>
                                )
                                
                              })
                              
                            }

                          </tbody>
                        </Table>

              </Card.Body>
     
              <Card.Title tag="h7" className='p-3'>Glass Cutting List
                            (
                              {
            glassbooking=='0'?
              <>Information Not Available...</>
                :
                  glassbooking.status=='Not Booked'?
                    <>Glass is {glassbooking.status} Yet</>
                :<>Glass is {glassbooking.status} <button className='btn btn-link'  onClick={(e)=>CreateCuttingGlass(e)}>Create cutting list</button></>
              }
                            )
              </Card.Title>
                
             
              {
                glassstatus=='1'?
                <Card.Body style={{ height: 'auto' }}>
                 
                
                 <Table striped bordered hover>
                             <thead>
                               <tr>
                                 <th>#</th>
                                 <th>Created at</th>
                           
                                 <th>Submitted at</th>
                                 <th>Revision</th>
                                 
                                 <th>Action</th>
                               </tr>
                             </thead>
                             <tbody>
                               {      
               
                              glasscuttig.map((tent,sr)=>{
                          
                                   return(
                                   <tr>
                                   <td>{sr+1}</td>
                                   <td>{tent.created_at}</td>
                                   <td>{
                                    tent.status=='1'?
                                    <></>
                                     :
                                     tent.submitted_at
                                   
                                   }</td>
                                   <td>{tent.revision}</td>
                         
                                     <td><button className='btn btn-success'  onClick={(e)=>GetGlassCuttingListItem(e,tent.id)} ><i className='fa fa-eye'></i></button></td>
                                   {/* <td>{ mto.id }</td>
                                   <td>{ mto['created_at'] }</td>
                                   <td>{
                                       mto.submital=='0'?
                                       
                                       <button className='btn btn-danger'>On Hold</button>
                                       :
                                           <>Submitted</>
                                       }</td>
                                       <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                           </td> */}
                                 </tr>
                                   )
                                   
                                 })
                                 
                               }
   
                             </tbody>
                           </Table>
                             
                 </Card.Body>
                 :
                 null

              }

              
              </>
          } 
                </>
          
          
           : pcodevalidating?
           <>
           
           <>
          
           <tr><th> <Card.Title tag="h5" className='p-3'><h4>Tentative Glass</h4> </Card.Title></th><th></th><th><button className='btn btn-success' onClick={(e)=> ProjectGlassReport(e)} >View Glass Summary</button></th></tr>
         </>
         {
             tentativeglass.length =='0'?
              <> <h6 className='p-3'>No Glass Request Found.</h6></>
             :   
             <>
         <Card.Body style={{ height: "180px" }}>
            
           
         <Table striped bordered hover>
                     <thead>
                       <tr>
                         <th>#</th>
                         <th>Created at</th>
                   
                         <th>Submitted at</th>
                         <th>Revision</th>
                         
                         <th>Action</th>
                       </tr>
                     </thead>
                     <tbody>
                       {      
       
                         tentativeglass.map((tent,sr)=>{
                       
                           return(
                           <tr>
                           <td>{sr+1}</td>
                           <td>{tent.created_at}</td>
                           <td>{
                            tent.status=='1'?
                            <></>
                             :
                             tent.submitted_at
                           
                           }</td>
                           <td>{tent.revision}</td>
                 
                             <td>
                              {
                                tent.status=='1'?
                                <button className='btn btn-danger'  >NA</button>
                                :
                                <button className='btn btn-success'  onClick={(e)=>GetTentativeGlass(e,tent.id)} ><i className='fa fa-eye'></i></button>
                              }
                              </td>
                           {/* <td>{ mto.id }</td>
                           <td>{ mto['created_at'] }</td>
                           <td>{
                               mto.submital=='0'?
                               
                               <button className='btn btn-danger'>On Hold</button>
                               :
                                   <>Submitted</>
                               }</td>
                               <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                                   </td> */}
                         </tr>
                           )
                                  
                         })
                         
                       }

                     </tbody>
                   </Table>
                   
         </Card.Body>

  <Card.Body style={{ height: 'auto' }}>
  <h5> Glass Cutting List</h5>
  
   <Table striped bordered hover>
               <thead>
                 <tr>
                   <th>#</th>
                   <th>Created at</th>
             
                   <th>Submitted at</th>
                   <th>Revision</th>
                   
                   <th>Action</th>
                 </tr>
               </thead>
               <tbody>
                 {      
 
                glasscuttig.map((tent,sr)=>{
                      if(tent.status=='2'){
                     return(
                     <tr>
                     <td>{sr+1}</td>
                     <td>{tent.created_at}</td>
                     <td>{
                      tent.status=='1'?
                      <></>
                       :
                       tent.submitted_at
                     
                     }</td>
                     <td>{tent.revision}</td>
           
                       <td><button className='btn btn-success'  onClick={(e)=>GetGlassCuttingListItem(e,tent.id)} ><i className='fa fa-eye'></i></button></td>
                     {/* <td>{ mto.id }</td>
                     <td>{ mto['created_at'] }</td>
                     <td>{
                         mto.submital=='0'?
                         
                         <button className='btn btn-danger'>On Hold</button>
                         :
                             <>Submitted</>
                         }</td>
                         <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-success'>View Details</button>
                             </td> */}
                   </tr>
                     )
                            }
                   })
                   
                 }

               </tbody>
             </Table>
               
   </Card.Body>
  </>


     } 
           </>
            
                :scodevalidating?
                <></>
              :
              <>
              <>
                <Card.Title tag="h5" className='p-3'>MTO's</Card.Title>
              </>
              <Card.Body style={{ height: "180px" }} className="p-2">
              <div className="legend">
                  
                  <button className='btn btn-secondary'  onClick={(e)=>ProjectMTOProfileStock(e,project_id)} >Generate Profile MTO</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-secondary' disabled>Generate Accessories MTO</button>
                  
         
                
                  <button className='btn btn-secondary mt-4' disabled>Generate Packing Material MTO</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-secondary mt-4' disabled>Generate Screw MTO</button>
                  
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-secondary mt-4 ' disabled>Generate Gasket MTO</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-secondary mt-4'disabled >Generate Glass MTO</button>
                  
                </div>
              </Card.Body>

              <>
                <Card.Title tag="h5" className='p-3 mt-2'>Misc</Card.Title>
              </>
              <Card.Body style={{ height: "180px" }} className="p-2">
              <div className="legend">
                  
                  {/* <button className='btn btn-light'  onClick={(e)=>ProjectMTOProfileStock(e,project_id)} >Reserved / Issued Items</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-light'>MTO All Items</button> */}
                  
                  <button className='btn btn-light'  onClick={(e)=>ProjectPageDetail(e,project_id)}>Project Report</button> &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-light'  onClick={(e)=>AllMTOItems(e,project_id)}>MTO All Items</button>&nbsp;&nbsp;&nbsp;
         
                  <button className='btn btn-light'  onClick={(e)=>GetAllMtoDetail(e,project_id)} >Accessory List for Site</button>&nbsp;&nbsp;
                  {/* <button className='btn btn-secondary mt-4'>Generate Packing Material MTO</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-secondary mt-4'>Generate Screw MTO</button>
                  
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-secondary mt-4 '>Generate Gasket MTO</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-secondary mt-4'>Generate Glass MTO</button> */}
                  
                </div>
              </Card.Body>

              </>
                }
            </Card>
          </Col>
   
        </Row>
     </Row>
        <Row>
            {/* <hr className='mt-4'></hr>
        <h3 className='mt-1'>Project MTO's</h3>
        <Tabs
            defaultActiveKey="Profiles"
            id="fill-tab-example"
            className="mb-3 mt-2"
            fill
            >
            <Tab eventKey="Profiles" title="Profiles">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Profile MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='1'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-primary'>View Details</button>
                                    </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Accessories" title="Accessories">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Accessory MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='2'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                <td><button className='btn btn-primary'>View Details</button>
                                    </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="packing" title="Packing Material">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Packing Material MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='3'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                <td><button className='btn btn-primary'>View Details</button>
                                    </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Gasket" title="Gasket">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Gasket MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='4'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                <td><button className='btn btn-primary'>View Details</button>
                                    </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Screws" title="Screws">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Screw's MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='5'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                <td><button className='btn btn-primary'>View Details</button>
                                    </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Glass" title="Glass">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Glass MTO's</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>MTO Id</th>
                        
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              projects.map((mto,sr)=>{
                                if(mto.MTOType['id']=='6'){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ mto.id }</td>
                                <td>{ mto['created_at'] }</td>
                                <td>{
                                    mto.submital=='0'?
                                    
                                    <button className='btn btn-danger'>On Hold</button>
                                    :
                                        <>Submitted</>
                                    }</td>
                                <td><button  onClick={(e)=>MTODetail(e,mto['id'])} className='btn btn-primary'>View Details</button>
                                    </td>
                              </tr>
                                )
                                }
                              })
                              
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            </Tabs> */}

        </Row>
        <Row>
  
        </Row>

        <Row  className='mt-5'>
 
          {
          !codevalidating?
              null
            :
              <Col md="4 mb-2">
            <Card>
              <>
                <Card.Title tag="h5" className='p-3'>Stock List / Optimization</Card.Title>
              </>
              <Card.Body style={{ height: "266px" }}>
              <div className="legend">
                  
                  <button className='btn btn-success'  onClick={(e)=>ProjectProfileStock(e,project_id)} >Generate Profile Stock List</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-success'>Generate Accessories Stock List</button>
                  
         
                  <br></br>
                  <button className='btn btn-success mt-3'>Generate Packing Material Stock List</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-success mt-3'>Generate Screw Stock List</button>
                  <br></br>
                  <button className='btn btn-success mt-3'>Generate Gasket Stock List</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-success mt-3'>Generate Glass Stock List</button>
                  
                </div>
              </Card.Body>
             
            </Card>
          </Col>
          }
      {
        !codevalidating?
              null
            :
          <Col md="8">
          <hr className='mt-4'></hr>
        <h3 className='mt-1'>Stock  List's</h3>
        <Tabs
            defaultActiveKey="Profiles"
            id="fill-tab-example"
            className="mb-3 mt-2"
            fill
            >
            <Tab eventKey="Profiles" title="Profiles">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Profile Stock List</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Title</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              stocklist.map((project,sr)=>{
                                if(project['Type']==1){
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ project['id'] }</td>
                                <td>{ project['title'] }</td>
                                <td>{ project['created_at'] }</td>
                                <td><button onClick={(e)=>StockListDetail(e,project['id'])} className='btn btn-success'>View Details</button></td>
                                
                              </tr>
                                )
                                }
                              })
                            
                            }

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
            </Tab>
            <Tab eventKey="Accessories" title="Accessories">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Accessories Stock List</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Title</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {
                              
                              projects.map((project,sr)=>{
                                return(
                                <tr>
                                <td>{sr}</td>
                                <td>{ project['refrence_no'] }</td>
                                <td>{ project['name'] }</td>
                                <td>{ project['created_at'] }</td>
                                <td><button className='btn btn-success'>View Details</button></td>
                              </tr>
                                )
                              })
                            } */}

                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
            </Tab>
            <Tab eventKey="packing" title="Packing Material">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Packing Material Stock List</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Title</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          
                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
            </Tab>
            <Tab eventKey="Gasket" title="Gasket">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Gasket Stock List</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Title</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          
                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
            </Tab>
            <Tab eventKey="Screws" title="Screws">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Screw's Stock List</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Title</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          
                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
            </Tab>
            <Tab eventKey="Glass" title="Glass">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Glass Stock List</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Title</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          
                          </tbody>
                        </Table>
              </>
              <Card.Body>
               
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
            </Tab>
            </Tabs>
          </Col>
}
        </Row>
      </div>
    </div>
      </Fragment>
    )
}}
}

export default ProjectDetails