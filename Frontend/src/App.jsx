import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignUp from './pages/UserSignUp';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignUp from './pages/CaptainSignUp';
import Start from './pages/Start';
import PrivateRoute from './components/PrivateRoute';
import UserLogout from './components/UserLogout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/user/logout' element={<UserLogout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
