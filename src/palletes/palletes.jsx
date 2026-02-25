import React, { useEffect, useState } from 'react';
import './palletes.css';

export function Palletes() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        console.log("user not logged in");
        return null;
    }

    const [palettes,setPalettes] = useState([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("palettes")) || {};
            setPalettes(stored[currentUser] || []);
        }
        catch {
            setPalettes([]);
        }
    }, [currentUser]);
   

    const handleRemove = (index) => {
        const updated = palettes.filter((_,i) => i !== index);
        setPalettes(updated);
        
        const allPalettes = JSON.parse(localStorage.getItem("palettes")) || {};
        allPalettes[currentUser] = updated;
        localStorage.setItem("palettes", JSON.stringify(allPalettes));
    }

    return (
        <main className="palletes-main-container">
            {palettes.map((palette, index) => (
                <div key={index} className="palletes-container palletes-main-transparent-container">
                    <div className="palletes-color-box-container">
                        {palette.gradient.map((color,i) => (
                            <div key={i} className="palletes-inner-box" 
                                style={{backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`}}>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary my-button">Share</button>
                        <button type="button" className="btn btn-secondary" 
                            onClick={() => handleRemove(index)}>Remove</button>
                    </div>
                </div>
            ))}
        </main>
    );
}