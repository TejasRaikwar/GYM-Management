import React, { useEffect, useState } from 'react'
import './Suggestions.css'
import DeleteIcon from "@mui/icons-material/Delete";

const Suggestoins = () => {
  // Get suggestions from backend
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async () => {
    const response = await fetch("http://localhost:8080/getFeedbacks", {
      method: "GET",
    });
    const data = await response.json();
    setSuggestions(data);
  };

  useEffect(() => {
    getSuggestions();
  }, []);
  // Delete Review
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [seen, setSeen] = useState(false);
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/deleteFeedback/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setDeleteItemId(null)
      getSuggestions();
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
      {suggestions[0] ? <div className='suggestion-container'>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Suggestion</th>
              <th>action</th>
            </tr>
          </thead>
          {suggestions.map((key, index) => (
            <tbody>
              <tr>
                <td>{index + 1}</td>
                <td>{suggestions[index].Name}</td>
                <td>{suggestions[index].Feedback}</td>
                <td><DeleteIcon onClick={() => {
                  setSeen(true);
                  setDeleteItemId(key._id);
                }} style={{cursor:"pointer"}}/></td>
              </tr>
            </tbody>
          ))}
        </table>

      </div>
        : <h2>No Suggestions available.</h2>

      }
    </>
  )
}

export default Suggestoins