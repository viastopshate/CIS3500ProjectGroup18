import React from 'react';
window.React = React;
import './NewTabButton.css';

function OpenNewTabButton() {
    // Define the URL you want to open in a new tab
    const url = 'chrome://newtab';
  
    // Event handler to open a new tab
    const openNewTab = () => {
      // Using '_blank' as the second argument to open a new tab
      window.open(url, '_blank');
    };
  
    return (
      <button onClick={openNewTab}>Open New Tab</button>
    );
  }
  
  export default OpenNewTabButton;