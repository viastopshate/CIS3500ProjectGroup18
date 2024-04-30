import React, { useState } from 'react';
import { Chromagotchi } from './Chromagotchi';
import usagiImage from './avatar-images/usagi.jpg';
import './Popup.css';

export function Popup() {
  const [health, setHealth] = useState(90);
  const [avatarImage, setAvatarImage] = useState(usagiImage);

  const handleDetailsClick = () => {
    chrome.tabs.create({ url: 'index.html' });
  };

  return (
    <div className="popup-container">
      <div className="header">Chromagotchi</div>
      <Chromagotchi health={health} avatarImage={avatarImage} />
      <button className="details-button" onClick={handleDetailsClick}>
        Details
      </button>
    </div>
  );
}