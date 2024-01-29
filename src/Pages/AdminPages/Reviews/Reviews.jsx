import React, { useEffect, useState } from 'react'
import './Reviews.css'
const Reviews = () => {
  //get Reviews
  const [reviews, setReviews] = useState([]);
  const getReviews = async () => {
    const response = await fetch("http://localhost:8080/getReviews", {
      method: "GET",
    });
    const data = await response.json();
    setReviews(data);
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <>
      {reviews[0] ?
        <div className="review-container">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Review</th>
                <th>action</th>
              </tr>
            </thead>
            {reviews.map((key,index)=>(
              <tbody>
                <tr>
                  <td>{index+1}</td>
                  <td>{reviews[index].Name}</td>
                  <td>{reviews[index].Review}</td>
                  <td>-</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        :
        <div>
          <h2>No reviews present.</h2>
        </div>
      }
    </>
  )
}

export default Reviews