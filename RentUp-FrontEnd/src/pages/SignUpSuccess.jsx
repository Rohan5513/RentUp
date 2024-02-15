import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const SignUpSuccess = () => {
  const location = useLocation();
  const { firstName, lastName } = location.state || {};
    return (
      <div className='text-center text-3xl text-gray-400 mt-48 mb-48'>
        <p>Welcome to Family <span className='text-violet-700'>{firstName} {lastName} &#128522;</span></p>
        <Link to='/' className='text-violet-700 hover:text-violet-500 transition'>See Properties &#127968;</Link>
      </div>
    );
  };

export default SignUpSuccess