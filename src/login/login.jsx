import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
        <div className="login-main-transparent-container">
            <h3 id="login-faculty-glyphic-regular">WELCOME TO</h3>
            <h2>COLOR PAL!</h2>            
            <form method="get" action="create.html">
                <input type="email" className="form-control" placeholder="example@email.com"/>
                <input type="password" className="form-control" placeholder="password"/>
                <span>
                    <button type="submit" className="btn btn-primary my-button">Login</button>
                    <button type="submit" className="btn btn-secondary">Create</button>
                </span>
            </form>
        </div>
    </main>
  );
}