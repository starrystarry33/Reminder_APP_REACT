

import React from 'react';
import { createRoot } from 'react-dom';
// import './index.css';
// import './scss/main.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

