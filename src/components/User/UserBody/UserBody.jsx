import React, { useEffect, useState,useRef } from "react";
import "./UserBody.css";
import personIcon from "../../../assets/personIcon.png";

const UserBody = () => {
  const id = localStorage.getItem("id");
  const userData = localStorage.getItem("userData");
  const [user, setUser] = useState();
  const data = JSON.parse(userData);

  // Name Element ---- calculate window width
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




  // -----------------  handlings  ----------------
  const handleReviewSubmit = async () => {
    try {
      const userReview = document.getElementById("userReview").value;

      if (!userReview) {
        alert("Please provide a review before submitting.");
        return;
      }
      const response = await fetch("http://localhost:8080/saveReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: data.Name,
          Review: userReview,
        }),
      });

      if (response.status === 200) {
        alert("Review saved successfully.");
      }
      else {
        alert("Failed to saved review, Please try again.");
      }
    } catch (error) {
      console.error("Error saving review:", error);
      alert("An error occurred while saving the review.");
    }
  }
  
// ----------------- Feedback ----------------
  const handleFeedbackSubmit = async() =>{
    try{
      const userFeedback = document.getElementById("userFeedback").value;
      if (!userFeedback) {
        alert("Please provide a Feedback before submitting.");
        return;
      }
      const response = await fetch("http://localhost:8080/saveFeedback",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name : data.Name,
          Feedback: userFeedback,
        }),
      });

      if(response.status === 200){
        alert(" Feedback submitted successfully.");
      }
      else{
        alert("Failed to saved feedback, please try again.");
      }

    }
    catch(error){
      console.log("Error saving feedback:",error);
      alert("An error occured while saving the feedback")
    }
  }
  return (
    <div className="user-backgroud">
      <div className="one name-box bgcolor">
        <img src={personIcon} alt="person-logo" className="person-icon" />
        <div className="user-name-address" >
          {getNameElement()}
          <h3>Address: {data.Address}</h3>
        </div>
      </div>
      <div className="user-body1">
        <div className="user-data ">
          <p>Personal Details: </p>
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
      <div className="user-body2">
        <div className="review-sec" >
          <p>Review: </p>
          <div className="rs-internal-div">
            <input
              type="text"
              name="userReview"
              id="userReview"
              placeholder="Give your Review here"
            />
            <button 
              style={{marginLeft:"5px"}} 
              className="user-submit-btn"
              onClick={handleReviewSubmit}
            >
              submit 
            </button>
          </div>
        </div>
        <div className="feedback-sec">
          <p>Suggestion:</p>
          <div className="rs-internal-div">
            <input type="text"
              name="userFeedback"
              id="userFeedback"
              placeholder="Give your suggestion here"
            />
            <button
              style={{ marginLeft: "5px" }}
              className="user-submit-btn"
              onClick={handleFeedbackSubmit}
            >
              submit 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBody;
