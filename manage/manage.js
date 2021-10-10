/*
  This code is just an example playing around with Chrome Extensions.
  Note it may not be fancy or solid as it should ;-)
*/

// Read all items from storage
loadAllTasks(renderTasks)

function renderTasks(tasks) {

  // Populate list with each task
  for (const task of tasks) {

    let row = `<tr id="${task.id}">
                <td>${task.project}</td>
                <td>${task.name}</td>
                <td>${formatTimeSpent(task.estimated)}</td>
                <td name="action">
                  <button class="button is-danger is-rounded">Delete</button>
                </td>
              </tr>`

    // Add task to list
    $("table tbody").append(row)

    // Deleta current task
    $(`#${task.id} [name="action"]`).click((e) => {
      deleteTask(task.id)
      $(`#${task.id}`).remove()
    })
  }
}

// Create new task button
$('#create').click(() => createNewTask)

// Also creates on pressing Enter
$(document).keypress(e => {
  if (e.keyCode === 13)
    createNewTask()
})

function createNewTask() {

  const project = $('#new_project').val()
  const name = $('#new_name').val()
  const estimated = $('#new_estimated').val()

  if (!name || name.trim() == '') {
    alert('Please, fill at least a task name.')
    return
  }

  // Clear fields
  $('#new_project').val('')
  $('#new_name').val('')
  $('#new_estimated').val('')

  // Creates new task
  createdTask = createTask(project, name, estimatedToSeconds(estimated))
  
  // Adds to list
  renderTasks([createdTask])
}

// Top right button to close current window to all screens
$('#close-div').click(() => window.close())