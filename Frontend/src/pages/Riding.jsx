import React from 'react'
import uberCar from "/images/uber car.webp";
import { Link } from 'react-router-dom';

export default function Riding() {
    return (
        <div className='h-screen'>
            <Link to='/home' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-lg ri-home-4-fill"></i>
            </Link>
            <div className="h-1/2">
                <img src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="" className="h-full w-full object-cover" />
            </div>

            <div className="h-1/2 px-4 py-8">
                <div className="flex items-center justify-between">
                    <div className="relative w-[30%]">
                        <div className="w-14 h-14 rounded-full border-2 border-gray-300 overflow-hidden relative z-10">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbU49DD_iYcjSUEXG-Oy7POjJzaMn1GYEZg&s" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-14 h-14 rounded-full border-2 border-gray-400 overflow-hidden absolute top-0 right-2">
                            <img src={uberCar} alt="" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className='text-lg'>Hitash Choudhury</h2>
                        <h4 className='font-semibold text-xl -mt-1'>WB 1234-56</h4>
                        <p className='text-xs text-gray-600 -mt-1'>Maruti Suzuke Alto</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-2">
                    <div className="w-full mt-5">
                    
                        <div className="flex items-center gap-5 p-2 border-b-2">
                            <i className="ri-map-pin-2-fill text-xl"></i>
                            <div className="">
                                <h3 className='font-semibold text-lg'>562/11-A</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-2">
                            <i className="ri-money-rupee-circle-fill text-xl"></i>
                            <div className="">
                                <h3 className='font-semibold text-lg'>₹ 192.50</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 mt- bg-green-600 text-white  px-2 py-3 rounded-lg text-lg'>Make a Payment</button>
            </div>
        </div>
    )
}
