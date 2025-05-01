import React from 'react'
import logo from './assets/logo.png'
import { useState,useEffect } from 'react';
import { banner } from './ const';
import { TfiShiftRightAlt } from "react-icons/tfi";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banner.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const currentSlide = banner[currentIndex];
return (
    <>
            <div className='w-full h-[80vh] flex flex-col'>
                    <div className='w-full h-[20vh] flex items-center bg-blue-600 justify-center gap-10 '>
                            <h1 className='text-5xl font-bold text-white italic'>FC Dordoi </h1>
                            <img src={logo} className='w-20' alt="" />
                    </div>


                    <div className='background w-full h-[80vh] flex items-center justify-between bg-black'
                    ststyle={{ backgroundImage: `url(${currentSlide.image})` }}
                    >

                            <div className='h-[50vh] w-[2vw] bg-yellow-500 items-center justify-center flex'>
                                
                            </div>
                            <i><p className='text-white'>{currentSlide.title}</p></i>
                            <div className='h-[50vh] w-[2vw] bg-blue-600 items-center justify-center flex'>
                             <TfiShiftRightAlt/>
                            </div>
                    </div>
            </div>
    </>
)
}

export default Banner