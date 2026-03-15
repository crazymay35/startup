import React, { useEffect, useState } from 'react';
import './palletes.css';
import { apiRequest, useUser } from '../api';

export function Palletes() {
    const currentUser = useUser();

    const [palettes,setPalettes] = useState([]);

    useEffect(() => {
        async function loadUser() {
            const response = await apiRequest(`/api/user/${currentUser}`);
            const data = await response.json();
            if (response.ok) {
                setPalettes(data.palette);
            }
        }
        loadUser();
    }, [currentUser]);

    async function handleRemove(index) {
        const updated = await apiRequest("/api/palettes", "DELETE", {
            email: currentUser,
            index
        });
        setPalettes(updated.palette);
    }

    async function  handleShare(palette) {
        await apiRequest("api/share", "POST", {
            fromEmail: currentUser,
            palette
        });
        console.log("palette shared");
    }

    return (
        <main className="palletes-main-container">
            {palettes.map((palette, index) => (
                <div key={index} className="palletes-container palletes-main-transparent-container">
                    <div className="palletes-color-box-container">
                        {palette.map((color,i) => (
                            <div key={i} className="palletes-inner-box" 
                                style={{backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`}}>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary my-button"
                            onClick={() => handleShare(palette)}>Share</button>
                        <button type="button" className="btn btn-secondary" 
                            onClick={() => handleRemove(index)}>Remove</button>
                    </div>
                </div>
            ))}
        </main>
    );
}