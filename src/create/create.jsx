import React, { useState } from 'react';
import './create.css';

export function Create() {
    const [color1, setColor1] = useState({r:0,g:0,b:0});
    const [color2, setColor2] = useState({r:0,g:0,b:0});

    const handleCreateChange = (setter) => (e) => {
        const {name, value} = e.target;
        setter((prev) => ({...prev, [name]: Number(value)}))
    };

    function generateGradient(c1,c2) {
        return [0,1,2,3,4].map((i) => {
            const t = i/4;
            return {
                r : Math.round(color1.r + (color2.r - color1.r) * t),
                g : Math.round(color1.g + (color2.g - color1.g) * t),
                b : Math.round(color1.b + (color2.b - color1.b) * t)
            }
        })
    }

    function handleSavePalette() {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
            console.log("user not logged in");
            return;
        }
        
        const gradient = generateGradient(color1,color2);
        const savePalette = {
            color1,
            color2,
            gradient
        }
        
        let palettes = {};
        try {
            palettes = JSON.parse(localStorage.getItem("palettes")) || {};
        }
        catch {
            palettes = {};
        }
        if (!palettes[currentUser]) {
            palettes[currentUser] = [];
        }
        palettes[currentUser].push(savePalette);
        localStorage.setItem("palettes", JSON.stringify(palettes))
        console.log("palette saved!")
    }
    return (
        <main>
            <div className="create-main-transparent-container">
                <div className="create-container-boxes">
                    <div className="create-container-color">
                        <div className="create-color-box-selector"
                            style={{backgroundColor: `rgb(${color1.r}, ${color1.g}, ${color1.b})`}}>
                        </div>
                            
                        <label className="create-label">R &ensp;
                            <input className="create-input" type="range" min="0" max="255" name="r"
                            value={color1.r} onChange={handleCreateChange(setColor1)}/></label>
                        <label className="create-label">G &ensp;
                            <input className="create-input" type="range" min="0" max="255" name="g"
                            value={color1.g} onChange={handleCreateChange(setColor1)}/></label>
                        <label className="create-label">B &ensp;
                            <input className="create-input" type="range" min="0" max="255" name="b"
                            value={color1.b} onChange={handleCreateChange(setColor1)}/></label>
                    </div>
                    <div className="create-container-color">
                        <div className="create-color-box-selector"
                            style={{backgroundColor: `rgb(${color2.r}, ${color2.g}, ${color2.b})`}}>
                        </div>
                        <label className="create-label">R &ensp;
                            <input className="create-input" type="range" min="0" max="255" name="r"
                            value={color2.r} onChange={handleCreateChange(setColor2)}/></label>
                        <label className="create-label">G &ensp;
                            <input className="create-input" type="range" min="0" max="255" name="g"
                            value={color2.g} onChange={handleCreateChange(setColor2)}/></label>
                        <label className="create-label">B &ensp;
                            <input className="create-input" type="range" min="0" max="255" name="b"
                            value={color2.b} onChange={handleCreateChange(setColor2)}/></label>
                    </div>
                </div>
                <div className="create-container">
                    <div className="create-color-box-container">
                        {generateGradient(color1,color2).map((c,i) => (
                            <div key={i} className="create-inner-box" 
                                style={{backgroundColor: `rgb(${c.r}, ${c.g}, ${c.b})`}}>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary my-button"
                            onClick={handleSavePalette}
                        >Save Palette</button>
                    </div>
                </div>
            </div>
        </main>
    );
}