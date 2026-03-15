import React, { useState } from 'react';
import './following.css';
import { apiRequest, useUser } from '../api';

export function Following() {
    const currentUser = useUser();
   
    const[following, setFollowing] = useState(thisUser?.following || []);
    const[newFriend,setNewFriend] = useState("");
    const [notifications, setNotifications] = useState(thisUser?.notifications || []);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const data = await apiRequest(`/api/user/${currentUser.email}`);
        setFollowing(data.following);
        setNotifications(data.notifications);
    }

    async function handleUnfollow(email) {
        const updated = await apiRequest("/api/friends", "DELETE", {
            currentUsersEmail: currentUser,
            friendEmail: email
        });
        setFollowing(updated);
        setNewFriend("");
    }
    async function handleAddFriend() {
        const updated = await apiRequest("/api/friends", "POST", {
            currentUsersEmail: currentUser,
            friendEmail: newFriend
        });
        setFollowing(updated);
        setNewFriend("");
    }
    async function handleCloseNotification(index) {
        const updated = await apiRequest("/ap/notifications/clear", "POST", {
            email: currentUser,
            notificationsIndex: index
        });
        setNotifications(updated);
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