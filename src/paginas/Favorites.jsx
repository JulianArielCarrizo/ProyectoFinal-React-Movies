import React, { useState, useEffect } from "react";
import { Spinner } from "../componentes/Spinner";
import { PeliculaTarjeta } from "../componentes/PeliculasTarjeta";
import useLastMovieSelectedStore from "../store/lastMovieSelectedStore";
import useFavoritesStore from "../store/favoriteStore";
import styles from "./Favorites.module.css";
import HeroBanner from "../componentes/HeroBanner";

export function Favorites() {
  const { lastMovieSelected, setLastMovieSelected } = useLastMovieSelectedStore();
  const { favorites } = useFavoritesStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Configurar intervalo para cambiar automáticamente cada 10 segundos
    const intervalId = setInterval(() => {
      const newIndex = (currentIndex + 1) % favorites.length;
      handleSelect(newIndex);
    }, 10000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, [currentIndex, favorites]);

  const handleSelect = (index) => {
    setLastMovieSelected(favorites[index]);
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Renderizar el HeroBanner siempre */}
      <HeroBanner />
       
   
      <ul className={styles.grillaPelicula}>
        {favorites && favorites.length > 0 ? (
          <>
            {favorites.map((movie, index) => (
              <PeliculaTarjeta
                key={movie.id}
                movie={movie}
                onSelect={() => handleSelect(index)}
              />
            ))}
          </>
        ) : (
          <p className={styles.resoponse}>No hay películas favoritas.</p>
        )}
      </ul>
    </>
  );
}