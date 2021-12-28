import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from './Components/Navbar/Navbar'
 import Login from './Components/Login/Login';
import SignUp from './Components/Signup/SignUp';
import Doctors from './Components/Alldoctors/doctors';
import Loginoption from './Components/loginoption/Loginoption';
import Infodoctors from './Components/Infodoctor/Infodoctors';
import Signupoption from './Components/Signupoption/Signupoption';
import LoginSeller from './Components/LoginSeller/Login';
import Signup from './Components/SignupSeller/Signup';
import DoctorProfile from './Components/DoctorProfile/DoctorProfile';
import Pending from './Components/PendingAppointments/Pending';
import SearchResults from './Components/Search/SearchResults';
import Userapp from "./Components/Userappointments/Userapp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
export const tokenContext = createContext();
function App() {
  const [token, setToken] = useState("");
  return (   
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" />
        <Route  path="/signupBuyer" element={<SignUp/>}/>
        <Route  path="/loginBuyer" element={<Login token={token}setToken={setToken}/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/infodoctors/:id" element={<Infodoctors/>}/>
        <Route path="/loginOption" element={<Loginoption/>}/>
        <Route path="/signupOption" element={<Signupoption/>}/>
        <Route path="/LoginSeller" element={<LoginSeller/>}/>
        <Route path="/SignupSeller" element={<Signup/>}/>
        <Route path="/DoctorProfile" element={<DoctorProfile/>}/>
        <Route path="/PendingAppointments" element={<Pending/>}/>
        <Route path="/Search/:name" element={<SearchResults/>}/>
        <Route path="/Userappointments" element={<Userapp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
