document.addEventListener('DOMContentLoaded', function() {
    // Function to display tabs data in the popup
    function displayTabs(tabs) {
        const container = document.getElementById('tabs-list');
        container.innerHTML = ''; // Clear existing entries

        if (tabs && tabs.length > 0) {
            tabs.forEach(tab => {
                const tabElement = document.createElement('div');
                tabElement.textContent = `URL: ${tab.url}, Time Spent: ${tab.timeSpent} seconds`;
                container.appendChild(tabElement);
            });
        } else {
            container.textContent = 'No tabs data found.';
        }
    }

    // Fetch and display tabs data from local storage when the popup loads
    chrome.storage.local.get(['tabs'], function(result) {
        if (result.tabs) {
            displayTabs(result.tabs);
        } else {
            console.log('No tabs data found.');
        }
    });

    // Listen for changes in storage to update the popup display in real time
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (let key in changes) {
            if (key === 'tabs' && namespace === 'local') {
                displayTabs(changes[key].newValue);
            }
        }
    });
});

function displayTabs(tabs) {
    const container = document.getElementById('tabs-list');
    container.innerHTML = ''; // Clear previous entries

    tabs.forEach(tab => {
        const li = document.createElement('li');
        const urlDiv = document.createElement('div');
        const timeDiv = document.createElement('div');
        
        urlDiv.textContent = `URL: ${tab.url}`;
        timeDiv.textContent = `Time Spent: ${tab.timeSpent} seconds`;

        urlDiv.classList.add('url');
        timeDiv.classList.add('time');

        li.appendChild(urlDiv);
        li.appendChild(timeDiv);
        container.appendChild(li);
    });
}
