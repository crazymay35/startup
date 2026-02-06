import React from 'react';
import './following.css';

export function Following() {
  return (
    <main className="main-container">
        <div className="main-transparent-container">
            <span>You Are: &emsp; current-player</span>
            <span id="faculty-glyphic-regular">FRIENDS</span>
            <div>
                USERNAME1
                <button type="button" className="btn btn-primary my-button">Unfollow</button>
            </div>
            <div>
                USERNAME2
                <button type="button" className="btn btn-primary my-button">Unfollow</button>
            </div>
            <div>
                USERNAME3
                <button type="button" className="btn btn-primary my-button">Unfollow</button>
            </div>
            <form>
                <input type="email" className="form-control" placeholder="example@email.com"/>
                <button type="button" className="btn btn-primary my-button">Add Friend</button>
            </form>
        </div>
        <div className="main-transparent-container">
            <span id="faculty-glyphic-regular">NOTIFICATIONS</span>
            <div>
                USERNAME1 shared a palette
                <button type="button" className="btn btn-primary my-button">Add</button>
                <button type="submit" className="btn btn-secondary">Dismiss</button>
            </div>
            <div>
                USERNAME1 shared a palette
                <button type="button" className="btn btn-primary my-button">Add</button>
                <button type="submit" className="btn btn-secondary">Dismiss</button>
            </div>
            <div>
                USERNAME3 shared a palette
                <button type="button" className="btn btn-primary my-button">Add</button>
                <button type="submit" className="btn btn-secondary">Dismiss</button>
            </div>
        </div>
    </main>
  );
}