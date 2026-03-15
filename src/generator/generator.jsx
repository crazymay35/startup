import React, {useState, useCallback, useEffect} from 'react';
import './generator.css';

export function Generator() {
    const [colors, setColors] = useState([]);

    const generateColors = useCallback(() => {
        fetch(`https://x-colors.yurace.pro/api/random?number=5`)
        .then((response) => response.json())
        .then((data) => {
            const fetchedColors = data.map(item => {
                const rgbValues = item.rgb.match(/\d+/g);
                return {
                    r: parseInt(rgbValues[0]),
                    g: parseInt(rgbValues[1]),
                    b: parseInt(rgbValues[2])
                };
            });
            setColors(fetchedColors);
        })
    }, []);
    
    useEffect(() => {
        generateColors();
    }, [generateColors]);
    
    
    /*if (!currentUser) {
        console.log("user not logged in");
        return;
    }
   /* const users = JSON.parse(localStorage.getItem("users")) || {};
    const thisUser = users[currentUser];
    if (!thisUser) {
        console.log("user not found");
        return;
    }*/

    
    const savePalette = async () => {
        /*if (!thisUser.palettes) {
            thisUser.palettes = [];
        }
        thisUser.palettes.push(colors);
        localStorage.setItem("users", JSON.stringify(users));*/
        const currentUser = localStorage.getItem("currentUser");
        
        const response = await fetch('api/palettes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: currentUser,
                palette: colors,
            }),
        });

        if (!response.ok) {
            console.error("failed to save palette");
        }
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