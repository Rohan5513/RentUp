// Profile.jsx
import React, { useState, useEffect } from "react";
import { useUser } from "../common/UserProvider";
import axios from "axios";
import "./Profile.css"; 

const Profile = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    userEmail: user.email,
    userName: user.name,
    userProfilePicture: user.userProfilePicture,
  });
  const [editMode, setEditMode] = useState(false);

  const [userProfilePictureRender, setUserProfilePicture] = useState(null);
  console.log(user.user);


  useEffect(() => {
    if (user!==null) {
      setUserProfilePicture(JSON.parse(localStorage.getItem('profilePicture')));
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${user.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      setUser(response.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Profile Picture:</label>
            {userProfilePictureRender && (
              <img src={userProfilePictureRender} alt="ProfilePicture" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userProfilePicture: e.target.files[0],
                })
              }
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-pic-container">
        <div className="profile-info">
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          {/* <p>Is Admin:{user.isAdmin}</p> */}
          <p>Contact Number: {user.contactNumber}</p>
          {user.subscriptionType != null ?
            <div>
              <p>Subscription Plan: {user.subscriptionType}</p>
              <p>Subscription End Date: {user.subscriptionEndDate}</p>
            </div>
            : ""}
          <p>Properties Left: {user.propertiesLeft>2000000? 'Unlimited' : user.propertiesLeft}</p>
          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit
          </button>
        </div>
        <div>
        <p>
            {userProfilePictureRender && (
              <img src={userProfilePictureRender} alt="ProfilePicture" />
            )}
          </p>
        </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
