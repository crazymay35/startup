import React, { useEffect, useState } from 'react';
import './palettes.css';

export function Palettes({email}) {
    
    const [palettes,setPalettes] = useState([]);

    useEffect(() => {
        if (!email) return;

        fetch(`/api/user/${email}`)
        .then(response => {
            if (!response.ok) throw new Error('failed to fetch');
            return response.json();
        })
        .then(data => setPalettes(data.palettes))
        .catch(err => console.error("Loading error:", err));
        
    }, [email]);

    async function handleRemove(index) {
        const response = await fetch("/api/palettes", {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', 
            body: JSON.stringify({ index })
        });
        if (response.ok) {
            const data = await response.json();
            setPalettes(data.palettes);
            console.log("removed palette");
        }
    }

    async function handleShare(palette) {
        const response = await fetch("/api/share", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', 
            body: JSON.stringify({ palette })
        })
        if (response.ok) {
            console.log("shared palette");
        }
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