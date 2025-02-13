import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { captainSignInFailure, captainSignInStart, captainSignInSuccess } from '../redux/captain/captainSlice';

export default function CaptainLogin() {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error, loading} = useSelector((state) => state.captain);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      dispatch(captainSignInStart());
      const res = await fetch("/api/captains/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(data.success === false){
        console.log(data.message);
        dispatch(captainSignInFailure(data.message));
        return;
      }
      dispatch(captainSignInSuccess(data.captain));
      localStorage.token = data.token;
      navigate("/captain-home");
    }catch(error){
      dispatch(captainSignInFailure(error.message));
      console.log(error);
    }
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
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg font-semibold mb-2 overflow-hidden'>{loading?
          <div className='w-full h-full flex justify-center items-center z-50'>
            <div className="border-4 border-t-4 border-t-white border-gray-300 rounded-full w-8 h-8 animate-spin"></div>
          </div>
          : 'Login'}</button>
        </form>
        {error && <p className='font-bold text-red-700 my-3 text-center'>{(error && !Array.isArray(error))? error : "Please Enter Valid Details to all Fields"}</p>}
          <p className="text-center font-semibold">Join a fleat? <Link className='text-blue-500' to='/captain-signup'>Register as a Captain</Link></p>
      </div>
      <div className="p-3">
        <Link to='/login' className="bg-[#10b461] flex items-center justify-center text-white rounded px-4 py-2 border w-full text-lg font-semibold transition-all duration-300 hover:bg-[#0fa157]">Login as User</Link>
      </div>
    </div>
  )
}
