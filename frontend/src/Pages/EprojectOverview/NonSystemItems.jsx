import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavMenu from '../../Componenets/Common/NavMenu';

import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AppURL from '../../api/AppURL';
//  components

import { Container,
  Card,

  Row,
  Col,
} from 'react-bootstrap';
// core components

import {Link, useNavigate} from 'react-router-dom';
import cogoToast from 'cogo-toast';
function NonSystemItems() {
  const navigate =useNavigate();
  const[projects,setprojects]=useState([]);
  const[invoice,setInvoice]=useState([]);
  const[invoicef,setInvoicef]=useState([]);
  const[invoiced,setInvoiced]=useState([]);
  const check_login=sessionStorage.getItem('login');
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const[invoice_id,setinvoice_id]=useState([]);
  const[review,setreview]=useState([]);

  const[supplierbalance,setSupplierBalance]=useState(0);
  const[checked,setchecked]=useState(false);
  
  
  const code=sessionStorage.getItem('code');
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  let total_amount=0
  let total_invoice_value=0
  let i=0
  useEffect(()=>{

      if(!check_login){
          navigate('/login')
        }
       
        axios.get(AppURL.LatestProjects).then(response=>{
          setprojects(response.data);
          //setLoading(false);

        })

        
        axios.get(AppURL.GetCertifiedPaymentsList).then(response=>{
          setInvoice(response.data);
        })
        axios.get(AppURL.GetAllInvoiceListR).then(response=>{
          setInvoicef(response.data);
          if(response.data.length=='0'){
            setSupplierBalance(0)
          }
        })
      },[ignored])


       
    return (
      <Fragment>
 <div className='container-fluid dashboard-background-color mt-2'>
      
      <div className="content ">
       
        
          <Row>
          <Col md="12">
            <Card className='mt-5'>
              <>
              <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Recieveable Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Data Will be Shown here...</p>
      
                  
                        
        </Modal.Body>
        </Modal>
                <Card.Title tag="h5" className='p-3'>Recieveable Invoices</Card.Title>
      
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

export default NonSystemItems