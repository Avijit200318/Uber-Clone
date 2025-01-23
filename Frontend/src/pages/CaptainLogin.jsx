import React, { useState } from 'react';
import {Link} from 'react-router-dom';

export default function CaptainLogin() {

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div className="">
        <img src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" className="w-16 mb-2" />
        <form className="p-3" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input type="email" required placeholder='captain@example.com' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='email' onChange={handleChange} />
          <h3 className='text-lg font-semibold mb-2'>Password</h3>
          <input type="password" required placeholder='password' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='password' onChange={handleChange} />
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg font-semibold mb-2'>Login</button>
        </form>
          <p className="text-center font-semibold">Join a fleat? <Link className='text-blue-500' to='/captain-signup'>Register as a Captain</Link></p>
      </div>
      <div className="p-3">
        <Link to='/login' className="bg-[#10b461] flex items-center justify-center text-white rounded px-4 py-2 border w-full text-lg font-semibold transition-all duration-300 hover:bg-[#0fa157]">Login as User</Link>
      </div>
    </div>
  )
}
