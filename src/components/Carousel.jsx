import React from "react";
import "./Carousel.css"; // Подключаем CSS

const Carousel = () => {
  return (
    <div className="carousel">

   
      <div className="carousel-track">
        <div className="carousel-slide">
          <img src="https://salymbekov.com/wp-content/uploads/2023/02/bc0b2640-1920x1008.jpg" alt="Slide 1" />
        </div>
        <div className="carousel-slide">
          <img src="https://salymbekov.com/wp-content/uploads/2023/02/bc0b2640-1920x1008.jpg" alt="Slide 1" />
        </div>
        <div className="carousel-slide">
          <img src="https://salymbekov.com/wp-content/uploads/2023/02/bc0b2640-1920x1008.jpg" alt="Slide 2" />
        </div>
        
      </div>
    </div>
  );
};

export default Carousel;
