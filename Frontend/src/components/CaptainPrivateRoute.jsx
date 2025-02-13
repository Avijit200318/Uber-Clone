import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {captainSignInStart, captainSignInFailure, captainSignInSuccess} from "../redux/captain/captainSlice";

export default function CaptainPrivateRoute() {
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!token){
            navigate("/captain-login");
            console.log("token is: ", token);
            return;
        }

        const fetchUserData = async () => {
            try{
                dispatch(captainSignInStart());
                const res = await fetch("/api/captains/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                if(data.success === false){
                    console.log(data.message);
                    localStorage.removeItem("token");
                    dispatch(captainSignInFailure(data.message));
                    navigate("/captain-login");
                    return;
                }
                // console.log("data valide: ", data);
                dispatch(captainSignInSuccess(data));
            }catch(error){
                console.log(error.message);
                localStorage.removeItem("token");
                dispatch(captainSignInFailure(error.message));
                navigate("/captain-login");
            }
        };

        fetchUserData();
    }, [token]);

    return <Outlet />;
}
