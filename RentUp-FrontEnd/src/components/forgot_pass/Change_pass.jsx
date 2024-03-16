import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import '../forgot_pass/Change_pass.css'
import { useUser } from "../common/UserProvider"; // Import useUser hook from context
import { serverUrl } from "../data/Data";

const ChangePass = () => {
  const { setUser } = useUser(); 
  const [passChange,setPassChange] = useState(false);
  const [formData, setFormData] = useState({
    newpass: "",
    password: "",
  });

  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [showButtons, setShowButtons] = useState(true);
  const [backendError, setBackendError] = useState("");
  const history = useHistory();
  const { mobileNumber } = location.state.state || {};
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value,
        });
    };
 

  const validateForm = () => {
    const errors = {};
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (formData.password != formData.newpass) {
        errors.password = "Passwords Doesn't match";
      }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await axios.put(`${serverUrl}/users/${mobileNumber}/${formData.newpass}`);
        setPassChange(true);
        setTimeout(() => {
            history.push('/');
          }, 3000);
      } catch (error) {
        if (error.response) {
          setBackendError("Invalid Entry");
        } else if (error.request) {
          setBackendError(
            "Error: Unable to connect to the server. Please try again later."
          );
        } else {
          setBackendError("Invalid Entry");
        }
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Change Password</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="newpass" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            id="newpass"
            name="newpass"
            value={formData.newpass}
            onChange={handleChange}
            className="form-input"
          />
          {errors.newpass && (
            <div className="error-message">{errors.newpass}</div>
          )}
        </div>
        <div className="form-group">
          <div className="forgot-password">
          <label htmlFor="password" className="form-label">
            Re-Type New Password:
          </label>
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
          {passChange ? <p className="output">Password Change Successfull</p>:""}
        </div>
        {showButtons && ( // Conditionally render login and signup buttons
          <button type="submit" className="submit-btn">
            Login
          </button>
        )}
        {backendError && <div className="error-message">{backendError}</div>}
      </form>
    </div>
  );
};

export default ChangePass;
