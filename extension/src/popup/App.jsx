import React from 'react';
import {useState, useEffect} from 'react';
window.React = React;
import { Chromagotchi } from '../Chromagotchi';
import usagiImage from '../avatar-images/usagi.jpg';
import chiikawaImage from '../avatar-images/chiikawa.jpg';
import './App.css';
import NewTabButton from './NewTabButton'


export default function App() {

  const [health, setHealth] = useState(100);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [avatarImages, setAvatarImages] = useState([usagiImage, chiikawaImage]);

  // Fetch the current health value when the component mounts
  useEffect(() => {
    chrome.storage.local.get(['health'], function(result) {
      if (result.healthbar !== undefined) {
        setHealth(result.healthbar);
      }
    });
  }, []);

  return (
    <div className="app">
      <header>
        <h1 className="header">CHROMAGOTCHI</h1>
      </header>
      <div className="content">
        <div className="tamagotchi-container">
          <Chromagotchi
            health={health}
            avatarImage={uploadedImage}
          />
          <NewTabButton></NewTabButton>
        </div>
      </div>
    </div>
  );
}
