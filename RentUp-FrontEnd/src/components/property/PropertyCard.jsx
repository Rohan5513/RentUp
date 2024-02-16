import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <h3 className="property-title">{property.address}</h3>
      <p className="property-info">Property ID: {property.propertyId}</p>
      <p className="property-info">Carpet Area: {property.carpetArea} sq. ft.</p>
      <p className="property-info">Status: {property.status}</p>
      <p className="property-info">Tenant Type: {property.tenantType}</p>
      <p className="property-info">Flat Type: {property.flatType}</p>

      <div className="property-images">
        {property.propertyImages.map((image, index) => (
          <img
            key={index}
            className="property-image"
            src={`data:image/png;base64,${image}`}
            alt={`Property Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCard;
