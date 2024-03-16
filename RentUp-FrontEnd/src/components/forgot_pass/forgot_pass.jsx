import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import '../forgot_pass/forgot_pass.css'
import { useUser } from "../common/UserProvider"; 
import { serverUrl } from "../data/Data";

const ForgotPass = () => {
    const history = useHistory();
  const [isUser, setIsUser] = useState(true);
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const mobileNumber = data.get('mobileNumber');

    try {
      const response = await axios.get(`${serverUrl}/users/${mobileNumber}`);
      if (response.data == false) {
        setIsUser(false);
      } else {
        history.push('/change-password', { state: { mobileNumber } });
      }
    } catch(error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Forgot Password</h2>
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
        </div>
        {!isUser && <p className="error-msg">No user with the mobile number {formData.mobileNumber}</p>}
        <button type="submit" className="submit-btn">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
