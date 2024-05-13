import React, { useState } from 'react';
import { Chromagotchi } from './Chromagotchi';
import babyImage from './avatar-images/BABY.png';
import './Popup.css';

export function Popup({ onDetailsClick }) {
  const [health, setHealth] = useState(90);
  const [avatarImage, setAvatarImage] = useState(babyImage);

  return (
    <div className="popup-container">
      <div className="header">Chromagotchi</div>
      <Chromagotchi health={health} avatarImage={avatarImage} />
      <button className="details-button" onClick={onDetailsClick}>
        Details
      </button>
    </div>
  );
}