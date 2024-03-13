import React, { Component, Fragment ,useEffect,useState} from 'react'
import NavMenu from '../../Common/NavMenu';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import AppURL from '../../../api/AppURL';
//  components

import { Container,
  Card,

  Row,
  Col,
} from 'react-bootstrap';
// core components

import {Link, useNavigate} from 'react-router-dom';
function ActiveProjects() {
  const navigate =useNavigate();
  const[projects,setprojects]=useState([]);
  const check_login=sessionStorage.getItem('login');
  
  useEffect(()=>{
      if(!check_login){
          navigate('/login')
        }
        axios.get(AppURL.RunningProjects).then(response=>{
          setprojects(response.data);
          //setLoading(false);
        })
      },[])

      const ProjectDetail=(e,projectId)=>{
     
        e.preventDefault();
        navigate('/project-details',{state:{id:projectId}});
      
        //thisClicked.closest("tr").remove();
        //console.log(email);
         }
    return (
      <Fragment>

 <div className='container-fluid dashboard-background-color mt-2'>
      
      <div className="content ">
        <Row>
          <Col md="12">
            <Card className='mt-2'>
              <>
                <Card.Title tag="h5" className='p-3'>Running Projects</Card.Title>
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
                              
                              projects.map((project,sr)=>{
                                return(
                                <tr>
                                <td>{sr+1}</td>
                                <td>{ project['refrence_no'] }</td>
                                <td>{ project['name'] }</td>
                                <td>{ project['created_at'] }</td>                            
                                <td> <button className='btn btn-success'  onClick={(e)=>ProjectDetail(e,parseInt(project['id']))}>View Details</button> </td>
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
                <div className="stats">
                  <i className="fa fa-history" /> synchronizing...
                </div>
              </Card.Footer>
              <br></br>
            </Card>
          </Col>
        </Row>

      </div>
    </div>
      </Fragment>
    )
  
}

export default ActiveProjects