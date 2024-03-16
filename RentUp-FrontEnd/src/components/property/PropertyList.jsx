import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import "./PropertyList.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useUser } from "../common/UserProvider";
import axios from "axios";
import { serverUrl } from "../data/Data";

const PropertyList = ({ properties }) => {
  const { user } = useUser();
  let userId;
  const [propertyImages, setPropertyImages] = useState([]);
  if(user != null) {
    userId = user.userId;
  }
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const fetchProperties = async () => {
    const imagePromises = properties.map(async (property) => {
      try {
        const response1 = await axios.get(
          `${serverUrl}/properties/image/${property.propertyId}`,
          {
            responseType: "arraybuffer",
          }
        );
        if(response1.data.byteLength > 14) {
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
        }
        else{
          return null;
        }
      } catch (error) {
        console.log(error);
        return { propertyId: property.propertyId, image: null };
      }
    });

    const images = await Promise.all(imagePromises);
    setPropertyImages(images);
  };

  useEffect(() => {
    fetchProperties();
  }, [properties]);

  return (
    <div className="property-list-container">
      <h2>Property List</h2>

      <div className="property-list">
        {properties && properties.length > 0 ? (
          <Carousel responsive={responsive} className="myCarousel">
            {properties.map((property, index) => (
              property.userId.userId === userId ? null : (
                <div key={property.propertyId} className="property-card">
                  {
                    <PropertyCard property={property} image={propertyImages[index]?.image} />
                  }
                </div>
              )
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
