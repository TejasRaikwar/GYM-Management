import React, { useState } from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
  const navigate = useNavigate();

  const navigateToAddCustomer = () => {
    navigate("/app/addcustomer");
  };

  const navigateToPayment = () => {
    navigate("/app/bill");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/");
  };

  function validateForm() {
    let isValid = true;
    const contact = document.getElementById("mobilenum").value;
    // check Mobile number (10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      document.getElementById("phoneError").innerHTML =
        "Please enter a 10-digit contact number.";
      isValid = false;
    } else {
      document.getElementById("phoneError").innerHTML = "";
    }
    return isValid;
  }

  return (
    <>
      <div className="admin-topbar">
        {/* <button onClick={() => setSeen(true)}>Add Payment</button> */}
        <button onClick={navigateToPayment}>Add Payment</button>
        <button onClick={navigateToAddCustomer}>Add Customer</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </>
  );
};

export default Topbar;
