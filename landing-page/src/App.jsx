import React, { useState } from 'react';
import { WebsiteList } from './WebsiteList';
import { HealthBar } from './HealthBar.jsx';
import { AddWebsite } from './AddWebsite';
import usagiImage from './usagi.jpg';
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

  return (
    <div className="app">
      <h1>Welcome to Chromagotchi!</h1>
      <div className="content">
        {/* Render the website list */}
        <WebsiteList
          websites={websites}
          toggleTaskStatus={toggleTaskStatus}
          removeWebsite={removeWebsite}
        />
        <div className="tamagotchi-container">
          {/* Render the Tamagotchi image */}
          <img src={usagiImage} alt="Tamagotchi" className="tamagotchi-image" />
          {/* Render the health bar */}
          <HealthBar health={health} />
        </div>
      </div>
      {/* Render the AddWebsite component */}
      <AddWebsite addWebsite={addWebsite} />
    </div>
  );
}