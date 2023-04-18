import axios from 'axios';
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Register = () => {

    const auth = useContext(AuthContext);


    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "", password_confirmation: "" });


    const headers = {
        Accept: "application/json", "Content-Type": "application/json"
    };


    const handleData = (e) => {
        const value = e.target.value
        setUserInfo({ ...userInfo, [e.target.name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/register', userInfo)
            .then(resp => {
                console.log(resp.data)
                auth.login(resp.data.data.user, resp.data.data.token)
                navigate("/");
            })
            .catch(error => {
                console.error(error.response.data);
            });

    }



    return (
        <>

            <h5 className='text-center'>Register form</h5>

            <form
                className='d-flex flex-column align-items-center'
                onSubmit={handleSubmit}
            >
                <div className="form-floating col-4 mb-4">
                    <input
                        className="form-control"
                        placeholder="name"
                        type="text"
                        name="name"
                        onChange={handleData}
                    />
                    <label for="floatingInput">Name</label>
                </div>
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
                <div className="form-floating col-4 mb-2">
                    <input
                        className="form-control"
                        placeholder="Password Confirmation"
                        type="password"
                        name="password_confirmation"
                        onChange={handleData}

                    />
                    <label for="floatingPasswordConfirmation">Password Confirmation</label>

                </div>

                <div className='d-grid gap-2 col-4 mx-auto mb-3'>
                    <button type="submit" className="btn btn-primary mt-3"> Sign in</button>
                </div>

                <div className='text-center'>
                    <p>
                        Already a member? <NavLink className='' to="/login">Login</NavLink>
                    </p>


                </div>

            </form>

        </>
    );
};

export default Register;