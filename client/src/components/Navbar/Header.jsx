import React, { useState } from "react";
import './Header.css';
import logo from './Logo.png';
import Burger from "./BurgerIcon";
// import { Link } from 'react-router-dom';

function Header () {

    const [click, setClick] = useState (false)

    const changeState = () => {
        setClick(!click);
    }

    return (
        <div className="header__container">
            <header className="header">
                <div className="header__img-container">
                    <a href="#"><img src={logo} alt="" /></a>
                </div>
                <nav className={`header__nav ${click === true ? 'active' : '' }`}>
                    <ul className="header__nav-list">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Alimentos</a></li>
                        <li><a href="#">Juguetes</a></li>
                        <li><a href="#">Higiene</a></li>
                        <li><a href="#">Accesorios</a></li>
                    </ul>
                    <div className="header__search">
                        {/* <label htmlFor="search"><i className="fa-solid fa-magnifying-glass"></i></label> */}
                        <input type="search" id="search" placeholder="Buscar Producto..." />
                    </div>
                </nav>
                <div className="header__actions">
                    <i className="fa-solid fa-user"></i>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <div className="header__menu">
                        <Burger clicked={click} changeState={changeState}  />
                    </div>
                    <div className="Occupation">
                        
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;