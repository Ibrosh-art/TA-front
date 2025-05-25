import React, { useEffect, useRef } from 'react';

const StadiumMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';
    script.onload = () => {
      window.DG.then(function () {
        const map = window.DG.map(mapRef.current, {
          center: [42.888217, 74.609938],
          zoom: 16,
        });

        window.DG.marker([42.888217, 74.609938])
          .addTo(map)
          .bindPopup(`
            <strong>Футбольный клуб Дордой</strong><br/>
            <a href="https://2gis.kg/bishkek/firm/70000001020312413/74.609925,42.888217?m=74.609938,42.888217/15.99" 
               target="_blank" 
               rel="noopener noreferrer">
              Открыть в 2GIS
            </a>
          `);
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="h-80 bg-gray-200 rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
};

export default StadiumMap;
