import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import NavMenu from '../Common/NavMenu';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import cogoToast from 'cogo-toast';
import SelectSearch from 'react-select-search';

import 'react-select-search/style.css'
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import Async, { useAsync } from 'react-select/async';
import {Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Alert from 'react-bootstrap/Alert';

import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

function SubmittedMTOAllItem(){

    const navigate =useNavigate();
    const[countries,setCountries]=useState([]);
    const[mto,setMTO]=useState([]);
    const[status,setStatus]=useState([]);
    const [error,setError]=useState([]);
    const location = useLocation();
    const[item,setItem]=useState([]);
    const[qty,SetQty]=useState([]);
    const [issued, setIssued] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const[mtodata,setMTOData]=useState([]);
    const[IssuedMTOData,setIssuedMTOData]=useState([]);
    
    const [loading,setLoading]=useState(true);
    const[issue,setIssue]=useState([]);
    const[productionstock,setproductionstock]=useState([]);


// const ItemIDStock=location.state.Id;
   //const StockID=location.state.Sid;
   const [ignored, forceUpdate] = useReducer(x => x + 1, 0);




    useEffect(()=>{
      const check_login=sessionStorage.getItem('login');
      const status=sessionStorage.getItem('code');
        if(!check_login){
            navigate('/login')
          }
          else if(check_login){
            if(status=='SI' || status=='DI'){

            }
            else{
              navigate('/');
              alert('you are not allowed to access , your action will be reported');
            }
          }    



            axios.get(AppURL.MandatoryStockDetail).then(response=>{
              setItem(response.data);
             setLoading(false);
               
              })
    },[ignored]);

  const [region, setRegion] = useState("");






// const IssueItem=(e,remark,color,itemid,quantity,actual_qty,item_id,mto_id,total_check)=>{
//    let data={}
//     setDisabled(true);
//     const thisClicked=e.currentTarget;
//     thisClicked.innerText="Reserving";
//     e.preventDefault();
//     //enableButton(e.target.value);
//     if(parseInt(quantity)===0){
//       cogoToast.error("Item should be more than 1 to reserve",{position:'top-right'});
//     }
//     else{
//       if(total_check>quantity){

//          data={
//           quantity:quantity,
//           balance:quantity,
//           Issued_item:item_id,
//           project:mto_id,
//           status:1,
//           //Supplier:e.target.supplier_id.value,
//           assigned:1,
//           issuingmto:MTOid,
//           color:color,
//           remarks:remark,
//           actual_quantity:actual_qty,
//           total:total_check-quantity
  
//       }
//       }
//       else{
//          data={
//           quantity:quantity,
//           balance:quantity,
//           Issued_item:item_id,
//           project:mto_id,
//           status:1,
//           //Supplier:e.target.supplier_id.value,
//           assigned:1,
//           issuingmto:MTOid,
//           color:color,
//           remarks:remark,
//           actual_quantity:actual_qty,
//           total:0
//       }
//       }


//     const updateMTO={
//       id:itemid,
//       assigned:1
//     }

//     const payload="sub"
//     const payload_data={
//         quantity:quantity,
//         payload:payload,
//     }


// axios.post(AppURL.StockValueUpdateBYItem(item_id),payload_data,{ 
//   headers: {
//   "Content-Type": "application/json",
//   "Authorization": "Token "+sessionStorage.getItem("token"),
// },}).then(re=>{
//     if(re.data.message==='200'){
//        axios.post(AppURL.IssueStock,data,{ 
//         headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Token "+sessionStorage.getItem("token"),
//       },}).then(response =>{  
//          if(response.status===201){
//              cogoToast.success("Item has been Reserved",{position:'top-right'});
//             setError([]);

//             axios.get(AppURL.SingleStockQTY).then(response=>{
//                 SetQty(response.data)

//                 axios.patch(AppURL.UpdateMTOItemStatus,updateMTO,{ 
//                   headers: {
//                   "Content-Type": "application/json",
//                   "Authorization": "Token "+sessionStorage.getItem("token"),
//                 },}).then(re=>{
//                   console.log("ok");
//                 })

//                 forceUpdate();
//                 });
//               //  forceUpdate();
            
//         }
 
//         else if(response.status===400){
//                 cogoToast.error("All Fields are Mandatory...",{position:'top-right'});
//                 setError(response.data.errors);
//                 console.log(error);
//             }

//         })
//  }
//  })
// }
// setDisabled(false);
// }











if(loading){
    return <h4>Loading .....</h4>
} 




   return(
        <>
                <NavMenu></NavMenu>
               
            
               
      <div className='container-fluid'>

      <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            
            <Nav.Item>
              <Nav.Link eventKey="second">Mandatory Stock</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>

            <Tab.Pane eventKey="second">
             <div className='mt-5'></div>

             <Alert variant="primary">
          Here is the list of Mandatory items.
        </Alert>
    <Table  bordered hover size="sm">
      <thead>
        <tr>
            <th>Sr#</th>
          <th>Item Code</th>
          <th>Description</th>
          <th>Length</th>
          <th>Supplier</th>
         <th>Color</th>
         <th>Minimum</th>
          <th>Stock</th>
         
        </tr>
      </thead>
      <tbody>
                          
        {
        item.map((single,i)=>{
          console.log(single)
          let reserved_qty=0
            //console.log(single.project['id']);
            //alert(single.project['id']);
        
            //console.log(single.mto.projectmto['id']);
                 
       
                    return(
                   
                    <tr key={i}>
                        <td>
                       {i+1}
                            </td>
                            <td>{single[2]}</td>
                            <td>{single[1]}</td>
                            <td>{single[3]}</td>
                            <td>{single[4]}</td>
                            <td>{single[5]}</td>
                            <td>{single[7]}</td>
                            {
                                single[6]<single['7']?
                                <td className='balance-low'>{single[6]}</td>
                                :
                                <td>{single[6]}</td>
                            }
                            
                            </tr>
                           
                    )
                })
                
                //.then(galleries => {
                   // dispatch({ type: FETCH_GALLERIES_SUCCESS, payload: galleries });
                  // console.log(galleries);
                //})
        }
      
      </tbody>
    </Table>



            </Tab.Pane>
            
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>




     
      </div>
      </>

    )
}
export default SubmittedMTOAllItem
