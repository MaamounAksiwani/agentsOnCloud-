import React , { useState }from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';
import {useNavigate} from 'react-router-dom';
import "./SignUp.css";
import { AiOutlineExclamation } from "react-icons/ai";
// import { useNavigate  } from "react-router-dom";

import axios from 'axios';
function SignUp() {
    
    const history = useNavigate();
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [passwordd, setPasswordd] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    const [errormessage , setErrormessage] = useState("");
    // const history = useNavigate();

    /// validation form 

    const insertNewUser = (e) => {
        e.preventDefault();
        // // var regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
        // // if(confirmPassword !== passwordd){
        // //     setconfirmPassword("Password fields do not match");
        // // }else if(passwordd.length < 6){
        // //     setconfirmPassword("Password Must be greater Than 6 characters");
        // // }else if(regex.test(passwordd) === false){
        // //     setconfirmPassword('Password must contain at least one special character');
        // // }else{

        // // }

        if(confirmPassword !== passwordd){
            setErrormessage("PASSWORD NOT MATCHED");
        }else if(passwordd.length < 6){
            setErrormessage("Password Must be greater Than 6 characters");
        }else{
            const theUsers = {
                username,
                lastname,
                email,
                passwordd,
              };
              axios
                .post("http://localhost:5000/signupbuyer", theUsers)
                .then((result) => {
                    history("/loginBuyer");
                    
                })
                .catch((err) => {
                  if(err.message === "Request failed with status code 409"){
                    // setconfirmPassword("Email is already taken")
                    setErrormessage("Email is already taken");
                  }
                });
        }
      };
    
    return (
        <div className="container">
        <div className="MainSignup">
            {errormessage && errormessage.length > 0 ? [
            'danger'
            ].map((variant, idx) => (
            <Alert key={idx} variant={variant} className='Alert-login'>

            <AiOutlineExclamation className='Error-Login'/> {errormessage}
            </Alert>
            )) : ("")}
            <div className="child-Signup">
            <h2>Sign Up</h2>
            <Form onSubmit={insertNewUser} className='formSignup'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" 
                           onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" 
                              onChange={(e) => {
                                setLastname(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" 
                           onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                            onChange={(e) => {
                                setPasswordd(e.target.value);
                            }}
                        />
                    </Form.Group>


                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" 
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Button type="submit">
                        join now
                    </Button>
                    <hr></hr>
                    <p className="newuser">Already Registered in BookingApp ?  <span className="btn-newuser" onClick={()=>{history("/loginBuyer")}}>Login</span></p>
                    </Form>
            </div>
        </div>
        </div>
    )
}

export default SignUp