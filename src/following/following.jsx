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

    const[following, setFollowing] = useState(thisUser?.following || []);
    const[newFriend,setNewFriend] = useState("");
    const[errorMessage,setErrorMessage] = useState("");
    const [notifications, setNotifications] = useState(thisUser?.notifications || []);

    function handleUnfollow(email) {
        const updated = following.filter(f => f !== email);
        setFollowing(updated);

        users[currentUser].following = updated;
        localStorage.setItem("users",JSON.stringify(users));
    }
    function handleAddFriend() {
        const email = newFriend.trim().toLowerCase();;
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
        setNewFriend("");
        setErrorMessage("");
    };
    function handleCloseNotification(notif) {
        const updated = notifications.filter(n => n !== notif);
        setNotifications(updated);

        users[currentUser].notifications = updated;
        localStorage.setItem("users",JSON.stringify(users));
    }
    function handleAddPalette(notif) {
        const addPalette = notif.palette;
        if (!thisUser.palettes) {
            thisUser.palettes = [];
        }
        thisUser.palettes.push(addPalette);
        users[currentUser] = thisUser;
        handleCloseNotification(notif);
    }

    return (
        <main className="following-main-container">
            <div className="following-main-transparent-container">
                <span className="thing">You Are: &emsp; {thisUser.username}</span>
                <span id="following-faculty-glyphic-regular">FRIENDS</span>
                
                {following.map(email => (
                        <div key={email}>
                            {users[email]?.username || email}
                            <button type="button" className="btn btn-secondary"
                                onClick={() => handleUnfollow(email)}>Unfollow</button>
                        </div>
                    )
                )}
                
                <form className="form-thing" onSubmit={e => e.preventDefault()}>
                    <input type="email" className="form-control" placeholder="example@email.com" 
                    value={newFriend} 
                    onChange={e => {setNewFriend(e.target.value); setErrorMessage("");}}/>
                    {errorMessage && (<div>{errorMessage}</div>)}
                    <button type="button" className="btn btn-primary my-button"
                        onClick={handleAddFriend}>Add Friend</button>
                </form>
            </div>
            <div className="following-main-transparent-container">
                <span id="following-faculty-glyphic-regular">NOTIFICATIONS</span>

                {notifications.map((notif, index) => {
                    const senderEmail = notif.from;
                    const friendName = users[senderEmail]?.username || senderEmail;

                    return (
                        <div key={index}>
                            {friendName} shared a palette
                            <button type="button" className="btn btn-primary my-button"
                                onClick={() => handleAddPalette(notif)}>+</button>
                            <button type="submit" className="btn btn-secondary"
                                onClick={() => handleCloseNotification(notif)}>x</button>
                        </div>
                    )
                })}
            </div>
        </main>
    );
}