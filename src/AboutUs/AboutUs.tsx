import React from 'react';
// @ts-ignore
import './About.css';
import Card from './Card';



const advantagesData = [
  {
    id: 1,
    title: "ПРОФЕССИОНАЛЬНЫЙ РОСТ И ПРИЗНАНИЕ",
    description: "Выступление на профессиональных сценах, оценка от действующих хореографов, чемпионов России и Европы. Ваш талант судят те, кто сам стоит за кулисами.",
    icon: "/image2.png"  
  },
  {
    id: 2,
    title: "НАГРАДЫ ДЛЯ КАЖДОГО",
    description: "Каждый танцор получает именной диплом и подарки от партнёров. Победители — кубки, медали, сертификаты на обучение и денежные призы по итогам сезона. Топ-команды получают приглашения на фестивали.",
    icon: "/image3.png"  
  },
  {
    id: 3,
    title: "ПУТЕШЕСТВИЕ В НОВЫЙ ГОРОД",
    description: "Конкурс + путешествие: вы не только танцуете, но и знакомитесь с новыми местами. Мы помогаем с трансфером, подсказываем, где остановиться и как вдохновиться атмосферой города.",
    icon: "/image4.png" 
  },
  {
    id: 4,
    title: "ВЕСОМЫЙ ВКЛАД В ПОРТФОЛИЮ",
    description: "Видеозаписи выступлений, профессиональные фото, дипломы государственного образца, рекомендательные письма от членов жюри. Всё для вашего роста и поступлений в танцевальные вузы.",
    icon: "/image5.png"  
  }
];



function AboutUs() {
  return (
    <section>  {/* section */}
      <div className="hero-section">
        <img src="/image1.png" alt="Фон" className="center-imageAbout" />
        
        <h1 className='textabout h1'>
          Место, где рождаются <br /> звезды!
        </h1>
        
        <h6 className='textabouth6 h6'>
          Мы объединяем танцоров и организаторов по всей стране.
          Наша платформа — это мост между твоим талантом и зрительскими овациями. 
          Бронируй участие в топовых конкурсах и становись частью большого танцевального сообщества.
        </h6>
        
        <button className="btnAbout">Смотреть фотографии с конкурсов</button>
      </div>  {/* ← Закрываем hero-section */}
      
      <div className="cards-container">
        {advantagesData.map((card) => (
          <Card 
            key={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </section>  
  );
}

export default AboutUs;



