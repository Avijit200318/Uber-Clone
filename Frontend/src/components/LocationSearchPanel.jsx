import React from 'react';

export default function LocationSearchPanel({setPanelOpen, setVehiclePanel, suggestion, activeField, setPickup, setDestination, setSuggestion}) {

  const handleVehiclePanle = (location) => {
    if(activeField){
      console.log("activeField", activeField);
      if(activeField === 'pickup'){
        setPickup(location);
      }else{
        setDestination(location);
        const textField = document.querySelector("#destination")
        // console.log("text: ", textField)
        textField.value = location.name;
      }
    }
    setSuggestion(null);
  }

  console.log("suggestion6: ", suggestion)


  return (
    <div className='px-3 flex flex-col items-center'>
      {suggestion && suggestion.map((ele, index) => (
      <div key={index} onClick={()=> handleVehiclePanle(ele)} className="flex gap-4 items-center justify-start my-2 p-2 border-2 rounded-xl active:border-black border-gray-100 cursor-pointer">
        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{ele.name}</h4>
      </div>
      ))}      
    </div>
  )
}
