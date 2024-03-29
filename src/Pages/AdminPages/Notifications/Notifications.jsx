import React, { useEffect, useState } from "react";
import "./Notifications.css";

const Notifications = () => {
  const [members, setMembers] = useState([]);
  // fetch data from backend
  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/getMembersNearToEndDate",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setMembers(data);
      console.log(members);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  // function to display notifications
  const displayNotifications = () => {
    const alreadyNotifiedMembers = {};

    members.forEach((member) => {
      const endDate = new Date(member.EndDate);
      const currentDate = new Date();
      const thresholdDate = new Date(currentDate);
      thresholdDate.setDate(thresholdDate.getDate() + 7); // Add 7 days to current date

      // Calculate the start of the current day
      const startOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      if (endDate >= currentDate && endDate <= thresholdDate) {
        // Calculate the number of notifications sent for this member today
        const notificationsSentToday = alreadyNotifiedMembers[member._id] || 0;

        // Check if the member hasn't reached the notification limit for today
        if (notificationsSentToday < 3) {
          // Display notification for this member
          const notificationMessage = `${
            member.Name
          }'s membership is about to end on ${endDate.toLocaleDateString()}.`;
          // Check if browser supports notifications
          if ("Notification" in window) {
            // Request permission to display notifications
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                // Create and display notification
                new Notification("Membership Expiration", {
                  body: notificationMessage,
                });
              }
            });
          } else {
            // Fallback for browsers that do not support notifications
            alert(notificationMessage);
          }

          // Increment the count of notifications sent for this member today
          alreadyNotifiedMembers[member._id] = notificationsSentToday + 1;
        }
      }
    });
  };
  // Call displayNotifications function when the component renders

  useEffect(() => {
    displayNotifications();
  }, [members]);

  // End of Functions

  return (
    <div className="membership-at-end">
      <div
        style={{
          width: "95%",
          textAlign: "right",
          marginBottom: "3px",
          marginTop: "0.8rem",
          fontSize: "1rem",
        }}
      >
        <i style={{ color: "white" }}>
          <b>Note: </b>In Mem. type, "M" is used for "Month", "H" for
          "Hardcore", "P" for "PT", & "C" for "Cardio"
        </i>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Name</th>
            <th>Mem. type</th>
            <th>End Date</th>
          </tr>
        </thead>
        {members[0] ? (
            members.map((key,index) => (
              <tbody>
                <tr>
                  <td>{index+1}</td>
                  <td>{key.Name}</td>
                  <td>{key.PT}</td>
                  <td>{new Date(key.EndDate).toLocaleDateString()}</td>
                </tr>
              </tbody>
            ))
        ) : (
          <td colSpan="4">
            <p style={{ margin: "2rem", padding: "1rem" }}>
              There are no members whose membership is about to end 
            </p>
          </td>
        )}
      </table>
    </div>
  );
};

export default Notifications;
