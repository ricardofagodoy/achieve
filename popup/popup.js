var timers = {}

const TICK_RATE = 1000
const stopButton = '<button class="button is-danger is-rounded">Stop</button>'
const startButton = '<button class="button is-success is-rounded">Start</button>'

// Read all items from storage
chrome.storage.sync.get(null, (tasks) => {
  loadTasks(tasks)
})

function loadTasks(tasks) {

  // Populate list with each task
  for (const [id, details] of Object.entries(tasks)) {

    const task = {id, ...details}

    // Start timer if it should be running already
    if (task.start_time) {
      task.spent += getAdjustedTimeSpent(task.start_time)
      startTimer(task)
    }

    let row = `<tr id="${task.id}">
                <td>${task.project}</td>
                <td>${task.name}</td>
                <td>${task.estimated}</td>
                <td name="spent-row">
                  <span name="spent">${formatTimeSpent(task.spent)}</span>
                </td>
                <td name="action">
                  ${task.start_time ? stopButton : startButton }
                </td>
              </tr>`

    // Add task to list
    $("table tbody").append(row)

    // Start/stop button
    $(`#${task.id} [name="action"]`).click((e) => {

      let newButton = undefined

      if (task.start_time) {
        newButton = startButton
        stopTimer(task)
      } else {
        newButton = stopButton
        startTimer(task)
      }

      // Update UI
      $(e.currentTarget).children().replaceWith(newButton)
    })
  }
}

function startTimer(task) {

  // Task started at this moment
  task.start_time = Math.round(new Date().getTime())

  // Persist to disk
  storeTask(task)

  // Visual clock ticking on screen
  timers[task.id] = setInterval(() => {
    const newTimeSpent = formatTimeSpent(task.spent + getAdjustedTimeSpent(task.start_time))
    $(`#${task.id} [name="spent"]`).text(newTimeSpent)
  }, TICK_RATE)
  
  console.log('Timer started...')
}

function stopTimer(task) {

  // Stop task and calculate new time spent
  task.spent += getAdjustedTimeSpent(task.start_time)
  task.start_time = undefined
  
  // Persist to disk
  storeTask(task)

  // Kill visual timer
  clearInterval(timers[task.id])

  console.log('Timer stopped...')
}

function getAdjustedTimeSpent(start_time) {
  return Math.round((new Date().getTime() - start_time) / 1000)
}

function formatTimeSpent(seconds) {
  
  seconds = seconds + 3600

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

function storeTask(task) {
  const store_task = {}
  store_task[task.id] = task
  chrome.storage.sync.set(store_task)
}