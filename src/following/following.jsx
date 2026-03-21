import React, { useState, useEffect } from 'react';
import './following.css';

export function Following({email}) {
    const[following, setFollowing] = useState([]);
    const[friendNames, setFriendNames] = useState({});
    const[newFriend, setNewFriend] = useState("");
    const[notifications, setNotifications] = useState([]);
    const[friendErrorMessage, setFriendErrorMessage] = useState("");
    const[NotificationErrorMessage, setNotificationErrorMessage] = useState("");

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
                        const response = await fetch(`/api/user/name/${friendEmail}`);
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
        const data = await response.json();
        if (response.ok) {
            setFollowing(data);
            console.log('unfollowed friend')
        }
        else {
            setFriendErrorMessage(data.msg || "an error occured");
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
            console.log('followed friend')
        }
        else {
            setFriendErrorMessage(data.msg || "an error occured");
        }
    }
    async function handleCloseNotification(index) {
        const response = await fetch('/api/notifications/clear', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index })
        });
        data = await response.json();
        if (response.ok) {
            setNotifications(data);
            console.log('closed notification');
        }
        else {
            setNotificationErrorMessage(data.msg || "an error occured");
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
            console.log('saved palette');
        }
        else {
            setNotificationErrorMessage(data.msg || "an error occured");
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
                    onChange={e => {setNewFriend(e.target.value); setFriendErrorMessage("");}}/>
                    {friendErrorMessage && (<div>{friendErrorMessage}</div>)}
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
                {NotificationErrorMessage && (<div>{NotificationErrorMessage}</div>)}
            </div>
        </main>
    );
}