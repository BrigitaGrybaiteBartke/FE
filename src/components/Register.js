import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                auth.login(resp.data.data.user, resp.data.data.token)
                navigate("/");
            })
        // .catch((err) => {
        // //     // if (err.response) {
        //         console.log(err);
        // //     //   }
        //   });

    }


    return (
        <>
            <article className="article login">
                <h1>Please Register</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email address:</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password confirmation:</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            onChange={handleData}
                            className="form-control"
                        />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </article>
        </>
    );
};

export default Register;