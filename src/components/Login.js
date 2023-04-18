import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import { MessagesContext } from './context/MessagesContext';


const Login = () => {

    const auth = useContext(AuthContext);
    const { setAlert } = useContext(MessagesContext)

    const navigate = useNavigate();
    const headers = { headers: { Accept: "application/json", Authorization: `Bearer ${auth.token}` } }

    const [data, setData] = useState({})

    const handleData = (e) => {
        const value = e.target.value
        setData({ ...data, [e.target.name]: value })
    }

    const login = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/login', data, { headers: headers })
            .then(resp => {
                auth.login(resp.data.data.user, resp.data.data.token)
                navigate('/user/posts')
                setAlert({ message: 'Login successfully!' })
            })
            .catch(err => {
                // console.log(err.response.data.message)
                setAlert({ message: err.response.data.message, warning: true })
            })

    }


    return (
        <>


            <h5 className='text-center'>Login Form</h5>

            <form
                className='d-flex flex-column align-items-center'
                onSubmit={login}
            >

                <div class="form-floating col-4 mb-4">
                    <input
                        className="form-control"
                        placeholder="name@example.com"
                        type="email"
                        name="email"
                        onChange={handleData}
                    />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating col-4 mb-2">
                    <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleData}
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <div className='d-grid gap-2 col-4 mx-auto mb-3'>
                    <button type="submit" className="btn btn-primary mt-3"> Sign in</button>
                </div>

                <div className='text-center'>
                    <p>
                        Not a member? <NavLink className='' to="/register">Register</NavLink>
                    </p>


                </div>
            </form>





            {/* </article> */}




        </>
    );
};

export default Login;