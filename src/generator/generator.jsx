import React from 'react';
import './generator.css';

export function Generator() {
  return (
    <main className="main-generator">
        <div className="container main-transparent-container">
            <div className="color-box-container">
                <div className="inner-box"></div>
                <div className="inner-box"></div>
                <div className="inner-box"></div>
                <div className="inner-box"></div>
                <div className="inner-box"></div>
            </div>
            <div>
                <button type="button" className="btn btn-primary my-button">Save Palette</button>
                <button type="button" className="btn btn-secondary">Generate</button>
            </div>
        </div>            
    </main>
  );
}