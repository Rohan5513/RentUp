// PropertyList.js
import React, { useEffect, useState } from "react";

import PropertyCard from "./PropertyCard"; // Adjust the path accordingly
import "./PropertyList.css"; // Import your CSS file
import { getAllProperties } from "../data/Data";
import Carousel from "react-multi-carousel";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
  }

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
      {/* <Carousel responsive={responsive} className="myCarousel"> */}
        {properties.map((property) => (
          <PropertyCard key={property.propertyId} property={property} />
        ))}
        {/* </Carousel> */}
      </div>
    </div>
  );
};

export default PropertyList;
