const MANAGE_TASKS_MENU = 'MANAGE_TASKS_MENU'
const REPORT_MENU = 'REPORT_MENU'

chrome.runtime.onInstalled.addListener(() => {

    // Create menus
    chrome.contextMenus.create({
        "id": MANAGE_TASKS_MENU,
        "title": 'Manage tasks',
        "contexts": ["action"]
    })

    chrome.contextMenus.create({
        "id": REPORT_MENU,
        "title": 'View reports',
        "contexts": ["action"]
    })

    // Clean up
    // chrome.storage.sync.clear()
})

// Menu clicks
chrome.contextMenus.onClicked.addListener((info) => {

    if (info.menuItemId == MANAGE_TASKS_MENU)
        chrome.tabs.create({url: 'manage/manage.html'})

    if (info.menuItemId == REPORT_MENU)
        chrome.tabs.create({url: 'report/report.html'})
})