import React, { useState } from 'react';
import { WebsiteList } from './WebsiteList';
import { Chromagotchi } from './Chromagotchi';
import { AddWebsite } from './AddWebsite';
import avatarImage from './avatar-images/usagi.jpg';
import './App.css';

// Initial list of websites
const initialWebsites = [
  { id: 1, name: 'Google', timeOpened: '10:00 AM', isOnTask: true },
  { id: 2, name: 'Gmail', timeOpened: '11:30 AM', isOnTask: true },
  { id: 3, name: 'Canvas', timeOpened: '12:15 PM', isOnTask: true },
  { id: 4, name: 'YouTube', timeOpened: '9:45 AM', isOnTask: false },
  { id: 5, name: 'Netflix', timeOpened: '2:30 PM', isOnTask: false },
];

export default function App() {
  // State variables for websites and health
  const [websites, setWebsites] = useState(initialWebsites);
  const [health, setHealth] = useState(90);

  // Function to toggle the task status of a website
  const toggleTaskStatus = (websiteId) => {
    const updatedWebsites = websites.map(website => {
      if (website.id === websiteId) {
        return {
          ...website,
          isOnTask: !website.isOnTask,
        };
      }
      return website;
    });
    setWebsites(updatedWebsites);
  };

  // Function to add a new website
  const addWebsite = (name, timeOpened) => {
    const newWebsite = {
      id: Date.now(),
      name,
      timeOpened,
      isOnTask: true,
    };
    setWebsites([...websites, newWebsite]);
    setHealth(Math.max(0, health - 2)); // Decrease health by 2, minimum 0
  };

  // Function to remove a website
  const removeWebsite = (websiteId) => {
    const updatedWebsites = websites.filter((website) => website.id !== websiteId);
    setWebsites(updatedWebsites);
    setHealth(Math.min(100, health + 2)); // Increase health by 2, maximum 100
  };

  const onTaskTabs = websites.filter((website) => website.isOnTask).length;

  return (
    <div className="app">
      <h1>Welcome to Chromagotchi!</h1>
      <div className="content">
        <WebsiteList
          websites={websites}
          toggleTaskStatus={toggleTaskStatus}
          removeWebsite={removeWebsite}
        />
        <div className="tamagotchi-container">
          <Chromagotchi onTaskTabs={onTaskTabs} avatarImage={avatarImage} />
        </div>
      </div>
      <AddWebsite addWebsite={addWebsite} />
    </div>
  );
}