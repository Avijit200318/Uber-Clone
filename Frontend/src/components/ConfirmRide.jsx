import React from 'react'
import uberCar from "/images/uber car.webp";

export default function ConfirmRide({ setConfirmRidePanel, setVehicleFound, pickup, destination, selectedFare, vehicleImg, createRide}) {

  const handleConfirm = () => {
    setVehicleFound(true);
    setConfirmRidePanel(false);
    createRide();
  }

  return (
    <div>
      <h5 onClick={() => setConfirmRidePanel(false)} className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"><i className="ri-arrow-down-wide-fill text-2xl text-gray-500"></i></h5>
      <h3 className="text-2xl font-semibold mb-3 mt-2">Confirm your Ride</h3>
      <div className="flex flex-col justify-between items-center gap-2">
        <img src={vehicleImg} alt="" className="h-20" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 border-t-2">
          <i className="ri-map-pin-user-fill text-xl"></i>
            <div className="">
              <h3 className='font-semibold text-lg line-clamp-1'>{pickup? pickup.name : ''}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="ri-map-pin-2-fill text-xl"></i>
            <div className="">
              <h3 className='font-semibold text-lg line-clamp-1'>{destination? destination.name : ''}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
          <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div className="">
              <h3 className='font-semibold text-lg'>₹{selectedFare && selectedFare.toLocaleString('en-US')}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
            </div>
          </div>
        </div>
        <button onClick={handleConfirm} className="w-full mt-5 mt- bg-green-600 text-white font-semibold px-2 py-3 rounded-lg text-lg">Confirm</button>
      </div>

    </div>
  )
}
