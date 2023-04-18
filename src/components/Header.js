import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { IoMdPerson } from 'react-icons/io';
import { RxPerson } from 'react-icons/rx';


const Header = () => {

    const auth = useContext(AuthContext);

    return (
        <>

            <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary bg-light" background="#e3f2fd">
                <div className="container-fluid">

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/posts">Posts</NavLink>
                            </li>

                            {auth.isLoggedin() ? (
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/user/posts">Dashboard</NavLink>
                                </li>
                            ) : (null)}
                        </ul>

                        {!auth.isLoggedin() ? (
                            <ul className='navbar-nav d-flex'>
                                <li className="nav-item dropdown dropstart">
                                    <Link className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <RxPerson />
                                    </Link>
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
                            <ul className='navbar-nav d-flex'>
                                <li className="nav-item">
                                    <span className="nav-link mx-4">{`Hello, ${auth.getUser().name}`}</span>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page"
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