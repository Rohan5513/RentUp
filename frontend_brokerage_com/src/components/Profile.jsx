// Profile.js

import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile details from the backend after login
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization token if needed
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Profile</h2>
      <div>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Contact Number:</strong> {profile.contact_number}</p>
        {/* Display other profile details as needed */}
      </div>
    </div>
  );
};

export default Profile;
