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

    const registerOptions = {
        email: { required: "* Email field is required" },
        password: {
            required: "* Password field is required"
        }
    };



    const handleData = (e) => {
        const value = e.target.value
        setData({ ...data, [e.target.name]: value })

    }


    const login = (data, e) => {
        // e.preventDefault()
        // console.log(e)
        // console.log(data)
        setLoading(true)
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
            .finally(() => setLoading(false))

    }


    return (
        <>
            <div className='container'>
                <div className='mt-5'>
                    <h5 className='text-center'>Login Form</h5>
                </div>

                <form
                    className='d-flex flex-column align-items-center' noValidate
                    // onSubmit={login}
                    onSubmit={handleSubmit(login, handleError)}
                >
                    <div class="form-floating col-4 mb-4">
                        <input
                            className="form-control mb-1"
                            placeholder="name@example.com"
                            type="email"
                            name="email"
                            onChange={handleData}
                            {...register('email', registerOptions.email)}
                        />
                        <label for="floatingInput">Email address</label>
                        <small className="text-danger">
                            {errors?.email && errors.email.message}
                        </small>

                    </div>
                    <div className="form-floating col-4 mb-2">
                        <input
                            className="form-control mb-1"
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleData}
                            {...register('password', registerOptions.password)}
                        />
                        <label for="floatingPassword" >Password</label>
                        <small className="text-danger">
                            {errors?.password && errors.password.message}
                        </small>
                    </div>
                    <div className='d-grid gap-2 col-4 mx-auto mb-3'>
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