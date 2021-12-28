import React, { useState, useEffect } from "react";
import "./Userapp.css";
import { useNavigate  } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GiMedicalThermometer } from 'react-icons/gi';
import { BsCalendar2DateFill } from 'react-icons/bs';
import axios from 'axios';
const Userapp = ()=> {
    let history = useNavigate();
    let userId = localStorage.getItem("userid");
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/appointments/buyer/${userId}`).then((response) => {
            setAppointments(response.data.result);
            console.log(response.data.result)
        }).catch((err) => {
            console.log(err)
        })
    }, []);
    return (
        <div className="Main-viewappointments"> 
        <div className="container">
        <button className='btn-pending-goback' onClick={() =>{history("/doctors")}}> <IoMdArrowRoundBack className='pending-icon'/> Back</button>
        <h5>The Appointments</h5>
        {appointments.length > 0 ? (
            <>
                <div className="row">
                {appointments && appointments.map((item) => {
                    return (
                        <>
                    <div className="col-lg-3">
                            <div className="search-contect">
                                <div className="img-contect">
                                <img src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg" alt="not found photo" />
                                </div>

                                <div className="title-info">
                                <p className='title-doctors'> <GiMedicalThermometer className='icon'/>  Dr.Name :{item.doctorname}</p>
                                <p> <BsCalendar2DateFill className='icon'/> {item.dates}</p>
                               <div className="status-request">
                                   <p className='title-request'> Status </p>
                                   <p>{item.statess === 0 ? (<button className='btn-pending'>Pending</button>): item.statess === 2 ? (<button className='rejectedbtn'>Rejected</button>) : (<button className='acceptbtn'>Accepted</button>)}</p>
                               </div>
                                </div>

                         </div>

                    </div>
                        
                        </>
                    )

                })}
            </div>
            </>
        ): (<h3 className="emptypending"> There's No Any Appointment for You</h3>)}
        </div>
        </div>

    )
}

export default Userapp