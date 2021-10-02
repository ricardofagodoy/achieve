/*
  This code is just an example playing around with Chrome Extensions.
  Note it may not be fancy or solid as it should ;-)
*/

// Read all items from storage
chrome.storage.sync.get(null, (tasks) => {
  loadTasks(tasks)
})

function loadTasks(tasks) {

  // Populate list with each task
  for (const [id, details] of Object.entries(tasks)) {

    const task = {id, ...details}

    let row = `<tr id="${task.id}">
                <td>${task.project}</td>
                <td>${task.name}</td>
                <td>${task.estimated}</td>
                <td name="spent-row">
                  <span name="spent">${formatTimeSpent(task.spent)}</span>
                </td>
              </tr>`

    // Add task to list
    $("table tbody").append(row)
  }
}