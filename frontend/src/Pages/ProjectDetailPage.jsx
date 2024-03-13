import React, { Component, Fragment ,useEffect,useState} from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

import { Link,useNavigate } from 'react-router-dom'
import cogoToast from 'cogo-toast';
import AppURL from '../api/AppURL';
import NavMenu from '../Componenets/Common/NavMenu';
function ProjectDetailPage(){
    const location = useLocation();
    const navigate =useNavigate();
    const [loading,setLoading]=useState(true);
    const [show, setShow] = useState(false);
    //alert(props.item);  
    let unit_short=0;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   
    const[project,setProject]=useState([]);
    const[issue,setIssue]=useState([]);

    const[delivery,setDelivery]=useState([]);
    const[production,setProduction]=useState([]);
    
   // const[itempID,setItempID]=useState();
   const ProjectID=location.state.id;
   
    useEffect(()=>{
        getstockDetails();
        //console.log(item);
    },[]);
    const IssuedItemEdit=(e,Itemid,PName,Qty,status,ItemIDStock)=>{
        e.preventDefault();
        navigate('/issued-item-edit',{state:{Id:Itemid,Pname:PName,Quantity:Qty,Status:status,ItemIDStock:ItemIDStock}});
         }





    const getstockDetails = async()=>{
        try{

           const response= await axios.get(AppURL.ProjectDetail(ProjectID))
           setProject(response.data);
          const issue_response = await axios.get(AppURL.ItemByProject(ProjectID))
           setIssue(issue_response.data);

           // const damage_response = await axios.get(AppURL.StockDamaged(response.data.item['id']))
           // setDamage(damage_response.data);

           const pc_response = await axios.get(AppURL.DNItemByProject(ProjectID))
           setDelivery(pc_response.data);
           
           
           const pr_response = await axios.get(AppURL.PRItemByProject(ProjectID))
           setProduction(pr_response.data);
           
           

           setLoading(false);
            
           // alert("all done");
            //setFilteredCountries(response.data)
           // console.log(countries);
        }catch(error){
            console.log(error);
        }
         //unit_short=item.unit['Short'];
    }
    
    if(loading){
        return <h4>Loading .....</h4>
   } 

    return(
        <>
        <NavMenu></NavMenu>
        <div className='container-fluid'>
      <Row>
        <Col sm={3}>
        <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png?20220914061626" alt="Admin" className="rounded-circle" width="150" />
                    <hr/>
                  
                      <h5>{project.name}</h5>
                      <h7>{project.refrence_no}</h7>
                      <hr></hr>
                      <button className='btn btn-success'>{project.status}</button>
                      <hr/>          
                
                      
            <div className="col-md-12">
                  <div className="card-body">
                   
                    <div className="row">
                      <div className="col-sm-7">
                        <h6 className="mb-0"><strong>Started at</strong></h6>
                      </div>
                      <div className="col-sm-5">
                        {project.created_at}
                      </div>

                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-sm-7">
                        <h6 className="mb-0"><strong>Completion Date</strong></h6>
                      </div>
                      <div className="col-sm-5">
                        {project.completed_at}
                      </div>

                    </div>
                </div>
              

  
              </div>
                    </div>
                  </div>
                </div>

               <Nav defaultActiveKey="/home" className="flex-column">
                
               

                </Nav>
               

        </Col>
        <Col sm={9}>


        <div className="col-sm-12 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Items Reserved for Project</i></h6>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Barcode</th>
                            <th>Item Name</th>
                            <th>Item Code</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Reserved</th>
                            <th>Issued</th>
                            <th>Balance</th>
                          </tr>
                        </thead>
                        <tbody>

                        {issue.map((itemp,sr)=>{
                                      return(

                                          <tr key={sr}>
                                          <td>#{itemp.Issued_item['barcode']}</td>
                                          <td>{itemp.Issued_item['name']} </td>
                                          <td>{itemp.Issued_item['itemcode']}</td>
                                          <td>{itemp.Issued_item['length']} </td>
                                          <td>{itemp.Issued_item['width']}</td>
                                          <td>{itemp.quantity}</td>
                                          <td>{itemp.quantity-itemp.balance}</td>
                                          <td>{itemp.balance}</td>
                                        </tr> 
                                          )}
                        )}
                        
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                

        <div className="col-sm-12 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Items Issued for Powder Coating</i></h6>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Barcode</th>
                            <th>Item Name</th>
                            <th>Item Code</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Quantity</th>
                            <th>Color</th>
                          </tr>
                        </thead>
                        <tbody>

                        {delivery.map((itemdn,sr)=>{
                                      return(

                                          <tr key={sr}>
                                          <td>#{itemdn.dnitem['barcode']}</td>
                                          <td>{itemdn.dnitem['name']} </td>
                                          <td>{itemdn.dnitem['itemcode']}</td>
                                          <td>{itemdn.dnitem['length']} </td>
                                          <td>{itemdn.dnitem['width']}</td>
                                          <td>{itemdn.quantity}</td>
                                          <td>{itemdn.color}</td>
                                        </tr> 
                                          )}
                        )}
                        
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>


                
                

        <div className="col-sm-12 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Items Issued for Production</i></h6>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Barcode</th>
                            <th>Item Name</th>
                            <th>Item Code</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>

                        {production.map((itemdn,sr)=>{
                                      return(

                                          <tr key={sr}>
                                          <td>#{itemdn.Production_Issued_item['barcode']}</td>
                                          <td>{itemdn.Production_Issued_item['name']} </td>
                                          <td>{itemdn.Production_Issued_item['itemcode']}</td>
                                          <td>{itemdn.Production_Issued_item['length']} </td>
                                          <td>{itemdn.Production_Issued_item['width']}</td>
                                          <td>{itemdn.quantity}</td>
                                       </tr> 
                                          )}
                        )}
                        
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
        </Col>
      </Row>

    </div>
    </>
    )
}

export default ProjectDetailPage