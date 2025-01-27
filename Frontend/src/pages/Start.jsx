import React from 'react'
import Uberlogo from "/images/uber logo.webp";
import { Link } from 'react-router-dom';

export default function Start() {
    return (
        <div className='h-screen w-full pt-5 flex flex-col justify-between bg-red-400 bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8)] bg-cover bg-center'>
            <img src={Uberlogo} alt="" className="w-16 ml-4" />
            <div className="bg-white py-4 px-4 pb-7">
                <h2 className="text-2xl font-semibold">Get Started with Uber</h2>
                <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded  mt-5">Continue</Link>
            </div>
        </div>
      )
}
