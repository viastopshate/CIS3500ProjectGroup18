import React, { useMemo } from 'react';
import {useState, useEffect} from 'react';
window.React = React;
import { Chromagotchi } from '../Chromagotchi';
import babyImage from '../avatar-images/BABY.png';
import bunnyImage from '../avatar-images/BUNNY.png';
import cuteImage from '../avatar-images/CUTE.png';
import emoImage from '../avatar-images/EMO.png';
import robotImage from '../avatar-images/ROBOT.png';
import './App.css';


export default function App() {

  const [health, setHealth] = useState(100);
  const [uploadedImage, setUploadedImage] = useState("/images/BABY.png");
  const [avatarImages, setAvatarImages] = useState([babyImage, bunnyImage,cuteImage, emoImage, robotImage]);
  const [starList, setStarList] = useState([]);
  const [url, setUrl] = useState('');

  // Fetch the current health value when the component mounts
  useEffect(() => {
    chrome.storage.local.get(['health'], function(result) {
      if (result.healthbar !== undefined) {
        setHealth(result.healthbar);
      }
    });
  }, []);

  // Fetch the current tab URL and star domains from chrome storage
  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let currentUrl = tabs[0]?.url;
      if (currentUrl) {
        setUrl(currentUrl.match(/\:\/\/([^\/]+)/)[1]);
        chrome.storage.local.get({ starDomains: [] }, result => {
          setStarList(result.starDomains);
        });
      }
    });
  }, []);

  // Check if the current URL is starred
  const isStar = useMemo(() => {
    if (!url) {
      return false;
    }
    return starList.find(item => url === item);
  }, [starList, url]);

  const handlers = {
    openTab: () => {
      chrome.runtime.sendMessage({action: "openLandingPage"})
    },
    star: () => {
      if (isStar) {
        // Remove the URL from the star list if already starred
        chrome.storage.local.set({
          starDomains: starList.filter(item => item !== url)
        });
        setStarList(starList.filter(item => item !== url));
      } else {
        // Add the URL to the star list if not starred
        chrome.storage.local.set({
          starDomains: [...starList, url]
        });
        setStarList([...starList, url]);
      }
    }
  }

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
          <div style={{ display: 'flex', marginTop: '32px' }}>
            <button className='button' onClick={handlers.openTab}> Menu </button>
            <button className='button' onClick={handlers.star} style={{ backgroundColor: '#fff', marginLeft: '32px', color: 'gray'}}>
              <span className='inline-flex'>
                <img src="/images/star.png" alt="" style={{ marginRight: '8px' }} />
                {isStar ? 'UnStar' : 'Star'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
