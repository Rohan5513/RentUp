import React, { useState } from "react";
import { useUser } from "../common/UserProvider";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    userEmail: user.userEmail,
      userName: user.userName,
     userProfilePicture: user.userProfilePicture
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${user.userId}`,
        formData
      );
      setUser(response.data); // Update user data in UserProvider
      setEditMode(false); // Exit edit mode
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Email: {user.userEmail}</p>
          <p>Name: {user.userName}</p>
          <p>Profile Picture: {user.userProfilePicture}</p>
          <p>Contact Number: {user.userContactNumber}</p>
          <p>Properties Left: {user.propertiesLeft}</p>
        </div>
      )}
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Cancel" : "Edit"}
      </button>
    </div>
  );
};

export default Profile;
