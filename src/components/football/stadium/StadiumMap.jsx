import React from 'react';

const StadiumMap = () => {
  return (
    <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-16">
      {/* Карта Google Maps */}
      <iframe
        className="absolute inset-0 w-full h-full border-0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2921.9239614172545!2d74.6074429!3d42.8890317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dcf16c9f47%3A0x551d157049dfe2a1!2sFC%20Dordoi%20Bishkek!5e0!3m2!1sen!2skg!4v1717720000000!5m2!1sen!2skg"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Блок с адресом и кнопкой (поверх карты) */}
      <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:bottom-auto sm:top-6 bg-white bg-opacity-90 rounded-xl p-6 max-w-md shadow-lg">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Стадион «Дордой»</h3>
        <p className="text-gray-700 mb-4">
          ул. Ахунбаева, Бишкек, Кыргызстан
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
          <a
            href="https://2gis.kg/bishkek/geo/70000001028435341"
            target="_blank"
            rel="noopener noreferrer"
          >
            Построить маршрут
          </a>
        </button>
      </div>
    </div>
  );
};

export default StadiumMap;
