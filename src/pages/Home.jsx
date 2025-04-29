import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Story from '../components/Story';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Links from '../components/Links';
import Announcment from '../components/Announcment';
import close from '/img/close.svg';
import next2 from '/img/next2.jpg';
import next1 from '/img/next1.jpg';
import nextGlobal1 from '/img/nextGlobal1.png';
import nextGlobal2 from '/img/nextGlobal2.png';
import { VscMute } from "react-icons/vsc";
import NewFoot from "../components/NewFoot";


const Home = () => {
  const video = '/videos/hero-4.mp4';
  const [status, setStatus] = useState(0);
  const [btnCount, setBtnCount] = useState(0);
  const [storieCount, setStorieCount] = useState(0);

const stories = [
  [
    { type: 'video', src: '/videos/storie1/mp4'},
    { type: 'image', src: 'https://images.pexels.com/photos/2349168/pexels-photo-2349168.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { type: 'image', src: 'https://images.pexels.com/photos/2344997/pexels-photo-2344997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
  ],
  [
    { type: 'video', src: '/videos/storie1/mp4' },
    { type: 'image', src: 'https://images.pexels.com/photos/264512/pexels-photo-264512.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { type: 'image', src: 'https://images.pexels.com/photos/6151970/pexels-photo-6151970.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  [
    { type: 'image', src: 'https://images.pexels.com/photos/19271711/pexels-photo-19271711.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { type: 'image', src: 'https://images.pexels.com/photos/159684/soccer-football-soccer-player-sport-159684.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { type: 'video', src: '/videos/storie1/mp4' }
  ],
  [
    { type: 'image', src: 'https://images.pexels.com/photos/18420916/pexels-photo-18420916.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { type: 'video', src: '/videos/storie1/mp4' },
    { type: 'image', src: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  [
    { type: 'image', src: 'https://images.pexels.com/photos/18420916/pexels-photo-18420916.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { type: 'video', src: '/videos/storie1/mp4' },
    { type: 'image', src: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  [
    { type: 'image', src: 'https://images.pexels.com/photos/18420916/pexels-photo-18420916.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { type: 'video', src: '/videos/storie1/mp4' },
    { type: 'image', src: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  [
    { type: 'image', src: 'https://images.pexels.com/photos/18420916/pexels-photo-18420916.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { type: 'video', src: '/videos/storie1/mp4' },
    { type: 'image', src: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]
];

  const currentStory = stories[storieCount][btnCount];

  return (
      <div className={status ? 'status' : ''}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgMBgVMlXRAAAAAASUVORK5CYII=" className={status ? 'status' : ''} alt="" />
        <div className={status ? 'block' : 'hidden'}>
          <a href="#university">
          <button className={status ? 'active left-[61.5%]' : 'hidden'} onClick={() => { setStatus(0); }}>
              <img src={close} className='w-[4vw]' alt="Close" />
            </button> </a>
            <button className={status ? 'active left-[60.3%]' : 'hidden'}>
            <VscMute size={23}/>
            </button>
         
          <button
            className="next1"
            onClick={() => {
              if (btnCount > 0) {
                setBtnCount(btnCount - 1);
              } else if (storieCount > 0) {
                setStorieCount(storieCount - 1);
                setBtnCount(2);
              }
            }}
          >
            <img src={next2} alt="Previous" />
          </button>
          <button
            className="next2"
            onClick={() => {
              if (btnCount < 2) {
                setBtnCount(btnCount + 1);
              } else if (storieCount < stories.length - 1) {
                setStorieCount(storieCount + 1);
                setBtnCount(0);
              }
            }}
          >
            <img src={next1} alt="Next" />
          </button>
          <button className='nextGlobal1' onClick={() => { if (storieCount > 0) setStorieCount(storieCount - 1); }}><img src={nextGlobal1} alt="Previous Story" /></button>
          <button className='nextGlobal2' onClick={() => { setStorieCount(storieCount >= 6 ? 0 : storieCount + 1); }}><img src={nextGlobal2} alt="Next Story" /></button>

          <div className={status ? 'block' : 'hidden'}>
            {currentStory.type === 'video' ? (
              <video src={currentStory.src} controls muted autoPlay loop className='storie'></video>
            ) : (
              <img src={currentStory.src} alt="Story Content" className='storie' />
            )}
          </div>
        </div>

        <Hero src={video} />
        <Cards />
        <div>
          <h1 className='font-semibold text-3xl ml-[70px] mt-[70px]' id='head'>Dordoi Stories</h1>
          <div className='mt-[55px] ml-[10px] flex gap-5 overflow-y-hidden' id='all'>
            <img src="https://images.pexels.com/photos/264512/pexels-photo-264512.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" id='1' className='w-[200px] h-[400px] rounded-2xl' onClick={() => { setStatus(1); }} />
            <img src="https://images.pexels.com/photos/6151970/pexels-photo-6151970.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className='w-[200px] h-[400px] rounded-2xl' id='2' onClick={() => { setStatus(2); }} />
            <img src="https://images.pexels.com/photos/19271711/pexels-photo-19271711.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className='w-[200px] h-[400px] rounded-2xl' id='3' onClick={() => { setStatus(3); }} />
            <img src="https://images.pexels.com/photos/159684/soccer-football-soccer-player-sport-159684.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className='w-[200px] h-[400px] rounded-2xl' id='4' onClick={() => { setStatus(4); }} />
            <img src="https://images.pexels.com/photos/18420916/pexels-photo-18420916.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className='w-[200px] h-[400px] rounded-2xl' id='5' onClick={() => { setStatus(5); }} />
            <img src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className='w-[200px] h-[400px] rounded-2xl' id='6' onClick={() => { setStatus(6); }} />
            <img
            src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className='w-[200px] h-[400px] rounded-2xl' id='7' onClick={() => { setStatus(7); }} />
          </div>
        </div>

      <Announcment />
      <Features />
      
     <Story /> <NewFoot  />
      <Links />
      
      
    </div>
  );
};

export default Home;
