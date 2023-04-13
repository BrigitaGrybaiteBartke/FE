import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	
	const hs = { headers: { Accept: "application/json", Authorization: `Bearer ${token}` } };
	const req = { method: "POST", headers: hs };


	useEffect(() => {
		const user = localStorage.getItem("user");
		const token = localStorage.getItem("token");
		setUser(JSON.parse(user));
		setToken(JSON.parse(token));
	}, []);



	const login = (user, token) => {
		localStorage.setItem("token", JSON.stringify(token));
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
		setToken(token);
	};


	const logout = () => {
			fetch('http://127.0.0.1:8000/api/logout', req)
			.then((resp) => {
					localStorage.removeItem("token");
					localStorage.removeItem("user");
					setUser(null);
					setToken(null);
				},
				(err) => {}
			)
	};

	const getUser = () => user;
	const getToken = () => token;
	const isLoggedin = () => (user ? true : false);


	return (
		<AuthContext.Provider
			value={{ login, isLoggedin, logout, getUser, getToken, user}}
		>
			{children}
		</AuthContext.Provider>
	);



}