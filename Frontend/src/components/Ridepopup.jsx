import React, { useState } from 'react'

export default function Ridepopup({setRidePopupPanel, setConfirmRidePopup}) {

  return (
    <div>
      <h5 onClick={() => setRidePopupPanel(false)} className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"><i className="ri-arrow-down-wide-fill text-2xl text-gray-500"></i></h5>
            <h3 className="text-2xl font-semibold mb-3 mt-2">New Ride Available!</h3>
            <div className="flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg">
                <div className="flex items-center gap-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s" alt="" className="h-10 w-10 rounded-full object-cover" />
                    <h2 className='text-lg font-medium'>Harsh Paten</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className="flex flex-col justify-between items-center gap-2">
              <div className="w-full mt-5">
                <div className="flex items-center gap-5 p-2 border-b-2 border-t-2">
                <i className="ri-map-pin-user-fill text-xl"></i>
                  <div className="">
                    <h3 className='font-semibold text-lg'>562/11-A</h3>
                    <p className='text-gray-600 text-sm -mt-1'>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
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
              <button onClick={()=> setConfirmRidePopup(true)} className="w-full mt-5 mt- bg-green-600 text-white font-semibold px-2 py-3 rounded-lg text-lg">Accept</button>

              <button onClick={()=>setRidePopupPanel(false)} className="w-full mt-1 mt- bg-gray-300  text-gray-700 font-semibold px-2 py-3 rounded-lg text-lg">Ignore</button>
            </div>
    </div>
  )
}
