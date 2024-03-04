import React from "react";
import PropertyCard from "./PropertyCard";
import "./PropertyList.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useUser } from "../common/UserProvider";

const PropertyList = ({ properties }) => {
  const { user } = useUser();
  let userId;

  if(user!=null){
    userId = user.userId;
  }
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="property-list-container">
      <h2>Property List</h2>

      <div className="property-list">
        {properties && properties.length > 0 ? (
          <Carousel responsive={responsive} className="myCarousel">
            {properties.map((property) => (
              property.userId.userId === userId ? null : <div key={property.propertyId} className="property-card">
                <PropertyCard property={property} />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;

