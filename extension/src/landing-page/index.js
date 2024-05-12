import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this import for React 18
import './index.css';
import Landingpage from '../Landingpage';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot for React 18
root.render(
  <React.StrictMode>
    <Landingpage />
  </React.StrictMode>
);
