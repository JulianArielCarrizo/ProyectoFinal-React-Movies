import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ActorCard from './ActorCard'; // Asegúrate de ajustar la ruta correcta

const Carrusel = ({ actors }) => (
  <Swiper
    spaceBetween={20}
    slidesPerView={3}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
  >
    {actors.map((actor) => (
      <SwiperSlide key={actor.id}>
        <ActorCard actor={actor} />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default Carrusel;
