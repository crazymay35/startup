import React from 'react';
import './following.css';

export function Following() {
  return (
    <main className="following-main-container">
        <div className="following-main-transparent-container">
            <span className="thing">You Are: &emsp; current-player</span>
            <span id="following-faculty-glyphic-regular">FRIENDS</span>
            <div>
                USERNAME1
                <button type="button" className="btn btn-secondary">Unfollow</button>
            </div>
            <div>
                USERNAME2
                <button type="button" className="btn btn-secondary">Unfollow</button>
            </div>
            <div>
                USERNAME3
                <button type="button" className="btn btn-secondary">Unfollow</button>
            </div>
            <form className="form-thing">
                <input type="email" className="form-control" placeholder="example@email.com"/>
                <button type="button" className="btn btn-primary my-button">Add Friend</button>
            </form>
        </div>
        <div className="following-main-transparent-container">
            <span id="following-faculty-glyphic-regular">NOTIFICATIONS</span>
            <div>
                USERNAME1 shared a palette
                <button type="button" className="btn btn-primary my-button">+</button>
                <button type="submit" className="btn btn-secondary">x</button>
            </div>
            <div>
                USERNAME1 shared a palette
                <button type="button" className="btn btn-primary my-button">+</button>
                <button type="submit" className="btn btn-secondary">x</button>
            </div>
            <div>
                USERNAME3 shared a palette
                <button type="button" className="btn btn-primary my-button">+</button>
                <button type="submit" className="btn btn-secondary">x</button>
            </div>
        </div>
    </main>
  );
}