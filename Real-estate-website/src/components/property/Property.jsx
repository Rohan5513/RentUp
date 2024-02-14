import React, { useState } from "react";
import "./propertyManagement.css"; // Import the CSS file for styling
import { citiesData } from "../data/Data";
import { areasData } from "../data/Data";

const PropertyManagement = () => {
  const [flatType, setFlatType] = useState(""); // State for flat type
  const [preferredTenant, setPreferredTenant] = useState(""); // State for preferred tenant
  const [area, setArea] = useState(""); // State for area in square foot
  const [address, setAddress] = useState(""); // State for address
  const [city, setCity] = useState(""); // State for city
  const [areaid, setAreaid] = useState(""); // State for area in the selected city
  const [images, setImages] = useState([]); // State for images

  const handleAddProperty = () => {
    // Validation: Check if all fields are filled except images
    if (flatType && preferredTenant && area && address && city && areaid) {
      const propertyData = {
        flatType,
        preferredTenant,
        area,
        address,
        city,
        areaid,
        images, // Include images in the property data
      };

      // Send the form data to the backend
      fetch("http://your-backend-api-url/addProperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          console.log("Response from backend:", data);
          // You can perform additional actions based on the response from the backend
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch operation
          console.error("Error sending data to the backend:", error);
        });
    } else {
      // Display error message for mandatory fields
      alert("Please fill in all mandatory fields.");
    }
  };

  return (
    <div className="property-management">
      <h2>Add Property</h2>
      <div className="form">
        <label htmlFor="flatType">Flat Type:</label>
        <select
          id="flatType"
          value={flatType}
          onChange={(e) => setFlatType(e.target.value)}
        >
          <option value="">Select Flat Type</option>
          <option value="RK">1RK</option>
          <option value="_1BHK">1BHK</option>
          <option value="_2BHK">2BHK</option>
          <option value="_3BHK">3BHK</option>
          {/* Add more options for different flat types */}
        </select>

        <label htmlFor="preferredTenant">Preferred Tenant:</label>
        <select
          id="preferredTenant"
          value={preferredTenant}
          onChange={(e) => setPreferredTenant(e.target.value)}
        >
          <option value="">Select Preferred Tenant</option>
          <option value="Both">Anyone</option>
          <option value="Family">Family</option>
          <option value="Bachelor">Bachelor</option>
          {/* Add more options for different tenant preferences */}
        </select>

        <label htmlFor="area">Area (in sq. ft.):</label>
        <input
          type="number"
          id="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="city">City:</label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>
          {citiesData.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <label htmlFor="areaid">Area in City:</label>
        <select
          id="areaid"
          value={areaid}
          onChange={(e) => setAreaid(e.target.value)}
        >
          <option value="">Select Area in City</option>
          {areasData[city]?.map((area) => (
            <option key={area.id} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>

        {/* Logic to upload and display images */}
        <label htmlFor="images">Upload Images:</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <button onClick={handleAddProperty}>Add Property</button>
      </div>
    </div>
  );
};

export default PropertyManagement;
