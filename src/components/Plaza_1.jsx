import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiChevronLeft, FiMapPin, FiPhone, FiMail, FiClock, FiShoppingBag, FiCoffee, FiFilm, FiMusic, FiGift } from 'react-icons/fi';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    title: 'Весенние скидки до 50%!',
    description: 'Только в Dordoi Plaza с 1 по 30 мая',
    cta: 'Узнать больше',
    ctaLink: '#promotions'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    title: 'Новый кинотеатр в Dordoi Plaza',
    description: 'Смотрите новинки кино с комфортом',
    cta: 'Расписание сеансов',
    ctaLink: '#events'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    title: 'Фудкорт с новыми ресторанами',
    description: 'Попробуйте блюда разных кухонь мира',
    cta: 'Посмотреть меню',
    ctaLink: '#restaurants'
  },
];

const stores = [
  {
    id: '1',
    name: 'Fashion House',
    category: 'Одежда',
    description: 'Модная одежда для всей семьи от ведущих мировых брендов',
    hours: '10:00 - 22:00',
    location: '2 этаж, секция B12',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    logo: 'https://i.ibb.co/JkJ3nXr/fashion-house.jpg',
    rating: 4.8,
    promo: 'Скидка 30% на зимнюю коллекцию'
  },
  {
    id: '2',
    name: 'TechWorld',
    category: 'Электроника',
    description: 'Современная электроника и гаджеты от Apple, Samsung, Xiaomi и других брендов',
    hours: '10:00 - 22:00',
    location: '1 этаж, секция A5',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    logo: 'https://i.ibb.co/0jF9LqS/techworld.jpg',
    rating: 4.9,
    promo: 'Бесплатная доставка при покупке от 10,000 сом'
  },
  {
    id: '3',
    name: 'Sweet Corner',
    category: 'Еда',
    description: 'Вкусные сладости и десерты ручной работы от лучших кондитеров',
    hours: '10:00 - 22:00',
    location: '1 этаж, секция C3',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    logo: 'https://i.ibb.co/6X0Gq9h/sweet-corner.jpg',
    rating: 4.7,
    promo: 'Бесплатный кофе при покупке от 500 сом'
  },
  {
    id: '4',
    name: 'SportsLife',
    category: 'Спорт',
    description: 'Спортивная одежда и инвентарь для профессиональных атлетов и любителей',
    hours: '10:00 - 22:00',
    location: '3 этаж, секция D7',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    logo: 'https://i.ibb.co/0jF9LqS/techworld.jpg',
    rating: 4.6,
    promo: 'Скидка 20% на кроссовки'
  },
  {
    id: '5',
    name: 'BeautyZone',
    category: 'Красота',
    description: 'Косметика и парфюмерия премиум класса от мировых брендов',
    hours: '10:00 - 22:00',
    location: '2 этаж, секция A2',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    logo: 'https://i.ibb.co/6X0Gq9h/sweet-corner.jpg',
    rating: 4.8,
    promo: 'Подарок при покупке от 3000 сом'
  },
  {
    id: '6',
    name: 'KidsLand',
    category: 'Дети',
    description: 'Все для детей: одежда, игрушки, товары для школы и творчества',
    hours: '10:00 - 22:00',
    location: '3 этаж, секция E1',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2085&q=80',
    logo: 'https://i.ibb.co/JkJ3nXr/fashion-house.jpg',
    rating: 4.9,
    promo: 'Скидка 15% на школьные принадлежности'
  },
];

const events = [
  {
    id: 'e1',
    title: 'Концерт группы «Нурлан»',
    date: '2025-05-20',
    time: '18:00',
    description: 'Живой концерт популярной группы в холле ТЦ. В программе хиты и новые песни.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Концерт',
    price: 'Бесплатно',
    location: 'Центральный атриум'
  },
  {
    id: 'e2',
    title: 'Выставка современного искусства',
    date: '2025-05-25',
    time: '10:00 - 20:00',
    description: 'Экспозиция работ молодых художников Кыргызстана. Инсталляции, живопись, скульптура.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    category: 'Выставка',
    price: '300 сом',
    location: 'Галерея на 3 этаже'
  },
  {
    id: 'e3',
    title: 'Детский мастер-класс по рисованию',
    date: '2025-05-30',
    time: '14:00',
    description: 'Приглашаем детей от 5 до 12 лет на творческий урок с профессиональными художниками.',
    image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80',
    category: 'Мастер-класс',
    price: '500 сом',
    location: 'Детская зона, 2 этаж'
  },
];

const promotions = [
  {
    id: 'p1',
    title: 'Скидка 30% на всю одежду',
    description: 'Акция действует с 1 по 15 мая в магазине Fashion House. Не упустите возможность обновить гардероб!',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    store: 'Fashion House',
    validUntil: '2025-05-15',
    code: 'SPRING30'
  },
  {
    id: 'p2',
    title: 'Купи 1 гаджет - получи скидку на второй',
    description: 'Специальное предложение в TechWorld до конца месяца. При покупке любого гаджета получите скидку 20% на второй товар.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    store: 'TechWorld',
    validUntil: '2025-05-31',
    code: 'TECH20'
  },
  {
    id: 'p3',
    title: 'Бесплатный десерт при заказе в Sweet Corner',
    description: 'Акция действует по будням с 12:00 до 15:00. При заказе от 1000 сом получите фирменный десерт в подарок!',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    store: 'Sweet Corner',
    validUntil: '2025-05-31',
    code: 'SWEETGIFT'
  },
];

const restaurants = [
  {
    id: 'r1',
    name: 'Coffee Time',
    description: 'Кофейня с лучшими сортами кофе и десертами. Уютная атмосфера и бесплатный Wi-Fi.',
    hours: '08:00 - 22:00',
    location: '1 этаж, секция D1',
    menu: ['Капучино', 'Латте', 'Круассан', 'Чизкейк', 'Эклеры', 'Фреш'],
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    rating: 4.9,
    cuisine: 'Кофейня',
    priceRange: '$$'
  },
  {
    id: 'r2',
    name: 'Sushi Bar',
    description: 'Свежие суши и роллы на любой вкус. Японская кухня от шеф-повара из Токио.',
    hours: '11:00 - 22:00',
    location: '1 этаж, секция D3',
    menu: ['Калифорния', 'Филадельфия', 'Унаги', 'Мисо суп', 'Темпура', 'Сашими'],
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80',
    rating: 4.8,
    cuisine: 'Японская',
    priceRange: '$$$'
  },
  {
    id: 'r3',
    name: 'Burger Nation',
    description: 'Лучшие бургеры в городе с авторскими соусами и свежими ингредиентами.',
    hours: '10:00 - 23:00',
    location: '1 этаж, секция D5',
    menu: ['Чизбургер', 'Бекон бургер', 'Вегетарианский', 'Картофель фри', 'Молочные коктейли'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80',
    rating: 4.7,
    cuisine: 'Американская',
    priceRange: '$$'
  },
];

const faq = [
  {
    id: 'f1',
    question: 'Есть ли банкоматы в ТЦ?',
    answer: 'Да, в торговом центре расположено несколько банкоматов разных банков. Основные банкоматы находятся на первом этаже возле главного входа и в фудкорте.',
    icon: <FiShoppingBag />
  },
  {
    id: 'f2',
    question: 'Где можно оставить ребенка?',
    answer: 'В ТЦ есть детская игровая зона на втором этаже с профессиональными аниматорами. Также работает детская комната, где можно оставить ребенка под присмотром на 2 часа.',
    icon: <FiGift />
  },
  {
    id: 'f3',
    question: 'Можно ли приходить с животными?',
    answer: 'Вход с животными разрешен только в переносках и при соблюдении правил гигиены. В фудкорте и детских зонах нахождение с животными запрещено.',
    icon: <FiCoffee />
  },
  {
    id: 'f4',
    question: 'Есть ли кинотеатр в ТЦ?',
    answer: 'Да, современный кинотеатр с 5 залами работает на 4 этаже. В кинотеатре показывают новинки мирового проката в 2D и 3D форматах.',
    icon: <FiFilm />
  },
  {
    id: 'f5',
    question: 'Где можно посмотреть расписание мероприятий?',
    answer: 'Расписание всех мероприятий доступно на нашем сайте в разделе "События", а также на информационных стойках в ТЦ и в мобильном приложении Dordoi Plaza.',
    icon: <FiMusic />
  },
];

const categories = [
  { name: 'Все', icon: <FiShoppingBag /> },
  { name: 'Одежда', icon: <FiShoppingBag /> },
  { name: 'Электроника', icon: <FiShoppingBag /> },
  { name: 'Еда', icon: <FiCoffee /> },
  { name: 'Спорт', icon: <FiShoppingBag /> },
  { name: 'Красота', icon: <FiShoppingBag /> },
  { name: 'Дети', icon: <FiShoppingBag /> },
];

const HeroSlider = ({ slides, currentSlide, setCurrentSlide }) => {
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen max-h-[800px] rounded-xl overflow-hidden shadow-2xl mb-16">
      <AnimatePresence initial={false} custom={currentSlide}>
        {slides.map((slide, i) => (
          i === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end items-start p-12 text-white">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-2xl"
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
                  <p className="text-xl md:text-2xl mb-6 drop-shadow-md">{slide.description}</p>
                  <a 
                    href={slide.ctaLink} 
                    className="inline-block bg-white text-blue-900 hover:bg-blue-100 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {slide.cta}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm z-20 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm z-20 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const StoreCard = ({ store }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={store.image} 
          alt={store.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow">
          <span className="text-yellow-500 font-bold">{store.rating}</span>
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h4 className="text-xl font-bold text-gray-900">{store.name}</h4>
          <div className="flex -space-x-2">
            <img 
              src={store.logo} 
              alt={`${store.name} logo`} 
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          </div>
        </div>
        <p className="text-gray-600 mb-4">{store.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <FiClock className="text-blue-500" />
          <span>{store.hours}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <FiMapPin className="text-blue-500" />
          <span>{store.location}</span>
        </div>
        
        {store.promo && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-blue-800 font-medium text-sm">{store.promo}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const EventCard = ({ event }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h4 className="text-xl font-bold text-white">{event.title}</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {event.category}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {event.price}
          </span>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{event.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiMapPin className="text-blue-500" />
          <span>{event.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

const PromotionCard = ({ promotion }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={promotion.image} 
          alt={promotion.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          Акция
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{promotion.title}</h4>
        <p className="text-gray-600 mb-4">{promotion.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{promotion.store}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>до {promotion.validUntil}</span>
          </div>
        </div>
        
        {promotion.code && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex justify-between items-center">
            <span className="text-yellow-800 font-medium">Промокод: <strong>{promotion.code}</strong></span>
            <button className="text-yellow-700 hover:text-yellow-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const RestaurantCard = ({ restaurant }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow">
          <span className="text-yellow-500 font-bold">{restaurant.rating}</span>
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h4>
        <p className="text-gray-600 mb-4">{restaurant.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {restaurant.cuisine}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {restaurant.priceRange}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <FiClock className="text-blue-500" />
          <span>{restaurant.hours}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <FiMapPin className="text-blue-500" />
          <span>{restaurant.location}</span>
        </div>
        
        <div className="mb-4">
          <h5 className="font-medium text-gray-900 mb-2">Популярные блюда:</h5>
          <div className="flex flex-wrap gap-2">
            {restaurant.menu.slice(0, 4).map((item, i) => (
              <span key={i} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {item}
              </span>
            ))}
            {restaurant.menu.length > 4 && (
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                +{restaurant.menu.length - 4} ещё
              </span>
            )}
          </div>
        </div>
        
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01]">
          Посмотреть меню
        </button>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ item, isActive, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => onClick(item.id)}
        className={`w-full text-left px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
          isActive ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
        }`}
        aria-expanded={isActive}
      >
        <div className="flex items-center gap-4">
          <span className={`p-2 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-600'}`}>
            {item.icon}
          </span>
          <span className="font-medium">{item.question}</span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-4 bg-white text-gray-700"
        >
          {item.answer}
        </motion.div>
      )}
    </div>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center"
        role="alert"
      >
        <p className="font-bold">Спасибо за ваше сообщение!</p>
        <p>Мы свяжемся с вами в ближайшее время.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="name" className="block font-medium mb-2 text-gray-700">Имя:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      </motion.div>
      
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <label htmlFor="email" className="block font-medium mb-2 text-gray-700">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      </motion.div>
      
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <label htmlFor="message" className="block font-medium mb-2 text-gray-700">Сообщение:</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      </motion.div>
      
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
      >
        Отправить сообщение
      </motion.button>
    </motion.form>
  );
};

const MapSection = () => {
  return (
    <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-16">
      <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Мы находимся здесь</h3>
          <p className="text-gray-700 mb-4">
            ул. Ибраимова 115, Бишкек, Кыргызстан
          </p>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
            <a href="https://2gis.kg/bishkek/directions/points/%7C74.617938%2C42.873855%3B70000001019340049">Построить маршрут</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DordoiPlazaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [storeFilter, setStoreFilter] = useState('Все');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredStores = storeFilter === 'Все' ? stores : stores.filter(s => s.category === storeFilter);

  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <HeroSlider slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-900">Dordoi Plaza</h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-700 mb-8">
            Современный торгово-развлекательный центр в Бишкеке с более чем 200 магазинами, кинотеатром, фудкортом и зоной развлечений
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-blue-600 text-2xl mb-2">
                <FiShoppingBag />
              </div>
              <p className="font-bold">200+</p>
              <p className="text-sm text-gray-500">Магазинов</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-blue-600 text-2xl mb-2">
                <FiCoffee />
              </div>
              <p className="font-bold">30+</p>
              <p className="text-sm text-gray-500">Кафе</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-blue-600 text-2xl mb-2">
                <FiFilm />
              </div>
              <p className="font-bold">5</p>
              <p className="text-sm text-gray-500">Кинозалов</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-blue-600 text-2xl mb-2">
                <FiClock />
              </div>
              <p className="font-bold">12</p>
              <p className="text-sm text-gray-500">Часов</p>
            </div>
          </div>
        </motion.section>

        <section id="stores" className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900">Магазины</h3>
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {categories.map(cat => (
                <motion.button
                  key={cat.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStoreFilter(cat.name)}
                  className={`px-4 py-2 rounded-full font-medium transition flex items-center gap-2 ${
                    storeFilter === cat.name 
                      ? 'bg-blue-700 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </motion.button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </motion.div>
        </section>

        <section id="events" className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900">События и мероприятия</h3>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Развлекательные программы, концерты, выставки и мастер-классы для всей семьи
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </motion.div>
        </section>

        <section id="promotions" className="mb-24 bg-gradient-to-r from-blue-900 to-blue-700 p-12 rounded-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">Акции и скидки</h3>
            <p className="text-xl text-center text-blue-100 mb-12 max-w-3xl mx-auto">
              Специальные предложения от магазинов Dordoi Plaza
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promotions.map(promo => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </motion.div>
        </section>

        <section id="restaurants" className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900">Рестораны и кафе</h3>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              От кофе и десертов до полноценных обедов - выберите то, что вам по вкусу
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map(r => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </motion.div>
        </section>

        <MapSection />

        <section className="mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900">Часто задаваемые вопросы</h3>
            <div className="space-y-4">
              {faq.map(item => (
                <FAQItem 
                  key={item.id} 
                  item={item} 
                  isActive={activeFAQ === item.id} 
                  onClick={setActiveFAQ} 
                />
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contacts" className="mb-24 bg-white p-12 rounded-3xl shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900">Контакты и обратная связь</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Адрес</h4>
                      <p className="text-gray-600">ул. Ибраимова 115, Бишкек, Кыргызстан</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <FiPhone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Телефон</h4>
                      <p className="text-gray-600">+996 770 901 212</p>
                      <p className="text-gray-600">+996 312 901 212</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Email</h4>
                      <p className="text-gray-600">info@dordoiplaza.kg</p>
                      <p className="text-gray-600">marketing@dordoiplaza.kg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <FiClock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Часы работы</h4>
                      <p className="text-gray-600">Ежедневно с 10:00 до 22:00</p>
                      <p className="text-gray-600">Фудкорт до 23:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </section>
    <footer className="bg-[#1e2a38] text-white py-12 rounded-t-3xl">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
      <div>
        <h4 className="text-xl font-bold mb-4 text-[#5dade2]">Dordoi Plaza</h4>
        <p className="text-[#a9cce3]">
          Современный торгово-развлекательный центр в сердце Бишкека
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#5dade2]">Магазины</h4>
        <ul className="space-y-2 text-[#7fb3d5]">
          <li><a href="#" className="hover:text-[#85c1e9] transition">Все магазины</a></li>
          <li><a href="#" className="hover:text-[#85c1e9] transition">Новые магазины</a></li>
          <li><a href="#" className="hover:text-[#85c1e9] transition">Арендаторам</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#5dade2]">Посетителям</h4>
        <ul className="space-y-2 text-[#7fb3d5]">
          <li><a href="#" className="hover:text-[#85c1e9] transition">События</a></li>
          <li><a href="#" className="hover:text-[#85c1e9] transition">Акции</a></li>
          <li><a href="#" className="hover:text-[#85c1e9] transition">Карта ТЦ</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#5dade2]">Контакты</h4>
        <ul className="space-y-2 text-[#7fb3d5]">
          <li className="flex items-center gap-2"><FiMapPin className="text-[#85c1e9]" /> ул. Ибраимова 115</li>
          <li className="flex items-center gap-2"><FiPhone className="text-[#85c1e9]" /><a href="tel:+996770901212" className="hover:text-[#85c1e9] transition">+996 770 901 212</a></li>
          <li className="flex items-center gap-2"><FiMail className="text-[#85c1e9]" /><a href="mailto:info@dordoiplaza.kg" className="hover:text-[#85c1e9] transition">info@dordoiplaza.kg</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-[#3a5f8a] pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-[#a9cce3]">© 2025 Dordoi Plaza, Бишкек. Все права защищены.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="#" className="text-[#7fb3d5] hover:text-[#85c1e9] transition">Политика конфиденциальности</a>
        <a href="#" className="text-[#7fb3d5] hover:text-[#85c1e9] transition">Условия использования</a>
      </div>
    </div>
  </div>
</footer>
      </div>
    </div>
  );
}