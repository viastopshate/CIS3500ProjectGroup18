import React, { useEffect, useState } from 'react';
import './SummaryStats.css';

export function SummaryStats({ onTaskTime, offTaskTime }) {
  const [sum, setSum] = useState(0);

  // useEffect to update the sum of stay times from Chrome storage
  useEffect(() => {
    const update = async () => {
      chrome.storage.local.get({ records: [] }, (result) => {
        setSum(
          result.records.reduce((sum, cur) => {
            sum += cur.stayTime;
            return sum;
          }, 0)
        )
      })
    };
    update();
    chrome.tabs.onActivated.addListener(update);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      chrome.tabs.onActivated.removeListener(update);
    }
  }, []);
  return (
    <div className="summary-stats">
      <h2>Summary Stats</h2>
      <div className="stat-item">
        <span className="stat-label">Total Time:</span>
        {/* Display the total time in seconds */}
        <span className="stat-value">{parseInt(sum / 1000)}s</span>
      </div>
    </div>
  );
}

// Function to format time in HH:MM:SS format
function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

// Function to pad single-digit numbers with leading zero
function padZero(num) {
  return num.toString().padStart(2, '0');
}