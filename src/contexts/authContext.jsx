/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState, useContext, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const completeIntro = (goals) => {
    let userDat = { ...user, goals: goals.map(g => g.text) } // gets user selected goals and saves them in state,

    saveUser(userDat)
    navigate('/');
  }

  const login = async ({ username, password }) => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }

    const response = await fetch('https://mental-health-server-w9lq.onrender.com/auth/login', options);
    const user = await response.json();

    if (!response.ok) throw new Error(user.message); // if theres any error, throw one and with that data

    saveUser({ ...user, intro: false }) // save and cache user
    return user;
  }

  const register = async ({ username, password }) => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }

    const response = await fetch('https://mental-health-server-w9lq.onrender.com/auth/register', options);
    const user = await response.json();

    if (!response.ok) throw new Error(user.message); // if theres any error, throw one and with that data

    saveUser({ ...user, intro: true }) // save and cache user, set registered = true
    return user;
  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mentorChat');
    localStorage.removeItem('introShown')
    localStorage.removeItem('mindstoreIntroShown')
    localStorage.removeItem('aiMentorIntroShown')
    setUser(null)
    navigate('/authenticate/login');
  }

  const updateGoals = async (goals) => {
    let goalsStr = JSON.stringify(goals)
    let options = { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ goals: goalsStr, user_id: user.user_id }) }
    const res = await fetch('https://mental-health-server-w9lq.onrender.com/user/goals', options);
    const updatedUser = await res.json();

    res.ok ? saveUser(updatedUser) : console.log(updatedUser);
  }

  const updatePoints = async (points) => {
    console.log(points)
    let options = { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ points, user_id: user.user_id }) }
    const res = await fetch('https://mental-health-server-w9lq.onrender.com/user/pts', options);
    const updatedUser = await res.json();

    if (res.ok) {
      saveUser(updatedUser)
    } else {
      console.log(updatedUser);
    }
  }

  const updateMentor = async (mentor) => {
    let options = { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mentor, user_id: user.user_id }) }
    const res = await fetch('https://mental-health-server-w9lq.onrender.com/user/mentor', options);
    const updatedUser = await res.json();

    if (res.ok) {
      saveUser(updatedUser.user)
      return { history: updatedUser.history, mentor_details: updatedUser.mentor_details }
    } else {
      console.log(updatedUser);
    }

  }

  const updateOwnedMentors = async (mentor) => {
    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mentor, user_id: user.user_id }) }
    const res = await fetch('https://mental-health-server-w9lq.onrender.com/mentor/store/buy', options);
    const updatedUser = await res.json();

    if (res.ok) {
      saveUser(updatedUser.updatedUser)
      return updatedUser.items
    } else {
      console.log(updatedUser);
    }
  }

  const completeStGoal = async (id) => {
    let options =  { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ goal_id: id, user_id: user.user_id }) }
    const res = await fetch('https://mental-health-server-w9lq.onrender.com/user/st/goals', options);
    const updatedUser = await res.json();

    if (res.ok) {
      saveUser(updatedUser)
    } else {
      console.log(updatedUser);
    }
  }

  const buyMentor = async ({ name, price }) => {
    if (user?.owned_mentors?.findIndex(n => n == name) >= 0 || user.dabloons < price) return
    let items = await updateOwnedMentors(name);

    return items;
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


  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <AuthContext.Provider value={{ user, saveUser, login, register, logout, completeIntro, updatePoints, updateGoals, updateMentor, completeStGoal, buyMentor }}>
      {children}
    </AuthContext.Provider>
  );
};
  
export const useAuth = () => useContext(AuthContext);