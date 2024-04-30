import React, { useState, useEffect } from 'react';
import { Popup } from './Popup';
import usagiImage from './avatar-images/usagi.jpg';
import './App.css';

export default function App({ websites }) {
  const [health, setHealth] = useState(90);
  const [avatarImage, setAvatarImage] = useState(usagiImage);

  useEffect(() => {
    const timer = setInterval(() => {
      const onTaskCount = websites.filter((website) => website.isOnTask).length;
      setHealth((prevHealth) => Math.max(0, prevHealth - onTaskCount));
    }, 600000); // 10 minutes in milliseconds

    return () => {
      clearInterval(timer);
    };
  }, [websites]);

  const handleDetailsClick = () => {
    window.open(chrome.runtime.getURL('index.html'), '_blank');
  };

  return (
    <div className="app">
      <Popup
        health={health}
        avatarImage={avatarImage}
        onDetailsClick={handleDetailsClick}
      />
    </div>
  );
}