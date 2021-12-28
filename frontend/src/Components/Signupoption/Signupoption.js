import React from 'react'

import Form from 'react-bootstrap/Form'
import { useState} from "react";
import {useNavigate} from 'react-router-dom';
function Signupoption() {
    const history = useNavigate();
    const SignupWithOption = (e)=>{
        if(e.target.value == "buyer"){
            history("/signupBuyer");
        }else{
            history("/SignupSeller")
        }
    }
    return (
        <>
               <div className='container'>
            <div className='MainLogin'>
            <div className='child-Login login-option'>
                <h2>Sign up</h2>
                    <Form.Select className='select-box' size="sm" defaultValue="login as a seller or buyer" onChange={SignupWithOption}>
                    <option hidden value='0'> Choose one </option>
                    <option value='buyer'>User</option>
                    <option value='seller'>Doctor</option>
                    </Form.Select>
                <button className="cssbuttons-io-button"> Get started
                    <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                    </div>
                </button>
            </div>
            </div>
        </div>  
        </>
    )
}

export default Signupoption
