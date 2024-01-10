import React from 'react'
import './Topbar.css'
import { useNavigate } from 'react-router-dom';
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
    <div className="admin-topbar">
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Topbar