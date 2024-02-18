import React, { useState, useEffect } from "react";
import "./PropertyCard.css";
import { useUser } from "../common/UserProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";

const PropertyCard = ({ property }) => {
  const { user } = useUser();
  const [propertiesLeft, setPropertiesLeft] = useState(10);
  const [canView, setCanView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (user !== null) {
      setPropertiesLeft(user.propertiesLeft);
    }
  }, [user]);

  useEffect(() => {
    const scheduleVisit = async () => {
      if (user !== null && property !== null) {
        try {
          const response = await axios.post(`http://localhost:8080/visit/schedule/${1234567890}`, property);
          // if (response.data === true) {
          //   console.log(property.address)
          // }
          setIsScheduled(response.data);
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }
    };

    scheduleVisit(); // Call the async function
  }, [user, property]);

  useEffect(() => {
    if (propertiesLeft < 1) {
      setCanView(false);
    } else {
      setCanView(true);
    }
  }, [propertiesLeft]);

  const handleClick = async () => {
    if (user === null) {
      history.push("/login");
    } else {
      setShowModal(true);
    }
  };

  const handleVisitClick = () =>{
    setShowModal(true);
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const visitReq = {
      user: user,
      property: property,
      visitDate: selectedDate
    }

    const response = await axios.post('http://localhost:8080/visit/schedule', visitReq);
    setShowModal(false);
  };

  return (
    <div className="property-card-container">
      {showModal && (
  <div className="modal">
    <div className="modal-content">
      {
        isScheduled ? 
        <div>
        <h2>User Details</h2>
      <p>Name: {property.userId.name}</p>
      <p>Email: {property.userId.email}</p>
      <p>Mobile Number: {property.userId.contactNumber}</p>
        </div>
      : ""
      }
      {isScheduled ? (
        <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="visit-date">Select Visit Date:</label>
          <input
            type="date"
            id="visit-date"
            name="visit-date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button type="submit">Schedule visit</button>
          <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
        </form>
      )}
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
            <p className="property-info">City: {property.areaId.city.cityName}</p>
            <p className="property-info">Area: {property.areaId.areaName}</p>
            <p className="property-info">Carpet Area: {property.carpetArea} sq. ft.</p>
            <p className="property-info">Tenant Type: {property.tenantType}</p>
            <p className="property-info">Flat Type: {property.flatType}</p>
            <p className="property-info">Price: {property.price}</p>
          </div>
          <div>
            {canView ? (
              isScheduled ? (
                <button className="schedule-visit" onClick={handleVisitClick}>View Details</button>
              ) : (
                <button onClick={handleClick} className="schedule-visit">Schedule visit</button>
              )
            ) : (
              <p style={{ color: 'red', fontSize: 'medium', fontWeight: 'bold' }}>You have Exhausted your free Visits. Buy Subscription to continue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
