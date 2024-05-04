// This function is called when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Create a context menu item
  chrome.contextMenus.create({
    id: "exampleContextMenu",
    title: "Context Menu",
    contexts: ["selection"],
  });
});

// This function is called when a context menu item is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "exampleContextMenu") {
    const selectedText = info.selectionText;
    console.log(Date.now(), "Selected text: ", selectedText);
  }
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Received message:", request);
    if (request.action === "openLandingPage") {
      chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
    }
  }
);