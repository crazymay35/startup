import React, {useState, useEffect} from 'react';
import './generator.css';

export function Generator(email) {
    const [colors, setColors] = useState([]);

    async function generateColors() {
        const response = await fetch(`https://x-colors.yurace.pro/api/random?number=5`)
        const data = await response.json();
    
        const fetchedColors = data.map(({ rgb }) => {
            const [r,g,b] = rgb.match(/\d+/g).map(Number);
            return { r,g,b };
        });
        setColors(fetchedColors);
    }

    useEffect(() => {
        generateColors();
    }, []);
    
    async function savePalette() {
        await apiRequest("/api/palettes", "POST", {
            email,
            palette: colors
        });
    }
    return (
        <main className="generator-main-generator">
            <div className="generator-container generator-main-transparent-container">
                <div className="generator-color-box-container">
                    {colors.map((c, index) => (
                        <div key={index} className="generator-inner-box"
                            style={{backgroundColor: `rgb(${c.r}, ${c.g}, ${c.b})`}}
                        />
                    ))}
                </div>
                <div>
                    <button type="button" className="btn btn-primary my-button"
                        onClick={savePalette}>Save Palette</button>
                    <button type="button" className="btn btn-secondary"
                        onClick={generateColors}>Generate</button>
                </div>
            </div>            
        </main>
    );
}