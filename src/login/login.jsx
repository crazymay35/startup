import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {apiRequest} from "../api.jsx";
import './login.css';

export function Login() {
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

        try {
            const user = await apiRequest("/api/auth/login","POST", 
                {email, password}
            );
            localStorage.setItem("currentUser", user.email);
            navigate("/create");
        }
        catch(err) {
            setErrorMessageLogin(err.message);
        }
    }
    async function handleCreate(e) {
        e.preventDefault();

        try {
            const user = await apiRequest("/api/auth/create", "POST", 
                {email, username, password}
            );
            localStorage.setItem("currentUser", user.email);
            setErrorMessageCreate("account created! login");
            setShowCreateAccount(false);
        }
        catch(err) {
            setErrorMessageCreate(err.message);
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