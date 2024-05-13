import React, { useState, useEffect, useRef } from 'react';
import { WebsiteList } from './WebsiteList';
import { Chromagotchi } from '../Chromagotchi';
import { SummaryStats } from './SummaryStats';
import uploadImage from './upload.jpg';
import babyImage from '../avatar-images/BABY.png';
import bunnyImage from '../avatar-images/BUNNY.png';
import cuteImage from '../avatar-images/CUTE.png';
import emoImage from '../avatar-images/EMO.png';
import robotImage from '../avatar-images/ROBOT.png';
import './App.css';

// Initial list of websites
const initialWebsites = [
  { id: 1, name: 'Google', timeOpened: Date.now(), isOnTask: true },
  { id: 2, name: 'Gmail', timeOpened: Date.now(), isOnTask: true },
  { id: 3, name: 'Canvas', timeOpened: Date.now(), isOnTask: true },
  { id: 4, name: 'YouTube', timeOpened: Date.now(), isOnTask: false },
  { id: 5, name: 'Netflix', timeOpened: Date.now(), isOnTask: false },
];

export default function App() {
  // State variables for websites and health
  const [websites, setWebsites] = useState(initialWebsites);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [health, setHealth] = useState(100);
  const [avatarImages, setAvatarImages] = useState([babyImage, bunnyImage,cuteImage, emoImage, robotImage]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const onTaskCount = websites.filter((website) => website.isOnTask).length;
      const newHealth = (prevHealth) => Math.max(0, prevHealth - onTaskCount)
      setHealth(newHealth);
      chrome.storage.local.set({ health: newHealth });
    }, 600000); // 10 minutes in milliseconds

    return () => {
      clearInterval(timer);
    };
  }, [websites]);

  useEffect(() => {
    if (localStorage.getItem('images')) {
      const result = JSON.parse(localStorage.getItem('images'));
      setAvatarImages(result.list);
      setCurrentAvatarIndex(result.index);
    } else {
      setAvatarImages([babyImage, bunnyImage,cuteImage, emoImage, robotImage]);
      setCurrentAvatarIndex(0);
      localStorage.setItem('images', JSON.stringify({ index: 0, list: [babyImage, bunnyImage,cuteImage, emoImage, robotImage] }));
    }
  }, []);

  // Fetch the current health value when the component mounts
  useEffect(() => {
    chrome.storage.local.get(['health'], function(result) {
      if (result.healthbar !== undefined) {
        setHealth(result.healthbar);
      }
    });
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
      const index = newIndex >= 0 ? newIndex % avatarImages.length : avatarImages.length - 1;
      localStorage.setItem('images', JSON.stringify({ index: index, list: avatarImages }))
      return index;
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
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        const list = [...avatarImages, dataURL];
        setAvatarImages(list);
        setCurrentAvatarIndex(list.length - 1);

        localStorage.setItem('uploadedImage', dataURL);
        localStorage.setItem('images', JSON.stringify({ index: list.length - 1, list: list }))
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <header>
        <h1 className="header">Welcome to Chromagotchi!</h1>
      </header>
      <div className="content">
        <div className="website-lists">
          <WebsiteList
            websites={websites}
            toggleTaskStatus={toggleTaskStatus}
            removeWebsite={removeWebsite}
            addWebsite={addWebsite}
          />
        </div>
        <SummaryStats {...calculateSummaryStats()} />
        <div className="tamagotchi-container">
          <Chromagotchi
            health={health}
            avatarImage={avatarImages[currentAvatarIndex]}
          />
          <div className="avatar-selection">
            <h3>Choose your Chromagotchi</h3>
            <p className="upload-reminder">Please upload an image smaller than 1MB.</p>
            <div className="avatar-buttons">
              <button onClick={() => changeAvatar(-1)}>Prev</button>
              <button onClick={() => changeAvatar(1)}>Next</button>
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
    </div>
  );
}