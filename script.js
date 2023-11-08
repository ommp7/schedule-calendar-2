// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Function to update the live time and date
  function updateDateTime() {
    const currentDateTime = dayjs().format('MMMM D, YYYY h:mm A');
    $("#currentDateTime").text(currentDateTime);
  }

  // Update the live time and date every second
  setInterval(updateDateTime, 1000);

  // Initialize the live time and date when the page loads
  updateDateTime();

  // Add a listener for click events on the save button.
  $(".save-btn").on("click", function () {
    // Get the text area's value within the same time-block
    var userInput = $(this).siblings("textarea").val();
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Save the user input in local storage with the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Function to update time block colors based on the current time
  function updateTimeBlockColors() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var hour = parseInt($(this).data("hour"));

      $(this).removeClass("past present future");

      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Apply time block colors when the page loads
  updateTimeBlockColors();

  // Update time block colors every minute
  setInterval(updateTimeBlockColors, 60000);

  // Get user input from local storage and set textarea values
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var storedInput = localStorage.getItem(timeBlockId);

    if (storedInput !== null) {
      $(this).find("textarea").val(storedInput);
    }
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
