import React, { Component, Fragment ,useState} from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import NavMenu from '../Componenets/Common/NavMenu';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import Item from '../Componenets/Stock/Item'
import { useEffect } from 'react';

function ItemPage(){

  const location = useLocation();
  const item_id=location.state.id;
  const navigate =useNavigate();
   useEffect(()=>{

    const check_login=sessionStorage.getItem('login');
    const status=sessionStorage.getItem('code');
      if(!check_login){
          navigate('/login')
        }
        else if(check_login){
            if(status==='SA'|| status==='SI' || status==='DI'){

          }
          else{
            navigate('/');
            alert('you are not allowed to access , your action will be reported');
          }
        }  
   })

   return(
      <Fragment>
      <NavMenu></NavMenu>
      <Item item={item_id}></Item>

      </Fragment>
    )
}
export default ItemPage