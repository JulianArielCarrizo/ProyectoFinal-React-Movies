import { Busqueda } from "../componentes/Busqueda";
import { GrillaPeliculas } from "../componentes/GrillaPeliculas";
import  HeroBanner  from "../componentes/HeroBanner";
import Navbar from "../componentes/NavBar";
import style from './Home.module.css'

export function Home () {
return <div>
    <HeroBanner/>
   <h1 className={style.homeTile}>Movies</h1>
    <GrillaPeliculas/>
    </div>;
}
    

    
    
    

