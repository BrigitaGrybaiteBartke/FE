import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { RxPerson } from 'react-icons/rx';


const Header = () => {

    const auth = useContext(AuthContext);

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <NavLink to="./" class="navbar-brand">
                        <img
                            src="https://knockknockwhoisthere.files.wordpress.com/2018/03/dotblog.png"
                            alt="Bootstrap"
                            width="100"
                        />

                        {auth.isLoggedin() ? (
                            <span className="text-secondary">{`${auth.getUser().name}, welcome`}</span>
                        ) : (null)
                        }

                    </NavLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarToggler">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/posts">Home</NavLink>
                            </li>

                            {auth.isLoggedin() ? (
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/user/posts">Dashboard</NavLink>
                                </li>
                            ) : (null)}
                        </ul>

                        {!auth.isLoggedin() ? (
                            <ul class="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item dropdown dropstart">
                                    <NavLink className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {/* <RxPerson /> */}
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
                            <ul class="navbar-nav mb-2 mb-lg-0">

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