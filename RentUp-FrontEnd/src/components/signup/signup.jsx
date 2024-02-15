import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./style.css";

const Signup = () => {
  const initialFormData = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userContactNumber: "",
    userProfilePicture: null,
    propertiesLeft: 5, // Set the default value to 5
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // If the input is a file, handle it separately
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.userName.trim()) {
      errors.userName = "Please enter your Username";
    }

    if (!formData.userEmail.trim()) {
      errors.userEmail = "Please enter your Email Address";
    } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
      errors.userEmail = "Please enter a valid Email Address";
    }

    if (!formData.userContactNumber.match(/^\d{10}$/)) {
      errors.userContactNumber =
        "Please enter a valid 10-digit Mobile Number";
    }

    if (!formData.userPassword.trim()) {
      errors.userPassword = "Please enter your Password";
    } else if (formData.userPassword.length < 6) {
      errors.userPassword = "Password must be at least 6 characters long";
    } else if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        formData.userPassword
      )
    ) {
      errors.userPassword =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 6 characters long";
    }

    if (formData.userPassword !== formData.confirmPassword) {
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
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await axios.post(
          "http://localhost:8080/users/register",
          formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && (
            <div className="error-message">{errors.userName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
          />
          {errors.userEmail && (
            <div className="error-message">{errors.userEmail}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userContactNumber">Mobile Number:</label>
          <input
            type="text"
            name="userContactNumber"
            value={formData.userContactNumber}
            onChange={handleChange}
          />
          {errors.userContactNumber && (
            <div className="error-message">{errors.userContactNumber}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            name="userPassword"
            value={formData.userPassword}
            onChange={handleChange}
          />
          {errors.userPassword && (
            <div className="error-message">{errors.userPassword}</div>
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
        <div className="form-group">
          <label htmlFor="userProfilePicture">Profile Picture:</label>
          <input
            type="file"
            name="userProfilePicture"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.userProfilePicture && (
            <div className="error-message">{errors.userProfilePicture}</div>
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
