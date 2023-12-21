import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtener } from "../api/configuracionApi";
import { Spinner } from "../componentes/Spinner";
import ScoreContainer from "../componentes/ScoreContainer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styles from "./DetallesPeliculas.module.css";

export function DetallesPeliculas() {
  const { movieId } = useParams();
  const [cargando, setCargando] = useState(true);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarPelicula = async () => {
      setCargando(true);

      try {
        const [movieResult, castResult] = await Promise.all([
          obtener("/movie/" + movieId),
          obtener(`/movie/${movieId}/credits`)
        ]);

        const filteredCast = castResult.cast.filter(actor => actor.profile_path !== null);

        setMovie(movieResult);
        setCast({ ...castResult, cast: filteredCast });
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar detalles de la película:", error);
        setCargando(false);
      }
    };

    cargarPelicula();
  }, [movieId]);

  // Agregar clases "aparecido" después de cargar el componente
  useEffect(() => {
    const columnas = document.querySelectorAll(`.${styles.columna}`);
    const imagenPelicula = document.querySelector(`.${styles.imagenPelicula}`);

    if (columnas.length > 0) {
      columnas.forEach(columna => columna.classList.add('aparecido'));
    }

    if (imagenPelicula) {
      imagenPelicula.classList.add('aparecido');
    }
  }, []);

  if (cargando) {
    return <Spinner />;
  }

  if (!movie || !cast) {
    return null;
  }

  const imgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const roundedScore = Math.round(movie.vote_average);

  return (
    <div className={styles.detallesContenedor}>
      <img
        className={`${styles.columna} ${styles.imagenPelicula} aparecido`}
        src={imgUrl}
        alt={movie.title}
      />

      <div className={`${styles.columna} ${styles.detallePeliculas} aparecido`}>
        <p className={styles.tituloDes}>
          <strong>Titulo: </strong> {movie.title}
        </p>
        <ScoreContainer score={roundedScore * 10}/>
        <br />
        <p>Año: {new Date(movie.release_date).getFullYear()}</p>
        <br />
        <p>
          <strong>Generos: </strong>
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <br />
        <p>
          <strong>Descripción: </strong>
          {movie.overview}
        </p>
        <br />
        <h3 className={styles.nameCarrucel}>Reparto</h3>
        <br />
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
            loop:true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Navigation]}
          className="mySwiper aparecido"
        >
          {cast.cast.map((actor) => (
            <SwiperSlide key={actor.id} className={`${styles.actorConteiner} aparecido`}>
              <p>{actor.name}</p>
              {actor.profile_path && (
                <img
                  className={styles.actorImage}
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <br />

        {/* Agregamos el botón de retroceso */}
        <button onClick={() => navigate(-1)} className={`${styles.botonAtras} aparecido`}>
          Volver
        </button>
      </div>
    </div>
  );
}