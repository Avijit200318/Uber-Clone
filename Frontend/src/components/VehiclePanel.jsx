import React from 'react'
import uberCar from "/images/uber car.webp";
import uberBike from "/images/uber bike.webp";
import uberAuto from "/images/uber auto.webp";

export default function VehiclePanel({setVehiclePanel, setConfirmRidePanel, fare, setSelectedFare, setVechicleImg}) {

    const selectingVehicle = (price, image) => {
        setConfirmRidePanel(true);
        setSelectedFare(price);
        setVechicleImg(image);
    }

    return (
        <div>
            <h5 onClick={() => setVehiclePanel(false)} className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"><i className="ri-arrow-down-wide-fill text-2xl text-gray-500"></i></h5>
            <h3 className="text-2xl font-semibold mb-3 mt-2">Choose a Vehicle</h3>
            <div onClick={()=> selectingVehicle(fare.car, uberCar)} className="flex w-full p-3 items-center justify-between border-2 active:border-black rounded-md mb-2">
                <img src={uberCar} alt="" className="h-10" />
                <div className="w-1/2">
                    <h4 className="font-semibold">UberGo <span className="text-sm pl-1"><i className="ri-user-3-fill text-sm"></i>4</span></h4>
                    <h5 className='text-xs'>2 mins away</h5>
                    <p className='text-xs font-normal text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>{fare? `₹ ${(fare.car).toLocaleString('en-US')}` : ''}</h2>
            </div>
            <div onClick={()=> selectingVehicle(fare.bike, uberBike)} className="flex w-full p-3 items-center justify-between border-2 active:border-black rounded-md mb-2">
                <img src={uberBike} alt="" className="h-10" />
                <div className="w-1/2">
                    <h4 className="font-semibold">Moto <span className="text-sm pl-1"><i className="ri-user-3-fill text-sm"></i>1</span></h4>
                    <h5 className='text-xs'>2 mins away</h5>
                    <p className='text-xs font-normal text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>{fare? `₹ ${(fare.bike).toLocaleString('en-US')}` : ''}</h2>
            </div>
            <div onClick={()=> selectingVehicle(fare.auto, uberAuto)} className="flex w-full p-3 items-center justify-between border-2 active:border-black rounded-md mb-2">
                <img src={uberAuto} alt="" className="h-10" />
                <div className="w-1/2">
                    <h4 className="font-semibold">UberAuto<span className="text-sm pl-1"><i className="ri-user-3-fill text-sm"></i>3</span></h4>
                    <h5 className='text-xs'>2 mins away</h5>
                    <p className='text-xs font-normal text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>{fare? `₹ ${(fare.auto).toLocaleString('en-US')}` : ''}</h2>
            </div>
        </div>
    )
}
