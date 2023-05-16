import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const hs = {
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		}
	};
	const req = { method: "POST", headers: hs };

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		const token = JSON.parse(localStorage.getItem("token"));
		setUser(user);
		setToken(token);
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
				(err) => { }
			)
	};

	const getUser = () => user;
	const getToken = () => token;
	const isLoggedin = () => (user ? true : false);

	return (
		<AuthContext.Provider
			value={{ login, isLoggedin, logout, getUser, getToken, user }}
		>
			{children}
		</AuthContext.Provider>
	);
}