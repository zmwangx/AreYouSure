import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, MemoryRouter } from 'react-router-dom';

import App from '@/App';
import '@/index.css';

// Wraps children in React.StrictMode only if the VITE_REACT_STRICT_MODE env var
// is set. We do this because strict mode appears to interfere with useState
// functional updates, breaking app logic for ConfirmationSevenSegment,
// ConfirmationMinesweeper, etc.
function StrictModeWrapper({ children }: { children: React.ReactNode }) {
  return import.meta.env.VITE_REACT_STRICT_MODE ? (
    <React.StrictMode>{children}</React.StrictMode>
  ) : (
    <>{children}</>
  );
}

// Use HashRouter in dev mode unless VITE_MEMORY_ROUTER is set, so that we can
// freely refresh and test each route without playing the entire damn game.
//
// Always use MemoryRouter in production.
const Router =
  import.meta.env.PROD || import.meta.env.VITE_MEMORY_ROUTER ? MemoryRouter : HashRouter;

ReactDOM.render(
  <StrictModeWrapper>
    <Router>
      <App />
    </Router>
  </StrictModeWrapper>,
  document.getElementById('root')
);
