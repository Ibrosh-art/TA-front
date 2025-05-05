import { TiLocationArrow } from "react-icons/ti";
import React from 'react';
import Button from "../Button";

const Hero = (props) => {
 

  return (
    <>
    <div className="flex h-[80vh] w-full justify-around ">
      
        
              <div className="mt-24 px-5 sm:px-10">
                <h1 className="h1_hero special-font hero-heading text-blue-100 drop-shadow-md">
                  DORD<b></b>OI
                </h1>

                <p className="mb-5 max-w-64 font-robert-regular text-blue-100 drop-shadow-md">
                  Discover the future of the world <br /> With Dordoi association
                </p>

                <Button
                  id="watch-trailer"
                  title="Watch trailer"
                  leftIcon={<TiLocationArrow />}
                  containerClass="bg-yellow-300 flex-center gap-1"
                />
            
              </div>

    
          <div className="flex mt-20">
            <video autoPlay loop muted  className="border-blue-500 border w-[55vw] object-cover object-center h-[80%] rounded-3xl">
              <source src={props.src} type="video/mp4"/>
            </video>
            
          </div>
    </div>
    </>
  );
};

export default React.memo(Hero);