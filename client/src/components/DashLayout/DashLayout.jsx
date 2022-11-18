import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Navbar/DashHeader'
import Footer from '../Footer/Dash-footer'

const dashLayout = () => {
    return (
        <>
            <Header />
            <div className='dash-container'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default dashLayout
