// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../common/UserProvider"; // Import useUser hook from context
// import "./ListedProperty.css"
// const ListedProperty = () => {
//   const { user } = useUser(); // Get user from context
//   const [properties, setProperties] = useState([]);
//   const [rentedProperties, setRentedProperties] = useState([]);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         console.log(typeof user.userId);
//         console.log(user.userId);
//         // Fetch properties listed by the user from the backend
//         const response = await axios.get(
//           // `http://localhost:8080/user/${user.userId}/properties`
//           `http://localhost:8080/properties/users/${user.userId}`
//         );
//         setProperties(response.data);
//       } catch (error) {
//         console.error("Error fetching properties listed by user:", error);
//       }
//     };

//     fetchProperties();
//   }, [user]); // Trigger useEffect when user changes

//   const handleRentedOut = async (propertyId) => {
//     try {
//       // Update the status of the property to "Rented Out" on the backend
//       await axios.put(`http://localhost:8080/properties/${propertyId}`, {
//         status: "Rented Out",
//       });
//       // Update the local state to reflect the change
//       setRentedProperties([...rentedProperties, propertyId]);
//     } catch (error) {
//       console.error("Error updating property status:", error);
//     }
//   };

//   return (
//     <div className="listed-property">
//       <h2>Properties</h2>
//       {properties.map((property) => (
//         <div key={property.id} className="property-item">
//           <p>Address: {property.address}</p>
//           <p>City: {property.city}</p>
//           <p>Area: {property.area}</p>
//           <p>Flat Type: {property.flatType}</p>
//           {property.status === "AVAILABLE" && (
//             <button onClick={() => handleRentedOut(property.propertyId)}>
//               Mark as Rented Out
//             </button>
//           )}
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ListedProperty;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../common/UserProvider"; // Import useUser hook from context
// import "./ListedProperty.css"; // Import CSS file for styling

// const ListedProperty = () => {
//   const { user } = useUser(); // Get user from context
//   const [properties, setProperties] = useState([]);
//   const [rentedProperties, setRentedProperties] = useState([]);
//   const [rentedOutMessage, setRentedOutMessage] = useState("");

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         // Fetch properties listed by the user from the backend
//         const response = await axios.get(
//           `http://localhost:8080/properties/users/${user.userId}`
//         );
//         setProperties(response.data);
//       } catch (error) {
//         console.error("Error fetching properties listed by user:", error);
//       }
//     };

//     fetchProperties();
//   }, [user]); // Trigger useEffect when user changes

//   const handleRentedOut = async (propertyId) => {
//     try {
//       // Update the status of the property to "Rented Out" on the backend
//       await axios.put(`http://localhost:8080/properties/${propertyId}`, {
//         status: "Rented Out",
//       });
//       // Update the local state to reflect the change
//       setRentedProperties([...rentedProperties, propertyId]);
//       // Show rented out message
//       setRentedOutMessage("Property rented out successfully!");
//     } catch (error) {
//       console.error("Error updating property status:", error);
//     }
//   };

//   return (
//     <div className="listed-property">
//       <h2>Properties</h2>
//       {rentedOutMessage && <p className="message">{rentedOutMessage}</p>}
//       {properties.map((property) => (
//         <div key={property.id} className="property-item">
//           <p>Address: {property.address}</p>
//           <p>City: {property.city}</p>
//           <p>Area: {property.area}</p>
//           <p>Flat Type: {property.flatType}</p>
//           {property.status === "AVAILABLE" && (
//             <button
//               onClick={() => handleRentedOut(property.propertyId)}
//               disabled={rentedProperties.includes(property.propertyId)}
//             >
//               Mark as Rented Out
//             </button>
//           )}
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ListedProperty;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../common/UserProvider"; // Import useUser hook from context

// const ListedProperty = () => {
//   const { user } = useUser(); // Get user from context
//   const [properties, setProperties] = useState([]);
//   const [rentedProperties, setRentedProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         // Fetch properties listed by the user from the backend
//         const response = await axios.get(`http://localhost:8080/properties/users/${user.userId}`);
//         setProperties(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching properties listed by user:", error);
//       }
//     };

//     fetchProperties();
//   }, [user]); // Trigger useEffect when user changes

//   const handleRentedOut = async (propertyId) => {
//     try {
//       // Update the status of the property to "Rented Out" on the backend
//       await axios.put(`http://localhost:8080/properties/${propertyId}`, {
//         status: "Rented Out",
//       });
//       // Update the local state to reflect the change
//       setRentedProperties([...rentedProperties, propertyId]);
//       // Show alert
//       alert("Property rented out successfully!");
//     } catch (error) {
//       console.error("Error updating property status:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Properties</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : properties.length === 0 ? (
//         <p>No properties listed</p>
//       ) : (
//         properties.map((property) => (
//           <div key={property.id}>
//             <p>Address: {property.address}</p>
//             <p>City: {property.city}</p>
//             <p>Area: {property.area}</p>
//             <p>Flat Type: {property.flatType}</p>
//             {property.status === "AVAILABLE" && !rentedProperties.includes(property.propertyId) && (
//               <button onClick={() => handleRentedOut(property.propertyId)}>
//                 Mark as Rented Out
//               </button>
//             )}
//             <hr />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ListedProperty;

// 

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../common/UserProvider"; // Import useUser hook from context
// import "./ListedProperty.css"; // Import CSS file

// const ListedProperty = () => {
//   const { user } = useUser(); // Get user from context
//   const [properties, setProperties] = useState([]);
//   const [rentedProperties, setRentedProperties] = useState([]);
//   const [message, setMessage] = useState(""); // State for displaying message

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         // Fetch properties listed by the user from the backend
//         const response = await axios.get(
//           `http://localhost:8080/properties/users/${user.userId}`
//         );
//         setProperties(response.data);
//       } catch (error) {
//         console.error("Error fetching properties listed by user:", error);
//       }
//     };

//     fetchProperties();
//   }, [user]); // Trigger useEffect when user changes

//   const handleRentedOut = async (propertyId) => {
//     try {
//       // Update the status of the property to "Rented Out" on the backend
//       await axios.put(`http://localhost:8080/properties/${propertyId}`, {
//         status: "Rented Out",
//       });
//       // Update the local state to reflect the change
//       setRentedProperties([...rentedProperties, propertyId]);
//       setMessage("Property rented out successfully.");
//     } catch (error) {
//       console.error("Error updating property status:", error);
//     }
//   };

//   return (
//     <div className="property-container">
//       {properties.length === 0 ? (
//         <p>No properties listed.</p>
//       ) : (
//         properties.map((property) => (
//           <div key={property.propertyId} className="property-card">
//             <p>Address: {property.address}</p>
//             <p>City: {property.areaId.city.cityName}</p>
//             <p>Area: {property.areaId.areaName}</p>
//             <p>Flat Type: {property.flatType}</p>
//             {property.status === "AVAILABLE" && (
//               <button
//                 onClick={() => handleRentedOut(property.propertyId)}
//                 className="rent-out-button"
//               >
//                 Mark as Rented Out
//               </button>
//             )}
//             {rentedProperties.includes(property.propertyId) && (
//               <p>Status: Rented Out</p>
//             )}
//           </div>
//         ))
//       )}
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default ListedProperty;

//________________________________________________________________

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../common/UserProvider"; // Import useUser hook from context

// const ListedProperty = () => {
//   const { user } = useUser(); // Get user from context
//   const [properties, setProperties] = useState([]);
//   const [rentedProperties, setRentedProperties] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/properties/users/${user.userId}`
//         );
//         setProperties(response.data);
//       } catch (error) {
//         console.error("Error fetching properties listed by user:", error);
//       }
//     };

//     fetchProperties();
//   }, [user]);

//   const handleRentedOut = async (propertyId) => {
//     try {
//       await axios.put(`http://localhost:8080/properties/${propertyId}`, {
//         status: "Rented Out",
//       });
//       setRentedProperties([...rentedProperties, propertyId]);
//       setMessage("Property rented out successfully.");
//       // Show the alert when the property is rented out
//       alert("Congratulations! Property rented out.");
//     } catch (error) {
//       console.error("Error updating property status:", error);
//     }
//   };

//   const isPropertyAvailable = (propertyId) => {
//     return properties.find(property => property.propertyId === propertyId && property.status === "AVAILABLE");
//   }

//   return (
//     <div>
//       <h2>Properties</h2>
//       {properties.length === 0 ? (
//         <p>No properties listed.</p>
//       ) : (
//         properties.map((property) => (
//           <div key={property.propertyId}>
//             <p>Address: {property.address}</p>
//             <p>City: {property.areaId.city.cityName}</p>
//             <p>Area: {property.areaId.areaName}</p>
//             <p>Flat Type: {property.flatType}</p>
//             {isPropertyAvailable(property.propertyId) && !rentedProperties.includes(property.propertyId) && (
//               <button onClick={() => handleRentedOut(property.propertyId)}>
//                 Mark as Rented Out
//               </button>
//             )}
//             <hr />
//           </div>
//         ))
//       )}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ListedProperty;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../common/UserProvider"; // Import useUser hook from context

// const ListedProperty = () => {
//   const { user } = useUser(); // Get user from context
//   const [properties, setProperties] = useState([]);
//   const [rentedProperties, setRentedProperties] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/properties/users/${user.userId}`
//         );
//         setProperties(response.data);
//       } catch (error) {
//         console.error("Error fetching properties listed by user:", error);
//       }
//     };

//     fetchProperties();
//   }, [user]);

//   const handleRentedOut = async (propertyId) => {
//     try {
//       await axios.put(`http://localhost:8080/properties/${propertyId}`, {
//         status: "Rented Out",
//       });
//       setRentedProperties([...rentedProperties, propertyId]);
//       setMessage("");
//       alert("Congratulations! Property rented out.");
//     } catch (error) {
//       console.error("Error updating property status:", error);
//     }
//   };

//   const isPropertyAvailable = (propertyId) => {
//     return properties.find(property => property.propertyId === propertyId && property.status === "AVAILABLE");
//   }

//   return (
//     <div className="listed-properties-container">
//       <h2>Properties</h2>
//       {properties.length === 0 ? (
//         <p>No properties listed.</p>
//       ) : (
//         properties.map((property) => (
//           <div key={property.propertyId} className="property-card">
//             <p>Address: {property.address}</p>
//             <p>City: {property.areaId.city.cityName}</p>
//             <p>Area: {property.areaId.areaName}</p>
//             <p>Flat Type: {property.flatType}</p>
//             <p>Carpet Area: {property.carpetArea}</p>
//             <p>Tenant Type: {property.tenantType}</p>
//             <p>Price: {property.price}</p>
//             {isPropertyAvailable(property.propertyId) && !rentedProperties.includes(property.propertyId) && (
//               <button onClick={() => handleRentedOut(property.propertyId)}>
//                 Mark as Rented Out
//               </button>
//             )}
//           </div>
//         ))
//       )}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ListedProperty;

//  ------------------------------------------------------------------------------


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../common/UserProvider"; // Import useUser hook from context
import "./ListedProperty.css"

const ListedProperty = () => {
  const { user } = useUser(); // Get user from context
  const [properties, setProperties] = useState([]);
  const [rentedProperties, setRentedProperties] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/properties/users/${user.userId}`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties listed by user:", error);
      }
    };

    fetchProperties();
  }, [user]);

  const handleRentedOut = async (propertyId) => {
    try {
      await axios.put(`http://localhost:8080/properties/${propertyId}`, {
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
    return properties.find(property => property.propertyId === propertyId && property.status === "AVAILABLE");
  }

  return (
    <div className="listed-properties-container">
      <h2>Properties</h2>
      {properties.length === 0 ? (
        <p>No properties listed.</p>
      ) : (
        properties.map((property) => (
          <div key={property.propertyId} className="property-card">
            <p>Address: {property.address}</p>
            <p>City: {property.areaId.city.cityName}</p>
            <p>Area: {property.areaId.areaName}</p>
            <p>Flat Type: {property.flatType}</p>
            <p>Carpet Area: {property.carpetArea}</p>
            <p>Tenant Type: {property.tenantType}</p>
            <p>Price: {property.price}</p>
            {isPropertyAvailable(property.propertyId) && !rentedProperties.includes(property.propertyId) && (
              <button onClick={() => handleRentedOut(property.propertyId)}>
                Mark as Rented Out
              </button>
            )}
          </div>
        ))
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ListedProperty;
