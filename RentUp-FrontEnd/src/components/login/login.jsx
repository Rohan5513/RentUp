import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Login.css"; // Import your CSS file
import { useUser } from "../common/UserProvider"; // Import useUser hook from context

const Login = () => {
  const { setUser,user } = useUser(); 
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showButtons, setShowButtons] = useState(true);
  const [backendError, setBackendError] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.mobileNumber.match(/^\d{10}$/)) {
      errors.mobileNumber = "Mobile Number must be 10 digits";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:8080/users/login",
          formData
        );
        setUser(response.data); 
        localStorage.setItem("user", JSON.stringify(response.data));
        setShowButtons(false); 
        history.push("/");
      } catch (error) {
        if (error.response) {
          console.error("Invalid Mobile Number or password");
          setBackendError("Invalid Mobile Number or password");
        } else if (error.request) {
          console.error("Invalid Mobile Number or password");
          setBackendError(
            "Error: Unable to connect to the server. Please try again later."
          );
        } else {
          console.error("Invalid Mobile Number or password");
          setBackendError("Invalid Mobile Number or password");
        }
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number:
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="form-input"
          />
          {errors.mobileNumber && (
            <div className="error-message">{errors.mobileNumber}</div>
          )}
        </div>
        <div className="form-group">
          <div className="forgot-password">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <Link to='/forgot-password'className="forgot-text">Forgot Password?</Link>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
          
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        {showButtons && ( 
          <button type="submit" className="submit-btn">
            Login
          </button>
        )}
        {backendError && <div className="error-message">{backendError}</div>}
      </form>
    </div>
  );
};

export default Login;
