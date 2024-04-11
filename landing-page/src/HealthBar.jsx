import React from 'react';
import './HealthBar.css';

export function HealthBar({ health }) {
  return (
    <div className="health-bar-container">
      {/* Render the health bar */}
      <div className="health-bar">
        <div className="health-bar-fill" style={{ width: `${health}%` }}></div>
      </div>
      {/* Display the health value */}
      <div className="health-value">{health}</div>
    </div>
  );
}