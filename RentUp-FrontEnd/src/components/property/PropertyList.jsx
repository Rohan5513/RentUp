import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import "./PropertyList.css";
import { getAllProperties } from "../data/Data";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PropertyList = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      // If properties are passed, use them
      setProperties(initialProperties);
    } else {
      // Otherwise, fetch properties from the API
      const fetchProperties = async () => {
        try {
          const propertiesData = await getAllProperties();
          const availableProperties = propertiesData.filter(
            (property) => property.status === "AVAILABLE"
          );
          setProperties(availableProperties);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };

      fetchProperties();
    }
  }, [initialProperties]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="property-list-container">
      <h2>Property List</h2>
      <Carousel responsive={responsive} className="myCarousel">
        {properties.map((property) => (
          <div key={property.propertyId} className="property-card">
            <PropertyCard property={property} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PropertyList;
