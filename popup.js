document.addEventListener('DOMContentLoaded', function() {
  const infoDiv = document.getElementById('tabInfo');
  const printButton = document.getElementById('printButton');

  // Function to fetch and display current tab information
  function updateTabInfo() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let currentTab = tabs[0];
      if (currentTab) {
        infoDiv.textContent = `Title: ${currentTab.title}\nURL: ${currentTab.url}`;
      } else {
        infoDiv.textContent = 'No active tab found.';
      }
    });
  }

  // Call updateTabInfo to populate info when popup is opened
  updateTabInfo();

  // Print the current tab info when the button is clicked
  printButton.addEventListener('click', function() {
    window.print();
  });
});
