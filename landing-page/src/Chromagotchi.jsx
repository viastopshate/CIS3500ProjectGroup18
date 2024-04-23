import React from 'react';
import './Chromagotchi.css';

export function Chromagotchi({ health, avatarImage }) {
  return (
    <div className="health-bar-container">
      <img src={avatarImage} alt="Chromagotchi Avatar" className="avatar" />
      <div className="health-bar">
        <div className="health-bar-fill" style={{ width: `${health}%` }}></div>
      </div>
      <div className="health-value">{health}</div>
    </div>
  );
}