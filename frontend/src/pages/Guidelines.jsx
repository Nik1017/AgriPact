import React from 'react';
import { useNavigate } from 'react-router-dom';
import videoPic from '../assets/videoPic2.png';

function Guidelines() {
  const navigate = useNavigate();

  return (
    <div className='mb-10 p-12 bg-green-600 w-full h-screen relative overflow-hidden block'>
      <h1 className='text-4xl font-bold uppercase mb-4 text-center'>How AgriPact Works ?? </h1>
      <p className='text-md font-medium uppercase mb-4 text-white text-center'>Take a Look at our Platform Demo</p>

      <div className='flex justify-around items-center text-white mediaQuery'>
        <div className='grow'>
          <ul className='list-decimal list-inside ml-[90px]'>
            <li className='text-2xl mr-4 my-4'>Signup to the platform</li>
            <li className='text-2xl mr-4 my-4'>Post your work for the crops.</li>
            <li className='text-2xl mr-4 my-4'>Provide details as your convenience</li>
            <li className='text-2xl mr-4 my-4'>Explore and filter lists of crops.</li>
            <li className='text-2xl mr-4 my-4'>Check an available crops for your need.</li>
            <li className='text-2xl mr-4 my-4'>Chat with the owner and make a booking..</li>
            <li className='text-2xl mr-4 my-4'>Stay updated by Your own login id.</li>
          </ul>
        </div>

        <div className="h-1/2 w-1/2">
          <img src={videoPic} alt="" />
        </div>
      </div>

      {/* Back Button */}
      <div className='text-center mt-8'>
        <button
          onClick={() => navigate('/')}
          className='px-6 py-3 bg-white text-green-700 font-semibold rounded-xl shadow-md hover:bg-green-100 transition'
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Guidelines;