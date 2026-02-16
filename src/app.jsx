import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './login/login';
import { Generator } from './generator/generator';
import { Create } from './create/create';
import { Palletes } from './palletes/palletes';
import { Following } from './following/following';

import { ProtectedRoute } from "./login/ProtectedRoute";

export default function App() {
    function Header () {
        const location = useLocation();
        const path = location.pathname;

        const email = localStorage.getItem("currentUser");
        const users = JSON.parse(localStorage.getItem("users")) || {};
        const storedUser = users[email];
        
        const onLoginPage = path === "/";
        
        /*let navContent;

        if (onLoginPage) {
            navContent = (
                <><li><NavLink to="/">Login</NavLink></li></>
            );
        }
        else {
            navContent = (
                <>
                    <li> hello {storedUser?.username}</li>
                    <li>
                        <button className='btn btn-primary my-button'
                        onClick={() => {
                            localStorage.removeItem("currentUser");
                            window.location.href = "/";
                        }}>Logout</button>
                    </li>
                    <li><NavLink to="/generator">Generate</NavLink></li>
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/palletes">Palettes</NavLink></li>
                    <li><NavLink to="/following">Friends</NavLink></li>
                </>
            )
        }*/
        return (
            <header>
                <h1>
                    <img src="paintbrush-and-palette-svgrepo-com.svg"
                    alt="icon of a paintbrush and a color pallete"/>
                    COLOR PAL
                </h1>
                <ul> {onLoginPage ? (<li><NavLink to="/">Login</NavLink></li>) : (
                    <>
                    <li>
                        <button className='btn btn-primary my-button'
                        onClick={() => {
                            localStorage.removeItem("currentUser");
                            window.location.href = "/";
                        }}>Logout</button>
                    </li>

                    <li><NavLink to="/generator">Generate</NavLink></li>
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/palletes">Palettes</NavLink></li>
                    <li><NavLink to="/following">Friends</NavLink></li>
                </>
                )} </ul>
            </header>
        );
    }
  return (
    <BrowserRouter>
        <div className="body">
            <Header />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/generator' element={<ProtectedRoute><Generator /></ProtectedRoute>} />
                <Route path='/create' element={<ProtectedRoute><Create /></ProtectedRoute>} />
                <Route path='/palletes' element={<ProtectedRoute><Palletes /></ProtectedRoute>} />
                <Route path='/following' element={<ProtectedRoute><Following /></ProtectedRoute>} />
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