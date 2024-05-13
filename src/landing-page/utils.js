export function tabListener() {
    chrome.tabs.onActivated.addListener(_ => {
        chrome.tabs.query({ currentWindow: true }, tabs => {
            chrome.storage.local.get({ records:[] }, result => {
                const newRecords = tabs.filter(tab => tab.url.startsWith('http')).map(tab => {
                    const prevRecord = result.records.find(record => record.url === tab.url);
                    if (!prevRecord) {
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
                chrome.storage.local.set({ records: newRecords });
            })
        })
    });
}

export function getGoal() {
    let goal = 100;
    return new Promise((resolve, reject) => {
        chrome.storage.local.get({ records: [] }, result => {
            const records = result.records;
            chrome.storage.local.get({ starDomains: [] }, result => {
                const stars = result.starDomains;
                records.forEach(record => {
                    goal = goal - 2;
                    if (record.active) {
                        const seconds = (+new Date() - record.activeTime) / 1000;
                        if (stars.some(domain => record.url.includes(domain))) {
                            goal = goal + parseInt((seconds + record.stayTime || 0) / 300) * 2;
                        } else {
                            goal = goal - parseInt(seconds / 300) * 1;
                        }
                    } else {
                        const seconds = record.stayTime / 1000;
                        if (stars.some(domain => record.url.includes(domain))) {
                            goal = goal + parseInt(seconds / 300) * 2;
                        } else {
                            goal = goal - parseInt(seconds / 300) * 1;
                        }
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