import React from 'react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './Card';  
import '../../../Components/btn.css';
import "./Slider.css"
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
  },
  {
    id: 5,
    title: "КОМАНДА ПРОФЕССИОНАЛОВ",
    description: "Мы — команда опытных хореографов, организаторов и энтузиастов танца.<br> Наши эксперты:разрабатывают уникальные программы выступлений;проводят мастер-классы для участников всех уровней;помогают раскрыть потенциал каждого танцора.",
    icon: "/image 28.png"  
  },
  {
    id: 6,    title: "ВЕСОМЫЙ ВКЛАД В ПОРТФОЛИЮ",
    description: "Видеозаписи выступлений, профессиональные фото, дипломы государственного образца, рекомендательные письма от членов жюри. Всё для вашего роста и поступлений в танцевальные вузы.",
    icon: "/image5.png"  
  }
];


function AboutUs() {
  return (
    <div className="about-us-section">
      
      <div className="container">
      <div className="leftContent">
      <h1 className="textabout">Место, где рождаются <br /> звезды!</h1>
      <p className="textabouth6">
        Мы объединяем танцоров и организаторов по всей стране.
        Наша платформа — это мост между твоим талантом и зрительскими овациями. 
        Бронируй участие в топовых конкурсах и становись частью большого танцевального сообщества.
      </p>

      </div>
      <img className="reward" src="/image1.png" alt="Награды" />
</div>
      
      
   

      {/* Заменяем cards-container на Swiper */}
      <div className="swiper-container" >
      <h2 className="textabout666">О нас</h2>
      <div>
        <Swiper
          modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={'auto'}
            navigation={true}
            loop={true}  // Меняем loop на false, чтобы не было зацикливания
            pagination={{ clickable: true }}
            speed={400}
            slidesPerGroup={1}  // Листаем по 1 карточке
            preventClicks={true}
            preventClicksPropagation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="advantages-swiper"
        >
          {advantagesData.map((advantage) => (
            <SwiperSlide key={advantage.id}>
              <Card 
                title={advantage.title}
                description={advantage.description}
                icon={advantage.icon}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>

    </div>

  );
}

export default AboutUs;





