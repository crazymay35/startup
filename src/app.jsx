import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './login/login';
import { Generator } from './generator/generator';
import { Create } from './create/create';
import { Palletes } from './palletes/palletes';
import { Following } from './following/following';

import { ProtectedRoute } from "./login/ProtectedRoute";
import { useUser } from './api';

export default function App() {
    const userState = useUser();   // <--- useUser called ONCE

    return (
        <BrowserRouter>
            <div className="body">
                <Header userState={userState} />
                <Routes>
                    <Route path='/' element={<Login userState={userState}/>} />
                    <Route path='/generator' element={<ProtectedRoute userState={userState}><Generator userState={userState} /></ProtectedRoute>}/>
                    <Route path='/create' element={<ProtectedRoute userState={userState}><Create userState={userState} /></ProtectedRoute>}/>
                    <Route path='/palletes' element={<ProtectedRoute userState={userState}><Palletes userState={userState} /></ProtectedRoute>}/>
                    <Route path='/following' element={<ProtectedRoute userState={userState}><Following userState={userState} /></ProtectedRoute>}/>
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

function Header({ userState }) {
    const { email, user } = userState;
    const location = useLocation();
    const onLoginPage = location.pathname === "/";

    return (
        <header>
            <h1>
                <img src="paintbrush-and-palette-svgrepo-com.svg"
                     alt="icon of a paintbrush and a color pallete"/>
                COLOR PAL
            </h1>

            <ul>
                {onLoginPage || !user ? (
                    <li><NavLink to="/">Login</NavLink></li>
                ) : (
                    <>
                        <li>
                            <button className='btn btn-secondary'
                                onClick={() => {
                                    localStorage.removeItem("currentUser");
                                    window.location.href = "/";
                                }}>
                                Logout
                            </button>
                        </li>
                        <li><NavLink to="/generator">Generate</NavLink></li>
                        <li><NavLink to="/create">Create</NavLink></li>
                        <li><NavLink to="/palletes">Palettes</NavLink></li>
                        <li><NavLink to="/following">Friends</NavLink></li>
                    </>
                )}
            </ul>
        </header>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
