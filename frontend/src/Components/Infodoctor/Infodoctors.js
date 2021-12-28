import React from 'react'
import {useParams} from 'react-router-dom';
import { useState , useEffect} from "react";
import axios from 'axios';
import "./Infodoctors.css";

import { useNavigate  } from "react-router-dom";
import { AiOutlineDollar,AiFillStar} from "react-icons/ai";
import {BiLocationPlus} from 'react-icons/bi'
import {MdDateRange } from "react-icons/md";
function Infodoctors() {
    const history = useNavigate();

    let userId = localStorage.getItem("userid");
    const [details, setDetails] = useState();
    useEffect(()=>{
        axios.get(`http://localhost:5000/Seller/sellers/${id}`).then((response)=>{
            setDetails(response.data.result)
        }).catch((err)=>{
            console.error(err);
        })
    },[])
    let { id } = useParams();


    const createNewAppointments = (id)=>{
        if(window.confirm("Are sure you want appointments with this doctor ?")){
                const theUsers = {
          dates : "220-10-10",
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
        <div className='viewDetails'>
            <div className='container'>
                <div className='row'>
                    {details && details.map((information)=>{
                        return (
                        <>
                         <p><span onClick={()=>{history("/doctors")}} className='title-page'>Home</span> / Dr. {information.doctorname} </p>
                        
                        <div className='col-lg-8'>
                            <div className='Main-information-doctor'>
                                <img src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg" alt="not found photo" alt='IMG NOT FOUND'/>
                                <div className='text-info'>
                                <p> Doctor {information.username}</p>
                                <p>{information.title}</p>
                                </div>
                            </div>

                            <div className='aboutDoctor'>
                               <div className='Main-about-doctor'>
                               <AiFillStar className='icon'/>
                                <p>About The Doctor</p>
                                </div>
                                <p>
                                    {information.decs}
                                </p>
                            </div>
                        </div>                         
                        <div className='col-lg-4'>
                        <div className='booking-details'>
                            <h6>Bookingss Information</h6>
                            <span className='booking-title'>Book</span><br></br>
                            <span className='booking-examination'>Examination</span>
                            <hr></hr>
                            <div className='booking-option'>
                                <div>
                                    <AiOutlineDollar className='icon book-option'/>
                                    <p>Fees :{information.fees} JD</p>
                                   
                                </div>
                            </div>

                            <hr></hr>
                            <div className='booking-loction'>
                                <BiLocationPlus className='icon'/>
                                <div className='loction-info'>
                                    <span>{information.locationn}</span> <br></br>
                                   <span>Book now to receive the clinic’s address details and phone number</span>
                                </div>
                            </div>


                            <hr></hr>
                            <div className='booking-chooes'>
                            <button className='btn-create-booking' onClick={()=>createNewAppointments(information.sellerid)}>Booking Now</button>
                            </div>

                            <hr></hr>

                            <p>Appointment reservation</p>

                            <hr></hr>
                            <div className='booking-date'>
                                <MdDateRange className='icon booking-icon'/>
                                <div className='booking-info'>
                                    <p>Book online, Pay at the clinic!</p>
                                    <p>Doctor requires reservation!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        </>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Infodoctors
