const uniqueUrls = new Set(); // Initialize a Set to store unique URLs

// Import statements relevant to tab tracking
import { injectTabsRepositorySingleton } from './repository/inject-tabs-repository';
import { initTracker } from './tracker-updated';
import { isValidPage } from './utils';

// Part of initializing the tracker
initTracker();

// Listen for tabs being updated to catch URLs when they load completely
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
        uniqueUrls.add(tab.url);
        console.log(`URL added: ${tab.url}`);
    }
});

// Listen for new tabs being activated to add their URL to the set
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url && !tab.url.startsWith('chrome://')) {
            uniqueUrls.add(tab.url);
            console.log(`Active URL added: ${tab.url}`);
        }
    });
});

// Example function to handle tab tracking
async function trackTime() {
    const repo = await injectTabsRepositorySingleton();
    const window = await chrome.windows.getLastFocused({ populate: true });
    if (window.focused) {
        const activeTab = window.tabs.find(t => t.active);
        if (activeTab && isValidPage(activeTab.url)) {
            const activeDomain = new URL(activeTab.url).hostname; // Simplified extraction
            let tab = repo.getTab(activeDomain);
            if (!tab) {
                tab = await repo.addTab(activeDomain);
            }
            tab.updateTimeSpent(); // Updates the tab's time based on some internal logic
            repo.saveTab(tab); // Save updated tab info
        }
    }
}

// Periodically save tabs data
async function saveTabs() {
    const storage = chrome.storage.local; // Simplified storage injection
    const repo = await injectTabsRepositorySingleton();
    const tabs = repo.getTabs();
    await storage.set({tabs: tabs}); // Save tabs in local storage
}

// Schedule periodic saving of tabs data
setInterval(saveTabs, 10000); // Save tabs every 10 seconds
