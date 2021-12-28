import React from 'react'
import "./Login.css";
import { useState ,useContext} from "react";
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {useNavigate} from 'react-router-dom';
import { AiOutlineExclamation } from "react-icons/ai";
function LoginSeller() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [passwordd, setPasswordd] = useState("");
    const [checkerror, setCheckerror] = useState("");
    const loginSeller = (e) => {
        e.preventDefault();
        const newSeller = {
            email,
            passwordd,
          };
          axios
            .post("http://localhost:5000/loginSeller", newSeller)
            .then((result) => {
               localStorage.setItem("tokenDoctor",result.data.token);
               localStorage.setItem("DoctorName", result.data.payload.doctorname);
               localStorage.setItem("idDoctor", result.data.payload.sellerid);
               history("/DoctorProfile");
            })
            .catch((err) => {
                 setCheckerror("Your email or password is not correct");
            });
      };
    return (
        <>
        <div className='container'>
            <div className='MainLogin'>
            {checkerror && checkerror.length > 0 ? [
            'danger'
            ].map((variant, idx) => (
            <Alert key={idx} variant={variant} className='Alert-login'>
            <AiOutlineExclamation className='Error-Login'/> {checkerror}
            </Alert>
            )) : ""}
            <div className='child-Login'>
                <h2>Login</h2>
                    <Form onSubmit={loginSeller} className='formlogin'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" required placeholder="example@domain.com"
                            onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"  required
                        onChange={(e) => {
                            setPasswordd(e.target.value);
                        }}/>
                    </Form.Group>
                        <Button type="submit">
                        Login
                        </Button>
                        <p className="newuser">New Doctor ? <span className="btn-newuser" onClick={()=>{history("/SignupSeller")}}>Sign up</span></p>

                    </Form>
            </div>
            </div>
        </div>
            
        </>
    )
}

export default LoginSeller
