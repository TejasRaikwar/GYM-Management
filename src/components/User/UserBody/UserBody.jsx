import React, { useEffect, useState } from "react";
import "./UserBody.css";
import personIcon from "../../../assets/personIcon.png";

const UserBody = () => {
  const id = localStorage.getItem("id");
  const userData = localStorage.getItem("userData");
  const [user, setUser] = useState();
  const data = JSON.parse(userData);

  // Name Element
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getNameElement = () => {
    if (windowWidth <= 768) {
      return <h2>Name : {data.Name}</h2>;
    } else {
      return <h1>Name : {data.Name}</h1>;
    }
  }

  // --- End name element



  return (
    <div className="user-backgroud">
      <div className="one name-box bgcolor">
        <img src={personIcon} alt="person-logo" className="person-icon" />
        <div className="user-name-address" >
          {getNameElement()}
          <h3>{data.Address}</h3>
        </div>
      </div>
      <div className="user-body1">
        <div className="user-data" >
          <p>Personal Details : </p>
          <div className="internal-div">
            <div className="three box">
              <h3>Date of Birth : {new Date(data.DOB).toLocaleDateString()}</h3>
            </div>
            <div className="four box">
              <h3>Age : {data.Age}</h3>
            </div>
            <div className="five box">
              <h3>Height : {data.Height}</h3>
            </div>
            <div className="six box">
              <h3>Weight : {data.Weight}</h3>
            </div>
            <div className="two box">
              <h3>Mobile : {data.Mobile}</h3>
            </div>
          </div>
        </div>
        <div className="other-details">
          <p>Membership Info:</p>
          <div className="internal-div">
            <div className="seven box">
              <h3>Personal Training : {data.PT}</h3>
            </div>
            <div className="nine box">
              <h3>Join Date : {new Date(data.JoinDate).toLocaleDateString()}</h3>
            </div>
            <div className="ten box">
              <h3>End Date : {new Date(data.EndDate).toLocaleDateString()}</h3>
            </div>
            <div className="eleven box">
              <h3>Fees Paid : {data.FeesPaid}</h3>
            </div>
            <div className="twelve box">
              <h3>Fees Balance : {data.FeesBalance}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="fs-section">
        <label htmlFor="userFeedback">Feedback : </label>
      <div className="user-feedback">
        <textarea name="" id="userFeedback" cols="30" rows="10"></textarea>
      </div>
        <label htmlFor="userreview">review : </label>
      <div className="user-review">
        <textarea name="" id="userreview" cols="30" rows="10"></textarea>
      </div>
      </div>
    </div>
  );
};
export default UserBody;
