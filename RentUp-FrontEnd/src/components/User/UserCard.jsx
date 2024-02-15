import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.profile_picture ? (
          <img src={`data:image/jpeg;base64,${user.profile_picture}`} alt="Profile" />
        ) : (
          <div className="default-avatar">No Image</div>
        )}
      </div>
      <div className="user-details">
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Contact Number: {user.contact_number}</p>
        <p>Properties Left: {user.properties_left}</p>
      </div>
    </div>
  );
};

export default UserCard;
