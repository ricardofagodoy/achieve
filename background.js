importScripts('shared/shared.js')

const REPORT_MENU = 'REPORT_MENU'
const ALARM_INTERVAL = 0.1

chrome.runtime.onInstalled.addListener(() => {

    // Create menus
    chrome.contextMenus.create({
        "id": REPORT_MENU,
        "title": 'View reports',
        "contexts": ["action"]
    })
})

// Menu clicks
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId == REPORT_MENU)
        chrome.tabs.create({ url: 'report/report.html' })
})

// Listens to start/stop timer events
chrome.runtime.onMessage.addListener(data => {

    const task = data.task

    if (data.running)
        createAlarm(data.task)
    else
        chrome.alarms.clear(task.id)
})

function createAlarm(task) {

    if (task.alerted || task.estimated == 0)
        return

    chrome.alarms.create(task.id, {
        periodInMinutes: ALARM_INTERVAL
    })
}

// Check if spent reached estimated
chrome.alarms.onAlarm.addListener(alarm => {

    loadTask(alarm.name, task => {

        // Trigger alert!
        if ((task.spent + getAdjustedTimeSpent(task.start_time)) > task.estimated) {

            // Clear alarm
            chrome.alarms.clear(task.id)

            // Save task as already alerted
            task.alerted = true
            storeTask(task)

            // Store new alert
            storeAlert(task)

            // Create tab to display alert
            chrome.tabs.create({ url: 'alert/alert.html' })
        }
    })
})