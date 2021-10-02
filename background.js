chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.clear()

    chrome.storage.sync.set({
        1633133335843: {
            project: 'Achieve',
            name: 'Build this extension!',
            estimated: '2h',
            spent: 0
        }
    })

    console.log('Default task setup!')
})

// TODO: change it for message
//chrome.storage.onChanged.addListener((changes) => {
//    const taskChanges = changes?.tasks
//    console.log(taskChanges)
//})

/*
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
*/