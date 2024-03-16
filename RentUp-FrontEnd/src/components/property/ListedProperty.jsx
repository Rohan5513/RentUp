import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useUser } from "../common/UserProvider";
import "./ListedProperty.css";
import { serverUrl } from "../data/Data";

const ListedProperty = () => {
  const { user } = useUser();
  const [properties, setProperties] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const [rentedProperties, setRentedProperties] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/properties/users/${user.userId}`
        );
        setProperties(response.data);

        const imagePromises = response.data.map(async (property) => {
          try {
            const response1 = await axios.get(
              `${serverUrl}/properties/image/${property.propertyId}`,
              {
                responseType: "arraybuffer",
              }
            );
            const base64Image = btoa(
              new Uint8Array(response1.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            return {
              propertyId: property.propertyId,
              image: `data:${response1.headers["content-type"]};base64,${base64Image}`,
            };
          } catch (error) {
            console.log(error);
            return { propertyId: property.propertyId, image: null };
          }
        });

        const images = await Promise.all(imagePromises);
        setPropertyImages(images);
      } catch (error) {
        console.error("Error fetching properties listed by user:", error);
      }
    };

    fetchProperties();
  }, [user]);

  const handleRentedOut = async (propertyId) => {
    try {
      await axios.put(`${serverUrl}/properties/${propertyId}`, {
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
    return (
      properties.find(
        (property) =>
          property.propertyId === propertyId && property.status === "AVAILABLE"
      ) && !rentedProperties.includes(propertyId)
    );
  };

  return (
    <div className="listed-properties-container">
      <h2>Properties</h2>
      {properties.length === 0 ? (
        <p>No properties listed.</p>
      ) : (
        properties.map((property) => (
          <div key={property.propertyId} className="property-card-listed">
            <div className="property-details-listed">
              <div className="details-listed">
                <p>Address: {property.address}</p>
                <p>City: {property.areaId.city.cityName}</p>
                <p>Area: {property.areaId.areaName}</p>
                <p>Flat Type: {property.flatType}</p>
                <p>Carpet Area: {property.carpetArea}</p>
                <p>Tenant Type: {property.tenantType}</p>
                <p>Price: {property.price}</p>
              </div>
              <div className="buttons-listed">
                {isPropertyAvailable(property.propertyId) && (
                  <button onClick={() => handleRentedOut(property.propertyId)}>
                    Mark as Rented Out
                  </button>
                )}
                {isPropertyAvailable(property.propertyId) && (
                  <Link
                    to={`/PropertyVisitorsList/${property.propertyId}`}
                    className="show-visitors-link-listed"
                  >
                    Show Visitors List
                  </Link>
                )}
              </div>
            </div>
            <div className="property-image-container-listed">
              {propertyImages.find(
                (img) => img.propertyId === property.propertyId
              ) && (
                <img
                  src={
                    propertyImages.find(
                      (img) => img.propertyId === property.propertyId
                    )?.image
                  }
                  alt={`Property ${property.propertyId}`}
                  className="property-image-listed"
                />
              )}
            </div>
          </div>
        ))
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ListedProperty;
