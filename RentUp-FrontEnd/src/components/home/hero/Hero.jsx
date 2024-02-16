import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import axios from "axios";
import { getCities } from "../../data/Data";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [areas, setArea] = useState([]);
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const propertyTypes = ["1RK","1BHK","2BHK","3BHK"];
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
      setArea(response.data);
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
              <option>Select City
                  </option>
                {locations.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="box">
              <span>Area</span>
              <select value={areas} onChange={handleAreaChange}>
              <option>Select Area
                  </option>
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
              <option>Select Property Type
                  </option>
                {propertyTypes.map((property, index) => (
                  <option key={index} value={property}>
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
              <option>Select Price Range
                  </option>
                {prices.map((price, index) => (
                  <option key={index} value={price.value}>
                    {price.value}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn1">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
