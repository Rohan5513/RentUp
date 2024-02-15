// Profile.jsx
import React, { useState , useEffect } from "react";
import { useUser } from "../common/UserProvider";
import axios from "axios";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    userEmail: user.userEmail,
    userName: user.userName,
    userProfilePicture: user.userProfilePicture,
  });
  const [editMode, setEditMode] = useState(false);

  const [userProfilePictureRender, setUserProfilePicture] = useState(null);

  useEffect(() => {
    if (user && user.userProfilePicture) {
      const byteArray = new Uint8Array(user.userProfilePicture); // Assuming user.userProfilePicture is the byte array
    console.log(user.userProfilePicture);
      const base64String = btoa(
        Array.from(byteArray)
          .map((byte) => String.fromCharCode(byte))
          .join("")
      );
      setUserProfilePicture(`data:image/jpeg;base64,${base64String}`);
      console.log('String is '+base64String);
    }
  }, [user,userProfilePictureRender]);
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
        <div className="profile-info">
          <p>Email: {user.userEmail}</p>
            <p>Name: {user.userName}</p>
            {/* <p>Is Admin:{user.isAdmin}</p> */}
          <p>Profile Picture:
          {userProfilePictureRender && (
        <img src={userProfilePictureRender} alt="ProfilePicture" />
      )}
      </p>
          <p>Contact Number: {user.userContactNumber}</p>
          <p>Properties Left: {user.propertiesLeft}</p>
          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
