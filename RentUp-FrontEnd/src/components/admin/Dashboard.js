// /////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import "./admin.css";

const AddCityForm = ({ addCity }) => {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCity(cityName);
    setCityName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cityName">City Name</label>
        <input
          type="text"
          className="form-control"
          id="cityName"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add City
      </button>
    </form>
  );
};

const AddAreaForm = ({ cities, addArea }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [areaName, setAreaName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addArea(selectedCity, areaName);
    setAreaName("");
    setSelectedCity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="city">Select City</label>
        <select
          className="form-control"
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="areaName">Area Name</label>
        <input
          type="text"
          className="form-control"
          id="areaName"
          placeholder="Enter area name"
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Area
      </button>
    </form>
  );
};

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [maxPriceLimit, setMaxPriceLimit] = useState(1000000);

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    setPriceRange({ ...priceRange, [type]: value });
  };

  const handleSubscriptionClick = () => {
    setSelectedTab("Total subscriptions");
  };

  const handlePropertyListClick = () => {
    setSelectedTab("Total properties listed");
  };

  const handleRevenueClick = () => {
    setSelectedTab("Total revenue");
  };

  const handleCitiesAndAreasClick = () => {
    setSelectedTab("Number of cities and areas");
  };

  const addCity = (cityName) => {
    setCities([...cities, cityName]);
  };

  const addArea = (city, areaName) => {
    setAreas([...areas, { city, area: areaName }]);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return (
          <div className="dashboard-row">
            <div className="dashboard-column">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  Subscriptions
                </div>
                <div className="card-body">
                  <h5 className="card-title">Total Subscriptions: </h5>
                  {/* Placeholder for total subscriptions summary */}
                </div>
              </div>
            </div>

            <div className="dashboard-column">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  Properties
                </div>
                <div className="card-body">
                  <h5 className="card-title">Total Properties: </h5>
                  {/* Placeholder for total properties summary */}
                </div>
              </div>
            </div>

            <div className="dashboard-column">
              <div className="card">
                <div className="card-header bg-primary text-white">Revenue</div>
                <div className="card-body">
                  <h5 className="card-title">Total Revenue:</h5>
                  {/* Placeholder for total revenue summary */}
                </div>
              </div>
            </div>

            <div className="dashboard-column">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  Cities & Areas
                </div>
                <div className="card-body">
                  <h5 className="card-title">Total Cities and Areas:</h5>
                  {cities.map((city, index) => (
                    <div key={index}>
                      <p>{city}</p>
                      <ul>
                        {areas
                          .filter((area) => area.city === city)
                          .map((area, index) => (
                            <li key={index}>{area.area}</li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "Total subscriptions":
        return (
          <div className="subscriptions-cards-container">
            <div className="subscription-card">
              <div className="card-header bg-silver text-white">
                Silver Subscriptions
              </div>
              <div className="card-body">
                <h5 className="card-title">Total Silver Subscriptions</h5>
                <p className="card-text">
                  Total: {/* Total silver subscriptions */}
                </p>
              </div>
            </div>
            <div className="subscription-card">
              <div className="card-header bg-gold text-white">
                Gold Subscriptions
              </div>
              <div className="card-body">
                <h5 className="card-title">Total Gold Subscriptions</h5>
                <p className="card-text">
                  Total: {/* Total gold subscriptions */}
                </p>
              </div>
            </div>
            <div className="subscription-card">
              <div className="card-header bg-platinum text-white">
                Platinum Subscriptions
              </div>
              <div className="card-body">
                <h5 className="card-title">Total Platinum Subscriptions</h5>
                <p className="card-text">
                  Total: {/* Total platinum subscriptions */}
                </p>
              </div>
            </div>
          </div>
        );

      case "Total properties listed":
        return (
          <div className="properties-card">
            <div className="card">
              <div className="card-header bg-primary text-white">
                Properties
              </div>
              <div className="card-body">
                {/* Details for properties listed */}
              </div>
            </div>
          </div>
        );
      case "Total revenue":
        return (
          <div className="revenue-card">
            <div className="card">
              <div className="card-header bg-primary text-white">Revenue</div>
              <div className="card-body">
                <h5 className="card-title">Total Revenue</h5>
                <p className="card-text">₹{totalRevenue}</p>
                {/* Additional details for total revenue can be added here if needed */}
              </div>
            </div>
          </div>
        );

      case "Number of cities and areas":
        return (
          <div className="cities-areas-card">
            <div className="card">
              <div className="card-header bg-primary text-white">
                Cities and Areas
              </div>
              <div className="card-body">
                <h5 className="card-title">Cities and Areas</h5>
                <AddCityForm addCity={addCity} />
                <AddAreaForm cities={cities} addArea={addArea} />
              </div>
            </div>
          </div>
        );
      default:
        return <div>Please select a tab</div>;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h1>Admin</h1>
      </div>
      <div className="dashboard-container">
        <div className="left-menu">
          <button
            className={`menu-item ${
              selectedTab === "Dashboard" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("Dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`menu-item ${
              selectedTab === "Total subscriptions" ? "active" : ""
            }`}
            onClick={handleSubscriptionClick}
          >
            Subscriptions
          </button>
          <button
            className={`menu-item ${
              selectedTab === "Total properties listed" ? "active" : ""
            }`}
            onClick={handlePropertyListClick}
          >
            Properties
          </button>
          <button
            className={`menu-item ${
              selectedTab === "Total revenue" ? "active" : ""
            }`}
            onClick={handleRevenueClick}
          >
            Revenue
          </button>
          <button
            className={`menu-item ${
              selectedTab === "Number of cities and areas" ? "active" : ""
            }`}
            onClick={handleCitiesAndAreasClick}
          >
            Cities and Areas
          </button>
        </div>
        <div className="content-area">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
//////////////////////////////////////////////////////
