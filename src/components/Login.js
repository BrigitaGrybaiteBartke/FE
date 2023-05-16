import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import { MessagesContext } from './context/MessagesContext';
import { LoadingContext } from './context/LoadingContext';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Login = () => {
    const auth = useContext(AuthContext);
    const { setAlert } = useContext(MessagesContext)
    const navigate = useNavigate();
    const headers = {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${auth.token}`
        }
    }
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({})

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleError = (errors) => { console.log(errors) };

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const login = (data, e) => {
        setLoading(true)
        axios.post('http://127.0.0.1:8000/api/login', data, { headers: headers })
            .then(resp => {
                auth.login(resp.data.data.user, resp.data.data.token)
                navigate('/user/posts')
                setAlert({ message: 'Login successfully!' })
            })
            .catch(err => {
                setAlert({ message: err.response.data.message, warning: true })
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className='container'>
                <div className='mt-5 mb-3'>
                    <h5 className='text-center'>Login Form</h5>
                </div>
                <form
                    noValidate
                    className='d-flex flex-column align-items-center'
                    onSubmit={handleSubmit(login, handleError)}
                >
                    <div className="form-floating col-4 mb-4 text-secondary">
                        <input
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="name@example.com"
                            type="email"
                            name="email"
                            onChange={handleData}
                            {...register('email', {
                                required: '* Email field is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "* Invalid Email"
                                }
                            })}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                        {errors.email &&
                            <div className='invalid-feedback'>
                                {errors.email.message}
                            </div>
                        }
                    </div>
                    <div className="form-floating col-4 mb-2 text-secondary">
                        <input
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleData}
                            {...register('password', {
                                required: '* Password field is required',
                                minLength: {
                                    value: 8,
                                    message: '* Password must have at least 8 characters'
                                }
                            })}
                        />
                        <label htmlFor="floatingPassword" >Password</label>
                        {errors.password
                            && <div className='invalid-feedback'>
                                {errors.password.message}
                            </div>
                        }
                    </div>
                    <div className='d-grid gap-2 col-4 mx-auto mb-3 text-secondary'>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="submit"
                            className="btn btn-primary mt-3"
                        >
                            Sign in
                        </motion.button>
                    </div>

                    <div className='text-center'>
                        <p>
                            Not a member?&nbsp;<NavLink className='' to="/register">Register</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;