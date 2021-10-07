/*
  This code is just an example playing around with Chrome Extensions.
  Note it may not be fancy or solid as it should ;-)
*/

const off_badge = {
  text: "OFF",
  color: "#898989"
}

const on_badge = {
  text: "ON",
  color: "#54B22A"
}

const timers = {}
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
                <td>${formatTimeSpent(task.estimated)}</td>
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

  // Badge on
  chrome.action.setBadgeText({text: on_badge.text})
  chrome.action.setBadgeBackgroundColor({color: on_badge.color})

  // Visual clock ticking on screen
  timers[task.id] = setInterval(() => {
    const newTimeSpent = formatTimeSpent(task.spent + getAdjustedTimeSpent(task.start_time))
    $(`#${task.id} [name="spent"]`).text(newTimeSpent)
  }, 1000)
}

function stopTimer(task) {

  // Stop task and calculate new time spent
  task.spent += getAdjustedTimeSpent(task.start_time)
  task.start_time = undefined
  
  // Persist to disk
  storeTask(task)

  // Kill visual timer
  clearInterval(timers[task.id])
  delete timers[task.id]

  // Badge off
  if (Object.keys(timers).length == 0) {
    chrome.action.setBadgeText({text: off_badge.text})
    chrome.action.setBadgeBackgroundColor({color: off_badge.color})
  }
}

function getAdjustedTimeSpent(start_time) {
  return Math.round((new Date().getTime() - start_time) / 1000)
}

$('#report').click(() => create_tab('../report/report.html'))