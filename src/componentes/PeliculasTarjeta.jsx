import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import ScoreContainer from "./ScoreContainer";
import useFavoritesStore from "../store/favoriteStore";
import useWatchLaterStore from "../store/watchStore";
import useLastMovieSelectedStore from "../store/lastMovieSelectedStore";
import styles from "./PeliculasTarjeta.module.css";

export function PeliculaTarjeta({ movie }) {
  const { lastMovieSelected, setLastMovieSelected } = useLastMovieSelectedStore();
  const cardRef = useRef(null);

  const onMovieClick = () => {
    setLastMovieSelected(movie);
    // Realizar el desplazamiento hacia arriba al inicio de la página
    document.documentElement.scrollIntoView({ behavior: "smooth" });
  };

  const imgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const roundedScore = Math.round(movie.vote_average);
  const { toggleFavorite } = useFavoritesStore();
  const { toggleWatchLater } = useWatchLaterStore();
  const isFavorite = useFavoritesStore.getState().favorites.some((m) => m.id === movie.id);
  const isWatchLater = useWatchLaterStore.getState().watchLater.some((m) => m.id === movie.id);
  const favoriteButtonStyle = isFavorite ? styles.favoriteSelected : styles.transparent;
  const watchLaterButtonStyle = isWatchLater ? styles.watchLaterSelected : styles.transparent;

  return (
    <li className={styles.PeliculaTarjetas} ref={cardRef}>
      <div>
        <div className={styles.Moviescard}>
          <img
            className={styles.imagenPelicula}
            src={imgUrl}
            alt={movie.title}
            onClick={onMovieClick}
          />
          {movie.release_date && 
          <div className={styles.yearConteiner}>
            <p className={styles.textYearConteiner}>
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>}
          <button
            className={styles.buttonIcon1}
            onClick={() => toggleFavorite(movie)}
          >
            <MdOutlineFavorite
              className={`${styles.icons2} ${favoriteButtonStyle}`}
            />
          </button>
          <button
            className={styles.buttonIcon2}
            onClick={() => toggleWatchLater(movie)}
          >
            <FaEye className={`${styles.icons1} ${watchLaterButtonStyle}`} />
          </button>
          <div className={styles.score}>
            <ScoreContainer score={roundedScore * 10} />
          </div>
          <div>
            <h3 className={styles.movieTitle}>{movie.title}</h3>{" "}
          </div>
        </div>
      </div>
    </li>
  );
}