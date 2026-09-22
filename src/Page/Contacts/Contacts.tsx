import React from 'react';
import './Contacts.css';
import '../../Components/Maps/Maps.css';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="about-competition">
        <div className="container">
          {/* Левая часть — текст */}
          <div className="left-content">
            <h1>Контакты</h1>
            
            <p className="description">
            Телефон для связи с оргкомитетом конкурса: +7 987 80 86 422<br/>
            Дарья: e-mail: dasha.voevodina07@mail.ru.<br/>
            Рабочие часы: с 9:00 до 18:00 (пн. — пт.)<br/>
            Важно: для подтверждения участия в конкурсе необходимо связаться с оргкомитетом за 2-3 недели до проведения конкурса.
            </p>


          </div>
          </div>

          {/* Правая часть — карта */}
            <div className="maps-container">
            <div className="right-content">
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
        </div>
      </div>
    </>
  );
};

export default Contacts;