import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice";

export default function PrivateRoute() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      if(!token){
        console.log("token is: ", token);
        navigate("/login");
        return;
      }

      const fetchUserData = async () => {
        try{
          dispatch(signInStart());
          const res = await fetch("/api/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          if(data.success === false){
            console.log(data.message);
            localStorage.removeItem("token");
            dispatch(signInFailure(data.message));
            navigate("/login");
            return;
          }
          dispatch(signInSuccess(data));
        }catch(error){
          console.log(error.message);
          localStorage.removeItem("token");
          dispatch(signInFailure(error.message));
          navigate("/login");
        }
      }

      fetchUserData();
    }, [token]);

  return <Outlet />
}
