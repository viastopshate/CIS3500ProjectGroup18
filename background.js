chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(`Tab Updated: ${tabId}`, changeInfo, tab);
    if (changeInfo.status === 'complete' && tab.url) {
        let parsedUrl = new URL(tab.url).hostname;
        updateStorageWithVisitedUrl(parsedUrl, tab.title);
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log(`Tab Activated:`, activeInfo);
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (tab.url) {
            let parsedUrl = new URL(tab.url).hostname;
            updateStorageWithVisitedUrl(parsedUrl, tab.title);
        }
    });
});

function updateStorageWithVisitedUrl(url, title) {
    chrome.storage.local.get({visitedUrls: []}, function(result) {
        const visitedUrls = result.visitedUrls;
        visitedUrls.push({title: title, url: url, time: new Date().toISOString()});
        chrome.storage.local.set({visitedUrls: visitedUrls});
    });
}
