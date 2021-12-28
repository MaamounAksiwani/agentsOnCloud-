import React from 'react'
import { useState ,useEffect } from 'react';
import axios from 'axios';
import "./Pending.css";
import Table from 'react-bootstrap/Table';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate  } from "react-router-dom";
import { BiSad } from 'react-icons/bi';



const Pending = ()=> {

    let idDoctor = localStorage.getItem("idDoctor");
    const history = useNavigate();
    const [viewpending, setViewpending] = useState([]);

    let treger;
    const rejectAppointments = (id) => {
        axios.put(`http://localhost:5000/appointments/reject/${id}`).then((result)=>{
            treger = id;
            console.log(treger);
            console.log(result.data.message);
        }).catch((err)=>{
            console.log(err.message);
        })
    };
    const AcceptAppointments = (id)=>{
        axios.put(`http://localhost:5000/appointments/accept/${id}`).then((result)=>{
            treger = id;
            console.log(result.data.message);
        }).catch((err)=>{
            console.log(err.message);
        })
    };
    useEffect(() => {
        axios
          .get(`http://localhost:5000/appointments/pending/${idDoctor}`)
          .then((response) => {
            setViewpending(response.data.result)
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, [treger]);
    return (
        <div className="pending-page">
   <div className="container">
       <button className='btn-pending-goback' onClick={() =>{history("/DoctorProfile")}}> <IoMdArrowRoundBack className='pending-icon'/> Back</button>
                <h5>All Pending Appointments </h5>
          {viewpending.length > 0 ? (
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Patient Fristname</th>
                        <th>Patient Lastname</th>
                        <th>Dates</th>
                        <th>status</th>
                        <th>Accept</th>
                        <th>Rejected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewpending && viewpending.map((info)=>{
                            return (
                        <tr>
                        <td>{info.username}</td>
                        <td>{info.lastname}</td>
                        <td>{info.dates}</td>
                        <td><button className="btn-pending" disabled>Pending</button></td>
                        <td><button className="acceptbtn" onClick={() =>{AcceptAppointments(info.id)}}>Accept</button></td>
                        <td><button className="rejectedbtn" onClick={()=>{rejectAppointments(info.id)}}>Rejected</button></td>
                        </tr>
                            )
                        })}
                    </tbody>
                </Table> 
          ): (
              <h1 className="emptypending">There's No pending appointments  <BiSad/></h1>
          )}
            </div>
        </div>
    )
}

export default Pending

