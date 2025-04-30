import React from 'react'
import {useSelector} from "react-redux";

export default function CaptainDetails() {

  const {currentCaptain} = useSelector((state)=> state.captain);
  console.log("currentCaptain: ", currentCaptain);

  return (
    <div>
      <div className="flex justify-between">
          <div className="flex items-center justify-start gap-3 w-3/4">
            <img src="https://assets-us-01.kc-usercontent.com/5cb25086-82d2-4c89-94f0-8450813a0fd3/0c3fcefb-bc28-4af6-985e-0c3b499ae832/Elon_Musk_Royal_Society.jpg" alt="" className="h-10 w-10 rounded-full object-cover" />
            <h4 className='line-clamp-2 w-1/2 capitalize font-semibold'>{currentCaptain.fullName.firstName + ' ' + currentCaptain.fullName.lastName}</h4>
          </div>
          <div className="w-1/4 flex justify-center items-end flex-col">
            <h4 className='text-xl font-semibold'>₹ 192.50</h4>
            <p className='text-sm font-semibold text-gray-600'>Earned</p>
          </div>
        </div>
        <div className="flex pb-6 justify-center gap-5 items-start mt-6 bg-gray-100 rounded-xl">
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
  )
}
