import React, { useState } from 'react';
import UberBlackLogo from '/images/uber logo.png';
import { Link } from 'react-router-dom';

export default function UserSignUp() {

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({});
  }

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div className="">
        <img src={UberBlackLogo} alt="" className="w-16 mb-5" />
        <form className="p-3" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-2">What's your name</h3>
          <div className="flex gap-2 mb-7">
          <input type="text" required placeholder='First Name' className="bg-[#eeeeee] rounded px-4 py-2 w-36 border text-lg placeholder:text-base" id='firstName' onChange={handleChange} />
          <input type="email" required placeholder='Last Name' className="bg-[#eeeeee] rounded px-4 py-2 w-36 border text-lg placeholder:text-base" id='lastName' onChange={handleChange} />

          </div>
          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input type="email" required placeholder='email@example.com' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='email' onChange={handleChange} />
          <h3 className='text-lg font-semibold mb-2'>Password</h3>
          <input type="password" required placeholder='password' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='password' onChange={handleChange} />
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg font-semibold mb-2'>Sign Up</button>
        </form>
        <p className="text-center font-semibold">Already have an account? <Link className='text-blue-500' to='/login'>Login</Link></p>
      </div>
      {/* <div className="p-3">
        <Link to='/captain-signup' className="bg-[#10b461] flex items-center justify-center text-white rounded px-4 py-2 border w-full text-lg font-semibold">Sign In as Captain</Link>
      </div> */}
      <p className="text-xs text-justify">We collect basic information and uploaded images to provide services and improve accuracy.Your data is secure, used only for analysis, and not shared without consent. using AgriScan, you agree to this policy.For questions, contact us at <span className="underline cursor-pointer">uberproject@gmail.com</span>.</p>
    </div>
  )
}
