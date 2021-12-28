import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchResults.css";
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
 const SearchResults = () => {
  const [search, setSearch] = useState();
  const history = useNavigate();
  let {name} = useParams();


  useEffect(async () => {
      const response = await axios.get(
        `http://localhost:5000/search?name=${name}`
      );
      setSearch(response.data.search);
    console.log(response.data.search);
    
  }, [name]);

  const ViewAllDetailsForDoctor = (id)=>{
    history(`/infodoctors/${id}`)
}


  return (
    <div className="Main-search">
         <div className='container'>
         <button className='btn-pending-goback' onClick={() =>{history("/doctors")}}> <IoMdArrowRoundBack className='pending-icon'/> Back</button>
           <p className='title-searchh'><strong>{search && search.length}</strong> Results for <strong>"Doctors"</strong> in all location </p>
          <div className="row"> 
      {search &&
        search.map((data) => {
          return (
            <>
                <div onClick={() =>ViewAllDetailsForDoctor(data.sellerid)}
                    key={data.id}
                    className="col-lg-3 col-md-6"
                  >
                    <div className="search-contect main-search">

                     <div className="img-contect">
                     <img src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg" alt="not found photo" />
                     </div>

                      <div className="title-search">
                        <p> <span>Dr. :</span> {data.doctorname}</p>
                        <p><span>Specialty:</span> {data.title}</p>
                      </div>
                      
                    </div>
                  </div>
            </>
          );
        })}
    </div>
    </div>
    </div>

  )
};
export default SearchResults;