import React from 'react';
import "./Cards.css"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)

const Cards = () => {

  const cardsData = [
    {
      id: 1,
      title: "Dordoi Plaza",
      imageUrl: "https://static.tildacdn.one/tild6263-3832-4239-a137-323934346431/__.png",
      description: "It offers shops, restaurants, cafes and office space, becoming an important shopping and leisure destination in the city.",
      color: "#009688"
    },
    {
      id: 2,
      title: "Modern University",
      imageUrl: "https://salymbekov.com/wp-content/uploads/2020/12/cropped-2.png",
      description: "The university is equipped with the most advanced equipment for securing educational materials",
      color: "#FF3E7F"
    },
    {
      id: 3,
      title: "Football club \"Dordoi\"",
      imageUrl: "https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png",
      description: "He is a multiple champion and winner of the National Cup, and also regularly participates in international tournaments.",
      color: "#03A9F4"
    }
  ];

  return (
    <div className="card-container">
      {cardsData.map((card) => (
        <div 
          key={card.id} 
          className="card"
          style={{ '--clr': card.color }}
        >
          <div className="img-box">
            <p className='text-center'><img src={card.imageUrl} alt={card.title} /></p>
            
          </div>
          <div className="content">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <a href="#">Read More</a>
          </div>
        </div>
      ))}
    </div>

  );
};

export default Cards;
