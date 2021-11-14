import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, MemoryRouter } from 'react-router-dom';

import App from '@/App';
import '@/index.css';

console.log(
  '%cSource code: https://github.com/zmwangx/AreYouSure',
  'color: #f97316; font-size: 20px'
);

// Use HashRouter in dev mode unless VITE_MEMORY_ROUTER is set, so that we can
// freely refresh and test each route without playing the entire damn game.
//
// Always use MemoryRouter in production.
const Router =
  import.meta.env.PROD || import.meta.env.VITE_MEMORY_ROUTER ? MemoryRouter : HashRouter;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App seed={Math.random()} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
