import axios from 'axios';
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MessagesContext } from './context/MessagesContext';
import { LoadingContext } from './context/LoadingContext';

const Register = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const { setAlert } = useContext(MessagesContext)
    const { setLoading } = useContext(LoadingContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const handleError = (errors) => { console.log(errors) };

    const handleData = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleRegistration = (data, e) => {
        setLoading(true)
        axios.post('http://127.0.0.1:8000/api/register', data)
            .then(resp => {
                auth.login(resp.data.data.user, resp.data.data.token)
                navigate('/user/posts')
                setAlert({ message: 'Registration successfully!' })
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
                    <h5 className='text-center'>Register form</h5>
                </div>
                <form
                    noValidate
                    className='d-flex flex-column align-items-center'
                    onSubmit={handleSubmit(handleRegistration, handleError)}
                >
                    <div className="form-floating col-4 mb-4 text-secondary">
                        <input
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="name"
                            type="text"
                            name="name"
                            onChange={handleData}
                            {...register('name', { required: '* Name field is required' })}
                        />
                        <label htmlFor="floatingInput">Name</label>
                        {errors.name
                            && <div className='invalid-feedback'>
                                {errors.name.message}
                            </div>
                        }
                    </div>
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
                        {errors.email
                            && <div className='invalid-feedback'>
                                {errors.email.message}
                            </div>
                        }
                    </div>
                    <div className="form-floating col-4 mb-4 text-secondary">
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
                        <label htmlFor="floatingPassword">Password</label>
                        {errors.password
                            && <div className='invalid-feedback'>
                                {errors.password.message}
                            </div>
                        }
                    </div>
                    <div className="form-floating col-4 mb-2 text-secondary">
                        <input
                            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                            placeholder="Password Confirmation"
                            type="password"
                            name="password_confirmation"
                            onChange={handleData}
                            {...register('password_confirmation', {
                                required: '* Password confirmation field is required',
                                validate: (val: string) => {
                                    if (watch('password') !== val) {
                                        return "* Passwords does not match"
                                    }
                                }
                            }
                            )}
                        />
                        <label htmlFor="floatingPasswordConfirmation">Password Confirmation</label>
                        {errors.password_confirmation
                            && <div className='invalid-feedback'>
                                {errors.password_confirmation.message}
                            </div>
                        }
                    </div>
                    <div className='d-grid gap-2 col-4 mx-auto mb-3'>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="submit" className="btn btn-primary mt-3"
                        >
                            Sign in
                        </motion.button>
                    </div>
                    <div className='text-center'>
                        <p>
                            Already a member?&nbsp;<NavLink className='' to="/login">Login</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;