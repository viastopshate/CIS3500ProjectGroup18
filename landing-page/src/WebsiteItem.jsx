import React from 'react';

export function WebsiteItem({ name, timeOpened, isOnTask, toggleTaskStatus, removeWebsite }) {
  return (
    <li>
      <div>
        {/* Display the website name */}
        <h3>{name}</h3>
        {/* Display the time the website was opened */}
        <p>Time Opened: {timeOpened}</p>
      </div>
      {/* Button to toggle the task status of the website */}
      <button onClick={toggleTaskStatus}>
        {isOnTask ? 'Move OffTask' : 'Move OnTask'}
      </button>
      {/* Button to remove the website */}
      <button onClick={removeWebsite}>Close</button>
    </li>
  );
}