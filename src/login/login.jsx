import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './login.css';
import { jsx } from 'react/jsx-runtime';
import { ProtectedRoute } from "./ProtectedRoute";

export function Login() {
    /*store the variables*/
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");

    const[showCreateAccount,setShowCreateAccount] = useState(false);
    const[errorMessage,setErrorMessage] = useState("");

    const navigate = useNavigate();
 
    function handleLogin(e) {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || {};
        const user = users[email];

        if (!user) {
            setErrorMessage("user not found");
            console.log("user not found");
            return;
        }
        
        if (user.password !== password) {
            setErrorMessage("password incorrect");
            console.log("password incorrect");
            return;
        }
        setErrorMessage("")
        localStorage.setItem("currentUser",email);
        navigate("/create");
        /*if (!email) {
            console.log("email required")
            return;
        }
        if (!password) {
            console.log("password required")
            return;
        }
        
        const storedLogin = localStorage.getItem("currentUser");

        if (!storedLogin) {
            console.log("user not found");
            return;
        }

        const userOBJ = JSON.parse(storedLogin);

        if (userOBJ.password === password) {
            console.log("login sucessful!")
            navigate("/create")
        }
        else {
            console.log("password incorrect")
        }*/
    }
    function handleCreate(e) {
        e.preventDefault();
        /*if (!username) {
            console.log("username required")
            return;
        }
        if (!email) {
            console.log("email required")
            return;
        }
        if (!password) {
            console.log("password required")
            return;
        }*/
        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[email]) {
            console.log("email already exists");
            setErrorMessage("email already exists");
            return;
        }
        users[email] = {email, username, password};    
        localStorage.setItem("users", JSON.stringify(users));
        setErrorMessage("account created! please login");
        console.log("account created! please login");
        setShowCreateAccount(false);
    }

  return (
    <main>
        {showCreateAccount && 
            <div className='login-modal'>
                <h3 id="login-faculty-glyphic-regular">CREATE</h3>
                <h3 id="login-faculty-glyphic-regular" style={{marginBottom: "1rem"}}>ACCOUNT</h3>
                <form onSubmit={handleCreate}>
                    <input type="text" className="form-control" placeholder="username"
                        value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="email" className="form-control" placeholder="example@email.com" 
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="form-control" placeholder="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <span>
                        <button type="createAccount" className="btn btn-primary my-button">Create</button>
                        <button className="btn btn-secondary" 
                        onClick={() => setShowCreateAccount(false)}>Cancel</button>
                    </span>
                </form>
            </div>
        }
        <div className="login-main-transparent-container">
            <h3 id="login-faculty-glyphic-regular">WELCOME TO</h3>
            <h2>COLOR PAL!</h2>            
            <form onSubmit={handleLogin}>
                <input type="email" className="form-control" placeholder="example@email.com" 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="form-control" placeholder="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                <span>
                    <button type="submit" className="btn btn-primary my-button"
                        >Login</button>
                    <button type="button" className="btn btn-secondary" 
                        onClick={() => setShowCreateAccount(true)}>Create</button>
                </span>
            </form>
            {errorMessage && (<div>{errorMessage}</div>)}
        </div>
    </main>
  );
}