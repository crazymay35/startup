import React from 'react';
import './create.css';

export function Create() {
  return (
    <main>
      <div className="create-main-transparent-container">
          <div className="create-container-boxes">
              <div className="create-container-color">
                  <div className="create-color-box-selector"></div>
                  <label className="create-label">R <input className="create-input" type="range" min="0" max="255" name="R"/></label>
                  <label className="create-label">G <input className="create-input" type="range" min="0" max="255" name="G"/></label>
                  <label className="create-label">B <input className="create-input" type="range" min="0" max="255" name="B"/></label>
              </div>
              <div className="create-container-color">
                  <div className="create-color-box-selector"></div>
                  <label className="create-label">R <input className="create-input" type="range" min="0" max="255" name="R"/></label>
                  <label className="create-label">G <input className="create-input" type="range" min="0" max="255" name="G"/></label>
                  <label className="create-label">B <input className="create-input" type="range" min="0" max="255" name="B"/></label>
              </div>
          </div>
          <div className="create-container">
              <div className="create-color-box-container">
                  <div className="create-inner-box"></div>
                  <div className="create-inner-box"></div>
                  <div className="create-inner-box"></div>
                  <div className="create-inner-box"></div>
                  <div className="create-inner-box"></div>
              </div>
              <div>
                  <button type="button" className="btn btn-primary my-button">Save Palette</button>
              </div>
          </div>
      </div>
  </main>
  );
}