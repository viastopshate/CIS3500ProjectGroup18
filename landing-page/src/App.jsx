import React, { useState, useEffect, useRef } from 'react';
import { WebsiteList } from './WebsiteList';
import { Chromagotchi } from './Chromagotchi';
import usagiImage from './avatar-images/usagi.jpg';
import chiikawaImage from './avatar-images/chiikawa.jpg';
import { SummaryStats } from './SummaryStats';
import uploadImage from './upload.jpg';
import './App.css';

// Initial list of websites
const initialWebsites = [
  { id: 1, name: 'Google', timeOpened: Date.now(), isOnTask: true },
  { id: 2, name: 'Gmail', timeOpened: Date.now(), isOnTask: true },
  { id: 3, name: 'Canvas', timeOpened: Date.now(), isOnTask: true },
  { id: 4, name: 'YouTube', timeOpened: Date.now(), isOnTask: false },
  { id: 5, name: 'Netflix', timeOpened: Date.now(), isOnTask: false },
];

const avatarImages = [usagiImage, chiikawaImage];

export default function App() {
  // State variables for websites and health
  const [websites, setWebsites] = useState(initialWebsites);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [health, setHealth] = useState(90);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

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
    const savedUploadedImage = localStorage.getItem('uploadedImage');
    if (savedUploadedImage) {
      setUploadedImage(savedUploadedImage);
    }
  }, []);

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
  const addWebsite = (name, timeOpened, isOnTask) => {
    const newWebsite = {
      id: Date.now(),
      name,
      timeOpened,
      isOnTask,
    };
    setWebsites([...websites, newWebsite]);
    setHealth(Math.max(0, health - 2));
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

  const resetChromagotchi = () => {
    setWebsites(initialWebsites);
    setHealth(90);
  };

  const calculateSummaryStats = () => {
    const currentTime = Date.now();
    const onTaskTime = websites
      .filter((website) => website.isOnTask)
      .reduce((total, website) => total + (currentTime - website.timeOpened), 0);
    const offTaskTime = websites
      .filter((website) => !website.isOnTask)
      .reduce((total, website) => total + (currentTime - website.timeOpened), 0);

    return { onTaskTime, offTaskTime };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setUploadedImage(dataURL);
      localStorage.setItem('uploadedImage', dataURL);
    };
    reader.readAsDataURL(file);
  };

  const resetUploadedImage = () => {
    setUploadedImage(null);
    localStorage.removeItem('uploadedImage');
  };

  return (
    <div className="app">
      <h1>Welcome to Chromagotchi!</h1>
      <div className="content">
        <WebsiteList
          websites={websites}
          toggleTaskStatus={toggleTaskStatus}
          removeWebsite={removeWebsite}
          addWebsite={addWebsite}
        />
        <div className="tamagotchi-container">
          <Chromagotchi
            health={health}
            avatarImage={uploadedImage || avatarImages[currentAvatarIndex]}
          />
          <div className="avatar-selection">
            <h3>Choose your Chromagotchi</h3>
            <div className="avatar-buttons">
              <button onClick={() => changeAvatar(-1)}>Prev</button>
              <button onClick={() => changeAvatar(1)}>Next</button>
              <button onClick={resetChromagotchi}>Reset</button>
            </div>
            <div className="upload-button">
              <img src={uploadImage} alt="Upload" onClick={() => fileInputRef.current.click()} />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
      </div>
      <SummaryStats {...calculateSummaryStats()} />
    </div>
  );
}