import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import uberLogo from "../../public/images/uber logo.png";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import FinishedRide from '../components/FinishedRide';

export default function CaptainRiding() {

    const [finishedRidePanel, setFinishedRidePanel] = useState(false);
    const finishedRidePanelRef = useRef(null);

    useGSAP(() => {
        if (finishedRidePanel) {
            gsap.to(finishedRidePanelRef .current, {
                transform: 'translateY(0)',
            })
        } else {
            gsap.to(finishedRidePanelRef .current, {
                transform: 'translateY(100%)',
            })
        }
    }, [finishedRidePanel]);

    return (
        <div className='h-screen'>
            <div className="fixed p-3 top-0 w-full flex items-center justify-between">
                <img src={uberLogo} alt="" className="w-16" />
                <Link to='/home' className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className=" text-lg ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-[80%]">
                <img src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="" className="h-full w-full object-cover" />
            </div>
            <div onClick={()=> setFinishedRidePanel(true)} className="h-[20%] flex items-center justify-evenly relative bg-yellow-400">
                <h5 className="p-1 text-center w-full absolute top-0">
                    <i className="ri-arrow-up-wide-line text-2xl text-gray-500"></i>
                </h5>
                <h4 className="text-xl font-semibold">4 KM away</h4>
                <button className="bg-green-600 text-white font-semibold p-3 px-6 rounded-lg">Complete Ride</button>
            </div>

            <div ref={finishedRidePanelRef} className=" fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
                <FinishedRide setFinishedRidePanel={setFinishedRidePanel} />
            </div>
        </div>
    )
}
