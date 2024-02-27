
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../common/UserProvider"; // Import useUser hook from context
import "./ListedProperty.css"

const ListedProperty = () => {
  const { user } = useUser(); // Get user from context
  const [properties, setProperties] = useState([]);
  const [rentedProperties, setRentedProperties] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/properties/users/${user.userId}`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties listed by user:", error);
      }
    };

    fetchProperties();
  }, [user]);

  const handleRentedOut = async (propertyId) => {
    try {
      await axios.put(`http://localhost:8080/properties/${propertyId}`, {
        status: "Rented Out",
      });
      setRentedProperties([...rentedProperties, propertyId]);
      setMessage("");
      alert("Congratulations! Property rented out.");
    } catch (error) {
      console.error("Error updating property status:", error);
    }
  };

  const isPropertyAvailable = (propertyId) => {
    return properties.find(property => property.propertyId === propertyId && property.status === "AVAILABLE");
  }

  return (
    <div className="listed-properties-container">
      <h2>Properties</h2>
      {properties.length === 0 ? (
        <p className="property-msg">No properties listed.</p>
      ) : (
        properties.map((property) => (
          <div key={property.propertyId} className="property-card">
            <p>Address: {property.address}</p>
            <p>City: {property.areaId.city.cityName}</p>
            <p>Area: {property.areaId.areaName}</p>
            <p>Flat Type: {property.flatType}</p>
            <p>Carpet Area: {property.carpetArea}</p>
            <p>Tenant Type: {property.tenantType}</p>
            <p>Price: {property.price}</p>
            {isPropertyAvailable(property.propertyId) && !rentedProperties.includes(property.propertyId) && (
              <button onClick={() => handleRentedOut(property.propertyId)}>
                Mark as Rented Out
              </button>
            )}
          </div>
        ))
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ListedProperty;
