document.addEventListener('DOMContentLoaded', function() {
    const healthBar = document.getElementById('healthBar');
    const goodTimeSpentDisplay = document.getElementById('goodTimeSpent');
    const badTimeSpentDisplay = document.getElementById('badTimeSpent');
    const urlTimes = document.getElementById('urlTimes');
    const displayTimes = document.getElementById('displayTimes');

    const goodUrls = ['www.linkedin.com', 'www.tradingview.com'];
    const badUrls = ['www.instagram.com', 'www.youtube.com'];

    function updateTabInfo() {
        chrome.storage.local.get({visitedUrls: []}, function(result) {
            if (result.visitedUrls && result.visitedUrls.length > 0) {
                console.log('Retrieved visited URLs:', result.visitedUrls);
                calculateAndDisplayTimes(result.visitedUrls);
            } else {
                console.log('No visited URLs found.');
            }
        });
    }

    function calculateAndDisplayTimes(visitedUrls) {
        let totalSeconds = 0;
        let goodTimeSpent = 0;
        let badTimeSpent = 0;
        const urlMap = new Map();

        if (visitedUrls.length === 0) {
            console.log('No URLs to process.');
        }

        visitedUrls.forEach((urlInfo, index) => {
            if (!urlMap.has(urlInfo.url)) {
                urlMap.set(urlInfo.url, 0);
            }
            if (index < visitedUrls.length - 1) {
                const nextVisitTime = new Date(visitedUrls[index + 1].time);
                const currentVisitTime = new Date(urlInfo.time);
                const diffSeconds = (nextVisitTime - currentVisitTime) / 1000;
                urlMap.set(urlInfo.url, urlMap.get(urlInfo.url) + diffSeconds);
            }
        });

        urlMap.forEach((time, url) => {
            totalSeconds += time;
            if (goodUrls.includes(url)) {
                goodTimeSpent += time;
            } else if (badUrls.includes(url)) {
                badTimeSpent += time;
            }
        });

        updateChromagotchiHealth(goodTimeSpent, badTimeSpent);
        displayVisitedTimes(urlMap, goodTimeSpent, badTimeSpent);
     }

    function updateChromagotchiHealth(goodTimeSpent, badTimeSpent) {
        let baseHealth = 50;
        let healthChange = Math.floor(goodTimeSpent / 100) - Math.floor(badTimeSpent / 100);
        let currentHealth = Math.min(100, Math.max(0, baseHealth + healthChange));

        healthBar.style.width = `${currentHealth}%`;
        healthBar.textContent = `Health: ${Math.round(currentHealth)}%`;
    }

    function displayVisitedTimes(urlMap, goodTimeSpent, badTimeSpent) {
        urlTimes.innerHTML = '<h4>Visited URLs with Total Time Spent:</h4>';
        urlMap.forEach((totalSeconds, url) => {
            urlTimes.innerHTML += `<p>${url}<br>Total Time Spent: ${Math.round(totalSeconds)} seconds</p>`;
        });
        urlTimes.innerHTML += `<p>Good Time Spent: ${Math.round(goodTimeSpent)} seconds</p>`;
        urlTimes.innerHTML += `<p>Bad Time Spent: ${Math.round(badTimeSpent)} seconds</p>`;
        
        displayTimes.innerHTML = '<h4>Visited URLs with Total Time Spent:</h4>';
        displayTimes.innerHTML += `<p>Good Time Spent: ${Math.round(goodTimeSpent)} seconds</p>`;
        displayTimes.innerHTML += `<p>Bad Time Spent: ${Math.round(badTimeSpent)} seconds</p>`;

        goodTimeSpentDisplay.textContent = `${Math.round(goodTimeSpent)} seconds`;
        badTimeSpentDisplay.textContent = `${Math.round(badTimeSpent)} seconds`;
    }

    updateTabInfo();
});
