import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./style.css";

const Signup = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [message, setMessage] = useState("");
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
    if (!formData.firstName.trim()) {
      errors.firstName = "Please enter your First Name";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Please enter your Last Name";
    }
    if (!formData.mobileNumber.match(/^\d{10}$/)) {
      errors.mobileNumber = "Please enter a valid 10-digit Mobile Number";
    }
    if (!formData.email.trim()) {
      errors.email = "Please enter your Email Address";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid Email Address";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
          "http://localhost:8080/users/register",
          formData
        );
        if (response.status === 200) {
          setMessage("Signup successful!");
          setFormData(initialFormData);
          setBackendError("");
          history.push("/login"); // Redirect to login page
        } else {
          setBackendError("Error: " + response.data.message);
        }
      } catch (error) {
        setBackendError(
          "Error: " + error.response?.data.message || error.message
        );
      }
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setBackendError("");
    setMessage("");
  };

  return (
    <div className="signup-container">
      <h2>Signup Form</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <div className="error-message">{errors.firstName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div className="error-message">{errors.lastName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          {errors.mobileNumber && (
            <div className="error-message">{errors.mobileNumber}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>
        <div className="button-group">
          <button type="reset" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
        {backendError && <div className="error-message">{backendError}</div>}
      </form>
    </div>
  );
};

export default Signup;
