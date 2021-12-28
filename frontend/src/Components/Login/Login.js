import React from 'react'
import "./Login.css";
import { useState ,useContext} from "react";
import Form from 'react-bootstrap/Form'
import axios from 'axios';

import { AiOutlineExclamation } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {tokenContext} from '../../App';
import {useNavigate} from 'react-router-dom';
function Login({token, setToken}) {
    const getToken = useContext(tokenContext);
    const [email, setEmail] = useState("");
    const [passwordd, setPasswordd] = useState("");
    const [message,setMessage] = useState("");

    
    const history = useNavigate();
    const loginbuyer = (e) => {
        e.preventDefault();
        const newbuyer = {
            email,
            passwordd,
          };
          axios
            .post("http://localhost:5000/loginbuyer", newbuyer)
            .then((result) => {
                localStorage.setItem("username", result.data.payload.username);
                 setToken(result.data.token);
                 localStorage.setItem("TokenSave",result.data.token)
                 localStorage.setItem("userid", result.data.payload.userid);
                 history("/doctors");
            })
            .catch((err) => {
                setMessage("your email or password is not correct");
            });
      };

    return (
        <div className='container'>
               {message && setMessage.length > 0 ? [
            'danger'
            ].map((variant, idx) => (
            <Alert key={idx} variant={variant} className='Alert-login'>

            <AiOutlineExclamation className='Error-Login'/> {message}
            </Alert>
            )) : ""}
            <div className='MainLogin'>
            <div className='child-Login'>
                <h2>Login</h2>
                    <Form onSubmit={loginbuyer} className='formlogin'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email"  placeholder="example@domain.com"
                            onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password"  
                        onChange={(e) => {
                            setPasswordd(e.target.value);
                        }}/>
                    </Form.Group>
                        <Button type="submit">
                        Login
                        </Button>
                        <p className="newuser">New User ? <span className="btn-newuser" onClick={()=>{history("/signupBuyer")}}>Sign up</span></p>
                    </Form>
            </div>
            </div>
        </div>
    )
}

export default Login
