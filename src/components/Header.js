import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import myImage from '../images/blogImage.png'

const Header = () => {
    const auth = useContext(AuthContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light bg-gradient sticky-top">
                <div className="container-fluid">
                    <NavLink to="./" className="navbar-brand">
                        {/* <img
                            src={myImage}
                            alt="Bootstrap"
                            width="100"
                        /> */}
                        <span className='fs-2 text fw-bold'>.blog&nbsp;&nbsp;</span>
                        {auth.isLoggedin() ? (
                            <span
                                className="text-secondary">
                                {`${auth.getUser().name}, welcome`}
                            </span>
                        ) : (null)
                        }
                    </NavLink>
                    <button
                        className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarToggler" aria-controls="navbarToggler"
                        aria-expanded="false" aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    aria-current="page"
                                    to="/posts"
                                >
                                    Home
                                </NavLink>
                            </li>
                            {auth.isLoggedin() ? (
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                        aria-current="page"
                                        to="/user/posts"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            ) : (null)}
                        </ul>
                        {!auth.isLoggedin() ? (
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item dropdown dropstart">
                                    <NavLink className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        .new BLOGpost
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink className="nav-link" aria-current="page" to="/login">Login</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="nav-link" aria-current="page" to="/register">Register</NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                                        aria-current="page"
                                        to="/login"
                                        onClick={auth.logout}
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header;