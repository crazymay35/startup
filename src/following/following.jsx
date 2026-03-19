import React, { useState, useEffect } from 'react';
import './following.css';

export function Following({email}) {
    const[following, setFollowing] = useState([]);
    const[friendNames, setFriendNames] = useState({});
    const[newFriend, setNewFriend] = useState("");
    const[notifications, setNotifications] = useState([]);
    const[errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!email) return;

        fetch(`/api/user/${email}`)
        .then(response => {
            if (!response.ok) throw new Error('failed to fetch');
            return response.json();
        })
        .then(data => {
            const {following, notifications} = data;
            setFollowing(following);
            setNotifications(notifications);
        })
        .catch(err => console.error("Loading error:", err));
    }, [email]);

    useEffect(() => {
        async function loadNames() {
            const entries = await Promise.all(
                following.map(async (friendEmail) => {
                    try {
                        const response = await fetch(`/api/user/${friendEmail}`);
                        const data = await response.json();
                        return [friendEmail, data.username];
                    }
                    catch {
                        return [friendEmail, friendEmail];
                    }
                })
            );

            setFriendNames(Object.fromEntries(entries));
        }
        if (following.length > 0) loadNames();
        else setFriendNames({});
    }, [following]); 

    async function handleUnfollow(friendEmail) {
        const response = await fetch('/api/friends', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friendEmail })
        })
        if (response.ok) {
            const updateFollowing = await response.json();
            setFollowing(updateFollowing);
        }
    }
    async function handleAddFriend() {
        const response = await fetch('/api/friends', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friendEmail: newFriend })
        });
        const data = await response.json();
        if (response.ok) {
            setFollowing(data);
            setNewFriend("");
        }
        else {
            setErrorMessage("user not found, error with data");
        }
    }
    async function handleCloseNotification(index) {
        const response = await fetch('/api/notifications/clear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index })
        });
        if (response.ok) {
            const updatedNotifications = await response.json();
            setNotifications(updatedNotifications);
        }
    }
    async function handleAddPalette(notif, index) {
        const response = await fetch('/api/palettes', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({palette: notif.palette})
        });
        if (response.ok) {
            handleCloseNotification(index);
        }
    }

    return (
        <main className="following-main-container">
            <div className="following-main-transparent-container">
                <span className="thing">You Are: &emsp; {email}</span>
                <span id="following-faculty-glyphic-regular">FRIENDS</span>
                
                {following.map(email => (
                        <div key={email}>
                            {friendNames[email] || email}
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

                {notifications.map((notif, index) => (
                    <div key={index}>
                        {friendNames[notif.from] || notif.from} shared a palette
                        <button type="button" className="btn btn-primary my-button"
                            onClick={() => handleAddPalette(notif, index)}>+</button>
                        <button type="submit" className="btn btn-secondary"
                            onClick={() => handleCloseNotification(index)}>x</button>
                    </div>
                ))}
            </div>
        </main>
    );
}