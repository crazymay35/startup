import { useEffect, useState } from 'react';
import './palettes.css';

export function Palettes(email) {
    
    const [palettes,setPalettes] = useState([]);

    useEffect(() => {
        apiRequest(`/api/user/${email}`).then(data => setPalettes(data.palettes));
    }, [email]);

    async function handleRemove(index) {
        const updated = await apiRequest("/api/palettes", "DELETE", {
            email,
            index
        });
        setPalettes(updated);
    }

    async function  handleShare(palette) {
        await apiRequest("/api/share", "POST", {
            fromEmail: email,
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