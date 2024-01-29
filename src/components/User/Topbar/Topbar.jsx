import React from 'react'
import './Topbar.css'
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/another logo.jpg"
import logo2 from "../../../assets/logo3.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Topbar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("userData");
    navigate('/');
  };
  return (
    <div className='userpage-topbar'>
    <div className='site-logo'>
      {/* <h1>Royalty Fitness</h1> */}
      <img src={logo2} alt="site-logo" className='usersitelogo'/>
    </div>
    <div className="admin-topbar">
      {/* <h1>Admin Panel</h1> */}
      <button onClick={handleSignOut} className='user-signout'>Sign Out</button>
    </div>
    </div>
  );
}

export default Topbar