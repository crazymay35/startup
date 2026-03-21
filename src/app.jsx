import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Generator } from './generator/generator';
import { Create } from './create/create';
import { Palettes } from './palettes/palettes';
import { Following } from './following/following';

import { AuthState } from './login/authState';

export default function App() {
    const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
    const currentAuthState = email ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    function Header () {
        const location = useLocation();
        const navigate = useNavigate();
        const onLoginPage = location.pathname === "/";

        function logout() {
            fetch(`/api/auth/logout`, {
                method: 'delete',
            })
            .finally(() => {
                setEmail('');
                setAuthState(AuthState.Unauthenticated)
                navigate('/')
            });
            console.log('logged out');
        }
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
                        <button className='btn btn-secondary'
                        onClick={logout}>Logout</button>
                    </li>
                    {authState === AuthState.Authenticated && (<>
                        <li><NavLink to="/generator">Generate</NavLink></li>
                        <li><NavLink to="/create">Create</NavLink></li>
                        <li><NavLink to="/palettes">Palettes</NavLink></li>
                        <li><NavLink to="/following">Friends</NavLink></li>
                    </>)}
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
                    <Route path='/' element={
                        <Login onAuthChange = {(userEmail, newStatus) => {
                            setEmail(userEmail);
                            setAuthState(newStatus);
                        }}/>} 
                    />
                    <Route path='/generator' element={<Generator email = {email} />} />
                    <Route path='/create' element={<Create email = {email}/>} />
                    <Route path='/palettes' element={<Palettes email = {email} />} />
                    <Route path='/following' element={<Following email = {email} />} />
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