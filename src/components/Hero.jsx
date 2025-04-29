import { TiLocationArrow } from "react-icons/ti";
import React from 'react';
import Button from "./Button";
import '..//components/qqq.css'
// import VideoPreview from "./VideoPreview";

const Hero = (props) => {
 

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden min-h-screen">
        <div>
                       
        <h1 className="special-font hero-heading absolute bottom-5">
        FUTURE
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="h1_hero special-font hero-heading text-blue-100">
              DORD<b></b>OI
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Discover the future of the world <br /> With Dordoi association
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

    
      <div>
        <video autoPlay loop muted  className="absolute left-0 top-0 size-full object-cover object-center">
          <source src={props.src} type="video/mp4"/>
        </video>
      </div>
    </div>
  );
};

export default Hero;
