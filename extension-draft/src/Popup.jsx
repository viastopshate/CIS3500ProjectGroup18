import React from 'react';
import { Chromagotchi } from './Chromagotchi';
import './Popup.css';

export function Popup({ health, avatarImage, onDetailsClick }) {
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