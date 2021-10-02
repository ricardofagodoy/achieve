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
$('#create').click(() => {

  const project = $('#new_project').val()
  const name = $('#new_name').val()
  const estimated = $('#new_estimated').val()

  if (!name || name.trim() == '') {
    alert('Please, fill at least a task name.')
    return
  }

  // Creates new task
  createdTask = createTask(project, name, estimated)
  
  // Adds to list
  loadTasks(createdTask)
})