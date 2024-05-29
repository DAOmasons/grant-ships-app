import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './index.css';
import { getRecordsByTag } from './queries/getRecordsByTag.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

getRecordsByTag(
  'TAG:SHIP_SUBMIT_REPORT-0xb8a2753eeeaa35470efb38ac26b7ecfc688475ea'
);
