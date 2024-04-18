import React from 'react';
import './SummaryStats.css';

export function SummaryStats({ onTaskTime, offTaskTime }) {
  return (
    <div className="summary-stats">
      <h2>Summary Stats</h2>
      <div className="stat-item">
        <span className="stat-label">On Task Time:</span>
        <span className="stat-value">{formatTime(onTaskTime)}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Off Task Time:</span>
        <span className="stat-value">{formatTime(offTaskTime)}</span>
      </div>
    </div>
  );
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}