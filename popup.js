document.addEventListener('DOMContentLoaded', function() {
    const infoDiv = document.getElementById('tabInfo');
    const printButton = document.getElementById('printButton');

    // Function to fetch and display current tab information and store it
    function updateTabInfo() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let currentTab = tabs[0];
            if (currentTab) {
                infoDiv.textContent = `Title: ${currentTab.title}\nURL: ${currentTab.url}`;
                console.log(`Title: ${currentTab.title}\nURL: ${currentTab.url}`);

                // Use chrome.storage.local to retrieve the current list of URLs
                chrome.storage.local.get({visitedUrls: []}, function(result) {
                    const visitedUrls = result.visitedUrls;
                    visitedUrls.push({title: currentTab.title, url: currentTab.url, time: new Date().toISOString()});

                    // Update the stored list
                    chrome.storage.local.set({visitedUrls: visitedUrls}, function() {
                        console.log('Updated visited URLs:', visitedUrls);
                    });
                });
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

    // Optionally, add a button or some mechanism to log all visited URLs from storage to the console
    // This could be another button or just part of the popup initialization
    chrome.storage.local.get('visitedUrls', function(result) {
        console.table(result.visitedUrls);
    });
});
