import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from 'react-router-dom';

// Estilos
import "./navbar.css";

function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav__enlaces">
          <ul>
            <Link to='/category/Ipa'>Ipa</Link>
            <Link to='/category/Negra'>Negra</Link>
            <Link to='/category/Roja'>Roja</Link>
          </ul>
        </div>
        <Link to='/'>
          <img className="nav__logo" src="./img/logo.png" alt="logo" />
        </Link>
        <div className="nav__enlaces">
          <ul>
            <Link to='/category/Rubia'>Rubia</Link>
            <Link to='/category/Sin Alcohol'>Sin Alcohol</Link>
            <Link to='/category/Trigo'>Trigo</Link>
          </ul>
        </div>
      </div>
      <CartWidget/>
    </nav>
  );
}

export default NavBar;
