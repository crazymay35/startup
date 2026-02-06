import React from 'react';
import './create.css';

export function Create() {
  return (
    <main>
      <div className="main-transparent-container">
          <div className="container-boxes">
              <div className="container-color">
                  <div className="color-box-selector"></div>
                  <label>R <input type="range" min="0" max="255" name="R"/></label>
                  <label>G <input type="range" min="0" max="255" name="G"/></label>
                  <label>B <input type="range" min="0" max="255" name="B"/></label>
              </div>
              <div className="container-color">
                  <div className="color-box-selector"></div>
                  <label>R <input type="range" min="0" max="255" name="R"/></label>
                  <label>G <input type="range" min="0" max="255" name="G"/></label>
                  <label>B <input type="range" min="0" max="255" name="B"/></label>
              </div>
          </div>
          <div className="container">
              <div className="color-box-container">
                  <div className="inner-box"></div>
                  <div className="inner-box"></div>
                  <div className="inner-box"></div>
                  <div className="inner-box"></div>
                  <div className="inner-box"></div>
              </div>
              <div>
                  <button type="button" className="btn btn-primary my-button">Save Palette</button>
              </div>
          </div>
      </div>
  </main>
  );
}