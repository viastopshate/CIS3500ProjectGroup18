import React from 'react';
import './WebsiteItem.css';

export function WebsiteItem({ name, timeOpened, isOnTask, toggleTaskStatus, removeWebsite }) {
  const getTimeSinceOpened = () => {
    const currentTime = Date.now();
    const timeDifference = currentTime - timeOpened;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  };

  return (
    <li>
      <div className="website-info">
        <h3>{name}</h3>
        <span className="time-opened">{getTimeSinceOpened()}</span>
      </div>
      <div className="website-buttons">
        <button onClick={toggleTaskStatus}>
          {isOnTask ? 'Move OffTask' : 'Move OnTask'}
        </button>
        <button onClick={removeWebsite}>Close</button>
      </div>
    </li>
  );
}