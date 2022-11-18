import React from 'react'
import { Link } from 'react-router-dom'
import DashFooter from '../../components/Footer/Dash-footer'
import DashHeader from '../../components/Navbar/DashHeader'
import './Home.css'

const home = () => {
    return (
        <div className='home-container'>
            <DashHeader />
            <Link to={'/login'}>LogIn</Link>
            <br />
            <br />
            <Link to={'/signup'}>SignUp</Link>
            <h1>Hello</h1>
            <p>Welcome to LandDom shop</p>

            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt impedit doloremque sit soluta minima esse eveniet dolor architecto nam commodi eaque nulla, minus molestiae iure asperiores eum mollitia voluptate. Nulla.</p>
            <DashFooter />
        </div>
    )
}

export default home