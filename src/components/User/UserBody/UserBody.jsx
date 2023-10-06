import React, { useState } from "react";
import "./UserBody.css";
import { useEffect } from "react";
const UserBody = () => {
  const id = localStorage.getItem("id");
  const [user,setUser] = useState()
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/findMember/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser(); // Call getUser when the component mounts
  }, [id]); 
  return (
    <div className="user-backgroud">
      {user && (<>
        <div className="one name-box"><h2>Name : {user.Name}</h2></div>
      <div className="user-body">
        <div className="two box"><h3>Mobile : {user.Mobile}</h3></div>
        <div className="three box"><h3>Date of Birth : {new Date(user.DOB).toLocaleDateString()}</h3></div>
        <div className="four box"><h3>Age : {user.Age}</h3></div>
        <div className="five box"><h3>Height : {user.Height}</h3></div>
        <div className="six box"><h3>Weight : {user.Weight}</h3></div>
        <div className="seven box"><h3>Personal Training : {user.PT}</h3></div>
        <div className="eight box"><h3>Address : {user.Address}</h3></div>
        <div className="nine box"><h3>Join Date : {new Date(user.JoinDate).toLocaleDateString()}</h3></div>
        <div className="ten box"><h3>End Date : {new Date(user.EndDate).toLocaleDateString()}</h3></div>
        <div className="eleven box"><h3>Fees Paid : {user.FeesPaid}</h3></div>
        <div className="twelve box"><h3>Fees Balance : {user.FeesBalance}</h3></div>
      </div>
      </>
      )}
    </div>
  );
};

export default UserBody;
