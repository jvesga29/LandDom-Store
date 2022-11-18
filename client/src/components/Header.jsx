import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    const content = (
        <header className='header'>
            <div className='header__container'>
                <Link to="/dash/products">
                    <h1 className='header__logo'>LandDom</h1>
                </Link>
                <nav className='header__nav'>

                </nav>
            </div>
        </header>
    )

    return content
}

export default Header
