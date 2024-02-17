
// // PropertyList.js
// import React, { useEffect, useState } from "react";

// import PropertyCard from "./PropertyCard"; // Adjust the path accordingly
// import "./PropertyList.css"; // Import your CSS file
// import { getAllProperties } from "../data/Data";
// import Carousel from "react-multi-carousel";

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);

//   const responsive = {
//     superLargeDesktop: {
//         breakpoint: { max: 4000, min: 3000 },
//         items: 5
//     },
//     desktop: {
//         breakpoint: { max: 3000, min: 1024 },
//         items: 3
//     },
//     tablet: {
//         breakpoint: { max: 1024, min: 464 },
//         items: 2
//     },
//     mobile: {
//         breakpoint: { max: 464, min: 0 },
//         items: 1
//     }
//   }

//   useEffect(() => {
//     const fetchProperties = async () => {
//       const propertiesData = await getAllProperties();
//       setProperties(propertiesData);
//     };

//     fetchProperties();
//   }, []);

//   return (
//     <div className="property-list-container">
//       <h2>Property List</h2>
//       <div className="property-list">
//       {/* <Carousel responsive={responsive} className="myCarousel"> */}
//         {properties.map((property) => (
//           <PropertyCard key={property.propertyId} property={property} />
//         ))}
//         {/* </Carousel> */}
//       </div>
//     </div>
//   );
// };

// export default PropertyList;

// import React from "react";
// import PropertyCard from "./PropertyCard"; // Adjust the path accordingly
// import "./PropertyList.css"; // Import your CSS file
// import { getAllProperties } from "../data/Data";
// import Carousel from "react-multi-carousel";

// const PropertyList = ({ property }) => {
//   const [properties, setProperties] = useState([]);
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//      useEffect(() => {
//         const fetchProperties = async () => {
//           const propertiesData = await getAllProperties();
//           setProperties(propertiesData);
//         };

//         fetchProperties();
//       }, []);

//   return (
//     <div className="property-list-container">
//       <h2>Property List</h2>
//       <div className="property-list">
//         {properties.length > 0 ? (
//           <Carousel responsive={responsive} className="myCarousel">
//             {properties.map((property) => (
//               <PropertyCard key={property.propertyId} property={property} />
//             ))}
//           </Carousel>
//         ) : (
//           <p>No properties found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyList;

// import React, { useEffect, useState } from "react";
// import PropertyCard from "./PropertyCard"; // Adjust the path accordingly
// import "./PropertyList.css"; // Import your CSS file
// import Carousel from "react-multi-carousel";
// import { getAllProperties } from "../data/Data";

// import React, { useEffect, useState } from "react";
// import PropertyCard from "./PropertyCard";
// import "./PropertyList.css";
// import { getAllProperties } from "../data/Data";
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';


// const PropertyList = ({ properties: initialProperties }) => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     if (initialProperties && initialProperties.length > 0) {
//       // If properties are passed, use them
//       setProperties(initialProperties);
//     } else {
//       // Otherwise, fetch properties from the API
//       const fetchProperties = async () => {
//         try {
//           const propertiesData = await getAllProperties();
//           const availableProperties = propertiesData.filter(
//             (property) => property.status === "AVAILABLE"
//           );
//           setProperties(availableProperties);
//         } catch (error) {
//           console.error("Error fetching properties:", error);
//         }
//       };

//       fetchProperties();
//     }
//   }, [initialProperties]);

//   const responsive = {
//     superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
//     desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
//     tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
//     mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
//   };

//   return (
//     <div className="property-list-container">
//       <h2>Property List</h2>

//       <div className="property-list">
//         {properties && properties.length > 0 ? (
//           <Carousel responsive={responsive} className="myCarousel">
//           {properties.map((property) => (
//             <div key={property.propertyId} className="property-card">
//               <PropertyCard property={property} />
//             </div>
//           ))}
//         </Carousel>
//         ) : (
//           <p>No properties found.</p>
//         )}
//       </div>

      

//     </div>
//   );
// };

// export default PropertyList;


// PropertyList.js

import React from "react";
import PropertyCard from "./PropertyCard";
import "./PropertyList.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PropertyList = ({ properties }) => {
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
              <div key={property.propertyId} className="property-card">
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

