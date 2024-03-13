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
import AppURL from '../../api/AppURL';
import { Link,useNavigate } from 'react-router-dom'
import cogoToast from 'cogo-toast';
function Item(props){
    const navigate =useNavigate();
    const [loading,setLoading]=useState(true);
    const [show, setShow] = useState(false);
    //alert(props.item);  
    let unit_short=0;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   
    const[item,setItem]=useState([]);
    const[issue,setIssue]=useState([]);
    const[damage,setDamage]=useState([]);
    const[order,setOrder]=useState([]);
    const[reserve,setReserve]=useState([]);
    
   // const[itempID,setItempID]=useState();
    const status=sessionStorage.getItem('code');
    useEffect(()=>{
        getstockDetails();
             

        //console.log(item);
    },[]);
    const IssuedItemEdit=(e,Itemid,PName,Qty,status,ItemIDStock)=>{
        e.preventDefault();
        navigate('/issued-item-edit',{state:{Id:Itemid,Pname:PName,Quantity:Qty,Status:status,ItemIDStock:ItemIDStock}});
      
        //thisClicked.closest("tr").remove();
        //console.log(email);
         }


         const RedirectToTab=(e,Itemid,stockId)=>{
          //,PName,Qty,status,ItemIDStock
          //alert(Itemid);
          navigate('/manage-item',{state:{Id:Itemid,Sid:stockId}});
          //  navigate('/issued-item-edit',{state:{Id:Itemid,Pname:PName,Quantity:Qty,Status:status,ItemIDStock:ItemIDStock}});
        
          //thisClicked.closest("tr").remove();
          //console.log(email);
           }

    const deleteIssuedItem=(e,issuing_id,quantity,item_id)=>{
        e.preventDefault();
        const thisClicked=e.currentTarget;
        thisClicked.innerText="Removing";
        axios.delete(AppURL.StockIssuingDelete(issuing_id)).then(response=>{
            //alert(response.data.message);
            if(response.data.message==200){     
                axios.patch(AppURL.StockReleaseUpdate(item_id),{quantity},{ 
                  headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Token "+sessionStorage.getItem("token"),
                },}).then(response=>{
                                   // cogoToast.success("Total items are Released",{position:'top-right'});
                    cogoToast.success("Items has been Released ...",{position:'top-right'});
                
                    thisClicked.closest("tr").remove();
                 })

            }
        })



    }


    const MTODetailForDeliveryNote=(e,MtoId)=>{
      e.preventDefault();
      navigate('/issue-reserve-stock',{state:{MTOid:MtoId}});
       }


    const getstockDetails = async()=>{
        try{

            //alert(props.item);
            //alert(AppURL.SingleStockItem(props.item));
            const response= await axios.get(AppURL.SingleStockItem(props.item))
            setItem(response.data);
            console.log(response.data)
            const issue_response = await axios.get(AppURL.SingleStockIssued(response.data.item['id']))
            setIssue(issue_response.data);

            const damage_response = await axios.get(AppURL.StockDamaged(response.data.item['id']))
            setDamage(damage_response.data);

            
            const order_response = await axios.get(AppURL.GetTotalOrderItem(response.data.item['id']))
            setOrder(order_response.data);
            
            const reserve_response = await axios.get(AppURL.GetTotalReservedItem(response.data.item['id']))
            setReserve(reserve_response.data);
            
            
           // console.log(issue);
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
        <div className='container-fluid'>
      <Row>
        <Col sm={3}>
        <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                       <img src={`http://192.168.168.26:8000${item.item['image']}`} alt="Image NA" className="rounded-circle" width="300" /> 
                      {/* <img src=''.''{item.item['image']} alt="Admin" className="rounded-circle" width="150" /> 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png?20220914061626" */}
                    <hr/>
                    <h6>#{item.item['barcode']}</h6>
                      <h5>{item.item['name']}</h5>
                      <h7>{item.item['description']}</h7>
                    </div>
                  </div>
                </div>
                <hr></hr>

                <>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Example textarea</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                  </Modal.Footer>
                </Modal>
               </>
               <Nav defaultActiveKey="/home" className="flex-column">
                
                {
                  (status==='DI')?

                    null
                  :

                  <Button className="btn btn-primary btn-lg btn-block" onClick={(e)=>RedirectToTab(e,item.item['id'],props.item)} >
                         Manage Item
                  </Button>
                }

   

                </Nav>
               

        </Col>
        <Col sm={9}>

            <div class="col-md-12">
                <div class="card mb-3">
                  <div class="card-body">
                   
                    <div class="row col-md-12">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Item Code</h6>
                      </div>
                      <div class="col-sm-3">
                        {item.item['itemcode']}
                      </div>

                      <div class="col-sm-3">
                        <h6 class="mb-0">Item Type</h6>
                      </div>
                      <div class="col-sm-3">
                        {item.item['type']['name']}
                      </div>
                    </div>
                    <hr/>
                   
                    <div class="row col-md-12">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Unit</h6>
                      </div>
                      <div class="col-sm-3">
                        {item.item['unit']['name']}
                      </div>

                      <div class="col-sm-3">
                        <h6 class="mb-0">Length</h6>
                      </div>
                      <div class="col-sm-3">
                      {item.item['length']}
                      </div>
                    </div>
                    <hr/>

                    <div class="row col-md-12">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Finishing</h6>
                      </div>
                      <div class="col-sm-3">
                        {item.item['finishing']['name']}
                      </div>

                      <div class="col-sm-3">
                        <h6 class="mb-0">Quantity</h6>
                      </div>
                      <div class="col-sm-3">
                        {item.quantity}
                      </div>
                    </div>
                    <hr/>
                   

                    <div class="row col-md-12">
                      <div class="col-sm-3">
                        <h6 class="mb-0">System</h6>
                      </div>
                      <div class="col-sm-3">
                        {item.item['system']['name']}
                      </div>

                      <div class="col-sm-3">
                        <h6 class="mb-0">Supplier</h6>
                      </div>
                      <div class="col-sm-3">
                      {item.item['Supplier']['name']}
                      </div>
                    </div>
                   <hr></hr>

                    <div class="row col-md-12">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Weight</h6>
                      </div>
                      <div class="col-sm-3">
                        {item.item['weight']}
                      </div>
                      <div class="col-sm-3">
                        <h6 class="mb-0">width</h6>
                      </div>
                      <div class="col-sm-3">
                      {item.item['width']}
                      </div>
                    </div>

                    <hr></hr>

                  <div class="row col-md-12">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Reserved</h6>
                    </div>
                    <div class="col-sm-3">
                      {reserve}
                    </div>
                    <div class="col-sm-3">
                      <h6 class="mb-0">Ordered</h6>
                    </div>
                    <div class="col-sm-3">
                    {order}
                    </div>

                
                  </div>
                  <hr></hr>
                  <div class="row col-md-12">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Total</h6>
                    </div>
                    <div class="col-sm-6">
                      {order+reserve+item.quantity}
                    </div>
                
                  </div>

                    
                   
            
                  </div>
                </div>
              

  
                  <div class="col-sm-12 mb-3">
                    <div class="card h-100">
                      <div class="card-body">
                        <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Assigned / Reserved</i></h6>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Project Name</th>
                              <th>R.Quantity</th>
                              <th>Issued</th>
                              <th>Revoke</th>
                              <th>Balance</th>
                             <th>Date</th>
                             <th>MTO</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>

                          {issue.map((itemp,sr)=>{
                         
                            //setItempID(itemp.id);
                                       // totalCartPrice += item.unit_price*item.quantity;
                                    let qty='';
                                       if(itemp.length == 'NA'){
                                        qty=itemp.quantity;
                                        }else{
                                         qty= itemp.length;
                                        }
                                        if(itemp['remarks']!='Offcut'){
                                          console.log(itemp)
                                        return(

                                            <tr key={sr}>
                                            <td>{sr+1}</td>
                                            {/* <td></td> */}
                                            <td>{itemp.project['name']} </td>
                                            <td>{qty}</td>
                                            <td>{(parseInt(qty)-parseInt(itemp['revoke']))-parseInt(itemp['balance'])}</td>
                                            <td>{itemp['revoke']}</td>
                                            <td>{itemp['balance']}</td>
                                           
                                          <td>{itemp.created_at}</td>
                                          <td>
                                          <button className='btn btn-link'  onClick={(e)=>MTODetailForDeliveryNote(e,itemp.issuingmto['id'])}>{itemp.issuingmto['id']}</button>
                                          </td>
                                            
                                            <td>  <button disabled type='button' onClick={(e)=>deleteIssuedItem(e,itemp.id,qty,itemp.Issued_item['id'])} className='btn btn-danger btn-sm'><i class="fa-solid fa-upload"></i></button>  <button type='button' onClick={(e)=>IssuedItemEdit(e,itemp.id,itemp.project['name'],qty,itemp.status['id'],item.item['id'])} className='btn btn-danger btn-sm' disabled><i class="fa-solid fa-edit"></i></button>  </td>
                                          </tr> 
                                            )
                                        }
                                          }
                          )}
                          
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>

  

  
                  <div class="col-sm-12 mb-3">
                    <div class="card h-100">
                      <div class="card-body">
                        <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Damaged / Wastage</i></h6>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                    {damage.map((item,sr)=>{

                        return(
                            <tr>
                                <td>{sr+1}</td>
                                <td>{item.title} </td>
                                <td>{item.quantity} </td>
                                <td>{item.created_at} </td>
                                <td>{item.status['title']} </td>
                                
                            </tr>
                     ) }
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

export default Item;