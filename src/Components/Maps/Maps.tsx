import React from 'react';
import '../text.css'; 
import './Maps.css'

const Maps = () => {
  return (
    <div className="maps-container">
      {/* Левая часть — карта */}
      <div className="maps-left">
        <iframe
          src="https://yandex.ru/map-widget/v1/org/dvorets_kultury_rossiya/194032926432/?ll=45.968832%2C51.579844&z=16"
          width="100%"
          height="456px"
          style={{ borderRadius: '20px', border: 0 }}
          title="Карта ДК Россия, Саратов"
          allowFullScreen
        />
      </div>

      
      <div className="maps-right">
        
        <div className="textabout1">
          <p> Без выходных 09:00 - 19:00</p>
          <p className="phone">+7 (987) 80-806-422</p>
          <p className="address"> Адрес: площадь имени В.И. Ленина, 1</p>
          
        </div>

        <div className="soc-seti">
        <img className="icon" src="/instagram.png" alt="Награды" />
        <img className="icon" src="/telegram.png" alt="Награды" />
        <img className="icon" src="/whatsapp.png" alt="Награды" />
        <img className="icon" src="/vk.png" alt="Награды" />
        </div>


       </div>
       </div>
  );
}
    export default Maps;