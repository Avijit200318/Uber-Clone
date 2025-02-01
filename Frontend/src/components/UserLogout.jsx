import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice';

export default function UserLogout() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    useEffect(() => {
        const logoutFun = async () => {
            try{
                dispatch(signOutStart());
                const res = await fetch("/api/users/logout", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                const data = await res.json();
                if(data.success === false){
                    console.log(data.message);
                    dispatch(signOutFailure(data.message));
                    return;
                }
                localStorage.removeItem('token');
                dispatch(signOutSuccess());
                navigate('/login');
            }catch(error){
                console.log(error.message);
                dispatch(signOutFailure(error.message));
            }
        }
        logoutFun();
    }, []);

}
