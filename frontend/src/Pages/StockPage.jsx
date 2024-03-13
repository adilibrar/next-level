import React, { Component, Fragment, useEffect } from 'react'
import Stock from '../Componenets/Stock/Stock'
import {useNavigate} from 'react-router-dom';

//export class StockPage extends Component {
  
  //render() {
 function StockPage(){
  const navigate =useNavigate();

  useEffect(()=>{


    const check_login=sessionStorage.getItem('login');
    const status=sessionStorage.getItem('code');
      if(!check_login){
          navigate('/login')
        }
        else if(check_login){
          if(status=='SI' || status=='DI' ){
              
          }
          else{
            navigate('/');
            alert('you are not allowed to access , your action will be reported');
          }
        }      
  })

    return (
        <Fragment>
      <Stock></Stock>   
      </Fragment>
       )
  }


export default StockPage


