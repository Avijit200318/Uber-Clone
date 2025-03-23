import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import uberLogo from "../../public/images/uber logo.png";
import CaptainDetails from '../components/CaptainDetails';
import Ridepopup from '../components/Ridepopup';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import CaptainConfirmRidePopup from '../components/CaptainConfirmRidePopup';

export default function CaptainHome() {

  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopup) {
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmRidePopup]);

  return (
    <div className='h-screen'>
      <div className="fixed p-3 top-0 w-full flex items-center justify-between">
        <img src={uberLogo} alt="" className="w-16" />
        <Link to='/home' className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <i className=" text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="h-2/5 px-4 py-8">
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
        <Ridepopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopup={setConfirmRidePopup} />
      </div>
      
      <div ref={confirmRidePopupRef} className=" h-screen fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
        <CaptainConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}
