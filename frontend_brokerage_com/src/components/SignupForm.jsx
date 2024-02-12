import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        contactNumber: '',
        profilePicture: null
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setUser({ ...user, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('name', user.name);
        formData.append('contactNumber', user.contactNumber);
        formData.append('file', user.profilePicture);
        try {
            const response = await axios.post('http://localhost:8080/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('User signed up successfully:', response.data);
            // Redirect user to login or dashboard
        } catch (error) {
            console.error('Failed to sign up:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={user.email} onChange={handleChange} required />
                <input type="password" name="password" value={user.password} onChange={handleChange} required />
                <input type="text" name="name" value={user.name} onChange={handleChange} required />
                <input type="text" name="contactNumber" value={user.contactNumber} onChange={handleChange} required />
                <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
