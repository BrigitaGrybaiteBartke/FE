import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';


const Header = () => {

    const auth = useContext(AuthContext);




    return (
        <>


            <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary bg-light" background="#e3f2fd">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* main navigation */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {/* home page */}
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/home">Home</NavLink>
                            </li>

                            {/* Posts */}
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/posts">Posts</NavLink>
                            </li>

                            {auth.isLoggedin() ? (
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/admin">Dashboard</NavLink>
                                </li>
                            ) : (null)}
                        </ul>

                        {/* USER */}
                        {!auth.isLoggedin() ? (
                            <ul className='navbar-nav d-flex'>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/login">Login</NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className='navbar-nav d-flex'>
                                <li className="nav-item">
                                    <span className="nav-link mx-4">{`Hello ${auth.getUser().name}`}</span>
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

            {/* <div className='section'>
                <div className='container'>
                    <div className='row justify-content-center m-5'>
                        <div className='col text-center'>
                            <div className='section-title'>
                                <h2 className='text-uppercase'>Here we are</h2>
                                <p>All about today's news</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>

    )
}
export default Header;