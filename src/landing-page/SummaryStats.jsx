import React, { useEffect, useState } from 'react';
import './SummaryStats.css';

export function SummaryStats({ onTaskTime, offTaskTime }) {
  const [sum, setSum] = useState(0);
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
    return () => {
      chrome.tabs.onActivated.removeListener(update);
    }
  }, []);
  return (
    <div className="summary-stats">
      <h2>Summary Stats</h2>
      <div className="stat-item">
        <span className="stat-label">Total Time:</span>
        <span className="stat-value">{parseInt(sum / 1000)}s</span>
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