import React from 'react';
import './generator.css';

export function Generator() {
  return (
    <main className="generator-main-generator">
        <div className="generator-container generator-main-transparent-container">
            <div className="generator-color-box-container">
                <div className="generator-inner-box"></div>
                <div className="generator-inner-box"></div>
                <div className="generator-inner-box"></div>
                <div className="generator-inner-box"></div>
                <div className="generator-inner-box"></div>
            </div>
            <div>
                <button type="button" className="btn btn-primary my-button">Save Palette</button>
                <button type="button" className="btn btn-secondary">Generate</button>
            </div>
        </div>            
    </main>
  );
}