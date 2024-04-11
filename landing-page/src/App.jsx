import React, { useState, useEffect } from 'react';
import { WebsiteList } from './WebsiteList';
import { Chromagotchi } from './Chromagotchi';
import { AddWebsite } from './AddWebsite';
import usagiImage from './avatar-images/usagi.jpg';
import chiikawaImage from './avatar-images/chiikawa.jpg';
import './App.css';

// Initial list of websites
const initialWebsites = [
  { id: 1, name: 'Google', timeOpened: '10:00 AM', isOnTask: true },
  { id: 2, name: 'Gmail', timeOpened: '11:30 AM', isOnTask: true },
  { id: 3, name: 'Canvas', timeOpened: '12:15 PM', isOnTask: true },
  { id: 4, name: 'YouTube', timeOpened: '9:45 AM', isOnTask: false },
  { id: 5, name: 'Netflix', timeOpened: '2:30 PM', isOnTask: false },
];

const avatarImages = [usagiImage, chiikawaImage];

export default function App() {
  // State variables for websites and health
  const [websites, setWebsites] = useState(initialWebsites);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [health, setHealth] = useState(90);

  useEffect(() => {
    const timer = setInterval(() => {
      const onTaskCount = websites.filter((website) => website.isOnTask).length;
      setHealth((prevHealth) => Math.max(0, prevHealth - onTaskCount));
    }, 600000); // 10 minutes in milliseconds

    return () => {
      clearInterval(timer);
    };
  }, [websites]);

  useEffect(() => {
    const onTaskCount = websites.filter((website) => website.isOnTask).length;
    const newHealth = Math.max(0, health - onTaskCount * 2);
    setHealth(newHealth);
  }, [websites]);

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
    setHealth((prevHealth) => Math.min(100, prevHealth + 2));
  };
  
  const changeAvatar = (direction) => {
    setCurrentAvatarIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      return newIndex >= 0 ? newIndex % avatarImages.length : avatarImages.length - 1;
    });
  };

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
          <Chromagotchi health={health} avatarImage={avatarImages[currentAvatarIndex]} />
          <div className="avatar-selection">
            <h3>Choose your Chromagotchi</h3>
            <div className="avatar-buttons">
              <button onClick={() => changeAvatar(-1)}>Prev</button>
              <button onClick={() => changeAvatar(1)}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <AddWebsite addWebsite={addWebsite} />
    </div>
  );
}