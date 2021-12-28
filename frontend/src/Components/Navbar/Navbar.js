import React ,{ useState } from 'react';
import "./Navbar.css";
import { useNavigate  } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';


function Navbar() {
    let tokenDoctor = localStorage.getItem("tokenDoctor");
    let NameOfDoctor = localStorage.getItem("DoctorName");
    let tokenUser = localStorage.getItem("TokenSave");
    let showUsername = localStorage.getItem("username");
    const [title, setTitle] = useState([]);
    const [text, setText] = useState("");

    const history = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        history("/");
    }
    const logoutDoctor = ()=>{
        localStorage.clear();
        history("/");
    }

    const searchResult = (text) =>{
        history(`/Search/${text}`)
      }
    return (
        <div className="nav">
            {tokenUser ? (
             <div className="container">
             <div className="MainNav">
             <div className='logoName'>
                 <h4>booking App</h4>
                 <span>Hi Mr.{showUsername}</span>   
             </div>                
                 <form className="form-search">                            
                     <input type="text" className="Search" placeholder="Search The Doctors" onChange={(e)=>{searchResult(e.target.value)}}/>
                     <button className="btn-search"><FaSearch className='icon-search'/></button> 
                 </form>
                 <div className="btn-option"> 
                     <InputGroup>
                         <DropdownButton
                         variant="outline-secondary"
                         title="Settings"
                         id="input-group-dropdown-4"
                         align="end">
                         <Dropdown.Item onClick={() =>{history("/Userappointments")}}>My Appointments</Dropdown.Item>
                         <Dropdown.Divider />
                         <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                         </DropdownButton>
                     </InputGroup>
                 </div>
             </div>
         </div>  
            ): tokenDoctor ?(
            <div className="container">
                <div className="MainNav">
                <div className='logoName'>
                    <span>Hi Dr.{NameOfDoctor}</span>   
                </div> 
                    <div className="btn-option"> 
                     <InputGroup>
                         <DropdownButton
                         variant="outline-secondary"
                         title="Settings"
                         id="input-group-dropdown-4"
                         align="end">
                         <Dropdown.Item onClick={() => history("/PendingAppointments")}>My Pending Appointments</Dropdown.Item>
                         <Dropdown.Divider />
                         <Dropdown.Item onClick={() => logoutDoctor()}>Logout</Dropdown.Item>
                         </DropdownButton>
                     </InputGroup>
                    </div>
                </div>
            </div>
        ): (
            <div className="container">
            <div className="MainNav">
                <h4>booking App</h4>
                <div className="btn-option">
                    <button className="btn-signup"onClick={() =>history("/signupOption")}> Sign Up</button>
                    <button className="btn-Login" onClick={() =>history("/loginOption")}> Login</button>
                </div>
            </div>
        </div>
        )}
        </div>
                    
    )
}
export default Navbar
