import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavMenu from '../Componenets/Common/NavMenu'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import AppURL from '../api/AppURL';
//  components

import { Container,
  Card,

  Row,
  Col,
} from 'react-bootstrap';
// core components

import {Link, useNavigate} from 'react-router-dom';
import cogoToast from 'cogo-toast';
function HomePage() {
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

        
        axios.get(AppURL.GetAllInvoiceList).then(response=>{
          setInvoice(response.data);
        })
        axios.get(AppURL.GetAllInvoiceListR).then(response=>{
          setInvoicef(response.data);
          if(response.data.length=='0'){
            setSupplierBalance(0)
          }
        })
      },[ignored])

      function SubmitForApproval(e){
        e.preventDefault()
        axios.get(AppURL.SubmitToApprove).then(response=>{
          
          if(response.data['message']=='200'){
            cogoToast.success("Submitted Successfully for Approval...")
            forceUpdate()
          }
        })
      
      }
      const AllProjects=(e)=>{
        e.preventDefault();
        navigate('/active-projects');
         }

         function currencyFormat(num) {
          return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
       }

         const ProjectDetail=(e,projectId)=>{
          e.preventDefault();
          navigate('/project-details',{state:{id:projectId}});
        
          //thisClicked.closest("tr").remove();
          //console.log(email);
           }

           const AddInvoice=(e,invoice,supplier)=>{
            e.preventDefault();
            //navigate('/project-details',{state:{id:projectId}});
              const data={
                sup:supplier,
                inv:invoice
              }
                   
                axios.post(AppURL.InvoiceDraft,data,{
          
                  headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Token "+sessionStorage.getItem("token"),
                },}
                ).then(response =>{  
                  if(response.data['message']=='200'){
                    cogoToast.success("The invoice has been included in the drafts.")
                    forceUpdate();
                    setchecked(false)
                    setSupplierBalance(0)
                  }
                  else{
                    cogoToast.error("Clear the draft before adding new invoices belonging to different suppliers.")
                  }

                })
             }

             function handleShow(id){
         
              setinvoice_id(id)
              setreview('0')
              axios.get(AppURL.GetInvoiceData(id)).then(response=>{
                if(response.data){
                  setInvoiced(response.data)
                  setShow(true);
                  console.log(response.data)
                }
                //setInvoice(response.data);
                // if(response.data['message']=='200'){
                //   cogoToast.success("The invoice has been removed from drafts.")
                //   forceUpdate();
                // }
              })
              
      
            }
             
           const RemoveInvoice=(e,invoice)=>{
            e.preventDefault();
            axios.get(AppURL.RemoveInvoiceDraft(invoice)).then(response=>{
              //setInvoice(response.data);
              if(response.data['message']=='200'){
                cogoToast.success("The invoice has been removed from drafts.")
                setchecked(false);
                setSupplierBalance(0)
                setShow(false);
                forceUpdate();

              }
            })
           }
           
           const CreateProjects=(e)=>{
            e.preventDefault();
            navigate('/new-project',{state:{id:'0'}});
          
            //thisClicked.closest("tr").remove();
            //console.log(email);
             }
           

             function VerifyInvoice(e){
              e.preventDefault();

              axios.get(AppURL.ReviewInvoice(invoice_id)).then(response=>{
                //setInvoice(response.data);
                if(response.data['message']=='200'){
                  cogoToast.success("The invoice has been Approved...")
                  setreview('1')
                  forceUpdate();
                }
              })
             }
        if(code=='PM' || code=='SSA'){
            navigate('/project-list')
          }
          // if(code=='AC'){
          //   navigate('/projects')
          // }
          // else{
        if(code=='COR' || code==='CORDI' || code=='DI' || code=='PI' || code=='SI' || code=='TT' || code=='AC'){
    return (
      <Fragment>
  {
    // code='COR'?
    //   <p>Works</p>
    // :
    // null
  }
 <div className='container-fluid dashboard-background-color mt-2'>
      
      <div className="content ">
        <h3 className=''>Dashboard</h3>
        <hr></hr>
        <Row className='mt-4'>
       
       
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
                      <p className="card-category">Running Projects</p>
                      <h6 tag="p">In process, Going</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
               <a href='#' onClick={(e)=>AllProjects(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
              
                </div>
           
              </Card.Footer>
            </Card>
          </Col>

      
          <Col lg="2" md="6" sm="6">
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
               <a href='#' className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
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
               <a href='#' className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                </div>
           
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="2" md="6" sm="6">
            <Card className="card-stats project-card-payment">
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
                      <h6 tag="p">Finish, achieve, Finalize, Fulfil</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
               <a href='#' className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
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
                      
                      <i class="fa-solid fa-dollar icon-size-lg"></i>
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
               <a href='#' className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;View All</a> 
                </div>
           
              </Card.Footer>
            </Card>
          </Col>

          
          <Col lg="2" md="6" sm="6">
            <Card className="card-stats  project-card-new">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-pencil">
                      
                      <i class="fa-solid fa-pencil icon-size-lg"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">

                    <div className="numbers">
                      <p className="card-category">Create</p>
                      <h6 tag="p">Add, Start</h6>
                      <p />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
              <div className="stats">
                {
                  code=='AC'?
                  <a href='#' onClick={(e)=>CreateProjects(e)} className='dashboard-anchor-tag'><i class="fa-sharp fa-solid fa-arrow-right"></i>&nbsp;&nbsp;New Project</a> 
                  :
                  <>Access Denied...</>
                }
               
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        {
          code=='AC'?
          <Row>
          <Col md="8">
            <Card className='mt-5'>
              <>
              <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Item Code</th>
                              <th>Item Name</th>
                              <th>Quantity</th>
                              <th>Amount</th>
                              <th>Total</th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              invoiced.map((inv,sr)=>{
                                total_invoice_value=total_invoice_value+parseFloat(inv.amount*inv.quantity)
                                return(
                                  <>
                                <tr>
                                <td>{sr+1}</td>
                                <td>{inv.InvoiceItem['itemcode']}</td>
                                <td>{inv.InvoiceItem['name']}</td>
                                <td>{inv.quantity}</td>
                                <td>{inv.amount}</td>
                                <td>{inv.amount*inv.quantity}</td>
                              
                            
                                {/* <td>{ inv['InvoiceRef'] }</td>
                                <td>{ inv.InvoiceSupplier['name'] }</td>
                                <td>{ inv['amount'] }</td>
                                <td>{ inv['creation_date'] }</td>
                                <td>{ inv['due_date'] }</td>
                                { inv['is_review']=='0'?
                                <>
                                <td> <button disabled className='btn btn-danger'>Not Verified</button> </td>
                                <td> <button className="btn btn-success mb-2" onClick={() => handleShow(inv['InvoiceRef'])}> Review</button></td>
                                
                                
                                </>
                                :
                                <>
                                 <td> <button disabled className='btn btn-success'>Verified</button> </td>
                                 <td><button  onClick={(e)=>AddInvoice(e,inv['id'],inv.InvoiceSupplier['id']) } className='btn btn-success'><i className='fa fa-arrow-right'></i></button></td>
                                 </> 
                                } */}
                   
                              </tr>

                              </>
                                )
                              })
                            }
                          </tbody>
                          <tr><td style={{textAlign:"end"}} className='pull-right' colSpan={5}><strong>Total Amount :</strong></td><td>{currencyFormat(total_invoice_value)}</td></tr>
                          <tr><td style={{textAlign:"end"}}  colSpan={5}><strong>VAT 5% :</strong></td><td>{currencyFormat(total_invoice_value*0.05)}</td></tr>
                          <tr><td style={{textAlign:"end"}}  colSpan={5}><strong>Total Invoice Value :</strong></td><td>{currencyFormat(total_invoice_value+(total_invoice_value*0.05))}</td></tr>
                        </Table>
                        {
                          review=='0'?
                              <td> <button  onClick={(e)=>VerifyInvoice(e) }  className='btn btn-success'>Verify Invoice</button> </td>
                              :<button className='btn btn-suceess' disabled>Verified</button>
                        }
                        
        </Modal.Body>
        </Modal>
                <Card.Title tag="h5" className='p-3'>Payable Invoices</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Supplier</th>
                              <th>Amount</th>
                              <th>Date</th>
                              <th>Due Date</th>
                              <th>Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              
                              invoice.map((inv,sr)=>{
                                return(
                                <tr>
                                <td>{sr+1}</td>
                            
                                <td>{ inv['InvoiceRef'] }</td>
                                <td>{ inv.InvoiceSupplier['name'] }</td>
                                <td>{ inv['amount'] }</td>
                                <td>{ inv['creation_date'] }</td>
                                <td>{ inv['due_date'] }</td>
                                { inv['is_review']=='0'?
                                <>
                                <td> <button disabled className='btn btn-danger'>Not Verified</button> </td>
                                <td>
                                <Button className="btn btn-success me-2 mb-2" onClick={(e) => handleShow(inv['id'])}>Review</Button>
                                </td>
                                </>
                                :
                                <>
                                 <td> <button disabled className='btn btn-success'>Verified</button> </td>
                                 <td><button  onClick={(e)=>AddInvoice(e,inv['id'],inv.InvoiceSupplier['id']) } className='btn btn-success'><i className='fa fa-arrow-right'></i></button></td>
                                 </> 
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

          <Col md="4">
            <Card className='mt-5'>
              <>
                <Card.Title tag="h5" className='p-3'>Draft</Card.Title>
                <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Refrence</th>
                              <th>Supplier</th>
                              <th>Amount</th>
                              
                   
                   
                            </tr>
                          </thead>
                          <tbody>
                            {
                             
                              invoicef.map((inv,sr)=>{
                              //   if (row.length - 1 === i) {
                              //     // last one
                              //     setSupplierBalance(inv.InvoiceSupplier['balance'])
                              // }
                                if(inv.InvoiceSupplier['balance'] !='0' && checked==false){
                                  setSupplierBalance(inv.InvoiceSupplier['balance'])
                                  setchecked(true)
                                }
                               
                               
                                total_amount=total_amount+parseFloat( inv['amount'])
                                return(
                                <tr>
                               <td><button className='btn btn-danger'  onClick={(e)=>RemoveInvoice(e,inv['id']) } >{sr+1}</button></td>
                            
                            <td>{ inv['InvoiceRef'] }</td> 
                            <td>{ inv['amount'] }</td> 
                            <td>{ inv.InvoiceSupplier['name'] }</td>
                              </tr>
                                )

                              })

                            }
                          <tr><td>Amount:</td>
                            <th> <strong>{total_amount}</strong></th>
                            <td>Vat: <strong>{total_amount*0.05}</strong></td>
                           
                          <td>Total: <strong>{total_amount+(total_amount*0.05)}</strong></td>
                        
                            </tr>
                          <tr>
                          <td>Supplier Balance :</td>
                          <td><strong>{supplierbalance}</strong></td>
                          <td>
                          
                            <select>
                            <option>Ermirates NBD</option>
                            <option>Rak Bank</option>
                            <option>Cash</option>
                            </select></td>
                            {
                              invoicef.length>0?
                              <td><button onClick={(e)=>SubmitForApproval(e)} className='btn btn-danger'>Submit For Approval</button></td>
                              :null
                            }
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
          :
        <Row>
          <Col md="12">
            <Card className='mt-5'>
              <>
                <Card.Title tag="h5" className='p-3'>Latest Projects</Card.Title>
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
                                <td>1</td>
                                <td>{ project['refrence_no'] }</td>
                                <td>{ project['name'] }</td>
                                <td>{ project['created_at'] }</td>
                                <td> <button className='btn btn-success'  onClick={(e)=>ProjectDetail(e,sr.id)}>View Details</button> </td>
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

      
                  
      }
   
      </div>
    </div>
      </Fragment>
    )
                          }

                          

                          else{
                            
                            return<>
                              <div class="hello">
                                  <h4>Welcome to Dashboard</h4>
                              </div>
                              </>
                            
                          }
}

export default HomePage