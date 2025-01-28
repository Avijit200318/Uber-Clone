import React, { useState } from 'react';
import UberBlackLogo from '/images/uber logo.png';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function UserLogin() {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      setError(null);
      const res = await fetch("/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(data.success === false){
        console.log(data);
        setError(data.message);
        return;
      }
      navigate("/home");
    }catch(error){
      console.log(error.message);
      setError(error.message);
    }
    finally{
      setLoading(false);
  }
}
  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div className="">
        <img src={UberBlackLogo} alt="" className="w-16 mb-5" />
        <form className="p-3" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input type="email" required placeholder='email@example.com' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='email' onChange={handleChange} />
          <h3 className='text-lg font-semibold mb-2'>Password</h3>
          <input type="password" required placeholder='password' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='password' onChange={handleChange} />
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg font-semibold mb-2'>{loading? 'Loading' : 'Login'}</button>
        </form>
          <p className="text-center font-semibold">New here? <Link className='text-blue-500' to='/signup'>Create New Account</Link></p>
          {error && <p className="text-red-700 text-center font-semibold my-5">{error}</p>}
      </div>
      <div className="p-3">
        <Link to='/captain-login' className="bg-[#10b461] flex items-center justify-center text-white rounded px-4 py-2 border w-full text-lg font-semibold transition-all duration-300 hover:bg-[#0fa157]">Login as Captain</Link>
      </div>
    </div>
  )
}
