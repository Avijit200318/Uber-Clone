import React from 'react'
import uberCar from "/images/uber car.webp";

export default function WaitingForDriver({setWaitingForDriver, ride}) {
  return (
    <div>
      <h5 onClick={()=> setWaitingForDriver(false)} className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"><i className="ri-arrow-down-wide-fill text-2xl text-gray-500"></i></h5>
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
          <h2 className='text-lg font-semibold line-clamp-1'>{ride?.captain.fullName.firstName + " " + ride?.captain.fullName.lastName}</h2>
          <h4 className='font-semibold text-2xl -mt-1'>{ride?.captain.vehicle.plate}</h4>
          <h4 className="font-semibold text-gray-800">OTP : {ride?.otp}</h4>
          <p className='text-sm text-gray-600 mt-1'>Maruti Suzuke Alto</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 border-t-2">
            <i className="ri-map-pin-user-fill text-xl"></i>
            <div className="">
              <h3 className='font-semibold text-lg line-clamp-2'>{ride?.pickup}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="ri-map-pin-2-fill text-xl"></i>
            <div className="">
              <h3 className='font-semibold text-lg line-clamp-2'>{ride?.destination}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="">
              <h3 className='font-semibold text-lg'>₹{ride?.fare.toLocaleString('en-US')}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
