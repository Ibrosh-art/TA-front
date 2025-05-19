import React, { useState, useEffect } from 'react';
import './Cards.css';

const Cards = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const cardsData = [
    {
      id: 1,
      title: "Дордой Плаза",
      imageUrl: "https://static.tildacdn.one/tild6263-3832-4239-a137-323934346431/__.png",
      mobileImageUrl: "https://static.tildacdn.one/tild6263-3832-4239-a137-323934346431/__-mobile.png", // Оптимизированная версия
      description: "Магазины, рестораны, кафе и офисные помещения — важное место для шопинга и отдыха в городе.",
      color: "#009688"
    },
    {
      id: 2,
      title: "Университет",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXfrFBx8usjrJX539FzYp-1H1lml9n6Og-Q&s",
      mobileImageUrl: "https://example.com/university-mobile.jpg", // Оптимизированная версия
      description: "Университет оснащён передовым оборудованием для качественного образовательного процесса.",
      color: "#FF3E7F"
    },
    {
      id: 3,
      title: "Футбольный клуб «Дордой»",
      imageUrl: "https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png",
      mobileImageUrl: "https://example.com/fc-dordoi-mobile.png", // Оптимизированная версия
      description: "Многократный чемпион и обладатель национального кубка, регулярно участвует в международных турнирах.",
      color: "#03A9F4"
    }
  ];

  return (
    <div className={`card-container ${isMobile ? 'mobile' : ''}`}>
      {cardsData.map((card) => (
        <div key={card.id} className="card" style={{ '--clr': card.color }}>
          <div className="img-box">
            <img 
              src={isMobile && card.mobileImageUrl ? card.mobileImageUrl : card.imageUrl} 
              alt={card.title}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="content">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <a href="#" className="read-more-btn">Подробнее</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;