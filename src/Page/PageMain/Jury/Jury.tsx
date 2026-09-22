import React from 'react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../AboutUs/Card';  
import '../../../Components/btn.css';
import "../AboutUs/Slider.css"
const advantagesData = [
  {
    id: 1,
    title: "ЕГОР ДРУЖИНИН",
    description: "Хореограф с мировым именем, работал с самыми популярными артистами отечественной сцены.",
    icon: "/imagee 6.png"  
  },
  {
    id: 2,
    title: "НИКОЛАЙ ПРОВОТАРОВ",
    description: "Танцор с мировым именем!Хореограф и режиссер 'MAG FILM' хореограф команды CRAZY DREAM",
    icon: "/imagee 2.png"  
  },
  {
    id: 3,
    title: "РАФАЭЛ КУРБАНОВ",
    description: "Хореограф Big Love Show 2018 год.Хореограф Егора Крида, Натан, Миа Бойко и многих других артистов. ",
    icon: "/imagee 3.png" 
  },
  {
    id: 4,
    title: "АННА ДЕЛЬЦОВА",
    description: "Хореограф, педагог, танцор-импровизатор. Участник команды уличного и экспериментального танца 'Jack's Garret'",
    icon: "/imagee 4.png"  
  },
  {
    id: 5,
    title: "ЕЛЕНА ПЛАТОНОВА",
    description: "Ведущий хореограф Adidas Russia, один из хореографов Олимпийских игр в Сочи",
    icon: "/imagee 1.png"  
  },
  {
    id: 6,    
    title: "ВИТАЛИЙ КЛИМЕНКО",
    description: "Танцор, Хореограф-постановщик проектов: «Танцы на ТНТ», «Танцуют Все!».",
    icon: "/image 16.png"  
  }
];


function Jury() {
  return (
    <div className="jury-content">
      
      <div className="swiper-container" >
      <h2 className="textabout555">Наши члены жюри</h2>
      <h6 className="textabouth5">Настоящие профессионалы своего дела</h6>
        <Swiper
          modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={2.5}
            navigation={true}
            loop={true}  
            pagination={{ clickable: true }}
            grabCursor={false}
            speed={400}
            slidesPerGroup={1}  
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

  );
}

export default Jury;
