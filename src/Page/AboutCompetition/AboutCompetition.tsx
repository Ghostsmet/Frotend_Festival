import React from 'react';
import './AboutCompetition.css';
import '../../Components/Maps/Maps.css';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';

const AboutCompetition = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="about-competitionsss">
        <div className="container">
          {/* Левая часть — текст */}
          <div className="left-content">
            <h1>О конкурсе</h1>
            
            <p className="description">
              Уважаемые участники и педагоги!<br />
              В 2015 году мы провели наш первый Международный фестиваль-конкурс 
              хореографического искусства «Танцы без Границ». Он создавался с одной целью — 
              помочь вам набраться сценического опыта, раскрыть свой творческий потенциал, 
              завести профессиональные знакомства и найти единомышленников среди участников, 
              педагогов и членов жюри.
            </p>

            <p className="description">
              Сегодня мы — это Club Dance. И наши принципы остаются неизменными.
            </p>

            <h2>Только хореография</h2>
            <p className="description">
              Мы приглашаем вас к участию в номинации «Конкурс Хореографического направления». 
              В портфеле проектов:
            </p>
            <ul className="projects-list">
              <li>Международный фестиваль-конкурс «Танцы без Границ»</li>
              <li>Всероссийский фестиваль-конкурс «DANCE Time»</li>
              <li>Международный фестиваль-конкурс «Звездопад Талантов»</li>
            </ul>
            <p className="description">И это только начало.</p>

            <h2>Звёздное жюри</h2>
            <p className="description">
              Нашими членами жюри являются участники, получившие победительницу «Танцы на ТНТ» 
              и «Новые Танцы». Это не просто открытие — это действующие педагоги, руководители 
              творческих студий, основатели новых хореографических направлений. Люди, которые 
              вдохновляют и знают, как вывести ваш коллектив на новый уровень.
            </p>

            <button className="btnAbout" onClick={() => navigate('/Authorization')}>
              Оставить заявку
            </button>
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

export default AboutCompetition;