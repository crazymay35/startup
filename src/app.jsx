import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Login } from './login/login';
import { Generator } from './generator/generator';
import { Create } from './create/create';
import { Palettes } from './palettes/palettes';
import { Following } from './following/following';

import { AuthState } from './login/authState';

export default function App() {
    const [email, setEmail] = useState('');
    const [authState, setAuthState] = useState(AuthState.Unknown);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/user/me')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Not logged in');
            })
            .then((user) => {
                setEmail(user.email);
                setAuthState(AuthState.Authenticated);
            })
            .catch(() => {
                setAuthState(AuthState.Unauthenticated);
                setEmail("");
                localStorage.removeItem('email');
                localStorage.removeItem('username');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    return (
        <BrowserRouter>
            <div className="body">
                <Header 
                    authState={authState} 
                    setAuthState={setAuthState} 
                    setEmail={setEmail}
                />
                <Routes>
                    <Route path='/' element={
                        <Login onAuthChange = {(email, state) => {
                            setEmail(email);
                            setAuthState(state);
                        }}/>} 
                    />
                    <Route path='/generator' element={
                        authState === AuthState.Authenticated ?
                        <Generator email = {email}/> :
                        <Navigate to='/' replace/>} />
                    <Route path='/create' element={
                        authState === AuthState.Authenticated ?
                        <Create email = {email}/> :
                        <Navigate to='/' replace/>} />
                    <Route path='/palettes' element={
                        authState === AuthState.Authenticated ?
                        <Palettes email = {email} /> :
                        <Navigate to='/' replace/>} />
                    <Route path='/following' element={
                        authState === AuthState.Authenticated ?
                        <Following email = {email} /> :
                        <Navigate to='/' replace/>} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <footer>
                    <span>Maren Makrush</span>
                    <span><a href="https://github.com/crazymay35/startup">GitHub</a></span>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

function Header ({ authState, setAuthState, setEmail }) {
        const location = useLocation();
        const navigate = useNavigate();
        const onLoginPage = location.pathname === "/";

        async function logout() {
            await fetch(`/api/auth/logout`, {method: 'delete',credentials: 'include'})
            localStorage.removeItem('email');
            localStorage.removeItem('username');
            setEmail("");
            setAuthState(AuthState.Unauthenticated);
            navigate('/')
            console.log('logged out');
        }
        return (
            <header>
                <h1>
                    <img src="paintbrush-and-palette-svgrepo-com.svg"
                    alt="icon of a paintbrush and a color pallete"/>
                    COLOR PAL
                </h1>
                <ul> {authState === AuthState.Authenticated ? (<>
                    <li><button className='btn btn-secondary' onClick={logout}>Logout</button></li>
                    <li><NavLink to="/generator">Generate</NavLink></li>
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/palettes">Palettes</NavLink></li>
                    <li><NavLink to="/following">Friends</NavLink></li>
                </>) : (<li><NavLink to="/">Login</NavLink></li>)} 
                </ul>
            </header>
        );
    }