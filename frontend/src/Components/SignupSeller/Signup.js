import React , { useState }from "react"
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert';
import Col from "react-bootstrap/Col";
import "./Signup.css";
import Row from "react-bootstrap/Row";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AiOutlineExclamation } from "react-icons/ai";

function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [title, setTitle] = useState();
    const [decs, setDecs] = useState();
    const [passwordd, setPasswordd] = useState();
    const [doctorname, setDoctorname] = useState();
    const [fees, setFees] = useState();
    const [location, setLocation] = useState();
    const [checkError, setCheckError] = useState();

    const createNewSeller = (e) => {
        e.preventDefault();
        const NewSeller = {
            email,
            phoneNumber,
            title,
            decs,
            passwordd,
            doctorname,
            fees,
            location,
          };
          axios
            .post("http://localhost:5000/signupSeller", NewSeller)
            .then((result) => {
              history("/LoginSeller");
            })
            .catch((err) => {
              console.log(err);
              setCheckError("Email is already taken");
                console.log(checkError)
            });
      };
    return (
        <>
        <div className="MainSignup">
        <div className="container">
        {checkError && checkError.length > 0 ? [
            'danger'
            ].map((variant, idx) => (
            <Alert key={idx} variant={variant} className='Alert-login'>

            <AiOutlineExclamation className='Error-Login'/> {checkError}
            </Alert>
        )) : ("")}
            <div className="child-Signup seller_reg">
            {/* Start Fomr */}
            <h2>Sign Up</h2>
     
    <Form onSubmit={createNewSeller} className='sellerForm'>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label> Dr.name </Form.Label>
      <Form.Control required type="text" placeholder="Type here..." onChange={(e)=>{
          setDoctorname(e.target.value)
      }}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword" className='goal'>
     <Form.Label> specialty </Form.Label>
      <Form.Control required type="text" placeholder="Type here..." onChange={(e)=>{
          setTitle(e.target.value)
      }} />
    </Form.Group>
  </Row>


  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label> Password </Form.Label>
      <Form.Control minLength="6" required type="password" placeholder="Type here..." onChange={(e)=>{setPasswordd(e.target.value)}}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword" className='goal'>
     <Form.Label> Location</Form.Label>
      <Form.Control type="text" placeholder="Type here..." onChange={(e)=>{setLocation(e.target.value)}}/>
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Email Address</Form.Label>
    <Form.Control required type='email' placeholder="Type here..." onChange={(e)=>{setEmail(e.target.value)}}/>
  </Form.Group>


  <Row className="mb-3">
  <Form.Group as={Col} controlId="formGridZip">
  <Form.Label> Fees</Form.Label>
      <Form.Control required type='number' placeholder="Type here..." onChange={(e)=>{setFees(e.target.value)}}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
    <Form.Label> Mobile </Form.Label>
      <Form.Control required type='number' placeholder="Type here..." onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
    </Form.Group>
  </Row>
  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>About You </Form.Label>
    <textarea className="form-control" type="text" id="exampleFormControlTextarea1" placeholder="Type here..." rows="3" maxLength="245" onChange={(e) =>{setDecs(e.target.value)}}></textarea>
  </Form.Group>
  <button type="submit">
    Join now
  </button>
</Form>
<p className="newuser">Already Registered in BookingApp ? <span className="btn-newuser" onClick={()=>{history("/LoginSeller")}}>Login</span></p>
</div>
    </div>
            {/* End Form */}
        </div>
        
        </>
    )
}

export default Signup
