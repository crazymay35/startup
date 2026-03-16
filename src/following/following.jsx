import React, { useState, useEffect } from 'react';
import './following.css';
import { apiRequest} from '../api';


export function Following(userState) {
    const {email, user} = userState;
    if (!user) return <main>Loading...</main>;
   
    const[following, setFollowing] = useState([]);
    const[friendNames, setFriendNames] = useState({});
    const[newFriend,setNewFriend] = useState("");
    const[notifications, setNotifications] = useState([]);
    const[errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        apiRequest(`/api/user/${email}`).then(data => {
            setFollowing(data.following);
            setNotifications(data.notifications);
        })
    }, [email]);

    useEffect(() => {
        async function loadNames() {
            const names = {};
            for (const email of following) {
                try {
                    const data = await apiRequest(`/api/user/${email}`);
                    names[email] = data.username;
                }
                catch {
                    names[email] = email;
                }
            }
            setFriendNames(names);
        }
        if (following.lenth > 0) loadNames();
    }, [following]); 

    async function handleUnfollow(friendEmail) {
        const updated = await apiRequest("/api/friends", "DELETE", {
            currentUsersEmail: email,
            friendEmail
        });
        setFollowing(updated);
    }
    async function handleAddFriend() {
        try {
            const updated = await apiRequest("/api/friends", "POST", {
                currentUsersEmail: email,
                friendEmail: newFriend
        });
        setFollowing(updated);
        setNewFriend("");
        }
        catch(err) {
            setErrorMessage(err.message);
        }
    }
    async function handleCloseNotification(index) {
        const updated = await apiRequest("/api/notifications/clear", "POST", {
            email,
            notificationsIndex: index
        });
        setNotifications(updated);
    }
    async function handleAddPalette(notif, index) {
        await apiRequest("/api/palettes", "POST", {
            email,
            palette: notif.palette
        });
        handleCloseNotification(index);
    }

    return (
        <main className="following-main-container">
            <div className="following-main-transparent-container">
                <span className="thing">You Are: &emsp; {user?.username}</span>
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