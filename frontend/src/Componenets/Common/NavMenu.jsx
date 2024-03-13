import React, { Component, Fragment } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link, Navigate } from 'react-router-dom';


export class NavMenu extends Component {
  render() {

    
    //const User=this.props.user;
    let username;
    if(this.props.profile){
      username=this.props.profile.department;
    }
    if(username=='SI'){

      return (
        <Fragment >

      <Navbar bg="light" expand="lg" className='d-print-none'>
        <Container fluid>
          <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <NavDropdown title="Stock" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/available-stock">
                Available Stock
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/out-of-stock">
                Out Of Stock
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/stock">
                All Stock
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/low-stock">
                Low Stock
                </NavDropdown.Item>
                
                <NavDropdown.Item as={Link} to="/mandatory-stock-list">
                Mandatory Stock
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
              <Nav.Link as={Link} to="/submitted-mto">MTO's</Nav.Link>
              <Nav.Link as={Link} to="/delivery-note">Delivery Note</Nav.Link>


              <Nav.Link as={Link} to="/purchase-request">Purchase Request</Nav.Link>
   

              <Nav.Link as={Link} to="/stripping">Stripping</Nav.Link>
              <Nav.Link as={Link} to="/recieve-item">Purchase Orders</Nav.Link>
              <NavDropdown title="Misc" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/issued-report">
                Daily Issue Report
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/site-delivery-note">
                Site Delivery Note
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/project-mtos">
                Site Issuing
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/submitted-mto">
                Return Site Items
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/recieved-supplier-items">
                Recieved Items
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ncr">
                NCR
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Create" id="navbarScrollingDropdown">
            
                <NavDropdown.Item as={Link} to="/create-pr">
                 Purchase Request
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/create-pr">
                 Site Delivery Note
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/create-pr">
                 Supplier Delivery Note
                </NavDropdown.Item>
          
              </NavDropdown>
            </Nav>
        
            <Nav.Link variant="outline-success"  as={Link} to="/cart-view" className='p-2 Button btn btn-success d-print-none'><i class="fa-solid fa-cart-shopping"></i> Basket</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
    )
    }

    else if(username=='PD'){

      return(
        <Fragment>
        <Navbar bg="light" expand="lg"  className='d-print-none' >
        <Container fluid>
          <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/project-list">Projects</Nav.Link>
             
            </Nav>
           <Form className="d-flex">
    
            <Button variant="outline-danger">Log Out</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
      )
    }

    else if(username=='COR'){

      return(
        <Fragment>
        <Navbar bg="light" expand="lg"  className='d-print-none' >
        <Container fluid>
          <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/cor-project">Projects</Nav.Link>
              <Nav.Link as={Link} to="/windows-data">Windows</Nav.Link>
              &nbsp;&nbsp;&nbsp;
              <a className='mt-2' target="_blank" href={'https://drive.google.com/drive/folders/1a-QPtDaKtfQ_8k1Srl5dQLp0G5QDB4Mv?usp=sharing'}>Tutorials</a>
             
            </Nav>

           
            <Form className="d-flex">
    
            <Button variant="outline-danger">Log Out</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
      )
    }

    else if(username=='AD'){
      return(
        <Fragment>
        <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
              <Nav.Link as={Link} to="/project-mtos">MTO's</Nav.Link>
            
              <Nav.Link as={Link} to="/mto-for-pi">MTO for PI</Nav.Link>
              <NavDropdown title="Stock" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/available-stock">
                  Available Stock
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/out-of-stock">
                  Out Of Stock
                  </NavDropdown.Item>
  
                  <NavDropdown.Item as={Link} to="/stock">
                  All Stock
                  </NavDropdown.Item>
  
                  <NavDropdown.Item as={Link} to="/low-stock">
                  Low Stock
                  </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Form className="d-flex">
    
            <Button variant="outline-danger">Log Out</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
      )
    }
    else if(username=='TT'){
      return(
      <Fragment>
      <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
    
          </Nav>
          
          <Form className="d-flex">
  
          <Button variant="outline-danger">Log Out</Button>
        </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Fragment>
      );
    }

    else if(username=='SSA'){
      return(
      <Fragment>
      <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/">Invoice's</Nav.Link>
          </Nav>
          
          <Form className="d-flex">
  
          <Button variant="outline-danger">Log Out</Button>
        </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Fragment>
      );
    }
    else if(username=='DI'){
      return(
      <Fragment>
      <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            {/* <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/project-mtos">MTO's</Nav.Link>
            <Nav.Link as={Link} to="/customized-cor">COR</Nav.Link>

            <Nav.Link as={Link} to="/mto-for-pi">MTO for PI</Nav.Link> */}
            <NavDropdown title="Stock" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/available-stock">
                Available Stock
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/out-of-stock">
                Out Of Stock
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/stock">
                All Stock
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/low-stock">
                Low Stock
                </NavDropdown.Item>
                
                <NavDropdown.Item as={Link} to="/mandatory-stock-list">
                Mandatory Stock
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/revoke-reserved-item">Revoke Item</Nav.Link>
              <Nav.Link as={Link} to="/borrowed-list">Borrowed</Nav.Link>
          </Nav>
          
          <Form className="d-flex">
  
          <Button variant="outline-danger">Log Out</Button>
        </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Fragment>
      );
    }


    else if(username=='ES'){
      return(
        <Fragment>
        <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              
              <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
  
             
              
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-danger">Log Out</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
      );
    }


    else if(username=='FI'){
      return(
      <Fragment>
      <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

              <NavDropdown title="Stock" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/available-stock">
                Available Stock
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/out-of-stock">
                Out Of Stock
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/stock">
                All Stock
                </NavDropdown.Item>
              </NavDropdown>
            
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>

           
            <Nav.Link as={Link} to="/purchase-request">Purchase Request</Nav.Link>
            
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-danger">Log Out</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Fragment>
      );
    }





    else if(username=='PI'){
      return(
      <Fragment>
      <Navbar bg="light" expand="lg" className='d-print-none'>
      <Container fluid>
        <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
              <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/approved-purchase-request">Purchase Requests</Nav.Link>
            <Nav.Link as={Link} to="/approved-quotation-purchase-request">Quotation PR</Nav.Link>
            <Nav.Link as={Link} to="recieve-item">Purchase Order</Nav.Link>
            <Nav.Link as={Link} to="/mto-for-pi">MTO for PI</Nav.Link>
            <Nav.Link as={Link} to="/ncr">NCR</Nav.Link>
      
          </Nav>
          <Form className="d-flex">
  
            <Button variant="outline-danger">Log Out</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Fragment>
      );
    }


    
    else if(username=='SA'){
      return(
        <Fragment>
        <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              
                <Nav.Link as={Link} to="/available-acc-stock">Stock</Nav.Link>
                <Nav.Link as={Link} to="/submitted-mto">MTO Stock</Nav.Link>
           
                <NavDropdown title="Site Delivery" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/project-mtos">
                Site Issuing
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/create-pr">
                Create Site DN
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/site-delivery-note">
                DN List
                </NavDropdown.Item>

            

                
              </NavDropdown>
              <Nav.Link as={Link} to="/delivery-note">Delivery Note</Nav.Link>
            </Nav>
            <Form className="d-flex">
  
            <Button variant="outline-danger">Log Out</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
        );
    }


    
    else if(username=='AC'){
      return(
        <Fragment>
        <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Next Level Group</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >             
             <Nav.Link as={Link} to="/">HomePage</Nav.Link>
                <Nav.Link as={Link} to="/accounts-submitted-po">Requested PO</Nav.Link>
                <Nav.Link as={Link} to="/accounts-approved-po">Approved PO</Nav.Link>
                <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                <Nav.Link as={Link} to="/payable-invoices">Recieveable Invoices</Nav.Link>
  
                
            </Nav>
            <Form className="d-flex">
  
            <Button variant="outline-danger">Log Out</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
        );
    }

  }
}

export default NavMenu