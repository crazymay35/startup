import React, {useState} from 'react';
import './generator.css';

export function Generator() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        console.log("user not logged in");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const thisUser = users[currentUser];
    if (!thisUser) {
        console.log("user not found");
        return;
    }

    const generateColors = () => {
        fetch(`https://x-colors.yurace.pro/api/random?number=5`)
        .then((response) => response.json())
        .then((data) => {
            const newColors = data.map(item => item.rgb);
            setColors(newColors);
        });
    };

    React.useEffect(() => {
        generateColors();
    }, [])
    /*const randomRGB = () => ({
        r: Math.floor(Math.random() *256),
        g: Math.floor(Math.random() *256),
        b: Math.floor(Math.random() *256)
    });*/
    /*const createRandomPalette = () => 
        Array.from({length:5}, () => randomRGB());*/

    const [colors, setColors] = useState([]);
    
    /*const generateColors = () => {
        setColors(createRandomPalette());
    }*/
    const savePalette = () => {
        if (!thisUser.palettes) {
            thisUser.palettes = [];
        }
        thisUser.palettes.push(colors);
        localStorage.setItem("users", JSON.stringify(users));
    }
    return (
        <main className="generator-main-generator">
            <div className="generator-container generator-main-transparent-container">
                <div className="generator-color-box-container">
                    {colors.map((colorString, index) => (
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