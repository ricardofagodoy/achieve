let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
})

// Interval to update counter badge
chrome.alarms.create('counter', {
    periodInMinutes: 0.01
})

chrome.alarms.onAlarm.addListener(function(alarm) {

    // Read from persistent
    chrome.storage.local.get(["counter"], ({ counter }) => {

        if (!counter)
            counter = 1

        // Update badge
        //chrome.action.setBadgeText({
        //    text: '01:' + counter++
        //})

        // Save back to persistent
        chrome.storage.local.set({ counter });
    })
})