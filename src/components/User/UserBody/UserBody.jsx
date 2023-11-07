import React, { useState } from "react";
import "./UserBody.css";
const UserBody = () => {
  const id = localStorage.getItem("id");
  const userData = localStorage.getItem("userData")
  const [user,setUser] = useState();
  const data = JSON.parse(userData); 
  return (
    <div className="user-backgroud">
        <div className="one name-box"><h2>Name : {data.Name}</h2></div>
      <div className="user-body">
        <div className="two box"><h3>Mobile : {data.Mobile}</h3></div>
        <div className="three box"><h3>Date of Birth : {new Date(data.DOB).toLocaleDateString()}</h3></div>
        <div className="four box"><h3>Age : {data.Age}</h3></div>
        <div className="five box"><h3>Height : {data.Height}</h3></div>
        <div className="six box"><h3>Weight : {data.Weight}</h3></div>
        <div className="seven box"><h3>Personal Training : {data.PT}</h3></div>
        <div className="eight box"><h3>Address : {data.Address}</h3></div>
        <div className="nine box"><h3>Join Date : {new Date(data.JoinDate).toLocaleDateString()}</h3></div>
        <div className="ten box"><h3>End Date : {new Date(data.EndDate).toLocaleDateString()}</h3></div>
        <div className="eleven box"><h3>Fees Paid : {data.FeesPaid}</h3></div>
        <div className="twelve box"><h3>Fees Balance : {data.FeesBalance}</h3></div>
      </div>
    </div>
  );
};
export default UserBody;
