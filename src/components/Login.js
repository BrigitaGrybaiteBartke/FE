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
    const headers = { headers: { Accept: "application/json", Authorization: `Bearer ${auth.token}` } }
    const { setLoading } = useContext(LoadingContext)

    const [data, setData] = useState({})

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleError = (errors) => { console.log(errors) };

    const handleData = (e) => {
        const value = e.target.value
        setData({ ...data, [e.target.name]: value })
    }

    const login = (data, e) => {
        // e.preventDefault()
        // console.log(data)
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
                    className='d-flex flex-column align-items-center' noValidate
                    onSubmit={handleSubmit(login, handleError)}
                >
                    <div class="form-floating col-4 mb-4 text-secondary">
                        <input
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="name@example.com"
                            type="email"
                            name="email"
                            onChange={handleData}
                            {...register('email', { required: true })}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                        {errors.email && errors.email.type === "required" && <div className='invalid-feedback'>* Email field is required</div>}
                    </div>
                    <div className="form-floating col-4 mb-2 text-secondary">
                        <input
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleData}
                            {...register('password', { required: true })}
                        />
                        <label htmlFor="floatingPassword" >Password</label>
                        {errors.password && errors.password.type === "required" && <div className='invalid-feedback'>* Password field is required</div>}
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
                            Not a member? <NavLink className='' to="/register">Register</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;