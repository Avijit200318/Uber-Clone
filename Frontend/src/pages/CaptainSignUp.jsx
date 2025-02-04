import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CaptainSignUp() {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatedData = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.color,
        plate: formData.plate,
        capacity: formData.capacity,
        vehicleType: formData.vehicleType,
      },
    };

    try{
      setLoading(true);
      setError(null);
      const res = await fetch("/api/captains/signUp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatedData),
      });

      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        setError(data.message);
        console.log(error)
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate('/captain-login');
    }catch(error){
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div className="">
        <img src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" className="w-16 mb-2" />
        <form className="p-3" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-2">What's your name</h3>
          <div className="flex gap-2 mb-7">
            <input type="text" required placeholder='First Name' className="bg-[#eeeeee] rounded px-4 py-2 w-36 border text-lg placeholder:text-base" id='firstName' onChange={handleChange} />
            <input type="text" required placeholder='Last Name' className="bg-[#eeeeee] rounded px-4 py-2 w-36 border text-lg placeholder:text-base" id='lastName' onChange={handleChange} />

          </div>
          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input type="email" required placeholder='captain@example.com' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='email' onChange={handleChange} />
          <h3 className='text-lg font-semibold mb-2'>Password</h3>
          <input type="password" required placeholder='password' className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7" id='password' onChange={handleChange} />
          <h3 className='text-lg font-semibold mb-2'>Vehicle Information</h3>
          <div className="flex gap-2">
            <input type="text" required placeholder='Color' className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base mb-7" id='color' onChange={handleChange} />
            <input type="text" required placeholder='Plate' className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base mb-7" id='plate' onChange={handleChange} />
          </div>
          <div className="flex gap-1">
            <input type="number" required placeholder='Capacity' className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base mb-7" id='capacity' onChange={handleChange} />
            <select id="vehicleType" className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base mb-7' onChange={handleChange}>
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg font-semibold mb-2'>Create Captain Account</button>
        </form>
        <p className="text-center font-semibold">Already have a captain account? <Link className='text-blue-500' to='/captain-login'>Login</Link></p>
        {error && <p className='font-bold text-red-700 my-3 text-center'>{(error && !Array.isArray(error))? error : "Please Enter Valid Captain Details"}</p>}
      </div>
      
      {/* <div className="p-3">
          <Link to='/captain-signup' className="bg-[#10b461] flex items-center justify-center text-white rounded px-4 py-2 border w-full text-lg font-semibold">Sign In as Captain</Link>
        </div> */}
      <p className="text-xs text-justify mt-2">We collect basic information and uploaded images to provide services and improve accuracy.Your data is secure, used only for analysis, and not shared without consent. using AgriScan, you agree to this policy.For questions, contact us at <span className="underline cursor-pointer">uberproject@gmail.com</span>.</p>
    </div>
  )
}
