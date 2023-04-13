import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                navigate('/')
                setAlert({message: 'Login successfully!'})
            })
            .catch(err => {
                // console.log(err.response.data.message)
                setAlert({message: err.response.data.message, warning: true})
            })

    }


    return (
        <>
    
            <article className="article login w-75">
                <h1>Please Login</h1>
                <form
                    onSubmit={login}
                >
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
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </article>

        </>
    );
};

export default Login;