

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PropertyVisitorsList.css";

const PropertyVisitorsList = ({ match }) => {
  const propertyId = match.params.propertyId;
  const [visitors, setVisitors] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/visit/property-visits/${propertyId}`
        );
        // Assuming the response contains visit details with userId
        const visits = response.data;
        console.log(visits);

        // Fetch the user names for each userId
        const userNamesPromises = visits.map(async (visit) => {
          const userResponse = await axios.get(
            `http://localhost:8080/users/byId/${visit.user}`
          );
          const userData = userResponse.data;
          setUsers(userData);
          // return { name: userData.name, mobileNumber: userData.mobileNumber };
        });

        // Wait for all user name fetches to complete
        const userNames = await Promise.all(userNamesPromises);

        // Combine the user names with visit details
        const visitorsWithNames = visits.map((visit, index) => ({
          ...visit,
          userName: userNames[index],
        }));

        setVisitors(visitorsWithNames);
      } catch (error) {
        console.error("Error fetching visitors:", error);
      }
    };

    fetchVisitors();
  }, [propertyId]);

  const handleAcceptVisit = async (visitId) => {
    try {
      await axios.put(`http://localhost:8080/visit/accept/${visitId}`, {
        status: "ACCEPTED",
      });
      // Update the visitors list after accepting the visit
      setVisitors((prevVisitors) =>
        prevVisitors.map((visitor) =>
          visitor.visitId === visitId
            ? { ...visitor, status: "ACCEPTED" }
            : visitor
        )
      );
    } catch (error) {
      console.error("Error accepting visit:", error);
    }
  };

  const handleRejectVisit = async (visitId) => {
    try {
      await axios.put(`http://localhost:8080/visit/reject/${visitId}`, {
        status: "REJECTED",
      });
      // Update the visitors list after rejecting the visit
      setVisitors((prevVisitors) =>
        prevVisitors.map((visitor) =>
          visitor.visitId === visitId
            ? { ...visitor, status: "REJECTED" }
            : visitor
        )
      );
    } catch (error) {
      console.error("Error rejecting visit:", error);
    }
  };

  return (
    <div className="visitors-container">
      <h3>Visitors List</h3>
      {visitors.length === 0 ? (
        <p>No visit scheduled.</p>
      ) : (
        <ul className="visitors-list">
          {visitors.map((visitor) => (
            <li key={visitor.visitId} className="visitor-item">
              <div className="visitor-details">
                <div>User Name: {users.name}</div>
                <div>Mobile Number: {users.contactNumber}</div>
                <div>Date: {visitor.visitDate}</div>
                <div>Status: {visitor.status}</div>
              </div>
              {visitor.status === "WAITING" && (
                <div className="visitor-buttons">
                  <button onClick={() => handleAcceptVisit(visitor.visitId)}>
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleRejectVisit(visitor.visitId)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyVisitorsList;
