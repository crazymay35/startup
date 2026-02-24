import React, { useState } from 'react';
import './create.css';

export function Create() {
    const [color1, setColor1] = useState({r:0,g:0,b:0});
    const [color2, setColor2] = useState({r:0,g:0,b:0});

    const handleCreateChange = (setter) => (e) => {
        const {name, value} = e.target;
        setter((prev) => ({...prev, [name]: Number(value)}))
    };
    return (
        <main>
            <div className="create-main-transparent-container">
                <div className="create-container-boxes">
                    <div className="create-container-color">
                        <div className="create-color-box-selector"
                            style={{backgroundColor: `rgb(${color1.r}, ${color1.g}, ${color1.b})`}}>
                        </div>
                            
                        <label className="create-label">R </label>
                            <input className="create-input" type="range" min="0" max="255" name="r"
                            value={color1.r} onChange={handleCreateChange(setColor1)}/>
                        <label className="create-label">G </label>
                            <input className="create-input" type="range" min="0" max="255" name="g"
                            value={color1.g} onChange={handleCreateChange(setColor1)}/>
                        <label className="create-label">B </label>
                            <input className="create-input" type="range" min="0" max="255" name="b"
                            value={color1.b} onChange={handleCreateChange(setColor1)}/>
                    </div>
                    <div className="create-container-color">
                        <div className="create-color-box-selector"
                            style={{backgroundColor: `rgb(${color2.r}, ${color2.g}, ${color2.b})`}}>
                        </div>
                        <label className="create-label">R </label>
                            <input className="create-input" type="range" min="0" max="255" name="r"
                            value={color2.r} onChange={handleCreateChange(setColor2)}/>
                        <label className="create-label">G </label>
                            <input className="create-input" type="range" min="0" max="255" name="g"
                            value={color2.g} onChange={handleCreateChange(setColor2)}/>
                        <label className="create-label">B </label>
                            <input className="create-input" type="range" min="0" max="255" name="b"
                            value={color2.b} onChange={handleCreateChange(setColor2)}/>
                    </div>
                </div>
                <div className="create-container">
                    <div className="create-color-box-container">
                        {[0,1,2,3,4].map((i) => {
                            const t = i/4;
                            const r = Math.round(color1.r + (color2.r - color1.r) * t);
                            const g = Math.round(color1.g + (color2.g - color1.g) * t);
                            const b = Math.round(color1.b + (color2.b - color1.b) * t);

                            return (
                                <div key={i} className="create-inner-box" 
                                    style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary my-button">Save Palette</button>
                    </div>
                </div>
            </div>
        </main>
    );
}