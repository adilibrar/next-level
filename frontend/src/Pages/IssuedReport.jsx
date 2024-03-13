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
import AppURL from '../api/AppURL';
import { Link,useNavigate } from 'react-router-dom'
import cogoToast from 'cogo-toast';
function IssuedReport(props){
    const navigate =useNavigate();
    const [loading,setLoading]=useState(false);
    const [show, setShow] = useState(false);
    //alert(props.item);  
    let unit_short=0;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   
    const[item,setItem]=useState([]);
    const[issue,setIssue]=useState([]);
    const[damage,setDamage]=useState([]);
   // const[itempID,setItempID]=useState();
    
    useEffect(()=>{
        //getstockDetails();
        //console.log(item);
    },[]);




    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data={
            date:e.target.date.value,
        }


             axios.post(AppURL.ProductionItemByDate,data,{ 
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+sessionStorage.getItem("token"),
              },}).then(response =>{  
                setIssue(response.data);
              })

             console.log(issue)
             setLoading(false)
    }
    
   if(loading){
    return(
        <p>Loading ...</p>
    )
   }

    return(
        <div className='container-fluid'>
      <Row>

      
      <Form onSubmit={handleSubmit}>
            <div className='row col-md-12'>
          
                <div className='col-md-12'>
                <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
                    <Form.Label>Actual and Margin quantity</Form.Label>

                  <span className='form-inline input-group'>  
                  <Form.Control type="date" placeholder="50" name='date'  />
                  
            
               <Button variant="primary" type="submit">View Issued Items</Button>
            
           
                    </span>    

                    </Form.Group>

                    </div>

                </div>
             </Form>
     
        <Col sm={12}>

            <div class="col-md-12">
  
                  <div class="col-sm-12 mb-3">
                    <div class="card h-100">
                      <div class="card-body">
                        <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Assigned / Reserved</i></h6>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Item Code</th>
                              <th>Description</th>
                              <th>Project Name</th>
                              <th>Quantity</th>
                              <th>Date</th>
                            
                            </tr>
                          </thead>
                          <tbody>

                          {
                            issue.map((itemp,sr)=>{
                            //setItempID(itemp.id);
                                       // totalCartPrice += item.unit_price*item.quantity;
                         

                                        return(

                                            <tr key={sr}>                                        
                                            <td>{sr+1}</td>
                                            <td>{itemp.Production_Issued_item['itemcode']}</td>
                                            <td>{itemp.Production_Issued_item['name']}</td>
                                            <td>{itemp.Issuingproject['name']}</td>
                                            <td>{itemp.quantity}</td>
                                            <td>{itemp.created_at}</td>
                                            
                                          </tr> 
                                            )}
                          )}
                          
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>

  

  
  
  
              </div>
        </Col>
      </Row>

    </div>
    )

}

export default IssuedReport;