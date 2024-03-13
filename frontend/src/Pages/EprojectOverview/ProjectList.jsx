import React, { Component, Fragment ,useEffect,useState} from 'react'
import NavMenu from '../../Componenets/Common/NavMenu'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import AppURL from '../../api/AppURL';
//  components

import DataTable from 'react-data-table-component';
import { Container,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
// core components

import {Link, useNavigate} from 'react-router-dom';
function ProjectList() {
  const navigate =useNavigate();
  const[projects,setprojects]=useState([]);

  const[countries,setCountries]=useState([]);
  const[search,setSearch]=useState([]);
  const[pmfilter,setpmfilter]=useState(false);
  const[pmid,setpmid]=useState(false);

  const[managers,setManagers]=useState([]);
  
  const[filteredCountries,setFilteredCountries]=useState([]);
  


  const check_login=sessionStorage.getItem('login');
  const getexternal=sessionStorage.getItem('external');
  const usercode=sessionStorage.getItem('code');


  useEffect(()=>{
      if(!check_login){
          navigate('/login')
        }
 
   

        getCountries()
  
        
      },[])

      const ActiveProjects=(e)=>{
        e.preventDefault();
        navigate('/project-list-by-status',{state:{status:'Active'}});
         }

      const OnHoldProjects=(e)=>{
          e.preventDefault();
          navigate('/project-list-by-status',{state:{status:'ON Hold'}});
          
           }

      const CompletedProjects=(e)=>{
            e.preventDefault();
            navigate('/project-list-by-status',{state:{status:'Completed'}});
            
             }

             
      const FullyPaidProjects=(e)=>{
        e.preventDefault();
        navigate('/project-list-by-status',{state:{status:'Fully Paid'}});
        
         }

      const CancelledProjects=(e)=>{
              e.preventDefault();
              navigate('/project-list-by-status',{state:{status:'Cancelled'}});
              
               }

        //  const ProjectDetail=(e,projectId)=>{
        //   e.preventDefault();
        //   navigate('/project-details',{state:{id:projectId}});
        
        //   //thisClicked.closest("tr").remove();
        //   //console.log(email);
        //    }
      function FilterPM(pm){
        setpmfilter(true)
        // axios.get(AppURL.ExternalprojectsList(pm)).then(response=>{
        //   set
        // })
        axios.get(AppURL.ExternalprojectsList(pm)).then(response=>{
          setprojects(response.data);
          setCountries(response.data);
           setFilteredCountries(response.data)
          //console.log(response.data)
          //setLoading(false);
        })
        
      }
        const ProjectDetail=(e,projectId,main)=>{
          e.preventDefault();
          //alert(main)
          navigate('/single-project-details',{state:{id:projectId,mainid:main}});
        
          //thisClicked.closest("tr").remove();
          //console.log(email);
           }

           const ProjectDetailDummy=(e,projectId,main)=>{
            e.preventDefault();
            //alert(main)
            navigate('/single-project-details-dummy',{state:{id:projectId,mainid:main}});
            //thisClicked.closest("tr").remove();
            //console.log(email);
             }

           

           const getCountries = async()=>{
            if(usercode=='SSA'){
              axios.get(AppURL.ExternalprojectsListAll).then(response=>{
                setprojects(response.data);
                //setLoading(false);
                setCountries(response.data);
                setFilteredCountries(response.data)

                axios.get(AppURL.ExternalProjectManagerList).then(mresponse=>{
                  setManagers(mresponse.data);
                  console.log(mresponse.data)
                })
              })


              
            }
            else{
              axios.get(AppURL.ExternalprojectsList(getexternal)).then(response=>{
                setprojects(response.data);
                setCountries(response.data);
                setFilteredCountries(response.data)
                //setLoading(false);
              })
            }
        }
        
            
        const ExpandedComponent = () => ({ data }) => {
         const new_data=JSON.stringify(data, null, 2)
          return (
            <>
            
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              
              <p className='p-4'>Project Value: {data['projectvalue']}</p>
              {/* {suppData}{" "} */}

            </>
          );
        };

        useEffect(()=> {
          const result=countries.filter(project=>{
             // return project.project_name.toLowerCase().match(search.toLowerCase()) || project.project_id.toLowerCase().match(search.toLowerCase());
              return  project.project_id.toString().match(search.toLowerCase()) || project.project_name.toLowerCase().match(search.toLowerCase()) || project.project_area.toLowerCase().match(search.toLowerCase());
          });
          setFilteredCountries(result);
      },[search])
    const columns =[
      {
        name:"Project Refrence",
        selector:(row) =>
        row.phase>0?
        <>
        <span data-toggle="tooltip" data-placement="top" title={row.name}>{String(row.project_id).substring(4, String(row.project_id.length) - 1)}</span>-
        <span data-toggle="tooltip" data-placement="top" title={row.name}>{row.phase}</span>
        </>
        :row.project_id,
        sortable:true
    }  ,
      {
          name:"Location",
          selector:(row) =>  row.phase>0?
          <>
          <span data-toggle="tooltip" data-placement="top" title={row.name}>{row.project_name}</span> (Phase-
          <span data-toggle="tooltip" data-placement="top" title={row.name}>{row.phase}</span>)
          </>
          :row.project_name,
          sortable:true
      }  ,
      {
        name:"Status",
        selector:(row) => row.project_area,
        //sortable:true
    } , 
      // {
      //     name:"Project Name",
      //     selector:(row) => <span data-toggle="tooltip" data-placement="top" title={row.name}>{row.name}</span>,
      //     sortable:true
      // }  ,  

      {
          name:"Status",
          selector:(row) => row.projectstatus,
          sortable:true
      }  ,  

      // {
      //     name:"Completion Date",
      //     selector:(row) => row.completed_at,
      //     sortable:true
      // }  ,  

      // {
      //     name:"Status",
      //     selector:(row) => row.status,
      //     sortable:true
      // }  ,  
      {
          name:"Action",
          cell:(row)=>
          <>
          <button className='btn btn-success'  onClick={(e)=>ProjectDetail(e,row.project_id,row.mainid)}>View Details</button> &nbsp;
          <button  className='btn btn-link'  onClick={(e)=>ProjectDetailDummy(e,row.project_id,row.mainid)}>Dashboard</button>
          </>
      }
  ]
    return (
      <Fragment>

 <div className='container-fluid dashboard-background-color mt-2'>
      
      <div className="content ">
        <h3 className=''>Dashboard</h3>
        <hr></hr>
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
                      <p className="card-category">Running Projects</p>
                      <h6 tag="p">In process, Operational, Going</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
               <a href='#' onClick={(e)=>ActiveProjects(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
              
                </div>
           
              </Card.Footer>
            </Card>
          </Col>


      
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats project-card-delayed">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="fa-solid fa-hourglass-start icon-size-lg"></i>
                
                    </div>
                  </Col>
                  <Col md="8" xs="7">

                    <div className="numbers">
                      <p className="card-category">On Hold Projects</p>
                      <h6 tag="p">Wait, Holdup</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
               <a href='#' onClick={(e)=>OnHoldProjects(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                </div>
           
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="2" md="6" sm="6">
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
                      <p className="card-category">Cancelled Projects</p>
                      <h6 tag="p">Stopped, Stalled</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
               <a href='#' onClick={(e)=>CancelledProjects(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                </div>
           
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="2" md="6" sm="6">
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
                      <p className="card-category">Executed Projects</p>
                      <h6 tag="p">Finish, achieve, Finalize</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
               <a href='#' onClick={(e)=>CompletedProjects(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                </div>
           
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="2" md="6" sm="6">
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
                      <p className="card-category">Fully Paid Projects</p>
                      <h6 tag="p">Completed Payment</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
               <a href='#' onClick={(e)=>FullyPaidProjects(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
              
                </div>
           
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        {
          usercode=='SSA'?
          <Row className='mt-5'>
          <Col md='2'><p>Filter By Project Manager:</p></Col>
          <Col md='2'>
            <select name='pm' onChange={(event) =>FilterPM(event.target.value) }>
            <option>Select Project Manager</option> 
              {
                managers.map((man,i)=>{
                  return(
                    <option value={man.projectmid}>{man.pmname}</option>
                  )
                  
                })
              }
              
              
            </select>
          </Col>
        </Row>
          :null
        }
    
        <Row className='mt-3'>
          <Col md="12">
            <Card className=''>
              <>
                <DataTable 
                    columns={columns} 
                    data={filteredCountries} 
                    pagination title="All Projects" 
                    stateSave= {true}
                    fixedHeader 
                    fixedHeaderScrollHeight="590px"
                    paginationRowsPerPageOptions={[10, 30, 50, 100]}
                    selectableRowsHighlight
                    expandableRows
                    expandableRowsComponent={ExpandedComponent()}
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
                ></DataTable>
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
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated Just Now...
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
   
      </div>
    </div>
      </Fragment>
    )
  
}

export default ProjectList