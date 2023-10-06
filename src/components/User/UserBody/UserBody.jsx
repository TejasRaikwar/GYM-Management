import React from "react";
import "./UserBody.css";
const UserBody = () => {
  const id = localStorage.getItem("id");
  // console.log(id)
  return (
    <div className="user-backgroud">
      <div className="user-body">
        <div class="one box">One</div>
        <div class="two box">Two</div>
        <div class="three box">Three</div>
        <div class="four box">Four</div>
        <div class="five box">Five</div>
        <div class="six box">Six</div>
      </div>
    </div>
  );
};

export default UserBody;
