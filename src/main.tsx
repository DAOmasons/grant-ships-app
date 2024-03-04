import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './index.css';
import {
  createGameManagerPool,
  createGameManagerPoolProfile,
} from './scripts/createGameManagerPool.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
createGameManagerPool();
