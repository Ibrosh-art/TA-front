import React from 'react';
import './Links.css';
import Logo from '../../public/img/logo.png'

const Links = () => {
  return (
    <div className="App  p-4">
      <header className="App-header">
      <img src={Logo} className='rounded-lg w-[45px] h-[45px] mr-[-260px]' alt="" />

        <div className="logo ml-[20px]">
            
          <h1  className=' text-blue-500'>SALYMBEKOV UNIVERSITY</h1>
          <p>Prosperity through education</p>
          <p>address: 3 Fuchika, Bishkek</p>
          <p>tel:+996312658538</p>
          <p>email: info@salymbekov.com</p>
        </div>
        <div className="useful-links ">
          <h2 className=' text-blue-500'>USEFUL LINKS</h2>
          <ul>
            <li> <a href="" className='Link_a'>Dordoi Plaza</a></li>
            <li><a href="" className='Link_a'>Cinematica</a></li>
            <li>MES KR</li>
            <li>MH KR</li>
          </ul>
        </div>
        <div className="departments ">
          <h2 className=' text-blue-500'>DEPARTMENTS</h2>
          <ul>
            <li>International Faculty of Medicine</li>
            <li>International College of IT and Business</li>
            <li>Salymbekov Business School</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Links;