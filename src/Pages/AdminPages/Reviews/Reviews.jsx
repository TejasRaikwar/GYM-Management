import React, { useEffect, useState } from 'react'
import './Reviews.css'
import DeleteIcon from "@mui/icons-material/Delete";
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

  // Delete Review
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [seen, setSeen] = useState(false);
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/deleteReview/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setDeleteItemId(null)
      getReviews();
    }
  };
  function handleDeletePop() {
    handleDelete(deleteItemId)
    setSeen(false);
  }
  return (
    <>
      {seen ? (
        <div className="confirm-delete">
          <h1>Are you sure?</h1>
          <br />
          <br />
          <button className="orange-button" onClick={handleDeletePop}>Yes</button>
          <button className="orange-button" onClick={() => setSeen(false)}>No</button>
        </div>
      ) : null}
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
            {reviews.map((key, index) => (
              <tbody>
                <tr>
                  <td>{index + 1}</td>
                  <td>{reviews[index].Name}</td>
                  <td>{reviews[index].Review}</td>
                  <td><DeleteIcon onClick={() => {
                    setSeen(true);
                    setDeleteItemId(key._id);
                  }} style={{cursor:"pointer"}}/></td>
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