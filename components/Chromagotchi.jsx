import React, { useEffect, useState } from 'react';
import './Chromagotchi.css';

export function Chromagotchi({ onTaskTabs, avatarImage }) {
  const [health, setHealth] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealth((prevHealth) => Math.max(prevHealth - onTaskTabs, 0));
    }, 600000); // 10 minutes in milliseconds

    return () => {
      clearInterval(interval);
    };
  }, [onTaskTabs]);

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