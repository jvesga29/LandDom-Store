import React from "react";
import './BurgerIcon.css';

function Burger (props) {

    return (
            <div onClick={props.changeState} className={`icon nav-icon-5 ${props.clicked ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
    )
}

export default Burger;