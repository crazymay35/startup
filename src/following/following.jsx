import React, { useState, useEffect } from 'react';
import './following.css';
import { apiRequest, useUser } from '../api';


export function Following() {
    const {currEmail, currUser} = useUser();
    if (!currUser) return;
   
    const[following, setFollowing] = useState([]);
    const[newFriend,setNewFriend] = useState("");
    const[notifications, setNotifications] = useState([]);
    const[errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        apiRequest(`/api/user/${currEmail}`).then(thing => {
            setFollowing(thing.following);
            setNotifications(thing.notifications);
        })
    }, []);

    /*async function loadUser() {
        const data = await apiRequest(`/api/user/${currentUser.email}`);
        setFollowing(data.following);
        setNotifications(data.notifications);
    }*/

    async function handleUnfollow(friend) {
        const updated = await apiRequest("/api/friends", "DELETE", {
            currentUsersEmail: currEmail,
            friendEmail: friend
        });
        setFollowing(updated);
    }
    async function handleAddFriend() {
        const updated = await apiRequest("/api/friends", "POST", {
            currentUsersEmail: currEmail,
            friendEmail: newFriend
        });
        setFollowing(updated);
        setNewFriend("");
    }
    async function handleCloseNotification(index) {
        const updated = await apiRequest("/api/notifications/clear", "POST", {
            email: currEmail,
            notificationsIndex: index
        });
        setNotifications(updated);
    }
    async function handleAddPalette(notif) {
        /*const addPalette = notif.palette;
        if (!thisUser.palettes) {
            thisUser.palettes = [];
        }
        thisUser.palettes.push(addPalette);
        users[currentUser] = thisUser;
        handleCloseNotification(notif);*/
        const updated = await apiRequest("/api/palettes", "POST", {
            email: currEmail,
            palette: notif.palette
        });
        handleCloseNotification(notif.index);
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