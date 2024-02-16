// PropertyList.js
import React, { useEffect, useState } from "react";

import PropertyCard from "./PropertyCard"; // Adjust the path accordingly
import "./PropertyList.css"; // Import your CSS file
import { getAllProperties } from "../data/Data";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesData = await getAllProperties();
      setProperties(propertiesData);
    };

    fetchProperties();
  }, []);

  return (
    <div className="property-list-container">
      <h2>Property List</h2>
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard key={property.propertyId} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
