import React from 'react';

export default function LocationSearchPanel({setPanelOpen, setVehiclePanel}) {

  const exampleLocations = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit."
  ]

  const handleVehiclePanle = (e) => {
    setVehiclePanel(true);
    setPanelOpen(false);
  }

  return (
    <div className='px-3 flex flex-col items-center'>
      {exampleLocations.map((ele, index) => (
      <div key={index} onClick={handleVehiclePanle} className="flex gap-4 items-center justify-start my-2 p-2 border-2 rounded-xl active:border-black border-gray-100 cursor-pointer">
        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{ele}</h4>
      </div>
      ))}
      
      
    </div>
  )
}
