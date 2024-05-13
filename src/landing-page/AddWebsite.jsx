import React, { useState } from 'react';
import './AddWebsite.css';

/* This featture is deprecated in the final version, where we track websites directly 
instead of creating and deleting tabs.
*/


export function AddWebsite({ addWebsite }) {
  const [websiteName, setWebsiteName] = useState('');

  // Function to handle adding a new website
  const handleAddWebsite = () => {
    if (websiteName.trim() !== '') {
      const currentTime = Date.now();
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