import React, { useState, useEffect } from "react";
import { Spinner } from "../componentes/Spinner";
import { PeliculaTarjeta } from "../componentes/PeliculasTarjeta";
import useLastMovieSelectedStore from "../store/lastMovieSelectedStore";
import useWatchLaterStore from "../store/watchStore";
import styles from "./Favorites.module.css";
import HeroBanner from "../componentes/HeroBanner";

export function WatchLater() {
  const { lastMovieSelected, setLastMovieSelected } = useLastMovieSelectedStore();
  const { watchLater } = useWatchLaterStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Configurar intervalo para cambiar automáticamente cada 15 segundos
    const intervalId = setInterval(() => {
      const newIndex = (currentIndex + 1) % watchLater.length;
      handleSelect(newIndex);
    }, 10000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, [currentIndex, watchLater]);

  const handleSelect = (index) => {
    setLastMovieSelected(watchLater[index]);
    setCurrentIndex(index);
  };

  if (!watchLater || watchLater.length === 0) {
    return (
      <>
        <HeroBanner />
        <p>No hay películas en la lista de ver después.</p>
      </>
    );
  }

  return (
    <>
      <HeroBanner />
      <ul className={styles.grillaPelicula}>
        {watchLater.map((movie, index) => (
          <PeliculaTarjeta
            key={movie.id}
            movie={movie}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </ul>
    </>
  );
}