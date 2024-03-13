import React, { Component, Fragment ,useEffect,useState,useReducer} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import AppURL from '../api/AppURL';
import Form from 'react-bootstrap/Form';
import cogoToast from 'cogo-toast';
import {Link, useNavigate} from 'react-router-dom';



function LoginPage(){



    const [formData,setFormData]=useState({
        username:'',
        password:''
    });
    const [login, setLogin] = useState({
        loggedIn:false,
        //token:'',
    });
    
    const {username,password}=formData;
    const onChange =e=>setFormData({...formData,[e.target.name]: e.target.value });
    const navigate =useNavigate();
    const[item,setItems]=useState([]);
    const[cart,setCart]=useState([]);

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
 
    useEffect(()=>{
      const check_login=sessionStorage.getItem('login');
      const getexternal=sessionStorage.getItem('external');
      if(check_login=='1'){
        
          navigate('/');
      }

      
    },[ignored]);

    const HandleLogin=(e)=>{
      e.preventDefault();
      if((e.target.username.value=='' || e.target.password.value=='')){
           cogoToast.error("Username and password is required",{position:'top-right'});   
      }
      else{
          const login_data={
              username:e.target.username.value,
              password:e.target.password.value
          }

          axios.post(AppURL.LoginURL,login_data,{
            headers: {
              "access-control-allow-origin" : "*",
              "Content-Type": "application/json",
            }
          }).then(response=>{
            sessionStorage.setItem('token',response.data.key);
          
            setLogin({loggedIn:true})
            sessionStorage.setItem('login','1');
            }).catch(error=>{
                console.log(error);
                cogoToast.error("Invalid Username or password");
            });
            //console.log(login);
        }} 

if(!login.loggedIn){
    return(

        <>
    <div className="Auth-form-container">
      <Form className="Auth-form" onSubmit={HandleLogin}>
      <Form.Group className="mb-3 form-inline" controlId="formBasicEmail">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <Form.Control   type="text" placeholder="nlg"  name='username'  
            value={username}
            onChange={e=> onChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            
            <Form.Control type="password" placeholder=""  name='password' 
             value={password}
             onChange={e=> onChange(e)}
            
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
        </Form.Group>
      </Form>
    </div>
      </>

    )
}
else{
  window.location.reload();
    return (
      navigate('/')
      
      )
    
   
}
   
}
export default LoginPage
