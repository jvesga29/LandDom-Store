import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../../Pages/auth/authApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const DASH_REGEX = /^\/dash(\/)?$/
const PRODUCTS_REGEX = /^\/dash\/products(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/products/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/products')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !PRODUCTS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newProductButton = null
    if (PRODUCTS_REGEX.test(pathname)) {
        newProductButton = (
            <button
                className="icon-button"
                title="New product"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (isManager || isAdmin) {
        if (USERS_REGEX.test(pathname)) {
            newUserButton = (
                <button
                    className="icon-button"
                    title="New User"
                    onClick={onNewUserClicked}
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            )
        }
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let productsButton = null
    if (!PRODUCTS_REGEX.test(pathname) && pathname.includes('/dash')) {
        productsButton = (
            <button
                className="icon-button"
                title="Products"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newProductButton}
                {newUserButton}
                {productsButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/">
                        <h1 className="dash-header__title">LandDom</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader