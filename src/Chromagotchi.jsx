import React, { useEffect, useState } from 'react';
import './Chromagotchi.css';
import { getGoal, sleep } from './landing-page/utils';

export function Chromagotchi({ health, avatarImage }) {
  const [goal, setGoal] = useState(100);
  const [avatar, setAvatarImage] = useState(null);

  // Function to update the goal and avatar image
  useEffect(() => {
    const update = async () => {
      const result = await getGoal();
      console.log("resultgoal: ", result);
      setGoal(result);
      if (localStorage.getItem('images')) {
        const result = JSON.parse(localStorage.getItem('images'));
        setAvatarImage(result.list[result.index]);
      }
    };
    update();

    // Flag to track if the component is unmounted
    let isDestroy = false;

    // Recursive loop to continuously update the goal and avatar image
    const loop = async () => {
      if (!isDestroy) {
        await Promise.all([update(), sleep(1000)]);
        loop();
      }
    };
    loop();

    // Add a listener to update when a new tab is activated
    chrome.tabs.onActivated.addListener(update);

    // Clean up the listener when the component is unmounted
    return () => {
      isDestroy = true;
      chrome.tabs.onActivated.removeListener(update);
    };
  }, []);

  return (
    <div className="health-bar-container">
      <img src={avatar || '/images/BABY.png'} alt="Chromagotchi Avatar" className="avatar" />
      <div className="health-bar">
        <div className="health-bar-fill" style={{ width: `${goal}%` }}></div>
      </div>
      <div className="health-value">{goal}</div>
    </div>
  );
}