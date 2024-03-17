import React from 'react'
import './NewJoin.css'
import { useState, useEffect } from 'react';

const NewJoin = () => {

  // getUsers    -- show members
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/getMembers", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  // Filter Data : 
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    // Calculate the current date and seven days ago
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    // Filter the data to include objects with join dates in the specified range
    const filtered = users.filter(item => {
      const joinDate = new Date(item.JoinDate);
      return joinDate >= sevenDaysAgo || joinDate > currentDate;
    });

    setFilteredData(filtered);
  }, [users]);

  return (
    <div className="new-joined">
      {/* <h2 style={{ textAlign: "center", marginTop: "10px" }
      }> Members Joined within 7 days</h2 ><br /> */}
      <div className="table" style={{ marginLeft: "1.6rem",marginTop:"1rem" }}>
        <div style={{ width: "95%", textAlign: "right", marginBottom: "3px", fontSize: "1rem" }}>
          <i style={{ color: "white" }}><b>Note: </b>In Mem. type, "M" is used for "Month", "H" for "Hardcore", "P" for "PT", & "C" for "Cardio"</i></div>
        <table>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Name</th>
              <th>Mem. type</th>
              <th>Join Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          {
            users[0] ? (
              filteredData.map((key, index) => (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{key.Name}</td>
                    <td>{key.PT}</td>
                    <td>{new Date(key.JoinDate).toLocaleDateString()}</td>
                    <td>{new Date(key.EndDate).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              ))) : (
              <td colSpan="7">
                <p style={{ margin: "2rem", padding: "1rem" }}>
                  No recent Members
                </p>
              </td>
            )}
        </table>
      </div>
    </div >

  )
}

export default NewJoin