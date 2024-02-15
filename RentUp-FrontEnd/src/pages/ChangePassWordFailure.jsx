import React from 'react'
import { Link } from 'react-router-dom'

const ChangePassWordFailure = () => {
  return (
    <div>
        <div className='text-center text-3xl text-gray-400 mb-48 mt-48'><p className='bold:xl'><span className='text-violet-500'>Sorry</span>, Something went wrong &#128542;</p>
        <Link className='text-violet-700 hover:text-violet-500 px-4 py-3 rounded-lg transition' to='/signup'>Try <span className='text-gray-400'>again</span> &#128522;</Link>
        </div>
    </div>
  )
}

export default ChangePassWordFailure
