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

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('/api/user/me', { credentials: 'include' });
                
                if (response.ok) {
                    const user = await response.json();
                    setEmail(user.email);
                    setAuthState(AuthState.Authenticated);
                } else {
                    throw new Error('Unauthorized');
                }
            } catch (error) {
                // Network error OR the Error thrown above
                console.error("Auth check failed:", error);
                setAuthState(AuthState.Unauthenticated);
                localStorage.clear(); 
            }
        }
        checkAuth();
    }, []);

    if (authState === AuthState.Unknown) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
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
                <ul> {authState === AuthState.Authenticated ? (
                    <>
                        <li><button className='btn btn-secondary' onClick={logout}>Logout</button></li>
                        <li><NavLink to="/generator">Generate</NavLink></li>
                        <li><NavLink to="/create">Create</NavLink></li>
                        <li><NavLink to="/palettes">Palettes</NavLink></li>
                        <li><NavLink to="/following">Friends</NavLink></li>
                    </>
                ) : authState === AuthState.Unauthenticated ? (
                    /* 2. Only show Login if definitely Unauthenticated */
                    <li><NavLink to="/">Login</NavLink></li>
                ) : (
                    /* 3. If Unknown, show nothing at all (prevents flicker) */
                    <li><NavLink to="/">Login</NavLink></li>
                )} 
                </ul>
            </header>
        );
    }