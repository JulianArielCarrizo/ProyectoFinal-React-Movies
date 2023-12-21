import styles from './Busqueda.module.css';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery } from '../hooks/Query';

export function Busqueda () {
    const query = useQuery();
    const search = query.get("search");

    const[buscarTexto, setBuscarTexto] = useState("");
    const navigate = useNavigate();

    useEffect(() =>{
        setBuscarTexto(search || "");
    }, [search])
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/?search=" + buscarTexto);
    };

return (
    <form className={styles.contenedorBusqueda} onSubmit={handleSubmit}>
    <div className={styles.cajaBusqueda} >
            <input className={styles.entradaBusqueda}type="text" onChange={(e) => setBuscarTexto(e.target.value)}/>
            <button className={styles.botonBusqueda}type="submit"><FaSearch size={22}/></button>
    </div>
        </form>
)
}
    
   