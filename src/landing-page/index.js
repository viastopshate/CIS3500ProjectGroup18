import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this import for React 18
import './index.css';
import App from './App';
import { tabListener } from './utils';

tabListener();

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot for React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
