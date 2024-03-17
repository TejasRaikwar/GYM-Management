import { React, useState, useEffect } from "react";
import "./TotalCustomers.css";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateForm from "../UpdateForm/UpdateForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PopMessage from "../../../components/PopMessage/PopMessage";

const TotalCustomers = () => {
  const [editSection, setEditSection] = useState(false);
  const [message, setMessage] = useState("");
  const [popmsg, setPopmsg] = useState(false);
  // Confirm-Delete
  const [seen, setSeen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // getUsers    -- show members
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/getMembers", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
    setFilteredUsers(data); // Set filteredUsers initially to all users
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Delete Entry
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/deleteMember/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setDeleteItemId(null);
      getUsers();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/updateMember/${formData._id}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Data Updated");
        setPopmsg(true);
        setEditSection(false);
        getUsers();
        console.log(formData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // HandleEditForm
  const [formData, setFormData] = useState({});
  const handleEditForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (users) => {
    setEditSection(true);
    setFormData(users);
  };

  // handle delete pop
  function handleDeletePop() {
    handleDelete(deleteItemId);
    setSeen(false);
  }

  // Search box
  const searchBoxFun = () => {
    const searchText = document
      .getElementsByName("searchMember")[0]
      .value.toLowerCase();
    if (searchText.trim() === "") {
      setFilteredUsers(users); // Reset to all users if search is empty
    } else {
      const filtered = users.filter((user) =>
        user.Name.toLowerCase().includes(searchText)
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <>
      {popmsg ? (
        <PopMessage message={message} handleClose={() => setPopmsg(false)} />
      ) : null}

      {/* Edit Section */}
      {editSection && (
        <UpdateForm
          handleSubmit={handleUpdate}
          handleForm={handleEditForm}
          handleClose={() => setEditSection(false)}
          rest={formData}
        />
      )}
      {/* Confirm Delete */}
      {seen ? (
        <div className="confirm-delete">
          <h1>Are you sure?</h1>
          <br />
          <br />
          <button className="orange-button" onClick={handleDeletePop}>
            Yes
          </button>
          <button className="orange-button" onClick={() => setSeen(false)}>
            No
          </button>
        </div>
      ) : null}
      <div className="total-customer-table">
        <div className="table">
          <div
            style={{
              width: "95%",
              textAlign: "right",
              marginBottom: "3px",
              fontSize: "1rem",
            }}
          >
            <i style={{ color: "white" }}>
              <b>Note: </b>
              In Mem. type, "M" is used for "Month", "H" for "Hardcore", "P" for
              "PT", & "C" for "Cardio"
            </i>
          </div>
          <div className="searchBox">
            <label className="search-box-label">Search : </label>
            <input
              type="search"
              name="searchMember"
              id="searchMember"
              placeholder="Search here"
              onChange={searchBoxFun}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Mem. type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Paid</th>
                <th>Balance</th>
                <th style={{ width: "8rem" }}>Action</th>
              </tr>
            </thead>
            {filteredUsers[0] ? (
              filteredUsers.map((key, index) => (
                <tbody>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{key.Name}</td>
                    <td>{key.Mobile}</td>
                    <td>{key.PT}</td>
                    <td>{new Date(key.JoinDate).toLocaleDateString()}</td>
                    <td>{new Date(key.EndDate).toLocaleDateString()}</td>
                    <td>{key.FeesPaid}</td>
                    <td>{key.FeesBalance}</td>
                    <td>
                      <div className="icon-holder">
                        {/* <UploadIcon /> */}
                        <VisibilityIcon
                          onClick={() => {
                            handleEdit(key);
                          }}
                        />
                        <DeleteIcon
                          onClick={() => {
                            setSeen(true);
                            setDeleteItemId(key._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <td colSpan="9">
                <p style={{ margin: "2rem", padding: "1rem" }}>
                  There are no members, please add  a new member!
                </p>
              </td>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default TotalCustomers;
