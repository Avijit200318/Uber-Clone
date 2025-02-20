import React, { useRef, useState } from 'react'
import UberBlackLogo from '/images/uber logo.png';
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

import uberCar from "/images/uber car.webp";
import uberBike from "/images/uber bike.webp";
import uberAuto from "/images/uber auto.webp";


export default function Home() {

  const [formData, setFormData] = useState({
    pickup: "",
    destination: ""
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const showBtnRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);

  const handleSumbit = (e) => {
    e.preventDefault();

  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  useGSAP(() => {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: "75%"
      });
      gsap.to(showBtnRef.current, {
        opacity: 1,
      });
    }else{
      gsap.to(panelRef.current, {
        height: "0%"
      });
      gsap.to(showBtnRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  
    useGSAP(() => {
      if(vehiclePanel){
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(0)',
        })
      }else{
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(100%)',
        })
      }
    }, [vehiclePanel]);

  return (
    <div className='h-screen relative'>
      <img src={UberBlackLogo} alt="" className="w-16 mb-5 absolute top-5 left-5" />
      <div className="h-screen w-screen">
        <img src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[25%] p-5 bg-white relative">
          <h5 ref={showBtnRef} onClick={()=> setPanelOpen(false)} className='absolute top-2 right-3 text-2xl cursor-pointer'><i className="ri-arrow-down-wide-fill"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={handleSumbit} className="relative">
            <div className="line absolute h-16 w-1 top-[25%] left-4 bg-gray-700 rounded-full"></div>
            <input type="text" id='pickup' className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3 outline-none" placeholder='Add a pick-up location' onClick={()=> setPanelOpen(true)} onChange={handleChange} defaultValue={formData.pickup}/>
            <input type="text" id='destination' className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3 outline-none" placeholder='Enter your destination' onClick={()=> setPanelOpen(true)} onChange={handleChange} defaultValue={formData.destination} />
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>

        <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full">
          <h5 onClick={()=> setVehiclePanel(false)} className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"><i className="ri-arrow-down-wide-fill text-2xl text-gray-500"></i></h5>
                <h3 className="text-2xl font-semibold mb-3 mt-2">Choose a Vehicle</h3>
                <div className="flex w-full p-3 items-center justify-between border-2 active:border-black rounded-md mb-2">
                  <img src={uberCar} alt="" className="h-10" />
                  <div className="w-1/2">
                    <h4 className="font-semibold">UberGo <span className="text-sm pl-1"><i className="ri-user-3-fill text-sm"></i>4</span></h4>
                    <h5 className='text-xs'>2 mins away</h5>
                    <p className='text-xs font-normal text-gray-600'>Affordable, compact rides</p>
                  </div>
                  <h2 className='text-lg font-semibold'>₹ 193.20</h2>
                </div>
                <div className="flex w-full p-3 items-center justify-between border-2 active:border-black rounded-md mb-2">
                  <img src={uberBike} alt="" className="h-10" />
                  <div className="w-1/2">
                    <h4 className="font-semibold">Moto <span className="text-sm pl-1"><i className="ri-user-3-fill text-sm"></i>1</span></h4>
                    <h5 className='text-xs'>2 mins away</h5>
                    <p className='text-xs font-normal text-gray-600'>Affordable, compact rides</p>
                  </div>
                  <h2 className='text-lg font-semibold'>₹ 103.20</h2>
                </div>
                <div className="flex w-full p-3 items-center justify-between border-2 active:border-black rounded-md mb-2">
                  <img src={uberAuto} alt="" className="h-10" />
                  <div className="w-1/2">
                    <h4 className="font-semibold">UberAuto<span className="text-sm pl-1"><i className="ri-user-3-fill text-sm"></i>3</span></h4>
                    <h5 className='text-xs'>2 mins away</h5>
                    <p className='text-xs font-normal text-gray-600'>Affordable, compact rides</p>
                  </div>
                  <h2 className='text-lg font-semibold'>₹ 153.20</h2>
                </div>
              </div>
      </div>
    </div>
  )
}
