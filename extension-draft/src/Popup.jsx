import React, { useState } from 'react';
import { Popup } from './Popup';
import usagiImage from './avatar-images/usagi.jpg';
import './App.css';

export default function App({ health, avatarImage }) {
  const handleDetailsClick = () => {
    window.open(chrome.runtime.getURL('index.html'), '_blank');
  };

  return (
    <div className="app">
      <Popup
        health={health}
        avatarImage={avatarImage}
        onDetailsClick={handleDetailsClick}
      />
    </div>
  );
}