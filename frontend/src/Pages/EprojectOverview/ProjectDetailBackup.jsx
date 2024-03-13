import React, { Component, Fragment ,useEffect,useState} from 'react'
import NavMenu from '../../Componenets/Common/NavMenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import AppURL from '../../api/AppURL';
//  components
import { useLocation } from 'react-router-dom'

import { Container,
  Card,

  Row,
  Col,
} from 'react-bootstrap';
// core components

import {Link, useNavigate} from 'react-router-dom';
function ProjectDetails() {
    const location = useLocation();
  const navigate =useNavigate();
  const[projects,setprojectsOverview]=useState([]);
  const[projectsclone,setprojectsclone]=useState([]);
  const[singleProject,setsingleProject]=useState([]);
  const[manager,setmanager]=useState([]);
  const[singleProjectclone,setsingleProjectclone]=useState([]);
  const project_id=location.state.id;
  const check_login=sessionStorage.getItem('login');
  const [partialloading,setpartialloading]=useState(true);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      if(!check_login){
          navigate('/login')
        }
        // alert(project_id)
        // axios.get(AppURL.ESingleProjectOverView(project_id)).then(response=>{
        //   setprojects(response.data);

         

        //   axios.get(AppURL.ESingleProject(project_id)).then(response=>{
        //     setsingleProject(response.data);
        //     //setLoading(false);
        //     // singleProject.map((scproject,sr)=>{
        //     //     setsingleProjectclone(scproject)
        //     //   })
            
        //       setLoading(false)
        //   })

       
        //   //setLoading(false);
        // })
        
        getstockDetails();

      

        
        
        
      },[])


      const getstockDetails = async()=>{
        try{
    
           const response= await axios.get(AppURL.ESingleProjectOverView(project_id))
           setprojectsOverview(response.data);
          const issue_response = await axios.get(AppURL.ESingleProject(project_id))
          setsingleProject(issue_response.data);
    
          const projectmanager = await axios.get(AppURL.ExternalProjectManagerList)
          setmanager(projectmanager.data);
            
          setLoading(false);
    

            //   singleProject.map((scproject,sr)=>{
            //         setsingleProjectclone(scproject)
            //       })
            //       projects.map((sproject,sr)=>{
            //         setprojectsclone(sproject)
            //       })
                  
                  
           // alert("all done");
            //setFilteredCountries(response.data)
           // console.log(countries);
        }catch(error){
            console.log(error);
        }
         //unit_short=item.unit['Short'];
    }

        if(loading){
        return(
            <>Loading</>
            )
        }
        else{
            return(
                
                    
                singleProject.map((single,sr)=>{
                    //console.log(single)
                            // projects.map((scproject,sr)=>{
                 //setsingleProjectclone(scproject,srr)
                        return(
                            <Fragment>

                            <div className='container-fluid dashboard-background-color mt-2'>
                                 
                                 <div className="content ">
                                   <h3 className=''>Project Dashboard </h3>
                                   <hr></hr>
                                   <Row className='mt-4'>
                                  
                                  
                                     <Col lg="2" md="6" sm="6">
                                       <Card className="card-stats project-card-complete">
                                         <Card.Body>
                                           <Row>
                                             <Col md="4" xs="5">
                                               <div className="icon-big text-center icon-warning">
                                               <i class="fa-solid fa-hashtag  icon-size-lg"></i>
                                           
                                               </div>
                                             </Col>
                                             <Col md="8" xs="7">
                           
                                               <div className="numbers">
                                               <h6 tag="p">Project Refrence</h6>
                                                 <p className="card-category">{single.project_id}</p>
                                                 
                                                 <p />
                                               </div>
                                             </Col>
                                           </Row>
                                         </Card.Body>
                                         {/* <Card.Footer>
                                         <div className="stats">
                                          <a href='#' onClick={(e)=>CorWindowsView(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                                         
                                           </div>
                                      
                                         </Card.Footer> */}
                                       </Card>
                                     </Col>

                                     <Col lg="2" md="6" sm="6">
                                       <Card className="card-stats project-card-name">
                                         <Card.Body>
                                           <Row>
                                             <Col md="4" xs="5">
                                               <div className="icon-big text-center icon-warning">
                                               <i class="fa-solid fa-signature  icon-size-lg"></i>
                                           
                                               </div>
                                             </Col>
                                             <Col md="8" xs="7">
                           
                                               <div className="numbers">
                                               <h6 tag="p">Project Name</h6>
                                                 <p className="card-category">{single.project_name}</p>
                                                 
                                                 <p />
                                               </div>
                                             </Col>
                                           </Row>
                                         </Card.Body>
                                         {/* <Card.Footer>
                                         <div className="stats">
                                          <a href='#' onClick={(e)=>CorWindowsView(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                                         
                                           </div>
                                      
                                         </Card.Footer> */}
                                       </Card>
                                     </Col>
                                     <Col lg="2" md="6" sm="6">
                                        <Card className="card-stats project-card-delayed">
                                        <Card.Body>
                                            <Row>
                                            <Col md="4" xs="5">
                                                <div className="icon-big text-center icon-warning">
                                                <i class="fa-solid fa-location-dot icon-size-lg"></i>
                                            
                                                </div>
                                            </Col>
                                            <Col md="8" xs="7">

                                                <div className="numbers">
                                               
                                                <h6 tag="p">Project Location</h6>
                                                <p className="card-category">{single.project_area}</p>
                                                <p />
                                                </div>
                                            </Col>
                                            </Row>
                                        </Card.Body>
                                        {/* <Card.Footer>
                                        <div className="stats">
                                            <a href='#'  onClick={(e)=>CorWindowsAdd(e)}  className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
                                            </div>
                                    
                                        </Card.Footer> */}
                                        </Card>
                                        
                                    </Col>
                                      <Col lg="2" md="6" sm="6">
                                        <Card className="card-stats project-card-manager">
                                        <Card.Body>
                                            <Row>
                                            <Col md="4" xs="5">
                                                <div className="icon-big text-center icon-warning">
                                                <i class="fa-solid fa-person icon-size-lg"></i>
                                            
                                                </div>
                                            </Col>
                                            <Col md="8" xs="7">

                                                <div className="numbers">
                                               
                                                <h6 tag="p">Project Manager</h6>
                                                {
                                                    manager.map((man,sr)=>{
                                                      
                                                        if(man.projectmid==single.projectmanagerid){
                                                            return(
                                                                <p className="card-category">{man.pmname}</p>
                                                            )
                                                        }
                                                    })
                                                }

                                               
                                                </div>
                                            </Col>
                                            </Row>
                                        </Card.Body>
                                        {/* <Card.Footer>
                                        <div className="stats">
                                            <a href='#'  onClick={(e)=>CorWindowsAdd(e)}  className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
                                            </div>
                                    
                                        </Card.Footer> */}
                                        </Card>
                                        
                                    </Col>

                                  

                                    <Col lg="2" md="6" sm="6">
                                        <Card className="card-stats project-card-running">
                                        <Card.Body>
                                            <Row>
                                            <Col md="4" xs="5">
                                                <div className="icon-big text-center icon-warning">
                                                
                                                <i class="fa-solid fa-sack-dollar icon-size-lg"></i>
                                                </div>
                                            </Col>
                                            <Col md="8" xs="7">

                                                <div className="numbers">
                                                {/* <h6 tag="p">Finish, achieve, Finalize, Fulfil</h6> */}
                                                <h6 tag="p">Project Value</h6>
                                                
                                                <p className="card-category">{single.projectvalue}.00 {single.paymentstatus}</p>
                                                <p />
                                                </div>
                                            </Col>
                                            </Row>
                                        </Card.Body>
                                        {/* <Card.Footer>
                                        <div className="stats">
                                        <a href='#' onClick={(e)=>RevokedList(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                                            </div>
                                    
                                        </Card.Footer> */}
                                        </Card>
                                    </Col>
                                    
                                    <Col lg="2" md="6" sm="6">
                                            <Card className="card-stats project-card-halted">
                                            <Card.Body>
                                                <Row>
                                                <Col md="4" xs="5">
                                                    <div className="icon-big text-center icon-warning">
                                                    <i class="fa-regular fa-file icon-size-lg"></i>
                                                
                                                    </div>
                                                </Col>
                                                <Col md="8" xs="7">

                                                    <div className="numbers">

                                                    <h6 tag="p">Status </h6>
                                                    <p className="card-category">{single.projectstatus}</p>
                                                    <p />
                                                    </div>
                                                </Col>
                                                </Row>
                                            </Card.Body>
                                            {/* <Card.Footer>
                                            <div className="stats">
                                            <a href='#' onClick={(e)=>CreateMTO(e)}  className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
                                                </div>
                                        
                                            </Card.Footer> */}
                                            </Card>
                                        </Col>
                                     </Row>

{
    projects.map((scproject,sr)=>{
        return(
           
    <Row>
    <Row  className='mt-5'>
         <Col md="6 mb-2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'><u >Offer & Contract</u></Card.Title>
             </>
             <Card.Body style={{  }}>
             <div className="legend">
                {
                    scproject.offer_approval_method?
                    <button className='btn btn-success mt-3'>Offer Approved {scproject.offer_approval_method}</button>
                    :null
                }
                &nbsp;&nbsp;<i class="fa-solid fa-arrow-right mt-3"></i>&nbsp;&nbsp;
                {
                    scproject.draft_contract_issuance?
                    <button className='btn btn-secondary mt-3'    >Contract {scproject.draft_contract_issuance} & Negotiation {scproject.draft_contract_negotiation_status}</button>
                    :null
                }
                        &nbsp;&nbsp;<i class="fa-solid fa-arrow-right mt-3"></i>&nbsp;&nbsp;
                {
                    scproject.original_contract_receipt?
                    <button className='btn btn-warning mt-3'    >Contract receipt {scproject.original_contract_receipt} & Signature {scproject.original_contract_signature_by_nlg}</button>
                    :null
                }
                        &nbsp;&nbsp;<i class="fa-solid fa-arrow-right mt-3"></i>&nbsp;&nbsp;
                {
                    scproject.original_contract_countersigned_receipt?
                    <button className='btn btn-primary mt-3'    >Contract Orignal Counter Signed receipt {scproject.original_contract_countersigned_receipt} </button>
                    :null
                }
               </div>
             </Card.Body>
            
           </Card>
         </Col>

         <Col md="6 mb-2">
           <Card>
             <>
               <Card.Title tag="h5" className='p-3'>Drawings</Card.Title>
             </>
             <Card.Body style={{}}>
             <div className="legend">
                {
                    scproject.ifc_drawings?
                    <button className='btn btn-success mt-3'  >IFC Drawings {scproject.ifc_drawings}</button>
                    :null
                }
                &nbsp;&nbsp;<i class="fa-solid fa-arrow-right mt-3"></i>&nbsp;&nbsp;
                {
                    scproject.structural_drawings?
                    <button className='btn btn-secondary mt-3'    >Structural Drawing {scproject.structural_drawings}</button>
                    :null
                }
                        &nbsp;&nbsp;<i class="fa-solid fa-arrow-right"></i>&nbsp;&nbsp;

                {
                    scproject.architectural_drawings?
                    <button className='btn btn-warning mt-3'    >Architectural Drawing {scproject.architectural_drawings}</button>
                    :null
                }
                    &nbsp;&nbsp;<i class="fa-solid fa-arrow-right"></i>&nbsp;&nbsp;
                {
                    scproject.id_drawings?
                    <button className='btn btn-danger mt-3'>ID Drawing {scproject.id_drawings}</button>
                    :null
                }
                  
               </div>
             </Card.Body>
            
           </Card>
         </Col>

  
       </Row>
<div className='container-fluid'>
       <Row className='mt-4'>
                <Card.Title tag="h5" className='p-3'>Shop Drawings</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Scheduled Status</th>
                              <th>Starting Date</th>
                        
                              <th>End Date</th>
                              <th>Progress</th>
                              <th>Submission Status</th>
                              <th>Revision</th>
                              <th>Approval Date</th>
                              <th>Approval</th>
                            </tr>
                          </thead>
                          <tbody>
                 
                                <tr>
                                  <td>{ scproject.sd_schedule_status }</td>
                                <td>{ scproject.sd_scheduled_startup_date }</td>
                                <td>{ scproject.sd_scheduled_endup_date }</td>
                                <td>{ scproject.sd_preparation_status }</td>
                                <td>{ scproject.sd_submission_status}</td>
                                
                                <td>{ scproject.latest_sd_revision }</td>
                                <td>{ scproject.sd_approval_date }</td>
                                <td>{ scproject.sd_approval_status }</td>
                         
                              </tr>
                                
                          

                          </tbody>
                        </Table>
              </Row>
              </div>
              
     <Row>
            <hr className='mt-4'></hr>
        <h3 className='mt-1'>Misc</h3>
        <Tabs
            defaultActiveKey="Profiles"
            id="fill-tab-example"
            className="mb-3 mt-2"
            fill
            >
            <Tab eventKey="Profiles" title="Glass & Aluminium">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Glass & Aluminium</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Glass Sample Preparation</th>
                              <th>Frame Color Prepration Status</th>
                              <th>Material Submission Status</th>
                              <th>Glass Approval Date</th>
                              <th>Color Approval Date</th>
                        
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.glass_sample_preparation_status }</td>
                            <td>{ scproject.frame_color_preparation_status }</td>
                            <td>{ scproject.material_submission_status }</td>
                            <td>{ scproject.glass_approval_date }</td>
                            <td>{ scproject.color_approval_date }</td>
                            
                              </tr>
                     
                          </tbody>


                          <thead>
                            <tr>
                              <th>Glass Approval</th>
                              <th>Glass Type</th>
                              <th>Frame Finishing Approval</th>
                              <th>Approved Color</th>
                                
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.glass_approval_status }</td>
                            <td>{ scproject.approved_glass_type }</td>
                            <td>{ scproject.frame_finishing_approval }</td>
                            <td>{ scproject.approved_color }</td>
                            
                              </tr>
                       
    

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
            <Tab eventKey="Accessories" title="MTO's & Documents">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>MTO's & Documents</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Aluminium MTO</th>
                              <th>Glass MTO</th>
                              <th>MTO Taking</th>
                              <th>Powder MTO Taking</th>
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.aluminium_mto }</td>
                            <td>{ scproject.glass_mto }</td>
                            <td>{ scproject.mto_taking }</td>
                            <td>{ scproject.powder_mto_taking }</td>
                            
                              </tr>
                     
                          </tbody>
                          <h5> <b>Documents</b></h5>
                          <thead>
                            <tr>
                              <th>Document Prepration</th>
                              <th>Submission Status</th>
                              <th>Submission Date</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.handover_documents_preparation }</td>
                            <td>{ scproject.handover_documents_submission_status }</td>
                            <td>{ scproject.handover_documents_submission_date }</td>
                            <td></td>
                              </tr>
                     
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
            <Tab eventKey="packing" title="Procurement & Orders">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Procurement & Orders</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Aluminium System Procurement</th>
                              <th>Glass Raw sheet Procurement</th>
                              <th>Aluminium System ETA</th>
                              <th>Glass ETA</th>
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.aluminium_system_procurement }</td>
                            <td>{ scproject.glass_raw_sheets_procurement }</td>
                            <td>{ scproject.aluminium_system_eta }</td>
                            <td>{ scproject.glass_sheets_eta }</td>
                            
                              </tr>
                     
                          </tbody>


                          <thead>
                            <tr>
                              <th>Aluminium System Order</th>
                              <th>Glass TakeOff Prepration</th>
                              <th>Glass Sheet Booking</th>
                              <th>Powder Order Status</th>
                              <th>Powder ETA</th>
                                
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.alumunium_system_order_status }</td>
                            <td>{ scproject.glass_takeoff_preparation }</td>
                            <td>{ scproject.powder_order_status }</td>
                            <td>{ scproject.powder_eta }</td>
                            
                              </tr>
                       
    

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
            <Tab eventKey="Gasket" title="Project and Material">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Project and Material</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Site Measurement</th>
                              <th>Site Readiness</th>
                              <th>Installation Status</th>
                              <th>Fabrication Status</th>
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.site_measurements_status }</td>
                            <td>{ scproject.site_readiness }</td>
                            <td>{ scproject.installation_status }</td>
                            <td>{ scproject.fabrication_status }</td>
                            
                              </tr>
                     
                          </tbody>


                          <thead>
                            <tr>
                              <th>Aluminium Order Release Date</th>
                              <th>Glass Order Release Date</th>
                              <th>Facade Area</th>
                              <th>Powder Order Status</th>
                              <th>Powder ETA</th>
                                
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.aluminium_order_release_status }</td>
                            <td>{ scproject.glass_order_release_status }</td>
                            <td>{ scproject.facadearea }</td>
                            <td>{ scproject.powder_eta }</td>
                            
                              </tr>
                       
    

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
            <Tab eventKey="Screws" title="Variations & Payments">
            <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Variations & Payments</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Variation Ref</th>
                              <th>Approval Status</th>
                      
                        
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.variation_ref }</td>
                            <td>{ scproject.vo_approval_status }</td>
              
                              </tr>
                     
                          </tbody>


                          <thead>
                            <tr>
                              <th>TOC Issuance Status</th>
                              <th>TOC Date</th>
                              <th>TOC Payment status</th>
                              <th>Remarks</th>
                                
                            </tr>
                          </thead>
                          <tbody>
                        
                            <tr>
                            <td>{ scproject.toc_issuance_status }</td>
                            <td>{ scproject.toc_date }</td>
                            <td>{ scproject.frame_finishing_approval }</td>
                            <td>{ scproject.toc_payment_status }</td>
                            <td>{ scproject.remarks }</td>
                              </tr>
                       
    

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
            </Row>
    </Row>
        )
    })
}

 



     
                                     </div>
                                     </div>
                                     </Fragment>
                                )
                        })
                //})


                
                

            )

 
//     return (
    
//       <Fragment>

//  <div className='container-fluid dashboard-background-color mt-2'>
      
//       <div className="content ">
//         <h3 className=''>Project Dashboard {projectsclone.offer_approval_method}</h3>
//         <hr></hr>
//         <Row className='mt-4'>
       
       
//           <Col lg="3" md="6" sm="6">
//             <Card className="card-stats project-card-complete">
//               <Card.Body>
//                 <Row>
//                   <Col md="4" xs="5">
//                     <div className="icon-big text-center icon-warning">
//                     <i class="fa-solid fa-person-digging  icon-size-lg"></i>
                
//                     </div>
//                   </Col>
//                   <Col md="8" xs="7">

//                     <div className="numbers">
//                       <p className="card-category">Released Window</p>
//                       <h6 tag="p">Iniated, Created</h6>
//                       <p />
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//               <div className="stats">
//                <a href='#' onClick={(e)=>CorWindowsView(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
              
//                 </div>
           
//               </Card.Footer>
//             </Card>
//           </Col>

      
//           <Col lg="3" md="6" sm="6">
//             <Card className="card-stats project-card-delayed">
//               <Card.Body>
//                 <Row>
//                   <Col md="4" xs="5">
//                     <div className="icon-big text-center icon-warning">
//                     <i class="fa-solid fa-hourglass-start icon-size-lg"></i>
                
//                     </div>
//                   </Col>
//                   <Col md="8" xs="7">

//                     <div className="numbers">
//                       <p className="card-category">Window's</p>
//                       <h6 tag="p">Generate, Produce, Fabricate</h6>
//                       <p />
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//               <div className="stats">
//                <a href='#'  onClick={(e)=>CorWindowsAdd(e)}  className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
//                 </div>
           
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col lg="3" md="6" sm="6">
//             <Card className="card-stats project-card-halted">
//               <Card.Body>
//                 <Row>
//                   <Col md="4" xs="5">
//                     <div className="icon-big text-center icon-warning">
//                     <i class="fa-sharp fa-regular fa-circle-stop icon-size-lg"></i>
                
//                     </div>
//                   </Col>
//                   <Col md="8" xs="7">

//                     <div className="numbers">
//                       <p className="card-category">MTO's</p>
//                       <h6 tag="p">Make, Generate, Plan </h6>
//                       <p />
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//               <div className="stats">
//                <a href='#' onClick={(e)=>CreateMTO(e)}  className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;Create New</a> 
//                 </div>
           
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col lg="3" md="6" sm="6">
//             <Card className="card-stats project-card-running">
//               <Card.Body>
//                 <Row>
//                   <Col md="4" xs="5">
//                     <div className="icon-big text-center icon-warning">
                      
//                       <i class="fa-solid fa-check icon-size-lg"></i>
//                     </div>
//                   </Col>
//                   <Col md="8" xs="7">

//                     <div className="numbers">
//                       <p className="card-category">Reversed Items</p>
//                       {/* <h6 tag="p">Finish, achieve, Finalize, Fulfil</h6> */}
//                       <h6 tag="p">Withdraw, Cancel, Abort, Reassigned</h6>
//                       <p />
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//               <div className="stats">
//                <a href='#' onClick={(e)=>RevokedList(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
//                 </div>
           
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>

//      <Row>
//      <Row  className='mt-5'>
//           <Col md="6 mb-2">
//             <Card>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Optimization</Card.Title>
//               </>
//               <Card.Body style={{ height: "180px" }}>
//               <div className="legend">
                  
//                   <button className='btn btn-success'  onClick={(e)=>ProjectProfileStock(e,project_id)} >Generate Profile Stock List</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-secondary'>Generate Accessories Stock List</button>
//                   &nbsp;&nbsp;&nbsp;
         
                
//                   <button className='btn btn-warning'>Generate Packing Material Stock List</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-danger mt-4'>Generate Screw Stock List</button>
                  
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-info mt-4'>Generate Gasket Stock List</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-dark mt-4'>Generate Glass Stock List</button>
                  
//                 </div>
//               </Card.Body>
             
//             </Card>
//           </Col>

//                <Col md="6 mb-2">
//             <Card>
//               <>
//                 <Card.Title tag="h5" className='p-3'>MTO's</Card.Title>
//               </>
//               <Card.Body style={{ height: "180px" }}>
//               <div className="legend">
                  
//                   <button className='btn btn-success'  onClick={(e)=>ProjectMTOProfileStock(e,project_id)} >Generate Profile MTO</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-secondary'>Generate Accessories MTO</button>
//                   &nbsp;&nbsp;&nbsp;
         
                
//                   <button className='btn btn-warning'>Generate Packing Material MTO</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-danger'>Generate Screw MTO</button>
                  
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-info mt-4'>Generate Gasket MTO</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-dark mt-4'>Generate Glass MTO</button>
                  
//                 </div>
//               </Card.Body>
             
//             </Card>
//           </Col>
   
//         </Row>
//      </Row>
//         <Row>
//             <hr className='mt-4'></hr>
//         <h3 className='mt-1'>Project MTO's</h3>
//         <Tabs
//             defaultActiveKey="Profiles"
//             id="fill-tab-example"
//             className="mb-3 mt-2"
//             fill
//             >
//             <Tab eventKey="Profiles" title="Profiles">
//             <Row>
//           <Col md="12">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Profile MTO's</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>MTO Id</th>
                        
//                               <th>Date</th>
//                               <th>Status</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {
                              
//                               projects.map((mto,sr)=>{

//                                 return(
//                                 <tr>
//                                 <td>{sr+1}</td>
//                                 <td>{ mto.id }</td>
//                                 <td>{ mto['created_at'] }</td>
//                                 <td>{
//                                     mto.submital=='0'?
                                    
//                                     <button className='btn btn-danger'>On Hold</button>
//                                     :
//                                         <>Submitted</>
//                                     }</td>
//                                 <td><button onClick={(e)=>MTODetail(e,mto.id)} className='btn btn-primary'>View Details</button>
//                                     </td>
//                               </tr>
//                                 )
//                               })
                              
//                             }

//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//             </Tab>
//             <Tab eventKey="Accessories" title="Accessories">
//             <Row>
//           <Col md="12">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Accessory MTO's</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>MTO Id</th>
                        
//                               <th>Date</th>
//                               <th>Status</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {
            
                              
//                             }

//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//             </Tab>
//             <Tab eventKey="packing" title="Packing Material">
//             <Row>
//           <Col md="12">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Packing Material MTO's</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>MTO Id</th>
                        
//                               <th>Date</th>
//                               <th>Status</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
                            

//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//             </Tab>
//             <Tab eventKey="Gasket" title="Gasket">
//             <Row>
//           <Col md="12">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Gasket MTO's</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>MTO Id</th>
                        
//                               <th>Date</th>
//                               <th>Status</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
                        

//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//             </Tab>
//             <Tab eventKey="Screws" title="Screws">
//             <Row>
//           <Col md="12">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Screw's MTO's</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>MTO Id</th>
                        
//                               <th>Date</th>
//                               <th>Status</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
                          

//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//             </Tab>
//             <Tab eventKey="Glass" title="Glass">
//             <Row>
//           <Col md="12">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Glass MTO's</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>MTO Id</th>
                        
//                               <th>Date</th>
//                               <th>Status</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
                           


//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//             </Tab>
//             </Tabs>

//         </Row>
//         <Row>
  
//         </Row>
//         <Row  className='mt-5'>
//           <Col md="4 mb-2">
//             <Card>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Stock List</Card.Title>
//               </>
//               <Card.Body style={{ height: "266px" }}>
//               <div className="legend">
                  
//                   <button className='btn btn-success'  onClick={(e)=>ProjectProfileStock(e,project_id)} >Generate Profile Stock List</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-secondary'>Generate Accessories Stock List</button>
                  
         
//                   <br></br>
//                   <button className='btn btn-warning mt-3'>Generate Packing Material Stock List</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-danger mt-3'>Generate Screw Stock List</button>
//                   <br></br>
//                   <button className='btn btn-info mt-3'>Generate Gasket Stock List</button>
//                   &nbsp;&nbsp;&nbsp;
//                   <button className='btn btn-dark mt-3'>Generate Glass Stock List</button>
                  
//                 </div>
//               </Card.Body>
             
//             </Card>
//           </Col>
//           <Col md="8">
//           <hr className='mt-4'></hr>
//         <h3 className='mt-1'>Stock  List's</h3>
//         <Tabs
//             defaultActiveKey="Profiles"
//             id="fill-tab-example"
//             className="mb-3 mt-2"
//             fill
//             >
//             <Tab eventKey="Profiles" title="Profiles">
//             <Row>
//           <Col md="12">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Profile Stock List</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Refrence</th>
//                               <th>Title</th>
//                               <th>Date</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {
                              
//                               singleProject.map((project,sr)=>{
//                                 if(project['Type']==1){
//                                 return(
//                                 <tr>
//                                 <td>{sr+1}</td>
//                                 <td>{ project['id'] }</td>
//                                 <td>{ project['title'] }</td>
//                                 <td>{ project['created_at'] }</td>
//                                 <td><button onClick={(e)=>StockListDetail(e,project['id'])} className='btn btn-primary'>View Details</button></td>
                                
//                               </tr>
//                                 )
//                                 }
//                               })
                            
//                             }

//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//             </Tab>
//             <Tab eventKey="Accessories" title="Accessories">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Accessories Stock List</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Refrence</th>
//                               <th>Title</th>
//                               <th>Date</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {/* {
                              
//                               projects.map((project,sr)=>{
//                                 return(
//                                 <tr>
//                                 <td>{sr}</td>
//                                 <td>{ project['refrence_no'] }</td>
//                                 <td>{ project['name'] }</td>
//                                 <td>{ project['created_at'] }</td>
//                                 <td><button className='btn btn-success'>View Details</button></td>
//                               </tr>
//                                 )
//                               })
//                             } */}

//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//             </Tab>
//             <Tab eventKey="packing" title="Packing Material">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Packing Material Stock List</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Refrence</th>
//                               <th>Title</th>
//                               <th>Date</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
                          
//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//             </Tab>
//             <Tab eventKey="Gasket" title="Gasket">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Gasket Stock List</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Refrence</th>
//                               <th>Title</th>
//                               <th>Date</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
                          
//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//             </Tab>
//             <Tab eventKey="Screws" title="Screws">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Screw's Stock List</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Refrence</th>
//                               <th>Title</th>
//                               <th>Date</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
                          
//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//             </Tab>
//             <Tab eventKey="Glass" title="Glass">
//             <Card className='mt-2'>
//               <>
//                 <Card.Title tag="h5" className='p-3'>Glass Stock List</Card.Title>
//                 <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Refrence</th>
//                               <th>Title</th>
//                               <th>Date</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
                          
//                           </tbody>
//                         </Table>
//               </>
//               <Card.Body>
               
//               </Card.Body>
//               <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                   <i className="fa fa-history" /> Updated Just Now...
//                 </div>
//               </Card.Footer>
//             </Card>
//             </Tab>
//             </Tabs>
//           </Col>
//         </Row>
//       </div>
//     </div>
//       </Fragment>
//     )
                        }
}

export default ProjectDetails