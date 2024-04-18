import React, { useState, useEffect } from "react";
import "./App.css";
import Hello from "../public/components/Hello";

function App() {
  return (
    <div className="App">
      <h1>Starter Extension</h1>
      {/* Render the SnippetList component with the snippets and event handlers */}
      <Hello person="World" />
    </div>
  );
}

export default App;
