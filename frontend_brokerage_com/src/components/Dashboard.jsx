// Dashboard.js

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties from the backend after login
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:8080/properties', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization token if needed
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error('Failed to fetch properties');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Properties for Rent</h2>
      <div className="row">
        {properties.map(property => (
          <div className="col-md-4" key={property.id}>
            {/* Display property details */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">{property.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
