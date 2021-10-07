/*
    Common functions shared between pages
*/

function storeTask(task) {
    const store_task = {}
    store_task[task.id] = task
    chrome.storage.sync.set(store_task)
    return store_task
  }
  
  function deleteTask(id) {
    chrome.storage.sync.remove(String(id))
  }

  function createTask(project, name, estimated) {

    task = {
      id: new Date().getTime(),
      name: name,
      project: project,
      estimated: estimated,
      spent: 0
    }
  
    return storeTask(task)
  }

  function formatTimeSpent(seconds) {
  
    const hours = parseInt(seconds/3600)
    const minutes = parseInt(seconds%3600/60)
    const leftSeconds = parseInt(seconds%60)
  
    let result = []
  
    if (hours > 0)
      result.push(`${hours}h`)
  
    if (minutes > 0)
      result.push(`${minutes}m`)
  
    if (leftSeconds > 0)
      result.push(`${leftSeconds}s`)
  
    return result.join(' ')
  }

  function estimatedToSeconds(estimated) {

    // Remove empty spaces
    estimated = estimated.replace(/\s+/g, '')
  
    let index = 0
    const tokens = {}
  
    for (let i = 0; i < estimated.length; i++) {
      if (isNaN(parseInt(estimated[i]))) {
        tokens[estimated[i]] = parseInt(estimated.substr(index, i))
        index = i + 1
      }
    }
  
    return (((tokens['h'] || 0) * 3600) + ((tokens['m'] || 0) * 60) + (tokens['s'] || 0))
  }
  
  function create_tab(url) {
    chrome.tabs.create({url})
  }

  // Top right button to close current window
  $('#close-div').click(() => window.close())