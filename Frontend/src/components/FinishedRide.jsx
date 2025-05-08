import React from 'react'
import { Link } from 'react-router-dom';

export default function FinishedRide({ setFinishedRidePanel, ride }) {
    return (
        <div className='py-8'>
            <h5 onClick={() => setFinishedRidePanel(false)} className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"><i className="ri-arrow-down-wide-fill text-2xl text-gray-500"></i></h5>
            <h3 className="text-2xl font-semibold mb-3 mt-2">Finished this Ride</h3>
            <div className="flex items-center justify-between p-3 mt-4 border-2 border-yellow-400 rounded-lg">
                <div className="flex items-center gap-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s" alt="" className="h-10 w-10 rounded-full object-cover" />
                    <h2 className='text-lg font-medium'>{ride?.user.fullName.firstName + " " + ride?.user.fullName.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{ride?.distance.toLocaleString('en-US')}KM</h5>
            </div>
            <div className="flex flex-col justify-between items-center gap-2 h-[50vh]">
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
                            <h3 className='font-semibold text-lg'>{ride?.destination}</h3>
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

                <div className="w-full flex flex-col gap-2">
                    <Link to='/captain-home' className=" flex justify-center  items-center w-full mt-5 mt- bg-green-600 text-white font-semibold px-2 py-3 rounded-lg text-lg">Complete Ride</Link>
                    <p className="text-red-700 mt-6 text-sm font-semibold line-clamp-2 text-center">Click the Finished button after payment completion</p>
                </div>
            </div>
        </div>
    )
}
