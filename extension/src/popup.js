// popup.js
document.addEventListener('DOMContentLoaded', function () {
  const detailsButton = document.getElementById('detailsButton');
  detailsButton.addEventListener('click', function() {
      console.log("Sending message to open landing page");
      chrome.runtime.sendMessage({action: "openLandingPage"});
  });
});
