import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Paginator.module.css";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    // Navegar a la nueva página usando el hook useNavigate
    navigate(`?page=${newPage}`);
    onPageChange(newPage); // Actualizar el estado local
  };

  const handleGoBack = () => {
    const newPage = currentPage - 1;
    navigate(`?page=${newPage}`);
    onPageChange(newPage); // Actualizar el estado local
  };

  return (
    <div className={styles.paginator}>
      <button onClick={handleGoBack} disabled={currentPage === 1}>
        Anterior
      </button>
      <span>Página {currentPage} de {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginator;