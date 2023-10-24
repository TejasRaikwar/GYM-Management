import React, { useState } from 'react'
import './Topbar.css'
import { useNavigate } from "react-router-dom";
const Topbar = () => {
  const [seen, setSeen] = useState(false)
  const navigate = useNavigate();
  const navigateToAddCustomer = () =>{
    navigate('/app/addcustomer')
  }
  const navigateToPayment = () =>{
    navigate('/payment');
  }
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate('/');
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const isValid = validateForm(); 
  }

  function validateForm() {
    let isValid = true;
    const contact = document.getElementById("mobilenum").value;
    // check Mobile number (10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      document.getElementById("phoneError").innerHTML ="Please enter a 10-digit contact number.";
      isValid = false;
    } else {
      document.getElementById("phoneError").innerHTML = "";
    }
    return isValid;
  }

  // Find Member:
  const[mobile, setMobile] = useState("");
  const handleFindUser = async () =>{
    try{
      const response = await fetch(`http://localhost:8080/findMember/${mobile}`,{
        method:'POST',
      });
      if(response.status === 200){
        const userData =await response.json(); 
        console.log(userData.Name);
      }
      else{
        console.error("Error fetching user data:", response.statusText);
      }
    }
    catch(error){
      console.error("Error fetching user data:", error);
    }
  }
  return (
    <>
      {seen ? (
        <div className="confirm-delete">
          <form onSubmit={handleSubmit}>
            <h1>Enter Mobile Number</h1>
            <input
              type="number"
              id="mobilenum"
              placeholder="Mobile No."
              min="0"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <br />
            <span
              id="phoneError"
              class="text-danger"
              style={{ color: "red" }}
            />
            <br />
            <button type="submit" onClick={handleFindUser}>
              Submit
            </button>
            <button onClick={() => setSeen(false)}>Close</button>
          </form>
        </div>
      ) : null}

      <div className="admin-topbar">
        <button onClick={() => setSeen(true)}>Add Payment</button>
        <button onClick={navigateToAddCustomer}>Add Customer</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </>
  );
}

export default Topbar