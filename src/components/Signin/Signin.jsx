import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const Signin = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    mobile: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { mobile, password } = value;
    try {
      const response = await fetch("http://localhost:8080/searchMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200 && data.success) {
        const { id, Token } = data;
        const decodedToken = JSON.parse(atob(Token.split(".")[1]));
        const userRole = decodedToken.role;
        localStorage.setItem("token", Token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("id", id);
        if (userRole === "admin") {
          navigate("/app");
        } else if (userRole === "member") {
          navigate("/user");
        } else {
          console.error("Invalid user role:", userRole);
          alert("Login failed. Invalid credentials.");
        }
      } else {
        // Handle various error cases
        if (response.status === 401) {
          alert("Token is missing. Please try again.");
        } else {
          alert(data.message || "An error occurred while logging in.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging in.");
    }
  };
  
  return (
    <div className="signinpage">
      <div className="container">
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="input-field">
              <input
                type="number"
                placeholder="Mobile No."
                name="emailip"
                min="0"
                max="9999999999"
                onChange={(e) =>
                  setValue({ ...value, mobile: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                name="passip"
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="subandclosebtn">
            <button
              type="submit"
              id="submitBtn"
              className="submit"
              value="submit"
            >
              Submit
            </button>
            <button onClick={props.toggle}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
