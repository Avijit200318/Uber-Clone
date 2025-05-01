import React, { useRef, useState, useEffect } from 'react'
import UberBlackLogo from '/images/uber logo.png';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LokingForDriver from '../components/LokingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

import { io } from "socket.io-client"
import { useSelector } from 'react-redux';

let newSocket;
export default function Home() {

  const [pickup, setPickup] = useState({
    name: '',
    ltd: '',
    lng: ''
  });
  const [destination, setDestination] = useState({
    name: '',
    ltd: '',
    lng: ''
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const showBtnRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(null);
  const [selectedFare, setSelectedFare] = useState(null);
  const [vehicleImg, setVechicleImg] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  console.log(suggestion)

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vechidleFoundlRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    newSocket = (io(import.meta.env.VITE_BASE_URL));

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log("Connected to socket server:", newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if(socket && currentUser){
      newSocket.emit("join", {
        userId: currentUser._id,
        userType: 'user'
      })
    }
  }, [socket])

  const handleSumbit = (e) => {
    e.preventDefault();

  }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    setActiveField('pickup');
    fetchSuggestions(e.target.value);
  }

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setActiveField('destination');
    fetchSuggestions(e.target.value);
  }

  const fetchSuggestions = async (input) => {
    try {
      if (input.length < 3) return;
      // since we don't want to send too short input
      const res = await fetch(`/api/maps/get-suggestion?input=${input}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setSuggestion(data);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "75%"
      });
      gsap.to(showBtnRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%"
      });
      gsap.to(showBtnRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);


  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vechidleFoundlRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vechidleFoundlRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [waitingForDriver]);

  const handleFindTrip = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/ride/get-fare", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup, destination
        })
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        setLoading(false);
        return;
      }
      setFare(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setVehiclePanel(true);
    setPanelOpen(false);
  }

  const createRide = async () => {
    try {
      const res = await fetch("/api/ride/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup,
          destination,
          vehicleType
        })
      });

      const data = await res.json();
      if (data.success === false) {
        return;
        console.log(data.message);
      }
      console.log("created ride: ", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='h-screen relative'>
      <img src={UberBlackLogo} alt="" className="w-16 mb-5 absolute top-5 left-5" />
      <div className="h-screen w-screen">
        <img src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[32%] p-5 bg-white relative">
          <h5 ref={showBtnRef} onClick={() => setPanelOpen(false)} className='absolute top-2 right-3 text-2xl cursor-pointer'><i className="ri-arrow-down-wide-fill"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={handleSumbit} className="relative">
            <div className="line absolute h-16 w-1 top-[25%] left-4 bg-gray-700 rounded-full"></div>
            <input type="text" id='pickup' className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3 outline-none" placeholder='Add a pick-up location' onClick={() => setPanelOpen(true)} onChange={handlePickupChange} value={pickup.name} />
            <input type="text" id='destination' className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3 outline-none" placeholder='Enter your destination' onClick={() => setPanelOpen(true)} onChange={handleDestinationChange} value={destination.name} />
          </form>
          <button onClick={handleFindTrip} disabled={pickup.length === 0 || destination.length === 0} className="bg-black text-white px-4 py-2 rounded-md w-full font-semibold my-4 disabled:bg-[#4b3a3a] relative h-14 overflow-hidden flex items-center justify-center">{loading ?
            <div className="border-4 border-t-4 border-t-white border-gray-300 rounded-full h-8 w-8 animate-spin absolute"></div>
            : 'Find Trip'}</button>
        </div>

        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} suggestion={suggestion} activeField={activeField} setPickup={setPickup} setDestination={setDestination} setSuggestion={setSuggestion} />
        </div>

        <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
          <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} fare={fare} setSelectedFare={setSelectedFare} setVechicleImg={setVechicleImg} setVehicleType={setVehicleType} />
        </div>

        <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} pickup={pickup} destination={destination} selectedFare={selectedFare} vehicleImg={vehicleImg} createRide={createRide} />
        </div>

        <div ref={vechidleFoundlRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
          <LokingForDriver setVehicleFound={setVehicleFound} pickup={pickup} destination={destination} selectedFare={selectedFare} />
        </div>

        <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  )
}
