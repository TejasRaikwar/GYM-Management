import React, { useEffect, useState } from 'react'
import './Notifications.css'
import axios from 'axios';

const Notifications = () => {
  const [members, setMembers] = useState([]);

  // fetch data from backend
  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:8080/getMembersNearToEndDate", {
        method: "GET",
      });
      const data = await response.json();
      setMembers(data);
      console.log(members);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  // function to display notifications
  // Function to display notifications for members whose membership is about to end
  // Function to display notifications for members whose membership is about to end
  const displayNotifications = () => {
    const alreadyNotifiedMembers = {};

    members.forEach(member => {
      const endDate = new Date(member.EndDate);
      const currentDate = new Date();
      const thresholdDate = new Date(currentDate);
      thresholdDate.setDate(thresholdDate.getDate() + 7); // Add 7 days to current date

      // Calculate the start of the current day
      const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

      if (endDate >= currentDate && endDate <= thresholdDate) {
        // Calculate the number of notifications sent for this member today
        const notificationsSentToday = alreadyNotifiedMembers[member._id] || 0;

        // Check if the member hasn't reached the notification limit for today
        if (notificationsSentToday < 3) {
          // Display notification for this member
          const notificationMessage = `${member.Name}'s membership is about to end on ${endDate.toLocaleDateString()}.`;
          // Check if browser supports notifications
          if ('Notification' in window) {
            // Request permission to display notifications
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                // Create and display notification
                new Notification('Membership Expiration', {
                  body: notificationMessage
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
    <div>
      
    </div>
  )
}

export default Notifications