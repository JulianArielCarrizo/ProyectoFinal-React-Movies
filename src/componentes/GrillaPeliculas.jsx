import React, { useEffect, useState } from "react";
import { obtener } from "../api/configuracionApi";
import { Spinner } from "./Spinner";
import { PeliculaTarjeta } from "./PeliculasTarjeta";
import useStore from "../store/lastMovieSelectedStore";
import Paginator from "./Paginator";
import { useQuery } from "../hooks/Query";
import { useNavigate } from "react-router-dom";

import styles from "./GrillaPeliculas.module.css";

export function GrillaPeliculas() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cargando, setCargando] = useState(true);
  const { setLastMovieSelected } = useStore();
  const [noMoviesMessage, setNoMoviesMessage] = useState("");

  const query = useQuery();
  const search = query.get("search");
  const pageFromUrl = Number(query.get("page")) || 1; // Obtener el número de página desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPeliculas = async () => {
      setCargando(true);

      const searchUrl = search
        ? `/search/movie?query=${search}&page=${pageFromUrl}`
        : `/discover/movie?page=${pageFromUrl}`;

      const data = await obtener(searchUrl);
      const filteredMovies = data.results.filter((x) => x.poster_path);

      // Establecer la primera película en el estado general solo si no se realiza una búsqueda
      if (!search && filteredMovies.length > 0) {
        setLastMovieSelected(filteredMovies[0]);
      }

      setMovies(filteredMovies);
      setTotalPages(data.total_pages);
      setCurrentPage(pageFromUrl); // Establecer la página actual desde la URL
      setCargando(false);

      // Mostrar mensaje si no hay películas
      if (filteredMovies.length === 0) {
        setNoMoviesMessage("No se encontraron películas.");
      } else {
        setNoMoviesMessage("");
      }
    };

    cargarPeliculas();
  }, [search, setLastMovieSelected, pageFromUrl]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', newPage);

    const searchParam = search ? `search=${search}&` : '';
    const queryString = queryParams.toString();

    navigate(`/?${searchParam}${queryString}`);
  };

  if (cargando) {
    return <Spinner />;
  }

  return (
    <div>
      {noMoviesMessage && (
        <p className={styles.moviesResponse}>{noMoviesMessage}</p>
      )}
      <ul className={styles.grillaPelicula}>
        {movies.map((movie) => (
          <PeliculaTarjeta key={movie.id} movie={movie} />
        ))}
      </ul>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}