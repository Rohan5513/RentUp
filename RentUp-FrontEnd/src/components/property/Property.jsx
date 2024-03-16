import React, { useEffect, useState } from "react";
import "./propertyManagement.css";
import { getCities, getAreas, serverUrl } from "../data/Data";
import { useUser } from "../common/UserProvider";
import { getAllProperties } from "../data/Data";
import axios from "axios";

const PropertyManagement = () => {
  const [flatType, setFlatType] = useState("");
  const [preferredTenant, setPreferredTenant] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [areaId, setAreaId] = useState("");
  const [price, setPrice] = useState(""); // State for price input
  const [image, setImage] = useState(null);
  const [citiesData, setCitiesData] = useState([]);
  const [areasData, setAreasData] = useState([]);
  const [message, setMessage] = useState(""); // State for displaying messages
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
      } catch (error) {
        console.error("Error fetching areas:", error);
        // Handle error as needed
      }
    } else {
      setAreasData([]);
    }
  };

  const handleAddProperty = async () => {
    if (
      flatType &&
      preferredTenant &&
      area &&
      address &&
      city &&
      areaId &&
      price && 
      user?.userId
    ) {
      try {
        const properties = await getAllProperties();
        const matchingProperty = properties.find(
          (property) =>
            property.areaId.city.cityName === city &&
            property.areaId.areaName === areaId &&
            property.address === address &&
            property.flatType === flatType
        );

        if (matchingProperty) {
          setMessage("This property already exists.");
        } else {

          const formObj = new FormData();
          formObj.append('flatType',flatType);
          formObj.append('preferredTenant',preferredTenant);
          formObj.append('area',area);
          formObj.append('address',address);
          formObj.append('areaId',areaId);
          formObj.append('price',price);
          formObj.append('userId',user.userId);
          formObj.append('propertyPhoto',image[0]);

          const addResponse = await axios.post(
            `${serverUrl}/properties/add`,
            formObj,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
            }

          );
            console.log(addResponse);
          if (addResponse.status === 200) {
            setMessage("Property added successfully.");
          } else {
            setMessage("Failed to add property.");
          }
        }
      } catch (error) {
        console.error("Error adding property:", error);
        setMessage("Error adding property. Please try again.");
      }
    } else {
      setMessage("Please fill in all mandatory fields.");
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
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="city">City:</label>
        <select
          id="city"
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
        >
          <option value="">Select City</option>
          {citiesData.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <label htmlFor="areaId">Area in City:</label>
        <select
          id="areaId"
          value={areaId}
          onChange={(e) => setAreaId(e.target.value)}
        >
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
          required
          onChange={(e) => setImage(e.target.files)}
        />
        <button onClick={handleAddProperty}>Add Property</button>
        <p className="message">{message}</p>{" "}
        {/* Display message below button */}
      </div>
    </div>
  );
};

export default PropertyManagement;
