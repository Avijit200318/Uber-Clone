import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import uberLogo from "../../public/images/uber logo.png";
import CaptainDetails from '../components/CaptainDetails';
import Ridepopup from '../components/Ridepopup';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import CaptainConfirmRidePopup from '../components/CaptainConfirmRidePopup';

import { useSelector } from 'react-redux';
import { useSocket } from '../components/SocketConnect';
import LiveTracking from '../components/LiveTracking';

let newSocket;

export default function CaptainHome() {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [socket, setSocket] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupRef = useRef(null);
  const { currentCaptain } = useSelector((state) => state.captain);
  const [ride, setRide] = useState(null);
  const [location, setLocation] = useState({
    ltd: "",
    lng: ""
  });

  newSocket = useSocket();

  useEffect(() => {
    setSocket(newSocket);
  }, [newSocket]);

  useEffect(() => {
    if (socket && currentCaptain) {
      newSocket.emit("join", {
        userId: currentCaptain._id,
        userType: 'captain'
      })
    }
  }, [socket]);

  useEffect(() => {
    const updateLocation = () => {
      if (!socket || !currentCaptain) return;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({ ltd: position.coords.latitude + 0.0006312660467, lng: position.coords.longitude -  0.00579800000001});
          socket.emit('update-location-captain', {
            userId: currentCaptain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 60000);
    updateLocation();
    return () => clearInterval(locationInterval);
  }, [socket]);

  useEffect(() => {
    const rideMessage = () => {
      if (!socket) return;
      newSocket.on('new-ride', (data) => {
        console.log("data: ", data);
        setRide(data);
        setRidePopupPanel(true);
      })
    }
    rideMessage();
  }, [socket]);

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

  const confirmRide = async () => {
    if (!ride || !currentCaptain) {
      console.log("ride or captain is missing");
      return;
    }
    try {
      const res = await fetch("/api/ride/confirm", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rideId: ride._id, captainId: currentCaptain._id }),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setRidePopupPanel(false);
      setConfirmRidePopup(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='h-screen'>
      <div className="fixed p-3 top-0 w-full flex items-center justify-between z-20">
        <img src={uberLogo} alt="" className="w-16" />
        <Link to='/home' className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <i className=" text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className={`h-[65%] relative ${location.ltd.length === 0? 'z-50' : 'z-10'}`}>
        {location.ltd.length === 0 &&
          <div className="w-full h-screen flex justify-center items-center bg-white">
            <div className="border-8 border-t-8 border-t-gray-800 border-black rounded-full w-16 h-16 animate-spin"></div>
          </div>
        }
        {location.ltd.length !== 0 &&
          <LiveTracking location={location} />
        }
      </div>

      <div className="h-[35%] px-4 py-8">
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
        <Ridepopup ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopup={setConfirmRidePopup} confirmRide={confirmRide} />
      </div>

      <div ref={confirmRidePopupRef} className=" h-screen fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
        <CaptainConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup} setRidePopupPanel={setRidePopupPanel} ride={ride} />
      </div>
    </div>
  )
}
