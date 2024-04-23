import React from 'react';
import { WebsiteItem } from './WebsiteItem';
import './WebsiteList.css';
import { AddWebsite } from './AddWebsite';

export function WebsiteList({ websites, toggleTaskStatus, removeWebsite, addWebsite }) {
  // Filter websites based on their task status
  const onTaskWebsites = websites.filter(website => website.isOnTask);
  const offTaskWebsites = websites.filter(website => !website.isOnTask);

  return (
    <div className="website-list">
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
        <AddWebsite addWebsite={(name, timeOpened) => addWebsite(name, timeOpened, true)} />
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
        <AddWebsite addWebsite={(name, timeOpened) => addWebsite(name, timeOpened, false)} />
      </div>
    </div>
  );
}