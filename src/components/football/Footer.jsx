import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { BsTiktok } from 'react-icons/bs';


const Footer = () => {
    const [email, setEmail] = useState('');
    const currentYear = new Date().getFullYear();
    
    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle subscription logic here
        alert(`Спасибо за подписку: ${email}`);
        setEmail('');
    };

    const facebookURL = "https://www.facebook.com/FCDordoi/?locale=ru_RU"
    const instagramURL = "https://www.instagram.com/fcdordoi/"
    const youtubeURL = "https://www.youtube.com/@DordoiTV"
    const tiktokURL = "https://www.tiktok.com/@fcdordoi"

      
    return (
        <div className="footer-wrapper">
            {/* Pre-footer newsletter & social section */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Newsletter subscription */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold">Будьте в курсе событий!</h2>
                            <p className="text-gray-300">
                                Подпишитесь на наши обновления и следите за новостями клуба.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Ваш email"
                                    className="flex-grow p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleSubscribe}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold transition-colors duration-200"
                                >
                                    Подписаться
                                </button>
                            </div>
                        </div>
                        
                        {/* Social media links */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Соцсети</h3>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={facebookURL} target='_blank'
                                    className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-all duration-200 hover:scale-110"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={24} />
                                </a>
                                <a
                                    href={instagramURL} target='_blank'                                    
                                    className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-all duration-200 hover:scale-110"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={24} />
                                </a>
                                <a
                                href={youtubeURL} target='_blank'
                                    className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-all duration-200 hover:scale-110"
                                    aria-label="YouTube"
                                >
                                    <Youtube size={24} />
                                </a>   
                                <a
                                href={tiktokURL} target='_blank'
                                    className="bg-black p-3 rounded-full transition-all duration-200 hover:scale-110"
                                    aria-label="YouTube"
                                >
                                    <BsTiktok size={24} />
                                </a>                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main footer */}
            <footer className="bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Club Info */}
                        <div className="space-y-4">
                            <div className="mb-4">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png" 
                                    alt="FC Dordoi Logo" 
                                    className="h-16 w-auto" 
                                />
                            </div>
                            <p className="text-gray-400">
                                ФК «Дордой» — один из ведущих футбольных клубов Кыргызстана,
                                многократный чемпион страны и обладатель кубка.
                            </p>
                        </div>
                        
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700">О клубе</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#storiesPage" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                                        <ChevronRight size={16} className="mr-2" />
                                        <span>Сторисы</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#team" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                                        <ChevronRight size={16} className="mr-2" />
                                        <span>Команда</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#matches" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                                        <ChevronRight size={16} className="mr-2" />
                                        <span>Расписание матчей</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#newsfootball" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                                        <ChevronRight size={16} className="mr-2" />
                                        <span>Новости</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#stadium" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                                        <ChevronRight size={16} className="mr-2" />
                                        <span>Стадион</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        
                        
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700">Контакты</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <MapPin size={20} className="mr-3 text-blue-500 flex-shrink-0 mt-1" />
                                    <span className="text-gray-400">г. Бишкек, ул. Спортивная, 123</span>
                                </li>
                                <li className="flex items-center">
                                    <Phone size={20} className="mr-3 text-blue-500 flex-shrink-0" />
                                    <span className="text-gray-400">+996 (312) 123-456</span>
                                </li>
                                <li className="flex items-center">
                                    <Mail size={20} className="mr-3 text-blue-500 flex-shrink-0" />
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                        info@fcdordoi.kg
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Sponsors Section */}
                    
                </div>
                
                {/* Copyright Bar */}
                <div className="bg-gray-950 py-4">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <div>© {currentYear} ФК «Дордой». Все права защищены.</div>
                        <div className="flex mt-4 md:mt-0 space-x-4">
                            <a href="#" className="hover:text-white transition-colors duration-200">
                                Политика конфиденциальности
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-200">
                                Условия использования
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-200">
                                Политика cookies
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;