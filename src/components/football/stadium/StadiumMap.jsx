import React from 'react';

const StadiumMap = ({ coordinates }) => {
  // В реальном проекте здесь будет использоваться react-leaflet или Google Maps API
  // Для примера используем простую иллюстрацию
  
  return (
    <div className="h-80 bg-gray-200 rounded-lg overflow-hidden shadow-md">
      {/* Это заглушка, которую следует заменить на реальную карту */}
      <div className="h-full flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <div className="inline-block mb-2">
            <svg className="w-10 h-10 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-blue-900 font-semibold">
            Координаты: {coordinates[0]}, {coordinates[1]}
          </p>
          <p className="text-gray-600 mt-2">
            Здесь будет интерактивная карта стадиона
          </p>
        </div>
      </div>
      
      {/* Код для реальной карты с помощью react-leaflet */}
      {/* 
      import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
      
      <MapContainer center={coordinates} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates}>
          <Popup>
            Стадион Дордой
          </Popup>
        </Marker>
      </MapContainer>
      */}
    </div>
  );
};

export default StadiumMap;
