loadAlert(alert => {
    $("#message-text").text(`Your task "${alert.name}" has reached its estimate time of ${formatTimeSpent(alert.estimated)}`)
})

// Top right button to close current window to all screens
$('#close-div').click(() => window.close())
$('#dismiss').click(() => window.close())