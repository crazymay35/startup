import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div class="body">
        <header>
            <h1>
                <img src="public/paintbrush-and-palette-svgrepo-com.svg"
                alt="icon of a paintbrush and a color pallete"/>
                COLOR PAL
            </h1>
            <ul>
                <li><a href="index.html">Login</a></li>
                <li><a href="generator.html">Generate</a></li>
                <li><a href="create.html">Create</a></li>
                <li><a href="palletes.html">Palettes</a></li>
                <li><a href="following.html">Friends</a></li>
            </ul>
        </header>
        <main> put content here </main>
        <footer>
            <span>Maren Makrush</span>
            <span><a href="https://github.com/crazymay35/startup">GitHub</a></span>
        </footer>
    </div>
  );
}