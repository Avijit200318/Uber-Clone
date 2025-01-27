import React, { useState } from 'react';
import UberBlackLogo from '/images/uber logo.png';
import { Link, useNavigate } from 'react-router-dom';

export default function UserSignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatedData = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
    };

    try{
      setLoading(true);
      setError(null);
      const res = await fetch("/api/users/signUp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatedData),
      });

      const data = await res.json();
      if(res.status !== 201){
        console.log(data);
        setLoading(false);
        setError(data);
        return;
      }
      navigate("/login");
    }catch(error){
      console.log(error);
      setError(error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div className="">
        <img src={UberBlackLogo} alt="" className="w-16 mb-5" />
        <form onSubmit={handleSubmit} className="p-3">
          <h3 className="text-lg font-semibold mb-2">What's your name</h3>
          <div className="flex gap-2 mb-7">
          <input type="text" required placeholder='First Name' className="bg-[#eeeeee] rounded px-4 py-2 w-36 border text-lg placeholder:text-base" id='firstName' onChange={handleChange} />
          <input type="text" required placeholder='Last Name' className="bg-[#eeeeee] rounded px-4 py-2 w-36 border text-lg placeholder:text-base" id='lastName' onChange={handleChange} />

          </div>
          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input type="email" required placeholder='email@example.com' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='email' onChange={handleChange} />
          <h3 className='text-lg font-semibold mb-2'>Password</h3>
          <input type="password" required placeholder='password' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='password' onChange={handleChange} />
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg font-semibold mb-2'>{loading? 'Loading...': 'Create Account'}</button>
        </form>
        <p className="text-center font-semibold">Already have an account? <Link className='text-blue-500' to='/login'>Login</Link></p>
        {error && <p className='font-bold text-red-700 my-5 text-center'>{error.message? error.message : "Some Unexpected error happend"}</p>}
      </div>
      {/* <div className="p-3">
        <Link to='/captain-signup' className="bg-[#10b461] flex items-center justify-center text-white rounded px-4 py-2 border w-full text-lg font-semibold">Sign In as Captain</Link>
      </div> */}
      <p className="text-xs text-justify">We collect basic information and uploaded images to provide services and improve accuracy.Your data is secure, used only for analysis, and not shared without consent. using AgriScan, you agree to this policy.For questions, contact us at <span className="underline cursor-pointer">uberproject@gmail.com</span>.</p>
    </div>
  )
}
