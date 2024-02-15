import React from 'react'
import { Link } from 'react-router-dom';

const ChangePasswordSuccess = () => {
    return (
      <div className='text-center text-3xl text-gray-400 mt-48 mb-48'>
        <p>Password Changed <span className='text-violet-700'>Successfully &#128526;</span></p>
        <Link to='/' className='text-violet-700 hover:text-violet-500 transition'>See Properties &#127968;</Link>
      </div>
    );
  };

export default ChangePasswordSuccess