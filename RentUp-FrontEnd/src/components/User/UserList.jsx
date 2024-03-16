import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import { serverUrl } from '../data/Data';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${serverUrl}/users/all`);
        setUsers(response.data); // Assuming the response is an array of user objects
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>User List</h2>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
