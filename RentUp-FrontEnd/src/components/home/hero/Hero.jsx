import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import axios from "axios";
import { getCities } from "../../data/Data";
import { getAllProperties } from "../../data/Data";
import PropertyList from "../../property/PropertyList";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [areas, setAreas] = useState([]);
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [properties, setProperties] = useState([]);

  const [area, setArea] = useState("");

  useEffect(() => {
    // Fetch properties only when properties state is null or empty
    if (!properties || properties.length === 0) {
      const fetchProperties = async () => {
        try {
          const propertiesData = await getAllProperties();
          console.log(propertiesData);
          setProperties(propertiesData);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };

      fetchProperties();
    }
  }, [properties]);

  const propertyTypes = ["1RK", "1BHK", "2BHK", "3BHK"];
  const prices = [
    {
      value: "<₹10000",
    },
    {
      value: "<₹15000",
    },
    {
      value: "<₹20000",
    },
    {
      value: "<₹25000",
    },
  ];

  const handleAreaChange = (event) => setArea([event.target.value]);
  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    fetchAreas(selectedCity);
  };
  const handlePropertyTypeSelect = (selectedType) =>
    setPropertyType(selectedType);
  const handlePriceRangeSelect = (selectedRange) =>
    setPriceRange(selectedRange);

  const handleSearch = async () => {
    try {
      const allProperties = await getAllProperties();

      const filteredProperties = allProperties.filter((property) => {
        // if (!(property.status === "AVAILABLE")) {
        // Filter by city
        const cityMatch =
          !city ||
          (property.areaId.city.cityName === city &&
            property.status === "AVAILABLE");

        // Filter by area
        const areaMatch =
          areas.length === 0 ||
          (area.includes(property.areaId.areaName) &&
            property.status === "AVAILABLE");

        // Combine city and area
        const cityAreaMatch =
          cityMatch && areaMatch && property.status === "AVAILABLE";

        // Filter by property type
        const propertyTypeMatch =
          !propertyType ||
          (property.flatType === propertyType &&
            property.status === "AVAILABLE");

        // Filter by price range
        const priceMatch =
          !priceRange ||
          (getPriceRangeMatch(property.price) &&
            property.status === "AVAILABLE");

        // Combine city, area, and property type
        const cityAreaPropertyTypeMatch =
          cityAreaMatch && propertyTypeMatch && property.status === "AVAILABLE";

        // Combine city, area, and price range
        const cityAreaPriceMatch =
          cityAreaMatch && priceMatch && property.status === "AVAILABLE";

        // Return properties that match either combination

        return (
          (cityAreaPropertyTypeMatch && cityAreaPriceMatch) ||
          (cityAreaMatch && cityMatch)
        );
        // }
      });

      setProperties(filteredProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const getPriceRangeMatch = (propertyPrice) => {
    if (!priceRange) return true;

    const price = parseInt(priceRange.replace(/<|₹/g, ""), 10);

    if (priceRange.startsWith("<")) {
      return propertyPrice < price;
    } else {
      return propertyPrice <= price;
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const cities = await getCities();
      setLocations(cities);
    };

    fetchLocations();
  }, []);

  const fetchAreas = async (selectedCity) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/area/${selectedCity}`
      );
      setAreas(response.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading
            title="Search Your Next Home "
            subtitle="Find new & featured property located in your local city."
          />

          <form className="flex">
            <div className="box">
              <span>City</span>
              <select value={city} onChange={handleCityChange}>
                <option>Select City</option>
                {locations.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="box">
              <span>Area</span>
              <select value={area} onChange={handleAreaChange}>
                <option>Select Area</option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <div className="box">
              <span>Property Type</span>
              <select
                value={propertyType}
                onChange={(e) => handlePropertyTypeSelect(e.target.value)}
              >
                <option>Select Property Type</option>
                {propertyTypes.map((property, index) => (
                  <option key={index} value={"_" + property}>
                    {property}
                  </option>
                ))}
              </select>
            </div>

            <div className="box">
              <span>Price Range</span>
              <select
                value={priceRange}
                onChange={(e) => handlePriceRangeSelect(e.target.value)}
              >
                <option value={100000}>Select Price Range</option>
                {prices.map((price, index) => (
                  <option key={index} value={price.value}>
                    {price.value}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn1" type="button" onClick={handleSearch}>
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </section>
      <PropertyList properties={properties} />
    </>
  );
};

export default Hero;
