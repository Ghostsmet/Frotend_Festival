// Slider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// @ts-ignore
import './Slider.css';

export default function Slider({ items }: any) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      {items.map((item: any, index: number) => (
        <SwiperSlide key={index}>
          <div className="advantage-card"> /*вставить свои карточки здесь*/
            {item.icon && <div className="advantage-icon">{item.icon}</div>}
            <h3 className="advantage-title">{item.title}</h3>
            <p className="advantage-description">{item.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}