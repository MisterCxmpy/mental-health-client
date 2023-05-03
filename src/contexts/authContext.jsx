/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState, useContext, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState();

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const login = async ({ username, password }) => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }

    const response = await fetch('http://localhost:3000/auth/login', options);
    const user = await response.json();

    if (!response.ok) throw new Error(user.message); // if theres any error, throw one and with that data

    saveUser(user) // save and cache user
    return user;
  }

  const register = async ({ username, password }) => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }

    const response = await fetch('http://localhost:3000/auth/register', options);
    const user = await response.json();

    if (!response.ok) throw new Error(user.message); // if theres any error, throw one and with that data

    saveUser(user) // save and cache user
    return user;
  }

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/authenticate/login');
  }

  useEffect(() => { // check for cachedUser data to login and redirect user
    let cached = localStorage.getItem('user');
    let path = window.location.pathname == '/authenticate/intro';

    if (path && !cached) return;
    if (path && cached) navigate('/');
    if (cached !== 'undefined') {
      let cachedUser = JSON.parse(cached)

      if (!user) {
        setUser(cachedUser)
        navigate('/')
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);