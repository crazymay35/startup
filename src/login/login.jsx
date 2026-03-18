import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './login.css';
import { AuthState } from './authState';

export function Login(props) {

    const [emailCreate,setEmailCreate] = useState("");
    const [passwordCreate,setPasswordCreate] = useState("");
    const [usernameCreate,setUsernameCreate] = useState("");
    
    const [emailLogin,setEmailLogin] = useState("");
    const [passwordLogin,setPasswordLogin] = useState("");

    const[showCreateAccount,setShowCreateAccount] = useState(false);
    const[errorMessageLogin,setErrorMessageLogin] = useState("");
    const[errorMessageCreate,setErrorMessageCreate] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const response = await fetch(`/api/auth/login`, {
            method: 'post',
            body: JSON.stringify({email: emailLogin, 
            password: passwordLogin}),
            headers: { 'Content-type': 'application/json; charset=UTF-8'},
        });
        if (response.ok) {
            const body = await response.json();
            localStorage.setItem('email', body.email);
            props.onAuthChange(body.email, AuthState.Authenticated);
            navigate("/generator");
        }
        else {
            const body = await response.json();
            setErrorMessageLogin(`Error in login: ${body.msg}`);
        }
    }

    async function findUser(field, value) {
        return Object.values(users).find(u => u[field] === value);
    }

    async function handleCreate(e) {
        e.preventDefault();
        const response = await fetch(`/api/auth/create`, {
            method: 'post',
            body: JSON.stringify({email: emailCreate, 
                username: usernameCreate, 
                password: passwordCreate}),
            headers: { 'Content-type': 'application/json; charset=UTF-8'},
        });
        if (response?.status === 200) {
            setErrorMessageLogin("account created! please login");
            setShowCreateAccount(false);
        }
        else {
            const body = await response.json();
            setErrorMessageCreate(`Error in create account: ${body.msg}`);
        }
    }

    return (
        <main>
            {showCreateAccount && 
                <div className='login-modal'>
                    <h3 id="login-faculty-glyphic-regular">CREATE</h3>
                    <h3 id="login-faculty-glyphic-regular" style={{marginBottom: "1rem"}}>ACCOUNT</h3>
                    <form onSubmit={handleCreate}>
                        <input type="text" className="form-control" placeholder="username"
                            value={usernameCreate} onChange={(e) => setUsernameCreate(e.target.value)}/>
                        <input type="email" className="form-control" placeholder="example@email.com" 
                            value={emailCreate} onChange={(e) => setEmailCreate(e.target.value)}/>
                        <input type="password" className="form-control" placeholder="password"
                            value={passwordCreate} onChange={(e) => setPasswordCreate(e.target.value)}/>
                        <span>
                            <button type="submit" className="btn btn-primary my-button">Create</button>
                            <button type = "button" className="btn btn-secondary" 
                            onClick={() => {
                                setShowCreateAccount(false);
                                setErrorMessageCreate("");
                                setEmailCreate(""); 
                                setPasswordCreate(""); 
                                setUsernameCreate("");}}>Cancel</button>
                        </span>
                    </form>
                    {errorMessageCreate && (<div>{errorMessageCreate}</div>)}
                </div>
            }
            <div className="login-main-transparent-container">
                <h3 id="login-faculty-glyphic-regular">WELCOME TO</h3>
                <h2>COLOR PAL!</h2>            
                <form onSubmit={handleLogin}>
                    <input type="email" className="form-control" placeholder="example@email.com" 
                        value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)}/>
                    <input type="password" className="form-control" placeholder="password"
                        value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)}/>
                    <span>
                        <button type="submit" className="btn btn-primary my-button"
                            >Login</button>
                        <button type="button" className="btn btn-secondary" 
                            onClick={() => {
                                setShowCreateAccount(true);
                                setErrorMessageLogin("");
                            }}>Create</button>
                    </span>
                </form>
                {errorMessageLogin && (<div>{errorMessageLogin}</div>)}
            </div>
        </main>
    );
}