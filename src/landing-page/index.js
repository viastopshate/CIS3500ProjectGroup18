// This is the entry point of the React application for the landing page.
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import { tabListener } from './utils';

tabListener();

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
