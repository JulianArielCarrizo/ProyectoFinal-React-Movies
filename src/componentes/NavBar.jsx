import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText, AppBar, Toolbar } from '@mui/material';
import { Busqueda } from './Busqueda';

import styles from './NavBar.module.css';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false); // Cerrar el menú después de hacer clic en un enlace
  };

  return (
    <div className={styles.navBarContainer}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleToggleMenu} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <div className={styles.title}>
            <h1>
              <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none', marginRight:'15px' }}>
                Movies
              </NavLink>
            </h1>
          </div>
          <div className={styles.searchBar}>
            <Busqueda className={styles.searchBar}/>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={showMenu} onClose={handleToggleMenu}>
        <div className={`${styles.menuOptions} ${styles.drawer}`}>
          <List>
            <ListItem button onClick={() => handleNavigation("/")}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/favorites")}>
              <ListItemText primary="Favoritos" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/watch-later")}>
              <ListItemText primary="Ver después" />
            </ListItem>
           
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default NavBar;