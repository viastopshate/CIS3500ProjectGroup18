import React, { useEffect, useState } from 'react';
import './WebsiteList.css';

export function WebsiteList({ websites, toggleTaskStatus, removeWebsite, addWebsite }) {
  // Filter websites based on their task status
  const onTaskWebsites = websites.filter(website => website.isOnTask);
  const offTaskWebsites = websites.filter(website => !website.isOnTask);

  // State variables to store records and starred domains
  const [records, setRecords] = useState([]);
  const [starList, setStarList] = useState([]);

  // useEffect to update records and starred domains from Chrome storage
  useEffect(() => {
    const update = () => {
      chrome.storage.local.get({ records:[] }, result => {
        setRecords(result.records);
      });
      chrome.storage.local.get({ starDomains: [] }, result => {
        setStarList(result.starDomains);
      });
    };
    update();
    chrome.tabs.onActivated.addListener(update);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      chrome.tabs.onActivated.removeListener(update);
    }
  }, []);

  return (
    <div className="website-list">
      <div className="list-container">
        <h2>Current Websites</h2>
        {records.map(record => (
          <div className='website-item'>
            {/* Display a star icon if the website domain is starred */}
            <div className='website-item__header'>{record.title}{starList.find(url => record.url.includes(url)) && <img src='/images/star.png' />}</div>
            {/* Display the website URL */}
            <div className='website-item__url'>{record.url}</div>
            {/* Display the visit time */}
            <div className='website-item__visit'>Visit Time: {new Date(record.openTime).toDateString()}</div>
            {/* Display the standing time in seconds */}
            <div className='website-item__stand'>Standing Time: {parseInt(record.stayTime / 1000)}s</div>
          </div>
        ))}
      </div>
    </div>
  );
}