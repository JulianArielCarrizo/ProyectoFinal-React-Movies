import './App.css'
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import { GrillaPeliculas } from './componentes/GrillaPeliculas';
import { Home } from './paginas/Home';
import { DetallesPeliculas } from './paginas/DetallesPeliculas';
import NavBar from './componentes/NavBar';
import { Favorites } from './paginas/Favorites';
import { WatchLater } from './paginas/WatchLater';


function App() {
  {

  return (
    <>
    
    <BrowserRouter>
     <NavBar/>
     
      
      <main>
        
      <Routes>
            {/* Ruta para la página principal */}
            <Route path='/' element={<Home />} />

            {/* Ruta para la página de favoritos */}
            <Route path='/favorites' element={<Favorites />} />

            {/* Ruta para la página "ver más tarde" */}
            <Route path='/watch-later' element={<WatchLater />} />
            
            <Route path='/movies/:movieId' element={<DetallesPeliculas/>}/>
            
          </Routes>
      </main>
  </BrowserRouter>
    </>
  )
}
}
export default App;
