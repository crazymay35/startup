import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Generator } from './generator/generator';
import { Create } from './create/create';
import { Palletes } from './palletes/palletes';
import { Following } from './following/following';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body">
            <header>
                <h1>
                    <img src="paintbrush-and-palette-svgrepo-com.svg"
                    alt="icon of a paintbrush and a color pallete"/>
                    COLOR PAL
                </h1>
                <ul>
                    <li><NavLink to="/">Login</NavLink></li>
                    <li><NavLink to="/generator">Generate</NavLink></li>
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/palletes">Palettes</NavLink></li>
                    <li><NavLink to="/following">Friends</NavLink></li>
                </ul>
            </header>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/generator' element={<Generator />} />
                <Route path='/create' element={<Create />} />
                <Route path='/palletes' element={<Palletes />} />
                <Route path='/following' element={<Following />} />
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