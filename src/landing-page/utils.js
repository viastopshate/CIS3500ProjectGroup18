// Function to listen for tab activation events
export function tabListener() {
    chrome.tabs.onActivated.addListener(_ => {
        chrome.tabs.query({ currentWindow: true }, tabs => {
            chrome.storage.local.get({ records:[] }, result => {
                // Filter and map the tabs to create new records
                const newRecords = tabs.filter(tab => tab.url.startsWith('http')).map(tab => {
                    const prevRecord = result.records.find(record => record.url === tab.url);
                    if (!prevRecord) {
                        // If no previous record exists, create a new record
                        const date = +new Date();
                        return {
                            title: tab.title,
                            url: tab.url,
                            openTime: date,
                            active: tab.active,
                            activeTime: date,
                            stayTime: 0
                        }
                    } else {
                        // If a previous record exists, update the record with new values
                        return {
                            title: tab.title,
                            url: tab.url,
                            openTime: +new Date(),
                            active: tab.active,
                            activeTime: !prevRecord.active && tab.active ? +new Date() : prevRecord.activeTime,
                            stayTime: (prevRecord.stayTime || 0) + (prevRecord.active && !tab.active ? (+new Date() - prevRecord.activeTime) : 0)
                        }
                    }
                });
                // Save the updated records to chrome storage
                chrome.storage.local.set({ records: newRecords });
            })
        })
    });
}

// Function to calculate the score based on tab records and starred domains
export function getGoal() {
    let goal = 100;
    return new Promise((resolve, reject) => {
        chrome.storage.local.get({ records: [] }, result => {
            const records = result.records;
            chrome.storage.local.get({ starDomains: [] }, result => {
                const stars = result.starDomains;
                records.forEach(record => {
                    goal = goal - 2; 
                    // If the tab is active, calculate the active time and update the score accordingly
                    if (record.active) {
                        const seconds = (+new Date() - record.activeTime) / 1000; 
                        const mins = parseInt(seconds / 60); //active minutes on this tab
                        console.log("active secs: " , seconds);
                        console.log("active mins: ", mins);
                        if (stars.some(domain => record.url.includes(domain))) { //if starred
                            goal = goal + mins + 1;
                        } else { //if not starred
                            goal = goal - mins;
                        }
                        // If the tab is inactive, calculate the stay time and update the score accordingly
                    } else {
                        // const seconds = record.stayTime / 1000;
                        // const mins = parseInt(seconds / 60);
                        // console.log("inactive mins: " , mins);
                        // if (stars.some(domain => record.url.includes(domain))) {
                        //     goal = goal + mins;
                        // } else {
                        //     goal = goal - mins;
                        // }
                    }
                });
                resolve(Math.max(0, Math.min(100, goal)));
            });
        });
    });
}

export function sleep(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    })
}