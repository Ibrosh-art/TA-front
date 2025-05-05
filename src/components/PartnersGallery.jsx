import React, { useState } from 'react';
import './PartnersGallery.css';
import { FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
const PartnersGallery = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const partners = [
    {
      id: 1,
      name: "Tech Giants Inc.",
      category: "Технологии",
      logo: "/logos/tech-giants.svg",
      description: "Мировой лидер в области искусственного интеллекта и облачных решений",
      collaboration: "Совместные лаборатории, стажировки, исследовательские гранты",
      link: "https://techgiants.com"
    },
    {
      id: 2,
      name: "Global Design Studio",
      category: "Дизайн",
      logo: "/logos/global-design.svg",
      description: "Инновационная дизайн-студия, работающая с Fortune 500 компаниями",
      collaboration: "Образовательные программы, менторство, конкурсы талантов",
      link: "https://globaldesign.com"
    },
    {
      id: 3,
      name: "MediCare International",
      category: "Медицина",
      logo: "/logos/medicare.svg",
      description: "Сеть современных медицинских центров с передовыми технологиями",
      collaboration: "Клиническая практика, совместные исследования, оборудование",
      link: "https://medicare.org"
    },
    {
      id: 4,
      name: "Quantum Innovations",
      category: "Наука",
      logo: "/logos/quantum.svg",
      description: "Пионеры в области квантовых вычислений и нанотехнологий",
      collaboration: "Фундаментальные исследования, доступ к суперкомпьютерам",
      link: "https://quantum.tech"
    }
  ];

  return (
    <div className="partners-gallery">
      <div className="gallery-header">
        <h2>Стратегические <span>партнеры</span></h2>
        <p>Компании, которые помогают нам создавать будущее</p>     
    <img src={photo} alt="" className='mt-[50px]' />
      <div className="gallery-footer">
        <p>Хотите стать партнером?</p>
        <button className="cta-button">Отправить заявку</button>
      </div>
    </div>
    </div>
  );
};

export default PartnersGallery;