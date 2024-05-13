import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { tabListener } from '../landing-page/utils';

tabListener();

const rootElement = document.getElementById('root'); // The DOM element where React will mount
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);