import React, { useState } from 'react';
import './following.css';

export function Following() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        console.log("user not logged in");
        return null;
    }
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const thisUser = users[currentUser];

    if (!thisUser) {
        console.log("user not found");
        return null;
    }
    const thisUsername = thisUser.username;
    const[following, setFollowing] = useState(thisUser.following || []);

    function handleUnfollow(email) {
        const updated = following.filter(f => f !== email);
        setFollowing(updated);

        users[currentUser].following = updated;
        localStorage.setItem("users",JSON.stringify(users));
    }

    const[newFriendEmail,setNewFriendEmail] = useState("");
    const[errorMessage,setErrorMessage] = useState("");

    function handleAddFriend() {
        const email = newFriendEmail.trim().toLowerCase();;
        if (!email) {return;}
        if (!users[email]) {
            console.log("user not found");
            setErrorMessage("user not found");
            return;
        }
        if (email === currentUser) {
            console.log("can't add yourself");
            setErrorMessage("can't add yourself");
            return;
        }
        if (following.includes(email)) {
            console.log("already following them");
            setErrorMessage("already following them");
            return;
        }
        const updated = [...following, email];
        setFollowing(updated);
        users[currentUser].following = updated;
        localStorage.setItem("users", JSON.stringify(users));
        setNewFriendEmail("");
        setErrorMessage("");
    }



    return (
        <main className="following-main-container">
            <div className="following-main-transparent-container">
                <span className="thing">You Are: &emsp; {thisUsername}</span>
                <span id="following-faculty-glyphic-regular">FRIENDS</span>
                
                {following.map(email => {
                    const friend = users[email];
                    const friendName = friend?.username || email;
                    
                    return (
                        <div key={email}>
                            {friendName}
                            <button type="button" className="btn btn-secondary"
                                onClick={() => handleUnfollow(email)}>Unfollow</button>
                        </div>
                    );
                })}
                
                <form className="form-thing" onSubmit={e => e.preventDefault()}>
                    <input type="email" className="form-control" placeholder="example@email.com"
                        value={newFriendEmail} onChange={e => {setNewFriendEmail(e.target.value); setErrorMessage("");}}/>
                    {errorMessage && (<div>{errorMessage}</div>)}
                    <button type="button" className="btn btn-primary my-button"
                        onClick={handleAddFriend}>Add Friend</button>
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