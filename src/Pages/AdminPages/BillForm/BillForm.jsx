import React from "react";
import "./BillForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BillForm = () => {
  const navigate = useNavigate();
  // form switch
  const [seen, setSeen] = useState("false");
  // Part 1 : find user
  const [mobile, setMobile] = useState("");
  
  // State for userInfo
  const [userInfo, setUserInfo] = useState(null);

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
        const userData = await response.json();
        setUserInfo(userData);
        setSeen(false);
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
  const [form, setForm] = useState({});

  const handleForm = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Store data in localStorage without encoding
    localStorage.setItem("userData", JSON.stringify(userInfo));
    localStorage.setItem("formData", JSON.stringify(form));
    navigate("/payment");
  };

  const handleEnddate = () => {
    const startdateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("enddate");
    endDateInput.value = calculateEndDate(
      document.getElementById("start-date").value,
      document.getElementById("membershiptype").value
    ).toString();

    handleForm({
      target: {
        name: "endDate",
        value: endDateInput.value,
      },
    });
  };

  const calculateEndDate = (startDate, membershipType) => {
    const start = new Date(startDate);
    let endDate = new Date(start);

    switch (membershipType) {
      case "1MH":
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case "3MH":
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case "6MH":
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case "12MH":
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      case "3MHPC":
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case "3MHC":
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case "6MHC":
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case "12MHC":
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      default:
        break;
    }
    const formattedEndDate = endDate.toISOString().split("T")[0];
    return formattedEndDate;
  };

  return (
    <>
      {seen ? (
        <div className="input-box">
          <form onSubmit={handleSubmit}>
            <span className="mobile-span">Enter Mobile Number : </span>
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
      ) : (
        <>
          <div className="second-input-box">
            <form onSubmit={handleUpdate}>
              <div className="form">
                <div className="try-input" id="membershiptype-container">
                  <label style={{width:"190px"}}>Membership Type : {"  "}</label>
                  <select
                    name="membershiptype"
                    id="membershiptype"
                    onChange={handleForm}
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
                      <option value="3MHPC">3 Months</option>
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
                      id="start-date"
                      name="startDate"
                      onChange={handleForm}
                    />
                  </div>
                  <div className="form-right-side">
                    <label>End Date : </label>
                    <input
                      type="date"
                      id="enddate"
                      name="enddate"
                      onClick={handleEnddate}
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
        </>
      )}
    </>
  );
};

export default BillForm;
