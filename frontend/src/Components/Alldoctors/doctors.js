import React from 'react'
import "./doctors.css";
import { useState , useEffect} from "react";
import axios from 'axios';

import { useNavigate  } from "react-router-dom";
import { BiLocationPlus } from "react-icons/bi";
import { AiOutlineMail , AiOutlineDollar ,AiOutlinePhone } from "react-icons/ai";

const Doctors = ()=> {

  let userId = localStorage.getItem("userid");
    const history = useNavigate();
    const [infodoctor , setInfoDoctor] = useState([]);
    const [Date, setDate] = useState();
    useEffect(() => {
        axios
          .get("http://localhost:5000/Seller")
          .then((response) => {
            setInfoDoctor(response.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    const ViewAllDetailsForDoctor = (id)=>{
        history(`/infodoctors/${id}`)
    }
    
    const createNewAppointments = (id)=>{
      if(window.confirm("Are sure you want appointments with this doctor ?")){
    const theUsers = {
        buyerid: userId,
        statess:0,
        sellerrid: id,
      };
      axios
        .post("http://localhost:5000/appointments/addNewAppointments", theUsers)
        .then((result) => {
            console.log("created");
        })
        .catch((err) => {
          if(err.message === "Request failed with status code 409"){
            console.log(err);
          }
        });
      }
  }
    return (
        <div className="doctors-page">
        <div className="container">
            <h5>All Specialities <span>{infodoctor.length} Doctors</span></h5>
            <div className="row">
            {infodoctor && infodoctor.map((info)=>{
                return(
                    <div className="col-lg-12">
                        <div className="Viewdoctors">
                          <img src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg" alt='IMG NOT FOUND'/>
                           <div className='info-details'  onClick={() =>ViewAllDetailsForDoctor(info.sellerid)}>
                                <h4><span>Doctor</span> {info.doctorname}</h4>
                                <p>{info.title}</p>
                                <p><BiLocationPlus className='icon'/> {info.locationn}</p>
                                <p><AiOutlineMail className='icon'/> {info.email}</p>
                                <p> <AiOutlineDollar className='icon'/>Fees: {info.fees}:JD</p>
                                <p> <AiOutlinePhone className='icon'/> {info.phoneNumber}</p>
                           </div>
                          <button className='btn-create-booking' onClick={()=>createNewAppointments(info.sellerid)}>Booking Now</button>
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
        </div>
    )
}
export default Doctors
