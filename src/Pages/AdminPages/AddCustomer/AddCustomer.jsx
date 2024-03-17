import { React, useState } from "react";
import "./AddCustomer.css";
import axios from "axios";
import PopMessage from "../../../components/PopMessage/PopMessage";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURl = "http://localhost:8080/";
const AddCustomer = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [popmsg, setPopmsg] = useState(false);
  const [form, setForm] = useState({});
  const handleForm = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    if (name === "mobilenum") {
      if (value.length !== 10 || value < 0 || value > 9999999999) {
        input.setCustomValidity("Please enter a valid 10-digit mobile number.");
      } else {
        input.setCustomValidity("");
      }
    }

    setForm({
      ...form,
      [name]: value,
    });
  };
  // -------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/addMember", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log(response);
        setMessage("Member Successfully added.");
        setPopmsg(true);
        // alert("Member Successfully added.");
      }
    } catch (error) {
      setMessage("Something Went Wrong!");
      setPopmsg(true);
      // alert("Something Went Wrong!");
      console.log(error);
    }
  };
/*
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
*/

  // handle membership type and Date
const handleEnddate = () => {
  const endDateInput = document.getElementById("enddate");
  const endDateValue = calculateEndDate(
    document.getElementById("joindate").value,
    document.getElementById("pt").value
  ).toString();
  
  endDateInput.value = endDateValue;

  handleForm({
    target: {
      name: "enddate", 
      value: endDateValue,
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

  const handleClosePopBox = () => {
    setPopmsg(false);
    const formData = {
      membershiptype: form.pt,
      startDate: form.joindate,
      endDate: form.enddate,
      feespaid: form.feespaid
    };
    localStorage.setItem("userData", JSON.stringify(form));
    localStorage.setItem("formData", JSON.stringify(formData));
    navigate("/payment");
  }
  // End

  return (
    <>
      {popmsg ? (
        <PopMessage 
          message={message} 
          handleClose={handleClosePopBox} 
          // handleClose={() => setPopmsg(false)} 
        />
      ) : null}
      <div className="add-customer-form">
        <h1 style={{ textAlign: "center" }}>Member Registration Form</h1>
        <br />
        <hr />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="try-input">
              <div className="form-left-side">
                <label>Name : {"  "}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleForm}
                  required
                />
              </div>
              <div className="form-right-side">
                <label>Mobile No. : </label>
                <input
                  type="number"
                  id="mobilenum"
                  name="mobilenum"
                  placeholder="Mobile No."
                  onChange={handleForm}
                  pattern="[0-9]{10}"
                  title="Mobile number must be 10 digits"
                  required
                />
              </div>
            </div>
            <div className="try-input">
              <div className="form-left-side">
                <label>Date of Birth : {"  "}</label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  onChange={handleForm}
                  required
                />
              </div>
              <div className="form-right-side">
                <label>Age : </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Age"
                  min="0"
                  onChange={handleForm}
                  required
                />
              </div>
            </div>

            <div className="try-input">
              <div className="form-left-side">
                <label>Height : {"  "}</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  placeholder="Height"
                  min="0"
                  onChange={handleForm}
                  required
                />
              </div>
              <div className="form-right-side">
                <label>Weight : </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Weight"
                  min="0"
                  onChange={handleForm}
                  required
                />
              </div>
            </div>
            <div className="try-input">
              <div className="form-left-side">
                <label>Address : </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  min="0"
                  onChange={handleForm}
                  required
                />
              </div>
              <div className="form-right-side">
                <label>Membership Type : {"  "}</label>
                <select name="pt" id="pt" onChange={handleForm}>
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
            </div>
            <div className="try-input">
              <div className="form-left-side">
                <label>Join Date : {"  "}</label>
                <input
                  type="date"
                  id="joindate"
                  name="joindate"
                  onChange={handleForm}
                  required
                />
              </div>
              <div className="form-right-side">
                <label>End Date : </label>
                <input
                  type="date"
                  id="enddate"
                  name="enddate"
                  onClick={handleEnddate}
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
            <p>
              <button type="submit" className="save-member">
                Save
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
