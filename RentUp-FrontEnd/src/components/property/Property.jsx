import React, { useEffect, useState } from "react";
import "./propertyManagement.css";
import { getCities, getAreas } from "../data/Data";
import { useUser } from "../common/UserProvider";

const PropertyManagement = () => {
  const [flatType, setFlatType] = useState("");
  const [preferredTenant, setPreferredTenant] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [areaId, setAreaId] = useState("");
  const [images, setImages] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [areasData, setAreasData] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await getCities();
        setCitiesData(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = async (selectedCity) => {
    setCity(selectedCity);

    if (selectedCity) {
      try {
        const areas = await getAreas(selectedCity);
        setAreasData(areas);
        console.log('area data from line 36 in property.js' + areasData);
      } catch (error) {
        console.error("Error fetching areas:", error);
        // Handle error as needed
      }
    } else {
      setAreasData([]);
    }
  };

  const handleAddProperty = () => {
    if (flatType && preferredTenant && area && address && city && areaId && user?.userId) {
      const propertyData = {
        flatType,
        preferredTenant,
        area,
        address,
        city,
        areaId,
        images,
        userId: user.userId,
      };

      fetch("http://localhost:8080/properties/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from backend:", data);
          // Optionally, you can perform additional actions based on the response
        })
        .catch((error) => {
          console.error("Error sending data to the backend:", error);
        });
    } else {
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
        </select>

        <label htmlFor="preferredTenant">Preferred Tenant:</label>
        <select
          id="preferredTenant"
          value={preferredTenant}
          onChange={(e) => setPreferredTenant(e.target.value)}
        >
          <option value="">Select Preferred Tenant</option>
          <option value="BOTH">Anyone</option>
          <option value="FAMILY">Family</option>
          <option value="BACHELOR">Bachelor</option>
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
        <select id="city" value={city} onChange={(e) => handleCityChange(e.target.value)}>
          <option value="">Select City</option>
          {citiesData.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label htmlFor="areaId">Area in City:</label>
        <select id="areaId" value={areaId} onChange={(e) => setAreaId(e.target.value)}>
          <option value="">Select Area in City</option>
          {areasData.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

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
