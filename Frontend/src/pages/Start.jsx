import React, { useEffect, useState } from 'react'
import Uberlogo from "/images/uber logo.webp";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { captainSignInStart, captainSignInFailure, captainSignInSuccess } from '../redux/captain/captainSlice';

export default function Start() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [navigateLink, setNavigateLink] = useState('/login');
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      console.log("decoded: ", decoded);
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;
      try {
        dispatch(signInStart());
        dispatch(captainSignInStart());
        const res = await fetch(`/api/users/userInfo?userId=${user._id}`, {
          headers: {
            Authorization: `Bearer${localStorage.getItem('token')}`
          }
        });

        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          dispatch(captainSignInFailure(data.message));
          console.log(data.message);
          return;
        }
        setUserInfo(data);
        if(data.userType === "user"){
          dispatch(signInSuccess(data));
          console.log("user data");
        }else{
          dispatch(captainSignInSuccess(data));
          console.log("captain data");
        }
      } catch (error) {
        console.log(error);
        dispatch(signInFailure(error.message));
        dispatch(captainSignInFailure(error.message));
      }
    }
    fetchUserInfo();
  }, [user]);

  useEffect(() => {
    if (!userInfo) return;
    if (userInfo.userType === 'user') {
      setNavigateLink('/home');
    } else if (userInfo.userType === 'captain') {
      setNavigateLink('/captain-home');
    }
  }, [userInfo]);

  return (
    <div className='h-screen w-full pt-5 flex flex-col justify-between bg-red-400 bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8)] bg-cover bg-center'>
      <img src={Uberlogo} alt="" className="w-16 ml-4" />
      <div className="bg-white py-4 px-4 pb-7">
        <h2 className="text-2xl font-semibold">Get Started with Uber</h2>
        <Link to={navigateLink} className="flex items-center justify-center w-full bg-black text-white py-3 rounded  mt-5">Continue</Link>
      </div>
    </div>
  )
}
