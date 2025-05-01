import { TiLocationArrow } from "react-icons/ti";
import React from 'react';
import Button from "./Button";
import '..//components/qqq.css'
// import VideoPreview from "./VideoPreview";

const Hero = (props) => {
 

  return (
    <div className="flex h-[100vh] w-full relative">
        <div>
                       
        
        <div className="size-full">
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
        </div>
      </div>

    
      <div>
        <video autoPlay loop muted  className=" w-[50vw] object-cover object-center rounded-3xl">
          <source src={props.src} type="video/mp4"/>
        </video>
        <h1 className="special-font hero-heading absolute bottom-5 drop-shadow-md">
        FUTURE
        </h1>

      </div>
    </div>
  );
};

export default React.memo(Hero);