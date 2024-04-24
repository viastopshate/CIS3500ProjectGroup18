// Import statements relevant to tab tracking
import { injectTabsRepositorySingleton } from './repository/inject-tabs-repository';
import { initTracker } from './tracker-updated';  // Assumes this function sets up tab tracking
import { isValidPage } from './utils';  // Assumes this function checks if a tab is valid

// Part of initializing the tracker
initTracker();

// Example function to handle tab tracking
async function trackTime() {
    const repo = await injectTabsRepositorySingleton();
    const window = await Browser.windows.getLastFocused({ populate: true });
    if (window.focused) {
        const activeTab = window.tabs?.find(t => t.active === true);
        if (activeTab && isValidPage(activeTab)) {
            const activeDomain = extractHostname(activeTab.url);
            // Handle new or existing tab in tracking
            let tab = repo.getTab(activeDomain);
            if (!tab) {
                tab = await repo.addTab(activeDomain);
            }
            // Update time spent, possibly using Date.now() or performance.now()
            tab.updateTimeSpent();  // Assume this function exists to update time
            repo.saveTab(tab);      // Assume function to save updated tab info
        }
    }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "redden") {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: reddenPage
        });
    }
});

// Example function to save tabs data periodically or on certain events
async function saveTabs() {
    const storage = injectStorage();
    const repo = await injectTabsRepositorySingleton();
    const tabs = repo.getTabs();
    await storage.saveTabs(tabs);
}
