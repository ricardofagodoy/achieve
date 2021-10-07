const REPORT_MENU = 'REPORT_MENU'

chrome.runtime.onInstalled.addListener(() => {

    // Create menus
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
    if (info.menuItemId == REPORT_MENU)
        chrome.tabs.create({url: 'report/report.html'})
})