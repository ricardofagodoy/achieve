/*
    Common shared functions
*/

/* Tasks */
function loadAllTasks(callback) {
  loadTasksMetadata(tasks_metadata => {
    chrome.storage.sync.get(tasks_metadata, tasks => {
      callback(Object.values(tasks))
    })
  })
}

function loadTask(id, callback) {
  chrome.storage.sync.get({[id]: {}}, task => {
    callback(Object.values(task)[0])
  })
}

function storeTask(task) {
  chrome.storage.sync.set({
    [task.id]: task
  })
}

function deleteTask(id) {

  // Remove also its metadata
  loadTasksMetadata(tasks_metadata => {
    storeTasksMetadata(tasks_metadata.filter(i => i != id))
  })

  chrome.storage.sync.remove(id)
}

function createTask(project, name, estimated) {

  task = {
    id: String(new Date().getTime()),
    name: name,
    project: project,
    estimated: estimated,
    spent: 0,
    alerted: false
  }

  // Add to metadata
  loadTasksMetadata(tasks_metadata => storeTasksMetadata([...tasks_metadata, task.id]))

  // Persist
  storeTask(task)

  return task
}

/* Tasks Metadata */
function loadTasksMetadata(callback) {
  chrome.storage.sync.get({tasks_metadata: []}, value => {
    callback(value.tasks_metadata)
  })
}

function storeTasksMetadata(tasks_metadata) {
  chrome.storage.sync.set({tasks_metadata})
}

/* Alerts */
function storeAlert(alert) {
  chrome.storage.sync.set({alert})
}

function loadAlert(callback) {
  chrome.storage.sync.get({alert: {}}, value => {
    callback(value.alert)
  })
}

function clearAlert() {
  chrome.storage.sync.remove('alert')
}

/* Estimated and spent time converters */
function formatTimeSpent(seconds) {

  const hours = parseInt(seconds / 3600)
  const minutes = parseInt(seconds % 3600 / 60)
  const leftSeconds = parseInt(seconds % 60)

  let result = []

  if (hours > 0)
    result.push(`${hours}h`)

  if (minutes > 0)
    result.push(`${minutes}m`)

  if (leftSeconds > 0)
    result.push(`${leftSeconds}s`)

  return result.join(' ')
}

function estimatedToSeconds(estimated_str) {

  estimated = estimated_str.replace(/\s+/g, '')

  let index = 0
  const tokens = {}

  for (let i = 0; i < estimated.length; i++) {
    if (isNaN(parseInt(estimated[i]))) {
      tokens[estimated[i]] = parseInt(estimated.substr(index, i))
      index = i + 1
    }
  }

  return (((tokens['h'] || 0) * 3600) + ((tokens['m'] || 0) * 60))
}

function getAdjustedTimeSpent(start_time) {
  return Math.round((new Date().getTime() - start_time) / 1000)
}