import React from 'react'
import { useState ,useEffect } from 'react';
import axios from 'axios';
import "./DoctorProfile.css";
import Table from 'react-bootstrap/Table';

const DoctorProfile = () =>{
    let idDoctor = localStorage.getItem("idDoctor");
    const [viewappointments, setViewappointments] = useState([]);
    useEffect(() => {
        axios
          .get(`http://localhost:5000/appointments/accept/appointments/${idDoctor}`)
          .then((response) => {
              setViewappointments(response.data.result)
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, [idDoctor]);
    return (
        <>
        <div className="DoctorProfile">
            <div className="container">
                <h5>My appointments</h5>
        {viewappointments.length > 0 ? (<>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Patient Fristname</th>
                    <th>Patient Lastname</th>
                    <th>Dates</th>
                    <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {viewappointments && viewappointments.map((info)=>{
                        return (
                    <tr>
                    <td>{info.username}</td>
                    <td>{info.lastname}</td>
                    <td>{info.dates}</td>
                    <td><button className="acceptbtn">Accept</button></td>
                    </tr>
                        )
                    })}
                </tbody>
            </Table>
        
        </>) : (<h1 className='emptypending'>There Is No Accepted appointments until now </h1>)}
            </div>
        </div>
        </>
    )
}
export default DoctorProfile