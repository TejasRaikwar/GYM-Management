import React from "react";
import "./BillForm.css";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BillForm = () => {
  const [seen, setSeen] = useState(true);
  const [userData, setUserData] = useState({});

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

  // Find Member:
  const [mobile, setMobile] = useState("");
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
        setUserData(userData1)
        console.log(userData.Name);
        setSeen(false)
      } else {
        console.error("Error fetching user data:", response.statusText);
        writeError();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //
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

  return (
    <>
      {seen ? (
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
          <span id="phoneError" className="text-danger" style={{ color: "red" }} />
        </div>
      ) : (
        <>
          <div className="second-input-box">
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="try-input">
                  <div className="form-left-side">
                    <label>Start Date : {"  "}</label>
                    {console.log(userData.JoinDate)}
                    <input
                      type="date"
                      id="joindate"
                      name="JoinDate"
                      defaultValue={userData.JoinDate}
                      onChange={handleForm}
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
                    <label>Personal Training : {"  "}</label>
                    <select name="pt" id="pt" onChange={handleForm}>
                      <option value="" disabled selected>
                        Select an option
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="form-right-side">
                    <label>Personal Training : {"  "}</label>
                    <select name="pt" id="pt" onChange={handleForm}>
                      <option value="" disabled selected>
                        Select an option
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
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
        </>
      )}
    </>
  );
};

export default BillForm;
