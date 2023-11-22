import React from "react";
import "./BillForm.css";
import { useState } from "react";

const BillForm = () => {
  // Part 1 : find user
  const [mobile, setMobile] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      handleFindUser();
    }
  };
  function writeError() {
    document.getElementById("phoneError").innerHTML = "User not found.";
  }

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

  const handleFindUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/findMember/${mobile}`,
        {
          method: "POST",
        }
      );
      if (response.status === 200) {
        const userData1 = await response.json();
        // setUserData(userData1);
        // console.log(userData.Name);
        console.log(userData1);
        // setSeen(false);
      } else {
        console.error("Error fetching user data:", response.statusText);
        writeError();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // End Of 1st Part

  // Part 2 : Bill Data
  
  return (
    <>
      {/* {seen ? ( */}
        <div className="input-box">
          <form onSubmit={handleSubmit}>
            <span>Enter Mobile Number : </span>
            <input
              type="number"
              id="mobilenum"
              placeholder="Mobile No."
              min="0"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <span
            id="phoneError"
            className="text-danger"
            style={{ color: "red" }}
          />
        </div>
      {/* ) : ( */}
        {/* <>
          <div className="second-input-box">
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="try-input" id="membershiptype-container">
                  <label>Membership Type : {"  "}</label>
                  <select
                    name="membershiptype"
                    id="membershiptype"
                    onChange={(e) => setMembershipType(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <optgroup label="Hardcore">
                      <option value="1MH">1 Month</option>
                      <option value="3MH">3 Months</option>
                      <option value="6MH">6 Months</option>
                      <option value="12MH">Annual</option>
                    </optgroup>
                    <optgroup label="Hardcore + PT + Cardio">
                      <option value="3HPC">3 Months</option>
                    </optgroup>
                    <optgroup label="Hardcore + Cardio">
                      <option value="3MHC">3 Months</option>
                      <option value="6MHC">6 Months</option>
                      <option value="12MHC">Annual</option>
                    </optgroup>
                  </select>
                  
                </div>
                <div className="try-input">
                  <div className="form-left-side">
                    <label>Start Date : {"  "}</label>
                    <input
                      type="date"
                      id="joindate"
                      name="JoinDate"
                      defaultValue={userData.JoinDate}
                      onChange={(e) => {
                        setJoinDate(e.target.value);
                        handleForm(e);
                      }}
                    />
                  </div>
                  <div className="form-right-side">
                    <label>End Date : </label>
                    <input
                      type="date"
                      id="enddate"
                      name="enddate"
                      onChange={handleForm}
                      required
                    />
                  </div>
                </div>
                <div className="try-input">
                  <div className="form-left-side">
                    <label>Fees Paid : {"  "}</label>
                    <input
                      type="number"
                      min={"0"}
                      id="feespaid"
                      name="feespaid"
                      placeholder="Fees Paid"
                      onChange={handleForm}
                      defaultValue={userData.FeesPaid}
                      required
                    />
                  </div>
                  <div className="form-right-side">
                    <label>Fees Balance : </label>
                    <input
                      type="number"
                      id="feesbalance"
                      name="feesbalance"
                      placeholder="Amount Balance"
                      min={"0"}
                      onChange={handleForm}
                    />
                  </div>
                </div>
                <br />
                <hr />
                <br />
                <p className="bill-form-save-button">
                  <button type="submit" className="bill-save-button">
                    Save
                  </button>
                </p>
              </div>
            </form>
          </div>
        </> */}
      {/* )} */}
    </>
  );
};

export default BillForm;
