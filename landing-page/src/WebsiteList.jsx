import React from 'react';
import { WebsiteItem } from './WebsiteItem';
import './WebsiteList.css';

export function WebsiteList({ websites, toggleTaskStatus, removeWebsite }) {
  // Filter websites based on their task status
  const onTaskWebsites = websites.filter(website => website.isOnTask);
  const offTaskWebsites = websites.filter(website => !website.isOnTask);

  return (
    <div className="website-list">
      {/* Render the list of on-task websites */}
      <div className="list-container">
        <h2>On Task Websites</h2>
        <ul>
          {onTaskWebsites.map(website => (
            <WebsiteItem
              key={website.id}
              {...website}
              toggleTaskStatus={() => toggleTaskStatus(website.id)}
              removeWebsite={() => removeWebsite(website.id)}
            />
          ))}
        </ul>
      </div>
      
      <div className="list-container">
        <h2>Off Task Websites</h2>
        <ul>
          {offTaskWebsites.map(website => (
            <WebsiteItem
              key={website.id}
              {...website}
              toggleTaskStatus={() => toggleTaskStatus(website.id)}
              removeWebsite={() => removeWebsite(website.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}