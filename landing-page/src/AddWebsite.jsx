import React, { useState } from 'react';
import './AddWebsite.css';

export function AddWebsite({ addWebsite }) {
  const [websiteName, setWebsiteName] = useState('');

  // Function to handle adding a new website
  const handleAddWebsite = () => {
    if (websiteName.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      addWebsite(websiteName.trim(), currentTime);
      setWebsiteName('');
    }
  };

  return (
    <div className="add-website">
      {/* Input field for the website name */}
      <input
        type="text"
        placeholder="Enter website name"
        value={websiteName}
        onChange={(e) => setWebsiteName(e.target.value)}
      />
      {/* Button to add the website */}
      <button onClick={handleAddWebsite}>Add Website</button>
    </div>
  );
}