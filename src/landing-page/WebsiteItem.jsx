import React from 'react';
import './WebsiteItem.css';

export function WebsiteItem({ name, timeOpened, isOnTask, toggleTaskStatus, removeWebsite }) {
  // Function to calculate the time since the website was opened
  const getTimeSinceOpened = () => {
    const currentTime = Date.now();
    const timeDifference = currentTime - timeOpened;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // Format the time based on hours, minutes, and seconds
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
        {/* Display the website name */}
        <h3>{name}</h3>
        {/* Display the time since the website was opened */}
        <span className="time-opened">{getTimeSinceOpened()}</span>
      </div>
      <div className="website-buttons">
        {/* Button to toggle the task status */}
        <button onClick={toggleTaskStatus}>
          {isOnTask ? 'Move OffTask' : 'Move OnTask'}
        </button>
        {/* Button to remove the website */}
        <button onClick={removeWebsite}>Close</button>
      </div>
    </li>
  );
}