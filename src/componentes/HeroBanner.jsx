import React, { useEffect, useState } from 'react';
import style from './HeroBanner.module.css';
import useLastMovieSelectedStore from '../store/lastMovieSelectedStore';
import { NavLink, useNavigate } from 'react-router-dom';

function HeroBanner() {
  const { lastMovieSelected } = useLastMovieSelectedStore();
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [showText, setShowText] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerFondo = async () => {
      if (lastMovieSelected) {
        // Construir la URL de la imagen de la película
        const posterPath = lastMovieSelected.poster_path;
        setBackgroundUrl(`https://image.tmdb.org/t/p/original${posterPath}`);
        setShowText(false); // Ocultar el texto al cambiar la película
      }
    };

    // Llamar a obtenerFondo directamente para cargar la primera imagen inmediatamente
    obtenerFondo();

    // Configurar intervalo para cambiar automáticamente cada 10 segundos
    const intervalId = setInterval(() => {
      obtenerFondo();

      // Cambiar la información dos segundos después de cambiar la imagen
      setTimeout(() => {
        setShowText(true); // Mostrar el texto cuando la nueva imagen aparece
      }, 600);
    }, 10000);

    // Limpiar el temporizador al desmontar el componente o al cambiar la película
    return () => clearInterval(intervalId);
  }, [lastMovieSelected]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: "cover",
    transition: "background-image 3s ease-in-out",
    // Otros estilos según tus necesidades
  };

  return (
    <div className={style.heroConteiner} style={backgroundStyle}>
      <div className={`${style.dataHeroConteiner} ${showText ? "" : style.fadeOut}`}>
        <h2>{lastMovieSelected?.title}</h2>
        <h3></h3>
        <p>{lastMovieSelected?.overview}</p>
        <NavLink to={`/movies/${lastMovieSelected?.id}`} className={style.heroInfoButtom}>
          More Info
        </NavLink>
      </div>
    </div>
  );
}

export default HeroBanner;