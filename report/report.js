/*
  This code is just an example playing around with Chrome Extensions.
  Note it may not be fancy or solid as it should ;-)
*/

// Read all items from storage
loadAllTasks(loadTasks)

function loadTasks(tasks) {

  // Populate list with each task
  for (const [id, details] of Object.entries(tasks)) {

    const task = {id, ...details}

    let row = `<tr id="${task.id}">
                <td>${task.project}</td>
                <td>${task.name}</td>
                <td>${formatTimeSpent(task.estimated)}</td>
                <td name="spent-row">
                  <span name="spent">${formatTimeSpent(task.spent)}</span>
                </td>
              </tr>`

    // Add task to list
    $("table tbody").append(row)
  }
}

// Top right button to close current window to all screens
$('#close-div').click(() => window.close())