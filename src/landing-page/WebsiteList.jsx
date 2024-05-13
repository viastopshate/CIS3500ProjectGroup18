import React, { useEffect, useState } from 'react';
import { WebsiteItem } from './WebsiteItem';
import './WebsiteList.css';
import { AddWebsite } from './AddWebsite';

export function WebsiteList({ websites, toggleTaskStatus, removeWebsite, addWebsite }) {
  // Filter websites based on their task status
  const onTaskWebsites = websites.filter(website => website.isOnTask);
  const offTaskWebsites = websites.filter(website => !website.isOnTask);

  const [records, setRecords] = useState([]);
  const [starList, setStarList] = useState([]);
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
    return () => {
      chrome.tabs.onActivated.removeListener(update);
    }
  }, []);

  return (
    <div className="website-list">
      <div className="list-container">
        <h2>Websites</h2>
        {records.map(record => (
          <div className='website-item'>
            <div className='website-item__header'>{record.title}{starList.find(url => record.url.includes(url)) && <img src='/images/star.png' />}</div>
            <div className='website-item__url'>{record.url}</div>
            <div className='website-item__visit'>Visit Time: {new Date(record.openTime).toDateString()}</div>
            <div className='website-item__stand'>Standing Time: {parseInt(record.stayTime / 1000)}s</div>
          </div>
        ))}
      </div>
    </div>
  );
}