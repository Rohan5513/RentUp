import React, { useState } from "react";
import "./PropertyCard.css";
import { useUser } from "../common/UserProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";

const PropertyCard = ({ property }) => {
  // console.log(property.userId.userId);
  const { user } = useUser();
  const [propertiesLeft, setPropertiesLeft] = useState(0);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const history = useHistory();

 

  const handleClick = async () => {
    if (user === null) {
      history.push("/login");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="property-card-container">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* User details */}
            <h2>User Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Close button */}
            <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <div className={`property-card ${showModal ? "blurred" : ""}`}>
        <div className="property-images">
          <img className="property-image" src="" alt="Property Image" />
        </div>
        <div className="property-details">
          <div>
            <h3 className="property-title">{property.address}</h3>
            <p className="property-info">
              City: {property.areaId.city.cityName}
            </p>
            <p className="property-info">Area: {property.areaId.areaName}</p>
            <p className="property-info">
              Carpet Area: {property.carpetArea} sq. ft.
            </p>
            <p className="property-info">
              Tenant Type: {property.tenantType}
            </p>
            <p className="property-info">Flat Type: {property.flatType}</p>
            <p className="property-info">Price: {property.price}</p>
          </div>
          <div>
            <button onClick={handleClick} className="schedule-visit">
              Schedule visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyCard;