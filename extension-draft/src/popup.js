import React from 'react';
import ReactDOM from 'react-dom';
import { Popup } from './Popup.jsx';

const openLandingPage = () => {
  const landingPageURL = chrome.runtime.getURL('index.html');
  window.open(landingPageURL, '_blank');
};

ReactDOM.render(
  <React.StrictMode>
    <Popup onDetailsClick={openLandingPage} />
  </React.StrictMode>,
  document.getElementById('popup-root')
);