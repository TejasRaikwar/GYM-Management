import {React,useState} from "react";
import "./AddCustomer.css";
import axios from "axios";
import PopMessage from "../../../components/PopMessage/PopMessage";
axios.defaults.baseURl = "http://localhost:8080/"

const AddCustomer= () => {
  const [message, setMessage] = useState("");
  const [popmsg, setPopmsg] = useState(false);
  const [form,setForm] = useState({})
    const handleForm = (e) => {
      const input = e.target;
      const name = input.name;
      const value = input.value;
    
      if (name === 'mobilenum') {
        if (value.length !== 10 || value < 0 || value > 9999999999) {
          input.setCustomValidity('Please enter a valid 10-digit mobile number.');
        } else {
          input.setCustomValidity('');
        }
      }
    
      setForm({
        ...form,
        [name]: value
      });
    };
    // -------------
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        const response = await fetch('http://localhost:8080/addMember',{
        method:'POST',
        body:JSON.stringify(form),
        headers:{
          'Content-Type':"application/json",
        }
      })
      if(response.status === 200){
        console.log(response);
        setMessage("Member Successfully added.");
        setPopmsg(true);
        // alert("Member Successfully added.");
    }
    }
    catch(error){
      setMessage("Something Went Wrong!");
      setPopmsg(true);
      // alert("Something Went Wrong!");
      console.log(error)
    }
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
  return (<>
    {popmsg ? (
      <PopMessage 
      message={message}
      handleClose={() => setPopmsg(false)}
      />) : null}
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
                c
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
