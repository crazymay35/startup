import React, {useState, useCallback, useEffect} from 'react';
import './generator.css';
import { apiRequest, useUser} from '../api';
import { Palletes} from '../palletes/palletes';

export function Generator() {
    const [colors, setColors] = useState([]);

    async function generateColors() {
        const response = await fetch(`https://x-colors.yurace.pro/api/random?number=5`)
        const data = await response.json();
    
        const fetchedColors = data.map(item => {
            const rgbValues = item.rgb.match(/\d+/g);
            return {
                r: +rgbValues[0],
                g: +rgbValues[1],
                b: +rgbValues[2]
            };
        });
        setColors(fetchedColors);
    }

    useEffect(() => {
        generateColors();
    }, [generateColors]);
    
    async function savePalette() {
        const {currEmail, currUser} = useUser();
        if (!currUser) return;
        await apiRequest("/api/palettes", "POST", {
            email: currEmail,
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