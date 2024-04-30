import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Landingpage from './Landingpage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Landingpage />
  </React.StrictMode>
);

reportWebVitals();